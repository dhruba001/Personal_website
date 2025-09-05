import { motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { getThemeClasses } from '../../utils/styles'
import { fadeInUp } from '../../utils/animations'

interface ProjectsHeaderProps {
  loading: boolean
  error: string | null
  onRefresh: () => void
}

export const ProjectsHeader = ({ loading, error, onRefresh }: ProjectsHeaderProps) => {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)

  return (
    <motion.div variants={fadeInUp} className="text-center mb-16">
      <div className="flex items-center justify-center gap-4 mb-4">
        <h2 className={`text-4xl sm:text-5xl font-bold ${themeClasses.text.primary}`}>
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <motion.button
          onClick={onRefresh}
          disabled={loading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-lg glass-effect transition-all duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
          }`}
          title="Refresh projects from GitHub"
        >
          <RefreshCw size={20} className={`${loading ? 'animate-spin' : ''} ${themeClasses.text.accent}`} />
        </motion.button>
      </div>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
      <p className={`text-lg max-w-2xl mx-auto ${themeClasses.text.secondary}`}>
        Live projects automatically synced from my GitHub
      </p>
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error} - Showing cached projects
        </p>
      )}
    </motion.div>
  )
}