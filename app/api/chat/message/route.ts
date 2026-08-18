import { NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai';
import { getSupabaseServer, verifySupabaseConnectivity } from '@/lib/supabase-server';
import { isRateLimited, getClientIp, sanitizeInput } from '@/lib/security';

const schema = z.object({
  session_id: z.string().min(8).max(100),
  message: z.string().min(1).max(2000),
  language: z.enum(['en', 'es']),
  history: z.array(z.object({
    role: z.string(),
    content: z.string()
  })).optional()
});

const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `You are the HyperCode AI Consultant, a focused sales and technology advisor representing HyperCode.
Your main goal is to help visitors:
- Understand HyperCode services (custom software development, AI & automation, cloud, web development, mobile development, data and analytics, cybersecurity, digital transformation, staffing, IT consulting).
- Choose the right technology solutions.
- Estimate high-level project scope or guidelines.
- Recommend next steps and move toward scheduling a consultation.

Guidelines:
- Keep your responses professional, sales-oriented, helpful, and concise (usually under 2-3 paragraphs).
- Do NOT act like a generic ChatGPT clone. Maintain a business consulting focus.
- You must answer ONLY within HyperCode-related business and technology topics listed above.
- If asked about unrelated topics (such as recipe queries, casual chatter, general facts, historical trivia, etc.), politely redirect the user back to HyperCode's technology and software services.
- Never use overly technical developer jargon or expose raw database states or system diagnostics. Keep explanations focused on business outcomes.
- Present answers in a format that leads naturally toward booking a technical scoping consultation.`;

function getFallbackResponse(message: string, language: 'en' | 'es'): string {
  const msg = message.toLowerCase();
  
  if (language === 'es') {
    if (msg.includes('construir software') || msg.includes('build software') || msg.includes('desarrollar') || msg.includes('software')) {
      return `¡Excelente! En HyperCode nos especializamos en construir soluciones de software de clase mundial a la medida de su negocio. Nuestro enfoque comienza con un proceso detallado de scoping y diseño de arquitectura, seguido de un desarrollo ágil con nuestros ingenieros altamente capacitados. ¿Tiene alguna plataforma en mente (web, móvil o SaaS) o le gustaría programar una sesión con uno de nuestros consultores para discutir los detalles?`;
    }
    if (msg.includes('servicios') || msg.includes('services') || msg.includes('ofrece') || msg.includes('provee')) {
      return `HyperCode ofrece un conjunto completo de soluciones tecnológicas para empresas, que incluyen:\n\n• Desarrollo de Software a la Medida y SaaS\n• Inteligencia Artificial y Automatización de Procesos (Agentes IA, RAG)\n• Ingeniería de Datos y Analítica Avanzada (Power BI, Snowflake)\n• Infraestructura en la Nube y DevOps\n• Soluciones de Talento y Staff Augmentation\n\n¿Cuál de estas áreas se alinea mejor con sus objetivos actuales?`;
    }
    if (msg.includes('tech stack') || msg.includes('pila') || msg.includes('tecnología') || msg.includes('stack')) {
      return `Para proyectos modernos y escalables, recomendamos una pila probada en producción. Para aplicaciones web e interfaces dinámicas, Next.js con React es excelente por su rendimiento y SEO. En el backend, solemos utilizar Node.js o .NET dependiendo de la complejidad empresarial, respaldados por bases de datos robustas como PostgreSQL o SQL Server y desplegados en AWS o Azure. ¿Qué tipo de aplicación está planeando construir?`;
    }
    if (msg.includes('costo') || msg.includes('cost') || msg.includes('precio') || msg.includes('cuánto cuesta')) {
      return `El costo de un proyecto de software a la medida depende del alcance, la complejidad de las integraciones y el cronograma requerido. Por lo general, los MVP comienzan en un rango optimizado, mientras que las plataformas empresariales varían según el número de flujos y sistemas a conectar. Para obtener una estimación precisa y gratuita, le sugerimos agendar una consulta de scoping con nuestros arquitectos.`;
    }
    return `Entiendo su consulta. En HyperCode estamos listos para ayudarle a diseñar, construir y escalar sus soluciones tecnológicas. ¿Le gustaría hablar de su proyecto de software, automatización con IA o ingeniería de datos? También puede programar una consulta técnica gratuita directamente con nuestro equipo.`;
  } else {
    if (msg.includes('build software') || msg.includes('software') || msg.includes('develop')) {
      return `That is exciting! At HyperCode, we specialize in building world-class custom software solutions tailored to your business needs. Our approach begins with a detailed scoping and architecture design phase, followed by agile engineering with our highly skilled squads. Do you have a specific platform in mind (web, mobile, or SaaS), or would you like to schedule a session with our consultants to discuss the details?`;
    }
    if (msg.includes('services') || msg.includes('provide') || msg.includes('offer')) {
      return `HyperCode provides a comprehensive suite of enterprise technology services, including:\n\n• Custom Software & SaaS Product Engineering\n• AI & Cognitive Process Automation (AI Agents, RAG Pipelines)\n• Data Engineering & Advanced Business Intelligence (Power BI, Snowflake)\n• Cloud Infrastructure & DevOps Migrations\n• Strategic Tech Staffing & On-Demand Squads\n\nWhich of these areas aligns best with your current business goals?`;
    }
    if (msg.includes('tech stack') || msg.includes('technology') || msg.includes('stack')) {
      return `For modern, scalable enterprise applications, we recommend a production-tested stack. For web applications, Next.js and React are excellent for performance, responsiveness, and SEO. On the backend, we typically leverage Node.js or C#/.NET depending on business complexity, backed by robust databases like PostgreSQL or SQL Server and deployed on AWS or Azure. What kind of application are you planning to build?`;
    }
    if (msg.includes('cost') || msg.includes('price') || msg.includes('how much') || msg.includes('budget')) {
      return `The cost of a custom software project depends on the overall scope, integration complexity, and timeline. Generally, MVP projects start in a highly optimized range, whereas scale-up enterprise systems vary based on workflows and databases. To get an accurate, free cost estimate, we suggest booking a brief scoping consultation with our solutions architects.`;
    }
    return `I understand your request. At HyperCode, we are ready to help you design, build, and scale your technology solutions. Would you like to discuss custom software development, AI integrations, or data warehousing? You can also schedule a free scoping consultation directly with our team.`;
  }
}

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = getClientIp(req);
    const limitStatus = isRateLimited(ip, 60, 60000); // 60 requests/min
    if (limitStatus.limited) {
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 429 }
      );
    }

    // 2. Parse Request Payload
    let body;
    try {
      body = await req.json();
    } catch (parseErr) {
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 400 }
      );
    }

    // 3. Validation via Zod
    const validationResult = schema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 400 }
      );
    }

    const parsed = validationResult.data;
    const sessionId = sanitizeInput(parsed.session_id);
    const sanitizedMsg = sanitizeInput(parsed.message);
    const language = parsed.language;
    const clientHistory = parsed.history || [];

    // Verify DB Connectivity
    try {
      await verifySupabaseConnectivity();
    } catch (connErr) {
      console.error('[API Message] Supabase connectivity failed:', connErr);
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 503 }
      );
    }

    // Server-only Supabase Client
    const supabase = getSupabaseServer();
    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 503 }
      );
    }

    // Get or Create Conversation
    let conversationId: string;
    const { data: existingConvo, error: lookupError } = await supabase
      .from('chat_conversations')
      .select('id')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (lookupError) {
      console.error('[API Message] Conversation lookup failed:', lookupError);
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 500 }
      );
    }

    if (existingConvo) {
      conversationId = existingConvo.id;
    } else {
      const { data: newConvo, error: insertError } = await supabase
        .from('chat_conversations')
        .insert({
          session_id: sessionId,
          language,
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (insertError || !newConvo) {
        console.error('[API Message] Conversation insertion failed:', insertError);
        return NextResponse.json(
          { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
          { status: 500 }
        );
      }
      conversationId = newConvo.id;
    }

    // Save User Message
    const { error: userMsgError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        sender: 'user',
        message: sanitizedMsg,
        language
      });

    if (userMsgError) {
      console.error('[API Message] Failed to save user message:', userMsgError);
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 500 }
      );
    }

    // Validate and normalize message history to verify content exists and roles are strictly user/assistant
    const validHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    if (Array.isArray(clientHistory)) {
      for (const item of clientHistory) {
        if (item && typeof item === 'object') {
          const content = item.content;
          const role = item.role;
          if (typeof content === 'string' && content.trim() !== '' && typeof role === 'string') {
            const roleLower = role.toLowerCase();
            if (roleLower === 'user' || roleLower === 'assistant') {
              validHistory.push({
                role: roleLower as 'user' | 'assistant',
                content: content
              });
            }
          }
        }
      }
    }

    // Normalize messages for OpenAI
    const openAiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...validHistory,
      { role: 'user', content: sanitizedMsg }
    ];

    let assistantReply = '';
    try {
      if (!openai) {
        throw new Error('OpenAI client is not initialized (missing API key).');
      }
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.3,
        messages: openAiMessages as any
      });
      assistantReply = response.choices[0]?.message?.content || 'I can assist you with our services. Would you like to schedule a consultation?';
    } catch (openAiErr) {
      // Log the exact error to the server console but do not throw it to the user
      console.error('[API Message] OpenAI API call failed (using fallback response):', openAiErr);
      assistantReply = getFallbackResponse(sanitizedMsg, language);
    }

    // Save Assistant Message
    const { error: assistantMsgError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        sender: 'assistant',
        message: assistantReply,
        language
      });

    if (assistantMsgError) {
      console.error('[API Message] Failed to save assistant message:', assistantMsgError);
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
        { status: 500 }
      );
    }

    // Update conversation timestamp
    await supabase
      .from('chat_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return NextResponse.json({
      success: true,
      message: assistantReply,
      conversation_id: conversationId
    });

  } catch (err) {
    console.error('[API Message Critical Error] Fatal crash:', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again or schedule a consultation.' },
      { status: 500 }
    );
  }
}
