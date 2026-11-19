import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

function Header() {
  const { lang, setLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '#facts', label: t.header.facts },
    { href: '#why', label: t.header.why },
    { href: '#timeline', label: t.header.timeline },
    { href: '#map', label: t.header.venues },
    { href: '#tips', label: t.header.tips },
    { href: '#quiz', label: t.header.quiz },
    { href: '#contact', label: lang === 'by' ? 'Зваротная сувязь' : 'Обратная связь' },
  ]

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">⭐</span>
          <span>{t.header.logo}</span>
        </div>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-controls">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <div className="lang-switcher">
            <button className={lang === 'ru' ? 'active' : ''} onClick={() => setLang('ru')}>RU</button>
            <button className={lang === 'by' ? 'active' : ''} onClick={() => setLang('by')}>BY</button>
          </div>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
