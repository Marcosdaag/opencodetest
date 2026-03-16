# devtreekz - Backend

Backend desarrollado con NestJS, Prisma ORM y Supabase para una aplicación tipo LinkTree orientada a programadores freelance.

## Características

- **Perfiles inmutables**: Una vez creado un perfil, no puede ser editado. Para cambios, se debe crear un nuevo perfil con otro username.
- **Username personalizado**: Cada programador tiene su propia URL pública (`/:username`).
- **Avatar de perfil**: Imagen JPG, PNG o WEBP (máx 4MB)
- **Links restrictivos**:
  - **CV**: Documento PDF almacenado en Supabase Storage
  - **Portfolio**: Cualquier URL
  - **LinkedIn**: Debe ser una URL válida de perfil de LinkedIn
  - **GitHub**: Debe ser una URL de perfil de GitHub (no repositorio)
- **Integración con GitHub API**: Obtiene repositorios del usuario y permite filtrar en tiempo real para seleccionar proyectos destacados.

## Requisitos

- Node.js 18+
- npm o yarn
- Base de datos PostgreSQL (Supabase)
- Buckets de Supabase Storage: `cvs` (PDF) y `avatars` (imágenes)

## Instalación

1. Clonar el repositorio
2. Ir a la carpeta `backend`
3. Instalar dependencias:

```bash
npm install
```

4. Configurar variables de entorno en `.env` (ya configurado con Supabase)

5. Generar el cliente de Prisma:

```bash
npm run prisma:generate
```

6. Ejecutar migraciones:

```bash
npm run prisma:migrate
```

7. Iniciar el servidor:

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

El servidor estará disponible en `http://localhost:3000/api`

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | URL de conexión a Supabase (pooler) | `postgresql://...` |
| `DIRECT_URL` | URL directa a Supabase (para migraciones) | `postgresql://...` |
| `PORT` | Puerto del servidor | `3000` |
| `SUPABASE_URL` | URL del proyecto Supabase | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Clave anónima de Supabase | `eyJ...` |
| `SUPABASE_STORAGE_BUCKET` | Nombre del bucket de Storage | `cvs` |
| `GITHUB_TOKEN` | Token de GitHub (opcional, para mayor rate limit) | `ghp_...` |

## Endpoints API

### Perfiles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/profiles/check/:username` | Verificar si username está disponible |
| POST | `/profiles` | Crear un nuevo perfil (inmutable) |
| GET | `/profiles/:username` | Obtener perfil público completo |
| GET | `/profiles/:username/links` | Obtener solo los links de un perfil |
| GET | `/profiles/:username/qr` | Obtener código QR del perfil |

#### Ejemplo: Crear perfil

```bash
curl -X POST http://localhost:3000/api/profiles \
  -H "Content-Type: application/json" \
  -d '{
    "username": "marcosdev",
    "name": "Marcos Developer",
    "jobTitle": "Full Stack Developer",
    "bio": "Desarrollador con 5 años de experiencia en Node.js y React",
    "avatarUrl": "https://...",
    "githubUrl": "github.com/marcosdev",
    "linkedinUrl": "https://www.linkedin.com/in/marcosdev",
    "cvUrl": "https://...",
    "links": [
      {
        "type": "PORTFOLIO",
        "url": "https://marcosdev.com",
        "title": "Mi Portfolio"
      },
      {
        "type": "GITHUB",
        "url": "github.com/marcosdev"
      }
    ],
    "featuredRepos": [
      {
        "name": "my-awesome-project",
        "description": "Un proyecto increíble",
        "url": "https://github.com/marcosdev/my-awesome-project",
        "stars": 50
      }
    ]
  }'
```

### GitHub

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/github/repos/:username` | Obtener repositorios de un usuario |
| GET | `/github/repos/:username?search=term` | Filtrar repositorios por término |

#### Ejemplo: Obtener repos

```bash
# Todos los repositorios
curl "http://localhost:3000/api/github/repos/octocat"

# Filtrar por búsqueda
curl "http://localhost:3000/api/github/repos/octocat?search=hello"
```

### Storage

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/storage/upload` | Subir archivo PDF (CV) |
| POST | `/storage/avatar` | Subir imagen de perfil (JPG, PNG, WEBP, máx 4MB) |

#### Ejemplo: Subir CV

```bash
curl -X POST http://localhost:3000/api/storage/upload \
  -F "file=@/path/to/cv.pdf"
```

#### Ejemplo: Subir Avatar

```bash
curl -X POST http://localhost:3000/api/storage/avatar \
  -F "file=@/path/to/avatar.png"
```

## Validaciones

- **Username**: 30 caracteres máximo, solo letras, números, guiones y guiones bajos
- **Nombre**: 100 caracteres máximo
- **Bio**: 800 caracteres máximo
- **Título de link**: 100 caracteres máximo (requerido solo para tipo CUSTOM)
- **URL de LinkedIn**: Debe contener `/in/` o `/pub/` (perfil válido)
- **URL de GitHub**: Debe ser `github.com/username` (perfil de usuario, no repositorio)
- **CV**: Solo archivos PDF
- **Avatar**: Solo JPG, PNG o WEBP, máximo 4MB

## Tecnologías

- **Framework**: NestJS
- **ORM**: Prisma
- **Base de datos**: PostgreSQL (Supabase)
- **Storage**: Supabase Storage
- **API externa**: GitHub API
- **Documentación**: Swagger/OpenAPI

## Estructura del Proyecto

```
backend/
├── src/
│   ├── main.ts                 # Punto de entrada
│   ├── app.module.ts           # Módulo principal
│   ├── prisma/                 # Módulo de Prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── profiles/               # Módulo de perfiles
│   │   ├── profiles.module.ts
│   │   ├── profiles.controller.ts
│   │   ├── profiles.service.ts
│   │   ├── profiles.repository.ts
│   │   └── dto/
│   │       └── profiles.dto.ts
│   ├── github/                # Módulo de GitHub
│   │   ├── github.module.ts
│   │   ├── github.service.ts
│   │   └── github.controller.ts
│   └── storage/               # Módulo de Storage
│       ├── storage.module.ts
│       ├── storage.service.ts
│       └── storage.controller.ts
├── prisma/
│   ├── schema.prisma          # Esquema de base de datos
│   └── migrations/            # Migraciones
├── .env                       # Variables de entorno
├── package.json
├── tsconfig.json
└── nest-cli.json
```

## Swagger

Documentación disponible en: `http://localhost:3000/doc`

## Licencia

MIT
