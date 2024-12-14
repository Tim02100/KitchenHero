'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Footer from './footer';

export function ResponsiveFooter() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const isDashboard = pathname === '/dashboard';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isDashboard && isMobile) {
    return null;
  }

  return <Footer />;
}