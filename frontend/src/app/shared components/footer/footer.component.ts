import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-theme bg-theme-secondary/50 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-gradient-to-br from-accent-500 to-purple-500 rounded flex items-center justify-center">
              <span class="text-white font-bold text-xs">D</span>
            </div>
            <p class="text-theme-secondary text-sm">
              © 2024 devtreekz. Hecho para devs 🚀
            </p>
          </div>
          
          <div class="flex items-center gap-4">
            <a routerLink="/" class="text-theme-secondary hover:text-accent-400 transition-colors text-sm">
              Inicio
            </a>
            <a routerLink="/create" class="text-theme-secondary hover:text-accent-400 transition-colors text-sm">
              Crear perfil
            </a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
