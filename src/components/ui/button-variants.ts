import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full border text-[14px] leading-none transition duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--agency-blue-soft)] disabled:pointer-events-none disabled:opacity-50 font-[var(--font-mono)]',
  {
    variants: {
      variant: {
        default:
          'border-[var(--agency-blue)] bg-[var(--agency-blue)] text-white shadow-[0_16px_38px_rgba(22,88,250,0.26)] hover:bg-[var(--agency-blue-soft)]',
        outline:
          'border-[rgba(220,224,235,0.28)] bg-[rgba(255,255,255,0.07)] text-white hover:border-[var(--agency-blue-soft)] hover:bg-[rgba(76,142,251,0.16)]',
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
