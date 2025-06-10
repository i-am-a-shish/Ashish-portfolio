"use client"

import React, { JSX } from "react"


import { useState, useEffect, useRef, useCallback } from "react"
import {
  Sun,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Users,
  ExternalLink,
  Code,
  Briefcase,
  GraduationCap,
  Brain,
  Trophy,
  Target,
  Rocket,
  Phone,
  Bell,
  Menu,
  X,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

// Define types for props and state
interface ContactFormState {
  name: string
  email: string
  message: string
}

interface TechStackItem {
  name: string
  icon: string
  category: string
}

interface CodingProfile {
  platform: string
  username: string
  stats: string
  rating: string
  icon: string | JSX.Element
  link: string
  color: string
}


interface Project {
  title: string
  description: string
  tech: string[]
  images: string[]
  github: string
  live: string
  period: string
  impact: string
}

interface Achievement {
  title: string
  description: string
  icon: string
  type: string
  image: string
}

interface Experience {
  title: string
  company: string
  duration: string
  location: string
  description: string
  type: string
}

interface AnimatedStats {
  projects: number
  hackathons: number
  problems: number
  events: number
}

// Error Boundary Component
const ErrorFallback = ({ error }: { error: Error }) => {
  console.error("Error Boundary caught an error:", error)
  return (
    <div className="fixed inset-0 bg-black text-white flex items-center justify-center z-50">
      <div>
        <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
        <p className="text-gray-400">
          There was an error loading the portfolio. Please try again later or contact me directly.
        </p>
        <p className="text-red-500 mt-4">
          Error details: <code>{error.message}</code>
        </p>
      </div>
    </div>
  )
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (e: ErrorEvent) => {
      setHasError(true)
      setError(e.error instanceof Error ? e.error : new Error("Unknown error"))
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError && error) {
    return <ErrorFallback error={error} />
  }

  return <>{children}</>
}

const AnimatedStatCard: React.FC<{
  from: string
  to: string
  border: string
  animatedStats: number
  statName: string
  icon: string
}> = ({ from, to, border, animatedStats, statName, icon }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const duration = 1000 // total animation time in ms
    const steps = 50
    const increment = animatedStats / steps
    const delay = duration / steps

    const interval = setInterval(() => {
      current += increment
      if (current >= animatedStats) {
        setCount(animatedStats)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, delay)

    return () => clearInterval(interval)
  }, [animatedStats])

  return (
    <Card className={`bg-gradient-to-br ${from} ${to} ${border} text-center hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300`}>
      <CardContent className="p-6">
        <div className="text-4xl font-bold text-red-400 mb-2">{count}+</div>
        <p className="text-gray-400">{statName}</p>
        <div className="text-2xl mt-2">{icon}</div>
      </CardContent>
    </Card>
  )
}


const TechStackButton: React.FC<{ tech: TechStackItem }> = React.memo(({ tech }) => {
  return (
    <Button
  variant="outline"
  className="h-auto p-4 rounded-2xl 
    bg-gradient-to-tr from-black via-red-800/30 to-blue-900/20 
    border border-red-700/30 text-red-200 
    hover:from-red-800 hover:via-red-600 hover:to-blue-800 
    hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 
    hover:scale-105 transition-all duration-300"
>



      <div className="flex flex-col items-center space-y-2">
        <span className="text-3xl text-red-300">{tech.icon}</span>
        <span className="font-semibold text-base text-white">{tech.name}</span>
        <Badge className="bg-black/50 text-red-300 border-red-400/40 text-xs">{tech.category}</Badge>
      </div>
    </Button>
  )
})



const CodingProfileCard: React.FC<{ profile: CodingProfile }> = React.memo(({ profile }) => {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-red-900/20 border border-red-500/30 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-2">
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-3">{profile.icon}</div>
        <h3 className="text-lg font-bold text-white mb-2">{profile.platform}</h3>
        <p className="text-red-400 font-medium mb-1">{profile.stats}</p>
        <p className="text-gray-400 text-sm mb-4">Rating: {profile.rating}</p>
        <a
          href={profile.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-6 py-3 rounded-full border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all duration-300 flex items-center justify-center font-medium"
          aria-label={`View ${profile.platform} Profile`}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          View Profile
        </a>
      </CardContent>
    </Card>
  )
})

const ProjectCard: React.FC<{ project: Project }> = React.memo(({ project }) => {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-red-900/20 border border-red-500/30 hover:border-red-400/50 overflow-hidden hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300">
      <CardContent className="p-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <Badge className="bg-red-600/80 text-white">{project.period}</Badge>
            </div>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
            <div className="mb-4">
              <Badge className="bg-green-900/30 text-green-400 border-green-500/30">{project.impact}</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, techIndex) => (
                <Badge key={techIndex} className="bg-red-900/30 text-red-400 border-red-500/30 hover:bg-red-800/40">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  try {
                    window.open(project.github, "_blank")
                  } catch (error) {
                    console.error("Error opening GitHub link:", error)
                    alert("Failed to open GitHub link. Please try again later.")
                  }
                }}
                className="px-6 py-3 rounded-full border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all duration-300 flex items-center font-medium"
                aria-label={`View ${project.title} code on GitHub`}
              >
                <Github className="w-4 h-4 mr-2" />
                View Code
              </button>
              {project.live !== "#" && (
                <button
                  onClick={() => {
                    try {
                      window.open(project.live, "_blank")
                    } catch (error) {
                      console.error("Error opening live demo link:", error)
                      alert("Failed to open live demo link. Please try again later.")
                    }
                  }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 flex items-center font-medium shadow-lg shadow-red-500/25"
                  aria-label={`View live demo of ${project.title}`}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
  {project.images.map((image, imgIndex) => (
    <div
      key={imgIndex}
      className="relative aspect-square w-full overflow-hidden rounded-lg border border-red-500/20 hover:border-red-400/40 transition-colors duration-300"
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={`${project.title} screenshot ${imgIndex + 1}`}
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={imgIndex === 0} // optional
      />
    </div>
  ))}
</div>



        </div>
      </CardContent>
    </Card>
  )
})

const ExperienceCard: React.FC<{ exp: Experience }> = React.memo(({ exp }) => {
  return (
    <Card className="bg-gradient-to-r from-gray-900 to-red-900/20 border border-red-500/30 hover:border-red-400/50 hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-red-500" />
              {exp.title}
            </h3>
            <p className="text-red-400 font-medium">{exp.company}</p>
            <p className="text-gray-500 text-sm">{exp.location}</p>
          </div>
          <div className="mt-2 lg:mt-0 flex flex-col items-start lg:items-end space-y-2">
            <Badge className="bg-red-900/30 text-red-400 border-red-500/30">{exp.duration}</Badge>
            <Badge
              className={
                exp.type === "Leadership"
                  ? "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
                  : "bg-blue-900/30 text-blue-400 border-blue-500/30"
              }
            >
              {exp.type}
            </Badge>
          </div>
        </div>
        <p className="text-gray-300">{exp.description}</p>
      </CardContent>
    </Card>
  )
})

const AchievementCard: React.FC<{ achievement: Achievement }> = React.memo(({ achievement }) => {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-red-900/20 border border-red-500/30 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      <div className="relative">
        <Image
          src={achievement.image || "/placeholder.svg"}
          alt={achievement.title}
          width={200}
          height={150}
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=200&width=150"
          }}
        />
        <div className="absolute top-4 right-4">
          <Badge
            className={`${
              achievement.type === "National"
                ? "bg-yellow-900/80 text-yellow-300 border-yellow-500/50"
                : achievement.type === "Regional"
                  ? "bg-blue-900/80 text-blue-300 border-blue-500/50"
                  : "bg-purple-900/80 text-purple-300 border-purple-500/50"
            }`}
          >
            {achievement.type}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-4">{achievement.icon}</div>
        <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
        <p className="text-gray-400 text-sm">{achievement.description}</p>
      </CardContent>
    </Card>
  )
})

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true)
  const [visitorCount, setVisitorCount] = useState(1247)
  const [currentTime, setCurrentTime] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [typedText, setTypedText] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

 

useEffect(() => {
  setIsMounted(true)

  const timer = setInterval(() => {
    const now = new Date()
    setCurrentTime(
      now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    )
  }, 1000)

  const visitorTimer = setInterval(() => {
    setVisitorCount((prev) => prev + Math.floor(Math.random() * 3))
  }, 30000)

  return () => {
    clearInterval(timer)
    clearInterval(visitorTimer)
  }
}, [])


  // Fixed animatedStats object
  const animatedStats: AnimatedStats = {
    projects: 12,
    hackathons: 3,
    problems: 500,
    events: 17,
  }

  const [titleTypingIndex, setTitleTypingIndex] = useState(0)
  const [currentTitleText, setCurrentTitleText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)


  const fullText = "|| अंतः अस्ति प्रारंभः || "
  const titles = ["MERN Stack Developer", "Problem Solver", "Flutter Developer", "Full Stack Specialist"]
  const statsRef = useRef<HTMLElement>(null)

  const [contactForm, setContactForm] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    // Quick scary boarding screen
    let currentIndex = 0
    const typingTimer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingTimer)
        // Quick transition - only 1 second
        setTimeout(() => setLoading(false), 1000)
      }
    }, 80) // Faster typing

    // Update time every second
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      )
    }, 1000)

    // Simulate visitor count increment
    const visitorTimer = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 30000)

    return () => {
      clearInterval(typingTimer)
      clearInterval(timer)
      clearInterval(visitorTimer)
    }
  }, [])

  // Title typing effect
