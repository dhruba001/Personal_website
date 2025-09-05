# 🔧 Utils Directory

> **Utility functions and helpers that power the portfolio**

## 📁 Directory Structure

```
utils/
├── animations.ts    # Framer Motion animation variants
├── styles.ts       # Theme-aware styling utilities
└── README.md       # This file
```

---

## 🎭 animations.ts

### 🎯 Purpose
Centralized animation variants for consistent motion design across the entire application.

### 🧠 Why This Exists
- **Consistency**: Same easing curves and timings everywhere
- **Performance**: Optimized animations using transform/opacity only
- **Maintainability**: Change animations in one place, affects entire app
- **Reusability**: No need to recreate animation logic

### 📖 Available Animations

#### `fadeInUp`
**Purpose**: Standard entrance animation
**Effect**: Fades in while sliding up from below

```tsx
// Usage
<motion.div variants={fadeInUp}>
  Content that fades in and slides up
</motion.div>

// Values
{
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}
```

**When to use**:
- Text content appearing
- Card/component entrances
- Sequential content reveals

#### `staggerContainer`
**Purpose**: Parent container for staggered child animations
**Effect**: Children animate with slight delays

```tsx
// Usage
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  <motion.div variants={fadeInUp}>Child 1 (animates first)</motion.div>
  <motion.div variants={fadeInUp}>Child 2 (animates after delay)</motion.div>
  <motion.div variants={fadeInUp}>Child 3 (animates after longer delay)</motion.div>
</motion.div>

// Values
{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // 100ms delay between children
      delayChildren: 0.2     // 200ms delay before first child
    }
  }
}
```

**When to use**:
- Lists of items (skills, projects, etc.)
- Sequential reveals
- Creating rhythm in animations

#### `hoverLift`
**Purpose**: Subtle hover effect for interactive elements
**Effect**: Slight upward movement and shadow increase

```tsx
// Usage
<motion.div whileHover={hoverLift}>
  Hover over me!
</motion.div>

// Values
{
  y: -8,
  transition: { 
    type: "spring", 
    stiffness: 300, 
    damping: 20 
  }
}
```

**When to use**:
- Cards that are clickable
- Interactive elements
- Providing visual feedback

#### `hoverScale`
**Purpose**: Scale effect for buttons and clickable items
**Effect**: Slightly grows on hover

```tsx
// Usage
<motion.button whileHover={hoverScale}>
  Click me!
</motion.button>

// Values
{
  scale: 1.05,
  transition: { duration: 0.2 }
}
```

**When to use**:
- Buttons
- Clickable icons
- Interactive images

### 🔧 Technical Details

#### Performance Optimization
```tsx
// ✅ Uses only transform and opacity (GPU accelerated)
{ y: 30, opacity: 0 }  // Good

// ❌ Avoid layout-affecting properties
{ height: '0px', width: '0px' }  // Bad - causes reflow
```

#### Animation Timing
- **Duration**: 0.6s for entrances, 0.2s for interactions
- **Easing**: "easeOut" for natural feeling
- **Stagger delay**: 100ms between items (not too fast, not too slow)

#### Browser Support
- Modern browsers with CSS transforms
- Graceful degradation on older browsers (no animation)
- Respects `prefers-reduced-motion` setting

### 🎨 Creating New Animations

```tsx
// Template for new animations
export const newAnimation = {
  hidden: {
    // Initial state (usually invisible/offset)
  },
  visible: {
    // Final state (visible/in position)
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

// For hover effects
export const newHoverEffect = {
  // Hover state properties
  transition: { duration: 0.2 }
}
```

**Guidelines**:
- Keep animations subtle and purposeful
- Use consistent timing values
- Test on slower devices
- Always provide fallbacks

---

## 🎨 styles.ts

### 🎯 Purpose
Theme-aware utility functions that eliminate repetitive conditional styling logic.

### 🧠 Why This Exists
- **DRY Principle**: Don't repeat theme conditionals everywhere
- **Consistency**: Same colors/styles across entire app
- **Maintainability**: Change theme colors in one place
- **Type Safety**: TypeScript ensures correct usage

### 📖 Available Utilities

#### `getThemeClasses(theme)`
**Purpose**: Returns object with theme-appropriate class names
**Input**: `'light' | 'dark'`
**Output**: Object with categorized class names

```tsx
// Usage example
const { theme } = useTheme()
const themeClasses = getThemeClasses(theme)

// Apply classes
<div className={themeClasses.text.primary}>
  This text adapts to theme
</div>
```

