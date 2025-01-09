'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Events() {
  return (
    <section id="events" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 text-primary mb-6">
            <Calendar className="w-5 h-5" />
            <span className="text-xl font-semibold">Upcoming Events</span>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            21 Days Prayer and Fasting
          </h2>
          
          <p className="text-gray-600 mb-6">
            "Enforcing our redemptive rights by the finished work on the cross"
          </p>
          
          <p className="text-xl mb-8">
            Join us for a riveting time of waiting on God!
          </p>
          
          <p className="text-xl font-semibold mb-8">
            January 6 – January 26
          </p>
          
          <Button size="lg">
            See Full Event Schedule
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