useEffect(() => {
  const currentTitle = titles[currentTitleIndex]

  let timer: NodeJS.Timeout

  if (isDeleting) {
    if (titleTypingIndex > 0) {
      timer = setTimeout(() => {
        setCurrentTitleText(currentTitle.slice(0, titleTypingIndex - 1))
        setTitleTypingIndex((prev) => prev - 1)
      }, 50)
    } else {
      setIsDeleting(false)
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
    }
  } else {
    if (titleTypingIndex < currentTitle.length) {
      timer = setTimeout(() => {
        setCurrentTitleText(currentTitle.slice(0, titleTypingIndex + 1))
        setTitleTypingIndex((prev) => prev + 1)
      }, 100)
    } else {
      timer = setTimeout(() => {
        setIsDeleting(true)
      }, 1500) // Wait before deleting
    }
  }

  return () => clearTimeout(timer)
}, [titleTypingIndex, isDeleting, currentTitleIndex])


  // Scroll-triggered stats animation - FIXED VERSION
  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }, [darkMode])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }, [])

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About Me", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Achievements", id: "achievements" },
    { name: "Blog", id: "blog" },
    { name: "Contact", id: "contact" },
  ]

  const techStack: TechStackItem[] = [
    { name: "C++", icon: "💻", category: "Language" },
    { name: "Python", icon: "🐍", category: "Language" },
    { name: "JavaScript", icon: "⚡", category: "Language" },
    { name: "Dart", icon: "🎯", category: "Language" },
    { name: "C", icon: "⚙️", category: "Language" },
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "Next.js", icon: "🔺", category: "Frontend" },
    { name: "Flutter", icon: "📱", category: "Frontend" },
    { name: "HTML/CSS", icon: "🌐", category: "Frontend" },
    { name: "Node.js", icon: "🟢", category: "Backend" },
    { name: "Express", icon: "🚀", category: "Backend" },
    { name: "Firebase", icon: "🔥", category: "Backend" },
    { name: "MongoDB", icon: "🍃", category: "Database" },
    { name: "PostgreSQL", icon: "🐘", category: "Database" },
    { name: "MySQL", icon: "🗄️", category: "Database" },
    { name: "Docker", icon: "🐳", category: "Tool" },
    { name: "GitHub", icon: "🐙", category: "Tool" },
    { name: "VS Code", icon: "💙", category: "Tool" },
    { name: "Linux", icon: "🐧", category: "Tool" },
    { name: "Unity", icon: "🎮", category: "Tool" },
  ]

 const codingProfiles: CodingProfile[] = [
  {
    platform: "LeetCode",
    username: "simplyashish10",
    stats: "100+ Problems Solved",
    rating: "1456+",
    icon: (
      <img
        src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-color-tal-revivo.png"
        alt="LeetCode Logo"
        className="w-8 h-8 mx-auto"
      />
    ),
    link: "https://leetcode.com/u/simplyashish10/",
    color: "from-yellow-600 to-orange-600",
  },
  {
    platform: "CodeChef",
    username: "ashish_1030",
    stats: "3⭐ Coder",
    rating: "1428+",
    icon: (
      <img
        src="https://img.icons8.com/color/48/codechef.png"
        alt="CodeChef Logo"
        className="w-8 h-8 mx-auto"
      />
    ),
    link: "https://www.codechef.com/users/simplyashish10",
    color: "from-brown-600 to-yellow-600",
  },
  {
    platform: "HackerRank",
    username: "simplyashish10",
    stats: "5⭐ Coder ",
    rating: "1200+",
    icon: (
      <img
        src="https://img.icons8.com/windows/32/hackerrank.png"
        alt="HackerRank Logo"
        className="w-8 h-8 mx-auto"
      />
    ),
    link: "https://www.hackerrank.com/ashish_suryawan3",
    color: "from-blue-600 to-purple-600",
  },
]



  const projects: Project[] = [
    {
      title: "Sahakar",
      description:
        "Centralized inter-departmental cooperation platform reducing project delays by 30% with GIS-based geo-tagging for real-time tracking of 100+ urban development projects.",
      tech: ["React", "Node.js", "Python", "GIS", "LLM"],
      images: [
        "sih2.png",
        "sih1.png",
        "sih3.png",
        "sih4.png",
      ],
      github: "https://github.com/i-am-a-shish/sahakar",
      live: "#",
      period: "Aug 2024 - Dec 2024",
      impact: "30% reduction in project delays",
    },
    {
      title: "SwiftShop",
      description:
        "Offline shopping enhancement app with 1,000+ products, smart booking system for trial rooms, and real-time notifications via WebSockets.",
      tech: ["MERN Stack", "Socket.io", "WebSockets"],
      images: [
        "swift1.png",
        "swift2.png",
        "swift1.png",
        "swift3.png",
      ],
      github: "https://github.com/i-am-a-shish/swiftshop",
      live: "https://swiftshop-demo.com",
      period: "May 2024 - Jun 2024",
      impact: "40% reduction in wait times",
    },
    {
      title: "EVACON",
      description:
        "Real-time EV charging station app with QR code generation, Google Maps navigation, and support for 100+ charging stations.",
      tech: ["Flutter", "Firebase", "Maps API"],
      images: [
        "ev1.png",
        "ev2.png",
        "ev3.png",
        "ev4.png",
      ],
      github: "https://github.com/i-am-a-shish/evacon",
      live: "#",
      period: "Jan 2024 - Feb 2024",
      impact: "30% faster booking time",
    },
  ]

  const achievements: Achievement[] = [
    {
      title: "Smart India Hackathon Winner 2024",
      description: "National winner among 500+ teams for innovative inter-departmental platform",
      icon: "🏆",
      type: "National",
      image: "sih.png",
    },
    {
      title: "PICT INC Techfest - 2nd Place",
      description: "Secured 2nd place among 200+ teams for EV-mobile app solution",
      icon: "🥈",
      type: "Regional",
      image: "swift2.png",
    },
    {
      title: "ACM Outstanding Chapter Award 2025",
      description: "Honored for leadership and impactful contributions to computing community",
      icon: "⭐",
      type: "Leadership",
      image: "acm.png",
    },
  ]

  const experiences: Experience[] = [
    {
      title: "Treasurer",
      company: "PCCOE ACM Student Chapter",
      duration: "Sept 2024 - Present",
      location: "PCCOE, Pune",
      description:
        "Pioneered streamlined registration process for Codigo and Hacktopia, achieving 98% satisfaction rate among participating teams and responded to 100+ pre-event queries.",
      type: "Leadership",
    },
    {
      title: "Flutter Developer",
      company: "MyPero",
      duration: "June 2024 - Present",
      location: "Remote",
      description:
        "Engineered key features for cross-platform dogcare app using Flutter and Firebase, enhancing user experience and functionality.",
      type: "Development",
    },
  ]

  const handleResumeDownload = useCallback(() => {
    try {
      // Convert Google Drive view link to direct download link
      const fileId = "1HQ-lj-niE93IBsGWGQe9o6S_7znnmGY_"
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`

      // Create a temporary link and trigger download
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = "Ashish_Suryawanshi_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading resume:", error)
      alert("Failed to download resume. Please try again later.")
    }
  }, [])

  const handleContactSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      try {
        if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
          alert("Please fill in all fields")
          return
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(contactForm.email)) {
          alert("Please enter a valid email address")
          return
        }

        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${contactForm.name}`)
        const body = encodeURIComponent(
          `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`,
        )
        const mailtoLink = `mailto:simplyashish1030@gmail.com?subject=${subject}&body=${body}`

        // Open email client
        window.location.href = mailtoLink

        // Reset form
        setContactForm({ name: "", email: "", message: "" })
        alert("Email client opened! Thank you for your message.")
      } catch (error) {
        console.error("Error submitting form:", error)
        alert("There was an error. Please try again or contact me directly.")
      }
    },
    [contactForm],
  )

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
        {/* Simple animated background without lines */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-400/5 rounded-full blur-2xl animate-ping"></div>
        </div>

        <div className="text-center z-10 relative">
          <h1 className="text-5xl md:text-7xl font-bold text-red-500 font-mono tracking-wider animate-pulse">
  {typedText}
</h1> 

        </div>
      </div>
    )
  }

  try {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}


return (
  <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/90 border-b border-red-900/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="font-bold text-xl bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
          SimplyAshish10
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm font-medium"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* ✅ Hydration fix applied below */}
          {isMounted && (
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="w-4 h-4 text-red-500" />
              <span>{currentTime} IST</span>
            </div>
          )}

          {isMounted && (
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
              <Users className="w-4 h-4 text-red-500" />
              <span>{visitorCount.toLocaleString()}</span>
            </div>
          )}

          <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="rounded-full hover:bg-red-900/20">
            <Sun className="w-4 h-4 text-red-500" />
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-full hover:bg-red-900/20"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-red-500" /> : <Menu className="w-4 h-4 text-red-500" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-red-900/30 bg-black/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-red-900/20 rounded-md transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </nav>
)


        {/* Hero Section */}
        <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-red-900/5"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

          <div className="max-w-7xl mx-auto relative z-10 h-full">
            <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div
                    className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-500/30 text-red-400 text-sm font-medium cursor-pointer hover:bg-gradient-to-r hover:from-red-800/40 hover:to-red-700/40 transition-all duration-300"
                    onClick={() => scrollToSection("contact")}
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                    Available for opportunities
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    Hi, I'm{" "}
                    <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
                      Ashish
                    </span>
                  </h1>
                  <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl text-gray-300 font-medium min-h-[2.5rem] transition-all duration-500">
                      {currentTitleText}
                      <span className="animate-ping text-red-400">|</span>
                    </h2>
                    <div className="flex items-center space-x-2">
                      <Code className="w-5 h-5 text-red-500" />
                      <span className="text-xl text-red-400 font-medium">MERN Stack Specialist</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-5 h-5 text-red-500" />
                      <span className="text-lg text-gray-400">B.Tech CSE • CGPA: 8.04</span>
                    </div>
                  </div>
                  <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                    🏆 <span className="text-red-400 font-semibold">SIH 2024 Winner</span> passionate about creating
                    scalable web applications and solving complex problems. Currently serving as{" "}
                    <span className="text-red-400 font-semibold">ACM Treasurer</span> at PCCOE.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={handleResumeDownload}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-105"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Resume
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      try {
                        window.open("https://linkedin.com/in/i-am-a-shish", "_blank")
                      } catch (error) {
                        console.error("Error opening LinkedIn link:", error)
                        alert("Failed to open LinkedIn link. Please try again later.")
                      }
                    }}
                    className="px-8 py-3 rounded-full text-lg font-medium border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all duration-300"
                    aria-label="Connect on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    Let's Connect
                  </Button>
                </div>
                <div className="flex space-x-6">
                  <a
                    href="https://github.com/i-am-a-shish"
                    className="text-gray-400 hover:text-red-400 transition-colors transform hover:scale-110 duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-7 h-7" />
                  </a>
                  <a
                    href="tel:+918421860639"
                    className="text-gray-400 hover:text-red-400 transition-colors transform hover:scale-110 duration-300"
                    aria-label="Call me"
                  >
                    <Phone className="w-7 h-7" />
                  </a>
                </div>
              </div>

              {/* Right Half - Profile Image */}
              <div className="relative flex items-center justify-center lg:justify-end h-full">
                {/* Enhanced glowing effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full blur-3xl transform scale-75 animate-pulse"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-red-500/30 rounded-full blur-xl animate-bounce"></div>
                <div
                  className="absolute -bottom-10 -left-10 w-16 h-16 bg-red-600/30 rounded-full blur-xl animate-bounce"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Image container with proper positioning */}
                <div className="relative z-10 w-full h-full flex items-center justify-center lg:justify-end">
                  <div className="relative w-full max-w-lg aspect-square -translate-y-24 lg:-translate-y-30">
                    <Image
                      src="images/ashish-formal-photo.png"
                      alt="Ashish Suryawanshi"
                      width={600}
                      height={600}
                      className="object-contain drop-shadow-2xl"
                      priority
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=500&width=500"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Me - Simplified */}
        <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900/5 to-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-gray-900/80 to-red-900/20 p-8 rounded-2xl border border-red-500/20">
                <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center">
                  <Brain className="w-6 h-6 mr-3" />
                  Who I Am
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                 I'm Ashish Suryawanshi, a passionate technologist and builder driven by curiosity and impact. Currently pursuing B.Tech in Computer Science, I believe in solving real-world problems with code and creativity.

                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-red-900/20 to-gray-900/80 p-6 rounded-2xl border border-red-500/20">
                  <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    What I've Achieved
                  </h3>
                  <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-2">
  <li><strong>Winner – Smart India Hackathon (2024)</strong>: National triumph among 500+ teams for building an impactful civic-tech platform.</li>
  <li><strong>2nd Place – PICT INC Hackathon</strong>: EV-tech innovator with a focus on sustainable mobility.</li>
  <li><strong>ACM Outstanding Chapter Award (2025)</strong>: Recognized for leadership and contributions to the computing community.</li>
  <li><strong>Leadership @ ACM PCCOE</strong>: Treasurer, event organizer & community builder.</li>
