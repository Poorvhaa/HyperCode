# HyperCode Website - Deployment Guide

## Overview
This guide walks you through deploying the HyperCode website to Vercel and integrating with Supabase for full production functionality.

## Prerequisites
- GitHub account (for version control)
- Vercel account (free tier available)
- Supabase account (free tier available)
- Domain name (optional, for custom domain)

## Step 1: Local Development Setup

### Install Dependencies
```bash
cd /vercel/share/v0-project
pnpm install
```

### Run Development Server
```bash
pnpm dev
```

The site should be available at `http://localhost:3000`

### Verify All Pages Load
- ✅ Homepage (/)
- ✅ Solutions (/solutions)
- ✅ Industries (/industries)
- ✅ Staffing (/staffing)
- ✅ Careers (/careers)
- ✅ About (/about)
- ✅ Insights (/insights)
- ✅ Contact (/contact)

## Step 2: Version Control (GitHub)

### Initialize Git Repository
```bash
cd /vercel/share/v0-project
git init
git add .
git commit -m "Initial commit: HyperCode enterprise website"
```

### Create GitHub Repository
1. Go to https://github.com/new
2. Create repository: `hypercode-website`
3. Push local code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/hypercode-website.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard
1. Visit https://vercel.com/new
2. Import the GitHub repository
3. Vercel will auto-detect Next.js settings
4. Click "Deploy"

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts to connect GitHub and deploy
```

### Configure Project Settings
In Vercel Dashboard:
1. Go to Settings → General
2. Node.js Version: 18.x or higher
3. Build Command: `pnpm build` (if not auto-detected)
4. Output Directory: `.next`
5. Install Command: `pnpm install` (if not auto-detected)

### Deployment Complete ✅
Your site is now live at: `https://hypercode-website.vercel.app`

## Step 4: Custom Domain (Optional)

1. In Vercel Dashboard, go to Settings → Domains
2. Add custom domain (e.g., `hypercode.com`)
3. Update DNS records at your domain registrar:
   - CNAME: `cname.vercel-dns.com`
   - Or use Vercel's recommended DNS configuration
4. Wait for DNS propagation (5-48 hours)

## Step 5: Supabase Integration

### Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Name: "hypercode"
4. Database password: (save securely)
5. Region: Choose nearest region
6. Click "Create new project"

### Create Database Tables

#### Contact Inquiries Table
```sql
CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contact_inquiries_email ON contact_inquiries(email);
CREATE INDEX idx_contact_inquiries_created_at ON contact_inquiries(created_at);
```

#### Consultation Requests Table
```sql
CREATE TABLE consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  company VARCHAR(255),
  service VARCHAR(255) NOT NULL,
  preferred_date DATE,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_consultation_requests_email ON consultation_requests(email);
CREATE INDEX idx_consultation_requests_status ON consultation_requests(status);
```

#### Job Applications Table
```sql
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  position VARCHAR(255) NOT NULL,
  resume_url TEXT,
  linkedin_url TEXT,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_job_applications_email ON job_applications(email);
CREATE INDEX idx_job_applications_position ON job_applications(position);
```

#### Newsletter Subscribers Table
```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
```

### Get Supabase Credentials

1. In Supabase Dashboard, go to Settings → API
2. Copy:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - service_role key (SUPABASE_SERVICE_ROLE_KEY)

### Set Environment Variables

#### In Vercel
1. Go to Settings → Environment Variables
2. Add the following:

```
NEXT_PUBLIC_SUPABASE_URL=https://jkobajpxpozalkyeytwb.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprb2JhanB4cG96YWxreWV5dHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4ODU0ODgsImV4cCI6MjA5NzQ2MTQ4OH0.55RBYz7X6ODhlzJ7uaT-zR67mOSoN_Mk9-BGngs8rr0

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprb2JhanB4cG96YWxreWV5dHdiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTg4NTQ4OCwiZXhwIjoyMDk3NDYxNDg4fQ.mypNqzR-x-oqfmmitSqVv7f1yQLyY9v7NSE2IjOKu0Q
```

3. Click "Save"
4. Redeploy from the Deployments tab

#### Locally (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Step 6: Connect Contact Form to Supabase

### Create API Route
Create `/app/api/contact/route.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().min(10),
  service: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate
    const validated = schema.parse(data);
    
    // Insert into Supabase
    const { error } = await supabase
      .from('contact_inquiries')
      .insert([validated]);
    
    if (error) throw error;
    
    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 400 }
    );
  }
}
```

