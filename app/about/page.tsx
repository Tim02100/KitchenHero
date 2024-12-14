'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LinkedinIcon, TwitterIcon, Instagram, Mail, ArrowDown, Calendar, Users, Target, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function EnhancedAboutPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState({
    mission: false,
    story: false,
    founders: false,
    vision: false
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      const sections = ['mission', 'story', 'founders', 'vision']
      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom >= 0
          setIsVisible(prev => ({ ...prev, [section]: isVisible }))
        }
      })
    }

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    let animationFrameId: number

    if (canvas && ctx) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = []
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25
        })
      }

      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'rgba(0, 191, 165, 0.1)'
        particles.forEach((particle) => {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()

          particle.x += particle.speedX
          particle.y += particle.speedY

          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
        })
        animationFrameId = requestAnimationFrame(drawParticles)
      }

      drawParticles()
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#004D40] to-black relative overflow-hidden">
      
      {/* Animated Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      {/* Spotlight Effect */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 191, 165, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent"
        >
          Unsere Vision
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-white/80 max-w-3xl mb-12"
        >
          Von einer Studentenküche zur Revolution der nachhaltigen Ernährung
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-10 animate-bounce"
        >
          <ArrowDown className="w-8 h-8 text-[#00BFA5]" />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={isVisible.mission ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">
              Unsere Mission
            </h2>
            <p className="text-xl text-white/80 mb-12">
              KitchenHero entstand aus einer einfachen Idee: Die Art und Weise, wie wir mit Lebensmitteln umgehen, 
              nachhaltig zu verändern. Was in einer kleinen Studentenküche begann, entwickelte sich zu einer 
              Vision für eine bessere Zukunft.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Calendar, title: "Gegründet 2024", description: "Start einer nachhaltigen Revolution" },
                { icon: Users, title: "Wachsende Community", description: "Tausende aktive Nutzer" },
                { icon: Target, title: "Unser Ziel", description: "50% weniger Lebensmittelverschwendung" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.mission ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.2 }}
                  className="premium-card p-6"
                >
                  <item.icon className="w-12 h-12 text-[#00BFA5] mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="founders" className="py-24 relative bg-gradient-to-b from-transparent to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={isVisible.founders ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">
              Die Gründer
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Lernen Sie die Menschen kennen, die KitchenHero zu dem machen, was es heute ist.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {[
              {
                name: "Tim Heck",
                role: "CEO & Founder",
                description: "Als BWL-Student entdeckte Tim die Problematik der Lebensmittelverschwendung in seiner Küche. Seine Vision einer technologiegestützten Lösung wurde zur Grundlage von KitchenHero.",
                image: "/images/CEO/CEO.jpg",
                links: {
                  linkedin: "#",
                  twitter: "#",
                  email: "tim@kitchenhero.com"
                }
              },
              {
                name: "Vivien Bast",
                role: "Kreativer Kopf",
                description: "Vivien verbindet als Zahnmedizinstudentin ihr Wissen über gesunde Ernährung mit innovativen Ideen.",
                image: "/images/Buu/Buu.jpg",
                links: {
                  linkedin: "#",
                  twitter: "#",
                  email: "vivien@kitchenhero.com"
                }
              }
            ].map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible.founders ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.3 }}
                className="premium-card p-8 group hover:bg-white/5 transition-all duration-500"
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-8 w-64 h-64">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#00BFA5]/20 to-transparent rounded-full animate-pulse" />
                    <div className="absolute inset-2 bg-gradient-to-tr from-[#004D40] to-[#00BFA5]/20 rounded-full" />
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={1200}
                      height={1200}
                      quality={100}
                      priority={true}
                      className="rounded-full object-cover w-full h-full p-2 transform transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="eager"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">
                      {founder.name}
                    </h3>
                    <p className="text-[#00BFA5] mb-4 font-medium">{founder.role}</p>
                    <p className="text-white/80 mb-8 leading-relaxed">{founder.description}</p>
                    
                    <div className="flex justify-center space-x-6">
                      {Object.entries(founder.links).map(([platform, link], i) => (
                        <Link
                          key={platform}
                          href={link}
                          className="text-white/60 hover:text-[#00BFA5] transition-all duration-300 hover:scale-110 transform"
                        >
                          {platform === 'linkedin' && <LinkedinIcon className="w-6 h-6" />}
                          {platform === 'twitter' && <TwitterIcon className="w-6 h-6" />}
                          {platform === 'email' && <Mail className="w-6 h-6" />}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-24 relative bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={isVisible.vision ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">
              Unsere Vision für die Zukunft
            </h2>
            <div className="premium-card p-8">
              <Sparkles className="w-16 h-16 text-[#00BFA5] mb-6 mx-auto" />
              <p className="text-xl text-white/80 mb-8">
                Wir glauben an eine Welt, in der keine wertvollen Lebensmittel verschwendet werden. 
                Mit KitchenHero entwickeln wir innovative Lösungen, die Menschen dabei helfen, 
                nachhaltiger und bewusster mit Lebensmitteln umzugehen.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="premium-button"
              >
                Werde Teil unserer Mission
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}