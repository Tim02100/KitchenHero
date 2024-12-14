'use client'

import React, { useEffect, useState, useRef } from 'react'
import { ArrowRight, BarChart2, Camera, ChevronRight, Clock, Leaf, ShoppingCart, Menu, X, Play, Command, Github, Twitter, Smartphone, Utensils, Award } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function UltraModernLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section)
    })

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    // Dynamic background animation
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
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = sectionsRef.current[sectionId]
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001A14] to-black text-white font-sans overflow-hidden">
      {/* Dynamic Background Animation */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      {/* Spotlight Effect */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 191, 165, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#001A14]/80 backdrop-blur-lg' : ''
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="#" className="text-2xl font-bold bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">
              KitchenHero
            </Link>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('features')} className={`hover:text-[#00BFA5] transition duration-300 ${activeSection === 'features' ? 'text-[#00BFA5]' : ''}`}>Features</button>
              <button onClick={() => scrollToSection('experience')} className={`hover:text-[#00BFA5] transition duration-300 ${activeSection === 'experience' ? 'text-[#00BFA5]' : ''}`}>Erlebnis</button>
              <button onClick={() => scrollToSection('pricing')} className={`hover:text-[#00BFA5] transition duration-300 ${activeSection === 'pricing' ? 'text-[#00BFA5]' : ''}`}>Preise</button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition duration-300">
                Anmelden
              </button>
              <button className="bg-gradient-to-r from-[#00796B] to-[#00BFA5] text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-[#00BFA5]/20 transition duration-300">
                Kostenlos testen
              </button>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#001A14]/95 backdrop-blur-lg flex flex-col items-center justify-center">
          <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
          <div className="flex flex-col items-center space-y-8">
            <button onClick={() => scrollToSection('features')} className="text-2xl hover:text-[#00BFA5] transition duration-300">Features</button>
            <button onClick={() => scrollToSection('experience')} className="text-2xl hover:text-[#00BFA5] transition duration-300">Erlebnis</button>
            <button onClick={() => scrollToSection('pricing')} className="text-2xl hover:text-[#00BFA5] transition duration-300">Preise</button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition duration-300">
              Anmelden
            </button>
            <button className="bg-gradient-to-r from-[#00796B] to-[#00BFA5] text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-[#00BFA5]/20 transition duration-300">
              Kostenlos testen
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" ref={(el) => (sectionsRef.current['hero'] = el)} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-reveal bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">
            Sei der Retter<br /> deiner Küche!
          </h1>
          <p className="text-xl md:text-3xl mb-12 animate-fadeInUp animation-delay-300 text-white/70">
          Smart kochen. Nachhaltig leben.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-600">
            <button className="premium-button group">
              <span className="relative z-10">Jetzt starten</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
            </button>
            <button className="bg-white/10 text-white font-bold py-3 px-8 rounded-full hover:bg-white/20 transition duration-300 flex items-center justify-center">
              <Play className="mr-2 h-5 w-5" />
              Demo ansehen
            </button>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/images/hero/app-preview.png"
            alt="KitchenHero App Preview"
            width={600}
            height={600}
            className="w-[80%] h-[80%] object-contain opacity-20 animate-float"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={(el) => (sectionsRef.current['features'] = el)} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">Unsere Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: BarChart2, title: 'KI-Rezeptvorschläge', description: 'Personalisierte Rezepte basierend auf deinen Vorlieben und Vorräten. Unser KI-Algorithmus lernt kontinuierlich dazu und verbessert seine Empfehlungen.' },
              { icon: Camera, title: 'Barcode-Scanner', description: 'Scanne Produkte für einfache Bestandsaufnahme und Nährwertinformationen. Automatische Erkennung von über 1 Million Produkten.' },
              { icon: ShoppingCart, title: 'Vorratsverwaltung', description: 'Behalte den Überblick über deine Lebensmittel und reduziere Verschwendung. Intelligente Erinnerungen für ablaufende Produkte.' },
              { icon: Clock, title: 'Ablaufdatum-Tracking', description: 'Werde rechtzeitig an ablaufende Lebensmittel erinnert. Integrierte Tipps zur Haltbarkeitsverlängerung und Resteverwertung.' },
              { icon: Smartphone, title: 'Einkaufslisten', description: 'Erstelle intelligente Einkaufslisten basierend auf deinen Rezepten und Vorräten. Automatische Sortierung nach Supermarkt-Layout.' },
              { icon: Leaf, title: 'Umwelt-Impact', description: 'Verfolge und reduziere deinen ökologischen Fußabdruck beim Kochen. Detaillierte Analysen und Tipps für nachhaltiges Kochen.' },
            ].map((feature, index) => (
              <div
                key={index}
                className="premium-card group"
              >
                <feature.icon className="w-16 h-16 mb-6 text-[#00BFA5] group-hover:text-white transition-colors duration-300" />
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00BFA5] transition-colors duration-300">{feature.title}</h3>
                <p className="text-white/70 group-hover:text-white transition-colors duration-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={(el) => (sectionsRef.current['experience'] = el)} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">Das KitchenHero Erlebnis</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-8">
              <h3 className="text-3xl font-bold">Entdecke die Zukunft des Kochens</h3>
              <p className="text-xl text-white/70">Mit KitchenHero wird jede Mahlzeit zu einem nachhaltigen Meisterwerk. Unsere KI-gesteuerte App führt dich durch den gesamten Prozess - von der Planung bis zum Teller.</p>
              <ul className="space-y-4">
                <li className="flex items-center text-lg">
                  <Utensils className="w-8 h-8 mr-4 text-[#00BFA5]" />
                  <span>Personalisierte Rezeptempfehlungen basierend auf deinem Geschmack und Ernährungszielen</span>
                </li>
                <li className="flex items-center text-lg">
                  <ShoppingCart className="w-8 h-8 mr-4 text-[#00BFA5]" />
                  <span>Intelligente Vorratsverwaltung mit automatischer Nachbestellung</span>
                </li>
                <li className="flex items-center text-lg">
                  <BarChart2 className="w-8 h-8 mr-4 text-[#00BFA5]" />
                  <span>Echtzeit-Nährwertanalyse und Fortschrittsverfolgung</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 relative">
              <Image
                src="/images/experience/app-showcase.png"
                alt="KitchenHero App Showcase"
                width={400}
                height={600}
                className="rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004D40] to-transparent opacity-70 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative overflow-hidden bg-[#001A14]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">Was unsere Nutzer sagen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Lisa M.', role: 'Hobbykoch', quote: 'KitchenHero hat meine Art zu kochen komplett verändert. Ich verschwende kaum noch Lebensmittel und entdecke jeden Tag neue, leckere Rezepte!' },
              { name: 'Thomas K.', role: 'Ernährungsberater', quote: 'Als Profi bin ich begeistert von der Genauigkeit der Nährwertanalysen. Eine unverzichtbare App für alle, die auf ihre Ernährung achten.' },
              { name: 'Sarah L.', role: 'Vielbeschäftigte Mutter', quote: 'Die Einkaufslisten und Meal-Prep-Funktionen sparen mir so viel Zeit. Endlich gesundes Essen für die ganze Familie ohne Stress!' },
            ].map((testimonial, index) => (
              <div key={index} className="premium-card">
                <p className="text-lg mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#00BFA5] rounded-full mr-4"></div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={(el) => (sectionsRef.current['pricing'] = el)} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">Wähle deinen Plan</h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
            {[
              {
                title: 'Kostenlos',
                price: '0€',
                features: ['Grundlegende Rezeptvorschläge', 'Einfache Vorratsverwaltung', 'Manuelle Einkaufsliste', 'Basis Nährwertanalyse'],
              },
              {
                title: 'Premium',
                price: '9,99€ / Monat',
                features: ['KI-gesteuerte Rezeptvorschläge', 'Erweiterte Vorratsverwaltung', 'Automatische Einkaufslisten', 'Detaillierte Ernährungsanalyse', 'Exklusive Rezepte', '24/7 Support', 'Personalisierte Meal-Pläne', 'Integration mit Fitness-Apps'],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`premium-card flex flex-col ${
                  index === 1 ? 'md:-mt-8 border-2 border-[#00BFA5]' : ''
                }`}
              >
                <h3 className="text-3xl font-bold mb-4">{plan.title}</h3>
                <p className="text-5xl font-bold mb-8">{plan.price}</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Leaf className="w-6 h-6 mr-3 text-[#00BFA5]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 px-6 rounded-full font-bold text-lg transition duration-300 ${
                    index === 1
                      ? 'premium-button'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {index === 0 ? 'Jetzt starten' : 'Premium wählen'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section id="auth" ref={(el) => (sectionsRef.current['auth'] = el)} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">Starte deine kulinarische Reise</h2>
          <div className="max-w-md mx-auto premium-card">
            <div className="flex justify-center mb-8">
              <button className="px-4 py-2 font-semibold text-white bg-[#00BFA5] rounded-l-full">Anmelden</button>
              <button className="px-4 py-2 font-semibold text-white bg-white/10 rounded-r-full">Registrieren</button>
            </div>
            <form className="space-y-6">
              <div className="relative">
                <input type="email" id="email" className="premium-input w-full pt-6 pb-2" placeholder=" " />
                <label htmlFor="email" className="absolute left-6 top-4 text-white/60 transition-all duration-300 pointer-events-none">
                  E-Mail-Adresse
                </label>
              </div>
              <div className="relative">
                <input type="password" id="password" className="premium-input w-full pt-6 pb-2" placeholder=" " />
                <label htmlFor="password" className="absolute left-6 top-4 text-white/60 transition-all duration-300 pointer-events-none">
                  Passwort
                </label>
              </div>
              <button type="submit" className="premium-button w-full">
                Anmelden
              </button>
            </form>
            <div className="mt-8 flex justify-center space-x-4">
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition duration-300">
                <Github className="w-6 h-6" />
              </button>
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition duration-300">
                <Twitter className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" ref={(el) => (sectionsRef.current['cta'] = el)} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">Bereit für deine kulinarische Revolution?</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/70">
            Tritt der KitchenHero-Community bei und entdecke, wie einfach nachhaltiges und smartes Kochen sein kann. Deine Küche wird es dir danken!
          </p>
          <button className="premium-button text-xl flex items-center justify-center mx-auto">
            Jetzt kostenlos starten
            <ArrowRight className="ml-2 h-6 w-6" />
          </button>
        </div>
      </section>

      {/* Command Menu */}
      <button
        className="fixed bottom-4 right-4 p-3 bg-white/10 rounded-full hover:bg-white/20 transition duration-300"
        aria-label="Open command menu"
      >
        <Command className="w-6 h-6" />
      </button>
    </div>
  )
}

