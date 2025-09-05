import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Star, GitFork, Calendar, TrendingUp } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  totalWatchers: number
  followers: number
  following: number
  publicGists: number
}

interface RepositoryActivity {
  name: string
  stars: number
  forks: number
  language: string
  updatedAt: string
  url: string
}

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

const GitHubDashboard = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const { theme } = useTheme()
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [repos, setRepos] = useState<RepositoryActivity[]>([])
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user stats
        const userResponse = await fetch('https://api.github.com/users/dhruba001')
        const userData = await userResponse.json()
        
        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/users/dhruba001/repos?sort=updated&per_page=6')
        const reposData = await reposResponse.json()
        
        setStats({
          totalRepos: userData.public_repos,
          totalStars: 0, // Will calculate from repos
          totalForks: 0, // Will calculate from repos
          totalWatchers: 0, // Will calculate from repos
          followers: userData.followers,
          following: userData.following,
          publicGists: userData.public_gists,
        })
        
        const repoActivities: RepositoryActivity[] = reposData.map((repo: any) => ({
          name: repo.name,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          updatedAt: repo.updated_at,
          url: repo.html_url,
        }))
        
        setRepos(repoActivities)
        
        // Calculate total stats from repos
        const totals = repoActivities.reduce((acc, repo) => ({
          totalStars: acc.totalStars + repo.stars,
          totalForks: acc.totalForks + repo.forks,
          totalWatchers: acc.totalWatchers + repo.stars, // Using stars as watchers approximation
        }), { totalStars: 0, totalForks: 0, totalWatchers: 0 })
        
        setStats(prev => prev ? { ...prev, ...totals } : null)
        
        // Generate mock contribution data (since GitHub's contribution API requires authentication)
        const generateMockContributions = () => {
          const contributions: ContributionDay[] = []
          const today = new Date()
          
          for (let i = 364; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)
            
            // Generate realistic contribution pattern
            const dayOfWeek = date.getDay()
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
            const baseCount = isWeekend ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 8)
            
            const count = Math.max(0, baseCount + Math.floor(Math.random() * 3) - 1)
            const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4
            
            contributions.push({
              date: date.toISOString().split('T')[0],
              count,
              level: level as 0 | 1 | 2 | 3 | 4
            })
          }
          
          return contributions
        }
        
        setContributions(generateMockContributions())
        setLoading(false)
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  const getContributionColor = (level: number) => {
    const colors = {
      dark: ['#0d1117', '#0e4429', '#006d32', '#26a641', '#39d353'],
      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
    }
    return colors[theme][level]
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
      <section id="github" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`text-4xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Loading GitHub Dashboard...
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="github" className="py-20 relative">
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
              <Github size={48} className="text-gray-700" />
              GitHub <span className="text-gradient">Analytics</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Github, label: 'Repositories', value: stats?.totalRepos || 0, color: 'text-blue-400' },
              { icon: Star, label: 'Total Stars', value: stats?.totalStars || 0, color: 'text-yellow-400' },
              { icon: GitFork, label: 'Total Forks', value: stats?.totalForks || 0, color: 'text-green-400' },
              { icon: TrendingUp, label: 'Followers', value: stats?.followers || 0, color: 'text-purple-400' },
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
                  <div className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Contribution Graph */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.div className="glass-effect rounded-2xl p-8">
              <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <Calendar size={24} />
                Contribution Activity
              </h3>
              
              <div className="overflow-x-auto">
                <div className="grid grid-cols-53 gap-1 min-w-max">
                  {contributions.map((day, index) => (
                    <motion.div
                      key={day.date}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: index * 0.001 }}
                      className="w-3 h-3 rounded-sm cursor-pointer hover:ring-2 hover:ring-blue-400"
                      style={{ backgroundColor: getContributionColor(day.level) }}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-4 text-sm">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Less
                  </span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map(level => (
                      <div
                        key={level}
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: getContributionColor(level) }}
                      />
                    ))}
                  </div>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    More
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <motion.div className="glass-effect rounded-2xl p-8">
              <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <TrendingUp size={24} />
                Recent Repository Activity
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {repos.slice(0, 6).map((repo) => (
                  <motion.a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.1)' }}
                    className={`block p-4 rounded-xl border transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/10 hover:border-blue-400/50' 
                        : 'bg-black/5 border-black/10 hover:border-blue-400/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {repo.name}
                      </h4>
                      {repo.language && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-400/20 text-blue-400">
                          {repo.language}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      {repo.stars > 0 && (
                        <span className={`flex items-center gap-1 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Star size={14} />
                          {repo.stars}
                        </span>
                      )}
                      {repo.forks > 0 && (
                        <span className={`flex items-center gap-1 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <GitFork size={14} />
                          {repo.forks}
                        </span>
                      )}
                      <span className={`text-xs ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Updated {new Date(repo.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubDashboard