import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Target, Trophy, Calendar, TrendingUp, Flame } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface LeetCodeStats {
  totalSolved: number
  totalQuestions: number
  acceptanceRate: number
  ranking: number
  contributionPoints: number
  reputation: number
}

interface ProblemStats {
  easy: { solved: number; total: number }
  medium: { solved: number; total: number }
  hard: { solved: number; total: number }
}

interface StreakData {
  currentStreak: number
  longestStreak: number
  recentActivity: { date: string; count: number }[]
}

const LeetCodeDashboard = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const { theme } = useTheme()
  const [stats, setStats] = useState<LeetCodeStats | null>(null)
  const [problemStats, setProblemStats] = useState<ProblemStats | null>(null)
  const [streakData, setStreakData] = useState<StreakData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Since LeetCode doesn't have a public API, I'll simulate realistic data
    const fetchLeetCodeData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock realistic LeetCode stats
        const mockStats: LeetCodeStats = {
          totalSolved: 347,
          totalQuestions: 2847,
          acceptanceRate: 67.8,
          ranking: 125840,
          contributionPoints: 1580,
          reputation: 892
        }
        
        const mockProblemStats: ProblemStats = {
          easy: { solved: 156, total: 724 },
          medium: { solved: 145, total: 1508 },
          hard: { solved: 46, total: 615 }
        }
        
        // Generate streak data
        const generateStreakData = (): StreakData => {
          const recentActivity = []
          const today = new Date()
          
          for (let i = 29; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)
            
            // Generate realistic activity pattern
            const dayOfWeek = date.getDay()
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
            
            // Higher chance of activity on weekdays
            const activityChance = isWeekend ? 0.3 : 0.8
            const count = Math.random() < activityChance ? 
              Math.floor(Math.random() * 8) + 1 : 0
            
            recentActivity.push({
              date: date.toISOString().split('T')[0],
              count
            })
          }
          
          // Calculate current streak
          let currentStreak = 0
          for (let i = recentActivity.length - 1; i >= 0; i--) {
            if (recentActivity[i].count > 0) {
              currentStreak++
            } else {
              break
            }
          }
          
          return {
            currentStreak,
            longestStreak: 23,
            recentActivity
          }
        }
        
        setStats(mockStats)
        setProblemStats(mockProblemStats)
        setStreakData(generateStreakData())
        setLoading(false)
      } catch (error) {
        console.error('Error fetching LeetCode data:', error)
        setLoading(false)
      }
    }

    fetchLeetCodeData()
  }, [])

  const getActivityColor = (count: number) => {
    if (count === 0) return theme === 'dark' ? '#0d1117' : '#ebedf0'
    if (count <= 2) return theme === 'dark' ? '#0e4429' : '#9be9a8'
    if (count <= 4) return theme === 'dark' ? '#006d32' : '#40c463'
    if (count <= 6) return theme === 'dark' ? '#26a641' : '#30a14e'
    return theme === 'dark' ? '#39d353' : '#216e39'
  }

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
                value: stats?.totalSolved || 0, 
                total: stats?.totalQuestions || 0,
                color: 'text-green-400' 
              },
              { 
                icon: TrendingUp, 
                label: 'Acceptance Rate', 
                value: `${stats?.acceptanceRate || 0}%`, 
                color: 'text-blue-400' 
              },
              { 
                icon: Trophy, 
                label: 'Global Ranking', 
                value: `#${stats?.ranking?.toLocaleString() || 0}`, 
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
                    solved: problemStats?.easy.solved || 0,
                    total: problemStats?.easy.total || 0,
                    color: 'bg-green-500',
                    lightColor: 'bg-green-100',
                    textColor: 'text-green-600'
                  },
                  { 
                    level: 'Medium', 
                    solved: problemStats?.medium.solved || 0,
                    total: problemStats?.medium.total || 0,
                    color: 'bg-yellow-500',
                    lightColor: 'bg-yellow-100',
                    textColor: 'text-yellow-600'
                  },
                  { 
                    level: 'Hard', 
                    solved: problemStats?.hard.solved || 0,
                    total: problemStats?.hard.total || 0,
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

          {/* Streak Information & Activity */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
            {/* Streak Stats */}
            <motion.div className="glass-effect rounded-2xl p-8">
              <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
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
                    {streakData?.currentStreak || 0}
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
                    {streakData?.longestStreak || 0}
                  </div>
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Longest Streak (days)
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div className="glass-effect rounded-2xl p-8">
              <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <Calendar size={24} />
                Recent Activity
              </h3>
              
              <div className="grid grid-cols-10 gap-1">
                {streakData?.recentActivity.map((day, index) => (
                  <motion.div
                    key={day.date}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.8 + index * 0.02 }}
                    className="w-6 h-6 rounded-sm cursor-pointer hover:ring-2 hover:ring-orange-400"
                    style={{ backgroundColor: getActivityColor(day.count) }}
                    title={`${day.count} problems solved on ${day.date}`}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-4 text-sm">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Less
                </span>
                <div className="flex gap-1">
                  {[0, 2, 4, 6, 8].map(count => (
                    <div
                      key={count}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: getActivityColor(count) }}
                    />
                  ))}
                </div>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  More
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default LeetCodeDashboard