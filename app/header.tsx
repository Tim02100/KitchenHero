'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Landing Page' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/pantry', label: 'Vorratsschrank' },
    { href: '/recipes', label: 'Rezepte' },
    { href: '/about', label: 'Über uns' },
  ];

  return (
    <header className="fixed top-4 right-4 z-[9999]">
      <nav>
        <div>
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white hover:text-[#00BFA5] p-2 bg-black/50 backdrop-blur-md rounded-full"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-lg rounded-lg shadow-lg w-64 overflow-hidden">
            <div className="py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 text-white hover:text-[#00BFA5] hover:bg-white/5 transition-colors duration-300
                    ${pathname === item.href ? 'text-[#00BFA5] bg-white/10' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}