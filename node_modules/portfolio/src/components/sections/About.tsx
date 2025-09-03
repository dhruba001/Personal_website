import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Coffee, Lightbulb, Heart } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  const stats = [
    { icon: Code, label: 'Projects Completed', value: '50+', color: 'text-blue-400' },
    { icon: Coffee, label: 'Cups of Coffee', value: '1000+', color: 'text-amber-400' },
    { icon: Lightbulb, label: 'Creative Solutions', value: '∞', color: 'text-yellow-400' },
    { icon: Heart, label: 'Passion Level', value: '100%', color: 'text-red-400' },
  ]

  return (
    <section id="about" className="py-20 relative">
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
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div 
                className="glass-effect rounded-2xl p-8"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="font-mono text-lg mb-6">
                  <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>const</span>{' '}
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>dhruba</span>{' '}
                  <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>=</span>{' '}
                  <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>{'{'}</span>
                </div>
                
                <div className={`ml-6 space-y-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <div>
                    <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>location</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>:</span>{' '}
                    <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>"🌍 Earth"</span>,
                  </div>
                  <div>
                    <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>currentFocus</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>:</span>{' '}
                    <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>"Building amazing web experiences"</span>,
                  </div>
                  <div>
                    <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>interests</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>:</span>{' '}
                    <span className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}>
                      ["Web Development", "UI/UX Design", "Open Source"]
                    </span>,
                  </div>
                  <div>
                    <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>funFact</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>:</span>{' '}
                    <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>"I turn coffee ☕ into code 🚀"</span>,
                  </div>
                  <div>
                    <span className={theme === 'dark' ? 'text-red-400' : 'text-red-600'}>motto</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>:</span>{' '}
                    <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>"Code with passion, create with purpose"</span>,
                  </div>
                </div>
                
                <div className="font-mono text-lg mt-6">
                  <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>{'}'}</span>
                  <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>;</span>
                </div>
              </motion.div>

              <motion.p 
                variants={itemVariants}
                className={`text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                I'm a passionate full-stack developer with expertise in modern web technologies. 
                I love creating digital experiences that are not only functional but also beautiful 
                and user-friendly. When I'm not coding, you'll find me exploring new technologies, 
                contributing to open source, or brainstorming the next big idea.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3"
              >
                {[
                  'React', 'TypeScript', 'Node.js', 'Python', 'Next.js',
                  'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'
                ].map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full text-sm font-medium text-blue-300 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="glass-effect rounded-xl p-6 text-center card-shadow"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, delay: index * 0.5 }}
                        className={`${stat.color} mb-3 flex justify-center`}
                      >
                        <Icon size={32} />
                      </motion.div>
                      <div className={`text-2xl font-bold mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {stat.value}
                      </div>
                      <div className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {stat.label}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="glass-effect rounded-xl p-6"
              >
                <h3 className={`text-xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Current Learning Focus
                </h3>
                <div className="space-y-3">
                  {[
                    'Advanced React Patterns',
                    'Web3 Development',
                    'Machine Learning',
                    'System Design'
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About