</ul>

                </div>
                <div className="bg-gradient-to-r from-gray-900/80 to-red-900/20 p-6 rounded-2xl border border-red-500/20">
                  <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    What Drives Me
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    I’m driven by the desire to turn ideas into scalable products, blending technology, design, and user experience. Constantly learning, relentlessly improving, and always looking for the next big challenge to grow.<br></br><br></br>
Let’s connect and build something meaningful together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats Section with Hardcoded Values */}
        <section ref={statsRef} className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Quick Stats
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatedStatCard
                from="from-gray-900"
                to="to-red-900/20"
                border="border border-red-500/30"
                animatedStats={animatedStats.projects}
                statName="Projects Built"
                icon="🚀"
              />
              <AnimatedStatCard
                from="from-red-900/20"
                to="to-gray-900"
                border="border border-red-500/30"
                animatedStats={animatedStats.hackathons}
                statName="Hackathons Won"
                icon="🏆"
              />
              <AnimatedStatCard
                from="from-gray-900"
                to="to-red-900/20"
                border="border border-red-500/30"
                animatedStats={animatedStats.problems}
                statName="Problems Solved"
                icon="💻"
              />
              <AnimatedStatCard
                from="from-red-900/20"
                to="to-gray-900"
                border="border border-red-500/30"
                animatedStats={animatedStats.events}
                statName="Events Managed"
                icon="🎯"
              />
            </div>
          </div>
        </section>

        {/* Tech Stack with Proper Colors */}
        <section id="tech" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900/5 to-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Technical Arsenal
            </h2>

            {/* Tech Stack as Button Grid with Proper Colors */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {techStack.map((tech, index) => (
                <TechStackButton key={index} tech={tech} />
              ))}
            </div>
          </div>
        </section>

        {/* Coding Profiles Section with Custom Button Styles */}
        <section id="coding" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Coding Profiles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {codingProfiles.map((profile, index) => (
                <CodingProfileCard key={index} profile={profile} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects with 4 Images Each */}
        <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900/5 to-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="space-y-12">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <ExperienceCard key={index} exp={exp} />
              ))}
            </div>
          </div>
        </section>

        {/* Achievements with Images */}
        <section id="achievements" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900/5 to-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Achievements & Recognition
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <AchievementCard key={index} achievement={achievement} />
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Blog & Insights
            </h2>

            <div className="text-center space-y-8">
              <div className="max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-gray-900/80 to-red-900/20 border border-red-500/30 rounded-2xl p-8">
                  <div className="space-y-6">
                    <div className="text-6xl">📝</div>
                    <h3 className="text-2xl font-bold text-white">Coming Soon!</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      I'm working on bringing you insightful content about web development, programming tutorials, tech
                      insights, and my journey as a developer. Stay tuned for exciting articles covering:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-gradient-to-r from-red-900/30 to-gray-900/50 p-4 rounded-xl border border-red-500/20">
                        <h4 className="text-red-400 font-semibold mb-2">🚀 Development Tips</h4>
                        <p className="text-gray-400 text-sm">
                          Best practices, coding techniques, and productivity hacks
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-gray-900/50 to-red-900/30 p-4 rounded-xl border border-red-500/20">
                        <h4 className="text-red-400 font-semibold mb-2">🛠️ Project Breakdowns</h4>
                        <p className="text-gray-400 text-sm">Deep dives into my projects and technical decisions</p>
                      </div>
                      <div className="bg-gradient-to-r from-red-900/30 to-gray-900/50 p-4 rounded-xl border border-red-500/20">
                        <h4 className="text-red-400 font-semibold mb-2">📚 Learning Journey</h4>
                        <p className="text-gray-400 text-sm">My experiences with new technologies and frameworks</p>
                      </div>
                      <div className="bg-gradient-to-r from-gray-900/50 to-red-900/30 p-4 rounded-xl border border-red-500/20">
                        <h4 className="text-red-400 font-semibold mb-2">🎯 Career Insights</h4>
                        <p className="text-gray-400 text-sm">Tips for students and aspiring developers</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
  variant="outline"
  onClick={() => scrollToSection("newsletter")}
  className="px-8 py-3 rounded-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all duration-300"
