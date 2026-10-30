import { Link } from 'react-router-dom'
import { CalendarCheck, Layers, Users, MousePointerClick, Award, HeartHandshake, Clock, ChevronDown, ArrowRight, Calendar } from 'lucide-react'
import { doctors, services, faqs } from '../data'
import { DoctorCard, ServiceCard } from '../components/Cards'
import { Img } from '../components/ui'

const trust = [[Award, 'Experienced Specialists'], [HeartHandshake, 'Patient-Centered Approach'], [Clock, 'Convenient Appointment Requests']] as const
const highlights = [[CalendarCheck, 'Easy Appointment Requests', 'Submit a request in a few clear steps.'], [Layers, 'Multiple Specialties', 'Browse care areas in one place.'], [Users, 'Doctor Directory', 'Search and filter sample doctor profiles.'], [MousePointerClick, 'User-Friendly Interface', 'Simple, accessible and mobile ready.']] as const

export default function Home() {
  return <>
    <section className="bg-gradient-to-b from-white to-page">
      <div className="wrap grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
        <div className="rise">
          <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold tracking-wide text-brand">YOUR TRUSTED HEALTHCARE PARTNER</span>
          <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">Expert Care for a <span className="text-brand">Healthier Tomorrow.</span></h1>
          <p className="mt-5 max-w-xl text-lg text-muted">Find doctor information and send appointment requests from one simple, convenient place.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/appointment" className="btn-p">Book an Appointment</Link><Link to="/doctors" className="btn-s">Explore Our Doctors</Link></div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">{trust.map(([I, t]) => <li key={t} className="flex items-center gap-2 text-sm font-semibold text-navy"><I size={18} className="shrink-0 text-teal" aria-hidden />{t}</li>)}</ul>
        </div>
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -right-4 -top-4 h-full w-full rounded-[28px] bg-mint" aria-hidden />
          <Img src="/images/hero-doctor.jpg" alt="Doctor in a modern healthcare setting" className="relative h-[380px] w-full rounded-[28px] shadow-soft sm:h-[460px]" />
          <div className="card absolute -bottom-5 left-3 flex items-center gap-3 !p-4 sm:-left-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white"><Calendar size={20} aria-hidden /></span><div><p className="text-sm font-bold text-navy">Next available slot</p><p className="text-xs text-muted">Sample data · Tomorrow, 10:00 AM</p></div></div>
        </div>
      </div>
    </section>
    <section className="sec"><div className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{highlights.map(([I, t, d]) => <div key={t} className="card"><I className="text-brand" aria-hidden /><h3 className="mt-3 text-base">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></div>)}</div></section>
    <section className="sec bg-white"><div className="wrap"><h2 className="text-3xl">Our medical services</h2><p className="mt-2 text-muted">Choose a specialty to start your request.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(s => <ServiceCard key={s.id} s={s} />)}</div></div></section>
    <section className="sec"><div className="wrap"><div className="flex items-end justify-between"><h2 className="text-3xl">Featured doctors</h2><Link to="/doctors" className="hidden items-center gap-1 text-sm font-semibold text-brand sm:flex">All doctors <ArrowRight size={16} /></Link></div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{doctors.map(d => <DoctorCard key={d.id} d={d} />)}</div></div></section>
    <section className="sec bg-white"><div className="wrap"><h2 className="text-center text-3xl">How it works</h2>
      <ol className="mt-10 grid gap-6 md:grid-cols-3">{['Choose a specialty.', 'Select a doctor.', 'Submit an appointment request.'].map((t, i) => <li key={t} className="card text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand font-bold text-white">{i + 1}</span><p className="mt-4 font-semibold text-navy">{t}</p></li>)}</ol></div></section>
    <section className="sec"><div className="wrap grid items-center gap-10 lg:grid-cols-2">
      <Img src="/images/about.jpg" alt="Healthcare team in a bright clinic" className="h-72 w-full rounded-3xl shadow-soft" />
      <div><h2 className="text-3xl">About MediCare</h2><p className="mt-4 text-muted">MediCare is a demonstration of a clear, healthcare-focused appointment experience. The interface keeps steps short, labels plain, and actions easy to find on any screen size.</p><Link to="/services" className="btn-p mt-6">Explore Services</Link></div></div></section>
    <section className="sec bg-white"><div className="wrap max-w-3xl"><h2 className="text-center text-3xl">Frequently asked questions</h2>
      <div className="mt-8 space-y-3">{faqs.map(([q, a]) => <details key={q} className="card group !p-0"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 font-semibold text-navy">{q}<ChevronDown className="shrink-0 transition group-open:rotate-180" aria-hidden /></summary><p className="px-5 pb-5 text-sm text-muted">{a}</p></details>)}</div></div></section>
  </>
}
