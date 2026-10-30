import { useState, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ShieldCheck, CalendarCheck, Users, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'
import { DemoNotice, Img, Input, Logo, emailOk, phoneOk, sleep } from '../components/ui'
import { useApp } from '../hooks/useApp'

type Errs = Record<string, string>

function Shell({ title, sub, children, panel = true }: { title: string; sub: string; children: ReactNode; panel?: boolean }) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {panel && <aside className="relative hidden bg-navy p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo light />
        <div><h1 className="!text-white text-4xl">Welcome Back to MediCare</h1><p className="mt-3 text-slate-300">Your healthcare journey, made simpler.</p>
          <Img src="/images/login.jpg" alt="Doctor consulting with a patient" className="mt-8 h-56 w-full rounded-2xl" />
          <ul className="mt-8 space-y-3 text-sm">{[[CalendarCheck, 'Request appointments in minutes'], [Users, 'Browse sample doctor profiles'], [ShieldCheck, 'No passwords stored in this demo']].map(([I, t]) => { const Ic = I as typeof ShieldCheck; return <li key={t as string} className="flex items-center gap-3"><Ic size={18} className="text-teal" aria-hidden />{t as string}</li> })}</ul></div>
        <span />
      </aside>}
      <div className="grid place-items-center px-4 py-10 sm:px-6">
        <div className="card w-full max-w-md">
          <h2 className="text-2xl">{title}</h2><p className="mt-1 text-sm text-muted">{sub}</p>
          <div className="mt-5">{children}</div>
          <Link to="/" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-brand"><ArrowLeft size={16} aria-hidden />Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

function Password({ id, label, value, onChange, error }: { id: string; label: string; value: string; onChange: (v: string) => void; error?: string }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input id={id} label={label} type={show ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)} error={error} autoComplete={id === 'password' ? 'current-password' : 'new-password'} />
      <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-3 top-[38px] text-muted hover:text-brand">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
    </div>
  )
}
const Submit = ({ busy, children }: { busy: boolean; children: ReactNode }) => <button className="btn-p w-full" disabled={busy}>{busy && <Loader2 className="animate-spin" size={18} aria-hidden />}{busy ? 'Please wait…' : children}</button>

export function Login() {
  const [f, setF] = useState({ email: '', password: '', remember: false })
  const [errs, setErrs] = useState<Errs>({})
  const [busy, setBusy] = useState(false)
  const { signIn } = useApp(); const go = useNavigate()
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const x: Errs = {}
    if (!f.email.trim()) x.email = 'Enter your email address.'; else if (!emailOk(f.email)) x.email = 'Enter a valid email address.'
    if (!f.password) x.password = 'Enter your password.'; else if (f.password.length < 6) x.password = 'Password must be at least 6 characters.'
    setErrs(x); if (Object.keys(x).length) return
    setBusy(true); await sleep()
    const name = f.email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    signIn({ name, email: f.email.trim() }); go('/dashboard')
  }
  return (
    <Shell title="Sign in to your account" sub="Access your MediCare dashboard.">
      <form onSubmit={submit} noValidate className="space-y-4">
        <DemoNotice>Demo sign-in only. Any valid email and a password of 6+ characters works. This is not secure authentication.</DemoNotice>
        <Input id="email" label="Email address" type="email" autoComplete="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} error={errs.email} />
        <Password id="password" label="Password" value={f.password} onChange={v => setF({ ...f, password: v })} error={errs.password} />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={f.remember} onChange={e => setF({ ...f, remember: e.target.checked })} className="h-4 w-4 accent-brand" />Remember me</label>
          <Link to="/forgot-password" className="font-semibold text-brand">Forgot password?</Link>
        </div>
        <Submit busy={busy}>Sign In</Submit>
        <p className="text-center text-sm text-muted">Don't have an account? <Link to="/signup" className="font-semibold text-brand">Create one.</Link></p>
      </form>
    </Shell>
  )
}

const strength = (p: string) => { let s = 0; if (p.length >= 8) s++; if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++; if (/\d/.test(p)) s++; if (/[^A-Za-z0-9]/.test(p)) s++; return s }

