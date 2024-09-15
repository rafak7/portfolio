import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const tabs = [
  { value: "projects", label: "Projetos" },
  { value: "skills", label: "Habilidades" },
  { value: "experience", label: "Experiência" },
  { value: "education", label: "Educação" },
  { value: "certifications", label: "Certificações" }
]

export function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-2">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-gray-800 p-4 z-50"
          >
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabClick(tab.value)}
                className={`block w-full text-left py-2 px-4 ${
                  activeTab === tab.value ? 'bg-purple-600 text-white' : 'text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
