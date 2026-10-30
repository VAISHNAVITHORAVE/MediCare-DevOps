# MediCare — Your Health, Our Priority

Frontend-only demo (React + TypeScript + Vite + Tailwind + React Router + Lucide). No backend, no API keys.
Login, sign-up, forgot-password, booking and contact are **simulated**; passwords and medical details are never stored.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs static files to dist/
npm run preview
```

## Images
Put photos in `public/images/` (see the README.txt there). Missing images show a placeholder.

## Nginx (static hosting, SPA routing)
```nginx
server {
  listen 80;
  root /var/www/medicare/dist;
  index index.html;
  location / { try_files $uri /index.html; }
  location /assets/ { expires 30d; add_header Cache-Control "public, immutable"; }
}
```
Direct URLs such as `/doctors` work because of `try_files`. For Ansible, copy `dist/` to `/var/www/medicare/dist` and template the config above.
