import { useEffect, useState } from 'react'
import { navLinks } from '@/content/site'
import { ContactActionLink } from '@/components/patterns/ContactActionLink'

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
    const nextTheme = (queryTheme ?? storedValue ?? 'dark') as Theme
    setTheme(nextTheme)
    document.documentElement.dataset['theme'] = nextTheme
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

  const setThemeMode = (nextTheme: Theme) => {
    setTheme(nextTheme)
    document.documentElement.dataset['theme'] = nextTheme
    window.localStorage.setItem('vynho-theme', nextTheme)
  }

  const renderThemeSwitch = (className: string) => (
    <div
      className={theme === 'dark' ? `${className} is-dark` : className}
      role="group"
      aria-label="Color mode switch"
    >
      <button
        type="button"
        data-mode="light"
        className={theme === 'light' ? 'theme-toggle-btn active' : 'theme-toggle-btn'}
        onClick={() => setThemeMode('light')}
        aria-pressed={theme === 'light'}
      >
        Light
      </button>
      <button
        type="button"
        data-mode="dark"
        className={theme === 'dark' ? 'theme-toggle-btn active' : 'theme-toggle-btn'}
        onClick={() => setThemeMode('dark')}
        aria-pressed={theme === 'dark'}
      >
        Dark
      </button>
      <div className="theme-toggle-thumb" aria-hidden="true" />
    </div>
  )

  return (
    <div className="nav-wrap">
      <nav className={open ? 'container nav nav-shell opened' : 'container nav nav-shell'} aria-label="Main">
        <a href="/" className="nav-brand-anchor" aria-label="Vynho home">
          <img className="wordmark-image nav-wordmark nav-wordmark-dark" src="/assets/brand/wordmark-white-transparent.svg" alt="Vynho" />
          <img className="wordmark-image nav-wordmark nav-wordmark-light" src="/assets/brand/wordmark-black-transparent.svg" alt="Vynho" />
        </a>

        {renderThemeSwitch('theme-toggle nav-theme-center')}

        <ul className="nav-links" aria-label="Main navigation">
          {desktopLinks.map((item) => (
            <li key={item.href} className="nav-item">
              <a
                href={item.href}
                className={path === item.href ? 'nav-link active' : 'nav-link'}
                aria-current={path === item.href ? 'page' : undefined}
                onClick={handleNavClick}
              >
                <span className="nav-link-track" aria-hidden="true">
                  <span className="nav-link-label">{item.label}</span>
                  <span className="nav-link-label nav-link-label-ghost">{item.label}</span>
                </span>
                <span className="nav-link-text">{item.label}</span>
              </a>
            </li>
          ))}
          <li className="nav-item nav-item-cta-desktop">
            <ContactActionLink
              className="nav-cta"
              aria-label="Open contact modal"
              source="header_desktop"
            >
              <span className="nav-link-track" aria-hidden="true">
                <span className="nav-link-label">Let&apos;s Talk</span>
                <span className="nav-link-label nav-link-label-ghost">Let&apos;s Talk</span>
              </span>
              <span className="nav-link-text">Let&apos;s Talk</span>
            </ContactActionLink>
          </li>
        </ul>

        <div className="nav-actions">
          <ContactActionLink
            className="nav-cta nav-cta-mobile"
            aria-label="Open contact modal"
            source="header_mobile"
          >
            <span className="nav-link-track" aria-hidden="true">
              <span className="nav-link-label">Let&apos;s Talk</span>
              <span className="nav-link-label nav-link-label-ghost">Let&apos;s Talk</span>
            </span>
            <span className="nav-link-text">Let&apos;s Talk</span>
          </ContactActionLink>
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="mobile-nav-lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="mobile-drawer open" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="mobile-drawer-inner">
            {renderThemeSwitch('theme-toggle mobile-theme-toggle')}
            {desktopLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={path === item.href ? 'nav-link active' : 'nav-link'}
                aria-current={path === item.href ? 'page' : undefined}
                onClick={handleNavClick}
              >
                <span className="nav-link-track" aria-hidden="true">
                  <span className="nav-link-label">{item.label}</span>
                  <span className="nav-link-label nav-link-label-ghost">{item.label}</span>
                </span>
                <span className="nav-link-text">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
