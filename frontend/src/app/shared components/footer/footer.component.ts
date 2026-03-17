import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/50 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-center gap-2">
          <img src="icon.png" alt="devtreekz" class="w-5 h-5">
          <p class="text-[var(--text-secondary)] text-sm">
            © 2026 devtreekz
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
