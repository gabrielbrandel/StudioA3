import { useMemo, useState } from 'react'
import { AutoCarousel } from './AutoCarousel'
import { Container } from './Container'
import { MotionSection } from './MotionSection'
import { Modal } from './Modal'
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

type PortfolioItem = {
  id: string
  title: string
  subtitle: string
  image: string
  imageAlt?: string
  details: string[]
}

function portfolioImageAlt(it: PortfolioItem) {
  return it.imageAlt ?? `Referência visual: ${it.title}`
}

const portfolioCardMotion =
  'transition-[transform,box-shadow] duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02] motion-safe:hover:shadow-[0_18px_36px_-20px_rgba(37,34,32,0.2)] active:scale-[0.99]'

export function PortfolioSection() {
  const items = useMemo<PortfolioItem[]>(
    () => [
      {
        id: 'cozinha-minimalista',
        title: 'Cozinha minimalista',
        subtitle: 'Apartamento novo • MDF + acabamentos clean',
        image: PORTFOLIO_COZINHA_MINIMALISTA_IMAGE,
        imageAlt:
          'Cozinha linear clara com armários baixos, bancada clara, cooktop, exaustor em inox e iluminação embutida no teto.',
        details: ['Portas lisas', 'Aproveitamento vertical', 'Iluminação embutida'],
      },
      {
        id: 'cozinha-ilha',
        title: 'Cozinha com ilha',
        subtitle: 'Ilha gourmet • arandelas esfera e bancada em granito',
        image: PORTFOLIO_COZINHA_ILHA_IMAGE,
        imageAlt:
          'Cozinha com ilha, cooktop e cuba embutida, bancada em granito bege, arandelas circulares na parede e ponto de iluminação pendente.',
        details: ['Ilha para cocção e convívio', 'Arandelas decorativas', 'Bancada em granito'],
      },
      {
        id: 'cozinha-compacta',
        title: 'Cozinha compacta',
        subtitle: 'Eletros embutidos • ritmo clean em poucos metros',
        image: PORTFOLIO_COZINHA_COMPACTA_IMAGE,
        imageAlt:
          'Cozinha compacta com armários superiores brancos, gabinetes inferiores em azul fosco, torre com forno e micro-ondas embutidos e backsplash em pastilhas claras.',
        details: ['Torre com forno + micro-ondas', 'Gaveteiros sob medida', 'Backsplash clean'],
      },
      {
        id: 'sala-jantar',
        title: 'Sala de jantar',
        subtitle: 'Integrada com o living • iluminação decorativa',
        image: PORTFOLIO_SALA_JANTAR_IMAGE,
        imageAlt:
          'Sala de jantar integrada ao living, mesa oval em madeira com base metálica, cadeiras estofadas claras e pendentes circulares dourados com LED.',
        details: ['Mesa oval em madeira', 'Pendentes circulares em LED', 'Integração com o living'],
      },
      {
        id: 'living-painel-tv',
        title: 'Painel & home (moderno)',
        subtitle: 'Painel com ripado lateral, mármore e LED embutida',
        image: PORTFOLIO_LIVING_PAINEL_TV_IMAGE,
        imageAlt:
          'Painel de TV em tons claros com ripado lateral, placa em mármore, iluminação em LED por trás do painel, rack suspenso e tapete tipo couro.',
        details: ['Painel iluminado em LED', 'Ripado em madeira clara', 'Rack suspenso'],
      },
      {
        id: 'home-theater-rustico',
        title: 'Painel de TV com Estilo Industrial',
        subtitle: 'Tijolo, madeira e iluminação quente — ambiente country',
        image: PORTFOLIO_HOME_THEATER_RUSTICO_IMAGE,
        imageAlt:
          'Sala de TV com parede em tijolos rústicos, rack suspenso em madeira, lustre em roda de carroça com lâmpadas filamento e prateleiras em metal preto.',
        details: ['Parede em tijolos', 'Rack em madeira escura', 'Lustre em roda de carroça'],
      },
      {
        id: 'quarto-cabeceira',
        title: 'Quarto com cabeceira',
        subtitle: 'Cabeceira estofada • painel ripado e luz quente',
        image: PORTFOLIO_QUARTO_CABECEIRA_IMAGE,
        imageAlt:
          'Quarto com cabeceira estofada em cinza em painéis, parede superior em ripado de madeira clara, arandelas verticais e criado-mudo baixo.',
        details: ['Cabeceira integrada ao painel', 'Iluminação de parede', 'Criado-mudo sob medida'],
      },
      {
        id: 'quarto-infantil',
        title: 'Quarto infantil temático',
        subtitle: 'Beliche no estilo “celeiro” para quarto tema fazenda',
        image: PORTFOLIO_QUARTO_INFANTIL_IMAGE,
        imageAlt:
          'Quarto infantil com beliche em forma de casa/celeiro, papel de parede xadrez azul, almofadas decorativas tema faroeste e roupa de cama azul-marinho.',
        details: ['Beliche temático', 'Guarda-corpo em madeira', 'Decor personalizado'],
      },
      {
        id: 'quarto-adolescente',
        title: 'Quarto adolescente',
        subtitle: 'Cabeceira ripada • penteadeira integrada com LED',
        image: PORTFOLIO_QUARTO_ADOLESCENTE_IMAGE,
        imageAlt:
          'Quarto em tons rosa claro com painel ripado bege, cabeceira estofada, penteadeira com espelho iluminado e nichos com LED sobre a bancada.',
        details: ['Penteadeira com espelho LED', 'Nichos iluminados', 'Paleta suave e acolhedora'],
      },
      {
        id: 'closet',
        title: 'Closet sob medida',
        subtitle: 'Portas de vidro • divisões abertas e puffs integrados',
        image: PORTFOLIO_CLOSET_IMAGE,
        imageAlt:
          'Closet estreito com portas de vidro nas duas laterais, interior iluminado, puffs de palhinha no centro, penteadeira com cadeira estofada e passagem central.',
        details: ['Portas em vidro com perfil', 'Interior iluminado', 'Penteadeira integrada'],
      },
      {
        id: 'home-office',
        title: 'Escritório com Nichos Iluminados',
        subtitle: 'Estante com nichos em LED e bancada sob medida',
        image: PORTFOLIO_HOME_OFFICE_IMAGE,
        imageAlt:
          'Escritório com Nichos Iluminados em tons cinza com estante de nichos assimétricos e iluminação em LED, portas lisas e mesa com tampo em madeira clara.',
        details: ['Nichos com LED', 'Portas lisas', 'Bancada em madeira clara'],
      },
      {
        id: 'banheiro-rustico',
        title: 'Banheiro rústico',
        subtitle: 'Madeira, pedra natural e metais quentes',
        image: PORTFOLIO_BANHEIRO_RUSTICO_IMAGE,
        imageAlt:
          'Lavabo com painéis em madeira ripada, espelho com moldura em madeira, lavatório em pedra cinza e torneira dourada.',
        details: ['Marcenaria com ripado vertical', 'Bancada e cuba em pedra', 'Iluminação quente'],
      },
      {
        id: 'showroom-hidrica',
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

  const [selected, setSelected] = useState<PortfolioItem | null>(null)

  return (
    <MotionSection
      id="portfolio"
      className="relative z-10 overflow-x-hidden py-14 sm:py-20 md:py-24"
    >
      <Container>
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-studio-600">PORTFÓLIO</p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-studio-950 sm:text-4xl">
            Um fluxo visual contínuo — do conceito ao detalhe
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-studio-700 sm:text-base">
            Cozinhas, quartos, living, closets e ambientes comerciais entregues pela StudioA3 —
            toque num cartão para ver os detalhes do projeto.
          </p>
        </Reveal>

        <AutoCarousel
          maxBreakpoint="lg"
          ariaLabel="Projetos do portfólio StudioA3"
          className="mt-8 sm:mt-12"
        >
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => setSelected(it)}
              className={[
                'group relative block w-full overflow-hidden rounded-[28px] text-left shadow-soft ring-1 ring-studio-300/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-900/20',
                portfolioCardMotion,
              ].join(' ')}
            >
              <div className="relative aspect-[4/3] w-full bg-studio-900">
                <img
                  src={it.image}
                  alt={portfolioImageAlt(it)}
                  className="img-hover-zoom h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-950/70 via-studio-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-base font-semibold text-white sm:text-lg">{it.title}</p>
                  <p className="mt-1 text-xs text-white/75 sm:mt-2 sm:text-sm">{it.subtitle}</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur sm:mt-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                    Toque para ampliar
                  </div>
                </div>
              </div>
            </button>
          ))}
        </AutoCarousel>

        <div className="mt-12 hidden lg:block">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <button
                type="button"
                onClick={() => setSelected(items[0]!)}
                className={[
                  'group relative w-full overflow-hidden text-left shadow-soft ring-1 ring-studio-300/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-900/20',
                  portfolioCardMotion,
                ].join(' ')}
                style={{ borderRadius: '34px', clipPath: 'polygon(0 0, 100% 0, 100% 86%, 92% 100%, 0 100%)' }}
              >
                <div className="relative aspect-[16/11] w-full bg-studio-900">
                  <img
                    src={items[0]!.image}
                    alt={portfolioImageAlt(items[0]!)}
                    className="img-hover-zoom h-full w-full object-cover"
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
              </button>
            </Reveal>

            <Reveal delay={0.06} className="lg:col-span-5">
              <div className="lg:pt-10">
                <p className="text-sm font-semibold text-studio-950">Seleção StudioA3</p>
                <p className="mt-3 text-base leading-relaxed text-studio-700">
                  Um recorte editorial do portfólio: cozinhas, dormitórios, living e projetos
                  comerciais — o cuidado da marcenaria planejada em cada ambiente.
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
                <button
                  type="button"
                  onClick={() => setSelected(it)}
                  className={[
                    'group relative w-full overflow-hidden text-left shadow-soft ring-1 ring-studio-300/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-900/20',
                    portfolioCardMotion,
                  ].join(' ')}
                  style={{
                    borderRadius: '28px',
                    clipPath:
                      idx % 2 === 0
                        ? 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 12%)'
                        : 'polygon(0 0, 90% 0, 100% 12%, 100% 100%, 0 100%)',
                  }}
                >
                  <div className="relative aspect-[4/3] w-full bg-studio-900">
                    <img
                      src={it.image}
                      alt={portfolioImageAlt(it)}
                      className="img-hover-zoom h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-studio-950/70 via-studio-950/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-sm font-semibold text-white">{it.title}</p>
                      <p className="mt-1 text-xs text-white/75">{it.subtitle}</p>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
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
                alt={portfolioImageAlt(selected)}
                className="aspect-[16/11] w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-studio-900">{selected.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-studio-700">
                {selected.imageAlt ??
                  'Ambiente planejado pela StudioA3 com marcenaria sob medida, acabamento premium e atenção total ao detalhe.'}
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
    </MotionSection>
  )
}
