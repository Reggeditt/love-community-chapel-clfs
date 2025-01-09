'use client'

import { motion } from 'framer-motion'
import { DotIcon as Dove } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 text-primary mb-6">
            <Dove className="w-5 h-5" />
            <span className="text-xl font-semibold">About Us</span>
          </div>
          
          <h2 className="text-3xl font-bold mb-6">
            Canaan Land Faith Sanctuary
          </h2>
          
          <p className="text-gray-600 mb-8">
            At Canaan Land Faith Sanctuary, we are more than just a church — we are a family 
            passionately pursuing God's heart. Rooted in faith and built on love, our mission 
            is to transform lives, raise leaders, and bring hope to communities.
          </p>
          
          <p className="text-xl italic text-primary mb-8">
            "His banner over us is love" isn't just our motto – it's our testimony.
          </p>
          
          <Button variant="outline" size="lg">
            Learn About Our Vision
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

