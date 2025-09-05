# 🎣 Hooks Directory

> **Custom React hooks for reusable stateful logic**

## 📁 Directory Structure

```
hooks/
├── useIntersectionObserver.ts  # Scroll-triggered animations
├── useProjects.ts             # Project data management
└── README.md                  # This file
```

---

## 🔍 useIntersectionObserver.ts

### 🎯 Purpose
Simplified wrapper around `react-intersection-observer` for consistent scroll-triggered animations.

### 🧠 Why This Hook Exists

**Before** (repetitive setup in every component):
```tsx
const [ref, inView] = useInView({
  triggerOnce: true,
  threshold: 0.1,
})
```

**After** (simple, consistent):
```tsx
const [ref, inView] = useIntersectionObserver()
```

**Benefits**:
- **Consistency**: Same behavior everywhere
- **Less code**: No need to remember configuration options
- **Maintainability**: Change behavior globally from one place
- **Performance**: Optimized settings for smooth animations

### 📖 API Reference

#### Return Value
```tsx
const [ref, inView] = useIntersectionObserver()

// ref: RefObject to attach to DOM element
// inView: boolean - true when element is visible
```

#### Usage Example
```tsx
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { motion } from 'framer-motion'

const Component = () => {
  const [ref, inView] = useIntersectionObserver()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
    >
      This animates when scrolled into view!
    </motion.div>
  )
}
```

### 🔧 Configuration Details

#### Default Settings
```tsx
{
  triggerOnce: true,  // Only trigger animation once (performance)
  threshold: 0.1,     // Trigger when 10% of element is visible
}
```

**Why these settings**:
- **`triggerOnce: true`**: Animations don't re-trigger on scroll up (better performance, less distracting)
- **`threshold: 0.1`**: Early trigger feels more responsive than waiting for full visibility

#### Browser Support
- Modern browsers with Intersection Observer API
- Polyfill included in `react-intersection-observer`
- Graceful degradation (always returns `inView: true` if not supported)

### 🎨 Common Patterns

#### Pattern 1: Section Animations
```tsx
const Section = () => {
  const [ref, inView] = useIntersectionObserver()

  return (
    <motion.section
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <motion.h2 variants={fadeInUp}>Section Title</motion.h2>
      <motion.p variants={fadeInUp}>Section content...</motion.p>
    </motion.section>
  )
}
```

#### Pattern 2: Conditional Rendering
```tsx
const LazyComponent = () => {
  const [ref, inView] = useIntersectionObserver()

  return (
    <div ref={ref}>
      {inView && <ExpensiveComponent />}
    </div>
  )
}
```

#### Pattern 3: Progress Tracking
```tsx
const ProgressSection = () => {
  const [ref, inView] = useIntersectionObserver()
  
  useEffect(() => {
    if (inView) {
      // Track that user saw this section
      analytics.track('section_viewed', { section: 'about' })
    }
  }, [inView])

  return <div ref={ref}>Content...</div>
}
```

### ⚡ Performance Considerations

#### Memory Usage
- Hook automatically cleans up observers
- No memory leaks from unused observers
- Minimal overhead per component

#### Rendering Performance
- Only re-renders when visibility changes
- `triggerOnce: true` prevents unnecessary re-renders
- Optimized threshold value reduces calculations

### 🔧 Troubleshooting

#### Common Issues

**Animation not triggering**:
```tsx
// ❌ Forgot to attach ref
<motion.div animate={inView ? 'visible' : 'hidden'}>

// ✅ Attach ref to element
<motion.div ref={ref} animate={inView ? 'visible' : 'hidden'}>
```

**Multiple elements in one component**:
```tsx
// ❌ One hook for multiple elements
const [ref, inView] = useIntersectionObserver()
return (
  <>
    <div ref={ref}>First element</div>
    <div ref={ref}>Second element</div> {/* Won't work correctly */}
  </>
)

// ✅ Separate hook for each element
const [ref1, inView1] = useIntersectionObserver()
const [ref2, inView2] = useIntersectionObserver()
return (
  <>
    <div ref={ref1}>First element</div>
    <div ref={ref2}>Second element</div>
  </>
)
```

---

## 📊 useProjects.ts

### 🎯 Purpose
Manages project data fetching, loading states, error handling, and caching for the Projects section.

