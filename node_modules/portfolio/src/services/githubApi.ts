export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  stargazers_count: number
  updated_at: string
  pushed_at: string
  fork: boolean
}

export interface ProjectData {
  id: number
  title: string
  description: string
  tags: string[]
  category: string
  github: string
  demo: string
  featured: boolean
  stars: number
  updatedAt: string
}

const GITHUB_USERNAME = 'dhruba001'
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`

export const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`${GITHUB_API_URL}?sort=updated&per_page=50`)
    if (!response.ok) {
      throw new Error('Failed to fetch repositories')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    throw error
  }
}

export const transformRepoToProject = (repo: GitHubRepo): ProjectData => {
  const getCategory = (repo: GitHubRepo): string => {
    const topics = repo.topics || []
    const name = repo.name.toLowerCase()
    
    if (topics.includes('portfolio') || topics.includes('template') || name.includes('portfolio')) {
      return 'template'
    }
    if (topics.includes('animation') || topics.includes('creative') || name.includes('floating') || name.includes('particle')) {
      return 'creative'
    }
    return 'web'
  }

  const getTags = (repo: GitHubRepo): string[] => {
    const tags = []
    
    if (repo.language) tags.push(repo.language)
    if (repo.topics) tags.push(...repo.topics.slice(0, 4))
    
    // Add common tech stack based on repo name/description
    const content = `${repo.name} ${repo.description || ''}`.toLowerCase()
    if (content.includes('react')) tags.push('React')
    if (content.includes('typescript')) tags.push('TypeScript')
    if (content.includes('tailwind')) tags.push('Tailwind CSS')
    if (content.includes('firebase')) tags.push('Firebase')
    if (content.includes('redux')) tags.push('Redux')
    if (content.includes('next')) tags.push('Next.js')
    
    return [...new Set(tags)].slice(0, 5)
  }

  const isFeatured = (repo: GitHubRepo): boolean => {
    return repo.stargazers_count > 0 || 
           repo.topics?.includes('featured') || 
           ['MovieGPT', 'QuickBite', 'floating-dots'].includes(repo.name)
  }

  return {
    id: repo.id,
    title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || 'A project showcasing modern web development techniques.',
    tags: getTags(repo),
    category: getCategory(repo),
    github: repo.html_url,
    demo: repo.homepage || '#',
    featured: isFeatured(repo),
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at
  }
}

export const getFilteredProjects = async (): Promise<ProjectData[]> => {
  try {
    const repos = await fetchGitHubRepos()
    
    // Filter out forks and repos without descriptions (unless they're featured)
    const filteredRepos = repos.filter(repo => 
      !repo.fork && 
      (repo.description || repo.stargazers_count > 0 || ['MovieGPT', 'QuickBite', 'floating-dots', 'Personal_website'].includes(repo.name))
    )
    
    // Transform to project format and sort by featured/stars/date
    const projects = filteredRepos
      .map(transformRepoToProject)
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        if (a.stars !== b.stars) return b.stars - a.stars
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
    
    return projects.slice(0, 12) // Limit to 12 projects
  } catch (error) {
    console.error('Error getting filtered projects:', error)
    // Return fallback projects if API fails
    return []
  }
}