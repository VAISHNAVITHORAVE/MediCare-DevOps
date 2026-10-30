import { Link } from 'react-router-dom'
import { Cross, Stethoscope, FlaskConical } from 'lucide-react'
import { useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'

export const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
export const phoneOk = (v: string) => /^[6-9]\d{9}$/.test(v.replace(/^\+91[\s-]?/, '').replace(/[\s-]/g, ''))
export const sleep = (ms = 900) => new Promise(r => setTimeout(r, ms))

export const Logo = ({ light }: { light?: boolean }) => (
  <Link to="/" className="flex items-center gap-2 text-xl font-extrabold" aria-label="MediCare home">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white"><Cross size={20} aria-hidden /></span>
    <span className={light ? 'text-white' : 'text-navy'}>MediCare</span>
  </Link>
)

export function Img({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [bad, setBad] = useState(false)
  return bad
    ? <div role="img" aria-label={alt} className={`grid place-items-center bg-gradient-to-br from-brand/15 to-teal/30 text-navy ${className}`}><Stethoscope size={44} aria-hidden /></div>
    : <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} className={`object-cover ${className}`} />
}

const Wrap = ({ label, id, error, children }: { label: string; id: string; error?: string; children: ReactNode }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">{label}</label>
    {children}
    {error && <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-err">{error}</p>}
  </div>
)
const a11y = (id: string, error?: string) => ({ id, name: id, 'aria-invalid': !!error, 'aria-describedby': error ? `${id}-err` : undefined })
export const Input = ({ label, error, id, ...p }: { label: string; error?: string; id: string } & InputHTMLAttributes<HTMLInputElement>) =>
  <Wrap label={label} id={id} error={error}><input {...a11y(id, error)} {...p} className={`input ${error ? 'border-err' : ''}`} /></Wrap>
export const Select = ({ label, error, id, children, ...p }: { label: string; error?: string; id: string } & SelectHTMLAttributes<HTMLSelectElement>) =>
  <Wrap label={label} id={id} error={error}><select {...a11y(id, error)} {...p} className={`input ${error ? 'border-err' : ''}`}>{children}</select></Wrap>
export const Textarea = ({ label, error, id, ...p }: { label: string; error?: string; id: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) =>
  <Wrap label={label} id={id} error={error}><textarea rows={4} {...a11y(id, error)} {...p} className={`input ${error ? 'border-err' : ''}`} /></Wrap>

export const DemoNotice = ({ children }: { children: ReactNode }) => (
  <p className="flex items-start gap-2 rounded-xl bg-mint px-4 py-3 text-sm text-navy"><FlaskConical size={18} className="mt-0.5 shrink-0 text-teal" aria-hidden />{children}</p>
)
export const PageHead = ({ title, text }: { title: string; text: string }) => (
  <header className="bg-white py-14 text-center"><div className="wrap"><h1 className="text-3xl sm:text-4xl">{title}</h1><p className="mx-auto mt-3 max-w-2xl text-muted">{text}</p></div></header>
)
