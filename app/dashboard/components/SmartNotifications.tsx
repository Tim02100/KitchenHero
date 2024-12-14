'use client'

import { useState } from 'react'
import { Bell, X } from 'lucide-react'

export default function SmartNotifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'urgent', message: 'Tomaten laufen in 2 Tagen ab!', timestamp: '5 Minuten' },
    { id: 2, type: 'important', message: '90% des Monatsbudgets verbraucht', timestamp: '1 Stunde' },
    { id: 3, type: 'normal', message: 'Neue Rezeptempfehlung: Sommersalat', timestamp: '3 Stunden' },
    { id: 4, type: 'info', message: 'Tipp: Planen Sie Ihre Mahlzeiten für nächste Woche', timestamp: '1 Tag' },
  ])

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-error'
      case 'important': return 'bg-warning'
      case 'normal': return 'bg-info'
      case 'info': return 'bg-success'
      default: return 'bg-white/10'
    }
  }

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Bell className="mr-2" /> Benachrichtigungen
      </h2>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li key={notification.id} className={`${getTypeColor(notification.type)} p-3 rounded-md relative`}>
            <p>{notification.message}</p>
            <p className="text-sm text-white/60">vor {notification.timestamp}</p>
            <button 
              className="absolute top-2 right-2 text-white/60 hover:text-white"
              onClick={() => removeNotification(notification.id)}
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
      {notifications.length === 0 && (
        <p className="text-center text-white/60">Keine neuen Benachrichtigungen</p>
      )}
    </div>
  )
}

