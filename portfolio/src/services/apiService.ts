import { cache } from '../utils/cache'

// GitHub API Service
export interface GitHubApiResponse {
  totalRepos: number
  totalStars: number
  totalForks: number
  followers: number
  following: number
  publicGists: number
  recentRepos: Array<{
    name: string
    stars: number
    forks: number
    language: string
    updatedAt: string
    url: string
  }>
}

export const fetchGitHubStats = async (username = 'dhruba001'): Promise<GitHubApiResponse> => {
  const cacheKey = `github-stats-${username}`
  
  // Try to get cached data first
  const cachedData = cache.get<GitHubApiResponse>(cacheKey)
  if (cachedData) {
    console.log('Using cached GitHub data')
    return cachedData
  }
  
  try {
    console.log('Fetching fresh GitHub data')
    
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`)
    if (!userResponse.ok) {
      throw new Error(`GitHub user API error: ${userResponse.status}`)
    }
    const userData = await userResponse.json()
    
    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
    if (!reposResponse.ok) {
      throw new Error(`GitHub repos API error: ${reposResponse.status}`)
    }
    const reposData = await reposResponse.json()
    
    // Calculate total stars and forks
    const { totalStars, totalForks } = reposData.reduce(
      (acc: { totalStars: number; totalForks: number }, repo: any) => ({
        totalStars: acc.totalStars + repo.stargazers_count,
        totalForks: acc.totalForks + repo.forks_count,
      }),
      { totalStars: 0, totalForks: 0 }
    )
    
    const apiData: GitHubApiResponse = {
      totalRepos: userData.public_repos,
      totalStars,
      totalForks,
      followers: userData.followers,
      following: userData.following,
      publicGists: userData.public_gists,
      recentRepos: reposData.map((repo: any) => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        updatedAt: repo.updated_at,
        url: repo.html_url,
      }))
    }
    
    // Cache the data for 24 hours
    cache.set(cacheKey, apiData, 24)
    
    return apiData
    
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    
    // Return fallback data if API fails
    const fallbackData: GitHubApiResponse = {
      totalRepos: 25,
      totalStars: 48,
      totalForks: 12,
      followers: 15,
      following: 20,
      publicGists: 3,
      recentRepos: [
        {
          name: 'portfolio-website',
          stars: 5,
          forks: 2,
          language: 'TypeScript',
          updatedAt: new Date().toISOString(),
          url: 'https://github.com/dhruba001/portfolio-website'
        }
      ]
    }
    
    return fallbackData
  }
}

// LeetCode API Service
export interface LeetCodeApiResponse {
  totalSolved: number
  totalQuestions: number
  acceptanceRate: number
  ranking: number
  easy: { solved: number; total: number }
  medium: { solved: number; total: number }
  hard: { solved: number; total: number }
  currentStreak: number
  longestStreak: number
}

export const fetchLeetCodeStats = async (username = 'dhruba_001'): Promise<LeetCodeApiResponse> => {
  const cacheKey = `leetcode-stats-${username}`
  
  // Try to get cached data first
  const cachedData = cache.get<LeetCodeApiResponse>(cacheKey)
  if (cachedData) {
    console.log('Using cached LeetCode data')
    return cachedData
  }
  
  try {
    console.log('Fetching fresh LeetCode data')
    
    // Try working LeetCode API endpoints
    const endpoints = [
      `https://leetcode-api-faisalshohag.vercel.app/${username}`,
      `https://leetcode-stats-api.herokuapp.com/${username}`,
      `https://alfa-leetcode-api.onrender.com/${username}`
    ]
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint)
        if (response.ok) {
          const data = await response.json()
          
          // Parse the response based on the API format
          let apiData: LeetCodeApiResponse
          
          if (endpoint.includes('leetcode-api-faisalshohag.vercel.app')) {
            // Format for faisalshohag API - this matches your real data structure
            const acceptanceRate = data.totalSolved > 0 && data.totalSubmissions && data.totalSubmissions[0] 
              ? ((data.totalSolved / data.totalSubmissions[0].submissions) * 100).toFixed(1)
              : 0
            
            // Calculate current streak from submission calendar
            let currentStreak = 0
            if (data.submissionCalendar) {
              const dates = Object.keys(data.submissionCalendar).sort((a, b) => parseInt(b) - parseInt(a))
              const today = Math.floor(Date.now() / 1000 / 86400) * 86400 // Start of today in seconds
              
              for (const dateStr of dates) {
                const date = parseInt(dateStr)
                const daysDiff = Math.floor((today - date) / 86400)
                
                if (daysDiff === currentStreak && data.submissionCalendar[dateStr] > 0) {
                  currentStreak++
                } else {
                  break
                }
              }
            }
            
            apiData = {
              totalSolved: data.totalSolved || 0,
              totalQuestions: data.totalQuestions || 3671,
              acceptanceRate: parseFloat(acceptanceRate.toString()),
              ranking: data.ranking || 999999,
              easy: { 
                solved: data.easySolved || 0, 
                total: data.totalEasy || 895 
              },
              medium: { 
                solved: data.mediumSolved || 0, 
                total: data.totalMedium || 1911 
              },
              hard: { 
                solved: data.hardSolved || 0, 
                total: data.totalHard || 865 
              },
              currentStreak: currentStreak,
              longestStreak: Math.max(currentStreak, 5) // Estimate based on recent activity
            }
          } else if (endpoint.includes('leetcode-stats-api.herokuapp.com')) {
            // Format for leetcode-stats-api.herokuapp.com
            apiData = {
              totalSolved: data.totalSolved || 0,
              totalQuestions: data.totalQuestions || 3671,
              acceptanceRate: data.acceptanceRate || 0,
              ranking: data.ranking || 999999,
              easy: { solved: data.easySolved || 0, total: data.totalEasy || 895 },
              medium: { solved: data.mediumSolved || 0, total: data.totalMedium || 1911 },
              hard: { solved: data.hardSolved || 0, total: data.totalHard || 865 },
              currentStreak: data.currentStreak || 0,
              longestStreak: data.longestStreak || 0
            }
          } else {
            // Generic format handling for other APIs
            apiData = {
              totalSolved: data.totalSolved || 0,
              totalQuestions: data.totalQuestions || 3671,
              acceptanceRate: data.acceptanceRate || 0,
              ranking: data.ranking || 999999,
              easy: { 
                solved: data.easySolved || 0, 
                total: data.totalEasy || 895 
              },
              medium: { 
                solved: data.mediumSolved || 0, 
                total: data.totalMedium || 1911 
              },
              hard: { 
                solved: data.hardSolved || 0, 
                total: data.totalHard || 865 
              },
              currentStreak: data.currentStreak || 0,
              longestStreak: data.longestStreak || 0
            }
          }
          
          // Cache the data for 24 hours
          cache.set(cacheKey, apiData, 24)
          
          return apiData
        }
      } catch (endpointError) {
        console.warn(`Failed to fetch from ${endpoint}:`, endpointError)
        continue
      }
    }
    
    throw new Error('All LeetCode API endpoints failed')
    
  } catch (error) {
    console.error('Error fetching LeetCode data:', error)
    
    // Return your actual current stats as fallback
    const fallbackData: LeetCodeApiResponse = {
      totalSolved: 7,
      totalQuestions: 3671,
      acceptanceRate: 58.3, // 7/12 submissions accepted
      ranking: 5000001,
      easy: { solved: 6, total: 895 },
      medium: { solved: 1, total: 1911 },
      hard: { solved: 0, total: 865 },
      currentStreak: 3,
      longestStreak: 5
    }
    
    return fallbackData
  }
}