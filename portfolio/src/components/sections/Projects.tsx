import { motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useProjects } from '../../hooks/useProjects'
import { useTheme } from '../../contexts/ThemeContext'
import { getThemeClasses } from '../../utils/styles'
import { staggerContainer } from '../../utils/animations'
import { ProjectCard } from '../projects/ProjectCard'
import { ProjectFilters } from '../projects/ProjectFilters'
import { ProjectsHeader } from '../projects/ProjectsHeader'
import { ProjectsCTA } from '../projects/ProjectsCTA'

const Projects = () => {
  const [ref, inView] = useIntersectionObserver()
  const [filter, setFilter] = useState('all')
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)
  const { projects, loading, error, refreshProjects } = useProjects()

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Apps' },
    { key: 'creative', label: 'Creative' },
    { key: 'template', label: 'Templates' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <ProjectsHeader 
            loading={loading}
            error={error}
            onRefresh={refreshProjects}
          />

          {/* Filter Buttons */}
          <ProjectFilters 
            categories={categories}
            activeFilter={filter}
            onFilterChange={setFilter}
          />

          {/* Projects Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <RefreshCw size={32} className={`animate-spin ${themeClasses.text.accent}`} />
            </div>
          ) : (
            <motion.div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          )}

          {/* CTA */}
          <ProjectsCTA />
        </motion.div>
      </div>
    </section>
  )
}

export default Projects