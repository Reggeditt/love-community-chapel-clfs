'use client'

import { motion } from 'framer-motion'
import { Music, Users, Radio, HandIcon as PrayingHands, Sparkles, Heart, Crown, BabyIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MinistriesAndFellowships() {
  const ministries = [
    {
      name: "Music Ministry",
      description: "Empowering the next generation",
      icon: Music
    },
    {
      name: "Ushering Ministry",
      description: "Empowering the next generation",
      icon: Users
    },
    {
      name: "Media & Technical Ministry",
      description: "Empowering the next generation",
      icon: Radio
    },
    {
      name: "Intercessors Ministry",
      description: "Empowering the next generation",
      icon: PrayingHands
    },
    {
      name: "Children Teachers Ministry",
      description: "Empowering the next generation",
      icon: Sparkles
    }
  ]

  const fellowships = [
    {
      name: "Youth fellowship (Timothy Generation)",
      description: "An example to the youth",
      icon: Users
    },
    {
      name: "Women's fellowship (women of destiny)",
      description: "We are moving forward",
      icon: Heart
    },
    {
      name: "Men's Fellowship (men of love)",
      description: "Arise and build",
      icon: Crown
    },
    {
      name: "Children's Ministry",
      description: "Children of love",
      icon: BabyIcon
    }
  ]

  return (
    <section id="ministries-and-fellowships" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Explore Our Ministries</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <ministry.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{ministry.name}</h3>
              <p className="text-gray-600">{ministry.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Meet the Fellowships</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {fellowships.map((fellowship, index) => (
            <motion.div
              key={fellowship.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <fellowship.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{fellowship.name}</h3>
              <p className="text-gray-600">{fellowship.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Discover More Ministries and Fellowships
          </Button>
        </div>
      </div>
    </section>
  )
}

