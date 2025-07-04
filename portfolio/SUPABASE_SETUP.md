# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for your portfolio website.

## Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**
   - Visit [https://supabase.com](https://supabase.com)
   - Sign in with your GitHub account
   - Click "New Project"

2. **Create New Project**
   - Choose your organization
   - Enter project name: `harsh-portfolio`
   - Enter database password (save this!)
   - Choose region (closest to your users)
   - Click "Create new project"

3. **Wait for Setup**
   - Project creation takes 1-2 minutes
   - You'll receive an email when ready

## Step 2: Get API Credentials

1. **Go to API Settings**
   - In your project dashboard, go to Settings > API
   - Copy the following values:
     - **Project URL**: `https://your-project-id.supabase.co`
     - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

2. **Create Environment File**
   ```bash
   # In your portfolio directory
   cp env.example .env.local
   ```

3. **Update Environment Variables**
   ```env
   # .env.local
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 3: Configure Authentication

1. **Go to Authentication Settings**
   - In your Supabase dashboard, go to Authentication > Settings

2. **Configure Site URL**
   - Add your site URL: `http://localhost:3000` (for development)
   - Add your production URL when deployed

3. **Enable Google OAuth**
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials:
     - Client ID: Get from Google Cloud Console
     - Client Secret: Get from Google Cloud Console

## Step 4: Google OAuth Setup (Optional)

1. **Go to Google Cloud Console**
   - Visit [https://console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project or select existing

2. **Enable Google+ API**
   - Go to APIs & Services > Library
   - Search for "Google+ API" and enable it

3. **Create OAuth Credentials**
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/callback` (development)
     - `https://your-domain.com/auth/callback` (production)

4. **Add to Supabase**
   - Copy Client ID and Client Secret
   - Add to Supabase Authentication > Providers > Google

## Step 5: Database Schema (Optional)

Run these SQL commands in your Supabase SQL editor:

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

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authors can update their posts" ON blog_posts FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Public read access" ON comments FOR SELECT USING (true);
CREATE POLICY "Anyone can create comments" ON comments FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

## Step 6: Test Authentication

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Sign In**
   - Go to [http://localhost:3000/blog](http://localhost:3000/blog)
   - Click "Sign In" button
   - Try both email/password and Google OAuth

3. **Check User State**
   - After signing in, you should see your profile picture/name
   - Sign out should work properly

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**
   - Check your `.env.local` file
   - Make sure you copied the correct anon key
   - Restart your development server

2. **OAuth redirect errors**
   - Check your redirect URLs in Supabase settings
   - Make sure they match your site URL exactly

3. **Environment variables not loading**
   - Make sure the file is named `.env.local`
   - Restart your development server
   - Check the terminal for warnings

4. **Google OAuth not working**
   - Verify Google Cloud Console settings
   - Check redirect URIs match exactly
   - Ensure Google+ API is enabled

### Getting Help:

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Discord](https://discord.supabase.com)

## Next Steps

Once authentication is working:

1. **Add Blog Management**
   - Create admin interface for blog posts
   - Add rich text editor
   - Implement image uploads

2. **Add Comments System**
   - Allow authenticated users to comment
   - Add comment moderation

3. **Deploy to Production**
   - Update environment variables for production
   - Configure production redirect URLs
   - Set up custom domain

4. **Add Analytics**
   - Track user engagement
   - Monitor authentication metrics
   - Set up error tracking 