import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { fadeInUp } from '../../utils/animations'

interface SocialLink {
  icon: React.ComponentType<{ size?: number }>
  href: string
  label: string
  color: string
}

const socialLinksData: SocialLink[] = [
  { 
    icon: Github, 
    href: 'https://github.com/dhruba001',
    label: 'GitHub',
    color: 'hover:text-gray-400'
  },
  { 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/in/dhruba-goswami-1a042317b/',
    label: 'LinkedIn',
    color: 'hover:text-blue-400'
  },
  { 
    icon: Twitter, 
    href: 'https://x.com/dhruba_001',
    label: 'Twitter',
    color: 'hover:text-sky-400'
  },
  { 
    icon: Mail, 
    href: 'mailto:gdhruba748@gmail.com',
    label: 'Email',
    color: 'hover:text-red-400'
  }
]

export const SocialLinks = () => {
  const { theme } = useTheme()

  return (
    <motion.div
      variants={fadeInUp}
      className="flex justify-center space-x-6 mb-12"
    >
      {socialLinksData.map((link) => {
        const Icon = link.icon
        return (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
              theme === 'dark' 
                ? `bg-white/10 text-gray-300 ${link.color}` 
                : `bg-black/10 text-gray-700 ${link.color}`
            }`}
            title={link.label}
          >
            <Icon size={24} />
          </motion.a>
        )
      })}
    </motion.div>
  )
}