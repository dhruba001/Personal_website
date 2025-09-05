import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { fadeInUp } from '../../utils/animations'
import resumePdf from '../../assets/dhruba_resume_sep.pdf'

export const HeroButtons = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
    >
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollToSection('projects')}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        View My Work
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollToSection('contact')}
        className="px-8 py-4 border-2 border-blue-400 text-blue-400 font-semibold rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300"
      >
        Get In Touch
      </motion.button>

      <motion.a
        href={resumePdf}
        download="Dhruba_Goswami_Resume.pdf"
        whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)' }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      >
        <Download size={20} />
        Download Resume
      </motion.a>
    </motion.div>
  )
}