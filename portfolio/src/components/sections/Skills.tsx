import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

interface Skill {
  name: string
  logo: string
  color: string
}

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [activeCategory, setActiveCategory] = useState('frontend')
  const { theme } = useTheme()

  const skillCategories = {
    frontend: {
      title: 'Frontend Technologies',
      icon: '🎨',
      skills: [
        { 
          name: 'React', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
          color: 'bg-gradient-to-r from-blue-400 to-blue-600' 
        },
        { 
          name: 'TypeScript', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
          color: 'bg-gradient-to-r from-blue-500 to-blue-700' 
        },
        { 
          name: 'Next.js', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
          color: 'bg-gradient-to-r from-gray-600 to-gray-800' 
        },
        { 
          name: 'Vue.js', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
          color: 'bg-gradient-to-r from-green-400 to-green-600' 
        },
        { 
          name: 'Tailwind CSS', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
          color: 'bg-gradient-to-r from-cyan-400 to-cyan-600' 
        },
        { 
          name: 'HTML5/CSS3', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
          color: 'bg-gradient-to-r from-orange-400 to-red-500' 
        },
      ]
    },
    backend: {
      title: 'Backend & Database',
      icon: '⚙️',
      skills: [
        { 
          name: 'Node.js', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
          color: 'bg-gradient-to-r from-green-500 to-green-700' 
        },
        { 
          name: 'Python', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
          color: 'bg-gradient-to-r from-yellow-400 to-blue-500' 
        },
        { 
          name: 'Express.js', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
          color: 'bg-gradient-to-r from-gray-500 to-gray-700' 
        },
        { 
          name: 'MongoDB', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
          color: 'bg-gradient-to-r from-green-600 to-green-800' 
        },
        { 
          name: 'PostgreSQL', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
          color: 'bg-gradient-to-r from-blue-600 to-blue-800' 
        },
        { 
          name: 'Firebase', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg',
          color: 'bg-gradient-to-r from-yellow-500 to-orange-500' 
        },
      ]
    },
    tools: {
      title: 'Tools & Platforms',
      icon: '🛠️',
      skills: [
        { 
          name: 'Git', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
          color: 'bg-gradient-to-r from-red-500 to-red-700' 
        },
        { 
          name: 'Docker', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
          color: 'bg-gradient-to-r from-blue-400 to-blue-600' 
        },
        { 
          name: 'VS Code', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
          color: 'bg-gradient-to-r from-blue-500 to-blue-700' 
        },
        { 
          name: 'AWS', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
          color: 'bg-gradient-to-r from-orange-400 to-yellow-500' 
        },
        { 
          name: 'Figma', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
          color: 'bg-gradient-to-r from-purple-400 to-pink-500' 
        },
        { 
          name: 'Vercel', 
          logo: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png',
          color: 'bg-gradient-to-r from-gray-700 to-gray-900' 
        },
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

  const SkillCard = ({ skill, index }: { skill: Skill, index: number }) => {
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
              skill.name === 'Next.js' && theme === 'light' 
                ? 'filter invert' 
                : skill.name === 'Express.js' && theme === 'light'
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
        <span className={`font-medium text-sm ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{skill.name}</span>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill, index) => (
              <SkillCard key={`${activeCategory}-${skill.name}`} skill={skill} index={index} />
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