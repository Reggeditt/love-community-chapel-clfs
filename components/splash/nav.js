'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            LCC
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="hover:text-primary">About</Link>
            <Link href="#services" className="hover:text-primary">Services</Link>
            <Link href="#ministries-and-fellowships" className="hover:text-primary">Ministries & Fellowships</Link>
            <Link href="#events" className="hover:text-primary">Events</Link>
            <Button><Link href={'/login'}>Sign in</Link></Button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="#about" className="block px-3 py-2 hover:bg-gray-50 rounded-md">
              About
            </Link>
            <Link href="#services" className="block px-3 py-2 hover:bg-gray-50 rounded-md">
              Services
            </Link>
            <Link href="#ministries-and-fellowships" className="block px-3 py-2 hover:bg-gray-50 rounded-md">
              Ministries & Fellowships
            </Link>
            <Link href="#events" className="block px-3 py-2 hover:bg-gray-50 rounded-md">
              Events
            </Link>
            <div className="px-3 py-2">
              <Button className="w-full"><Link href={'/dashboard'}>Sign in</Link></Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

