# 🧩 Components Directory

> **Complete guide to all React components in the portfolio**

## 📁 Directory Structure

```
components/
├── common/          # Reusable UI components
├── hero/           # Hero section specific components  
├── skills/         # Skills section components
├── projects/       # Projects section components
└── sections/       # Main page sections
```

## 🎯 Component Categories

### 🔄 Common Components
**Purpose**: Shared components used across multiple sections
**Philosophy**: Write once, use everywhere

| Component | Purpose | Reusability |
|-----------|---------|-------------|
| `Section.tsx` | Page section wrapper | ⭐⭐⭐⭐⭐ |
| `Card.tsx` | Consistent card styling | ⭐⭐⭐⭐⭐ |

### 🎭 Feature Components
**Purpose**: Section-specific components with focused functionality
**Philosophy**: Single responsibility, easy to maintain

| Section | Components | Count |
|---------|------------|-------|
| **Hero** | TypewriterEffect, SocialLinks, HeroButtons, ScrollIndicator | 4 |
| **Skills** | SkillCard | 1 |
| **Projects** | ProjectCard, ProjectFilters, ProjectsHeader, ProjectsCTA | 4 |

### 📄 Section Components
**Purpose**: Main page sections that compose other components
**Philosophy**: Orchestration layer, minimal business logic

---

## 🧩 Component Design Patterns

### Pattern 1: Container-Presentation Split

```tsx
// ❌ BAD: Everything in one component
const Hero = () => {
  // 200+ lines of JSX, state, and logic
}

// ✅ GOOD: Split into logical pieces
const Hero = () => {
  // Orchestration only
  return (
    <>
      <HeroTitle />
      <TypewriterEffect />
      <HeroButtons />
      <SocialLinks />
    </>
  )
}
```

### Pattern 2: Props Interface First

```tsx
// ✅ Always define props interface first
interface ComponentProps {
  title: string
  optional?: boolean
  children: React.ReactNode
}

const Component = ({ title, optional = false, children }: ComponentProps) => {
  // Implementation
}
```

### Pattern 3: Theme-Aware Components

```tsx
// ✅ Use theme utilities consistently
const Component = () => {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)
  
  return (
    <div className={themeClasses.text.primary}>
      Theme-aware content
    </div>
  )
}
```

### Pattern 4: Animation Integration

```tsx
// ✅ Use standard animation variants
import { fadeInUp, staggerContainer } from '../../utils/animations'

const Component = () => (
  <motion.div variants={staggerContainer}>
    <motion.div variants={fadeInUp}>
      Animated content
    </motion.div>
  </motion.div>
)
```

---

## 📊 Component Complexity Guide

### 🟢 Simple Components (< 50 lines)
- **Purpose**: Single UI element
- **Examples**: `ScrollIndicator`, `ProjectsCTA`
- **Maintenance**: Easy to understand and modify

### 🟡 Medium Components (50-100 lines)
- **Purpose**: Feature-specific functionality
- **Examples**: `TypewriterEffect`, `ProjectCard`
- **Maintenance**: Well-documented, single responsibility

### 🔴 Complex Components (> 100 lines)
- **Purpose**: Should be rare, section orchestration only
- **Examples**: Main section components
- **Rule**: If over 100 lines, consider splitting

---

## 🎨 Styling Guidelines

### CSS Class Naming
```tsx
// ✅ Use semantic, descriptive names
className="hero-title primary-gradient"

// ❌ Avoid cryptic abbreviations
className="ht pg"
```

### Responsive Design
```tsx
// ✅ Mobile-first approach
className="text-sm sm:text-base lg:text-lg"

// ✅ Consistent breakpoints
// sm: 640px, md: 768px, lg: 1024px, xl: 1280px
```

### Theme Classes
```tsx
// ✅ Use theme utilities
const themeClasses = getThemeClasses(theme)
className={themeClasses.text.primary}

// ❌ Avoid direct theme conditionals
className={theme === 'dark' ? 'text-white' : 'text-black'}
```

---

## 🔍 Component Testing Guide

### Manual Testing Checklist
- [ ] **Responsive**: Test on mobile, tablet, desktop
- [ ] **Themes**: Check both light and dark modes
- [ ] **Animations**: Smooth transitions, no janky movements
- [ ] **Accessibility**: Keyboard navigation, screen readers
- [ ] **Performance**: No unnecessary re-renders

### Common Issues
1. **Missing key props** in map functions
2. **Theme classes not applied** correctly
3. **Animations conflicting** with each other
4. **Props not typed** properly

---

## 🚀 Adding New Components

### Step 1: Plan the Component
```tsx
// 1. Define the purpose
// 2. Identify reusability potential
// 3. Design the props interface
// 4. Choose the right location
```

### Step 2: Create the Component
```tsx
// Template for new components
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { getThemeClasses } from '../../utils/styles'
import { fadeInUp } from '../../utils/animations'

interface NewComponentProps {
  // Define props here
}

export const NewComponent = ({ ...props }: NewComponentProps) => {
  const { theme } = useTheme()
  const themeClasses = getThemeClasses(theme)

  return (
    <motion.div variants={fadeInUp} className={themeClasses.text.primary}>
      {/* Component content */}
    </motion.div>
  )
}
```

### Step 3: Update Documentation
1. Add to this README
2. Update main documentation
3. Add usage examples
4. Document any new patterns

---

## 🔧 Component Maintenance

### Regular Tasks
- **Review component sizes** - split if too large
- **Check for code duplication** - extract to utilities
- **Update TypeScript types** - keep interfaces current
- **Optimize performance** - memo, lazy loading where needed

### Refactoring Triggers
- Component over 100 lines
- Repeated code patterns
- Complex conditional logic
- Multiple responsibilities

---

## 📚 Component Reference Quick Links

### Common Components
- [`Section.tsx`](./common/Section.tsx) - Universal section wrapper
- [`Card.tsx`](./common/Card.tsx) - Consistent card styling

### Hero Components  
- [`TypewriterEffect.tsx`](./hero/TypewriterEffect.tsx) - Animated typing text
- [`SocialLinks.tsx`](./hero/SocialLinks.tsx) - Social media links
- [`HeroButtons.tsx`](./hero/HeroButtons.tsx) - Call-to-action buttons
- [`ScrollIndicator.tsx`](./hero/ScrollIndicator.tsx) - Scroll down indicator

### Skills Components
- [`SkillCard.tsx`](./skills/SkillCard.tsx) - Individual skill display

### Projects Components
- [`ProjectCard.tsx`](./projects/ProjectCard.tsx) - Project showcase card
- [`ProjectFilters.tsx`](./projects/ProjectFilters.tsx) - Category filters
- [`ProjectsHeader.tsx`](./projects/ProjectsHeader.tsx) - Section header with refresh
- [`ProjectsCTA.tsx`](./projects/ProjectsCTA.tsx) - Call-to-action link

### Section Components
- [`Hero.tsx`](./sections/Hero.tsx) - Main hero section
- [`Skills.tsx`](./sections/Skills.tsx) - Skills showcase
- [`Projects.tsx`](./sections/Projects.tsx) - Projects portfolio

---

*📝 Keep this documentation updated when adding/modifying components*