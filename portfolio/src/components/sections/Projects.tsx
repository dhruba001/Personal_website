import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Star, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { getFilteredProjects, type ProjectData } from '../../services/githubApi'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [filter, setFilter] = useState('all')
  const { theme } = useTheme()
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        const githubProjects = await getFilteredProjects()
        setProjects(githubProjects)
      } catch (err) {
        setError('Failed to load projects from GitHub')
        // Fallback projects if API fails
        setProjects([
          {
            id: 1,
            title: 'MovieGPT',
            description: 'AI-powered streaming platform with movie discovery features.',
            tags: ['React', 'Redux', 'Firebase'],
            category: 'web',
            github: 'https://github.com/dhruba001/MovieGPT',
            demo: 'https://moviegpt-de581.web.app/',
            featured: true,
            stars: 0,
            updatedAt: new Date().toISOString()
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Apps' },
    { key: 'creative', label: 'Creative' },
    { key: 'template', label: 'Templates' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const refreshProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const githubProjects = await getFilteredProjects()
      setProjects(githubProjects)
    } catch (err) {
      setError('Failed to refresh projects')
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className={`text-4xl sm:text-5xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Featured <span className="text-gradient">Projects</span>
              </h2>
              <motion.button
                onClick={refreshProjects}
                disabled={loading}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg glass-effect transition-all duration-300 ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
                }`}
                title="Refresh projects from GitHub"
              >
                <RefreshCw size={20} className={`${loading ? 'animate-spin' : ''} ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </motion.button>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Live projects automatically synced from my GitHub
            </p>
            {error && (
              <p className="text-red-500 text-sm mt-2">
                {error} - Showing cached projects
              </p>
            )}
          </motion.div>

          {/* Filter Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => setFilter(category.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category.key
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

          {/* Projects Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <RefreshCw size={32} className={`animate-spin ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
          ) : (
            <motion.div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-xl overflow-hidden card-shadow group"
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className={`text-center ${
                      theme === 'dark' ? 'text-white/60' : 'text-gray-700'
                    }`}>
                      <div className="text-6xl mb-4">🚀</div>
                      <div className="text-lg font-semibold">{project.title}</div>
                    </div>
                  </div>
                  
                  {/* Overlay */}
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
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-xl font-bold group-hover:text-blue-400 transition-colors duration-300 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {project.stars > 0 && (
                        <div className="flex items-center gap-1">
                          <Star size={14} className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'} />
                          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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
                  
                  <p className={`text-sm mb-4 leading-relaxed ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {project.description}
                  </p>
                  
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
              ))}
            </motion.div>
          )}

          {/* More Projects CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.a
              href="https://github.com/dhruba001"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Github size={20} />
              View More on GitHub
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects