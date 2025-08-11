

<div align="center">

# Portfolio Website - Dhruba Goswami
    
<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&duration=3000&pause=1000&color=36BCF7&width=600&lines=Full+Stack+Developer;UI%2FUX+Enthusiast;Problem+Solver;Always+Learning!" alt="Typing SVG" />
</div>

<div align="center">
    
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
    
</div>

---

## 📋 Table of Contents
- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📸 Screenshots](#-screenshots)
- [🚀 Quick Start](#-quick-start)
- [📂 Project Structure](#-project-structure)
- [🎨 Customization](#-customization)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact](#-contact)

---

## 🌟 Overview

A modern, responsive portfolio website showcasing my journey as a Full Stack Developer. Built with cutting-edge technologies and featuring smooth animations, interactive elements, and a beautiful particle background effect.

### 🎯 Purpose
This portfolio serves as:
- **Professional Showcase**: Highlighting my skills, projects, and experience
- **Interactive Experience**: Engaging visitors with modern web technologies
- **Code Quality Demo**: Demonstrating clean, maintainable React/TypeScript code
- **Responsive Design**: Ensuring optimal viewing across all devices

---

## ✨ Features

### 🎨 **Visual Excellence**
- **Animated Hero Section** with typing effects using `react-typed`
- **Interactive Particle Background** for immersive experience
- **Smooth Scroll Animations** powered by `framer-motion`
- **Responsive Design** that works perfectly on all screen sizes
- **Modern Gradient Backgrounds** with carefully chosen color schemes

### ⚡ **Technical Highlights**
- **TypeScript Integration** for type safety and better development experience
- **Component-Based Architecture** for maintainable and scalable code
- **Intersection Observer API** for performance-optimized scroll animations
- **ESLint Configuration** ensuring code quality and consistency
- **Optimized Build Process** with Vite for lightning-fast development

### 👤 **User Experience**
- **Intuitive Navigation** with smooth scrolling between sections
- **Interactive Contact Form** for direct communication
- **Project Showcase** with detailed descriptions and tech stacks
- **Skills Visualization** with animated progress indicators
- **Social Media Integration** for easy connectivity

---

## 🛠️ Tech Stack

### **Frontend Core**
- **React 19.1.1** - Latest React with improved performance and features
- **TypeScript 5.8.3** - Type-safe JavaScript for better development experience
- **Vite 7.1.0** - Next-generation frontend build tool

### **Styling & Animation**
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Production-ready motion library
- **PostCSS 8.5.6** - Tool for transforming CSS with JavaScript

### **UI Components & Icons**
- **Heroicons 2.2.0** - Beautiful hand-crafted SVG icons
- **Lucide React 0.539.0** - Comprehensive icon library
- **React Typed 2.0.12** - Typing animation component

### **Development Tools**
- **ESLint 9.32.0** - Linting utility for identifying problematic patterns
- **Autoprefixer 10.4.21** - PostCSS plugin to parse CSS and add vendor prefixes
- **React Intersection Observer 9.16.0** - Performant scroll-based animations

---

## 📸 Screenshots

<div align="center">
    
### 🏠 Hero Section
*Clean, modern hero section with animated typing and particle effects*
    
### 🛠️ Skills Section     
*Interactive skills showcase with animated progress bars*
    
### 💼 Projects Section
*Detailed project cards with hover effects and tech stack indicators*
    
### 📧 Contact Section
*Professional contact form with validation and smooth animations*
    
</div>

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-username/portfolio.git
    cd Portfolio/portfolio
    ```

2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Start development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Open your browser**
    ```
    http://localhost:5173
    ```

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

---

## 📂 Project Structure

```
Portfolio/
├── portfolio/                          # Main project folder
│   ├── public/                         # Static assets
│   │   └── vite.svg                   # Vite logo
│   │
│   ├── src/                           # Source code
│   │   ├── components/                # Reusable components
│   │   │   ├── layout/                # Layout components
│   │   │   │   └── Navbar.tsx        # Navigation component
│   │   │   ├── sections/              # Page sections
│   │   │   │   ├── Hero.tsx          # Hero section
│   │   │   │   ├── About.tsx         # About section
│   │   │   │   ├── Skills.tsx        # Skills section
│   │   │   │   ├── Projects.tsx      # Projects section
│   │   │   │   └── Contact.tsx       # Contact section
│   │   │   └── ui/                   # UI components
│   │   │       └── ParticleBackground.tsx
│   │   │
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── types/                     # TypeScript type definitions
│   │   ├── utils/                     # Utility functions
│   │   ├── assets/                    # Images and other assets
│   │   ├── App.tsx                    # Main App component
│   │   ├── main.tsx                   # Application entry point
│   │   └── index.css                  # Global styles
│   │
│   ├── package.json                   # Project dependencies
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── vite.config.ts                # Vite configuration
│   └── vercel.json                    # Vercel deployment config
```

---

## 🎨 Customization

### **Colors & Themes**
The portfolio uses a carefully crafted gradient theme. Modify colors in:
- `tailwind.config.js` for global color scheme
- Individual component files for specific styling

### **Content Updates**
- **Personal Information**: Update in respective section components
- **Projects**: Add your projects in `Projects.tsx`
- **Skills**: Modify skill sets in `Skills.tsx`
- **Contact Information**: Update social links and contact details

### **Animations**
- **Framer Motion**: Customize animations in component files
- **Particle Background**: Adjust particle behavior in `ParticleBackground.tsx`
- **Typing Effect**: Modify text and timing in `Hero.tsx`

---

## 🌐 Deployment

### **Vercel Deployment** (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### **Manual Build Deployment**
```bash
npm run build
# Upload 'dist' folder to your hosting provider
```

### **Environment Variables**
Create `.env.local` for sensitive data:
```env
VITE_EMAIL_SERVICE_ID=your_email_service_id
VITE_EMAIL_TEMPLATE_ID=your_template_id
VITE_EMAIL_PUBLIC_KEY=your_public_key
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
    ```bash
    git checkout -b feature/amazing-feature
    ```
3. **Commit your changes**
    ```bash
    git commit -m 'Add some amazing feature'
    ```
4. **Push to the branch**
    ```bash
    git push origin feature/amazing-feature
    ```
5. **Open a Pull Request**

### **Development Guidelines**
- Follow existing code style and patterns
- Ensure TypeScript types are properly defined
- Test across different screen sizes
- Maintain consistent component structure

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

<div align="center">

### 🌟 Let's Connect and Build Something Amazing!

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dhruba-goswami-1a042317b/)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/dhruba_001)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://personal-website-three-nu-59.vercel.app/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gdhruba748@gmail.com)

</div>

---

<div align="center">

### 💭 "Code with passion, create with purpose"

**Made with ❤️ and lots of ☕ by Dhruba Goswami**

⭐ **Star this repository if you found it helpful!** ⭐

</div>
