import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

export const ScrollIndicator = () => {
  const { theme } = useTheme()
  
  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.2 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={scrollToNext}
        className={`cursor-pointer transition-colors duration-300 ${
          theme === 'dark' 
            ? 'text-white/60 hover:text-white' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <ChevronDown size={32} />
      </motion.div>
    </motion.div>
  )
}