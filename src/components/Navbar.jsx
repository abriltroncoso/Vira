
import { useEffect, useState } from 'react'
import './navBar.css'

const LINKS = [
  { href: '#estudio', label: 'Sobre nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#contacto', label: 'Contactanos' },
  { href: '#como-trabajamos', label: '¿Cómo trabajamos?' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
  }

 
  return (
    <header className={`nav ${menuOpen ? 'menu-open' : ''}`}>
      <a
        className="nav__logo"
        href="#inicio"
        onClick={closeMenu}
      >
        VS
      </a>

      {/* Desktop */}
      <nav
        className="nav__links"
        aria-label="Secciones"
      >
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Mobile */}
      <button
        className="nav__toggle"
        type="button"
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <div className="nav__mobile">
        <nav aria-label="Menú móvil">
          {LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              style={{
                '--menu-index': index,
              }}
            >
              <span>0{index + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <span className="nav__mobile-footer">
          ViraStudio®
        </span>
      </div>
    </header>
  )
}

