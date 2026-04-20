import { buildWhatsAppLink } from '../pages/siteConfig'
import { IconWhatsapp } from './Icons'

export function WhatsappFloatingButton() {
  return (
    <a
      href={buildWhatsAppLink('Olá! Gostaria de conversar sobre móveis planejados.')}
      target="_blank"
      rel="noreferrer"
      className={[
        'fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50',
        'inline-flex h-12 w-12 items-center justify-center rounded-full',
        'bg-[#25D366] text-white shadow-soft',
        'hover:bg-[#1fb85a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/30',
      ].join(' ')}
    >
      <IconWhatsapp className="h-5 w-5" />
      <span className="sr-only">Abrir WhatsApp</span>
    </a>
  )
}
