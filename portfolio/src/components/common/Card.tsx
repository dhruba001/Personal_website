import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, hoverLift } from '../../utils/animations'
import { cardClasses } from '../../utils/styles'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

/**
 * Reusable card component with consistent styling and animations
 */
export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={hover ? hoverLift : undefined}
      className={`${cardClasses} ${className}`}
    >
      {children}
    </motion.div>
  )
}