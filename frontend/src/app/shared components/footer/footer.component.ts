import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-primary-700 bg-primary-800/50 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-gradient-to-br from-accent-500 to-accent-300 rounded flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span class="text-lg font-semibold text-white">FreeLink</span>
          </div>
          
          <p class="text-slate-400 text-sm">
            © 2026 FreeLink. La mejor forma de mostrar tu trabajo.
          </p>
          
          <div class="flex gap-4">
            <a routerLink="/" class="text-slate-400 hover:text-accent-400 transition-colors text-sm">
              Inicio
            </a>
            <a routerLink="/create" class="text-slate-400 hover:text-accent-400 transition-colors text-sm">
              Crear perfil
            </a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
