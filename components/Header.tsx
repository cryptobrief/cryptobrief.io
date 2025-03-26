'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiSearch } from 'react-icons/fi';

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            CryptoBrief<span className="text-blue-400">.io</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/news" className="hover:text-blue-600 transition-colors">News</Link>
            <Link href="/prices" className="hover:text-blue-600 transition-colors">Prices</Link>
            <Link href="/guides" className="hover:text-blue-600 transition-colors">Guides</Link>
            <Link href="/tools" className="hover:text-blue-600 transition-colors">Tools</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <FiSearch className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}