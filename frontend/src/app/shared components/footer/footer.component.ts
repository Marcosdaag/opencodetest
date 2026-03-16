import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-primary-700 bg-primary-800/50 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-gradient-to-br from-accent-500 to-purple-500 rounded flex items-center justify-center">
              <span class="text-white font-bold text-xs">D</span>
            </div>
            <span class="text-lg font-semibold text-white">devtreekz</span>
          </div>
          
          <p class="text-slate-400 text-sm">
            © 2026 devtreekz. La mejor forma de destacar como freelancer.
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