#### Text Color Classes
```tsx
const themeClasses = getThemeClasses(theme)

// Primary text (main content)
themeClasses.text.primary
// Dark theme: 'text-white'
// Light theme: 'text-gray-900'

// Secondary text (less important content)  
themeClasses.text.secondary
// Dark theme: 'text-gray-300'
// Light theme: 'text-gray-700'

// Muted text (very subtle content)
themeClasses.text.muted
// Dark theme: 'text-gray-400' 
// Light theme: 'text-gray-600'

// Accent text (highlights, links)
themeClasses.text.accent
// Dark theme: 'text-blue-400'
// Light theme: 'text-blue-600'
```

**When to use each**:
- **Primary**: Main headings, important text
- **Secondary**: Body text, descriptions  
- **Muted**: Captions, metadata, subtle info
- **Accent**: Links, highlights, call-to-actions

#### Background Classes
```tsx
// Main background gradient
themeClasses.bg.primary
// Dark: 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'
// Light: 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
```

#### Button Classes
```tsx
// Primary button (call-to-action)
themeClasses.button.primary
// 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'

// Secondary button (less emphasis)
themeClasses.button.secondary
// Dark: 'glass-effect text-gray-300 hover:text-white'
// Light: 'glass-effect text-gray-600 hover:text-gray-900'
```

#### Special Effect Classes
```tsx
// Glass morphism effect
themeClasses.glass
// 'glass-effect backdrop-blur-sm'

// Text gradient effect
themeClasses.gradient  
// 'text-gradient'
```

### 🔧 Pre-made Class Combinations

#### `baseButtonClasses`
**Purpose**: Standard button styling that works with any theme
**Value**: `'px-6 py-2 rounded-full font-medium transition-all duration-300'`

```tsx
// Usage
<button className={`${baseButtonClasses} ${themeClasses.button.primary}`}>
  Styled Button
</button>
```

#### `cardClasses`
**Purpose**: Consistent card styling across the app
**Value**: `'glass-effect rounded-xl p-6 card-shadow'`

```tsx
// Usage
<div className={cardClasses}>
  Card content with glass effect and shadow
</div>
```

### 🎨 Color Philosophy

#### Dark Theme Colors
- **Primary**: Pure white for maximum contrast
- **Secondary**: Light gray for readable body text
- **Muted**: Medium gray for subtle elements
- **Accent**: Bright blue for interactivity

#### Light Theme Colors  
- **Primary**: Dark gray (not black) for comfortable reading
- **Secondary**: Medium gray for hierarchy
- **Muted**: Light gray for subtle elements
- **Accent**: Rich blue for contrast

### 🔧 Technical Implementation

#### Type Safety
```tsx
// Return type is fully typed
interface ThemeClasses {
  text: {
    primary: string
    secondary: string
    muted: string
    accent: string
  }
  bg: {
    primary: string
  }
  // ... etc
}
```

#### Performance
- Pure function (no side effects)
- Returns same reference for same input
- Can be memoized if needed

### 🎨 Adding New Theme Utilities

```tsx
// In getThemeClasses function
export const getThemeClasses = (theme: 'light' | 'dark') => ({
  text: {
    // ... existing text classes
    newTextType: theme === 'dark' ? 'text-new-dark' : 'text-new-light'
  },
  // ... existing categories
  newCategory: {
    newUtility: theme === 'dark' ? 'dark-classes' : 'light-classes'
  }
})
```

**Guidelines**:
- Always provide both light and dark variants
- Use semantic naming (not color-specific)
- Test readability in both themes
- Consider accessibility contrast ratios

### 🔍 Debugging Theme Issues

```tsx
// Add temporary logging to see what classes are applied
const themeClasses = getThemeClasses(theme)
console.log('Current theme:', theme)
console.log('Applied classes:', themeClasses)

// Check if theme is switching properly
useEffect(() => {
  console.log('Theme changed to:', theme)
}, [theme])
```

---

## 🚀 Best Practices

### ✅ DO
- Use animation variants consistently
- Apply theme utilities instead of direct conditionals
- Test animations on slower devices
- Keep animations subtle and purposeful

### ❌ DON'T
- Create one-off animations inline
- Use layout-affecting CSS properties for animations
- Mix theme utilities with direct theme conditionals
- Make animations too fast or too slow

### 🎯 Performance Tips
- Animations use `transform` and `opacity` only
- Theme utilities are pure functions
- Classes are pre-computed strings
- Use `will-change` CSS property sparingly

---

## 🔧 Maintenance

### Regular Tasks
- Review animation timings for consistency
- Test theme switching thoroughly
- Check for unused utility functions
- Optimize performance if needed

### When to Add New Utilities
- Repeating the same theme conditional 3+ times
- Complex styling logic used in multiple places
- New design patterns emerge
- Performance optimizations needed

---

*📝 Keep utilities focused and reusable. When in doubt, extract common patterns.*