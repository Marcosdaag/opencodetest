import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared components/navbar/navbar.component';
import { FooterComponent } from './shared components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <!-- Global Background Effects - Fixed viewport, no overflow -->
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/8 rounded-full blur-[80px]"></div>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[80px]"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent-500/3 to-transparent rounded-full"></div>
    </div>
    
    <div class="min-h-screen flex flex-col">
      <app-navbar />
      <main class="flex-1 pt-16">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `
})
export class App {}
