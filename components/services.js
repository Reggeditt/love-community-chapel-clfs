'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ServiceTimes() {
  const services = [
    {
      day: "Sunday Service",
      time: "8:30 AM",
      name: "Seeker Service",
      emoji: "🎉"
    },
    {
      day: "Wednesday service",
      time: "6:00 PM",
      name: "Word Encounter",
      emoji: "📖"
    },
    {
      day: "Friday Service",
      time: "7:00 PM",
      name: "Miracle Service",
      emoji: "🙏"
    }
  ]

  return (
    <section className="py-20" id='services'>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary mb-6">
              <Calendar className="w-5 h-5" />
              <span className="text-xl font-semibold">Join Us This Week!</span>
            </div>
          </div>

          <div className="grid gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-6 bg-white rounded-lg shadow-sm"
              >
                <div>
                  <h3 className="font-semibold">{service.day}</h3>
                  <p className="text-gray-600">{service.time} – {service.name} {service.emoji}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-gray-600 mb-6">
              <MapPin className="w-5 h-5" />
              <span>Patasi Estate, near Mt. Olives Presbyterian Church</span>
            </div>
            
            <div>
              <Button size="lg">
                Get Directions
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

