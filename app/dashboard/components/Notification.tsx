import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'warning' | 'tip';
}

export default function Notification({ message, type }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white p-4 rounded-lg shadow-lg flex items-center justify-between`}>
      <span>{message}</span>
      <button onClick={() => setIsVisible(false)} className="ml-4 focus:outline-none">
        <X size={18} />
      </button>
    </div>
  );
}

