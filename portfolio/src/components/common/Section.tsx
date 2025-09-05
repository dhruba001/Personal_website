import React from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { staggerContainer } from '../../utils/animations'

interface SectionProps {
  id: string
  title: React.ReactNode
  subtitle?: string
  children: React.ReactNode
  className?: string
}

/**
 * Reusable section wrapper with consistent structure and animations
 * Eliminates repetitive section setup code
 */
export const Section: React.FC<SectionProps> = ({ 
  id, 
  title, 
  subtitle, 
  children, 
  className = '' 
}) => {
  const [ref, inView] = useIntersectionObserver()

  return (
    <section id={id} className={`py-20 relative ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div 
            variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
            {subtitle && (
              <p className="text-lg max-w-2xl mx-auto text-gray-300">
                {subtitle}
              </p>
            )}
          </motion.div>

          {children}
        </motion.div>
      </div>
    </section>
  )
}