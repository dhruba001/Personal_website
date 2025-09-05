/**
 * Utility functions for consistent styling
 * Reduces repetitive className logic
 */

export const getThemeClasses = (theme: 'light' | 'dark') => ({
  text: {
    primary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    secondary: theme === 'dark' ? 'text-gray-300' : 'text-gray-700',
    muted: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    accent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
  },
  bg: {
    primary: theme === 'dark' 
      ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' 
      : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50',
  },
  glass: 'glass-effect backdrop-blur-sm',
  gradient: 'text-gradient',
  button: {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
    secondary: theme === 'dark' 
      ? 'glass-effect text-gray-300 hover:text-white' 
      : 'glass-effect text-gray-600 hover:text-gray-900',
  }
})

export const baseButtonClasses = 'px-6 py-2 rounded-full font-medium transition-all duration-300'
export const cardClasses = 'glass-effect rounded-xl p-6 card-shadow'