import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'hero', label: 'HOME' },
  { id: 'mission-control', label: 'MISSION CONTROL' },
  { id: 'system', label: 'SYSTEM' },
  { id: 'technologies', label: 'TECHNOLOGIES' },
  { id: 'energy', label: 'ENERGY' },
  { id: 'challenges', label: 'CHALLENGES' },
  { id: 'safety', label: 'SAFETY' },
  { id: 'roadmap', label: 'ROADMAP' },
  { id: 'simulation', label: 'SIMULATION' }
]

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const handleNav = (id) => {
    scrollToSection(id)
    setOpen(false)
  }

  return (
    <>
      <nav className="topnav">
        <button className="brand" onClick={() => handleNav('hero')}>
          <span className="dot"></span>MCS &middot; MARS-WTE
        </button>
        <div className="navlinks">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open && (
        <div className="mobile-menu">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
