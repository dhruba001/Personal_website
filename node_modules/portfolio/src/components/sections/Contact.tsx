import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Using mailto as a fallback since EmailJS requires setup
      const mailtoUrl = `mailto:gdhruba748@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
      window.location.href = mailtoUrl
      
      alert('Your email client should open with a pre-filled message. Please send it from there!')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      alert('Please email me directly at gdhruba748@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'gdhruba748@gmail.com',
      href: 'mailto:gdhruba748@gmail.com',
      color: 'text-red-400'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'text-green-400'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Earth 🌍',
      href: '#',
      color: 'text-blue-400'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/dhruba001',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/dhruba-goswami-1a042317b/',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://x.com/dhruba_001',
      color: 'hover:text-sky-400'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Ready to bring your ideas to life? Let's discuss how we can work together to create something amazing.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="glass-effect rounded-2xl p-8">
                <h3 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Let's Connect</h3>
                <p className={`mb-8 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  I'm always excited to work on new projects and collaborate with fellow developers. 
                  Whether you have a project in mind, want to discuss opportunities, or just want to say hi, 
                  I'd love to hear from you!
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info) => {
                    const Icon = info.icon
                    return (
                      <motion.a
                        key={info.label}
                        href={info.href}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <div className={`${info.color} p-3 rounded-lg bg-white/10 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={24} />
                        </div>
                        <div>
                          <div className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>{info.label}</div>
                          <div className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{info.value}</div>
                        </div>
                      </motion.a>
                    )
                  })}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Follow Me</h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon
                      return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`p-3 rounded-lg transition-all duration-300 ${
                            theme === 'dark'
                              ? `bg-white/10 text-gray-300 ${social.color} hover:bg-white/20`
                              : `bg-black/10 text-gray-700 ${social.color} hover:bg-black/20`
                          }`}
                          title={social.label}
                        >
                          <Icon size={20} />
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-8">
                <h3 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Send Message</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                    }`}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-400 transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:bg-white/10'
                          : 'bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white shadow-sm'
                      }`}
                      placeholder="Your name"
                    />
                  </motion.div>
                  
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                    }`}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-400 transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:bg-white/10'
                          : 'bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white shadow-sm'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2 mb-6">
                  <label className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                  }`}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-400 transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:bg-white/10'
                        : 'bg-black/5 border-black/20 text-gray-900 placeholder-gray-400 focus:bg-black/10'
                    }`}
                    placeholder="What's this about?"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2 mb-8">
                  <label className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                  }`}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-400 transition-all duration-300 resize-none ${
                      theme === 'dark' 
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:bg-white/10'
                        : 'bg-black/5 border-black/20 text-gray-900 placeholder-gray-400 focus:bg-black/10'
                    }`}
                    placeholder="Tell me about your project or just say hello!"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className={`text-center mt-16 pt-8 border-t ${
              theme === 'dark' ? 'border-white/10' : 'border-black/10'
            }`}
          >
            <p className={`mb-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              © 2024 Dhruba Goswami. Built with ❤️ using React, TypeScript, and Tailwind CSS.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer"
            >
              <span>Powered by creativity and coffee ☕</span>
              <ExternalLink size={16} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact