const axios = require('axios');

async function run() {
  const sessionId = 'test-session-' + Math.random().toString(36).substring(2, 9);
  
  console.log(`1. Testing /api/chat/conversation with session: ${sessionId}`);
  try {
    const resConv = await axios.post('http://localhost:3000/api/chat/conversation', {
      session_id: sessionId,
      language: 'en'
    });
    console.log('Conversation endpoint response:', resConv.data);
    
    if (resConv.data && resConv.data.success && resConv.data.conversation) {
      const conversationId = resConv.data.conversation.id;
      
      console.log(`\n2. Testing /api/chat/message with conversation_id: ${conversationId}`);
      const resMsg = await axios.post('http://localhost:3000/api/chat/message', {
        conversation_id: conversationId,
        sender: 'user',
        message: 'Tell me about your AI solutions',
        language: 'en'
      });
      console.log('Message endpoint response:', resMsg.data);

      console.log(`\n3. Testing /api/chat/lead with conversation_id: ${conversationId}`);
      const resLead = await axios.post('http://localhost:3000/api/chat/lead', {
        conversation_id: conversationId,
        name: 'John Doe',
        email: 'john.doe@enterprise.com',
        phone: '+1 555-0199',
        company: 'Enterprise Corp',
        industry: 'finance',
        service_interest: 'AI Solutions',
        budget_range: 'between25k50k',
        timeline: 'immediate',
        message: 'Need a custom LLM fine-tuning squad.',
        language: 'en',
        website_url: '' // honeypot empty
      });
      console.log('Lead endpoint response:', resLead.data);
    } else {
      console.error('Failed to initialize conversation successfully.');
    }
  } catch (err) {
    if (err.response) {
      console.error('Error response status:', err.response.status);
      console.error('Error response data:', err.response.data);
    } else {
      console.error('Network/request error:', err.message);
    }
  }
}

run();
