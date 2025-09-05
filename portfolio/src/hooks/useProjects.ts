import { useState, useEffect } from 'react'
import { getFilteredProjects, type ProjectData } from '../services/githubApi'

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const githubProjects = await getFilteredProjects()
      setProjects(githubProjects)
    } catch (err) {
      setError('Failed to load projects from GitHub')
      // Fallback projects if API fails
      setProjects([
        {
          id: 1,
          title: 'MovieGPT',
          description: 'AI-powered streaming platform with movie discovery features.',
          tags: ['React', 'Redux', 'Firebase'],
          category: 'web',
          github: 'https://github.com/dhruba001/MovieGPT',
          demo: 'https://moviegpt-de581.web.app/',
          featured: true,
          stars: 0,
          updatedAt: new Date().toISOString()
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const refreshProjects = () => {
    loadProjects()
  }

  return {
    projects,
    loading,
    error,
    refreshProjects
  }
}