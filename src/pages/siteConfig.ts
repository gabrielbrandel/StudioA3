export const SITE = {
  name: 'StudioA3',
  whatsappNumber: '5511999999999',
  instagramUrl: 'https://instagram.com/studioa3',
  phoneDisplay: '(11) 99999-9999',
  city: 'Brasil',
} as const

export function buildWhatsAppLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

