# 💼 Portfolio Website

> **Modern, responsive portfolio built with React, TypeScript, and cutting-edge web technologies**

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDhruba001%2FPortfolio)

</div>

---

## 🎯 Overview

This is a **highly maintainable**, **performance-optimized** portfolio website that showcases projects, skills, and professional experience. The codebase has been extensively refactored using modern React patterns and best practices.

### ✨ Key Highlights
- 🎨 **Clean Architecture**: Component composition with separation of concerns
- 🚀 **Performance First**: Optimized animations, lazy loading, and efficient rendering
- 🎭 **Smooth Animations**: Framer Motion with GPU-accelerated transitions
- 📱 **Responsive Design**: Mobile-first approach with fluid layouts
- 🌓 **Theme System**: Dark/light mode with smooth transitions
- 📊 **Live Data**: Real-time GitHub integration for projects
- 🔒 **Type Safe**: Full TypeScript implementation

## 🛠️ Tech Stack

| Technology | Purpose | Why This Choice |
|------------|---------|-----------------|
| **React 18** | UI Framework | Modern hooks, concurrent features |
| **TypeScript** | Type Safety | Catches errors at compile time |
| **Vite** | Build Tool | Lightning fast dev server & builds |
| **Tailwind CSS** | Styling | Utility-first, consistent design system |
| **Framer Motion** | Animations | Declarative animations, great performance |
| **Lucide React** | Icons | Consistent icon set, tree-shakable |

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    UI Layer     │    │  Business Logic │    │   Data Layer    │
│                 │    │                 │    │                 │
│  • Components   │◄──►│  • Custom Hooks │◄──►│  • GitHub API   │
│  • Animations   │    │  • Utilities    │    │  • Static Data  │
│  • Styles       │    │  • Context      │    │  • Types        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Design Principles Applied**:
- 🧩 **Component Composition**: Small, focused components
- 🔄 **Custom Hooks**: Reusable stateful logic
- 🎨 **Utility Functions**: Consistent styling and animations
- 📊 **Type Safety**: TypeScript interfaces for all data

## 🚀 Quick Start

### ⚡ Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0

### 🛠️ Installation (30 seconds)

```bash
# 1. Clone & navigate
git clone <your-repo-url>
cd Portfolio/portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser → http://localhost:5173
```

### ✅ Verify Setup
- ✅ Hero section loads with typewriter effect
- ✅ Skills section shows technology logos
- ✅ Theme toggle works (dark ↔ light)
- ✅ Projects load (GitHub integration)
- ✅ Smooth scroll animations

## 📁 Project Structure

```
portfolio/
├── 📚 CODEBASE_DOCUMENTATION.md    # Complete codebase guide
├── 🚀 DEVELOPMENT_GUIDE.md         # Development & deployment guide
├── src/
│   ├── components/                  # React components
│   │   ├── common/                 # Reusable UI components
│   │   ├── hero/                   # Hero section components
│   │   ├── skills/                 # Skills section components
│   │   ├── projects/               # Projects section components
│   │   └── sections/               # Main page sections
│   ├── hooks/                      # Custom React hooks
│   │   ├── useIntersectionObserver.ts
│   │   └── useProjects.ts
│   ├── utils/                      # Utility functions
│   │   ├── animations.ts           # Animation variants
│   │   └── styles.ts              # Theme utilities
│   ├── contexts/                   # React contexts
│   ├── services/                   # API integrations
│   ├── data/                      # Static data & configuration
│   └── assets/                    # Images, fonts, resume
└── dist/                          # Production build output
```

## 🎨 Features Deep Dive

### 🎭 Hero Section
- **Typewriter Effect**: Cycles through professional roles
- **Social Links**: Animated social media buttons
- **Call-to-Actions**: Project showcase, contact, resume download
- **Scroll Indicator**: Animated down arrow

### 🛠️ Skills Section  
- **Categorized Display**: Frontend, Backend, Tools
- **Interactive Tabs**: Smooth category switching
- **Logo Integration**: DevIcons CDN with fallback system
- **Responsive Grid**: Adapts to screen sizes

### 📂 Projects Section
- **Live GitHub Integration**: Auto-syncs repository data
- **Filtering System**: Category-based project filtering
- **Rich Project Cards**: Stars, tags, descriptions
- **Error Handling**: Graceful fallbacks for API failures

### 🌓 Theme System
- **Dual Themes**: Professional dark & light modes
- **Smooth Transitions**: CSS-based theme switching
- **System Integration**: Respects OS preference
- **Persistent Storage**: Remembers user choice

## ⚡ Performance Optimizations

