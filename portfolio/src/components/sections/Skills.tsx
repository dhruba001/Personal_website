import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface Skill {
  name: string
  level: number
  color: string
}

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeCategory, setActiveCategory] = useState('frontend')
  const { theme } = useTheme()

  const skillCategories = {
    frontend: {
      title: 'Frontend Technologies',
      icon: '🎨',
      skills: [
        { name: 'React', level: 95, color: 'bg-gradient-to-r from-blue-400 to-blue-600' },
        { name: 'TypeScript', level: 90, color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
        { name: 'Next.js', level: 85, color: 'bg-gradient-to-r from-gray-600 to-gray-800' },
        { name: 'Vue.js', level: 80, color: 'bg-gradient-to-r from-green-400 to-green-600' },
        { name: 'Tailwind CSS', level: 92, color: 'bg-gradient-to-r from-cyan-400 to-cyan-600' },
        { name: 'HTML5/CSS3', level: 95, color: 'bg-gradient-to-r from-orange-400 to-red-500' },
      ]
    },
    backend: {
      title: 'Backend & Database',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 88, color: 'bg-gradient-to-r from-green-500 to-green-700' },
        { name: 'Python', level: 85, color: 'bg-gradient-to-r from-yellow-400 to-blue-500' },
        { name: 'Express.js', level: 82, color: 'bg-gradient-to-r from-gray-500 to-gray-700' },
        { name: 'MongoDB', level: 80, color: 'bg-gradient-to-r from-green-600 to-green-800' },
        { name: 'PostgreSQL', level: 78, color: 'bg-gradient-to-r from-blue-600 to-blue-800' },
        { name: 'Firebase', level: 75, color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
      ]
    },
    tools: {
      title: 'Tools & Platforms',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 90, color: 'bg-gradient-to-r from-red-500 to-red-700' },
        { name: 'Docker', level: 75, color: 'bg-gradient-to-r from-blue-400 to-blue-600' },
        { name: 'AWS', level: 70, color: 'bg-gradient-to-r from-orange-400 to-yellow-500' },
        { name: 'VS Code', level: 95, color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
        { name: 'Figma', level: 85, color: 'bg-gradient-to-r from-purple-400 to-pink-500' },
        { name: 'Vercel', level: 88, color: 'bg-gradient-to-r from-gray-700 to-gray-900' },
      ]
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

  const ProgressBar = ({ skill, index }: { skill: Skill, index: number }) => {
    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="glass-effect rounded-lg p-4 card-shadow"
      >
        <div className="flex justify-between items-center mb-3">
          <span className={`font-medium ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{skill.name}</span>
          <span className={`font-bold ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full ${skill.color} rounded-full`}
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Tech <span className="text-gradient">Arsenal</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Constantly evolving skillset with expertise across the full development stack
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {Object.entries(skillCategories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : `glass-effect transition-colors duration-300 ${
                      theme === 'dark' 
                        ? 'text-gray-300 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.title}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill, index) => (
              <ProgressBar key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-effect rounded-xl p-6 text-center card-shadow"
            >
              <div className="text-3xl mb-3">📚</div>
              <h3 className={`text-xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Always Learning</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Continuously exploring new technologies and best practices
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-effect rounded-xl p-6 text-center card-shadow"
            >
              <div className="text-3xl mb-3">🚀</div>
              <h3 className={`text-xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Performance Focused</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Optimizing for speed, scalability, and user experience
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-effect rounded-xl p-6 text-center card-shadow"
            >
              <div className="text-3xl mb-3">🌟</div>
              <h3 className={`text-xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Best Practices</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Following industry standards and clean code principles
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills