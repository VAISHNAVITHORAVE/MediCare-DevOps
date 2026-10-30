import { Link, Navigate } from 'react-router-dom'
import { CalendarPlus, CalendarX, Stethoscope, Users, UserCircle } from 'lucide-react'
import { useApp } from '../hooks/useApp'
import { sampleHistory } from '../data'
import type { Appointment } from '../types'

const Row = ({ a }: { a: Appointment }) => <li className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line p-4"><div><p className="font-semibold text-navy">{a.doctor}</p><p className="text-sm text-muted">{a.specialty}</p></div><div className="text-right text-sm"><p className="font-semibold">{a.date} · {a.time}</p><p className="text-xs text-muted">{a.sample ? 'Sample data' : `Demo ref ${a.ref}`}</p></div></li>

export default function Dashboard() {
  const { user, appts } = useApp()
  if (!user) return <Navigate to="/login" replace />
  return <section className="sec"><div className="wrap">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl">Welcome, {user.name.split(' ')[0]}</h1><p className="mt-1 text-muted">Your demo dashboard. Nothing here comes from a hospital database.</p></div><Link to="/appointment" className="btn-p"><CalendarPlus size={18} aria-hidden />Book New Appointment</Link></div>
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      <aside className="card h-fit"><UserCircle size={44} className="text-brand" aria-hidden /><h2 className="mt-2 text-lg">{user.name}</h2><p className="break-all text-sm text-muted">{user.email}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-center"><div className="rounded-xl bg-mint p-3"><p className="text-2xl font-extrabold text-navy">{appts.length}</p><p className="text-xs text-muted">Upcoming</p></div><div className="rounded-xl bg-page p-3"><p className="text-2xl font-extrabold text-navy">{sampleHistory.length}</p><p className="text-xs text-muted">Previous (sample)</p></div></div>
        <div className="mt-5 flex flex-col gap-2"><Link to="/doctors" className="btn-s"><Users size={16} aria-hidden />Doctors</Link><Link to="/services" className="btn-s"><Stethoscope size={16} aria-hidden />Services</Link></div></aside>
      <div className="space-y-6 lg:col-span-2">
        <div className="card"><h2 className="text-xl">Upcoming appointments</h2>
          {appts.length ? <ul className="mt-4 space-y-3">{appts.map(a => <Row key={a.ref} a={a} />)}</ul>
            : <div className="mt-4 rounded-xl bg-page p-8 text-center"><CalendarX className="mx-auto text-muted" aria-hidden /><p className="mt-2 font-semibold text-navy">No upcoming appointments</p><p className="text-sm text-muted">Requests you submit in this session appear here.</p><Link to="/appointment" className="btn-p mt-4">Book an Appointment</Link></div>}</div>
        <div className="card"><h2 className="text-xl">Previous appointments</h2><p className="text-sm text-muted">Sample data for demonstration only.</p><ul className="mt-4 space-y-3">{sampleHistory.map(a => <Row key={a.ref} a={a} />)}</ul></div>
      </div></div></div></section>
}
