import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { getThemeClasses } from '../../utils/styles'
import { staggerContainer, fadeInUp } from '../../utils/animations'
import { TypewriterEffect } from '../hero/TypewriterEffect'
import { SocialLinks } from '../hero/SocialLinks'
import { HeroButtons } from '../hero/HeroButtons'
import { ScrollIndicator } from '../hero/ScrollIndicator'

const Hero = () => {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)

  const roles = [
    'Full Stack Developer',
    'UI/UX Enthusiast', 
    'Problem Solver',
    'Always Learning!'
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Main Title */}
          <motion.div variants={fadeInUp} className="mb-6">
            <motion.h1 
              className={`text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 ${themeClasses.text.primary}`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Hey there! I'm{' '}
              <span className="text-gradient">Dhruba</span>
            </motion.h1>
          </motion.div>

          {/* Typewriter Effect */}
          <motion.div variants={fadeInUp} className="mb-8">
            <TypewriterEffect roles={roles} />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className={`text-lg sm:text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${themeClasses.text.secondary}`}
          >
            Passionate Developer | Creative Thinker | Innovation Enthusiast
            <br />
            <span className={`font-mono text-base ${themeClasses.text.accent}`}>
              "Code with passion, create with purpose"
            </span>
          </motion.p>

          {/* Action Buttons */}
          <HeroButtons />

          {/* Social Links */}
          <SocialLinks />

          {/* Scroll Indicator */}
          <ScrollIndicator />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero