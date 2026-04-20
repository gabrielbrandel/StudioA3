import { useMemo, useState } from 'react'
import { Container } from './Container'
import { MotionSection } from './MotionSection'
import { Reveal } from './Reveal'
import {
  PORTFOLIO_BANHEIRO_RUSTICO_IMAGE,
  PORTFOLIO_CLOSET_IMAGE,
  PORTFOLIO_COZINHA_COMPACTA_IMAGE,
  PORTFOLIO_COZINHA_ILHA_IMAGE,
  PORTFOLIO_COZINHA_MINIMALISTA_IMAGE,
  PORTFOLIO_HOME_OFFICE_IMAGE,
  PORTFOLIO_HOME_THEATER_RUSTICO_IMAGE,
  PORTFOLIO_LIVING_PAINEL_TV_IMAGE,
  PORTFOLIO_QUARTO_ADOLESCENTE_IMAGE,
  PORTFOLIO_QUARTO_CABECEIRA_IMAGE,
  PORTFOLIO_QUARTO_INFANTIL_IMAGE,
  PORTFOLIO_SALA_JANTAR_IMAGE,
  PORTFOLIO_SHOWROOM_HIDRICA_IMAGE,
} from '../data/studioMedia'

type PortfolioCategory =
  | 'cozinha'
  | 'salas'
  | 'quartos'
  | 'closet'
  | 'banheiro'
  | 'escritorio'
  | 'comercial'

type PortfolioTabId = 'todos' | PortfolioCategory

const PORTFOLIO_TABS: { id: PortfolioTabId; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'cozinha', label: 'Cozinha' },
  { id: 'salas', label: 'Salas' },
  { id: 'quartos', label: 'Quartos' },
  { id: 'closet', label: 'Closet' },
  { id: 'banheiro', label: 'Banheiro' },
  { id: 'escritorio', label: 'Escritório' },
  { id: 'comercial', label: 'Comercial' },
]

type PortfolioItem = {
  id: string
  category: PortfolioCategory
  title: string
  subtitle: string
  image: string
  imageAlt?: string
  details: string[]
}

function portfolioImageAlt(it: PortfolioItem) {
  return it.imageAlt ?? `Referência visual: ${it.title}`
}

const cardBase =
  'group relative block w-full overflow-hidden bg-neutral-900 text-left'

