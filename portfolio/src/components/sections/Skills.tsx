import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { Section } from '../common/Section'
import { Card } from '../common/Card'
import { SkillCard } from '../skills/SkillCard'
import { skillCategories } from '../../data/skills'
import { getThemeClasses, baseButtonClasses } from '../../utils/styles'
import { fadeInUp } from '../../utils/animations'

/**
 * Skills section component
 * Displays categorized technology skills with logos
 */
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend')
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)

  const categories = Object.entries(skillCategories)
  const currentSkills = skillCategories[activeCategory as keyof typeof skillCategories]

  return (
    <Section 
      id="skills" 
      title={<>Tech <span className="text-gradient">Arsenal</span></>}
      subtitle="Constantly evolving skillset with expertise across the full development stack"
    >
      {/* Category Tabs */}
      <motion.div 
        variants={fadeInUp}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map(([key, category]) => (
          <motion.button
            key={key}
            onClick={() => setActiveCategory(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseButtonClasses} flex items-center gap-2 ${
              activeCategory === key
                ? themeClasses.button.primary + ' shadow-lg'
                : themeClasses.button.secondary
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.title}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
      >
        {currentSkills.skills.map((skill, index) => (
          <SkillCard key={`${activeCategory}-${skill.name}`} skill={skill} index={index} />
        ))}
      </motion.div>

      {/* Additional Info Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: '📚',
            title: 'Always Learning',
            description: 'Continuously exploring new technologies and best practices'
          },
          {
            icon: '🚀',
            title: 'Performance Focused',
            description: 'Optimizing for speed, scalability, and user experience'
          },
          {
            icon: '🌟',
            title: 'Best Practices',
            description: 'Following industry standards and clean code principles'
          }
        ].map((item) => (
          <Card key={item.title} className="text-center">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className={`text-xl font-bold mb-2 ${themeClasses.text.primary}`}>
              {item.title}
            </h3>
            <p className={themeClasses.text.muted}>
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  )
}

export default Skills