export interface CacheData<T> {
  data: T
  timestamp: number
  expiresIn: number // milliseconds
}

export class CacheManager {
  private static instance: CacheManager
  
  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager()
    }
    return CacheManager.instance
  }
  
  set<T>(key: string, data: T, expiresInHours = 24): void {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
      expiresIn: expiresInHours * 60 * 60 * 1000 // convert hours to milliseconds
    }
    
    try {
      localStorage.setItem(key, JSON.stringify(cacheData))
    } catch (error) {
      console.warn('Failed to cache data:', error)
    }
  }
  
  get<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(key)
      if (!cached) return null
      
      const cacheData: CacheData<T> = JSON.parse(cached)
      const isExpired = Date.now() - cacheData.timestamp > cacheData.expiresIn
      
      if (isExpired) {
        this.remove(key)
        return null
      }
      
      return cacheData.data
    } catch (error) {
      console.warn('Failed to retrieve cached data:', error)
      return null
    }
  }
  
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn('Failed to remove cached data:', error)
    }
  }
  
  clear(): void {
    try {
      // Only clear our cache keys
      const keysToRemove: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && (key.startsWith('github-') || key.startsWith('leetcode-'))) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key))
    } catch (error) {
      console.warn('Failed to clear cache:', error)
    }
  }
}

export const cache = CacheManager.getInstance()