import { useEffect, useState } from 'react'
import { navLinks } from '@/content/site'
import { Button } from '@/components/ui/button'
import { ContactActionLink } from '@/components/patterns/ContactActionLink'

type Theme = 'dark' | 'light'

export function Header() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>('dark')
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const desktopLinks = navLinks

  useEffect(() => {
    const urlTheme = new URLSearchParams(window.location.search).get('theme')
    const queryTheme = urlTheme === 'light' || urlTheme === 'dark' ? urlTheme : null
    const storedTheme = window.localStorage.getItem('vynho-theme')
    const storedValue = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null
    const nextTheme = (queryTheme ?? storedValue ?? 'dark') as Theme
    setTheme(nextTheme)
    document.documentElement.dataset['theme'] = nextTheme
    window.localStorage.setItem('vynho-theme', nextTheme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nextTheme === 'dark' ? '#050609' : '#f4f6fa')
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
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', nextTheme === 'dark' ? '#050609' : '#f4f6fa')
  }

  const getToggleLabelColor = (mode: Theme) => {
    if (theme === mode) return theme === 'light' ? '#ffffff' : '#111520'
    return theme === 'light' ? '#111520' : '#ffffff'
  }

  const renderThemeSwitch = (className: string) => (
    <div
      className={theme === 'dark' ? `${className} is-dark` : className}
      role="group"
      aria-label="Color mode switch"
    >
      <Button
        type="button"
        variant="theme-toggle"
        size="sm"
        data-mode="light"
        className={theme === 'light' ? 'theme-toggle-btn active' : 'theme-toggle-btn'}
        style={{ color: getToggleLabelColor('light') }}
        onClick={() => setThemeMode('light')}
        aria-pressed={theme === 'light'}
      >
        Light
      </Button>
      <Button
        type="button"
        variant="theme-toggle"
        size="sm"
        data-mode="dark"
        className={theme === 'dark' ? 'theme-toggle-btn active' : 'theme-toggle-btn'}
        style={{ color: getToggleLabelColor('dark') }}
        onClick={() => setThemeMode('dark')}
        aria-pressed={theme === 'dark'}
      >
        Dark
      </Button>
      <div className="theme-toggle-thumb" aria-hidden="true" />
    </div>
  )

  return (
    <>
      <div className="nav-wrap">
        <nav className={open ? 'container nav nav-shell opened' : 'container nav nav-shell'} aria-label="Main">
        <a href="/" className="nav-brand-anchor" aria-label="Vynho home">
          <img
            className="wordmark-image nav-wordmark nav-wordmark-dark"
            src="/assets/brand/wordmark-white-transparent.svg"
            alt="Vynho"
            style={{ display: theme === 'light' ? 'none' : 'block' }}
          />
          <img
            className="wordmark-image nav-wordmark nav-wordmark-light"
            src="/assets/brand/wordmark-black-transparent.svg"
            alt="Vynho"
            style={{ display: theme === 'light' ? 'block' : 'none' }}
          />
        </a>

        {renderThemeSwitch('theme-toggle nav-theme-center')}

        <div className="nav-right-side">
          <ul className="nav-links" aria-label="Main navigation">
            {desktopLinks.map((item) => (
              <li key={item.href} className="nav-item">
                <a
                  href={item.href}
                  className={path === item.href ? 'nav-link active' : 'nav-link'}
                  aria-current={path === item.href ? 'page' : undefined}
                >
                  <span className="nav-link-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <ContactActionLink source="header_lets_talk" className="nav-contact-cta">
            <span>Let&apos;s Talk</span>
            <span aria-hidden="true">→</span>
          </ContactActionLink>
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="mobile-nav-lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
        </nav>
      </div>

      {open ? (
        <div id="mobile-navigation" className="mobile-drawer open" aria-label="Mobile navigation">
          <div className="mobile-drawer-inner">
            {renderThemeSwitch('theme-toggle mobile-theme-toggle')}
            {desktopLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={path === item.href ? 'nav-link active' : 'nav-link'}
                aria-current={path === item.href ? 'page' : undefined}
              >
                <span className="nav-link-label">{item.label}</span>
              </a>
            ))}
            <ContactActionLink source="mobile_navigation" className="mobile-contact-cta">
              <span>Start a project</span>
              <span aria-hidden="true">↗</span>
            </ContactActionLink>
          </div>
        </div>
      ) : null}
    </>
  )
}