### Update Contact Form
Update `components/contact-form.tsx` to use the API:

```typescript
const onSubmit = async (data: ContactFormData) => {
  setSubmitting(true);
  setError('');

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to submit');

    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  } catch (err) {
    setError('Failed to submit form. Please try again.');
  } finally {
    setSubmitting(false);
  }
};
```

## Step 7: Set Up Email Notifications

### Configure Supabase Email
1. Go to Settings → Email Templates
2. Configure with SendGrid or Supabase Email
3. Customize email templates

### Create Email Trigger Function
```sql
-- Notify admin on contact form submission
CREATE FUNCTION notify_admin_contact()
RETURNS TRIGGER AS $$
BEGIN
  SELECT
    net.http_post(
      url := 'https://your-email-service.com/send',
      headers := '{"Content-Type":"application/json"}'::jsonb,
      body := jsonb_build_object(
        'to', 'admin@hypercode.com',
        'subject', 'New Contact Form Submission',
        'name', NEW.name,
        'email', NEW.email,
        'company', NEW.company,
        'service', NEW.service
      )
    ) INTO result;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contact_form_trigger
AFTER INSERT ON contact_inquiries
FOR EACH ROW
EXECUTE FUNCTION notify_admin_contact();
```

## Step 8: Set Up Admin Dashboard

### Create Admin Page
Create `/app/admin` directory with authentication.

**Important**: Add authentication middleware to protect admin routes.

```typescript
// app/admin/layout.tsx
import { redirect } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add authentication check
  // redirect('/admin/login') if not authenticated
  
  return <>{children}</>;
}
```

### Admin Dashboard Features
- View recent submissions
- Filter and search
- Export to CSV
- Mark as read/reviewed
- Follow-up actions

## Step 9: Monitoring & Analytics

### Enable Vercel Analytics
1. In Vercel Dashboard → Settings → Analytics
2. Enable Web Analytics
3. View real-time traffic and performance

### Set Up Error Tracking (Optional)
1. Install Sentry: `pnpm add @sentry/nextjs`
2. Configure in `next.config.mjs`
3. Monitor production errors

### Monitor Performance
1. Go to Settings → Performance
2. Check Core Web Vitals
3. View optimization recommendations

## Step 10: Verification Checklist

- [ ] Site loads at custom domain
- [ ] Contact form submits successfully
- [ ] Data appears in Supabase tables
- [ ] Admin receives email notifications
- [ ] All pages load without errors
- [ ] Navigation works on all pages
- [ ] Mobile responsive on devices
- [ ] Forms validate correctly
- [ ] No console errors in browser DevTools
- [ ] Lighthouse score 95+
- [ ] SSL certificate is valid

## Post-Deployment Tasks

### Configure DNS Records
```
A Record:
  Name: @
  Value: 76.76.19.89

CNAME Records:
  Name: www
  Value: cname.vercel-dns.com
  
  Name: api
  Value: (if needed for API subdomain)
```

### Set Up Automated Backups
1. Supabase → Settings → Backups
2. Enable daily automated backups
3. Set retention period

### Schedule Maintenance
- Weekly: Check Supabase storage usage
- Monthly: Review analytics and submissions
- Quarterly: Security updates and patches

### Team Access
1. Vercel: Invite team members (Settings → Team)
2. Supabase: Add team members (Project → Members)
3. GitHub: Add collaborators (Settings → Collaborators)

## Troubleshooting

### Deploy Fails
1. Check build logs in Vercel Dashboard
2. Verify environment variables are set
3. Check Next.js version compatibility
4. Clear cache: Settings → Advanced → Purge

### Database Connection Issues
1. Check Supabase URL and keys are correct
2. Verify database tables exist
3. Check firewall rules (if applicable)
4. Test connection with Supabase Studio

### Email Notifications Not Working
1. Verify email service configuration
2. Check Supabase function logs
3. Test API endpoint directly
4. Check spam folder

### Performance Issues
1. Check Vercel Analytics
2. Optimize images and assets
3. Review database queries
4. Check third-party scripts

## Rollback Procedure

If issues occur:
1. Go to Vercel Deployments
2. Select previous successful deployment
3. Click "Redeploy"
4. Changes are rolled back immediately

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- GitHub: https://docs.github.com

---

**Deployment Status**: Ready for production
**Last Updated**: 2024
**Maintained By**: HyperCode Development Team
