# 🚀 Guía de Deployment - Frontend

## Pre-Deploy Checklist

- [ ] `npm run build` sin errores
- [ ] Variables de entorno configuradas
- [ ] `API_URL` apunta a servidor backend correcto
- [ ] `NEXT_PUBLIC_URL` apunta a dominio correcto
- [ ] Probado en móvil y desktop
- [ ] No hay console errors
- [ ] Imágenes optimizadas
- [ ] Performance metrics OK

## Opciones de Deployment

### 1. Vercel (Recomendado)

**Pasos:**

1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu cuenta GitHub
3. Importa repositorio
4. Configura variables de entorno:
   ```
   API_URL=https://api.tudominio.com/api
   NEXT_PUBLIC_URL=https://tudominio.com
   ```
5. Deploy automático

**Ventajas:**
- Deploy en 1 click
- Incluye SSL gratis
- CDN global automático
- Serverless functions listas
- Ambiente de preview para PRs

### 2. Netlify

**Pasos:**

1. Ve a [netlify.com](https://netlify.com)
2. Conecta GitHub
3. Configura:
   - Build: `npm run build`
   - Publish: `.next`
   - Agrega variables de entorno
4. Deploy automático

### 3. Railway

**Pasos:**

1. Ve a [railway.app](https://railway.app)
2. Crea nuevo proyecto
3. Conecta GitHub
4. Deploy automático con defaults

### 4. Render

**Pasos:**

1. Ve a [render.com](https://render.com)
2. Crea "Web Service"
3. Configura:
   - Build: `npm install && npm run build`
   - Start: `npm start`
   - Agrega variables de entorno
4. Deploy

### 5. Servidor Propio (VPS)

**Instalación Node.js:**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Deployment:**

```bash
# Clona repo
git clone <repo-url> cashtrackr-frontend
cd cashtrackr-frontend

# Instala dependencias
npm install

# Build para producción
npm run build

# Instala PM2
npm install -g pm2

# Inicia con PM2
pm2 start npm --name "cashtrackr-frontend" -- start
pm2 save
pm2 startup
```

**Con systemd:**

Crea `/etc/systemd/system/cashtrackr-frontend.service`:
```ini
[Unit]
Description=CashTrackr Frontend
After=network.target

[Service]
User=www-data
WorkingDirectory=/home/username/cashtrackr/frontend
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production
Environment=API_URL=https://api.tudominio.com/api
Environment=NEXT_PUBLIC_URL=https://tudominio.com

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable cashtrackr-frontend
sudo systemctl start cashtrackr-frontend
```

## Variables de Entorno

### Desarrollo

```
API_URL=http://localhost:4000/api
NEXT_PUBLIC_URL=http://localhost:3000
```

### Producción

```
API_URL=https://api.tudominio.com/api
NEXT_PUBLIC_URL=https://tudominio.com
```

## Configurar Dominio

### Con Vercel (Automático)

1. Ve a project settings
2. Domains
3. Agrega tu dominio
4. Configura DNS records
5. Vercel lo configura automáticamente

### Con Nginx (VPS Propio)

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tudominio.com www.tudominio.com;

    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;

    root /home/username/cashtrackr/frontend/.next/static;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Cachea archivos estáticos
    location /_next/static {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**SSL con Let's Encrypt:**

```bash
sudo certbot certonly --standalone -d tudominio.com -d www.tudominio.com
```

### Con Cloudflare

1. Agrega dominio a Cloudflare
2. Configura nameservers
3. Crea CNAME: `@` → tu-servidor-ip
4. Activa SSL flexible/full
5. Automation → Page Rules → Cache everything

## Optimizaciones Pre-Deploy

### 1. Analizar bundle

```bash
npm install -D @next/bundle-analyzer

# En next.config.mjs:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
```

```bash
ANALYZE=true npm run build
```

### 2. Optimizar imágenes

Todas las imágenes usarán `next/image`:
```tsx
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={200}
  priority
/>
```

### 3. Code splitting automático

Next.js ya hace code splitting. Verifica con:
```bash
npm run build
# Revisa el tamaño en .next/static/chunks/
```

### 4. Precargar recursos críticos

En `layout.tsx`:
```tsx
<link rel="preconnect" href="https://api.tudominio.com" />
<link rel="dns-prefetch" href="https://api.tudominio.com" />
```

## Monitoreo Post-Deploy

### Con Vercel (Automático)

1. Analytics → Performance
2. Web Vitals
3. Deployment monitoring

### Con VPS (PM2)

```bash
# Ver logs en tiempo real
pm2 logs cashtrackr-frontend

# Ver uso de memoria/CPU
pm2 monit

# Ver histórico
pm2 show cashtrackr-frontend
```

### Herramientas recomendadas

- **Sentry** - Error tracking
- **LogRocket** - User session replay
- **Datadog** - Monitoring completo

## Troubleshooting

**Build falla:**
```bash
# Limpia caché
rm -rf .next node_modules
npm install
npm run build
```

**Variables de entorno no se cargan:**
- Verifica nombres exactos
- `NEXT_PUBLIC_` solo en cliente
- Reinicia app después de cambiar

**Conecta a API pero error CORS:**
- Backend no tiene `FRONTEND_URL` correcto
- Verificar headers de CORS en backend

**Página lenta:**
- Revisa bundle size: `npm run build`
- Optimiza imágenes grandes
- Usa dynamic imports para componentes pesados

**Error 404 en rutas:**
- Verifica estructura de carpetas
- Comprueba que `page.tsx` existe
- Revisa rewrites en `next.config.mjs`

## Rollback y Recuperación

### Vercel

1. Deployments → Selecciona versión anterior
2. Click en 3 puntos → Redeploy

### VPS con Git

```bash
git log --oneline
git revert <commit>
npm run build
pm2 restart cashtrackr-frontend
```

## Actualizaciones de Dependencias

```bash
npm update
npm run build
npm start
```

Si todo OK:
```bash
git add package*.json
git commit -m "chore: update dependencies"
git push
```

Deploy automáticamente según plataforma.

## Checklist Final Antes de Deploy

- [ ] Build local sin errores
- [ ] Probado con API real
- [ ] Responsive en móvil/tablet/desktop
- [ ] Funcionales todos los formularios
- [ ] Sin console errors
- [ ] Images optimizadas
- [ ] SEO metadata correcto
- [ ] Robots.txt y sitemap.xml listos
- [ ] Analytics configurado (opcional)
- [ ] Backup de BD hecho
- [ ] Variables de entorno correctas
- [ ] Equipo backend notificado del deploy
