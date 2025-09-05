import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { fadeInUp } from '../../utils/animations'

export const ProjectsCTA = () => {
  return (
    <motion.div
      variants={fadeInUp}
      className="text-center mt-16"
    >
      <motion.a
        href="https://github.com/dhruba001"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Github size={20} />
        View More on GitHub
        <ExternalLink size={16} />
      </motion.a>
    </motion.div>
  )
}