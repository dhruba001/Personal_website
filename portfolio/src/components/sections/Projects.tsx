import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Play } from 'lucide-react'
import { useState } from 'react'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'NetflixGPT',
      description: 'AI-powered streaming platform with intelligent content recommendations using OpenAI GPT-3.5 and TMDB API integration.',
      image: '/api/placeholder/600/400',
      tags: ['React', 'Redux', 'OpenAI', 'Firebase', 'Tailwind'],
      category: 'web',
      github: 'https://github.com/dhruba001/NetflixGPT',
      demo: '#',
      featured: true
    },
    {
      id: 2,
      title: 'QuickBite',
      description: 'Full-stack food delivery web application with real-time order tracking, payment integration, and responsive design.',
      image: '/api/placeholder/600/400',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      category: 'web',
      github: 'https://github.com/dhruba001/QuickBite',
      demo: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Floating Dots',
      description: 'Interactive web experience with mesmerizing particle animations and fluid dynamics using Canvas API and mathematical algorithms.',
      image: '/api/placeholder/600/400',
      tags: ['JavaScript', 'Canvas API', 'CSS3', 'Animation'],
      category: 'creative',
      github: 'https://github.com/dhruba001/floating-dots',
      demo: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Task Manager Pro',
      description: 'Collaborative task management application with drag-and-drop functionality, team workspaces, and real-time collaboration.',
      image: '/api/placeholder/600/400',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      category: 'web',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Portfolio Template',
      description: 'Modern, responsive portfolio template with dark mode, smooth animations, and customizable components for developers.',
      image: '/api/placeholder/600/400',
      tags: ['React', 'Framer Motion', 'Tailwind', 'TypeScript'],
      category: 'template',
      github: '#',
      demo: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Weather Dashboard',
      description: 'Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      image: '/api/placeholder/600/400',
      tags: ['Vue.js', 'Weather API', 'Charts.js', 'Geolocation'],
      category: 'web',
      github: '#',
      demo: '#',
      featured: false
    }
  ]

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Apps' },
    { key: 'creative', label: 'Creative' },
    { key: 'template', label: 'Templates' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

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
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A showcase of my recent work and creative solutions
            </p>
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
                    : 'glass-effect text-gray-300 hover:text-white'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`glass-effect rounded-xl overflow-hidden card-shadow group ${
                  project.featured ? 'lg:col-span-2' : ''
                }`}
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center text-white/60">
                      <div className="text-6xl mb-4">🚀</div>
                      <div className="text-lg font-semibold">{project.title}</div>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300"
                      title="View Code"
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-400 text-xs rounded-full border border-yellow-400/30">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
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

                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors duration-300"
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors duration-300"
                    >
                      <Play size={16} />
                      Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

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