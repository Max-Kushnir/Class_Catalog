# Class Catalog - Quick Setup

A Next.js application showing academic class listings with Supabase database integration.

## Quick Start (5 minutes)

### 1. Prerequisites
- Install [Node.js](https://nodejs.org) (download and run installer)

### 2. Setup
```bash
# Clone the repository
git clone <repository-url>
cd class-catalog

# Install dependencies
npm install
```

### 3. Add Database Connection
Create a file called `.env.local` in the project root and add:
```
NEXT_PUBLIC_SUPABASE_URL=<provided-by-developer>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<provided-by-developer>
```

### 4. Run the Application
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## What You'll See
- **Home Page**: 3 academic class listings (Math, Programming, Biology)
- **Class Details**: Click any class to see full description (opens new tab)
- **Teacher Profiles**: Click teacher names to view their profiles

## Troubleshooting
- **"Module not found"**: Run `npm install` again
- **No data showing**: Check the `.env.local` file was created correctly
- **Port in use**: Close other applications or restart terminal

---
Built with Next.js + React + Supabase