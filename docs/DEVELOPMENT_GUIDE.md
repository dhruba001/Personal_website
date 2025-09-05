# 🚀 Development Guide

> **Step-by-step guide to working with this portfolio codebase**

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Development Workflow](#development-workflow)
3. [Common Tasks](#common-tasks)
4. [Customization Guide](#customization-guide)
5. [Performance Guidelines](#performance-guidelines)
6. [Debugging Guide](#debugging-guide)
7. [Testing Strategy](#testing-strategy)
8. [Deployment Process](#deployment-process)

---

## 🏁 Quick Start

### ⚡ Prerequisites

```bash
# Required versions
Node.js >= 18.0.0
npm >= 8.0.0
```

### 🛠️ Setup (5 minutes)

```bash
# 1. Navigate to project
cd Portfolio/portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Visit: http://localhost:5173
```

### ✅ Verify Setup

Your browser should show:
- ✅ Hero section with your name
- ✅ Typewriter effect cycling through roles
- ✅ Skills section with technology logos
- ✅ Projects section (may show fallback data initially)
- ✅ Theme toggle working (dark/light switch)

---

## 🔄 Development Workflow

### 📅 Daily Development Routine

```bash
# 1. Start development server
npm run dev

# 2. Make your changes
# Edit files in src/ directory

# 3. Check changes in browser
# Hot reload shows changes instantly

# 4. Test build before committing
npm run build

# 5. Commit changes
git add .
git commit -m "feat: add new feature"
```

### 🎯 Development Scripts

```bash
# Development
npm run dev              # Start dev server (hot reload)
npm run dev -- --port 3000  # Custom port
npm run dev -- --host   # Expose to network

# Building
npm run build           # Production build
npm run preview         # Preview production build

# Code Quality (if configured)
npm run lint            # Check linting errors
npm run typecheck       # TypeScript type checking
```

### 🔍 File Watching

**What happens when you save files:**

| File Type | Effect | Hot Reload |
|-----------|---------|------------|
| `.tsx/.ts` | Component re-render | ✅ Instant |
| `.css` | Style update | ✅ Instant |
| `package.json` | Dependency change | ❌ Restart required |
| `.env` | Environment variables | ❌ Restart required |

---

## ⚡ Common Tasks

### 🎨 Updating Personal Information

#### 1. Change Name and Bio
```tsx
// File: src/components/sections/Hero.tsx
<h1>
  Hey there! I'm{' '}
  <span className="text-gradient">YourName</span> {/* Change this */}
</h1>

// Change the roles array
const roles = [
  'Your Role 1',
  'Your Role 2', 
  'Your Role 3',
  'Your Role 4'
]

// Update description
<p>
  Your Description | Your Specialty | Your Focus
  <br />
  <span>"Your personal motto"</span>
</p>
```

#### 2. Update Social Links
```tsx
// File: src/components/hero/SocialLinks.tsx
const socialLinksData = [
  { 
    icon: Github, 
    href: 'https://github.com/yourusername',  // Change this
    label: 'GitHub',
    color: 'hover:text-gray-400'
  },
  { 
    icon: Linkedin, 
    href: 'https://linkedin.com/in/yourprofile',  // Change this
    label: 'LinkedIn',
    color: 'hover:text-blue-400'
  },
  // Add more or modify existing
]
```

#### 3. Replace Resume
```bash
# 1. Add your resume PDF to src/assets/
cp ~/your-resume.pdf src/assets/your-resume.pdf

# 2. Update import in HeroButtons.tsx
# File: src/components/hero/HeroButtons.tsx
import resumePdf from '../../assets/your-resume.pdf'

# 3. Update download filename
download="YourName_Resume.pdf"
```

### 🛠️ Adding New Skills

#### Option 1: Add to Existing Category
```tsx
// File: src/data/skills.ts
export const skillCategories = {
  frontend: {
    title: 'Frontend Technologies',
    icon: '🎨',
    skills: [
      // ... existing skills
      {
        name: 'New Technology',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/[tech]/[tech]-original.svg',
        color: 'bg-gradient-to-r from-blue-400 to-blue-600'
      }
    ]
  }
}
```

#### Option 2: Add New Category
```tsx
// File: src/data/skills.ts
export const skillCategories = {
  // ... existing categories
  newCategory: {
    title: 'New Category Name',
    icon: '🚀', // Choose an emoji
    skills: [
      {
        name: 'Technology 1',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/[tech]/[tech]-original.svg',
        color: 'bg-gradient-to-r from-green-400 to-green-600'
      }
      // Add more skills...
    ]
  }
}
```

### 📂 Managing Projects

#### Automatic Projects (GitHub Integration)
```tsx
// Projects automatically sync from GitHub
// Configure in: src/services/githubApi.ts

// To exclude repositories:
const filteredRepos = repos.filter(repo => 
  !repo.fork &&
  !repo.archived &&
  repo.name !== 'repository-to-exclude' // Add exclusions
)

// To change categorization:
const category = repo.topics?.includes('web') ? 'web' : 
                repo.topics?.includes('mobile') ? 'mobile' : 'other'
```

#### Manual Projects (Fallback Data)
```tsx
// File: src/hooks/useProjects.ts
// Edit the fallback projects array
const fallbackProjects = [
  {
    id: 1,
    title: 'Project Name',
    description: 'Project description...',
    tags: ['React', 'TypeScript', 'Tailwind'],
    category: 'web',
    github: 'https://github.com/username/project',
    demo: 'https://project-demo.com', // Optional
    featured: true,
    stars: 0,
    updatedAt: new Date().toISOString()
  }
  // Add more projects...
]
```

### 🎨 Customizing Theme Colors

#### Change Color Palette
```tsx
// File: src/utils/styles.ts
export const getThemeClasses = (theme: 'light' | 'dark') => ({
  text: {
    primary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    secondary: theme === 'dark' ? 'text-gray-300' : 'text-gray-700',
    accent: theme === 'dark' ? 'text-purple-400' : 'text-purple-600' // Changed from blue
  },
  // ... other theme properties
})
```

#### Update CSS Variables
```css
/* File: src/index.css */
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --gradient-primary: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

### 🌟 Adding New Sections

#### Step 1: Create Section Component
```tsx
// File: src/components/sections/NewSection.tsx
import { Section } from '../common/Section'

const NewSection = () => {
  return (
    <Section 
      id="new-section"
      title={<>New <span className="text-gradient">Section</span></>}
      subtitle="Description of what this section contains"
    >
      <div className="text-center">
        <p>Your section content goes here</p>
      </div>
    </Section>
  )
}

export default NewSection
```

#### Step 2: Add to Main App
```tsx
// File: src/App.tsx
import NewSection from './components/sections/NewSection'

function App() {
  return (
    <div className="App">
      {/* ... existing sections */}
      <NewSection />
    </div>
  )
}
```

#### Step 3: Update Navigation (if applicable)
```tsx
// Add navigation link if you have a navigation component
{ href: '#new-section', label: 'New Section' }
```

---

## 🎨 Customization Guide

### 🖼️ Replacing Images

#### Profile Picture
```bash
# 1. Add your image to assets
cp ~/your-photo.jpg src/assets/your-photo.jpg

# 2. Update imports where used
import profileImage from '../assets/your-photo.jpg'

# 3. Update favicon (browser tab icon)
cp ~/your-photo.jpg public/your-photo.jpg
# Edit index.html: <link rel="icon" href="/your-photo.jpg" />
```

#### Background Images
```css
/* File: src/index.css */
.hero-background {
  background-image: url('./assets/your-background.jpg');
}
```

### 🎭 Customizing Animations

#### Change Animation Speed
```tsx
// File: src/utils/animations.ts
export const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.3 } // Changed from 0.6s to 0.3s
  }
}
```

#### Disable Animations
```tsx
// For users who prefer reduced motion
// File: src/index.css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 📱 Responsive Adjustments

#### Modify Breakpoints
```tsx
// Tailwind breakpoints:
// sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px

// Example: Make text larger on mobile
className="text-lg sm:text-xl lg:text-2xl"
```

#### Custom Media Queries
```css
/* File: src/index.css */
@media (max-width: 768px) {
  .custom-mobile {
    /* Mobile-specific styles */
  }
}
```

---

## ⚡ Performance Guidelines

### 🎯 Component Performance

#### Use React.memo for Pure Components
```tsx
// For components that re-render frequently
import React from 'react'

const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data}</div>
})
```

#### Optimize Heavy Calculations
```tsx
import { useMemo } from 'react'

const Component = ({ items }) => {
  // Expensive calculation only runs when items change
  const processedItems = useMemo(() => {
    return items.map(item => heavyProcessing(item))
  }, [items])

  return <div>{processedItems}</div>
}
```

#### Lazy Load Components
```tsx
import { lazy, Suspense } from 'react'

// Only load when needed
const HeavySection = lazy(() => import('./HeavySection'))

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeavySection />
  </Suspense>
)
```

### 🖼️ Image Optimization

#### Optimize Images Before Adding
```bash
# Recommended tools:
# - TinyPNG (online)
# - ImageOptim (Mac)
# - GIMP (free, cross-platform)

# Target sizes:
# - Profile pictures: 400x400px
# - Project previews: 1200x600px  
# - Icons: 64x64px
```

#### Use Appropriate Formats
```tsx
// WebP for modern browsers (smaller files)
<img 
  src="image.webp" 
  alt="Description"
  loading="lazy" // Lazy load images
/>

// Fallback for older browsers
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" />
</picture>
```

### 🚀 Bundle Optimization

#### Analyze Bundle Size
```bash
# Build with analysis
npm run build

# Check dist/ folder sizes
# Large files indicate optimization opportunities
```

#### Tree Shaking
```tsx
// ✅ Import only what you need
import { motion } from 'framer-motion'

// ❌ Don't import entire libraries
import * as FramerMotion from 'framer-motion'
```

---

## 🐛 Debugging Guide

### 🔍 Common Issues & Solutions

#### 1. Build Errors
```bash
# TypeScript errors
npm run typecheck
# Fix: Check component props and interfaces

# Missing dependencies
npm install
# Fix: Install missing packages

# Cache issues
rm -rf node_modules package-lock.json
npm install
```

#### 2. Styling Issues
```bash
# Tailwind classes not working
npm run build  # Regenerates CSS
# Check: Are class names spelled correctly?

# Theme not switching
# Check: ThemeContext provider wraps app
# Check: getThemeClasses used correctly
```

#### 3. Animation Issues
```bash
# Animations not playing
# Check: Framer Motion imports
# Check: Variants applied correctly
# Check: initial/animate props set
```

#### 4. Data Loading Issues
```bash
# Projects not loading
console.log('Projects:', projects)
console.log('Loading:', loading)
console.log('Error:', error)

# GitHub API issues
# Check: Internet connection
# Check: Rate limits (60/hour)
# Solution: Add VITE_GITHUB_TOKEN
```

### 🔧 Debug Tools

#### Browser Dev Tools
```tsx
// Add temporary logging
console.log('Component rendered:', { props, state })

// React Developer Tools extension
// - View component tree
// - Inspect props and state
// - Profile performance
```

#### VS Code Debugging
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Vite Dev Server",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/node_modules/.bin/vite",
      "args": ["--", "--host"]
    }
  ]
}
```

### 🔍 Performance Debugging

#### Identify Re-render Issues
```tsx
// Add to components to track re-renders
useEffect(() => {
  console.log('Component re-rendered:', componentName)
})
```

#### Memory Leaks
```tsx
// Clean up effects
useEffect(() => {
  const timer = setInterval(() => {}, 1000)
  
  return () => clearInterval(timer) // Cleanup
}, [])
```

---

## 🧪 Testing Strategy

### ✅ Manual Testing Checklist

#### Functionality Testing
- [ ] **Theme Toggle**: Switch between light/dark themes
- [ ] **Responsive Design**: Test on mobile, tablet, desktop
- [ ] **Navigation**: All section links work
- [ ] **Animations**: Smooth scroll-triggered animations
- [ ] **External Links**: Social links and GitHub links open correctly
- [ ] **Resume Download**: PDF downloads successfully

#### Browser Testing
- [ ] **Chrome/Chromium**: Latest version
- [ ] **Firefox**: Latest version  
- [ ] **Safari**: Latest version (Mac/iOS)
- [ ] **Edge**: Latest version

#### Performance Testing
```bash
# Lighthouse audit (built into Chrome DevTools)
# Check: Performance, Accessibility, Best Practices, SEO
# Target scores: 90+ in all categories
```

### 🤖 Automated Testing (Optional)

#### Unit Testing Setup
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Add test script to package.json
"test": "vitest"
```

#### Example Tests
```tsx
// src/__tests__/Hero.test.tsx
import { render, screen } from '@testing-library/react'
import Hero from '../components/sections/Hero'

test('renders hero section with name', () => {
  render(<Hero />)
  expect(screen.getByText(/hey there/i)).toBeInTheDocument()
})
```

---

## 🚀 Deployment Process

### 📦 Build Process

#### 1. Pre-deployment Checklist
- [ ] All personal information updated
- [ ] All social links working
- [ ] Resume file updated
- [ ] Skills and projects current
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Both themes tested

#### 2. Build for Production
```bash
# Create production build
npm run build

# Verify build
npm run preview

# Check build output
ls -la dist/
```

### 🌐 Deployment Options

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Or connect GitHub repo for auto-deployment
```

**Vercel Features**:
- Automatic deployments on git push
- Preview deployments for branches
- Custom domains
- CDN and optimization
- Zero configuration

#### Option 2: Netlify
1. **Drag & Drop**: Upload `dist/` folder to Netlify
2. **Git Integration**: Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Custom domain**: Configure in Netlify settings

#### Option 3: GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

#### Option 4: Traditional Hosting
```bash
# Build the project
npm run build

# Upload dist/ folder contents to your web server
# Configure server for SPA routing (if needed)
```

### ⚙️ Environment Configuration

#### Production Environment Variables
```bash
# Create .env.production (if needed)
VITE_GITHUB_TOKEN=your_token_here  # For higher API limits
VITE_API_URL=https://api.yoursite.com
```

#### Custom Domain Setup
```bash
# Add CNAME file to public/ folder (for GitHub Pages)
echo "yourdomain.com" > public/CNAME

# Or configure in hosting platform settings
```

### 🔒 Security Considerations

#### Sensitive Data
- ✅ Never commit API keys or secrets
- ✅ Use environment variables for sensitive data
- ✅ Personal information is okay (it's a portfolio)
- ❌ Don't expose private repositories or internal APIs

#### HTTPS Configuration
- Most hosting platforms provide HTTPS automatically
- Ensure all external links use HTTPS
- Mixed content warnings can break functionality

---

## 🎓 Best Practices Summary

### ✅ Do's
- **Follow existing patterns** when adding new features
- **Test in both themes** before deploying
- **Keep components under 100 lines** when possible
- **Use TypeScript types** for all data structures
- **Commit frequently** with descriptive messages
- **Test on multiple devices** and browsers

### ❌ Don'ts
- **Don't modify core utilities** without understanding impact
- **Don't mix styling approaches** (stick to Tailwind + theme utilities)
- **Don't ignore TypeScript errors** (fix them properly)
- **Don't skip testing** animations and interactions
- **Don't hardcode data** that should be configurable

### 🎯 Performance Best Practices
- Use `React.memo` for expensive components
- Optimize images before adding them
- Lazy load non-critical components  
- Keep bundle size under 1MB
- Test on slower devices and networks

### 🔧 Maintenance Schedule

#### Weekly
- [ ] Check for console errors
- [ ] Test all functionality  
- [ ] Update project data if needed

#### Monthly  
- [ ] Update dependencies: `npm update`
- [ ] Run security audit: `npm audit`
- [ ] Check performance scores
- [ ] Update portfolio content

#### Quarterly
- [ ] Review and update skills
- [ ] Update resume and projects
- [ ] Check for new best practices
- [ ] Consider new features

---

## 🆘 Getting Help

### 🔍 Troubleshooting Steps
1. **Check this guide** for common solutions
2. **Look at browser console** for error messages  
3. **Check similar components** for patterns
4. **Verify file paths** and imports
5. **Test in incognito mode** to rule out cache issues

### 📚 Resources
- **React Documentation**: https://react.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Framer Motion Docs**: https://www.framer.com/motion/

### 💡 Development Tips
- Use browser dev tools extensively
- Install React Developer Tools browser extension
- Use VS Code with TypeScript extensions
- Keep terminal open to see build errors immediately

---

*📝 This guide covers 90% of development scenarios. When in doubt, look at existing code patterns!*

*🔧 Last updated: September 2024*