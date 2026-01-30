# CashTrackr - Frontend

Aplicación web moderna para administración de presupuestos y gastos, construida con Next.js 14 y React 18.

## 🚀 Tecnologías

- **Next.js 14** - Framework React fullstack
- **React 18** - Librería UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos CSS
- **Zod** - Validación de esquemas
- **Server Actions** - Acciones en servidor
- **Sonner** - Notificaciones (toasts)
- **Heroicons** - Iconos SVG
- **next-auth** - Autenticación

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- Variables de entorno configuradas

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/Errold146/cashtrackr-frontend
cd frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` basado en `.env.example`:

```bash
# API del Backend
API_URL=http://localhost:4000/api

# URL Pública (para Server Actions)
NEXT_PUBLIC_URL=http://localhost:3000
```

**Para Producción:**
```bash
API_URL=https://api.tudominio.com/api
NEXT_PUBLIC_URL=https://tudominio.com
```

## 🏃 Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Build para Producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
app/
├── page.tsx              # Página de inicio
├── layout.tsx            # Layout principal
├── globals.css           # Estilos globales
├── auth/
│   ├── login/            # Página de login
│   ├── register/         # Página de registro
│   ├── confirm-account/  # Confirmar cuenta
│   ├── forgot-password/  # Recuperar contraseña
│   └── new-password/     # Establecer nueva contraseña
└── admin/
    ├── page.tsx          # Dashboard
    ├── profile/          # Perfil de usuario
    ├── budgets/          # Gestión de presupuestos
    └── expenses/         # Gestión de gastos

actions/                   # Server Actions
├── auth-user-action.ts
├── create-account-action.ts
├── create-budget-action.ts
├── create-expense-action.ts
├── etc...

components/
├── auth/                 # Componentes de autenticación
├── budgets/              # Componentes de presupuestos
├── expenses/             # Componentes de gastos
├── admin/                # Componentes admin
├── profile/              # Componentes de perfil
└── ui/                   # Componentes UI reutilizables

src/
├── auth/                 # Lógica de autenticación
├── schemas/              # Esquemas Zod
├── services/             # Servicios API
└── utils/                # Funciones auxiliares
```

## 🔐 Seguridad

- ✅ Server Actions para operaciones seguras
- ✅ Validación con Zod en cliente y servidor
- ✅ Manejo de errores robusto
- ✅ Protección CSRF automática de Next.js
- ✅ HTTP-only cookies para tokens
- ✅ Validación de sesión en rutas protegidas

## 🎨 Características

- ✅ Autenticación con JWT
- ✅ Gestión de presupuestos
- ✅ Tracking de gastos
- ✅ Visualización de progreso
- ✅ Perfil de usuario
- ✅ Cambio de contraseña
- ✅ Recuperación de contraseña por email
- ✅ Confirmación de email
- ✅ Notificaciones con toasts
- ✅ UI responsiva y moderna

## 🔄 Flujos principales

### Autenticación
1. Usuario se registra con email/contraseña
2. Recibe email de confirmación
3. Confirma email y activa cuenta
4. Inicia sesión
5. Accede al dashboard

### Gestión de Presupuestos
1. Crea presupuesto con categoría y monto
2. Agrega gastos al presupuesto
3. Visualiza progreso con barra
4. Puede editar o eliminar

### Actualizar Perfil
1. Va a Perfil → Configuración
2. Modifica nombre/email
3. El sistema valida que email no exista
4. Guarda cambios en BD
5. Actualiza datos en navbar

## 🚀 Deployment

### Opción 1: Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura variables de entorno
3. Deploy automático en cada push

```bash
# Variables necesarias en Vercel:
API_URL=https://api.tudominio.com/api
NEXT_PUBLIC_URL=https://tudominio.com
```

### Opción 2: Railway/Render

1. Conecta tu repositorio
2. Usa comando: `npm run build && npm start`
3. Configura variables de entorno

### Opción 3: Servidor propio

```bash
npm install -g pm2
pm2 start ecosystem.config.js --name "cashtrackr-frontend"
pm2 save
```

## 📝 Notas de Desarrollo

- Server Actions se encuentran en `actions/`
- Componentes reutilizables en `components/ui/`
- Esquemas Zod en `src/schemas/`
- Validación en cliente Y servidor (dual validation)
- Caché revalidatePath después de cambios

## 🐛 Troubleshooting

**Error de conexión a API:**
- Verifica que `API_URL` sea correcto
- Asegúrate que el backend esté corriendo
- Revisa CORS en backend

**Errores de validación:**
- Verifica esquemas Zod en `src/schemas/`
- Comprueba que backend valide igual

**Sesión no se mantiene:**
- Verifica que cookies estén habilitadas
- Comprueba que `NEXT_PUBLIC_URL` sea correcto
- Revisa validación de sesión en `src/auth/`

## 📞 Soporte

Para reportar bugs o sugerencias, abre un issue en el repositorio.

## 👨‍💻 Autor

Errold Núñez Sánchez

## ✉️ Contacto
[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin)](https://linkedin.com/in/errold-núñez-sánchez) 
[![Email](https://img.shields.io/badge/Email-ErroldNúñezS-D14836?logo=gmail)](mailto:errold222@gmail.com)
