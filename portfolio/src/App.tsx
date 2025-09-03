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
        : 'bg-gradient-to-br from-gray-100 via-blue-100 to-indigo-100 text-gray-900'
    }`}>
      {theme === 'light' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 via-purple-200/30 to-indigo-200/40"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-300/20 via-transparent to-purple-300/20"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-300/30 rounded-full blur-3xl animate-pulse delay-500"></div>
            <div className="absolute top-1/2 right-1/2 w-48 h-48 bg-cyan-300/20 rounded-full blur-2xl animate-pulse delay-300"></div>
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
