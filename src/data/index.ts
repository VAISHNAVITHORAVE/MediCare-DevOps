import type { Doctor, Service, Appointment } from '../types'
// Fictional demonstration data. Drop photos into public/images/ using the file names below.
export const doctors: Doctor[] = [
  { id: 'aditi-sharma', name: 'Dr. Aditi Sharma', specialty: 'General Physician', bio: 'Sample profile for everyday health consultations and routine check-ups.', img: '/images/doctor-1.jpg' },
  { id: 'rohan-mehta', name: 'Dr. Rohan Mehta', specialty: 'Cardiologist', bio: 'Sample profile for heart and circulation related consultations.', img: '/images/doctor-2.jpg' },
  { id: 'neha-patil', name: 'Dr. Neha Patil', specialty: 'Dermatologist', bio: 'Sample profile for skin, hair and nail related consultations.', img: '/images/doctor-3.jpg' },
  { id: 'arjun-desai', name: 'Dr. Arjun Desai', specialty: 'Pediatrician', bio: 'Sample profile for infant, child and adolescent care.', img: '/images/doctor-4.jpg' }
]
export const services: Service[] = [
  { id: 'General Physician', name: 'General Medicine', desc: 'Routine consultations and everyday health concerns.', icon: 'Stethoscope' },
  { id: 'Cardiologist', name: 'Cardiology', desc: 'Consultations focused on heart and circulation.', icon: 'HeartPulse' },
  { id: 'Dermatologist', name: 'Dermatology', desc: 'Consultations for skin, hair and nail concerns.', icon: 'Sparkles' },
  { id: 'Pediatrician', name: 'Pediatrics', desc: 'Care consultations for infants, children and teens.', icon: 'Baby' }
]
export const specialties = services.map(s => s.id)
export const slots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
export const sampleHistory: Appointment[] = [
  { ref: 'SAMPLE-0001', doctor: 'Dr. Aditi Sharma', specialty: 'General Physician', date: '2026-08-12', time: '10:00 AM', sample: true },
  { ref: 'SAMPLE-0002', doctor: 'Dr. Neha Patil', specialty: 'Dermatologist', date: '2026-06-03', time: '03:00 PM', sample: true }
]
export const faqs = [
  ['How can I request an appointment?', 'Open Book Appointment, choose a specialty and doctor, pick a date and time, then submit the request.'],
  ['Can I choose a doctor?', 'Yes. Filter by specialty, then pick any doctor in the directory, or start from a doctor card.'],
  ['How do I access my dashboard?', 'Sign in with the demo login or create a demo account, then open Dashboard from the menu.'],
  ['Is this a real hospital booking service?', 'No. MediCare is a frontend demonstration. No real appointment is made.'],
  ['Is my information stored?', 'No passwords or medical details are stored. Only a non-sensitive demo name and email live in this browser tab session.']
]
