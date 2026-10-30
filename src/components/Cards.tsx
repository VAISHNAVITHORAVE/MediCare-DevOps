import { Link } from 'react-router-dom'
import { Stethoscope, HeartPulse, Sparkles, Baby, CalendarPlus, User } from 'lucide-react'
import type { Doctor, Service } from '../types'
import { Img } from './ui'
const icons = { Stethoscope, HeartPulse, Sparkles, Baby }
export const ServiceCard = ({ s }: { s: Service }) => {
  const I = icons[s.icon]
  return <article className="card flex flex-col"><span className="grid h-12 w-12 place-items-center rounded-xl bg-mint text-teal"><I aria-hidden /></span>
    <h3 className="mt-4 text-lg">{s.name}</h3><p className="mt-1 flex-1 text-sm text-muted">{s.desc}</p>
    <Link to={`/appointment?specialty=${encodeURIComponent(s.id)}`} className="btn-s mt-5">Book Consultation</Link></article>
}
export const DoctorCard = ({ d }: { d: Doctor }) => (
  <article className="card flex flex-col !p-0 overflow-hidden">
    <Img src={d.img} alt={`Portrait of ${d.name}`} className="h-56 w-full" />
    <div className="flex flex-1 flex-col p-5"><h3 className="text-lg">{d.name}</h3><p className="text-sm font-semibold text-brand">{d.specialty}</p>
      <p className="mt-2 flex-1 text-sm text-muted">{d.bio}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Link to={`/doctors?q=${encodeURIComponent(d.name)}`} className="btn-s !px-3"><User size={16} aria-hidden />View Profile</Link>
        <Link to={`/appointment?doctor=${d.id}`} className="btn-p !px-3"><CalendarPlus size={16} aria-hidden />Book</Link>
      </div></div>
  </article>
)
