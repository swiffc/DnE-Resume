#!/bin/bash
# Script to remove Elsa/wife profile data from App.tsx and create a David-only version

# Create types file
cat > src/types/index.ts << 'TYPES_EOF'
export interface Profile {
  name: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
  avatar: string
  profileImage?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  logo: string
  color: string
  description: string[]
  technologies: string[]
}

export interface Skill {
  category: string
  icon: React.ReactNode
  items: string[]
}

export interface CompanyDetail {
  id: string
  name: string
  logo: string
  industry: string
  founded: string
  headquarters: string
  employees: string
  description: string
  businessFocus: string[]
  keyProducts: string[]
  marketPosition: string
  workflowTitle: string
  designProcess: ProjectStep[]
  majorProjects: ProjectShowcase[]
  companyStats: CompanyStat[]
  designRole: string
  roleImpact: string[]
  technicalFocus: string[]
}

export interface ProjectStep {
  phase: string
  description: string
  deliverables: string[]
  tools: string[]
  duration: string
}

export interface ProjectShowcase {
  name: string
  type: string
  value: string
  description: string
  challenges: string[]
  solutions: string[]
  outcomes: string[]
}

export interface CompanyStat {
  label: string
  value: string
  icon: React.ReactNode
}

export interface Project {
  id: string
  title: string
  description: string
  category: string
  technologies: string[]
  impact: string
  image?: string
  highlights: string[]
  timeline: string
  client?: string
}
TYPES_EOF

echo "Created types/index.ts"