>
  <Bell className="w-4 h-4 mr-2" />
  Stay Tuned
</Button>

                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup Placeholder */}
             {/* Newsletter Signup Working Form */}
<div className="max-w-md mx-auto" id="newsletter">
  <Card className="bg-gradient-to-br from-gray-900 to-red-900/20 border border-red-500/30">
    <CardContent className="p-6">
      <h4 className="text-lg font-bold text-white mb-4">Get Notified</h4>
      <p className="text-gray-400 text-sm mb-4">Be the first to know when I publish new content!</p>
      <form
        action="https://formsubmit.co/ashishsuryawanshi774@gmail.com"
        method="POST"
        className="space-y-2"
      >
        <input type="hidden" name="_captcha" value="false" />
        <input
          type="hidden"
          name="_next"
          value="https://www.linkedin.com/in/i-am-a-shish/  "
        />
        <Input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="bg-gray-800/50 border-red-500/30 text-white placeholder-gray-400 focus:border-red-400"
        />
        <button
  onClick={() => alert("✅ You’ll be notified soon!")}
  className="mt-6 px-6 py-3 bg-gradient-to-tr from-black via-red-900 to-blue-900 text-white rounded-full shadow-md hover:from-red-700 hover:to-blue-800 hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 font-semibold tracking-wide"
