import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Target, Trophy, TrendingUp, Flame, ExternalLink } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { fetchLeetCodeStats } from '../../services/apiService'
import type { LeetCodeApiResponse } from '../../services/apiService'


const LeetCodeDashboard = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const { theme } = useTheme()
  const [data, setData] = useState<LeetCodeApiResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLeetCodeData = async () => {
      try {
        const leetcodeData = await fetchLeetCodeStats('dhruba_001')
        setData(leetcodeData)
        setLoading(false)
      } catch (error) {
        console.error('Error loading LeetCode data:', error)
        setLoading(false)
      }
    }

    loadLeetCodeData()
  }, [])


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  if (loading) {
    return (
      <section id="leetcode" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`text-4xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Loading LeetCode Dashboard...
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="leetcode" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4 flex items-center justify-center gap-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Code size={48} className="text-orange-500" />
              LeetCode <span className="text-gradient">Progress</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto"></div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {[
              { 
                icon: Target, 
                label: 'Problems Solved', 
                value: data?.totalSolved || 0, 
                total: data?.totalQuestions || 0,
                color: 'text-green-400' 
              },
              { 
                icon: TrendingUp, 
                label: 'Acceptance Rate', 
                value: `${data?.acceptanceRate || 0}%`, 
                color: 'text-blue-400' 
              },
              { 
                icon: Trophy, 
                label: 'Global Ranking', 
                value: `#${data?.ranking?.toLocaleString() || 0}`, 
                color: 'text-yellow-400' 
              },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-effect rounded-xl p-6 text-center"
                >
                  <Icon size={32} className={`${stat.color} mb-3 mx-auto`} />
                  <div className={`text-2xl font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </div>
                  {stat.total && (
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      out of {stat.total}
                    </div>
                  )}
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Problem Difficulty Breakdown */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.div className="glass-effect rounded-2xl p-8">
              <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <Target size={24} />
                Problem Difficulty Breakdown
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { 
                    level: 'Easy', 
                    solved: data?.easy.solved || 0,
                    total: data?.easy.total || 0,
                    color: 'bg-green-500',
                    lightColor: 'bg-green-100',
                    textColor: 'text-green-600'
                  },
                  { 
                    level: 'Medium', 
                    solved: data?.medium.solved || 0,
                    total: data?.medium.total || 0,
                    color: 'bg-yellow-500',
                    lightColor: 'bg-yellow-100',
                    textColor: 'text-yellow-600'
                  },
                  { 
                    level: 'Hard', 
                    solved: data?.hard.solved || 0,
                    total: data?.hard.total || 0,
                    color: 'bg-red-500',
                    lightColor: 'bg-red-100',
                    textColor: 'text-red-600'
                  },
                ].map((difficulty) => {
                  const percentage = (difficulty.solved / difficulty.total) * 100
                  
                  return (
                    <motion.div
                      key={difficulty.level}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.5 }}
                      className={`p-6 rounded-xl ${
                        theme === 'dark' ? 'bg-white/5' : difficulty.lightColor
                      }`}
                    >
                      <div className="text-center mb-4">
                        <h4 className={`text-lg font-semibold mb-2 ${difficulty.textColor}`}>
                          {difficulty.level}
                        </h4>
                        <div className={`text-2xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {difficulty.solved}
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          out of {difficulty.total}
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className={`w-full h-2 rounded-full overflow-hidden ${
                        theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
                          transition={{ delay: 0.8, duration: 1 }}
                          className={`h-full ${difficulty.color} rounded-full`}
                        />
                      </div>
                      
                      <div className="text-center mt-2">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {percentage.toFixed(1)}% completed
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Streak Information */}
          <motion.div variants={itemVariants} className="max-w-md mx-auto">
            <motion.div className="glass-effect rounded-2xl p-8">
              <h3 className={`text-2xl font-bold mb-6 flex items-center justify-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <Flame size={24} className="text-orange-500" />
                Coding Streak
              </h3>
              
              <div className="space-y-4">
                <div className="text-center p-6 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20">
                  <div className={`text-4xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                  }`}>
                    {data?.currentStreak || 0}
                  </div>
                  <div className={`text-lg ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Current Streak (days)
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {data?.longestStreak || 0}
                  </div>
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Longest Streak (days)
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Take me to LeetCode Button */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <motion.a
              href="https://leetcode.com/dhruba_001"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-400 hover:to-red-400 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ExternalLink size={20} />
              Take me to LeetCode
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default LeetCodeDashboard