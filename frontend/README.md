# devtreekz - Frontend

Frontend de la aplicación devtreekz, una plataforma tipo LinkTree diseñada específicamente para programadores freelance.

## Características

- 🎨 Diseño moderno con paleta de colores inspirada en VS Code + púrpura
- 📱 Fully responsive - se adapta a todos los dispositivos
- ⚡ Angular 20 con standalone components
- 🎯 Flujo de usuario intuitivo con wizard de 6 pasos
- 🔗 Integración completa con la API del backend
- 🔍 Búsqueda en tiempo real de repositorios GitHub
- 📄 Subida de CV en PDF con drag & drop
- 🖼️ Avatar de perfil (JPG, PNG, WEBP)
- 📱 Código QR automático con descarga en PNG/SVG
- ✨ Animaciones y transiciones suaves

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# El servidor estará disponible en http://localhost:4200
```

## Construcción

```bash
# Build para producción
npm run build

# Los archivos se generarán en dist/frontend
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Nucleo de la app
│   │   ├── services/
│   │   │   ├── api.service.ts         # Comunicación con backend
│   │   │   ├── github.service.ts     # Integración GitHub
│   │   │   └── storage.service.ts    # Upload de archivos
│   │   └── models/
│   │       ├── profile.model.ts
│   │       └── github.model.ts
│   ├── shared/                 # Componentes reutilizables
│   │   └── components/
│   │       ├── navbar/
│   │       ├── footer/
│   │       ├── link-card/
│   │       ├── repo-card/
│   │       └── loading/
│   └── features/
│       ├── home/               # Landing page
│       ├── create-profile/     # Wizard de creación
│       └── profile/           # Vista pública
├── styles.scss                 # Estilos globales + Tailwind
└── index.html
```

## Flujo de Usuario

1. **Landing Page**: Introducción y call-to-action
2. **Crear Perfil** (Wizard de 6 pasos):
   - Paso 1: Elegir username único
   - Paso 2: Información personal + Avatar
   - Paso 3: Agregar links (1 Portfolio, 1 LinkedIn, 1 GitHub, 1 CV + ilimitados personalizados)
   - Paso 4: Conectar GitHub y seleccionar proyectos destacados
   - Paso 5: Subir CV en PDF
   - Paso 6: Vista previa antes de publicar
3. **Perfil Público**: Vista pública del perfil en `/:username`

## Configuración

### URL del Backend

Por defecto, el frontend se conecta a `http://localhost:3000/api`. 
Para cambiar la URL, editar:

- `src/app/core/services/api.service.ts`
- `src/app/core/services/github.service.ts`
- `src/app/core/services/storage.service.ts`

## Diseño Visual

### Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Primary Dark | `#0f172a` | Background |
| Primary | `#1e293b` | Cards, superficies |
| Accent | `#3b82f6` | Botones, links |
| Accent Light | `#60a5fa` | Hover states |
| Purple | `#8b5cf6` | Gradientes, acentos |
| Text | `#f8fafc` | Texto principal |
| Text Secondary | `#94a3b8` | Texto secundario |

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

## Stack Tecnológico

- **Framework**: Angular 20
- **Estilos**: Tailwind CSS 3
- **HTTP**: @angular/common/http
- **Animaciones**: @angular/animations

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Iniciar servidor de desarrollo |
| `npm run build` | Construir para producción |
| `npm run watch` | Construir en modo watch |

## Licencia

MIT
