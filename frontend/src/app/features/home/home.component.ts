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
          <div class="absolute -top-40 -right-40 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent-500/5 to-transparent rounded-full"></div>
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div class="text-center animate-stagger">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/30 text-accent-400 text-sm mb-5">
              <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
              🚀 100% Gratis · Sin registro · Instantáneo
            </div>
            
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Tu_link_personal
              <span class="block gradient-text">para devs</span>
            </h1>
            
            <p class="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-8">
              Crea tu página profesional con un solo link. Comparte tu CV, portfolio, 
              GitHub y más. Todo en un solo lugar. 🌟
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a routerLink="/create" class="btn-primary text-base px-8 py-3 animate-pulse-glow">
                🚀 Crear mi perfil
              </a>
            </div>
          </div>

          <!-- Preview Mockup -->
          <div class="mt-16 relative animate-fade-up" style="animation-delay: 0.3s">
            <div class="max-w-xs mx-auto">
              <div class="bg-primary-800 rounded-2xl p-5 border border-primary-700 shadow-2xl shadow-accent-500/10">
                <!-- Profile Header -->
                <div class="text-center mb-4">
                  <div class="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white mb-2 shadow-lg shadow-accent-500/30">
                    M
                  </div>
                  <h3 class="text-white font-semibold">Marcos Developer</h3>
                  <p class="text-accent-400 text-xs">Full Stack Developer</p>
                </div>
                
                <!-- Links -->
                <div class="space-y-2">
                  <div class="bg-primary-700/50 rounded-lg p-2.5 flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-sm">🌐</div>
                    <span class="text-white text-sm">Mi Portfolio</span>
                  </div>
                  
                  <div class="bg-primary-700/50 rounded-lg p-2.5 flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-sm">💼</div>
                    <span class="text-white text-sm">LinkedIn</span>
                  </div>
                  
                  <div class="bg-primary-700/50 rounded-lg p-2.5 flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-slate-500/20 flex items-center justify-center text-sm">💻</div>
                    <span class="text-white text-sm">GitHub</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-14 bg-primary-800/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10">
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
              ¿Por qué <span class="gradient-text">devtreekz</span>?
            </h2>
            <p class="text-slate-400 text-sm max-w-lg mx-auto">
              La herramienta perfecta para freelancers que quieren mostrar su trabajo de forma profesional
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-5">
            @for (feature of features; track feature.title; let i = $index) {
              <div class="card-static text-center group hover:border-accent-500/50" [style.animation-delay.ms]="i * 100">
                <div class="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                     [ngClass]="feature.iconBg">
                  <span [innerHTML]="feature.icon" class="text-xl"></span>
                </div>
                <h3 class="text-base font-semibold text-white mb-1">{{ feature.title }}</h3>
                <p class="text-slate-400 text-sm">{{ feature.description }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-14">
        <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="card-static gradient-border p-8">
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
              ¿Listo para destacar? ✨
            </h2>
            <p class="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
              Crea tu perfil en menos de 2 minutos. Sin registro, sin complicaciones.
            </p>
            <a routerLink="/create" class="btn-primary text-base px-8 py-3 inline-flex items-center gap-2">
              🚀 Crear mi devtreekz ahora
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
      title: '⚡ Sin registro',
      description: 'No necesitas cuenta. Crea tu perfil y comparte tu link al instante.',
      icon: '⚡',
      iconBg: 'bg-yellow-500/20'
    },
    {
      title: '💻 GitHub integrado',
      description: 'Conecta tu perfil y muestra tus proyectos destacados automáticamente.',
      icon: '💻',
      iconBg: 'bg-white/10'
    },
    {
      title: '📄 CV PDF',
      description: 'Sube tu currículum y permítelo descargar directamente.',
      icon: '📄',
      iconBg: 'bg-red-500/20'
    }
  ];
}
