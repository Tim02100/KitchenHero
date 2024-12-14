import './globals.css';
import { Inter } from 'next/font/google';
import Header from './header';
import Footer from './footer';
import { ResponsiveFooter } from './ResponsiveFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'KitchenHero',
  description: 'Reduzieren Sie Lebensmittelverschwendung und entdecken Sie kreative Rezepte!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <Header />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <ResponsiveFooter />
      </body>
    </html>
  );
}