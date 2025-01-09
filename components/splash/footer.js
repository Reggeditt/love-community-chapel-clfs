import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(+233) 555-123-456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@lovechapel.org</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Patasi Estate, Kumasi</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="#ministries-and-fellowships" className="hover:text-primary transition-colors">Ministries & Fellowships</Link></li>
              <li><Link href="#events" className="hover:text-primary transition-colors">Events</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Youtube className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Stay updated with our latest news and events.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Love Community Chapel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

