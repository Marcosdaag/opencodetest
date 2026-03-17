import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared components/navbar/navbar.component';
import { FooterComponent } from './shared components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <!-- Global Background Effects -->
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div class="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-accent-500/10 rounded-full blur-[60px]"></div>
      <div class="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[60px]"></div>
    </div>
    
    <div class="flex flex-col" style="min-height: 100vh;">
      <app-navbar />
      <main class="flex-1 pt-16">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `
})
export class App {}
