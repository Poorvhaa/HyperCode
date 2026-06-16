# HyperCode Enterprise Website

A world-class, fully responsive corporate website for HyperCode - a strategic consulting firm specializing in Business Intelligence, Data Analytics, and IT Staffing Solutions.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open in browser
open http://localhost:3000
```

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation/footer
│   ├── page.tsx            # Homepage
│   ├── solutions/          # Solutions detail page
│   ├── industries/         # Industries served page
│   ├── staffing/           # Staffing solutions page
│   ├── careers/            # Careers page
│   ├── about/              # About company page
│   ├── insights/           # Blog/insights page
│   ├── contact/            # Contact & form page
│   └── globals.css         # Design tokens & global styles
├── components/
│   ├── navigation.tsx      # Sticky header with menu
│   ├── footer.tsx          # Multi-column footer
│   ├── hero-section.tsx    # Homepage hero
│   ├── services-section.tsx # Services grid
│   ├── why-hypercode-section.tsx # Value props
│   ├── testimonials-section.tsx # Customer testimonials
│   ├── cta-section.tsx     # Call-to-action banner
│   └── contact-form.tsx    # Contact form with validation
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Navy Blue (#1f2937)
- **Secondary**: Teal (#14b8a6)
- **Background**: White (#fafaf8)
- **Accent**: Teal (#14b8a6)

### Typography
- **Headings**: Geist Sans (font-weight: 700)
- **Body**: Geist Sans (font-weight: 400-500)
- **Code**: Geist Mono

### Features
- ✨ Glassmorphism cards
- 🎬 Smooth Framer Motion animations
- 📱 Fully responsive design
- ♿ WCAG AA accessibility
- 🚀 Optimized for performance
- 🎯 SEO-friendly metadata

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, services, testimonials, CTA |
| Solutions | `/solutions` | Detailed solution descriptions |
| Industries | `/industries` | 8 industries served with case studies |
| Staffing | `/staffing` | Staffing solutions and hiring process |
| Careers | `/careers` | Open positions and company culture |
| About | `/about` | Company story, mission, values |
| Insights | `/insights` | Blog articles and resources |
| Contact | `/contact` | Contact form and information |

## 🔌 Technology Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Database Ready**: Supabase integration points
- **Deployment**: Vercel-optimized

## 📋 Features

### Core Features
- Sticky navigation with scroll effects
- Mobile responsive design
- Contact form with validation
- Animated hero section
- Service cards with icons
- Industry-specific solutions
- Staffing workflow visualization
- Careers job listing
- Blog/insights section
- Footer with multiple columns

### Advanced Features
- Glassmorphism UI components
- Animated statistics counters
- Form validation with Zod schemas
- Error/success message handling
- Mobile hamburger menu
- Smooth page transitions
- Optimized images (ready for Next.js Image)
- Dynamic metadata per page

## 🔧 Development

### Key Dependencies
```json
{
  "next": "^16.2.0",
  "react": "^19.2.4",
  "framer-motion": "^11.0.8",
  "react-hook-form": "^7.51.0",
  "zod": "^3.22.4",
  "lucide-react": "^1.17.0",
  "@hookform/resolvers": "^3.3.4"
}
```

### Running Tests
```bash
# No tests configured yet
# Add your test framework and run tests here
```

### Code Quality
```bash
# Format code
pnpm format

# Type checking
pnpm type-check

# Build check
pnpm build
```

## 🚢 Deployment to Vercel

The site is optimized for Vercel deployment:

```bash
# Push to GitHub (if not already done)
git push origin main

# Deploy to Vercel (via dashboard or CLI)
vercel deploy
```

### Environment Variables
No environment variables required for basic functionality.

For Supabase integration (future):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📊 Performance

Lighthouse targets:
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

## 🔐 Security

- ✅ No sensitive data in client code
- ✅ Form validation on client and server
- ✅ CSRF protection ready (add via Next.js middleware)
- ✅ XSS protection via React/Next.js defaults
- ✅ Environment variables for sensitive data

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Semantic HTML structure
- Proper heading hierarchy
- Color contrast ratios met
- Screen reader friendly
- Focus indicators visible

## 📞 Integration Roadmap

### Phase 1: Backend Integration
- [ ] Set up Supabase project
- [ ] Create database tables
- [ ] Connect contact form to API

### Phase 2: Features
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Blog CMS integration
- [ ] Analytics

### Phase 3: Optimization
- [ ] Image optimization
- [ ] CDN setup
- [ ] Caching strategy
- [ ] Performance monitoring

## 📄 License

© 2024 HyperCode. All rights reserved.

## 🤝 Contributing

This is a production website. For changes:
1. Create a feature branch
2. Test thoroughly
3. Submit pull request
4. Deploy via Vercel

## 📧 Support

For questions or issues:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
