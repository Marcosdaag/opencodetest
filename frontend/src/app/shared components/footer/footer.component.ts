import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-theme bg-theme-secondary/50 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-center gap-2">
          <img src="icon.png" alt="devtreekz" class="w-6 h-6">
          <p class="text-theme-secondary text-sm">
            © 2026 devtreekz. Hecho para devs 🚀
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
