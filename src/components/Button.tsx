import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Common = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'instagram'
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: ReactNode
  className?: string
  iconOnly?: boolean
}

type SafeAnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDrop'
>

type SafeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDrop'
>

const base =
  'relative inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-studio-900/20 active:translate-y-[1px]'

const variants: Record<NonNullable<Common['variant']>, string> = {
  primary:
    'bg-studio-900 text-white shadow-soft hover:bg-studio-800 focus-visible:ring-studio-900/30',
  secondary:
    'bg-white text-studio-900 shadow-ring hover:bg-studio-50 focus-visible:ring-studio-900/20',
  ghost: 'bg-transparent text-studio-900 hover:bg-studio-50',
  whatsapp:
    'bg-[#25D366] text-white shadow-soft hover:bg-[#1fb85a] focus-visible:ring-[#25D366]/30',
  instagram:
    'text-white shadow-soft focus-visible:ring-black/20 ' +
    'bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] ' +
    'hover:brightness-105',
}

const sizes: Record<NonNullable<Common['size']>, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

const iconOnlySizes: Record<NonNullable<Common['size']>, string> = {
  sm: 'h-10 w-10 p-0 text-sm',
  md: 'h-11 w-11 p-0 text-sm',
  lg: 'h-12 w-12 p-0 text-base',
}

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(' ')
}

export function ButtonLink(
  props: SafeAnchorProps &
    Common & {
      href: string
    },
) {
  const reduce = useReducedMotion()
  const {
    variant = 'primary',
    size = 'md',
    leftIcon,
    className,
    children,
    iconOnly = false,
    ...rest
  } = props

  return (
    <motion.a
      {...rest}
      className={cx(
        base,
        variants[variant],
        iconOnly ? iconOnlySizes[size] : sizes[size],
        iconOnly ? 'gap-0' : undefined,
        'group overflow-hidden',
        'hover:-translate-y-[1px] hover:shadow-soft',
        className,
      )}
      whileHover={reduce ? undefined : { y: -1, scale: 1.01 }}
      whileTap={reduce ? undefined : { y: 0, scale: 0.99 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      {leftIcon ? <span className="text-base">{leftIcon}</span> : null}
      {children ? <span>{children}</span> : null}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-full w-24 rotate-12 bg-white/20 blur-md opacity-0 transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100"
      />
    </motion.a>
  )
}

export function Button(
  props: SafeButtonProps & Common,
) {
  const reduce = useReducedMotion()
  const {
    variant = 'primary',
    size = 'md',
    leftIcon,
    className,
    children,
    type = 'button',
    iconOnly = false,
    ...rest
  } = props

  return (
    <motion.button
      {...rest}
      type={type}
      className={cx(
        base,
        variants[variant],
        iconOnly ? iconOnlySizes[size] : sizes[size],
        iconOnly ? 'gap-0' : undefined,
        'group overflow-hidden',
        'hover:-translate-y-[1px] hover:shadow-soft',
        className,
      )}
      whileHover={reduce ? undefined : { y: -1, scale: 1.01 }}
      whileTap={reduce ? undefined : { y: 0, scale: 0.99 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      {leftIcon ? <span className="text-base">{leftIcon}</span> : null}
      {children ? <span>{children}</span> : null}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-full w-24 rotate-12 bg-white/25 blur-md opacity-0 transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100"
      />
    </motion.button>
  )
}

