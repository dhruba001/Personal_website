import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'
import ParticleBackground from './components/ui/ParticleBackground'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'

function AppContent() {
  const { theme } = useTheme()
  
  useEffect(() => {
    document.title = 'Dhruba Goswami - Full Stack Developer'
  }, [])

  return (
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900'
    }`}>
      {theme === 'light' && (
        <>
          {/* Base gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 via-indigo-100/40 to-purple-100/60"></div>
          
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-200/20 via-transparent to-purple-200/20"></div>
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Floating elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-300/40 to-indigo-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/40 to-pink-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-indigo-300/40 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-500"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-cyan-300/30 to-blue-300/20 rounded-full blur-xl animate-bounce"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-300/30 to-indigo-300/20 rounded-full blur-xl animate-bounce delay-700"></div>
          </div>
        </>
      )}
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
