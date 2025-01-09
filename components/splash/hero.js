'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen pt-20 flex items-center">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Bell className="w-4 h-4" />
            <span>Welcome to Love Community Chapel; CanaanLand Faith Sanctuary</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Where mission is our passion and worship is our life
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            His banner over us is love
          </p>
          
          <p className="text-gray-600 mb-8">
            Join us for spirit-filled services, life-changing teachings, and a community rooted in love.
          </p>
          
          <Button size="lg" className="animate-bounce">
            Plan Your Visit
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

