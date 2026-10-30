/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    colors: { navy: '#12304A', brand: '#2563EB', brandHover: '#1D4ED8', teal: '#14B8A6', page: '#F3F8FE', mint: '#ECFDF5', ink: '#1E293B', muted: '#64748B', line: '#E2E8F0', ok: '#16A34A', err: '#DC2626' },
    boxShadow: { soft: '0 10px 30px -12px rgba(18,48,74,.18)' }
  } },
  plugins: []
}
