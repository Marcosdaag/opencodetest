# FreeLink - LinkTree para Freelancers

Plataforma tipo LinkTree diseñada específicamente para programadores freelance. Crea tu página profesional con un solo link y muestra tu CV, portfolio, GitHub y LinkedIn.

## Características

- 🎨 Diseño moderno con paleta de colores inspirada en VS Code
- 📱 Fully responsive - se adapta a todos los dispositivos
- 🔗 Integración con GitHub API para mostrar proyectos destacados
- 📄 Subida de CV en PDF
- ⚡ Perfiles inmutables - una vez creados no se pueden editar
- 📚 Documentación completa con Swagger

## Estructura del Proyecto

```
freelink/
├── backend/                 # API REST con NestJS
│   ├── src/
│   │   ├── main.ts         # Punto de entrada
│   │   ├── app.module.ts   # Módulo principal
│   │   ├── prisma/        # Conexión a base de datos
│   │   ├── profiles/       # Gestión de perfiles
│   │   ├── github/        # Integración con GitHub
│   │   └── storage/       # Upload de archivos (Supabase)
│   ├── prisma/            # Schema de base de datos
│   ├── .env               # Variables de entorno
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/               # SPA con Angular 20
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/      # Servicios y modelos
│   │   │   ├── shared/    # Componentes reutilizables
│   │   │   └── features/  # Páginas principales
│   │   ├── styles.scss    # Estilos globales + Tailwind
│   │   └── index.html
│   ├── tailwind.config.js
│   ├── angular.json
│   ├── package.json
│   └── README.md
│
└── README.md              # Este archivo
```

## Quick Start

### Requisitos

- Node.js 18+
- npm
- Base de datos PostgreSQL (Supabase)
- Bucket de Supabase Storage para CVs

### Instalación y Ejecución

```bash
# 1. Backend
cd backend
npm install
npm run start:dev

# 2. Frontend (en otra terminal)
cd frontend
npm install
npm start
```

### URLs

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:3000/api |
| Swagger Docs | http://localhost:3000/doc |

## Backend

### Tecnologías

- **Framework**: NestJS
- **ORM**: Prisma
- **Base de datos**: PostgreSQL (Supabase)
- **Storage**: Supabase Storage
- **API Externa**: GitHub API
- **Documentación**: Swagger/OpenAPI

### Endpoints API

#### Perfiles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/profiles/check/:username` | Verificar disponibilidad de username |
| POST | `/api/profiles` | Crear nuevo perfil (inmutable) |
| GET | `/api/profiles/:username` | Obtener perfil público |
| GET | `/api/profiles/:username/links` | Obtener solo los links |

#### GitHub

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/github/repos/:username` | Obtener repositorios |
| GET | `/api/github/repos/:username?search=term` | Filtrar repositorios |

#### Storage

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/storage/upload` | Subir archivo PDF (CV) |

### Modelos de Base de Datos

```prisma
model Profile {
  id              String         @id @default(uuid())
  username       String         @unique
  name           String
  jobTitle       String?
  bio            String?
  githubUsername String?
  linkedinUrl    String?
  cvUrl          String?
  links          Link[]
  githubRepos    FeaturedRepo[]
  createdAt      DateTime       @default(now())
}

model Link {
  id        String   @id @default(uuid())
  type      LinkType
  url       String
  title     String
  order     Int      @default(0)
  profileId String
  profile   Profile  @relation(...)
}

model FeaturedRepo {
  id          String   @id @default(uuid())
  name        String
  description String?
  url         String
  stars       Int
  profileId   String
  profile     Profile  @relation(...)
}

enum LinkType {
  CV
  PORTFOLIO
  LINKEDIN
  GITHUB
  CUSTOM
}
```

### Variables de Entorno

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
PORT=3000
SUPABASE_URL="https://..."
SUPABASE_ANON_KEY="..."
SUPABASE_STORAGE_BUCKET="cvs"
GITHUB_TOKEN=""  # Opcional
```

## Frontend

### Tecnologías

- **Framework**: Angular 20 (standalone components)
- **Estilos**: Tailwind CSS 3
- **HTTP**: @angular/common/http
- **Animaciones**: @angular/animations

### Páginas

1. **/** - Landing page con información y call-to-action
2. **/create** - Wizard de 6 pasos para crear perfil
3. **/:username** - Vista pública del perfil

### Flujo de Usuario

```
Landing → Crear Perfil (Wizard)
  ├── 1. Username único
  ├── 2. Información personal
  ├── 3. Links (portfolio, LinkedIn, etc.)
  ├── 4. GitHub (seleccionar repos destacados)
  ├── 5. CV PDF
  └── 6. Preview → Publicar

Perfil Público →/:username
```

### Diseño Visual

#### Paleta de Colores (VS Code Inspired)

| Color | Hex | Uso |
|-------|-----|-----|
| Primary Dark | `#0f172a` | Background |
| Primary | `#1e293b` | Cards, superficies |
| Accent | `#3b82f6` | Botones, links |
| Accent Light | `#60a5fa` | Hover states |
| Text | `#f8fafc` | Texto principal |
| Text Secondary | `#94a3b8` | Texto secundario |

#### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Scripts Disponibles

### Backend

| Comando | Descripción |
|---------|-------------|
| `npm run start:dev` | Iniciar servidor de desarrollo |
| `npm run build` | Construir para producción |
| `npm run prisma:generate` | Generar cliente de Prisma |
| `npm run prisma:migrate` | Ejecutar migraciones |

### Frontend

| Comando | Descripción |
|---------|-------------|
| `npm start` | Iniciar servidor de desarrollo |
| `npm run build` | Construir para producción |

## Configuración de Producción

### Supabase

1. Crear proyecto en Supabase
2. Configurar bucket de Storage para CVs
3. Actualizar credenciales en `.env`

### Deployment

El proyecto está listo para desplegar en:
- **Backend**: Vercel, Railway, Render, Heroku
- **Frontend**: Vercel, Netlify, Firebase Hosting

## Licencia

MIT
