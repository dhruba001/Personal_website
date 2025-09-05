import { motion } from 'framer-motion'
import { Github, Star } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { getThemeClasses } from '../../utils/styles'
import { fadeInUp } from '../../utils/animations'
import type { ProjectData } from '../../services/githubApi'

interface ProjectCardProps {
  project: ProjectData
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      className="glass-effect rounded-xl overflow-hidden card-shadow group"
    >
      {/* Project Image/Preview */}
      <div className="relative aspect-video overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <div className={`text-center ${themeClasses.text.muted}`}>
            <div className="text-6xl mb-4">🚀</div>
            <div className="text-lg font-semibold">{project.title}</div>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 backdrop-blur-sm rounded-full transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-black/10 text-gray-700 hover:bg-black/20'
            }`}
            title="View Code"
          >
            <Github size={20} />
          </motion.a>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        {/* Header with Title and Badges */}
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-xl font-bold group-hover:text-blue-400 transition-colors duration-300 ${themeClasses.text.primary}`}>
            {project.title}
          </h3>
          <div className="flex items-center gap-2">
            {project.stars > 0 && (
              <div className="flex items-center gap-1">
                <Star size={14} className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'} />
                <span className={`text-xs ${themeClasses.text.muted}`}>
                  {project.stars}
                </span>
              </div>
            )}
            {project.featured && (
              <span className={`px-2 py-1 bg-gradient-to-r text-xs rounded-full border ${
                theme === 'dark'
                  ? 'from-yellow-400/20 to-orange-400/20 text-yellow-400 border-yellow-400/30'
                  : 'from-yellow-500/20 to-orange-500/20 text-yellow-700 border-yellow-500/30'
              }`}>
                Featured
              </span>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className={`text-sm mb-4 leading-relaxed ${themeClasses.text.secondary}`}>
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-400/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all duration-300 glass-effect ${
              theme === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-white/10' 
                : 'text-gray-700 hover:text-gray-900 hover:bg-black/10'
            }`}
          >
            <Github size={16} />
            View Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}