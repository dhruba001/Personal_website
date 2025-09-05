import { useEffect, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { getThemeClasses } from '../../utils/styles'

interface TypewriterEffectProps {
  roles: string[]
  className?: string
}

export const TypewriterEffect = ({ roles, className = '' }: TypewriterEffectProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentRole, setCurrentRole] = useState(0)
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)

  useEffect(() => {
    const currentText = roles[currentRole]
    
    if (currentIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setCurrentIndex(0)
        setDisplayText('')
        setCurrentRole((currentRole + 1) % roles.length)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, currentRole, roles])

  return (
    <div className={`h-16 flex items-center justify-center ${className}`}>
      <span className={`text-xl sm:text-2xl lg:text-3xl font-mono ${themeClasses.text.accent}`}>
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  )
}