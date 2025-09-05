import { useInView } from 'react-intersection-observer'

/**
 * Simple hook to detect when an element is in view
 * Defaults that work well for most scroll animations
 */
export const useIntersectionObserver = () => {
  return useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
}