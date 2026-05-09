import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full border text-[14px] leading-none transition duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ds-focus)] disabled:pointer-events-none disabled:opacity-50 font-[var(--font-mono)]',
  {
    variants: {
      variant: {
        default:
          'border-[var(--accent-lime)] bg-[var(--ds-btn-bg)] text-[var(--ds-btn-text)] shadow-[0_12px_30px_rgba(157,199,61,0.28)] hover:bg-[var(--ds-btn-bg-hover)]',
        outline:
          'border-[var(--ds-btn-outline-border)] bg-[var(--ds-btn-outline-bg)] text-[var(--ds-text)] hover:border-[var(--accent-lime)] hover:bg-[var(--ds-surface-2)]',
      },
      size: {
        default: 'h-11 px-4',
        sm: 'h-9 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
