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
      <div class="absolute top-0 right-[-50px] w-[300px] h-[300px] bg-accent-500/5 rounded-full blur-[60px]"></div>
      <div class="absolute bottom-0 left-[-50px] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[60px]"></div>
    </div>
    
    <div class="flex flex-col overflow-hidden">
      <app-navbar />
      <main class="pt-16">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `
})
export class App {}
