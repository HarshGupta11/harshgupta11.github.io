# Deployment Guide - Vercel

## Prerequisites
- GitHub account with your portfolio repository pushed
- Supabase project set up with environment variables

## Step 1: Prepare Your Repository
Make sure your portfolio is pushed to GitHub with the following structure:
```
harshgupta11.github.io/
├── portfolio/          # Your Next.js app
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   └── vercel.json     # Added for deployment
└── other files...
```

## Step 2: Deploy to Vercel

### Option A: Via Vercel Web Interface (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your repository** `harshgupta11.github.io`
5. **Configure the project:**
   - **Root Directory**: `portfolio` (since your Next.js app is in the portfolio folder)
   - **Framework Preset**: Next.js (should auto-detect)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

6. **Add Environment Variables:**
   - Go to Project Settings > Environment Variables
   - Add these variables:
     - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key

7. **Deploy!** Click "Deploy" and wait for the build to complete

### Option B: Via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd portfolio
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project or create new
   - Set root directory to `portfolio`
   - Add environment variables when prompted

## Step 3: Configure Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain

2. **Update DNS:**
   - Add CNAME record pointing to your Vercel deployment
   - Or use Vercel's automatic DNS configuration

## Step 4: Environment Variables Setup

Make sure to add these environment variables in Vercel:

1. **Go to Project Settings > Environment Variables**
2. **Add:**
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://your-project-id.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your-anon-key-here`

## Step 5: Verify Deployment

1. **Check your deployment URL** (provided by Vercel)
2. **Test all features:**
   - Home page loads
   - Blog posts display
   - Authentication works
   - Comments work
   - Admin features work (if you're the admin)

## Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check if all dependencies are in `package.json`
   - Verify environment variables are set
   - Check build logs in Vercel dashboard

2. **Environment Variables Not Working:**
   - Make sure they're added to Vercel project settings
   - Redeploy after adding variables

3. **Supabase Connection Issues:**
   - Verify Supabase URL and key are correct
   - Check Supabase project is active
   - Ensure RLS policies are configured

4. **404 Errors:**
   - Check if routes are properly configured
   - Verify file structure matches Next.js conventions

## Alternative Deployment Platforms

If Vercel doesn't work, here are other free options:

### 1. Netlify
- Similar to Vercel
- Good for static sites and Next.js
- Free tier available

### 2. Railway
- Good for full-stack apps
- Free tier available
- Easy deployment

### 3. Render
- Free tier available
- Good for Next.js apps
- Automatic deployments

### 4. GitHub Pages (Limited)
- Only works for static sites
- Would need to export Next.js as static
- Not recommended for your interactive blog

## Next Steps

After successful deployment:
1. **Set up automatic deployments** (Vercel auto-deploys on git push)
2. **Configure custom domain** if desired
3. **Set up monitoring** and analytics
4. **Optimize performance** using Vercel's built-in tools

Your portfolio will be live at: `https://your-project-name.vercel.app` 