'use client'

import { useState, useEffect } from 'react'
import NotificationDropdown from './NotificationDropdown'

export default function TopNavigation() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Guten Morgen')
    else if (hour < 18) setGreeting('Guten Tag')
    else setGreeting('Guten Abend')
  }, [])

  return (
    <nav className="sticky top-0 z-10 glass-morphism h-16 flex items-center justify-center px-4 sm:px-6 border-b border-white/10">
      <div className="w-full max-w-4xl flex items-center justify-between">
        <div className="text-sm sm:text-lg font-semibold truncate mr-2 flex items-center">
          <span className="whitespace-nowrap">{greeting}</span>
          <span className="ml-1">Benutzer</span>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <NotificationDropdown />
          <div className="w-8 h-8 rounded-full bg-[#00BFA5] flex items-center justify-center">
            <span className="text-primary font-bold">B</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

