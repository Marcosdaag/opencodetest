import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ThemeToggleComponent],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 glass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">
          <a routerLink="/" (click)="scrollToTop()" class="flex items-center gap-2 group">
            <img src="icon.png" alt="devtreekz" class="w-8 h-8 group-hover:scale-110 transition-transform">
            <span class="text-xl font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent">
              devtreekz
            </span>
          </a>
          
          <div class="hidden md:flex items-center gap-4">
            <a routerLink="/" (click)="scrollToTop()" class="text-theme-secondary hover:text-theme-primary transition-colors text-sm">Inicio</a>
            <app-theme-toggle />
            <a routerLink="/create" class="btn-primary text-sm py-2">
              🚀 Crear mi perfil
            </a>
          </div>

          <div class="md:hidden flex items-center gap-2">
            <app-theme-toggle />
            <a routerLink="/create" class="btn-primary text-sm py-1.5 px-3 text-xs">
              🚀 Crear
            </a>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
