import Link from 'next/link';
import { FiTwitter, FiGithub, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t dark:border-gray-800 py-8 mt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <p className="text-gray-600 dark:text-gray-400">
              CryptoBrief.io provides real-time cryptocurrency news and analysis powered by AI.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/news" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">News</Link></li>
              <li><Link href="/prices" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Prices</Link></li>
              <li><Link href="/guides" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Guides</Link></li>
              <li><Link href="/tools" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Tools</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Disclaimer</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com/cryptobrief" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                <FiTwitter className="w-6 h-6" />
              </a>
              <a href="https://github.com/cryptobrief" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                <FiGithub className="w-6 h-6" />
              </a>
              <a href="mailto:contact@cryptobrief.io" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                <FiMail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} CryptoBrief.io. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}