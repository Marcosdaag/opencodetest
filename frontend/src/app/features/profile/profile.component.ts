import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Profile } from '../../core/models/profile.model';
import { LinkCardComponent } from '../../shared components/link-card/link-card.component';
import { LoadingComponent } from '../../shared components/loading/loading.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, LinkCardComponent, LoadingComponent],
  template: `
    <div class="min-h-[calc(100vh-4rem)] py-8 px-4">
      @if (loading()) {
        <div class="flex justify-center py-20">
          <app-loading [size]="48" />
        </div>
      } @else if (notFound()) {
        <div class="max-w-md mx-auto text-center py-20">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-theme-secondary flex items-center justify-center">
            <svg class="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-theme-primary mb-2">Perfil no encontrado</h1>
          <p class="text-theme-secondary mb-6">El perfil que buscas no existe o ha sido eliminado.</p>
          <a routerLink="/" class="btn-primary">
            Volver al inicio
          </a>
        </div>
      } @else if (profile()) {
        <div class="max-w-2xl mx-auto animate-fade-up">
          <!-- Profile Header -->
          <div class="text-center mb-8">
            <!-- Avatar -->
            @if (profile()!.avatarUrl) {
              <img [src]="profile()!.avatarUrl" class="w-24 h-24 rounded-full object-cover mx-auto mb-4 shadow-lg shadow-accent-500/20">
            } @else {
              <div class="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-3xl font-bold text-theme-primary mb-4 shadow-lg shadow-accent-500/20">
                {{ profile()!.name.charAt(0).toUpperCase() }}
              </div>
            }
            <h1 class="text-3xl font-bold text-theme-primary mb-1">{{ profile()!.name }}</h1>
            @if (profile()!.jobTitle) {
              <p class="text-accent-400 text-lg mb-3">{{ profile()!.jobTitle }}</p>
            }
            @if (profile()!.bio) {
              <p class="text-theme-secondary max-w-lg mx-auto">{{ profile()!.bio }}</p>
            }
          </div>

          <!-- Links Section -->
          @if (profile()!.links.length > 0) {
            <div class="mb-8">
              <h2 class="text-lg font-semibold text-theme-primary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Links
              </h2>
              <div class="space-y-3">
                @for (link of profile()!.links; track link.id) {
                  <app-link-card [link]="link" />
                }
              </div>
            </div>
          }

          <!-- GitHub Section -->
          @if (profile()!.githubRepos.length > 0 || profile()!.githubUsername) {
            <div class="mb-8">
              <h2 class="text-lg font-semibold text-theme-primary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Proyectos Destacados
              </h2>
              <div class="grid sm:grid-cols-2 gap-4">
                @for (repo of profile()!.githubRepos; track repo.id) {
                  <a 
                    [href]="repo.url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="card group cursor-pointer"
                  >
                    <div class="flex items-start justify-between gap-2 mb-2">
                      <h3 class="text-theme-primary font-semibold group-hover:text-accent-400 transition-colors truncate">
                        {{ repo.name }}
                      </h3>
                      <div class="flex items-center gap-1 text-theme-secondary text-sm shrink-0">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        {{ repo.stars }}
                      </div>
                    </div>
                    <p class="text-theme-secondary text-sm line-clamp-2">
                      {{ repo.description || 'Sin descripción' }}
                    </p>
                  </a>
                }
              </div>
            </div>
          }

          <!-- CV Section -->
          @if (profile()!.cvUrl) {
            <div class="mb-8">
              <h2 class="text-lg font-semibold text-theme-primary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Currículum
              </h2>
              <a 
                [href]="profile()!.cvUrl" 
                target="_blank"
                class="card flex items-center gap-4 group cursor-pointer"
              >
                <div class="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg class="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-theme-primary font-semibold group-hover:text-accent-400 transition-colors">
                    Descargar CV
                  </h3>
                  <p class="text-theme-secondary text-sm">Documento PDF</p>
                </div>
                <svg class="w-5 h-5 text-slate-500 group-hover:text-accent-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          }

          <!-- QR Section -->
          @if (profile()!.qrCodeUrl) {
            <div class="mb-8">
              <h2 class="text-lg font-semibold text-theme-primary mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                Código QR
              </h2>
              
              <div class="card-static flex flex-col items-center">
                <div class="bg-white p-4 rounded-xl mb-4">
                  <img [src]="profile()!.qrCodeUrl" alt="QR Code" class="w-40 h-40">
                </div>
                
                <div class="flex gap-3">
                  <button (click)="downloadQR('png')" class="btn-primary text-sm flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    PNG
                  </button>
                  <button (click)="downloadQR('svg')" class="btn-secondary text-sm flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    SVG
                  </button>
                </div>
                <p class="text-theme-secondary text-xs mt-3">Escanea o descarga para compartir</p>
              </div>
            </div>
          }

          <!-- Share Section -->
          <div class="mt-12 pt-8 border-t border-theme">
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <p class="text-theme-secondary">Comparte este perfil:</p>
              <div class="flex gap-2">
                <button (click)="copyLink()" class="btn-ghost flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copiar enlace
                </button>
                <a [href]="shareUrl" target="_blank" class="btn-ghost flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
                <a [href]="twitterShareUrl" target="_blank" class="btn-ghost flex items-center gap-2">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter
                </a>
              </div>
            </div>
            @if (linkCopied()) {
              <p class="text-green-400 text-center mt-2 animate-fade-up">¡Enlace copiado al portapapeles!</p>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiService);
  
  profile = signal<Profile | null>(null);
  loading = signal(true);
  notFound = signal(false);
  linkCopied = signal(false);

  get shareUrl(): string {
    return window.location.href;
  }

  get twitterShareUrl(): string {
    return `https://twitter.com/intent/tweet?text=Mira%20este%20perfil&url=${encodeURIComponent(this.shareUrl)}`;
  }

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.loadProfile(username);
    } else {
      this.loading.set(false);
      this.notFound.set(true);
    }
  }

  loadProfile(username: string) {
    this.api.getProfile(username).subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.notFound.set(true);
      }
    });
  }

  copyLink() {
    navigator.clipboard.writeText(this.shareUrl).then(() => {
      this.linkCopied.set(true);
      setTimeout(() => this.linkCopied.set(false), 2000);
    });
  }

  downloadQR(format: 'png' | 'svg') {
    const qrUrl = this.profile()?.qrCodeUrl;
    if (!qrUrl) return;

    if (format === 'svg') {
      const svgContent = this.convertDataURLToSVG(qrUrl);
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      this.triggerDownload(url, `${this.profile()?.username}-qr.svg`);
      URL.revokeObjectURL(url);
    } else {
      this.triggerDownload(qrUrl, `${this.profile()?.username}-qr.png`);
    }
  }

  private convertDataURLToSVG(dataUrl: string): string {
    const img = new Image();
    img.src = dataUrl;
    
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <rect fill="white" width="400" height="400"/>
      <image href="${dataUrl}" x="0" y="0" width="400" height="400"/>
    </svg>`;
  }

  private triggerDownload(url: string, filename: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
