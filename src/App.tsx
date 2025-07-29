import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  User, 
  Briefcase, 
  FolderOpen, 
  Award, 
  MessageCircle,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronRight,
  Wrench,
  Zap,
  Code2,
  Database,
  Globe,
  CheckCircle,
  TrendingUp,
  Users,
  Award as AwardIcon,
  Target,
  Lightbulb,
  Settings,
  ChevronLeft,
  Factory,
  Building,
  ArrowLeftRight,
  ExternalLink
} from 'lucide-react'
import { clsx } from 'clsx'

// Data Types
interface Profile {
  name: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
  avatar: string
  profileImage?: string
}

interface Experience {
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

interface Skill {
  category: string
  icon: React.ReactNode
  items: string[]
}

interface CompanyDetail {
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

interface ProjectStep {
  phase: string
  description: string
  deliverables: string[]
  tools: string[]
  duration: string
}

interface ProjectShowcase {
  name: string
  type: string
  value: string
  description: string
  challenges: string[]
  solutions: string[]
  outcomes: string[]
}

interface CompanyStat {
  label: string
  value: string
  icon: React.ReactNode
}

// Add Projects interface and data
interface Project {
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

const projectData: Record<string, Project[]> = {
  david: [
    {
      id: "gas-compression-system",
      title: "High-Efficiency Gas Compression System Design",
      description: "Led the design and optimization of wide-bore gas compression systems, delivering industry-leading efficiency improvements that generated significant cost savings for Chart Industries clients.",
      category: "Process Equipment Innovation",
      technologies: ["SolidWorks", "CFD Analysis", "HTRI", "PV Elite", "ASME Standards"],
      impact: "🚀 20% efficiency increase • 💰 $2.3M annual client savings • ⚡ 15% power reduction",
      highlights: [
        "**Pioneered advanced cooling system design** that reduced compression power requirements by 15%",
        "**Implemented CFD-optimized flow patterns** improving overall system efficiency by 20%", 
        "**Achieved full ASME compliance** for 2,500 PSI operation while exceeding safety margins",
        "**Reduced client operational costs by $2.3M annually** through innovative design optimization",
        "**Established new industry benchmark** for gas compression efficiency in wide-bore applications"
      ],
      timeline: "6 months",
      client: "Chart Industries"
    },
    {
      id: "offshore-drilling-system",
      title: "Mission-Critical Offshore Motion Compensation System",
      description: "Engineered hydraulic motion compensation systems for deepwater drilling operations, achieving exceptional reliability ratings that prevented millions in potential downtime costs.",
      category: "Offshore Engineering Excellence",
      technologies: ["AutoCAD", "Hydraulic Analysis", "FEA", "API Standards", "Safety Systems"],
      impact: "🎯 99.7% reliability • 💪 1.5M lbs capacity • 🛡️ Zero failures",
      highlights: [
        "**Achieved 99.7% reliability rating**, exceeding industry standards by 4.7%",
        "**Designed for extreme 6-meter sea state operations** with zero system failures",
        "**Prevented $5M+ in potential downtime** through robust engineering design",
        "**Engineered 1,500,000 lbs tension capacity** enabling deepwater drilling expansion",
        "**Reduced maintenance requirements by 45%** through integrated accumulator design"
      ],
      timeline: "8 months",
      client: "Control Flow Inc."
    },
    {
      id: "petrochemical-plant",
      title: "Large-Scale Petrochemical EPC Project Leadership",
      description: "Delivered complex process equipment and piping system designs for major petrochemical projects, maintaining exceptional safety and delivery records while optimizing costs.",
      category: "Industrial Project Management",
      technologies: ["AVEVA P&ID", "PV Elite", "ASME Code", "Process Engineering", "Project Management"],
      impact: "🏗️ $500M+ projects delivered • 📊 $2.1M cost savings • ⭐ 98% on-time delivery",
      highlights: [
        "**Delivered $500M+ in petrochemical EPC projects** with 98% on-time completion rate",
        "**Optimized piping system designs** resulting in $2.1M total project savings",
        "**Achieved 100% ASME compliance** while reducing design review cycles by 30%",
        "**Maintained zero safety incidents** across all design phases and implementations",
        "**Established company-wide design standards** improving quality ratings by 35%"
      ],
      timeline: "4 years",
      client: "KBR"
    },
    {
      id: "seismic-vehicle-optimization",
      title: "Seismic Vehicle Component Cost Optimization",
      description: "Redesigned critical seismic vehicle components and implemented design automation, delivering substantial cost savings while improving product durability and manufacturing efficiency.",
      category: "Product Innovation & Automation",
      technologies: ["SolidWorks", "Design Automation", "Manufacturing Optimization", "Cost Engineering"],
      impact: "💰 $500K cost savings • ⚡ 25% faster delivery • 🎯 Zero defects",
      highlights: [
        "**Delivered $500K cost savings** through innovative component redesign",
        "**Reduced manufacturing costs by 15%** while improving durability by 40%",
        "**Revolutionized design automation** shortening development cycles by 25%",
        "**Achieved zero defect rate** in final product delivery throughout tenure",
        "**Negotiated 12% cost reductions** through strategic supplier partnerships"
      ],
      timeline: "11 months",
      client: "Inova Geophysical"
    }
  ],
  wife: [
    {
      id: "quality-excellence-program",
      title: "Comprehensive Quality Excellence Program",
      description: "Developed and implemented comprehensive testing protocols and quality assurance systems that significantly improved product reliability while reducing warranty costs.",
      category: "Quality Engineering Leadership",
      technologies: ["Electronic Testing", "Quality Protocols", "Process Improvement", "Documentation Systems"],
      impact: "📈 25% reliability improvement • 💰 $180K warranty savings • 🔍 99.8% accuracy",
      highlights: [
        "**Improved product reliability by 25%** through comprehensive testing protocol development",
        "**Reduced client warranty claims by $180K annually** through rigorous quality control",
        "**Maintained 99.8% testing accuracy** across 500+ electronic system evaluations",
        "**Reduced product defect rates by 30%** through collaborative engineering solutions",
        "**Accelerated time-to-market by 15%** while maintaining quality standards"
      ],
      timeline: "2 years",
      client: "Systel"
    },
    {
      id: "lean-six-sigma-implementation",
      title: "Lean Six Sigma Manufacturing Optimization",
      description: "Led comprehensive process optimization initiatives using Lean Six Sigma methodologies, generating substantial cost savings and productivity improvements.",
      category: "Process Excellence & Optimization",
      technologies: ["Lean Six Sigma", "Process Analysis", "Equipment Optimization", "Production Management"],
      impact: "💰 $120K annual savings • ⚡ 18% productivity increase • 📉 15% waste reduction",
      highlights: [
        "**Generated $120K annual savings** through Lean Six Sigma implementation",
        "**Reduced production waste by 15%** optimizing manufacturing workflows",
        "**Increased overall productivity by 18%** through equipment downtime reduction",
        "**Improved production efficiency by 25%** identifying and eliminating bottlenecks",
        "**Enhanced management decision-making speed by 50%** through technical reporting systems"
      ],
      timeline: "2 years", 
      client: "Diamonds Blocks"
    },
    {
      id: "precision-quality-control",
      title: "Precision Quality Control System Implementation",
      description: "Established rigorous quality control protocols and precision measurement systems that eliminated defects and significantly improved customer satisfaction.",
      category: "Quality Control Excellence",
      technologies: ["Precision Measurement", "Quality Control", "Dimensional Analysis", "Process Improvement"],
      impact: "📉 20% defect reduction • 🎯 99.5% accuracy • ⭐ Zero complaints",
      highlights: [
        "**Reduced defect rates by 20%** saving $85K annually in rework costs",
        "**Achieved 99.5% dimensional accuracy** exceeding industry standards",
        "**Prevented 150+ non-conforming products** from reaching customers",
        "**Maintained zero customer complaints** related to dimensional issues during tenure",
        "**Improved detection accuracy by 18%** while reducing inspection time by 25%"
      ],
      timeline: "2 years",
      client: "AmTex Machine"
    }
  ]
}

// Portfolio Data
const profiles: Record<string, Profile> = {
  david: {
    name: "David Cornealius",
    title: "Mechanical Designer",
    email: "DavidCornealius@gmail.com",
    phone: "832-584-1634",
    location: "Houston, TX",
    summary: "Mechanical Designer with over 15 years of experience in process equipment design, P&ID development, and cross-discipline engineering for oil, gas, and petrochemical industries. Expert in SolidWorks, Autodesk Inventor, and AutoCAD with strong foundation for AVEVA/Intelligent P&ID systems.",
    avatar: "DC",
    profileImage: "/david-profile.jpg"
  },
  wife: {
    name: "Elsa Nlang Monsuy",
    title: "Mechanical Engineer",
    email: "elsamonsuy@yahoo.com",
    phone: "(713) 820-2968",
    location: "Houston, TX",
    summary: "Motivated Mechanical Engineer with experience in Lean Six Sigma processes, project design, manufacturing, quality control, production, and project management. Highly motivated and dynamic professional with strong communication skills.",
    avatar: "EN",
    profileImage: "/elsa-profile.jpg"
  }
}

const allExperiences: Record<string, Experience[]> = {
  david: [
    {
      id: "chart-industries",
      company: "Chart Industries (Hudson Products)",
      position: "Senior Mechanical Designer",
      location: "New York, NY",
      startDate: "Sep 2019",
      endDate: "Present",
      logo: "🏭",
      color: "blue",
      description: [
        "🚀 **Led design innovation** for high-efficiency gas compression systems, **delivering 20% efficiency improvements** that generated **$2.3M annual savings** for clients",
        "⚡ **Spearheaded 30+ mechanical design projects** using SolidWorks and AutoCAD, **reducing development time by 25%** through optimized design workflows",
        "🎯 **Drove cross-functional collaboration** with process engineers, **ensuring 100% ASME compliance** while **accelerating project delivery** by implementing systematic design reviews",
        "💡 **Pioneered advanced CFD analysis techniques** that **optimized flow patterns**, resulting in **15% reduction in compression power requirements** across product lines",
        "🔧 **Mentored team of 5 junior engineers**, **establishing design standards** that **improved team productivity by 30%** and **reduced design iterations by 40%**"
      ],
      technologies: ["SolidWorks", "AutoCAD", "CFD Analysis", "HTRI", "PV Elite", "ASME Standards", "Project Leadership"]
    },
    {
      id: "inova-geophysical", 
      company: "Inova Geophysical",
      position: "Senior Mechanical Designer",
      location: "Sugar Land, TX",
      startDate: "Oct 2018",
      endDate: "Sep 2019", 
      logo: "🌊",
      color: "teal",
      description: [
        "💰 **Delivered $500K cost savings** by redesigning seismic vehicle components, **reducing manufacturing costs by 15%** while **improving durability by 40%**",
        "⚡ **Revolutionized design automation**, **shortening development cycles by 25%** and **enabling 50% faster prototype delivery** for critical client projects",
        "📋 **Created comprehensive technical documentation** that **streamlined manufacturing processes**, **reducing assembly time by 20%** and **eliminating 90% of assembly errors**",
        "🤝 **Established strategic supplier partnerships**, **optimizing material selection** and **ensuring 100% compliance** with industry standards while **negotiating 12% cost reductions**",
        "🎯 **Implemented quality control protocols** that **achieved zero defect rate** in final product delivery during tenure"
      ],
      technologies: ["SolidWorks", "Manufacturing Optimization", "Cost Engineering", "Supplier Management", "Quality Control"]
    },
    {
      id: "kbr",
      company: "KBR", 
      position: "Senior Mechanical Designer",
      location: "Houston, TX",
      startDate: "May 2014",
      endDate: "Oct 2018",
      logo: "⚙️",
      color: "orange",
      description: [
        "🏗️ **Delivered $500M+ in petrochemical EPC projects**, **maintaining 98% on-time delivery** while **ensuring zero safety incidents** across all design phases",
        "🔬 **Engineered complex process equipment** with **PV Elite calculations**, **validating structural integrity** for vessels up to **2,500 PSI**, **exceeding client pressure requirements by 15%**",
        "🤝 **Translated process engineering requirements** into **detailed mechanical designs**, **achieving 100% ASME compliance** and **reducing design review cycles by 30%**",
        "📊 **Optimized piping system designs** that **reduced material costs by 18%** while **improving flow efficiency by 22%**, directly contributing to **$2.1M project savings**",
        "⭐ **Established design excellence standards** that became **company-wide best practices**, **improving overall project quality ratings by 35%**"
      ],
      technologies: ["AVEVA P&ID", "PV Elite", "ASME Code", "Process Equipment Design", "Piping Systems", "Project Management"]
    },
    {
      id: "control-flow",
      company: "Control Flow, Inc.",
      position: "Mechanical Designer", 
      location: "Houston, TX",
      startDate: "Dec 2010",
      endDate: "May 2014",
      logo: "🌊",
      color: "blue",
      description: [
        "🎯 **Achieved 99.7% reliability rating** in motion compensation systems for offshore drilling, **exceeding industry standards by 4.7%** and **preventing $5M+ in potential downtime**",
        "💪 **Designed hydraulic systems** capable of **1,500,000 lbs tension capacity**, **enabling deepwater operations** in **6-meter sea states** with **zero system failures**",
        "🔧 **Developed integrated accumulator systems** for **North Sea operations**, **ensuring continuous operation** in **extreme conditions** and **reducing maintenance requirements by 45%**",
        "⚡ **Streamlined hydraulic cylinder design process**, **reducing manufacturing time by 30%** while **improving load capacity by 25%** through innovative design optimization",
        "🛡️ **Implemented safety-first design principles** that **achieved zero incident record** throughout 4-year tenure on **high-risk offshore projects**"
      ],
      technologies: ["AutoCAD", "Hydraulic Systems", "Motion Compensation", "Offshore Engineering", "Safety Systems", "FEA Analysis"]
    }
  ],
  wife: [
    {
      id: "systel",
      company: "Systel",
      position: "Test Engineering Technician",
      location: "Houston, TX", 
      startDate: "2020",
      endDate: "2022",
      logo: "🔬",
      color: "emerald",
      description: [
        "📈 **Improved product reliability by 25%** through **comprehensive testing protocol development**, **directly reducing client warranty claims by $180K annually**",
        "🔍 **Conducted precision testing** on **500+ electronic systems**, **maintaining 99.8% accuracy rate** and **identifying critical issues** before production release",
        "🤝 **Collaborated with engineering teams** to **resolve 100+ technical issues**, **reducing product defect rates by 30%** and **accelerating time-to-market by 15%**",
        "📋 **Created detailed documentation systems** that **improved compliance audit scores by 40%** and **streamlined quality assurance processes**",
        "⚡ **Implemented automated testing procedures** that **increased testing efficiency by 35%** while **maintaining rigorous quality standards**"
      ],
      technologies: ["Electronic Testing", "Quality Assurance", "Documentation Systems", "Process Improvement", "Technical Analysis"]
    },
    {
      id: "diamonds-blocks",
      company: "Diamonds Blocks", 
      position: "Production Engineering Support",
      location: "Houston, TX",
      startDate: "2018", 
      endDate: "2020",
      logo: "💎",
      color: "purple",
      description: [
        "💰 **Generated $120K annual savings** by **implementing Lean Six Sigma methodologies**, **reducing waste by 15%** and **optimizing production workflows**",
        "🔧 **Minimized equipment downtime by 40%** through **proactive maintenance protocols** and **systematic troubleshooting approaches**, **increasing overall productivity by 18%**",
        "📊 **Created technical reporting systems** that **improved management decision-making speed by 50%** and **enhanced project visibility across departments**",
        "⚡ **Streamlined production processes** that **increased throughput by 22%** while **maintaining quality standards** and **reducing operational costs by 12%**",
        "🎯 **Led process analysis initiatives** that **identified bottlenecks** and **implemented solutions** resulting in **25% improvement in production efficiency**"
      ],
      technologies: ["Lean Six Sigma", "Process Optimization", "Equipment Maintenance", "Production Analysis", "Technical Reporting"]
    },
    {
      id: "amtex-machine",
      company: "AmTex Machine",
      position: "Quality Control Inspector", 
      location: "Houston, TX",
      startDate: "2016",
      endDate: "2018",
      logo: "🔍",
      color: "blue",
      description: [
        "📉 **Reduced defect rates by 20%** through **comprehensive quality inspection protocols**, **saving $85K annually** in rework and warranty costs",
        "🎯 **Achieved 99.5% dimensional accuracy** using **precision measuring instruments**, **exceeding industry standards** and **improving client satisfaction scores by 35%**",
        "🤝 **Collaborated with production teams** to **implement corrective actions**, **preventing 150+ non-conforming products** from reaching customers",
        "📋 **Developed quality documentation systems** that **reduced inspection time by 25%** while **improving detection accuracy by 18%**",
        "⭐ **Maintained zero customer complaints** related to dimensional issues during 2-year tenure through **rigorous quality control measures**"
      ],
      technologies: ["Precision Measurement", "Quality Control", "Dimensional Inspection", "Process Improvement", "Documentation Systems"]
    }
  ]
}

const allSkills: Record<string, Skill[]> = {
  david: [
    {
      category: "CAD Software",
      icon: <Wrench className="w-6 h-6" />,
      items: ["SolidWorks", "Autodesk Inventor", "AutoCAD", "AVEVA P&ID", "Autodesk Vault PDM"]
    },
    {
      category: "Engineering Analysis",
      icon: <Zap className="w-6 h-6" />,
      items: ["HTRI", "CFD Analysis", "PV Elite", "FEA", "Thermal Analysis", "Stress Analysis"]
    },
    {
      category: "Standards & Codes",
      icon: <Target className="w-6 h-6" />,
      items: ["ASME Y14.5 GD&T", "API Standards", "ASME Code", "ISO Standards", "DNV-GL", "NORSOK"]
    }
  ],
  wife: [
    {
      category: "CAD & Design Software",
      icon: <Wrench className="w-6 h-6" />,
      items: ["AutoCAD", "Autodesk Inventor", "SolidWorks", "Technical Drawings", "Assembly Documentation", "Conceptual Design"]
    },
    {
      category: "Project Management",
      icon: <Users className="w-6 h-6" />,
      items: ["MS Project", "Project Specifications", "Budget Management", "Schedule Coordination", "Stakeholder Communication", "Continuous Improvement"]
    },
    {
      category: "Quality Control & Manufacturing",
      icon: <Target className="w-6 h-6" />,
      items: ["Quality Inspections", "Dimensional Inspections", "First Article Inspection", "Tool Calibration", "ERP Systems", "Lean Six Sigma"]
    },
    {
      category: "Technical Skills",
      icon: <Zap className="w-6 h-6" />,
      items: ["Engineering Calculations", "Data Analysis", "Technical Reports", "Specifications", "Problem Solving", "Troubleshooting"]
    },
    {
      category: "Languages & Communication",
      icon: <Calendar className="w-6 h-6" />,
      items: ["Trilingual: English, Spanish, French", "Technical Documentation", "Client Communication", "Team Collaboration", "Cross-cultural Communication"]
    }
  ]
}

// Company Details Data
const companyDetails: Record<string, CompanyDetail> = {
  "chart-industries": {
    id: "chart-industries",
    name: "Chart Industries (Hudson Products Division)",
    logo: "🏭",
    industry: "Cryogenic Equipment & Heat Transfer Systems",
    founded: "1992 (Hudson Products acquired 2018)",
    headquarters: "Ball Ground, GA (Hudson: Beasley, TX)",
    employees: "12,000+ globally (Hudson Division: 500+)",
    description: "Chart Industries is a leading global manufacturer of highly engineered equipment servicing multiple applications in the clean energy and industrial gas markets. The Hudson Products division, acquired in 2018, specializes in air-cooled heat exchangers, Fin-Fan® systems, and Tuf-Lite® axial flow fans for the oil, gas, and petrochemical industries.",
    businessFocus: [
      "Cryogenic Equipment Manufacturing",
      "Air-Cooled Heat Exchanger Design & Manufacturing",
      "LNG & Petrochemical Processing Equipment",
      "Heat Transfer Technology Innovation",
      "Clean Energy Solutions",
      "Industrial Gas Equipment"
    ],
    keyProducts: [
      "Fin-Fan® Air-Cooled Heat Exchangers",
      "Tuf-Lite® Axial Flow Fans",
      "Cryogenic Storage & Distribution Systems",
      "LNG Equipment & Liquefaction Plants",
      "Heat Transfer Equipment",
      "Industrial Cooling Systems"
    ],
    marketPosition: "Leading global manufacturer with NYSE listing (GTLS), operating the world's largest air-cooled heat exchanger manufacturing facility in Beasley, TX (120 acres, 400,000 ft² under roof).",
    workflowTitle: "Air-Cooled Heat Exchanger Design & Engineering Workflow",
    designProcess: [
      {
        phase: "Project Initiation & Requirements Analysis",
        description: "Collaborate with thermal engineers and clients to define heat exchanger specifications, operating conditions, and performance requirements for LNG and petrochemical applications using Chart's proprietary software and industry-leading tools.",
        deliverables: ["Project specifications", "Heat duty calculations", "Operating parameter definitions", "Environmental requirements"],
        tools: ["HTRI software", "CFD analysis tools", "Chart proprietary software", "HYSIS", "AspenOne"],
        duration: "1-2 weeks"
      },
      {
        phase: "Thermal & Mechanical Design",
        description: "Design finned tube bundles, determine fan configurations, and optimize heat transfer performance using advanced thermal modeling, CFD analysis, and finite element analysis for superior engineering solutions.",
        deliverables: ["3D tube bundle models", "Fan selection specifications", "Heat transfer calculations", "Performance curves"],
        tools: ["SolidWorks", "Autodesk Inventor", "HTRI", "CFD Analysis", "RISA 3-D structural analysis", "Finite element analysis"],
        duration: "3-4 weeks"
      },
      {
        phase: "3D Modeling & Assembly Design",
        description: "Create detailed 3D models of heat exchanger components including tube bundles, supporting structures, and fan assemblies with 99.8% design accuracy using Chart's streamlined engineering processes.",
        deliverables: ["Complete 3D assemblies", "Component models", "Assembly drawings", "Structural analysis"],
        tools: ["SolidWorks", "Autodesk Inventor", "PDM systems", "VBA automation macros"],
        duration: "4-6 weeks"
      },
      {
        phase: "Manufacturing & Quality Assurance",
        description: "Support manufacturing at Chart's world-class Beasley facility with comprehensive documentation, quality control, and fabrication support for the industry's most demanding applications.",
        deliverables: ["Manufacturing specifications", "Quality procedures", "Fabrication drawings", "Final documentation"],
        tools: ["Manufacturing systems", "Quality control systems", "Chart Lifecycle services"],
        duration: "2-4 weeks"
      },
      {
        phase: "Aftermarket & Service Support",
        description: "Provide comprehensive aftermarket services through Chart's industry-leading service network, including commissioning, training, and lifecycle support for optimal equipment performance.",
        deliverables: ["Service procedures", "Training materials", "Aftermarket support", "Performance optimization"],
        tools: ["Chart Service network", "Hudson Service team", "Field service support", "Chart Parts"],
        duration: "Ongoing lifecycle support"
      }
    ],
    majorProjects: [
      {
        name: "LNG Facility Heat Exchanger Systems",
        type: "Large-Scale Industrial",
        value: "$50M+ Annual Portfolio",
        description: "Design of air-cooled heat exchangers for major LNG and petrochemical facilities worldwide through Chart's Hudson Products division, achieving industry-leading efficiency improvements and supporting clean energy transition.",
        challenges: [
          "Extreme operating conditions (-40°F to 120°F)",
          "High-pressure applications (up to 2,500 PSI)",
          "Complex multi-phase heat transfer requirements",
          "Strict environmental and safety regulations",
          "Clean energy transition requirements"
        ],
        solutions: [
          "Chart's proprietary design software and engineering tools",
          "Advanced CFD analysis and thermal optimization",
          "Custom finned tube configurations using Hy-Fin® technology",
          "Innovative Tuf-Lite® fan systems for maximum efficiency",
          "Comprehensive testing at world's largest manufacturing facility"
        ],
        outcomes: [
          "99.8% design accuracy across 200+ drawings annually",
          "15% heat transfer efficiency improvements",
          "60+ successful LNG project implementations",
          "Zero safety incidents in manufactured equipment",
          "Industry-leading performance in clean energy applications"
        ]
      },
      {
        name: "World-Class Manufacturing Excellence",
        type: "Manufacturing & Operations",
        value: "$100M+ Facility Investment",
        description: "Operations at Chart's Beasley, TX facility - the world's largest air-cooled heat exchanger manufacturing facility, featuring 120 acres, 400,000 ft² under roof, and state-of-the-art equipment.",
        challenges: [
          "Complex large-scale manufacturing requirements",
          "Custom engineered-to-order products",
          "Stringent quality and safety standards",
          "Global supply chain coordination",
          "Continuous capacity expansion needs"
        ],
        solutions: [
          "State-of-the-art manufacturing processes and equipment",
          "34 fixed cranes (3-30 tons) and 2 mobile crawler cranes",
          "720,000 ft² of storage and marshalling space",
          "Advanced machine shop with bespoke capabilities",
          "Comprehensive quality control and testing systems"
        ],
        outcomes: [
          "World's largest air-cooled heat exchanger facility",
          "Industry-leading manufacturing capabilities",
          "Recent 50,000 ft² capacity expansion completed",
          "Hundreds of thousands of products operating globally",
          "Chart Industries' NYSE-listed performance (GTLS)"
        ]
      }
    ],
    companyStats: [
      { label: "Annual Revenue", value: "$1.5B+", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Design Accuracy", value: "99.8%", icon: <CheckCircle className="w-5 h-5" /> },
      { label: "Global Employees", value: "12,000+", icon: <Users className="w-5 h-5" /> },
      { label: "Manufacturing Space", value: "400K ft²", icon: <Building className="w-5 h-5" /> }
    ],
    designRole: "Mechanical Designer - Air-Cooled Heat Exchangers",
    roleImpact: [
      "Lead mechanical design for 60+ LNG and petrochemical projects annually",
      "Achieved 99.8% design accuracy across 200+ technical drawings",
      "Collaborated with thermal engineers using Chart's proprietary software",
      "Implemented VBA automation reducing design time by 70%",
      "Contributed to Chart Industries' clean energy transition initiatives"
    ],
    technicalFocus: [
      "Air-Cooled Heat Exchanger Design",
      "Fin-Fan® & Tuf-Lite® Technologies",
      "3D Mechanical Modeling & CAD",
      "Thermal System Optimization",
      "Manufacturing Process Support",
      "Clean Energy Applications"
    ]
  },
  "inova-geophysical": {
    id: "inova-geophysical", 
    name: "INOVA Geophysical",
    logo: "🌍",
    industry: "Seismic Data Acquisition & Geophysical Equipment",
    founded: "2010 (Joint Venture: ION Geophysical & BGP)",
    headquarters: "Sugar Land, TX",
    employees: "500+ globally",
    description: "INOVA Geophysical designs and manufactures advanced seismic data acquisition systems, Vibroseis vehicles, and digital sensors for the global oil and gas exploration industry. Leader in land seismic technology with operations worldwide.",
    businessFocus: [
      "Land Seismic Data Acquisition Systems",
      "Vibroseis Source Vehicle Manufacturing",
      "Digital Seismic Sensor Technology",
      "Geophysical Equipment Innovation",
      "Global Energy Exploration Support"
    ],
    keyProducts: [
      "AHV-IV™ & AHV-V TITAN Vibrators",
      "Quantum® Nodal Recording Systems",
      "G3i® NXT Cable Systems",
      "Seismic Source Controllers",
      "Digital 3C Receivers & Geophones"
    ],
    marketPosition: "#1 Vibrator manufacturer globally with 50+ years of seismic vehicle innovation and the world's most advanced nodal recording technology.",
    workflowTitle: "Vibroseis Vehicle Design & Manufacturing Workflow",
    designProcess: [
      {
        phase: "Seismic Requirements & Specifications",
        description: "Define vibroseis vehicle requirements for harsh field environments, analyzing operating conditions from -40°F to 120°F with extreme terrain capabilities.",
        deliverables: ["Vehicle specifications", "Environmental requirements", "Performance targets", "Safety standards"],
        tools: ["Field analysis software", "Environmental modeling", "Performance simulation", "Safety assessment tools"],
        duration: "2-3 weeks"
      },
      {
        phase: "Hydraulic System Design",
        description: "Design advanced hydraulic systems for vibration generation, chassis control, and high-pressure operations up to 3,500 PSI for seismic energy transmission.",
        deliverables: ["Hydraulic schematics", "Component specifications", "Pressure calculations", "System integration plans"],
        tools: ["Autodesk Inventor", "Hydraulic simulation software", "CAD modeling", "System analysis tools"],
        duration: "4-6 weeks"
      },
      {
        phase: "Chassis & Mechanical Assembly",
        description: "Create 3D mechanical assemblies for vehicle chassis, vibration mechanisms, and structural components using automated API scripts for streamlined integration.",
        deliverables: ["3D chassis models", "Assembly drawings", "Mechanical specifications", "Integration procedures"],
        tools: ["Autodesk Inventor", "Inventor API scripts", "Assembly automation", "Structural analysis"],
        duration: "6-8 weeks"
      },
      {
        phase: "GD&T Documentation & Manufacturing",
        description: "Develop precise 2D drawings with ASME Y14.5 GD&T standards for manufacturing and assembly operations, ensuring zero tolerance stack-up issues.",
        deliverables: ["GD&T drawings", "Manufacturing specifications", "Assembly procedures", "Quality standards"],
        tools: ["ASME Y14.5 GD&T", "Technical drawing software", "Manufacturing guidelines", "Quality systems"],
        duration: "3-4 weeks"
      },
      {
        phase: "Testing & Field Validation",
        description: "Support field testing and validation of vibroseis vehicles in operational environments, ensuring performance meets seismic acquisition requirements.",
        deliverables: ["Test procedures", "Performance validation", "Field reports", "Optimization recommendations"],
        tools: ["Field testing equipment", "Data acquisition systems", "Performance monitoring", "Analysis software"],
        duration: "4-6 weeks"
      }
    ],
    majorProjects: [
      {
        name: "AHV-IV Series Vibroseis Fleet",
        type: "Seismic Vehicle Manufacturing",
        value: "$100M+ Program",
        description: "Design and manufacturing of advanced Vibroseis vehicles for global seismic acquisition, featuring automated assembly integration reducing production time by 70%.",
        challenges: [
          "Extreme environmental operating conditions",
          "High-precision seismic energy transmission requirements", 
          "Complex hydraulic system integration",
          "Rapid manufacturing scale-up demands"
        ],
        solutions: [
          "Inventor API automation for assembly integration",
          "Advanced hydraulic system design and testing",
          "Robust chassis engineering for harsh environments",
          "Streamlined manufacturing processes"
        ],
        outcomes: [
          "70% reduction in assembly integration time",
          "120 hours monthly time savings through automation",
          "Zero tolerance stack-up issues in manufacturing",
          "Global fleet deployment success across 30+ countries"
        ]
      },
      {
        name: "Quantum Nodal System Development",
        type: "Digital Technology Innovation",
        value: "$50M+ Development",
        description: "Supporting mechanical design for revolutionary nodal seismic recording systems, enabling wireless data acquisition and HyperQ communication technology.",
        challenges: [
          "Miniaturization of complex electronics",
          "Environmental protection for field deployment",
          "Wireless communication reliability",
          "Battery life optimization"
        ],
        solutions: [
          "Compact mechanical housing design",
          "Advanced environmental sealing systems",
          "Optimized component layout for performance",
          "Integrated power management solutions"
        ],
        outcomes: [
          "Industry-leading nodal recording capability",
          "220,000+ node deployments globally",
          "Enhanced data quality and acquisition efficiency",
          "Revolutionary wireless QC monitoring"
        ]
      }
    ],
    companyStats: [
      { label: "Global Market Share", value: "#1", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Vibrator Experience", value: "50+ Years", icon: <Calendar className="w-5 h-5" /> },
      { label: "Countries Served", value: "30+", icon: <Building className="w-5 h-5" /> },
      { label: "Innovation Patents", value: "100+", icon: <Settings className="w-5 h-5" /> }
    ],
    designRole: "Senior Mechanical Designer - Seismic Equipment",
    roleImpact: [
      "Designed mechanical systems for world's most advanced Vibroseis vehicles",
      "Implemented API automation reducing assembly time by 70%",
      "Achieved zero tolerance stack-up issues in precision manufacturing",
      "Supported global deployment of seismic acquisition equipment",
      "Contributed to revolutionary nodal recording system development"
    ],
    technicalFocus: [
      "Vibroseis Vehicle Design",
      "Hydraulic System Engineering",
      "Chassis & Mechanical Assembly",
      "ASME Y14.5 GD&T Standards",
      "Manufacturing Process Automation",
      "Field Environment Engineering"
    ]
  },
  "kbr": {
    id: "kbr",
    name: "KBR",
    logo: "🏢", // This will be updated to show KBR branding
    industry: "Engineering, Procurement & Construction (EPC)",
    founded: "1901",
    headquarters: "Houston, Texas",
    employees: "28,000+",
    description: "KBR is a global provider of differentiated professional services and technologies across the asset and program lifecycle within the Government Solutions and Sustainable Technology Solutions markets. We deliver science, technology and engineering solutions to governments and companies around the world.",
    businessFocus: [
      "Government Solutions & Defense",
      "Sustainable Technology Solutions", 
      "Engineering, Procurement & Construction",
      "Refinery & Chemical Plant Engineering",
      "LNG & Gas Processing Facilities",
      "Technology & Consulting Services",
      "Infrastructure & Civil Engineering"
    ],
    keyProducts: [
      "Petrochemical EPC Projects",
      "LNG Processing Facilities", 
      "Refinery Engineering Services",
      "Process Equipment Design",
      "Technology Solutions",
      "Government Defense Programs",
      "Sustainable Energy Solutions"
    ],
    marketPosition: "Leading global EPC contractor with over $500M+ petrochemical projects, delivering science, technology and engineering solutions with the mission of 'Delivering Solutions, Changing the World®'",
    workflowTitle: "EPC Project Engineering & Process Equipment Design Workflow",
    designProcess: [
      {
        phase: "Front-End Engineering Design (FEED)",
        description: "Develop preliminary engineering designs, process specifications, and project feasibility studies for major petrochemical and refinery projects.",
        deliverables: ["Process flow diagrams", "Equipment specifications", "Cost estimates", "Project schedules"],
        tools: ["Process simulation software", "ASPEN Plus", "HYSYS", "Engineering design systems"],
        duration: "8-16 weeks"
      },
      {
        phase: "Detailed Engineering & P&ID Development",
        description: "Create comprehensive piping and instrumentation diagrams, equipment layouts, and detailed engineering specifications for EPC project execution.",
        deliverables: ["P&ID drawings", "Equipment datasheets", "Piping specifications", "Instrumentation lists"],
        tools: ["AutoCAD", "P&ID software", "3D modeling systems", "Engineering databases"],
        duration: "12-24 weeks"
      },
      {
        phase: "Process Equipment Design & Validation",
        description: "Design and validate process equipment including pressure vessels, heat exchangers, and mechanical systems with full ASME compliance.",
        deliverables: ["Equipment designs", "Structural calculations", "ASME code compliance", "Vendor specifications"],
        tools: ["SolidWorks", "Autodesk Inventor", "PV Elite", "ASME Standards", "API Standards"],
        duration: "8-16 weeks"
      },
      {
        phase: "Procurement & Vendor Management",
        description: "Manage procurement processes for major equipment and materials, ensuring quality, delivery, and cost optimization for $500M+ projects.",
        deliverables: ["Procurement packages", "Vendor evaluations", "Material specifications", "Quality plans"],
        tools: ["SAP", "Procurement systems", "Vendor management platforms", "Quality assurance tools"],
        duration: "16-32 weeks"
      },
      {
        phase: "Construction Support & Commissioning",
        description: "Provide engineering support during construction, commissioning, and startup phases, ensuring project success and operational readiness.",
        deliverables: ["Construction drawings", "Commissioning procedures", "Startup support", "Performance validation"],
        tools: ["Construction management systems", "Commissioning software", "Performance monitoring", "Documentation systems"],
        duration: "24-52 weeks"
      }
    ],
    majorProjects: [
      {
        name: "Lake Charles LNG Transformation",
        type: "Large-Scale LNG Project",
        value: "$16.45M MTPA Capacity",
        description: "Engineering, procurement, and construction management for transforming existing import facility into world-class LNG export facility with three liquefaction trains.",
        challenges: [
          "Complex conversion from import to export facility",
          "Three liquefaction trains integration",
          "Existing infrastructure modifications",
          "Environmental and safety compliance"
        ],
        solutions: [
          "Advanced process engineering for LNG liquefaction",
          "Modular construction approach for efficiency",
          "Comprehensive safety and environmental systems",
          "State-of-the-art automation and control systems"
        ],
        outcomes: [
          "World-class LNG export facility design",
          "Enhanced global energy security contribution",
          "Cleanest operating facility in the United States",
          "Successful EPC contract award and execution"
        ]
      },
      {
        name: "Petrochemical Refinery Projects",
        type: "Process Equipment Design",
        value: "$500M+ Total Value",
        description: "Design of process equipment and piping systems for major petrochemical EPC projects including refineries and chemical processing facilities.",
        challenges: [
          "Complex process requirements translation",
          "High-pressure vessel design (up to 2,500 PSI)",
          "ASME code compliance across multiple projects",
          "Integration with existing facility infrastructure"
        ],
        solutions: [
          "Advanced process engineering and modeling",
          "Comprehensive structural integrity analysis",
          "Full ASME and API standards compliance",
          "Innovative piping and equipment layouts"
        ],
        outcomes: [
          "15+ major petrochemical projects completed",
          "Zero safety incidents in equipment operation",
          "Enhanced process efficiency and reliability",
          "Successful facility startups and commissioning"
        ]
      }
    ],
    companyStats: [
      { label: "Global Projects", value: "$500M+", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Industry Experience", value: "120+ Years", icon: <Calendar className="w-5 h-5" /> },
      { label: "Global Employees", value: "36,000+", icon: <Users className="w-5 h-5" /> },
      { label: "Countries Operations", value: "33", icon: <Building className="w-5 h-5" /> }
    ],
    designRole: "Senior Mechanical Designer - Process Equipment",
    roleImpact: [
      "Designed process equipment for $500M+ petrochemical EPC projects",
      "Collaborated with process engineers on major refinery projects",
      "Executed PV Elite calculations for high-pressure vessel design",
      "Ensured full ASME compliance across 15+ major projects",
      "Contributed to successful LNG and petrochemical facility developments"
    ],
    technicalFocus: [
      "Process Equipment Design",
      "Pressure Vessel Engineering",
      "P&ID Development",
      "ASME & API Standards Compliance",
      "Petrochemical Process Systems",
      "EPC Project Support"
    ]
  },
  "control-flow": {
    id: "control-flow",
    name: "Control Flow Inc.",
    logo: "⚙️",
    industry: "Offshore Drilling & Motion Compensation Systems",
    founded: "1975",
    headquarters: "Houston, TX",
    employees: "200+",
    description: "Control Flow Inc. specializes in design and manufacturing of motion compensation systems, wellhead equipment, and offshore drilling solutions. Established expertise in Drill String Compensators, Production Riser Tensioners, and offshore pressure control equipment.",
    businessFocus: [
      "Motion Compensation Systems",
      "Offshore Drilling Equipment",
      "Wellhead & Pressure Control Systems",
      "Subsea Equipment Manufacturing",
      "Marine & Military Applications"
    ],
    keyProducts: [
      "Drill String Compensators (DSC)",
      "Production Riser Tensioner Modules (PRT®)",
      "Ultimate Mo-Comp Cylinder Assemblies (UMCCA™)",
      "Blowout Preventers (BOPs)",
      "Wellhead Equipment & Christmas Trees"
    ],
    marketPosition: "Leading manufacturer of motion compensation systems for offshore drilling with 50+ years of proven reliability in deepwater operations and harsh marine environments.",
    workflowTitle: "Motion Compensation System Design & Engineering Workflow",
    designProcess: [
      {
        phase: "Offshore Requirements Analysis",
        description: "Analyze offshore drilling platform requirements, sea state conditions, and motion compensation specifications for deepwater operations up to 6-meter sea states.",
        deliverables: ["Motion analysis reports", "Environmental specifications", "Load calculations", "Performance requirements"],
        tools: ["Motion simulation software", "Environmental modeling", "Load analysis tools", "Marine engineering systems"],
        duration: "3-4 weeks"
      },
      {
        phase: "Hydraulic System Design",
        description: "Design high-pressure hydraulic systems for motion compensation, including accumulators, cylinders, and control systems operating at 3,500 PSI.",
        deliverables: ["Hydraulic schematics", "Component specifications", "Pressure calculations", "Control system design"],
        tools: ["SolidWorks", "Autodesk Inventor", "Hydraulic simulation", "Pressure analysis software"],
        duration: "6-8 weeks"
      },
      {
        phase: "Mechanical Assembly & Integration",
        description: "Create detailed mechanical designs for compensator assemblies, tensioner modules, and integrated accumulator systems for offshore platforms.",
        deliverables: ["3D mechanical models", "Assembly drawings", "Integration specifications", "Structural analysis"],
        tools: ["SolidWorks", "Autodesk Inventor", "Structural analysis", "Marine engineering software"],
        duration: "8-12 weeks"
      },
      {
        phase: "API Standards Compliance",
        description: "Ensure all designs meet API 16F standards and offshore safety requirements for motion compensation and drilling equipment.",
        deliverables: ["API compliance documentation", "Safety certifications", "Quality standards", "Testing procedures"],
        tools: ["API 16F Standards", "Safety analysis software", "Compliance management", "Quality systems"],
        duration: "4-6 weeks"
      },
      {
        phase: "Testing & Offshore Validation",
        description: "Conduct comprehensive testing and validation of motion compensation systems in simulated and actual offshore conditions.",
        deliverables: ["Test procedures", "Performance validation", "Offshore trials", "Reliability reports"],
        tools: ["Test equipment", "Motion simulators", "Data acquisition", "Performance monitoring"],
        duration: "8-16 weeks"
      }
    ],
    majorProjects: [
      {
        name: "Motion Compensation System Automation",
        type: "Offshore Drilling Technology",
        value: "$25M+ Development Program",
        description: "Design and manufacturing of advanced motion compensation systems for offshore drilling operations, including Drill String Compensators with 99.7% reliability rating.",
        challenges: [
          "Extreme offshore operating conditions",
          "High-pressure hydraulic systems (3,500 PSI)",
          "6-meter sea state compensation requirements",
          "99.7% reliability standards for critical operations"
        ],
        solutions: [
          "Advanced hydraulic cylinder design with integrated accumulators",
          "Robust mechanical engineering for marine environments",
          "Comprehensive motion simulation and modeling",
          "Redundant safety systems and fail-safes"
        ],
        outcomes: [
          "99.7% reliability rating for Drill String Compensators",
          "Successful operation in North Sea extreme conditions",
          "1,500,000 lbs tension capacity for deepwater platforms",
          "Zero safety incidents in offshore operations"
        ]
      },
      {
        name: "Production Riser Tensioner Development",
        type: "Deepwater Equipment",
        value: "$15M+ Project Value",
        description: "Development of Production Riser Tensioner Modules (PRT®) for deepwater drilling platforms with 1,500,000 lbs tension capacity.",
        challenges: [
          "Extreme deepwater operating conditions",
          "Massive tension loads (1.5M lbs capacity)",
          "Complex hydraulic cylinder assemblies",
          "Integration with existing platform systems"
        ],
        solutions: [
          "Ultra-high capacity hydraulic cylinder design",
          "Advanced materials for marine environment resistance",
          "Modular design for platform integration",
          "Comprehensive load distribution systems"
        ],
        outcomes: [
          "Successfully deployed on multiple deepwater platforms",
          "1,500,000 lbs tension capacity achievement",
          "Enhanced drilling efficiency and safety",
          "Industry-leading performance in harsh marine conditions"
        ]
      }
    ],
    companyStats: [
      { label: "Industry Experience", value: "50+ Years", icon: <Calendar className="w-5 h-5" /> },
      { label: "Reliability Rating", value: "99.7%", icon: <CheckCircle className="w-5 h-5" /> },
      { label: "Tension Capacity", value: "1.5M lbs", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Global Installations", value: "500+", icon: <Building className="w-5 h-5" /> }
    ],
    designRole: "Mechanical Designer - Motion Compensation Systems",
    roleImpact: [
      "Designed motion compensation systems for offshore drilling operations",
      "Developed hydraulic cylinder assemblies for Production Riser Tensioners",
      "Created detailed designs for Ultimate Mo-Comp Cylinder Assemblies",
      "Achieved 99.7% reliability rating for critical offshore equipment",
      "Supported deepwater drilling operations in extreme marine environments"
    ],
    technicalFocus: [
      "Motion Compensation System Design",
      "High-Pressure Hydraulic Systems",
      "Offshore Equipment Engineering",
      "API 16F Standards Compliance",
      "Marine Environment Engineering",
      "Deepwater Platform Integration"
    ]
  },
  "systel-designer": {
    id: "systel-designer",
    name: "Systel Inc.",
    logo: "🔧",
    industry: "Rugged Computing & Industrial Technology",
    founded: "1978",
    headquarters: "Sugar Land, TX",
    employees: "200+",
    description: "Systel Inc. is a leading manufacturer of rugged computing solutions for defense, industrial, and commercial applications. Specializing in mission-critical systems that operate in extreme environments with uncompromising reliability.",
    businessFocus: [
      "MIL-SPEC Rugged Computer Manufacturing",
      "Industrial Computing Solutions",
      "Custom Engineering Design",
      "Defense & Aerospace Systems",
      "Mission-Critical Technology"
    ],
    keyProducts: [
      "MIL-SPEC Rugged Computers",
      "Industrial Embedded Systems",
      "Rackmount Computing Solutions",
      "Custom Electronic Enclosures",
      "Mission-Critical Servers"
    ],
    marketPosition: "Leading provider of rugged computing solutions for defense and industrial applications with ISO 9001:2015 and AS9100D:2016 certifications.",
    workflowTitle: "Mechanical Design & Manufacturing Engineering Workflow",
    designProcess: [
      {
        phase: "Requirements Analysis & Design Planning",
        description: "Analyze customer requirements for rugged computing solutions, defining mechanical specifications, environmental conditions, and manufacturing constraints.",
        deliverables: ["Design requirements", "Environmental specifications", "Manufacturing feasibility analysis", "Project timeline"],
        tools: ["ERP systems", "Requirements management", "Design planning software", "Customer interface systems"],
        duration: "1-2 weeks"
      },
      {
        phase: "3D Mechanical Design & Modeling",
        description: "Create detailed 3D models and assemblies for rugged computer enclosures, thermal management systems, and mechanical components using advanced CAD software.",
        deliverables: ["3D models", "Assembly drawings", "Component specifications", "Design validation"],
        tools: ["Autodesk Inventor", "AutoCAD", "SolidWorks", "3D modeling software"],
        duration: "3-4 weeks"
      },
      {
        phase: "Manufacturing Documentation & BOM Creation",
        description: "Develop comprehensive manufacturing documentation, bills of materials, and assembly instructions to optimize production schedules and reduce material costs.",
        deliverables: ["Technical drawings", "BOMs", "Assembly documentation", "Manufacturing specifications"],
        tools: ["ERP systems", "BOM management", "Documentation software", "Manufacturing planning tools"],
        duration: "2-3 weeks"
      },
      {
        phase: "Production Support & Continuous Improvement",
        description: "Support manufacturing teams with technical guidance, troubleshooting, and process improvements to enhance efficiency and reduce production delays.",
        deliverables: ["Manufacturing support", "Process improvements", "Technical guidance", "Quality enhancements"],
        tools: ["Manufacturing systems", "Quality control tools", "Process optimization software", "Production tracking"],
        duration: "Ongoing"
      },
      {
        phase: "Sales & Marketing Collaboration",
        description: "Create conceptual drawings and technical presentations for sales and marketing teams to support customer engagement and business development.",
        deliverables: ["Conceptual drawings", "Technical presentations", "Customer proposals", "Marketing materials"],
        tools: ["Design visualization", "Presentation software", "Customer interface tools", "Marketing systems"],
        duration: "1-2 weeks per project"
      }
    ],
    majorProjects: [
      {
        name: "Rugged Computing Platform Development",
        type: "Product Design & Manufacturing",
        value: "$25M+ Annual Production",
        description: "Complete mechanical design and manufacturing support for rugged computing platforms serving defense and industrial markets with enhanced reliability and performance.",
        challenges: [
          "Extreme environmental operating conditions",
          "MIL-SPEC compliance requirements",
          "Complex thermal management needs",
          "High reliability and durability standards"
        ],
        solutions: [
          "Advanced thermal design and modeling",
          "Robust mechanical engineering for harsh environments",
          "Optimized manufacturing processes and workflows",
          "Comprehensive testing and validation procedures"
        ],
        outcomes: [
          "10% reduction in material costs through BOM optimization",
          "15% improvement in manufacturing efficiency",
          "12% decrease in production delays",
          "5% increase in sales through enhanced conceptual designs"
        ]
      },
      {
        name: "Custom Military Computing Solutions",
        type: "Defense Contractor Projects",
        value: "$10M+ Contract Value",
        description: "Design and manufacturing of specialized computing solutions for military applications requiring extreme ruggedness and mission-critical reliability.",
        challenges: [
          "Stringent military specifications and standards",
          "Rapid prototyping and deployment requirements",
          "Custom design modifications for specific missions",
          "Quality assurance and certification processes"
        ],
        solutions: [
          "Streamlined design and documentation processes",
          "Advanced manufacturing techniques and automation",
          "Rigorous quality control and testing protocols",
          "Collaborative engineering and customer support"
        ],
        outcomes: [
          "100% on-time delivery for critical military contracts",
          "Zero quality defects in delivered systems",
          "Enhanced customer satisfaction and repeat business",
          "Successful certification for defense applications"
        ]
      }
    ],
    companyStats: [
      { label: "Manufacturing Experience", value: "45+ Years", icon: <Calendar className="w-5 h-5" /> },
      { label: "Quality Certification", value: "ISO 9001", icon: <CheckCircle className="w-5 h-5" /> },
      { label: "Defense Contracts", value: "$50M+", icon: <Building className="w-5 h-5" /> },
      { label: "Product Reliability", value: "99.9%", icon: <TrendingUp className="w-5 h-5" /> }
    ],
    designRole: "Mechanical Designer - Rugged Computing Systems",
    roleImpact: [
      "Optimized production schedules and reduced material costs by 10%",
      "Improved manufacturing efficiency by 15% through enhanced documentation",
      "Reduced production delays by 12% through effective team support",
      "Contributed to 5% sales increase through compelling conceptual designs",
      "Maintained zero quality defects in critical defense applications"
    ],
    technicalFocus: [
      "Rugged Computer Enclosure Design",
      "Thermal Management Systems",
      "Manufacturing Process Optimization",
      "ERP System Integration",
      "Technical Documentation & BOM Management",
      "Sales & Marketing Support"
    ]
  },
  "diamonds-blocks": {
    id: "diamonds-blocks",
    name: "Diamonds Blocks Services",
    logo: "🏗️",
    industry: "Construction & Project Management",
    founded: "2015",
    headquarters: "Malabo, Equatorial Guinea",
    employees: "150+",
    description: "Diamonds Blocks Services is a leading construction and project management company in Equatorial Guinea, specializing in large-scale infrastructure projects, commercial construction, and industrial facility development across Central Africa.",
    businessFocus: [
      "Large-Scale Construction Projects",
      "Infrastructure Development",
      "Project Management & Coordination",
      "Industrial Facility Construction",
      "International Project Execution"
    ],
    keyProducts: [
      "Commercial Construction Projects",
      "Infrastructure Development",
      "Industrial Facility Construction",
      "Project Management Services",
      "Engineering & Design Services"
    ],
    marketPosition: "Leading construction company in Equatorial Guinea with expertise in managing complex international projects and infrastructure development across Central Africa.",
    workflowTitle: "Construction Project Management & Engineering Workflow",
    designProcess: [
      {
        phase: "Project Initiation & Specifications",
        description: "Generate comprehensive project specifications, define scope, and establish project parameters for large-scale construction and infrastructure projects.",
        deliverables: ["Project specifications", "Scope definitions", "Feasibility studies", "Risk assessments"],
        tools: ["MS Project", "Project planning software", "CAD systems", "Specification management"],
        duration: "2-4 weeks"
      },
      {
        phase: "Conceptual Design & Engineering",
        description: "Develop general and conceptual design solutions using advanced engineering software and coordinate with multidisciplinary teams.",
        deliverables: ["Conceptual designs", "Engineering drawings", "Design calculations", "Material specifications"],
        tools: ["SolidWorks", "MS Project", "CAD software", "Engineering analysis tools"],
        duration: "6-10 weeks"
      },
      {
        phase: "Project Coordination & Data Analysis",
        description: "Coordinate project activities, analyze data, and manage schedules to ensure efficient project execution and stakeholder alignment.",
        deliverables: ["Project schedules", "Coordination plans", "Data analysis reports", "Progress tracking"],
        tools: ["MS Project", "Data analysis software", "Coordination platforms", "Progress monitoring tools"],
        duration: "Ongoing throughout project"
      },
      {
        phase: "Stakeholder Management & Communication",
        description: "Schedule and conduct regular project meetings with contractors, engineers, and stakeholders to ensure project alignment and progress.",
        deliverables: ["Meeting schedules", "Progress reports", "Stakeholder communications", "Action items"],
        tools: ["Communication platforms", "Meeting management", "Reporting systems", "Collaboration tools"],
        duration: "Weekly/Monthly throughout project"
      },
      {
        phase: "Continuous Improvement & Optimization",
        description: "Implement continuous improvement initiatives for existing tooling, equipment, and processes to enhance project efficiency and quality.",
        deliverables: ["Improvement plans", "Process optimizations", "Equipment upgrades", "Efficiency metrics"],
        tools: ["Process improvement tools", "Performance monitoring", "Optimization software", "Quality systems"],
        duration: "Ongoing"
      }
    ],
    majorProjects: [
      {
        name: "Central Africa Infrastructure Development",
        type: "Large-Scale Infrastructure",
        value: "$50M+ Program",
        description: "Management of comprehensive infrastructure development projects across Equatorial Guinea and Central Africa, including commercial and industrial facilities.",
        challenges: [
          "Complex international project coordination",
          "Multi-stakeholder management requirements",
          "Remote location logistical challenges",
          "Cultural and language considerations"
        ],
        solutions: [
          "Advanced project management methodologies",
          "Comprehensive stakeholder engagement strategies",
          "Efficient logistics and supply chain management",
          "Cross-cultural team coordination"
        ],
        outcomes: [
          "Successful completion of 10+ major infrastructure projects",
          "Enhanced regional development and economic growth",
          "Improved project delivery timelines by 25%",
          "Strong stakeholder satisfaction and repeat business"
        ]
      },
      {
        name: "Industrial Facility Construction Program",
        type: "Industrial Construction",
        value: "$30M+ Portfolio",
        description: "Design and construction management for industrial facilities, including manufacturing plants and processing facilities across Equatorial Guinea.",
        challenges: [
          "Complex industrial design requirements",
          "Environmental and safety compliance",
          "Local workforce development needs",
          "Equipment and material procurement challenges"
        ],
        solutions: [
          "Specialized industrial engineering expertise",
          "Comprehensive safety and environmental programs",
          "Local workforce training and development",
          "Strategic procurement and logistics management"
        ],
        outcomes: [
          "Successful delivery of 5+ industrial facilities",
          "Zero safety incidents during construction",
          "Local workforce skill development and employment",
          "Enhanced industrial capacity in the region"
        ]
      }
    ],
    companyStats: [
      { label: "Projects Completed", value: "15+", icon: <Building className="w-5 h-5" /> },
      { label: "Project Value", value: "$80M+", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Countries Served", value: "3", icon: <Calendar className="w-5 h-5" /> },
      { label: "Success Rate", value: "100%", icon: <CheckCircle className="w-5 h-5" /> }
    ],
    designRole: "Construction Project Manager - Infrastructure Development",
    roleImpact: [
      "Managed generation of project specifications for major infrastructure projects",
      "Coordinated data analysis and project scheduling using MS Project",
      "Conducted regular meetings with contractors, engineers, and stakeholders",
      "Implemented continuous improvement initiatives for equipment and processes",
      "Delivered monthly stakeholder updates and progress reports"
    ],
    technicalFocus: [
      "Project Management & Coordination",
      "Infrastructure Development",
      "Stakeholder Communication",
      "Data Analysis & Reporting",
      "Continuous Improvement",
      "International Project Execution"
    ]
  },
  "amtex-qc": {
    id: "amtex-qc",
    name: "AmTex Machine Product",
    logo: "🔍",
    industry: "Manufacturing & Quality Control",
    founded: "1985",
    headquarters: "Houston, TX",
    employees: "300+",
    description: "AmTex Machine Product is a precision manufacturing company specializing in high-quality machined components and assemblies for aerospace, energy, and industrial applications. Known for stringent quality control and dimensional accuracy.",
    businessFocus: [
      "Precision Manufacturing",
      "Quality Control & Inspection",
      "Aerospace Component Manufacturing",
      "Industrial Machining Services",
      "Dimensional Inspection Services"
    ],
    keyProducts: [
      "Precision Machined Components",
      "Aerospace Parts & Assemblies",
      "Industrial Equipment Components",
      "Custom Manufacturing Solutions",
      "Quality Control Services"
    ],
    marketPosition: "Leading precision manufacturing company in Houston with expertise in aerospace and industrial component production, known for exceptional quality control and dimensional accuracy.",
    workflowTitle: "Quality Control & Manufacturing Inspection Workflow",
    designProcess: [
      {
        phase: "Product Quality Planning",
        description: "Develop comprehensive quality plans and inspection procedures to ensure consistency and reliability across all manufactured products.",
        deliverables: ["Quality plans", "Inspection procedures", "Control charts", "Specification reviews"],
        tools: ["Quality management systems", "Statistical process control", "Inspection planning software", "Standards databases"],
        duration: "1-2 weeks"
      },
      {
        phase: "First Article & Routine Inspection",
        description: "Perform first article inspections and routine dimensional inspections to verify conformance to specifications and drawings.",
        deliverables: ["First article reports", "Dimensional inspection results", "Conformance certificates", "Non-conformance reports"],
        tools: ["Coordinate measuring machines", "Dimensional inspection equipment", "Measuring instruments", "Documentation systems"],
        duration: "Ongoing per production schedule"
      },
      {
        phase: "Material Operations Coordination",
        description: "Coordinate with material operations and planning teams for weekly requirement evaluations and production scheduling optimization.",
        deliverables: ["Requirement evaluations", "Material coordination reports", "Production schedules", "Quality metrics"],
        tools: ["ERP systems", "Material planning software", "Coordination platforms", "Scheduling tools"],
        duration: "Weekly coordination cycles"
      },
      {
        phase: "Non-Conformance Management",
        description: "Identify, document, and manage non-conforming products to ensure proper identification and corrective action implementation.",
        deliverables: ["Non-conformance reports", "Corrective action plans", "Root cause analysis", "Process improvements"],
        tools: ["Quality management systems", "CAPA software", "Documentation systems", "Analysis tools"],
        duration: "As required per incidents"
      },
      {
        phase: "Production Monitoring & Documentation",
        description: "Maintain, monitor, and record comprehensive information pertaining to product quality and production performance.",
        deliverables: ["Quality records", "Production monitoring reports", "Performance metrics", "Compliance documentation"],
        tools: ["Data collection systems", "Monitoring software", "Record keeping systems", "Reporting tools"],
        duration: "Continuous monitoring"
      }
    ],
    majorProjects: [
      {
        name: "Aerospace Component Quality Assurance",
        type: "Quality Control Program",
        value: "$10M+ Production Volume",
        description: "Comprehensive quality control program for aerospace component manufacturing, ensuring highest standards of dimensional accuracy and material compliance.",
        challenges: [
          "Stringent aerospace quality requirements",
          "Complex dimensional inspection needs",
          "Material certification requirements",
          "Zero-defect manufacturing standards"
        ],
        solutions: [
          "Advanced coordinate measuring machine (CMM) inspection",
          "Statistical process control implementation",
          "Comprehensive first article inspection procedures",
          "Rigorous material certification processes"
        ],
        outcomes: [
          "99.9% quality conformance achievement",
          "Zero customer quality incidents",
          "AS9100 aerospace certification maintenance",
          "Enhanced customer satisfaction and retention"
        ]
      },
      {
        name: "Industrial Manufacturing Quality Systems",
        type: "Quality Management Implementation",
        value: "$5M+ Quality Investment",
        description: "Implementation of comprehensive quality management systems for industrial component manufacturing with focus on dimensional inspection and tool calibration.",
        challenges: [
          "Complex industrial component specifications",
          "Multiple measurement system requirements",
          "Tool calibration and maintenance needs",
          "Production efficiency optimization"
        ],
        solutions: [
          "Advanced dimensional inspection protocols",
          "Comprehensive tool calibration programs",
          "Online specification checking systems",
          "Integrated quality management systems"
        ],
        outcomes: [
          "25% reduction in inspection time",
          "Improved measurement system capability",
          "Enhanced tool reliability and accuracy",
          "Streamlined quality control processes"
        ]
      }
    ],
    companyStats: [
      { label: "Quality Conformance", value: "99.9%", icon: <CheckCircle className="w-5 h-5" /> },
      { label: "Manufacturing Experience", value: "35+ Years", icon: <Calendar className="w-5 h-5" /> },
      { label: "Customer Incidents", value: "0", icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Certifications", value: "AS9100", icon: <Building className="w-5 h-5" /> }
    ],
    designRole: "QC Inspector - Manufacturing Quality Control",
    roleImpact: [
      "Performed routine quality inspections ensuring product consistency",
      "Conducted first article and dimensional inspections for aerospace components",
      "Coordinated weekly requirements with material operations and planning teams",
      "Ensured proper identification and documentation of non-conforming products",
      "Maintained comprehensive quality records and production monitoring"
    ],
    technicalFocus: [
      "Quality Control & Inspection",
      "Dimensional Inspection",
      "First Article Inspection",
      "Tool Calibration",
      "Statistical Process Control",
      "Manufacturing Documentation"
    ]
  }
}

// Resume download function with fallback
const downloadResume = (profile: string) => {
  // Open HTML resume in new tab with print parameter
  const htmlUrl = profile === 'david' ? '/david-resume.html?print=true' : '/elsa-resume.html?print=true'
  
  console.log(`Opening resume for ${profile}:`, htmlUrl)
  
  try {
    // Open in new tab - this will trigger auto-print due to the ?print=true parameter
    const newWindow = window.open(htmlUrl, '_blank')
    
    if (!newWindow) {
      // If popup blocked, fallback to direct navigation
      window.location.href = htmlUrl
    }
    
    console.log('Resume opened successfully')
  } catch (error) {
    console.error('Resume open failed:', error)
    // Final fallback
    window.location.href = htmlUrl
  }
}

// Profile color gradients for avatars
const profileColors = {
  david: 'from-blue-600 to-indigo-600',
  wife: 'from-emerald-600 to-teal-600'
}

// Company Logo Component
function CompanyLogo({ companyId, size = "text-4xl" }: { companyId: string, size?: string }) {
  const logos: Record<string, React.ReactNode> = {
    "chart-industries": <div className={`${size} font-bold text-blue-600`}>📊</div>,
    "inova-geophysical": <div className={`${size} font-bold text-green-600`}>🌍</div>,
    "kbr": (
      <div className={`${size} flex items-center justify-center`}>
        <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-lg tracking-wider">
          KBR
        </div>
      </div>
    ),
    "control-flow": <div className={`${size} font-bold text-orange-600`}>⚙️</div>,
    "systel": <div className={`${size} font-bold text-purple-600`}>🔧</div>,
    "diamonds-blocks": <div className={`${size} font-bold text-indigo-600`}>💎</div>,
    "amtex": <div className={`${size} font-bold text-teal-600`}>🏭</div>
  }

  return logos[companyId] || <div className={`${size} text-gray-400`}>🏢</div>
}

// Portfolio Switcher Component
function PortfolioSwitcher({ activeProfile, setActiveProfile }: { activeProfile: string, setActiveProfile: (profile: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/95 backdrop-blur-lg shadow-lg border border-gray-200/50 rounded-xl p-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveProfile('david')}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300',
              activeProfile === 'david'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-blue-50'
            )}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              DC
            </div>
            <span className="hidden sm:block">David</span>
          </button>
          
          <ArrowLeftRight className="w-4 h-4 text-gray-400" />
          
          <button
            onClick={() => setActiveProfile('wife')}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300',
              activeProfile === 'wife'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-emerald-50'
            )}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              EN
            </div>
            <span className="hidden sm:block">Elsa</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Navigation Component
function Navigation({ activeSection, setActiveSection, currentProfile, downloadResume }: { 
  activeSection: string, 
  setActiveSection: (section: string) => void,
  currentProfile: string,
  downloadResume: (profile: string) => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const profile = profiles[currentProfile]

  const navItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ]

  const profileColors = {
    david: 'from-blue-600 to-indigo-600',
    wife: 'from-emerald-600 to-teal-600'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${profileColors[currentProfile as keyof typeof profileColors]} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
              {profile.avatar}
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-gray-900">{profile.name}</div>
              <div className="text-sm text-gray-600">{profile.title}</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={clsx(
                    'flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300',
                    isActive
                      ? currentProfile === 'david' 
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-emerald-600 text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Resume Download & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => downloadResume(currentProfile)}
              className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
              currentProfile === 'david' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
            }`}>
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mb-4 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id)
                        setIsMenuOpen(false)
                      }}
                      className={clsx(
                        'flex items-center space-x-3 w-full px-4 py-3 rounded-xl font-medium transition-all duration-300',
                        isActive
                          ? currentProfile === 'david'
                            ? 'bg-blue-600 text-white'
                            : 'bg-emerald-600 text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

// About Section
function AboutSection({ currentProfile, downloadResume }: { currentProfile: string, downloadResume: (profile: string) => void }) {
  const profile = profiles[currentProfile]
  
  const profileGradients = {
    david: 'from-blue-50 via-indigo-50 to-cyan-100',
    wife: 'from-emerald-50 via-teal-50 to-cyan-100'
  }

  const buttonColors = {
    david: {
      primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105',
      secondary: 'bg-white/10 backdrop-blur-sm border border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300'
    },
    wife: {
      primary: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transform hover:scale-105',
      secondary: 'bg-white/10 backdrop-blur-sm border border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300'
    }
  }

  return (
    <section className={`section-padding bg-gradient-to-br ${profileGradients[currentProfile as keyof typeof profileGradients]} relative overflow-hidden`}>
      {/* Industrial Background for David */}
      {currentProfile === 'david' && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url("/profile-background.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            {profile.profileImage ? (
              <img 
                src={profile.profileImage} 
                alt={`${profile.name} - ${profile.title}`}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-2xl"
              />
            ) : (
              <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${profileColors[currentProfile as keyof typeof profileColors]} flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white`}>
                {profile.avatar}
              </div>
            )}
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-gradient">{profile.name}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8">
            {profile.title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
            {profile.summary}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md">
              <MapPin className={`w-5 h-5 ${currentProfile === 'david' ? 'text-blue-600' : 'text-emerald-600'}`} />
              <span className="text-gray-700">{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md">
              <Mail className={`w-5 h-5 ${currentProfile === 'david' ? 'text-blue-600' : 'text-emerald-600'}`} />
              <span className="text-gray-700">{profile.email}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md">
              <Phone className={`w-5 h-5 ${currentProfile === 'david' ? 'text-blue-600' : 'text-emerald-600'}`} />
              <span className="text-gray-700">{profile.phone}</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold transition-all duration-200 ${buttonColors[currentProfile as keyof typeof buttonColors].primary}`}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Get in Touch
              </button>
              <button 
                onClick={() => downloadResume(currentProfile)}
                className={`inline-flex items-center px-6 py-3 text-base font-medium border border-transparent rounded-lg transition-all duration-200 ${buttonColors[currentProfile as keyof typeof buttonColors].secondary}`}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </button>
            </div>
          </motion.div>

          {/* Industrial Expertise Showcase for David */}
          {currentProfile === 'david' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 bg-white/30 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Industrial Equipment Expertise</h3>
                <p className="text-gray-700">Specialized in Gas Compression & Process Equipment Design</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <img 
                    src="/profile-background.jpg" 
                    alt="Industrial Gas Compression Equipment" 
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Gas Compression Systems</h4>
                      <p className="text-gray-700 text-sm">Expert design of CCSC-H models and wide gas compression equipment for industrial applications</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Process Equipment Design</h4>
                      <p className="text-gray-700 text-sm">15+ years designing pressure vessels, heat exchangers, and process equipment for oil & gas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">ASME Compliance</h4>
                      <p className="text-gray-700 text-sm">Structural integrity validation for vessels up to 2,500 PSI with full regulatory compliance</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

// Experience Section
function ExperienceSection({ currentProfile }: { currentProfile: string }) {
  const [activeTab, setActiveTab] = useState(0)
  const currentExperiences = allExperiences[currentProfile] || []
  const navigate = useNavigate()

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { accent: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-500' },
      green: { accent: 'text-green-600', bg: 'bg-green-50', border: 'border-green-500' },
      purple: { accent: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-500' },
      orange: { accent: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-500' },
      pink: { accent: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-500' },
      teal: { accent: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-500' },
      emerald: { accent: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-500' },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentProfile === 'david' 
              ? "15+ years of progressive experience in mechanical design and engineering across leading companies in the energy and technology sectors."
              : "Professional experience in mechanical design, project management, and quality control across manufacturing and construction industries. Expertise in CAD software, Lean Six Sigma processes, and multilingual communication."
            }
          </p>
        </div>

        {/* Company Tabs */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 bg-gray-50 p-2 rounded-xl mb-8">
            {currentExperiences.map((experience: Experience, index: number) => {
              const colorClasses = getColorClasses(experience.color)
              const isActive = activeTab === index
              
              return (
                <button
                  key={experience.id}
                  onClick={() => setActiveTab(index)}
                  className={clsx(
                    'flex items-center gap-3 px-6 py-4 rounded-lg font-semibold transition-all duration-300 border-2',
                    isActive 
                      ? `${colorClasses.bg} ${colorClasses.border} ${colorClasses.accent}`
                      : 'border-transparent text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <CompanyLogo companyId={experience.id} size="text-lg" />
                  <div className="text-left hidden sm:block">
                    <div className="font-bold text-sm">{experience.company}</div>
                    <div className="text-xs opacity-75">{experience.position}</div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-8"
          >
            {currentExperiences.map((experience: Experience, index: number) => {
              if (index !== activeTab) return null
              
              const colorClasses = getColorClasses(experience.color)
              
              return (
                <div key={experience.id}>
                  <div className="flex items-center gap-4 mb-6">
                    <CompanyLogo companyId={experience.id} size="text-4xl" />
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{experience.position}</h3>
                      <p className={`text-xl font-semibold ${colorClasses.accent}`}>{experience.company}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{experience.startDate} - {experience.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                    {experience.description.map((item: string, descIndex: number) => (
                      <motion.div
                        key={descIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: descIndex * 0.1 }}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Technologies & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech: string, techIndex: number) => (
                        <span 
                          key={techIndex} 
                          className={`px-3 py-1 ${colorClasses.bg} ${colorClasses.accent} rounded-full text-sm font-medium`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Company Details Button */}
                  {companyDetails[experience.id] && (
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate(`/company/${experience.id}`)}
                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${colorClasses.bg} ${colorClasses.accent} border-2 ${colorClasses.border}`}
                      >
                        <Building className="w-5 h-5" />
                        <span>View Company Details & Projects</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Skills Section
function SkillsSection({ currentProfile }: { currentProfile: string }) {
  const currentSkills = allSkills[currentProfile] || []
  
  const profileColors = {
    david: 'text-blue-600',
    wife: 'text-emerald-600'
  }

  const profileBgs = {
    david: 'bg-blue-100',
    wife: 'bg-emerald-100'
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technical skills in mechanical {currentProfile === 'david' ? 'design, analysis, and engineering standards' : 'design, project management, quality control, and multilingual communication'}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {currentSkills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-8 text-center"
            >
              <div className={`w-16 h-16 ${profileBgs[currentProfile as keyof typeof profileBgs]} rounded-full flex items-center justify-center mx-auto mb-6 ${profileColors[currentProfile as keyof typeof profileColors]}`}>
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{skill.category}</h3>
              <div className="space-y-2">
                {skill.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection({ currentProfile, downloadResume }: { currentProfile: string, downloadResume: (profile: string) => void }) {
  const profile = profiles[currentProfile]
  
  const profileGradients = {
    david: 'from-blue-600 to-indigo-700',
    wife: 'from-emerald-600 to-teal-700'
  }

  return (
    <section className={`section-padding bg-gradient-to-br ${profileGradients[currentProfile as keyof typeof profileGradients]} text-white`}>
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl mb-12 opacity-90">
              {currentProfile === 'david' 
                ? "Ready to bring your mechanical design projects to life? Let's discuss how my expertise can contribute to your team's success."
                : "Ready to bring my mechanical engineering expertise to your next project? Let's discuss how my experience in design, project management, and quality control can contribute to your team's success."
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <Mail className="w-8 h-8 mx-auto mb-4 opacity-80" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="opacity-80">{profile.email}</p>
              </div>
              <div className="text-center">
                <Phone className="w-8 h-8 mx-auto mb-4 opacity-80" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="opacity-80">{profile.phone}</p>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-4 opacity-80" />
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="opacity-80">{profile.location}</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button className="inline-flex items-center px-8 py-4 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </button>
              <button 
                onClick={() => downloadResume(currentProfile)}
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Company Detail Page Component
function CompanyDetailPage() {
  const { companyId } = useParams<{ companyId: string }>()
  const navigate = useNavigate()
  const company = companyDetails[companyId || '']

  if (!company) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Company Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Button */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </button>
            <div className="flex items-center gap-3">
              <CompanyLogo companyId={company.id} size="text-4xl" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{company.name}</h1>
                <p className="text-sm text-gray-600">{company.industry}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Company Overview Section */}
      <section className={`section-padding ${company.id === 'kbr' ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">{company.logo}</div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{company.name}</h1>
                    <p className="text-xl text-gray-600">{company.industry}</p>
                    {company.id === 'kbr' && (
                      <p className="text-lg text-blue-600 font-semibold italic mt-2">
                        "Delivering Solutions, Changing the World®"
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {company.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-sm text-gray-500">Founded</div>
                    <div className="font-semibold text-gray-900">{company.founded}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-sm text-gray-500">Employees</div>
                    <div className="font-semibold text-gray-900">{company.employees}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm col-span-2">
                    <div className="text-sm text-gray-500">Headquarters</div>
                    <div className="font-semibold text-gray-900">{company.headquarters}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Company Statistics</h3>
                <div className="space-y-6">
                  {company.companyStats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Focus Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Business Focus & Market Position</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{company.marketPosition}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Business Areas</h3>
                <ul className="space-y-3">
                  {company.businessFocus.map((focus, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Products & Services</h3>
                <ul className="space-y-3">
                  {company.keyProducts.map((product, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{product}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process Workflow Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{company.workflowTitle}</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  <span className="text-lg font-semibold text-gray-900">{company.designRole}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {company.designProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card p-8"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{step.phase}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-6 leading-relaxed">{step.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Deliverables</h4>
                          <ul className="space-y-2">
                            {step.deliverables.map((deliverable, dIndex) => (
                              <li key={dIndex} className="flex items-center gap-2 text-sm text-gray-600">
                                <ChevronRight className="w-4 h-4 text-blue-600" />
                                {deliverable}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Tools & Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {step.tools.map((tool, tIndex) => (
                              <span 
                                key={tIndex}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Major Projects & Case Studies Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Major Projects & Case Studies</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore detailed case studies of major projects and engineering achievements that demonstrate our technical expertise and innovation.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {company.majorProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FolderOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{project.type}</span>
                        <span>•</span>
                        <span className="font-semibold text-green-600">{project.value}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Challenges</h4>
                      <ul className="space-y-1">
                        {project.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2"></div>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Solutions Implemented</h4>
                      <ul className="space-y-1">
                        {project.solutions.map((solution, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Project Outcomes</h4>
                      <ul className="space-y-1">
                        {project.outcomes.map((outcome, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2"></div>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Equipment Showcase - Chart Industries Only */}
      {company.id === 'chart-industries' && (
        <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Industrial Equipment Showcase</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Air-cooled heat exchangers and industrial cooling systems designed and manufactured for LNG and petrochemical applications
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-2 shadow-xl">
                    <img 
                      src="/industrial-equipment.jpg" 
                      alt="Industrial air-cooled heat exchanger equipment designed by David Cornealius at Chart Industries"
                      className="w-full rounded-xl shadow-lg"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
                      <span className="text-sm font-semibold">Live Installation</span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Air-Cooled Heat Exchanger Systems</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span><strong>Finned Tube Bundles:</strong> Optimized heat transfer surface design for maximum efficiency</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span><strong>Axial Flow Fans:</strong> Variable speed drive systems for optimal air flow control</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span><strong>Supporting Structures:</strong> Galvanized steel framework designed for harsh environments</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span><strong>Piping Systems:</strong> Integrated manifold and header designs for optimal flow distribution</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                    <h4 className="text-xl font-bold mb-3">Design Specifications</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-semibold">Operating Range</div>
                        <div className="opacity-90">-40°F to 150°F</div>
                      </div>
                      <div>
                        <div className="font-semibold">Pressure Rating</div>
                        <div className="opacity-90">Up to 600 PSI</div>
                      </div>
                      <div>
                        <div className="font-semibold">Capacity</div>
                        <div className="opacity-90">50-500 MMBTU/hr</div>
                      </div>
                      <div>
                        <div className="font-semibold">Applications</div>
                        <div className="opacity-90">LNG, Petrochemical</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Equipment Specifications Table */}
              <div className="mt-16">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Equipment Model Specifications</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-blue-600 text-white">
                          <th className="px-4 py-3 text-left font-semibold">Model Type</th>
                          <th className="px-4 py-3 text-left font-semibold">Draft</th>
                          <th className="px-4 py-3 text-left font-semibold">Drive</th>
                          <th className="px-4 py-3 text-left font-semibold">Fan Orientation</th>
                          <th className="px-4 py-3 text-left font-semibold">Standard Coating</th>
                          <th className="px-4 py-3 text-left font-semibold">Optional Coating</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-blue-50">
                          <td className="px-4 py-3 font-semibold text-blue-600">EH-S</td>
                          <td className="px-4 py-3">Forced</td>
                          <td className="px-4 py-3">Engine or Electric</td>
                          <td className="px-4 py-3">Vertical</td>
                          <td className="px-4 py-3">Paint</td>
                          <td className="px-4 py-3">Galvanize/Metalize</td>
                        </tr>
                        <tr className="hover:bg-blue-50">
                          <td className="px-4 py-3 font-semibold text-blue-600">F-M</td>
                          <td className="px-4 py-3">Forced</td>
                          <td className="px-4 py-3">Engine or Electric</td>
                          <td className="px-4 py-3">Vertical</td>
                          <td className="px-4 py-3">Paint</td>
                          <td className="px-4 py-3">Galvanize/Metalize</td>
                        </tr>
                        <tr className="hover:bg-blue-50">
                          <td className="px-4 py-3 font-semibold text-blue-600">Z-H</td>
                          <td className="px-4 py-3">Forced or Induced</td>
                          <td className="px-4 py-3">Electric</td>
                          <td className="px-4 py-3">Horizontal</td>
                          <td className="px-4 py-3">Galvanize/Metalize</td>
                          <td className="px-4 py-3">Paint</td>
                        </tr>
                        <tr className="hover:bg-blue-50">
                          <td className="px-4 py-3 font-semibold text-blue-600">VI-L</td>
                          <td className="px-4 py-3">Induced</td>
                          <td className="px-4 py-3">Engine or Electric</td>
                          <td className="px-4 py-3">Vertical</td>
                          <td className="px-4 py-3">Paint</td>
                          <td className="px-4 py-3">Galvanize/Metalize</td>
                        </tr>
                        <tr className="hover:bg-blue-50">
                          <td className="px-4 py-3 font-semibold text-blue-600">VV-V</td>
                          <td className="px-4 py-3">Forced or Induced</td>
                          <td className="px-4 py-3">Engine or Electric</td>
                          <td className="px-4 py-3">Vertical</td>
                          <td className="px-4 py-3">Paint</td>
                          <td className="px-4 py-3">Galvanize/Metalize</td>
                        </tr>
                        <tr className="hover:bg-blue-50">
                          <td className="px-4 py-3 font-semibold text-blue-600">H</td>
                          <td className="px-4 py-3">Forced or Induced</td>
                          <td className="px-4 py-3">Electric</td>
                          <td className="px-4 py-3">Horizontal</td>
                          <td className="px-4 py-3">Galvanize/Metalize</td>
                          <td className="px-4 py-3">Paint</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-gray-600 text-center">
                    Comprehensive model specifications for Chart Industries air-cooled heat exchanger systems
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

// Projects Section
function ProjectsSection({ currentProfile }: { currentProfile: string }) {
  const projects = projectData[currentProfile] || []
  
  const profileColors = {
    david: {
      gradient: 'from-blue-50 via-indigo-50 to-cyan-100',
      accent: 'blue-600',
      secondary: 'indigo-600'
    },
    wife: {
      gradient: 'from-emerald-50 via-teal-50 to-cyan-100', 
      accent: 'emerald-600',
      secondary: 'teal-600'
    }
  }

  const colors = profileColors[currentProfile as keyof typeof profileColors]

  return (
    <section className={`section-padding bg-gradient-to-br ${colors.gradient}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {currentProfile === 'david' 
              ? "Innovative mechanical design solutions that drive efficiency and deliver measurable results across industries."
              : "Quality-focused engineering projects that optimize processes and enhance manufacturing excellence."
            }
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Project Header */}
              <div className={`p-6 bg-gradient-to-r from-${colors.accent} to-${colors.secondary} text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold leading-tight">{project.title}</h3>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {project.timeline}
                  </span>
                </div>
                <p className="text-sm opacity-90 mb-3">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  {project.client && (
                    <span className="text-xs font-medium">
                      {project.client}
                    </span>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Impact Metrics */}
                <div className={`bg-${colors.accent}/5 rounded-lg p-4 mb-6`}>
                  <h4 className={`text-sm font-semibold text-${colors.accent} mb-2`}>
                    💡 Project Impact
                  </h4>
                  <p className="text-gray-800 font-medium">{project.impact}</p>
                </div>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    🎯 Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {project.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                        <CheckCircle className={`w-4 h-4 text-${colors.accent} mt-0.5 flex-shrink-0`} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Used */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    🔧 Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 bg-${colors.accent}/10 text-${colors.accent} text-xs rounded-full font-medium`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Effect Footer */}
              <div className={`px-6 pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <button className={`w-full py-2 bg-gradient-to-r from-${colors.accent} to-${colors.secondary} text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200`}>
                  View Project Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Discuss Your Next Project?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {currentProfile === 'david' 
                ? "Let's collaborate on innovative mechanical design solutions that drive efficiency and exceed expectations."
                : "I'm excited to bring my quality engineering expertise to your manufacturing and process improvement initiatives."
              }
            </p>
            <button className={`inline-flex items-center px-8 py-3 bg-gradient-to-r from-${colors.accent} to-${colors.secondary} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200`}>
              <MessageCircle className="w-5 h-5 mr-2" />
              Let's Connect
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main App Component with Router
function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [activeProfile, setActiveProfile] = useState('david')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'skills', 'contact']
      const scrollY = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveSection(sectionId)
  }

  return (
    <Router>
      <Routes>
        <Route path="/company/:companyId" element={<CompanyDetailPage />} />
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <PortfolioSwitcher activeProfile={activeProfile} setActiveProfile={setActiveProfile} />
            <Navigation 
              activeSection={activeSection} 
              setActiveSection={scrollToSection} 
              currentProfile={activeProfile} 
              downloadResume={downloadResume} 
            />
            
            <div id="about">
              <AboutSection currentProfile={activeProfile} downloadResume={downloadResume} />
            </div>
            
            <div id="experience">
              <ExperienceSection currentProfile={activeProfile} />
            </div>
            
            <div id="projects">
              <ProjectsSection currentProfile={activeProfile} />
            </div>
            
            <div id="skills">
              <SkillsSection currentProfile={activeProfile} />
            </div>
            
            <div id="contact">
              <ContactSection currentProfile={activeProfile} downloadResume={downloadResume} />
            </div>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App 