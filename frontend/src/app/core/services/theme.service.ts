import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  
  isDarkMode = signal<boolean>(true);
  
  private readonly STORAGE_KEY = 'devtreekz-theme';
  
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
    }
    
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.applyTheme(this.isDarkMode());
      }
    });
  }
  
  private initTheme(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.isDarkMode.set(stored === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
    }
  }
  
  private applyTheme(isDark: boolean): void {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('light');
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
  }
  
  toggleTheme(): void {
    this.isDarkMode.update(v => !v);
  }
}
