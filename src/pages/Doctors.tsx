import { useSearchParams } from 'react-router-dom'
import { Search, UserX } from 'lucide-react'
import { doctors, specialties } from '../data'
import { DoctorCard } from '../components/Cards'
import { PageHead } from '../components/ui'
export default function Doctors() {
  const [sp, setSp] = useSearchParams()
  const q = sp.get('q') ?? ''; const spec = sp.get('specialty') ?? ''
  const upd = (k: string, v: string) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }) }
  const list = doctors.filter(d => d.name.toLowerCase().includes(q.trim().toLowerCase()) && (!spec || d.specialty === spec))
  return <><PageHead title="Our Doctors" text="Sample doctor profiles for demonstration. Search by name or filter by specialty." />
    <section className="sec"><div className="wrap">
      <div className="mb-8 grid gap-3 sm:grid-cols-[1fr_240px]">
        <div className="relative"><label htmlFor="q" className="sr-only">Search doctors by name</label><Search size={18} className="absolute left-4 top-3.5 text-muted" aria-hidden /><input id="q" className="input !pl-11" placeholder="Search doctors by name" value={q} onChange={e => upd('q', e.target.value)} /></div>
        <div><label htmlFor="spec" className="sr-only">Filter by specialty</label><select id="spec" className="input" value={spec} onChange={e => upd('specialty', e.target.value)}><option value="">All specialties</option>{specialties.map(s => <option key={s}>{s}</option>)}</select></div>
      </div>
      {list.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">{list.map(d => <DoctorCard key={d.id} d={d} />)}</div>
        : <div className="card mx-auto max-w-md text-center"><UserX className="mx-auto text-muted" aria-hidden /><h2 className="mt-3 text-lg">No doctors found</h2><p className="mt-1 text-sm text-muted">Try a different name or clear the specialty filter.</p><button className="btn-s mt-4" onClick={() => setSp({})}>Clear filters</button></div>}
    </div></section></>
}