>
  🔔 Notify Me
</button>

      </form>
    </CardContent>
  </Card>
</div>

            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-900/5 to-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Let's build something amazing!</h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm always excited to take on new challenges and collaborate on innovative projects. Whether you have
                  a project in mind or just want to connect, I'd love to hear from you!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-red-500" />
                    <span className="text-white">simplyashish1030@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-red-500" />
                    <span className="text-white">+91-8421860639</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10" asChild>
                    <a
                      href="https://github.com/i-am-a-shish"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10" asChild>
                    <a
                      href="https://linkedin.com/in/i-am-a-shish"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
              <Card className="bg-gradient-to-br from-gray-900 to-red-900/20 border border-red-500/30 shadow-xl shadow-red-500/10">
                <CardContent className="p-6">
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-gray-800/50 border-red-500/30 text-white placeholder-gray-400 focus:border-red-400"
                        required
                        aria-label="Your Name"
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="bg-gray-800/50 border-red-500/30 text-white placeholder-gray-400 focus:border-red-400"
                        required
                        aria-label="Your Email"
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        className="bg-gray-800/50 border-red-500/30 text-white placeholder-gray-400 focus:border-red-400"
                        required
                        aria-label="Your Message"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 flex items-center justify-center font-medium shadow-lg shadow-red-500/25"
                      aria-label="Send Message"
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Send Message
                    </button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Location with Google Maps */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              My Location
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-gray-900 to-red-900/20 border border-red-500/30">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Current Location
                    </h3>
                    <div className="space-y-2">
                      <p className="text-white font-medium">Pune, Maharashtra, India</p>
                      <p className="text-gray-400 text-sm">Available for remote work worldwide</p>
                      <p className="text-gray-400 text-sm">Open to relocation for the right opportunity</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-red-900/20 to-gray-900 border border-red-500/30">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-red-400 mb-4">Work Preferences</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Remote Work</span>
                        <span className="text-green-400">✓ Available</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">On-site (Pune)</span>
                        <span className="text-green-400">✓ Available</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Relocation</span>
                        <span className="text-yellow-400">✓ Open to discuss</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-900 to-red-900/20 border border-red-500/30 rounded-2xl p-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242118.18174302243!2d73.69815095!3d18.52461405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                    title="Pune Map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-red-900/30">
          <div className="max-w-6xl mx-auto text-center space-y-2">
            <p className="text-gray-400">© 2024 Ashish Suryawanshi. Built with ❤️ using Next.js and Tailwind CSS.</p>
            <p className="text-red-400 text-sm font-medium">|| अंतः अस्ति प्रारंभः ||</p>
          </div>
        </footer>
      </div>
    )
  } catch (error) {
    console.error("Error in main component:", error)
    return (
      <div className="fixed inset-0 bg-black text-white flex items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
          <p className="text-gray-400">
            There was an error loading the portfolio. Please try again later or contact me directly.
          </p>
        </div>
      </div>
    )
  }
}
