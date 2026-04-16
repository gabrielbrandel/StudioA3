import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from './Container'
import { Modal } from './Modal'
import { Reveal } from './Reveal'
import kitchen from '../assets/mock/room-kitchen.svg'
import living from '../assets/mock/room-living.svg'
import bedroom from '../assets/mock/room-bedroom.svg'
import closet from '../assets/mock/room-closet.svg'
import bathroom from '../assets/mock/room-bathroom.svg'
import office from '../assets/mock/room-office.svg'
import dining from '../assets/mock/room-dining.svg'
import hall from '../assets/mock/room-hall.svg'
import joinery from '../assets/mock/detail-joinery.svg'
import moodboard from '../assets/mock/moodboard.svg'

type PortfolioItem = {
  id: string
  title: string
  subtitle: string
  image: string
  details: string[]
}

export function PortfolioSection() {
  const reduce = useReducedMotion()
  const items = useMemo<PortfolioItem[]>(
    () => [
      {
        id: 'cozinha',
        title: 'Cozinha minimalista',
        subtitle: 'Apartamento novo • MDF + acabamentos clean',
        image: kitchen,
        details: ['Portas lisas', 'Aproveitamento vertical', 'Iluminação planejada'],
      },
      {
        id: 'closet',
        title: 'Closet sob medida',
        subtitle: 'Funcionalidade • organização diária',
        image: closet,
        details: ['Divisões inteligentes', 'Acabamento premium', 'Ferragens de qualidade'],
      },
      {
        id: 'sala',
        title: 'Sala integrada',
        subtitle: 'Painel + rack • visual leve e elegante',
        image: living,
        details: ['Painel ripado (mock)', 'Nichos e passagem de cabos', 'Proporções'],
      },
      {
        id: 'banheiro',
        title: 'Banheiro compacto',
        subtitle: 'Organização • fácil manutenção',
        image: bathroom,
        details: ['Marcenaria resistente', 'Espelho + armário', 'Aproveitamento do vão'],
      },
      {
        id: 'quarto',
        title: 'Quarto com cabeceira',
        subtitle: 'Conforto • linhas retas',
        image: bedroom,
        details: ['Iluminação indireta (mock)', 'Criados integrados', 'Acabamento suave'],
      },
      {
        id: 'homeoffice',
        title: 'Home office',
        subtitle: 'Ergonomia • foco e produtividade',
        image: office,
        details: ['Mesa sob medida', 'Armários superiores', 'Gestão de cabos'],
      },
      {
        id: 'jantar',
        title: 'Sala de jantar',
        subtitle: 'Mesa + aparador • elegância funcional',
        image: dining,
        details: ['Proporções', 'Iluminação', 'Texturas neutras'],
      },
      {
        id: 'hall',
        title: 'Hall / circulação',
        subtitle: 'Entrada com marcenaria integrada',
        image: hall,
        details: ['Aproveitamento de vãos', 'Espelho + armário', 'Acabamento contínuo'],
      },
      {
        id: 'marcenaria',
        title: 'Detalhes de marcenaria',
        subtitle: 'Emendas, fitas e ritmo visual',
        image: joinery,
        details: ['Padronização de frentes', 'Caimento de luz', 'Detalhes premium'],
      },
      {
        id: 'mood',
        title: 'Moodboard do projeto',
        subtitle: 'Materiais e referências',
        image: moodboard,
        details: ['Cinza + branco', 'Texturas', 'Hierarquia visual'],
      },
    ],
    [],
  )

  const [selected, setSelected] = useState<PortfolioItem | null>(null)

  return (
    <section id="portfolio" className="relative z-10 -mt-14 py-20 sm:-mt-20 sm:py-24">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-studio-600">PORTFÓLIO</p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-studio-950 sm:text-4xl">
            Um fluxo visual contínuo — do conceito ao detalhe
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-studio-700">
            Imagens fictícias (SVG) para você enxergar composição, ritmo e hierarquia. Depois é
            só substituir por fotos reais dos seus projetos.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <motion.button
              type="button"
              onClick={() => setSelected(items[0]!)}
              className="group relative w-full overflow-hidden text-left shadow-soft ring-1 ring-studio-300/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-900/20"
              style={{ borderRadius: '34px', clipPath: 'polygon(0 0, 100% 0, 100% 86%, 92% 100%, 0 100%)' }}
              whileHover={reduce ? undefined : { y: -4 }}
              whileTap={reduce ? undefined : { scale: 0.995 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[16/11] w-full bg-studio-900">
                <img
                  src={items[0]!.image}
                  alt={`Mock de ambiente: ${items[0]!.title}`}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-950/70 via-studio-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="text-lg font-semibold text-white">{items[0]!.title}</p>
                  <p className="mt-2 text-sm text-white/75">{items[0]!.subtitle}</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                    Clique para ampliar
                  </div>
                </div>
              </div>
            </motion.button>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-5">
            <div className="lg:pt-10">
              <p className="text-sm font-semibold text-studio-950">Seleção StudioA3</p>
              <p className="mt-3 text-base leading-relaxed text-studio-700">
                Um recorte “editorial” do portfólio: ambientes neutros, volumetria limpa e
                composição que guia o olhar — como um showroom em scroll.
              </p>
              <div className="mt-6 rounded-3xl bg-studio-200/25 p-6 shadow-soft ring-1 ring-studio-300/35 backdrop-blur">
                <p className="text-xs font-semibold tracking-[0.22em] text-studio-600">
                  DESTAQUE
                </p>
                <p className="mt-3 text-base font-semibold text-studio-950">{items[1]!.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-studio-700">{items[1]!.subtitle}</p>
                <button
                  type="button"
                  onClick={() => setSelected(items[1]!)}
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-studio-950 px-4 py-3 text-sm font-semibold text-white shadow-soft ring-1 ring-studio-300/25 transition hover:bg-studio-900"
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.slice(2).map((it, idx) => (
            <Reveal key={it.id} delay={0.05 + idx * 0.03}>
              <motion.button
                type="button"
                onClick={() => setSelected(it)}
                className="group relative w-full overflow-hidden text-left shadow-soft ring-1 ring-studio-300/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-900/20"
                style={{
                  borderRadius: '28px',
                  clipPath:
                    idx % 2 === 0
                      ? 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 12%)'
                      : 'polygon(0 0, 90% 0, 100% 12%, 100% 100%, 0 100%)',
                }}
                whileHover={reduce ? undefined : { y: -4 }}
                whileTap={reduce ? undefined : { scale: 0.99 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-[4/3] w-full bg-studio-900">
                  <img
                    src={it.image}
                    alt={`Mock de ambiente: ${it.title}`}
                    className="h-full w-full object-cover transition duration-600 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-studio-950/70 via-studio-950/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-sm font-semibold text-white">{it.title}</p>
                    <p className="mt-1 text-xs text-white/75">{it.subtitle}</p>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Modal
        open={Boolean(selected)}
        title={selected ? selected.title : 'Projeto'}
        onClose={() => setSelected(null)}
      >
        {selected ? (
          <div className="grid gap-5 md:grid-cols-[1.2fr_.8fr]">
            <div className="overflow-hidden rounded-2xl shadow-ring">
              <img
                src={selected.image}
                alt={`Mock de ambiente: ${selected.title}`}
                className="aspect-[16/11] w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-studio-900">{selected.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-studio-700">
                Espaço para descrever o projeto, materiais e decisões de design. Perfeito
                para aumentar confiança e gerar conversão.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-studio-700">
                {selected.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-studio-900/40" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  )
}

