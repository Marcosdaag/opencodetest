import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 glass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">
          <a routerLink="/" class="flex items-center gap-2 group">
            <div class="w-8 h-8 bg-gradient-to-br from-accent-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-white font-bold text-sm">D</span>
            </div>
            <span class="text-xl font-bold text-white">devtreekz</span>
          </a>
          
          <div class="hidden md:flex items-center gap-4">
            <a routerLink="/" class="text-slate-300 hover:text-white transition-colors text-sm">Inicio</a>
            <a routerLink="/create" class="btn-primary text-sm py-2">
              🚀 Crear mi perfil
            </a>
          </div>

          <div class="md:hidden">
            <a routerLink="/create" class="btn-primary text-sm py-1.5 px-3 text-xs">
              🚀 Crear
            </a>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}