### 🎯 React Optimizations
- **Component Splitting**: Logical component boundaries
- **Custom Hooks**: Reusable stateful logic
- **Intersection Observer**: Efficient scroll animations
- **Lazy Loading**: Components load when needed

### 🚀 Build Optimizations
- **Code Splitting**: Separate vendor and app bundles
- **Tree Shaking**: Eliminates unused code
- **Asset Optimization**: Compressed images and fonts
- **Modern ES Modules**: Smaller bundle sizes

### 🎬 Animation Performance
- **GPU Acceleration**: Uses transform and opacity only
- **Reduced Motion**: Respects accessibility preferences
- **Optimized Timing**: Consistent easing functions
- **Hardware Acceleration**: CSS will-change properties

## 📖 Documentation

This codebase includes extensive documentation designed for maintainability:

### 📚 [Complete Documentation](./docs/)
**Navigate to the docs folder for comprehensive guides**:

### Main Documentation Files:
- **📚 [Documentation Index](./docs/DOCUMENTATION_INDEX.md)** - Navigation guide to all docs
- **🧠 [Codebase Documentation](./docs/CODEBASE_DOCUMENTATION.md)** - Complete technical guide
- **🚀 [Development Guide](./docs/DEVELOPMENT_GUIDE.md)** - Practical development handbook

### Component Documentation:
- **🧩 [Components Guide](./docs/components/README.md)** - Component patterns and usage
- **🔧 [Utils Guide](./docs/utils/README.md)** - Utilities and styling system  
- **🎣 [Hooks Guide](./docs/hooks/README.md)** - Custom hooks documentation

## 🔧 Customization

### 🎨 Personal Information
```tsx
// Update name, bio, and roles
// File: src/components/sections/Hero.tsx

// Change social links
// File: src/components/hero/SocialLinks.tsx

// Add/modify skills
// File: src/data/skills.ts
```

### 🎭 Styling & Theming
```tsx
// Customize colors and theme
// File: src/utils/styles.ts

// Modify animations
// File: src/utils/animations.ts
```

### 📂 Projects & Content
```tsx
// GitHub integration settings
// File: src/services/githubApi.ts

// Fallback project data
// File: src/hooks/useProjects.ts
```

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Full Support |
| Firefox | Latest | ✅ Full Support |
| Safari | Latest | ✅ Full Support |
| Edge | Latest | ✅ Full Support |

**Modern Features Used**:
- CSS Grid & Flexbox
- Intersection Observer API
- CSS Custom Properties
- ES6+ JavaScript

## 🚀 Deployment

### 🌐 Vercel (Recommended)
```bash
# One-click deployment
vercel --prod

# Or connect GitHub for auto-deployment
```

### 📡 Other Platforms
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Configure in repository settings
- **Traditional Hosting**: Upload `dist/` contents

### ⚙️ Build Process
```bash
npm run build    # Creates optimized production build
npm run preview  # Preview build locally
```

## 📊 Scripts Reference

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run dev -- --port 3000  # Use custom port

# Building  
npm run build           # Production build
npm run preview         # Preview production build

# Code Quality
npm run lint            # ESLint checks
npm run typecheck       # TypeScript validation
```

## 🎯 Performance Metrics

**Lighthouse Scores** (Target: 90+):
- 🟢 **Performance**: 95+
- 🟢 **Accessibility**: 100
- 🟢 **Best Practices**: 100
- 🟢 **SEO**: 100

**Bundle Size**:
- 📦 **Gzipped JS**: ~70KB
- 🎨 **Gzipped CSS**: ~6KB
- ⚡ **First Load**: < 1s on 3G

## 🤝 Contributing

Contributions are welcome! This codebase is designed to be maintainable:

1. **Follow existing patterns** - Look at similar components
2. **Update documentation** - Keep READMEs current  
3. **Test thoroughly** - Both themes, all devices
4. **Use TypeScript** - Type all new code

```bash
# Contribution workflow
git checkout -b feature/amazing-feature
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
# Create Pull Request
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Dhruba Goswami**  
📧 gdhruba748@gmail.com  
🐦 [@dhruba_001](https://twitter.com/dhruba_001)  
💼 [LinkedIn](https://linkedin.com/in/dhruba-goswami-1a042317b/)

---

## ⭐ Acknowledgments

- **Design Inspiration**: Modern portfolio for react devs
- **Icons**: [Lucide React](https://lucide.dev/)
- **Logos**: [DevIcons](https://devicons.github.io/devicon/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

**🌟 If this helped you, please star the repo!**

*Built with ❤️ using modern React patterns and best practices*
