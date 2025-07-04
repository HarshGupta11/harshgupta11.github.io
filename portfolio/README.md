# Harsh Gupta - Personal Portfolio

A modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features include a blog, projects showcase, resume viewer, and lifestyle/travel section.

## 🚀 Features

### ✅ Implemented
- **Modern Design**: Clean, responsive design with Tailwind CSS
- **Navigation**: Sticky navigation with mobile menu
- **Homepage**: Hero section, about me, and section cards
- **Blog Page**: Sample blog posts with featured content
- **Projects Page**: Software projects showcase with technologies
- **Resume Page**: PDF viewer with download option
- **Lifestyle Page**: Travel experiences and social media integration
- **Authentication**: Basic sign-in functionality (ready for Supabase integration)

### 🔄 Next Steps
- [ ] Supabase project setup and configuration
- [ ] Database schema for blog posts and comments
- [ ] Google OAuth integration
- [ ] Admin panel for blog management
- [ ] Real blog post content
- [ ] Social media embeds
- [ ] Contact form
- [ ] SEO optimization

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (planned)
- **Authentication**: Supabase Auth (planned)
- **Database**: PostgreSQL via Supabase (planned)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── blog/           # Blog pages
│   │   ├── projects/       # Projects pages
│   │   ├── resume/         # Resume page
│   │   ├── lifestyle/      # Lifestyle page
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Reusable components
│   │   ├── Navigation.tsx  # Main navigation
│   │   └── AuthButton.tsx  # Authentication button
│   └── lib/               # Utilities and configurations
│       └── supabase.ts    # Supabase client setup
├── public/                # Static assets
│   └── Harsh-2025-Resume.pdf
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration (for future implementation)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup (Next Steps)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key

2. **Database Schema**
   ```sql
   -- Blog posts table
   CREATE TABLE blog_posts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     content TEXT NOT NULL,
     excerpt TEXT,
     slug TEXT UNIQUE NOT NULL,
     published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     author_id UUID REFERENCES auth.users(id),
     featured_image TEXT,
     tags TEXT[]
   );

   -- Comments table
   CREATE TABLE comments (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
     content TEXT NOT NULL,
     author_name TEXT NOT NULL,
     author_email TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Projects table
   CREATE TABLE projects (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     technologies TEXT[],
     github_url TEXT,
     live_url TEXT,
     featured_image TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **Authentication Setup**
   - Enable Google OAuth in Supabase Auth settings
   - Configure redirect URLs
   - Set up RLS (Row Level Security) policies

## 📝 Content Management

### Blog Posts
Sample blog posts are currently hardcoded. To add real content:

1. Set up Supabase database
2. Create admin interface
3. Add blog post management functionality

### Projects
Projects are currently sample data. Update with real projects:

1. Edit `src/app/projects/page.tsx`
2. Add your actual projects
3. Include GitHub links and live demos

### Resume
The resume PDF is located at `public/Harsh-2025-Resume.pdf`. Update this file with your current resume.

## 🎨 Customization

### Colors and Styling
- Primary colors are defined in Tailwind classes
- Update color schemes in components
- Modify `tailwind.config.js` for custom colors

### Content
- Update personal information in homepage
- Modify travel experiences in lifestyle page
- Add real social media links

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security

- Environment variables for sensitive data
- Supabase RLS policies (when implemented)
- Input validation and sanitization
- HTTPS enforcement

## 📈 Performance

- Next.js Image optimization
- Tailwind CSS purging
- Lazy loading for images
- Optimized bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **LinkedIn**: [harshgupta11](https://linkedin.com/in/harshgupta11)
- **GitHub**: [harshgupta11](https://github.com/harshgupta11)
- **Instagram**: [@harshprriyaofficial](https://instagram.com/harshprriyaofficial)
- **YouTube**: [@HarshPrriyaOfficial](https://youtube.com/@HarshPrriyaOfficial)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
