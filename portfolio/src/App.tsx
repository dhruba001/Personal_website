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
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 text-gray-900'
    }`}>
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
