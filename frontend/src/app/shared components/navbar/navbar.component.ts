import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 glass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a routerLink="/" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-300 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span class="text-xl font-bold text-white">FreeLink</span>
          </a>
          
          <div class="hidden md:flex items-center gap-4">
            <a routerLink="/" class="text-slate-300 hover:text-white transition-colors">Inicio</a>
            <a routerLink="/create" class="btn-primary text-sm">
              Crear mi LinkTree
            </a>
          </div>

          <div class="md:hidden">
            <a routerLink="/create" class="btn-primary text-sm py-2 px-4">
              Crear
            </a>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}
