import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { getThemeClasses } from '../../utils/styles'

interface Skill {
  name: string
  logo: string
  color: string
}

interface SkillCardProps {
  skill: Skill
  index: number
}

/**
 * Individual skill card component
 * Displays a technology with its logo
 */
export const SkillCard = ({ skill, index }: SkillCardProps) => {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="glass-effect rounded-lg p-4 card-shadow text-center cursor-default"
    >
      <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
        <img 
          src={skill.logo} 
          alt={`${skill.name} logo`}
          className={`w-10 h-10 object-contain ${
            // Theme-aware logo adjustments for better visibility
            (skill.name === 'Next.js' || skill.name === 'Express.js') && theme === 'light' 
              ? 'filter invert' 
              : ''
          }`}
          onError={(e) => {
            // Fallback to colored circle if logo fails to load
            e.currentTarget.style.display = 'none'
            const parent = e.currentTarget.parentElement
            if (parent) {
              parent.className += ` ${skill.color} rounded-full`
              const fallbackDiv = document.createElement('div')
              fallbackDiv.className = 'w-6 h-6 bg-white/20 rounded-full'
              parent.appendChild(fallbackDiv)
            }
          }}
        />
      </div>
      <span className={`font-medium text-sm ${themeClasses.text.primary}`}>
        {skill.name}
      </span>
    </motion.div>
  )
}