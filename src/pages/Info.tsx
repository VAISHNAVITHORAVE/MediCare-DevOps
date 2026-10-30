import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Loader2, Target, MonitorSmartphone, CalendarCheck } from 'lucide-react'
import { DemoNotice, Img, Input, PageHead, Textarea, emailOk, sleep } from '../components/ui'

export function About() {
  return <><PageHead title="About MediCare" text="A healthcare-focused appointment experience, built as a frontend demonstration." />
    <section className="sec"><div className="wrap grid items-center gap-10 lg:grid-cols-2">
      <Img src="/images/about.jpg" alt="Healthcare professionals in a modern clinic" className="h-80 w-full rounded-3xl shadow-soft" />
      <div className="space-y-4 text-muted"><p>MediCare shows how a clinic's website can make finding a doctor and requesting a visit feel simple. It is a demonstration project, not a registered hospital or medical provider.</p>
        <ul className="space-y-3">{[[Target, 'Mission', 'Make appointment requests clear, quick and stress-free.'], [MonitorSmartphone, 'User-focused design', 'Readable, accessible and comfortable on any screen.'], [CalendarCheck, 'Convenient requests', 'Pick a specialty, doctor, date and time in one form.']].map(([I, t, d]) => { const Ic = I as typeof Target; return <li key={t as string} className="flex gap-3"><Ic className="mt-1 shrink-0 text-teal" aria-hidden /><span><strong className="text-navy">{t as string}.</strong> {d as string}</span></li> })}</ul>
        <Link to="/doctors" className="btn-p">Explore Doctors</Link></div></div></section></>
}

export function Contact() {
  const [f, setF] = useState({ name: '', email: '', subject: '', message: '' }); const [errs, setErrs] = useState<Record<string, string>>({}); const [busy, setBusy] = useState(false); const [done, setDone] = useState(false)
  const set = (k: string) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  const submit = async (e: FormEvent) => {
    e.preventDefault(); const x: Record<string, string> = {}
    if (!f.name.trim()) x.name = 'Enter your name.'
    if (!emailOk(f.email)) x.email = 'Enter a valid email address.'
    if (!f.subject.trim()) x.subject = 'Enter a subject.'
    if (f.message.trim().length < 10) x.message = 'Message must be at least 10 characters.'
    setErrs(x); if (Object.keys(x).length) return
    setBusy(true); await sleep(); setBusy(false); setDone(true)
  }
  return <><PageHead title="Contact Us" text="Send a message through the demo contact form." />
    <section className="sec !pt-10"><div className="wrap max-w-2xl">
      {done ? <div role="status" className="card text-center"><CheckCircle2 size={44} className="mx-auto text-ok" aria-hidden /><h2 className="mt-3 text-2xl">Demo message recorded</h2><p className="mt-1 text-sm text-muted">Nothing was sent. This form does not connect to a real hospital.</p><button className="btn-s mt-5" onClick={() => { setDone(false); setF({ name: '', email: '', subject: '', message: '' }) }}>Send another</button></div>
        : <form onSubmit={submit} noValidate className="card space-y-5"><DemoNotice>Frontend demonstration. Messages are not sent anywhere.</DemoNotice>
          <div className="grid gap-5 sm:grid-cols-2"><Input id="name" label="Name" value={f.name} onChange={set('name')} error={errs.name} /><Input id="email" label="Email" type="email" value={f.email} onChange={set('email')} error={errs.email} /></div>
          <Input id="subject" label="Subject" value={f.subject} onChange={set('subject')} error={errs.subject} />
          <Textarea id="message" label="Message" value={f.message} onChange={set('message')} error={errs.message} />
          <button className="btn-p" disabled={busy}>{busy && <Loader2 className="animate-spin" size={18} aria-hidden />}{busy ? 'Sending…' : 'Send Message'}</button></form>}
    </div></section></>
}

export function NotFound() {
  return <section className="sec"><div className="wrap text-center"><p className="text-6xl font-extrabold text-brand">404</p><h1 className="mt-3 text-3xl">Page not found</h1><p className="mt-2 text-muted">The page you're looking for doesn't exist or has moved.</p><div className="mt-6 flex justify-center gap-3"><Link to="/" className="btn-p">Back to Home</Link><Link to="/doctors" className="btn-s">Find a Doctor</Link></div></div></section>
}
