import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { doctors, slots, specialties } from '../data'
import { DemoNotice, Input, PageHead, Select, Textarea, emailOk, phoneOk, sleep } from '../components/ui'
import { useApp } from '../hooks/useApp'
import type { Appointment as Appt } from '../types'

const today = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10) }

export default function Appointment() {
  const [sp] = useSearchParams(); const { user, addAppt } = useApp()
  const pre = doctors.find(d => d.id === sp.get('doctor'))
  const empty = () => ({ name: user?.name ?? '', email: user?.email ?? '', phone: '', specialty: pre?.specialty ?? sp.get('specialty') ?? '', doctor: pre?.id ?? '', date: '', time: '', reason: '' })
  const [f, setF] = useState(empty); const [errs, setErrs] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false); const [done, setDone] = useState<Appt | null>(null)
  const set = (k: string) => (e: { target: { value: string } }) => setF(p => ({ ...p, [k]: e.target.value, ...(k === 'specialty' ? { doctor: '' } : {}) }))
  const docs = doctors.filter(d => !f.specialty || d.specialty === f.specialty)
  const submit = async (e: FormEvent) => {
    e.preventDefault(); const x: Record<string, string> = {}
    if (f.name.trim().length < 2) x.name = 'Enter your full name.'
    if (!emailOk(f.email)) x.email = 'Enter a valid email address.'
    if (!phoneOk(f.phone)) x.phone = 'Enter a valid 10-digit Indian mobile number.'
    if (!f.specialty) x.specialty = 'Choose a specialty.'
    if (!f.doctor) x.doctor = 'Choose a doctor.'
    if (!f.date) x.date = 'Choose a date.'; else if (f.date < today()) x.date = 'Appointment date cannot be in the past.'
    if (!f.time) x.time = 'Choose a time slot.'
    setErrs(x); if (Object.keys(x).length) return
    setBusy(true); await sleep()
    const d = doctors.find(d => d.id === f.doctor)!
    const a: Appt = { ref: `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, doctor: d.name, specialty: d.specialty, date: f.date, time: f.time }
    addAppt(a); setDone(a); setBusy(false) // name, phone, reason are never stored
  }
  return <>
    <PageHead title="Book Your Appointment" text="Choose a specialty, select a doctor, and submit your appointment request." />
    <section className="sec !pt-10"><div className="wrap max-w-3xl">
      <form onSubmit={submit} noValidate className="card space-y-5">
        <DemoNotice>Frontend demo only. No real hospital appointment is made and no personal details are sent or stored.</DemoNotice>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="name" label="Full name" value={f.name} onChange={set('name')} error={errs.name} autoComplete="name" />
          <Input id="email" label="Email address" type="email" value={f.email} onChange={set('email')} error={errs.email} autoComplete="email" />
          <Input id="phone" label="Mobile number" type="tel" inputMode="numeric" value={f.phone} onChange={set('phone')} error={errs.phone} autoComplete="tel" />
          <Select id="specialty" label="Specialty" value={f.specialty} onChange={set('specialty')} error={errs.specialty}><option value="">Select specialty</option>{specialties.map(s => <option key={s}>{s}</option>)}</Select>
          <Select id="doctor" label="Doctor" value={f.doctor} onChange={set('doctor')} error={errs.doctor}><option value="">Select doctor</option>{docs.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</Select>
          <Input id="date" label="Appointment date" type="date" min={today()} value={f.date} onChange={set('date')} error={errs.date} />
          <Select id="time" label="Preferred time slot" value={f.time} onChange={set('time')} error={errs.time}><option value="">Select time</option>{slots.map(s => <option key={s}>{s}</option>)}</Select>
        </div>
        <Textarea id="reason" label="Reason for visit (optional)" value={f.reason} onChange={set('reason')} placeholder="Please avoid entering sensitive medical details in this demo." />
        <button className="btn-p w-full sm:w-auto" disabled={busy}>{busy && <Loader2 className="animate-spin" size={18} aria-hidden />}{busy ? 'Submitting…' : 'Submit Request'}</button>
      </form>
    </div></section>
    {done && <div className="fixed inset-0 z-50 grid place-items-center bg-navy/60 p-4" role="dialog" aria-modal="true" aria-labelledby="ok-title">
      <div className="card w-full max-w-md text-center"><CheckCircle2 size={48} className="mx-auto text-ok" aria-hidden />
        <h2 id="ok-title" className="mt-3 text-2xl">Request submitted</h2>
        <p className="mt-1 text-sm text-muted">Demo reference <strong className="text-navy">{done.ref}</strong></p>
        <dl className="mt-4 rounded-xl bg-page p-4 text-left text-sm"><div className="flex justify-between"><dt className="text-muted">Doctor</dt><dd className="font-semibold">{done.doctor}</dd></div><div className="mt-1 flex justify-between"><dt className="text-muted">Date</dt><dd className="font-semibold">{done.date}</dd></div><div className="mt-1 flex justify-between"><dt className="text-muted">Time</dt><dd className="font-semibold">{done.time}</dd></div></dl>
        <p className="mt-3 text-xs text-muted">This is a frontend demo. No real appointment has been made.</p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2"><button autoFocus className="btn-p" onClick={() => { setDone(null); setF(empty()) }}>Book Another Appointment</button><Link to="/dashboard" className="btn-s">View Dashboard</Link></div></div></div>}
  </>
}
