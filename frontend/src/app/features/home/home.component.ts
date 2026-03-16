import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-[calc(100vh-4rem)]">
      <!-- Hero Section -->
      <section class="relative overflow-hidden">
        <!-- Background Effects -->
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute -top-40 -right-40 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl"></div>
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div class="text-center animate-stagger">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm mb-6">
              <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
              100% Gratis · Sin registro · Instantáneo
            </div>
            
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Tu_link_personal
              <span class="block gradient-text">para freelance</span>
            </h1>
            
            <p class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Crea tu página profesional con un solo link. Comparte tu CV, portfolio, 
              GitHub y LinkedIn. Todo en un solo lugar.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a routerLink="/create" class="btn-primary text-lg px-8 py-4 animate-pulse-glow">
                Crear mi LinkTree
                <svg class="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <span class="text-slate-500 text-sm">Es gratis · Takes 2 minutes</span>
            </div>
          </div>

          <!-- Preview Mockup -->
          <div class="mt-20 relative animate-fade-up" style="animation-delay: 0.3s">
            <div class="max-w-sm mx-auto">
              <div class="bg-primary-800 rounded-2xl p-6 border border-primary-700 shadow-2xl">
                <!-- Profile Header -->
                <div class="text-center mb-6">
                  <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-2xl font-bold text-white mb-3">
                    M
                  </div>
                  <h3 class="text-white font-semibold text-lg">Marcos Developer</h3>
                  <p class="text-accent-400 text-sm">Full Stack Developer</p>
                </div>
                
                <!-- Links -->
                <div class="space-y-3">
                  <div class="bg-primary-700/50 rounded-lg p-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <span class="text-white text-sm">Mi Portfolio</span>
                  </div>
                  
                  <div class="bg-primary-700/50 rounded-lg p-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <span class="text-white text-sm">LinkedIn</span>
                  </div>
                  
                  <div class="bg-primary-700/50 rounded-lg p-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-slate-500/20 flex items-center justify-center">
                      <svg class="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <span class="text-white text-sm">GitHub Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-primary-800/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Por qué FreeLink?
            </h2>
            <p class="text-slate-400 text-lg max-w-2xl mx-auto">
              La herramienta perfecta para freelancers que quieren mostrar su trabajo de forma profesional
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            @for (feature of features; track feature.title) {
              <div class="card-static text-center group">
                <div class="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                     [ngClass]="feature.iconBg">
                  <span [innerHTML]="feature.icon" class="w-7 h-7"></span>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">{{ feature.title }}</h3>
                <p class="text-slate-400">{{ feature.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="card-static gradient-border p-12">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para destacar?
            </h2>
            <p class="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Crea tu perfil en menos de 2 minutos. Sin registro, sin complicaciones.
            </p>
            <a routerLink="/create" class="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
              Crear mi LinkTree ahora
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent {
  features = [
    {
      title: 'Sin registro',
      description: 'No necesitas cuenta. Crea tu perfil y comparte tu link al instante.',
      icon: '<svg class="w-7 h-7 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>',
      iconBg: 'bg-accent-500/20'
    },
    {
      title: 'GitHub integrado',
      description: 'Conecta tu perfil de GitHub y muestra tus proyectos destacados automáticamente.',
      icon: '<svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
      iconBg: 'bg-white/10'
    },
    {
      title: 'CV PDF',
      description: 'Sube tu currículum y permítelo descargar directamente desde tu perfil.',
      icon: '<svg class="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>',
      iconBg: 'bg-red-500/20'
    }
  ];
}
