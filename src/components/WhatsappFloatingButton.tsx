import { motion } from 'framer-motion'
import { buildWhatsAppLink } from '../pages/siteConfig'
import { IconWhatsapp } from './Icons'

export function WhatsappFloatingButton() {
  return (
    <motion.a
      href={buildWhatsAppLink('Olá! Gostaria de conversar sobre móveis planejados.')}
      target="_blank"
      rel="noreferrer"
      className={[
        'fixed bottom-4 right-4 z-50',
        'inline-flex h-14 w-14 items-center justify-center rounded-full',
        'bg-[#25D366] text-white shadow-soft',
        'hover:bg-[#1fb85a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/30',
      ].join(' ')}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
    >
      <IconWhatsapp className="h-6 w-6" />
      <span className="sr-only">Abrir WhatsApp</span>
    </motion.a>
  )
}

