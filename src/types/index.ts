export interface Doctor { id: string; name: string; specialty: string; bio: string; img: string }
export interface Service { id: string; name: string; desc: string; icon: 'Stethoscope' | 'HeartPulse' | 'Sparkles' | 'Baby' }
export interface Appointment { ref: string; doctor: string; specialty: string; date: string; time: string; sample?: boolean }
export interface DemoUser { name: string; email: string }