export function PortfolioSection() {
  const [tab, setTab] = useState<PortfolioTabId>('todos')

  const items = useMemo<PortfolioItem[]>(
    () => [
      {
        id: 'cozinha-minimalista',
        category: 'cozinha',
        title: 'Cozinha minimalista',
        subtitle: 'Apartamento novo • MDF + acabamentos clean',
        image: PORTFOLIO_COZINHA_MINIMALISTA_IMAGE,
        imageAlt:
          'Cozinha linear clara com armários baixos, bancada clara, cooktop, exaustor em inox e iluminação embutida no teto.',
        details: ['Portas lisas', 'Aproveitamento vertical', 'Iluminação embutida'],
      },
      {
        id: 'cozinha-ilha',
        category: 'cozinha',
        title: 'Cozinha com ilha',
        subtitle: 'Ilha gourmet • arandelas esfera e bancada em granito',
        image: PORTFOLIO_COZINHA_ILHA_IMAGE,
        imageAlt:
          'Cozinha com ilha, cooktop e cuba embutida, bancada em granito bege, arandelas circulares na parede e ponto de iluminação pendente.',
        details: ['Ilha para cocção e convívio', 'Arandelas decorativas', 'Bancada em granito'],
      },
      {
        id: 'cozinha-compacta',
        category: 'cozinha',
        title: 'Cozinha compacta',
        subtitle: 'Eletros embutidos • ritmo clean em poucos metros',
        image: PORTFOLIO_COZINHA_COMPACTA_IMAGE,
        imageAlt:
          'Cozinha compacta com armários superiores brancos, gabinetes inferiores em azul fosco, torre com forno e micro-ondas embutidos e backsplash em pastilhas claras.',
        details: ['Torre com forno + micro-ondas', 'Gaveteiros sob medida', 'Backsplash clean'],
      },
      {
        id: 'sala-jantar',
        category: 'salas',
        title: 'Sala de jantar',
        subtitle: 'Integrada com o living • iluminação decorativa',
        image: PORTFOLIO_SALA_JANTAR_IMAGE,
        imageAlt:
          'Sala de jantar integrada ao living, mesa oval em madeira com base metálica, cadeiras estofadas claras e pendentes circulares dourados com LED.',
        details: ['Mesa oval em madeira', 'Pendentes circulares em LED', 'Integração com o living'],
      },
      {
        id: 'living-painel-tv',
        category: 'salas',
        title: 'Painel & home (moderno)',
        subtitle: 'Painel com ripado lateral, mármore e LED embutida',
        image: PORTFOLIO_LIVING_PAINEL_TV_IMAGE,
        imageAlt:
          'Painel de TV em tons claros com ripado lateral, placa em mármore, iluminação em LED por trás do painel, rack suspenso e tapete tipo couro.',
        details: ['Painel iluminado em LED', 'Ripado em madeira clara', 'Rack suspenso'],
      },
      {
        id: 'home-theater-rustico',
        category: 'salas',
        title: 'Painel de TV com Estilo Industrial',
        subtitle: 'Tijolo, madeira e iluminação quente — ambiente country',
        image: PORTFOLIO_HOME_THEATER_RUSTICO_IMAGE,
        imageAlt:
          'Sala de TV com parede em tijolos rústicos, rack suspenso em madeira, lustre em roda de carroça com lâmpadas filamento e prateleiras em metal preto.',
        details: ['Parede em tijolos', 'Rack em madeira escura', 'Lustre em roda de carroça'],
      },
      {
        id: 'quarto-cabeceira',
        category: 'quartos',
        title: 'Quarto com cabeceira',
        subtitle: 'Cabeceira estofada • painel ripado e luz quente',
        image: PORTFOLIO_QUARTO_CABECEIRA_IMAGE,
        imageAlt:
          'Quarto com cabeceira estofada em cinza em painéis, parede superior em ripado de madeira clara, arandelas verticais e criado-mudo baixo.',
        details: ['Cabeceira integrada ao painel', 'Iluminação de parede', 'Criado-mudo sob medida'],
      },
      {
        id: 'quarto-infantil',
        category: 'quartos',
        title: 'Quarto infantil temático',
        subtitle: 'Beliche no estilo “celeiro” para quarto tema fazenda',
        image: PORTFOLIO_QUARTO_INFANTIL_IMAGE,
        imageAlt:
          'Quarto infantil com beliche em forma de casa/celeiro, papel de parede xadrez azul, almofadas decorativas tema faroeste e roupa de cama azul-marinho.',
        details: ['Beliche temático', 'Guarda-corpo em madeira', 'Decor personalizado'],
      },
      {
        id: 'quarto-adolescente',
        category: 'quartos',
        title: 'Quarto adolescente',
        subtitle: 'Cabeceira ripada • penteadeira integrada com LED',
        image: PORTFOLIO_QUARTO_ADOLESCENTE_IMAGE,
        imageAlt:
          'Quarto em tons rosa claro com painel ripado bege, cabeceira estofada, penteadeira com espelho iluminado e nichos com LED sobre a bancada.',
        details: ['Penteadeira com espelho LED', 'Nichos iluminados', 'Paleta suave e acolhedora'],
      },
      {
        id: 'closet',
        category: 'closet',
        title: 'Closet sob medida',
        subtitle: 'Portas de vidro • divisões abertas e puffs integrados',
        image: PORTFOLIO_CLOSET_IMAGE,
        imageAlt:
          'Closet estreito com portas de vidro nas duas laterais, interior iluminado, puffs de palhinha no centro, penteadeira com cadeira estofada e passagem central.',
        details: ['Portas em vidro com perfil', 'Interior iluminado', 'Penteadeira integrada'],
      },
      {
        id: 'home-office',
        category: 'escritorio',
        title: 'Escritório com Nichos Iluminados',
        subtitle: 'Estante com nichos em LED e bancada sob medida',
        image: PORTFOLIO_HOME_OFFICE_IMAGE,
        imageAlt:
          'Escritório com Nichos Iluminados em tons cinza com estante de nichos assimétricos e iluminação em LED, portas lisas e mesa com tampo em madeira clara.',
        details: ['Nichos com LED', 'Portas lisas', 'Bancada em madeira clara'],
      },
      {
        id: 'banheiro-rustico',
        category: 'banheiro',
        title: 'Banheiro rústico',
        subtitle: 'Madeira, pedra natural e metais quentes',
        image: PORTFOLIO_BANHEIRO_RUSTICO_IMAGE,
        imageAlt:
          'Lavabo com painéis em madeira ripada, espelho com moldura em madeira, lavatório em pedra cinza e torneira dourada.',
        details: ['Marcenaria com ripado vertical', 'Bancada e cuba em pedra', 'Iluminação quente'],
      },
      {
        id: 'showroom-hidrica',
        category: 'comercial',
        title: 'Showroom comercial — Hídrica',
        subtitle: 'Ambientes de exposição para marca parceira',
        image: PORTFOLIO_SHOWROOM_HIDRICA_IMAGE,
        imageAlt:
          'Recepção de showroom com pendente em LED curvo, logotipo aplicado na parede, balcão com tampo em mármore e mesa curva para atendimento.',
        details: ['Projeto comercial completo', 'Mobiliário sob medida', 'Iluminação arquitetural'],
      },
    ],
    [],
  )

  const visibleItems = useMemo(
    () => (tab === 'todos' ? items : items.filter((it) => it.category === tab)),
    [items, tab],
  )

  const tabsScrollClass =
    'flex w-full min-w-0 max-w-full gap-2 overflow-x-auto overscroll-x-contain scroll-smooth pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory'

  return (
    <MotionSection
      id="portfolio"
      className="relative z-10 scroll-mt-24 overflow-x-hidden bg-black py-16 text-white sm:scroll-mt-28 sm:py-20 md:py-28"
    >
      <Container className="max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-white/80 sm:text-sm">
              Portfólio
            </h2>
            <p className="mt-5 font-display text-3xl tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
              Projetos selecionados
            </p>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              Cozinhas, quartos, living, closets e ambientes comerciais — uma seleção do nosso
              trabalho.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div
            className="mx-auto mt-10 max-w-4xl"
            role="tablist"
            aria-label="Filtrar projetos por ambiente"
          >
            <div className={tabsScrollClass}>
              {PORTFOLIO_TABS.map((t) => {
                const selected = tab === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    id={`portfolio-tab-${t.id}`}
                    onClick={() => setTab(t.id)}
                    className={[
                      'shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors',
                      selected
                        ? 'bg-white text-studio-950 shadow-sm ring-1 ring-white/40'
                        : 'bg-white/10 text-white/85 ring-1 ring-white/15 hover:bg-white/15',
                    ].join(' ')}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        <div
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5"
          role="tabpanel"
          aria-labelledby={`portfolio-tab-${tab}`}
        >
          {visibleItems.map((it, idx) => (
            <Reveal key={it.id} delay={0.04 + (idx % 4) * 0.04}>
              <article
                className={[cardBase, 'transition-transform duration-200 motion-safe:hover:scale-[1.01]'].join(' ')}
              >
                <div className="relative aspect-[3/4] w-full sm:aspect-[3/4]">
                  <img
                    src={it.image}
                    alt={portfolioImageAlt(it)}
                    className="img-hover-zoom absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end p-5 sm:p-6">
                    <p className="min-w-0 text-left text-sm font-semibold uppercase tracking-[0.08em] text-white sm:text-base">
                      {it.title}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </MotionSection>
  )
}
