import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { fadeInUp } from '../../utils/animations'

interface Category {
  key: string
  label: string
}

interface ProjectFiltersProps {
  categories: Category[]
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export const ProjectFilters = ({ categories, activeFilter, onFilterChange }: ProjectFiltersProps) => {
  const { theme } = useTheme()

  return (
    <motion.div 
      variants={fadeInUp}
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {categories.map((category) => (
        <motion.button
          key={category.key}
          onClick={() => onFilterChange(category.key)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            activeFilter === category.key
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : `glass-effect transition-all duration-300 ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`
          }`}
        >
          {category.label}
        </motion.button>
      ))}
    </motion.div>
  )
}