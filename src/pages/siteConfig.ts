export const SITE = {
  name: 'StudioA3',
  whatsappNumber: '554488419062',
  instagramUrl: 'https://www.instagram.com/_studioa3/',
  phoneDisplay: '+55 (44) 8841-9062',
  city: 'Brasil',
} as const

export function buildWhatsAppLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