### 🧠 Why This Hook Exists

**Separates concerns**:
- **UI Components**: Focus on presentation
- **Data Logic**: Isolated in custom hook
- **Error Handling**: Centralized and reusable

**Benefits**:
- **Reusability**: Can be used in multiple components
- **Testing**: Easier to test data logic separately
- **Maintainability**: All project data logic in one place
- **Type Safety**: TypeScript ensures data structure consistency

### 📖 API Reference

#### Return Value
```tsx
const { projects, loading, error, refreshProjects } = useProjects()

// projects: ProjectData[] - Array of project objects
// loading: boolean - True when fetching data
// error: string | null - Error message or null if no error
// refreshProjects: () => void - Function to manually refresh data
```

#### Usage Example
```tsx
import { useProjects } from '../../hooks/useProjects'

const ProjectsSection = () => {
  const { projects, loading, error, refreshProjects } = useProjects()

  if (loading) return <div>Loading projects...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <button onClick={refreshProjects}>Refresh</button>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

### 🔧 Internal Implementation

#### Data Flow
```
useProjects() 
    ↓
loadProjects()
    ↓
getFilteredProjects() (GitHub API)
    ↓
Success: Update projects state
Failure: Set error, use fallback data
    ↓
Return { projects, loading, error, refreshProjects }
```

#### State Management
```tsx
const [projects, setProjects] = useState<ProjectData[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
```

#### Lifecycle
1. **Mount**: Automatically fetch projects
2. **Success**: Update projects, clear loading/error
3. **Error**: Set error message, use fallback data
4. **Refresh**: Reset states, refetch data

### 🌐 GitHub API Integration

#### Rate Limiting
- **Limit**: 60 requests/hour for unauthenticated users
- **Handling**: Graceful fallback to cached/static data
- **Solution**: Add `VITE_GITHUB_TOKEN` for higher limits (5000/hour)

#### Data Transformation
```tsx
// GitHub API Response → Internal ProjectData
{
  id: repo.id,
  title: repo.name,
  description: repo.description || 'No description available',
  tags: repo.topics || [],
  category: 'web', // Determined by repository topics/name
  github: repo.html_url,
  stars: repo.stargazers_count,
  featured: repo.stargazers_count > 5, // Auto-feature popular repos
  updatedAt: repo.updated_at
}
```

#### Filtering Logic
```tsx
// Only include repositories that are:
const filteredRepos = repos.filter(repo => 
  !repo.fork &&           // Not forked from another repo
  !repo.archived &&       // Not archived
  repo.visibility === 'public' && // Public repositories only
  repo.name !== 'username' // Exclude profile README repo
)
```

### 🎨 Error Handling Strategy

#### Error Types Handled
1. **Network errors**: No internet connection
2. **API errors**: GitHub API unavailable
3. **Rate limiting**: Too many requests
4. **Data parsing**: Invalid response format

#### Fallback System
```tsx
// If API fails, show static fallback projects
const fallbackProjects = [
  {
    id: 1,
    title: 'MovieGPT',
    description: 'AI-powered streaming platform...',
    tags: ['React', 'Redux', 'Firebase'],
    category: 'web',
    github: 'https://github.com/dhruba001/MovieGPT',
    featured: true,
    stars: 0,
    updatedAt: new Date().toISOString()
  }
]
```

#### Error UI Feedback
```tsx
// Error state shows:
// 1. Error message to user
// 2. "Showing cached projects" notice
// 3. Refresh button to retry
// 4. Fallback projects still display
```

### ⚡ Performance Optimizations

#### Caching Strategy
```tsx
// In-memory caching during session
let cachedProjects: ProjectData[] | null = null

// Only fetch if cache is empty
if (!cachedProjects) {
  cachedProjects = await fetchFromAPI()
}
```

#### Loading States
```tsx
// Optimistic updates
setLoading(true)  // Show spinner immediately
setError(null)    // Clear previous errors
// ... fetch data
setLoading(false) // Hide spinner when done
```

### 🔧 Configuration Options

#### Environment Variables
```bash
# Optional: Higher API rate limits
VITE_GITHUB_TOKEN=ghp_your_personal_access_token_here

# Development only - not needed for production
```

#### Customizing Data Sources
```tsx
// Modify getFilteredProjects() in src/services/githubApi.ts
// Change username, filtering logic, or data transformation
```

### 🔍 Debugging Guide

#### Common Issues

**No projects showing**:
```tsx
console.log('Projects hook state:', { projects, loading, error })
// Check: Are projects empty? Is loading stuck? Any errors?
```

**API rate limit exceeded**:
```tsx
// Error message: "API rate limit exceeded"
// Solution 1: Wait 1 hour for reset
// Solution 2: Add VITE_GITHUB_TOKEN environment variable
// Solution 3: Use fallback data temporarily
```

**Projects not updating**:
```tsx
// Check: Is refreshProjects() being called?
// Check: Network tab - is API request being made?
// Check: Are new projects meeting filter criteria?
```

#### Debug Logging
```tsx
// Add to useProjects hook for debugging
useEffect(() => {
  console.log('Projects loaded:', projects)
  console.log('Loading state:', loading)
  console.log('Error state:', error)
}, [projects, loading, error])
```

### 🎨 Extending the Hook

#### Adding New Features
```tsx
// Example: Add search functionality
export const useProjects = (searchTerm = '') => {
  // ... existing code
  
  const filteredProjects = useMemo(() => 
    projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    ), [projects, searchTerm]
  )

  return { projects: filteredProjects, loading, error, refreshProjects }
}
```

#### Adding Caching
```tsx
// Example: Add localStorage caching
const CACHE_KEY = 'portfolio_projects'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

