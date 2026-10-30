import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Appointment, DemoUser } from '../types'
interface Ctx { user: DemoUser | null; signIn: (u: DemoUser) => void; signOut: () => void; appts: Appointment[]; addAppt: (a: Appointment) => void }
const C = createContext<Ctx>(null!)
const KEY = 'medicare-demo-user' // non-sensitive: display name + email only. Never passwords.
export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => { try { return JSON.parse(sessionStorage.getItem(KEY) || 'null') } catch { return null } })
  const [appts, setAppts] = useState<Appointment[]>([])
  const signIn = (u: DemoUser) => { setUser(u); try { sessionStorage.setItem(KEY, JSON.stringify(u)) } catch { /* ignore */ } }
  const signOut = () => { setUser(null); try { sessionStorage.removeItem(KEY) } catch { /* ignore */ } }
  return <C.Provider value={{ user, signIn, signOut, appts, addAppt: a => setAppts(p => [a, ...p]) }}>{children}</C.Provider>
}
export const useApp = () => useContext(C)
