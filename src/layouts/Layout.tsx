import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, UserCircle, LayoutDashboard, LogOut } from 'lucide-react'
import { Logo } from '../components/ui'
import { useApp } from '../hooks/useApp'

const links = [['/', 'Home'], ['/services', 'Services'], ['/doctors', 'Doctors'], ['/about', 'About Us'], ['/contact', 'Contact']]
const nav = ({ isActive }: { isActive: boolean }) => `rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-brand/10 text-brand' : 'text-navy hover:text-brand'}`

function Header() {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const { user, signOut } = useApp()
  const { pathname } = useLocation()
  const go = useNavigate()
  useEffect(() => { setOpen(false); setMenu(false); window.scrollTo(0, 0) }, [pathname])
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map(([to, t]) => <NavLink key={to} to={to} end className={nav}>{t}</NavLink>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="relative">
              <button className="btn-s !px-3 !py-2" aria-expanded={menu} aria-haspopup="menu" onClick={() => setMenu(!menu)}><UserCircle size={18} aria-hidden />{user.name.split(' ')[0]}</button>
              {menu && <div role="menu" className="card absolute right-0 mt-2 w-48 !p-2">
                <Link role="menuitem" to="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-page"><LayoutDashboard size={16} />Dashboard</Link>
                <button role="menuitem" onClick={() => { signOut(); go('/') }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-page"><LogOut size={16} />Sign out</button>
              </div>}
            </div>
          ) : <NavLink to="/login" className={nav}>Login</NavLink>}
          {user && <NavLink to="/dashboard" className={nav}>Dashboard</NavLink>}
          <Link to="/appointment" className="btn-p !py-2.5">Book Appointment</Link>
        </div>
        <button className="grid h-11 w-11 place-items-center rounded-xl border border-line lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav id="mobile-nav" aria-label="Mobile" className="wrap flex flex-col gap-1 border-t border-line pb-4 pt-3 lg:hidden">
        {links.map(([to, t]) => <NavLink key={to} to={to} end className={nav}>{t}</NavLink>)}
        {user ? <><NavLink to="/dashboard" className={nav}>Dashboard</NavLink><button className={`${nav({ isActive: false })} text-left`} onClick={() => { signOut(); go('/') }}>Sign out</button></> : <NavLink to="/login" className={nav}>Login</NavLink>}
        <Link to="/appointment" className="btn-p mt-2">Book Appointment</Link>
      </nav>}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="wrap grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div><Logo light /><p className="mt-3 text-sm">Your Health, Our Priority.</p></div>
        <div><h2 className="mb-3 text-sm !text-white">Quick links</h2><ul className="space-y-2 text-sm">{[...links, ['/appointment', 'Book Appointment'], ['/login', 'Login']].map(([to, t]) => <li key={to}><Link className="hover:text-white" to={to}>{t}</Link></li>)}</ul></div>
        <div><h2 className="mb-3 text-sm !text-white">Specialties</h2><ul className="space-y-2 text-sm">{['General Medicine', 'Cardiology', 'Dermatology', 'Pediatrics'].map(s => <li key={s}><Link className="hover:text-white" to="/services">{s}</Link></li>)}</ul></div>
        <div><h2 className="mb-3 text-sm !text-white">Notice</h2><p className="text-sm">MediCare is a frontend demonstration. It is not a medical provider and does not offer medical advice.</p></div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs">© {new Date().getFullYear()} MediCare. Demonstration project for academic purposes.</p>
    </footer>
  )
}

export default function Layout() {
  return <div className="flex min-h-screen flex-col"><a href="#main" className="sr-only focus:not-sr-only focus:p-3">Skip to content</a><Header /><main id="main" className="flex-1"><Outlet /></main><Footer /></div>
}
