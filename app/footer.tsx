'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Twitter, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const pathname = usePathname();
  
  // Farbzuordnung basierend auf dem Pfad
  const getGradientColor = () => {
    switch (pathname) {
      case '/':
        return 'bg-black'; // Landing Page endet mit Schwarz
      case '/recipes':
        return 'bg-primary'; // Rezepte-Seite verwendet primary color
      case '/pantry':
        return 'bg-black'; // Vorratskammer endet mit Schwarz
      case '/about':
        return 'bg-black'; // About-Seite verwendet das dunklere Teal
      default:
        return 'bg-black'; // Standardfarbe für alle anderen Seiten
    }
  };

  return (
    <footer className={`${getGradientColor()} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding Section */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent mb-4">
              KitchenHero
            </h3>
            <p className="text-sm text-white/70">
              Smart kochen. Nachhaltig leben.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="https://github.com" className="text-white/70 hover:text-[#00BFA5] transition-colors duration-300">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-white/70 hover:text-[#00BFA5] transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="mailto:info@kitchenhero.com" className="text-white/70 hover:text-[#00BFA5] transition-colors duration-300">
                <Mail className="h-5 w-5" />
              </Link>
              <Link href="https://kitchenhero.com" className="text-white/70 hover:text-[#00BFA5] transition-colors duration-300">
                <Globe className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">Links</h4>
            <ul className="space-y-2">
              {['Über uns', 'Features', 'Preise', 'Blog'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-sm text-white/70 hover:text-[#00BFA5] transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              {['Datenschutz', 'AGB', 'Impressum', 'Cookie-Richtlinien'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-sm text-white/70 hover:text-[#00BFA5] transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-white/70 mb-4">
              Bleib auf dem Laufenden mit unseren neuesten Updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Deine E-Mail"
                className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#00BFA5] transition-colors duration-300"
              />
              <button
                type="submit"
                className="bg-[#00BFA5] hover:bg-[#00A37A] text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
              >
                Abonnieren
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/70">
              &copy; {new Date().getFullYear()} KitchenHero. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                href="#" 
                className="text-sm text-white/70 hover:text-[#00BFA5] transition-colors duration-300"
              >
                Hilfe & Support
              </Link>
              <Link 
                href="#" 
                className="text-sm text-white/70 hover:text-[#00BFA5] transition-colors duration-300"
              >
                FAQ
              </Link>
              <Link 
                href="#" 
                className="text-sm text-white/70 hover:text-[#00BFA5] transition-colors duration-300"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;