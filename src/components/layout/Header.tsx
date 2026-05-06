import { useEffect, useState } from 'react'
import { navLinks } from '@/content/site'
import { handleContactTrigger } from '@/lib/contactModal'

type Theme = 'dark' | 'light'

export function Header() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>('dark')
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const desktopLinks = navLinks
  const handleNavClick = () => setOpen(false)

  useEffect(() => {
    const urlTheme = new URLSearchParams(window.location.search).get('theme')
    const queryTheme = urlTheme === 'light' || urlTheme === 'dark' ? urlTheme : null
    const storedTheme = window.localStorage.getItem('vynho-theme')
    const storedValue = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const nextTheme = (queryTheme ?? storedValue ?? systemTheme) as Theme
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('vynho-theme', nextTheme)
  }, [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('vynho-theme', nextTheme)
  }

  return (
    <div className="nav-wrap">
      <nav className="container nav" aria-label="Main">
        <a href="/" aria-label="Vynho home">
          <span className="nav-brand">
            <img className="wordmark-image nav-wordmark nav-wordmark-dark" src="/assets/brand/wordmark-white-transparent.svg" alt="Vynho" />
            <img className="wordmark-image nav-wordmark nav-wordmark-light" src="/assets/brand/wordmark-black-transparent.svg" alt="Vynho" />
          </span>
        </a>

        <button type="button" className="theme-toggle nav-theme-center" aria-label="Toggle color theme" onClick={toggleTheme}>
          <span className={theme === 'light' ? 'active' : ''}>Light</span>
          <span className={theme === 'dark' ? 'active' : ''}>Dark</span>
        </button>

        <div className="nav-right-side">
          <div className="nav-links" aria-label="Desktop navigation">
            {desktopLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={path === item.href ? 'nav-link active' : 'nav-link'}
                aria-current={path === item.href ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="/contact" aria-label="Open contact modal" onClick={handleContactTrigger}>
            Let&apos;s Talk <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className={open ? 'mobile-nav-icon open' : 'mobile-nav-icon'} aria-hidden="true" />
          </button>
        </div>
      </nav>

      <div className={open ? 'mobile-drawer open' : 'mobile-drawer'} aria-hidden={!open} hidden={!open}>
        <div className="mobile-drawer-inner">
          <button
            type="button"
            className="theme-toggle mobile-theme-toggle"
            aria-label="Toggle color theme"
            onClick={toggleTheme}
          >
            <span className={theme === 'light' ? 'active' : ''}>Light</span>
            <span className={theme === 'dark' ? 'active' : ''}>Dark</span>
          </button>
          {desktopLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNavClick}>
              {link.label}
            </a>
          ))}
          <a
            className="mobile-drawer-cta"
            href="/contact"
            onClick={(event) => {
              handleNavClick()
              handleContactTrigger(event)
            }}
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </div>
  )
}