export function Signup() {
  const [f, setF] = useState({ name: '', email: '', phone: '', password: '', confirm: '', terms: false })
  const [errs, setErrs] = useState<Errs>({})
  const [busy, setBusy] = useState(false)
  const { signIn } = useApp(); const go = useNavigate()
  const set = (k: string) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  const sc = strength(f.password)
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const x: Errs = {}
    if (f.name.trim().length < 2) x.name = 'Enter your full name.'
    if (!emailOk(f.email)) x.email = 'Enter a valid email address.'
    if (!phoneOk(f.phone)) x.phone = 'Enter a valid 10-digit Indian mobile number starting with 6–9.'
    if (f.password.length < 8) x.password = 'Password must be at least 8 characters.'
    if (f.confirm !== f.password || !f.confirm) x.confirm = 'Passwords do not match.'
    if (!f.terms) x.terms = 'Accept the Terms and Conditions to continue.'
    setErrs(x); if (Object.keys(x).length) return
    setBusy(true); await sleep()
    signIn({ name: f.name.trim(), email: f.email.trim() }); go('/dashboard') // password is never stored
  }
  return (
    <Shell title="Create your account" sub="Set up a demo profile to explore MediCare.">
      <form onSubmit={submit} noValidate className="space-y-4">
        <DemoNotice>Demo registration. No permanent account is created and your password is never saved.</DemoNotice>
        <Input id="name" label="Full name" autoComplete="name" value={f.name} onChange={set('name')} error={errs.name} />
        <Input id="email" label="Email address" type="email" autoComplete="email" value={f.email} onChange={set('email')} error={errs.email} />
        <Input id="phone" label="Mobile number" type="tel" inputMode="numeric" placeholder="9876543210" autoComplete="tel" value={f.phone} onChange={set('phone')} error={errs.phone} />
        <Password id="password" label="Password" value={f.password} onChange={v => setF({ ...f, password: v })} error={errs.password} />
        {f.password && <div aria-live="polite"><div className="flex gap-1">{[1, 2, 3, 4].map(i => <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= sc ? (sc < 3 ? 'bg-err' : 'bg-ok') : 'bg-line'}`} />)}</div><p className="mt-1 text-xs text-muted">Strength: {['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][sc]}</p></div>}
        <Password id="confirm" label="Confirm password" value={f.confirm} onChange={v => setF({ ...f, confirm: v })} error={errs.confirm} />
        <div><label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={f.terms} onChange={e => setF({ ...f, terms: e.target.checked })} className="mt-0.5 h-4 w-4 accent-brand" />I agree to the Terms and Conditions of this demo.</label>{errs.terms && <p role="alert" className="mt-1 text-sm text-err">{errs.terms}</p>}</div>
        <Submit busy={busy}>Create Account</Submit>
        <p className="text-center text-sm text-muted">Already registered? <Link to="/login" className="font-semibold text-brand">Sign in.</Link></p>
      </form>
    </Shell>
  )
}

export function Forgot() {
  const [email, setEmail] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false); const [done, setDone] = useState(false)
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!emailOk(email)) { setErr(email ? 'Enter a valid email address.' : 'Enter your email address.'); return }
    setErr(''); setBusy(true); await sleep(); setBusy(false); setDone(true)
  }
  return (
    <Shell panel={false} title="Reset your password" sub="Enter your email to try the password recovery demo.">
      {done ? <div role="status" className="space-y-4"><p className="flex items-start gap-2 text-sm text-navy"><CheckCircle2 className="shrink-0 text-ok" aria-hidden />Demo complete. No email was sent because no email service is connected.</p><Link to="/login" className="btn-p w-full">Back to Login</Link></div>
        : <form onSubmit={submit} noValidate className="space-y-4">
          <DemoNotice>This is a demo. No real email is sent.</DemoNotice>
          <Input id="email" label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} error={err} />
          <Submit busy={busy}>Send Reset Link</Submit>
          <Link to="/login" className="block text-center text-sm font-semibold text-brand">Back to Login</Link></form>}
    </Shell>
  )
}
