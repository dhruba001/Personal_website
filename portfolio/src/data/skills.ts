/**
 * Skills data - separated for easier maintenance
 * To add/modify skills, just update this file
 */

export interface SkillData {
  name: string
  logo: string
  color: string
}

export interface SkillCategory {
  title: string
  icon: string
  skills: SkillData[]
}

export const skillCategories: Record<string, SkillCategory> = {
  frontend: {
    title: 'Frontend Technologies',
    icon: '🎨',
    skills: [
      { 
        name: 'React', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        color: 'bg-gradient-to-r from-blue-400 to-blue-600' 
      },
      { 
        name: 'TypeScript', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        color: 'bg-gradient-to-r from-blue-500 to-blue-700' 
      },
      { 
        name: 'Next.js', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        color: 'bg-gradient-to-r from-gray-600 to-gray-800' 
      },
      { 
        name: 'Vue.js', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
        color: 'bg-gradient-to-r from-green-400 to-green-600' 
      },
      { 
        name: 'Tailwind CSS', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
        color: 'bg-gradient-to-r from-cyan-400 to-cyan-600' 
      },
      { 
        name: 'HTML5/CSS3', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        color: 'bg-gradient-to-r from-orange-400 to-red-500' 
      },
    ]
  },
  backend: {
    title: 'Backend & Database',
    icon: '⚙️',
    skills: [
      { 
        name: 'Node.js', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        color: 'bg-gradient-to-r from-green-500 to-green-700' 
      },
      { 
        name: 'Python', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        color: 'bg-gradient-to-r from-yellow-400 to-blue-500' 
      },
      { 
        name: 'Express.js', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
        color: 'bg-gradient-to-r from-gray-500 to-gray-700' 
      },
      { 
        name: 'MongoDB', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        color: 'bg-gradient-to-r from-green-600 to-green-800' 
      },
      { 
        name: 'PostgreSQL', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
        color: 'bg-gradient-to-r from-blue-600 to-blue-800' 
      },
      { 
        name: 'Firebase', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg',
        color: 'bg-gradient-to-r from-yellow-500 to-orange-500' 
      },
    ]
  },
  tools: {
    title: 'Tools & Platforms',
    icon: '🛠️',
    skills: [
      { 
        name: 'Git', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        color: 'bg-gradient-to-r from-red-500 to-red-700' 
      },
      { 
        name: 'Docker', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        color: 'bg-gradient-to-r from-blue-400 to-blue-600' 
      },
      { 
        name: 'VS Code', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
        color: 'bg-gradient-to-r from-blue-500 to-blue-700' 
      },
      { 
        name: 'AWS', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
        color: 'bg-gradient-to-r from-orange-400 to-yellow-500' 
      },
      { 
        name: 'Figma', 
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
        color: 'bg-gradient-to-r from-purple-400 to-pink-500' 
      },
      { 
        name: 'Vercel', 
        logo: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png',
        color: 'bg-gradient-to-r from-gray-700 to-gray-900' 
      },
    ]
  }
}