const getCachedProjects = () => {
  const cached = localStorage.getItem(CACHE_KEY)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data
    }
  }
  return null
}

const setCachedProjects = (projects: ProjectData[]) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: projects,
    timestamp: Date.now()
  }))
}
```

---

## 🚀 Creating Custom Hooks

### 🎯 When to Create a Hook

**Create a custom hook when**:
- Logic is used in multiple components
- Complex stateful logic needs isolation
- API integrations need centralization
- Performance optimizations are needed

**Don't create a hook when**:
- Logic is only used once
- It's just a simple state variable
- No stateful logic involved

### 📖 Hook Creation Template

```tsx
import { useState, useEffect } from 'react'

// 1. Define return type interface
interface UseCustomHookReturn {
  data: any
  loading: boolean
  error: string | null
  refetch: () => void
}

// 2. Create the hook
export const useCustomHook = (params?: any): UseCustomHookReturn => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      // Fetch logic here
      const result = await api.getData(params)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [params])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}
```

### ✅ Hook Best Practices

#### Naming Convention
```tsx
// ✅ Start with "use"
const useProjects = () => {}
const useTheme = () => {}

// ❌ Don't start with "use"
const projects = () => {}
const getTheme = () => {}
```

#### Return Patterns
```tsx
// ✅ Object return (named properties)
return { data, loading, error }

// ✅ Array return (positional)
return [data, setData]

// ❌ Mixed patterns in same codebase
```

#### Dependency Arrays
```tsx
// ✅ Include all dependencies
useEffect(() => {
  fetchData(userId, filter)
}, [userId, filter])

// ❌ Missing dependencies
useEffect(() => {
  fetchData(userId, filter)
}, [])
```

### 🔧 Hook Testing Strategy

#### Unit Testing Hooks
```tsx
// Using @testing-library/react-hooks
import { renderHook } from '@testing-library/react-hooks'
import { useProjects } from './useProjects'

test('should fetch projects on mount', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useProjects())
  
  expect(result.current.loading).toBe(true)
  await waitForNextUpdate()
  expect(result.current.projects).toBeDefined()
})
```

#### Manual Testing
```tsx
// Add debug component for testing hooks
const DebugHook = () => {
  const hookResult = useCustomHook()
  return <pre>{JSON.stringify(hookResult, null, 2)}</pre>
}
```

---

## 🔧 Maintenance

### Regular Tasks
- Review hook complexity (split if too complex)
- Check for duplicate logic across hooks
- Update TypeScript types
- Test error handling paths

### Performance Monitoring
- Check for unnecessary re-renders
- Monitor API call frequency
- Optimize expensive calculations with `useMemo`
- Use `useCallback` for stable function references

### Refactoring Triggers
- Hook over 100 lines
- Multiple responsibilities
- Complex conditional logic
- Poor test coverage

---

*📝 Hooks should be focused, testable, and reusable. Extract common stateful patterns early.*