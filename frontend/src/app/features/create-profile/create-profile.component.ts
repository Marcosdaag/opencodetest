import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { ApiService } from '../../core/services/api.service';
import { GithubService } from '../../core/services/github.service';
import { StorageService } from '../../core/services/storage.service';
import { CreateProfileDto, CreateLinkDto, LinkType } from '../../core/models/profile.model';
import { GithubRepo } from '../../core/models/github.model';
import { LoadingComponent } from '../../shared components/loading/loading.component';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' }))
      ])
    ])
  ],
  template: `
    <div class="min-h-[calc(100vh-4rem)] py-6 px-4">
      <div class="max-w-xl mx-auto">
        <!-- Progress Bar Compact -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            @for (step of steps; track step.id; let i = $index) {
              <div class="flex items-center" [class.flex-1]="i < steps.length - 1">
                <div class="flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium transition-all duration-300"
                     [class.bg-accent-500]="currentStep() >= i + 1"
                     [class.text-theme-primary]="currentStep() >= i + 1"
                     [class.bg-theme-secondary]="currentStep() < i + 1"
                     [class.text-theme-secondary]="currentStep() < i + 1">
                  @if (currentStep() > i + 1) {
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  } @else {
                    {{ i + 1 }}
                  }
                </div>
                @if (i < steps.length - 1) {
                  <div class="flex-1 h-0.5 mx-1 transition-all duration-300"
                       [class.bg-accent-500]="currentStep() > i + 1"
                       [class.bg-theme-secondary]="currentStep() <= i + 1">
                  </div>
                }
              </div>
            }
          </div>
          <div class="text-center">
            <span class="text-theme-secondary text-xs">Paso {{ currentStep() }} de {{ steps.length }}</span>
          </div>
        </div>

        <!-- Step Content -->
        <div class="card-static p-5">
          @switch (currentStep()) {
            @case (1) {
              <div @slide>
                <h2 class="text-xl font-bold text-theme-primary mb-1">Elige tu username</h2>
                <p class="text-theme-secondary text-sm mb-4">Tu enlace: devtreekz.com&#x2F;{{ username || 'tu-nombre' }}</p>
                
                <div class="mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-theme-secondary text-sm">devtreekz.com/</span>
                    <input 
                      type="text" 
                      [(ngModel)]="username" 
                      (ngModelChange)="checkUsername()"
                      class="input-field flex-1 text-sm py-2"
                      placeholder="tu-nombre"
                      maxlength="30"
                    >
                  </div>
                  @if (usernameChecking) {
                    <p class="text-theme-secondary text-xs mt-1">Verificando...</p>
                  } @else if (username) {
                    @if (usernameAvailable === true) {
                      <p class="text-green-400 text-xs mt-1 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        ¡Disponible!
                      </p>
                    } @else if (usernameAvailable === false) {
                      <p class="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        No disponible
                      </p>
                    }
                  }
                </div>
              </div>
            }
            
            @case (2) {
              <div @slide>
                <h2 class="text-xl font-bold text-theme-primary mb-1">Información personal</h2>
                <p class="text-theme-secondary text-sm mb-4">Cuéntanos quién eres</p>
                
                <!-- Avatar Upload -->
                <div class="mb-4 flex items-center gap-4">
                  <div class="relative">
                    @if (avatarPreview()) {
                      <img [src]="avatarPreview()" class="w-16 h-16 rounded-full object-cover border-2 border-accent-500">
                    } @else {
                      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-theme-primary border-2 border-theme">
                        {{ name.charAt(0).toUpperCase() || '?' }}
                      </div>
                    }
                    <label class="absolute bottom-0 right-0 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent-400 transition-colors">
                      <svg class="w-3 h-3 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input type="file" accept="image/jpeg,image/png,image/webp" class="hidden" (change)="onAvatarSelect($event)">
                    </label>
                  </div>
                  <div class="text-xs text-theme-secondary">
                    @if (avatarUploading) {
                      <span class="text-accent-400">Subiendo...</span>
                    } @else {
                      <span>JPG, PNG o WEBP (máx 4MB)</span>
                    }
                  </div>
                </div>
                
                <div class="space-y-3">
                  <div>
                    <label class="block text-slate-300 text-xs mb-1">Nombre completo *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="name"
                      class="input-field text-sm py-2"
                      placeholder="Juan Pérez"
                      maxlength="100"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-slate-300 text-xs mb-1">Título profesional</label>
                    <input 
                      type="text" 
                      [(ngModel)]="jobTitle"
                      class="input-field text-sm py-2"
                      placeholder="Desarrollador Full Stack"
                      maxlength="100"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-slate-300 text-xs mb-1">Bio</label>
                    <textarea 
                      [(ngModel)]="bio"
                      class="input-field text-sm py-2 min-h-[80px] resize-none"
                      placeholder="Cuéntanos sobre ti..."
                      maxlength="800"
                    ></textarea>
                    <p class="text-theme-secondary text-xs mt-1 text-right">{{ bio.length || 0 }}/800</p>
                  </div>
                </div>
              </div>
            }
            
            @case (3) {
              <div @slide>
                <h2 class="text-xl font-bold text-theme-primary mb-1">Agrega tus links</h2>
                <p class="text-theme-secondary text-sm mb-4">Añade tu portfolio, LinkedIn y más</p>
                
                <div class="space-y-3 mb-4">
                  @for (link of links; track $index) {
                    <div class="bg-theme-secondary/50 rounded-lg p-3">
                      <div class="flex items-center gap-2 mb-2">
                        <select [(ngModel)]="link.type" class="input-field text-xs py-1.5 w-32">
                          <option value="PORTFOLIO" [disabled]="hasLinkType('PORTFOLIO')">🌐 Portfolio</option>
                          <option value="LINKEDIN" [disabled]="hasLinkType('LINKEDIN')">💼 LinkedIn</option>
                          <option value="GITHUB" [disabled]="hasLinkType('GITHUB')">💻 GitHub</option>
                          <option value="CV" [disabled]="hasLinkType('CV')">📄 CV</option>
                          <option value="CUSTOM">✨ Personalizado</option>
                        </select>
                        @if (link.type === 'CUSTOM') {
                          <input 
                            type="text" 
                            [(ngModel)]="link.title"
                            class="input-field text-xs py-1.5 flex-1"
                            placeholder="Título del link"
                          >
                        } @else {
                          <span class="text-xs text-theme-secondary flex-1">
                            {{ getLinkTypeName(link.type) }}
                          </span>
                        }
                        <button (click)="removeLink($index)" class="text-theme-secondary hover:text-red-400 transition-colors p-1">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <input 
                        type="url" 
                        [(ngModel)]="link.url"
                        class="input-field text-xs py-1.5"
                        placeholder="https://"
                      >
                    </div>
                  }
                </div>
                
                <button (click)="addLink()" class="btn-ghost w-full text-xs py-2 flex items-center justify-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  @if (links.length === 0) {
                    Agregar link
                  } @else {
                    + Personalizado
                  }
                </button>
                @if (links.length >= 4) {
                  <p class="text-theme-secondary text-xs text-center mt-2">Máximo 1 de cada tipo (Portfolio, LinkedIn, GitHub, CV) + ilimitados personalizados</p>
                }
              </div>
            }
            
            @case (4) {
              <div @slide>
                <h2 class="text-xl font-bold text-theme-primary mb-1">Conecta GitHub</h2>
                <p class="text-theme-secondary text-sm mb-4">Selecciona hasta 5 repositorios destacados</p>
                
                <div class="mb-3">
                  <label class="block text-slate-300 text-xs mb-1">Tu usuario de GitHub</label>
                  <input 
                    type="text" 
                    [(ngModel)]="githubUsername"
                    (ngModelChange)="searchGithubRepos()"
                    class="input-field text-sm py-2"
                    placeholder="tu-usuario"
                  >
                </div>
                
                @if (githubRepos().length > 0) {
                  <div class="mb-3">
                    <input 
                      type="text" 
                      [(ngModel)]="githubSearch"
                      (ngModelChange)="filterRepos()"
                      class="input-field text-xs py-1.5"
                      placeholder="🔍 Buscar..."
                    >
                  </div>
                  
                  <div class="space-y-1 max-h-48 overflow-y-auto">
                    @for (repo of filteredRepos(); track repo.id) {
                      <div 
                        class="flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all text-xs"
                        [class.bg-accent-500/20]="isRepoSelected(repo)"
                        [class.bg-theme-secondary/30]="!isRepoSelected(repo)"
                        (click)="toggleRepo(repo)"
                      >
                        <div class="w-4 h-4 rounded border flex items-center justify-center"
                             [class.border-accent-500]="isRepoSelected(repo)"
                             [class.border-slate-500]="!isRepoSelected(repo)">
                          @if (isRepoSelected(repo)) {
                            <svg class="w-2 h-2 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          }
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-theme-primary font-medium truncate">{{ repo.name }}</p>
                        </div>
                        <div class="flex items-center gap-1 text-theme-secondary">
                          ⭐ {{ repo.stargazers_count }}
                        </div>
                      </div>
                    }
                  </div>
                  <p class="text-theme-secondary text-xs mt-2">{{ selectedRepos().length }}/5 seleccionados</p>
                }
              </div>
            }
            
            @case (5) {
              <div @slide>
                <h2 class="text-xl font-bold text-theme-primary mb-1">Sube tu CV</h2>
                <p class="text-theme-secondary text-sm mb-4">Añade tu currículum en PDF</p>
                
                @if (!cvFile && !cvUrl) {
                  <div 
                    class="border-2 border-dashed border-theme rounded-lg p-6 text-center cursor-pointer hover:border-accent-500 transition-colors"
                    (click)="fileInput.click()"
                    (dragover)="onDragOver($event)"
                    (drop)="onDrop($event)"
                  >
                    <input 
                      #fileInput 
                      type="file" 
                      accept="application/pdf"
                      class="hidden"
                      (change)="onFileSelect($event)"
                    >
                    <svg class="w-10 h-10 mx-auto text-theme-secondary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-theme-secondary text-sm">📄 Arrastra o haz clic</p>
                    <p class="text-theme-secondary text-xs mt-1">Máximo 10MB</p>
                  </div>
                }
                
                @if (cvFile) {
                  <div class="bg-theme-secondary/50 rounded-lg p-3 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-theme-primary text-sm font-medium truncate">{{ cvFile.name }}</p>
                      <p class="text-theme-secondary text-xs">{{ (cvFile.size / 1024 / 1024).toFixed(2) }} MB</p>
                    </div>
                    <button (click)="removeCv()" class="text-theme-secondary hover:text-red-400 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                }
                
                @if (cvUploading) {
                  <div class="mt-3">
                    <div class="h-1.5 bg-theme-secondary rounded-full overflow-hidden">
                      <div class="h-full bg-accent-500 transition-all duration-300" [style.width.%]="uploadProgress"></div>
                    </div>
                    <p class="text-theme-secondary text-xs mt-1">Subiendo... {{ uploadProgress }}%</p>
                  </div>
                }
              </div>
            }
            
            @case (6) {
              <div @slide>
                <h2 class="text-xl font-bold text-theme-primary mb-1">Vista previa</h2>
                <p class="text-theme-secondary text-sm mb-4">Así se verá tu perfil</p>
                
                <div class="bg-theme-secondary/50 rounded-xl p-4">
                  <div class="text-center mb-4">
                    @if (avatarPreview()) {
                      <img [src]="avatarPreview()" class="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-accent-500">
                    } @else {
                      <div class="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-theme-primary mb-2">
                        {{ name.charAt(0).toUpperCase() || '?' }}
                      </div>
                    }
                    <h3 class="text-theme-primary font-semibold text-lg">{{ name || 'Tu nombre' }}</h3>
                    @if (jobTitle) {
                      <p class="text-accent-400 text-sm">{{ jobTitle }}</p>
                    }
                    @if (bio) {
                      <p class="text-theme-secondary text-xs mt-2">{{ bio }}</p>
                    }
                  </div>
                  
                  @if (links.length > 0) {
                    <div class="space-y-2 mb-3">
                      @for (link of links; track $index) {
                        <div class="bg-theme-tertiary rounded-lg p-2 flex items-center gap-2">
                          <span class="text-lg">{{ getLinkEmoji(link.type) }}</span>
                          <span class="text-theme-primary text-sm">{{ getLinkDisplayTitle(link) }}</span>
                        </div>
                      }
                    </div>
                  }
                  
                  @if (selectedRepos().length > 0) {
                    <div class="border-t border-theme pt-3 mt-3">
                      <p class="text-theme-secondary text-xs">💻 {{ selectedRepos().length }} proyectos destacados</p>
                    </div>
                  }
                  
                  @if (cvUrl) {
                    <div class="border-t border-theme pt-3 mt-3">
                      <div class="flex items-center gap-1 text-green-400 text-xs">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        📄 CV subido
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          }
          
          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-5 pt-4 border-t border-theme">
            <button 
              (click)="previousStep()" 
              [disabled]="currentStep() === 1"
              class="btn-ghost text-xs py-2 px-3"
              [class.invisible]="currentStep() === 1"
            >
              ← Anterior
            </button>
            
            @if (currentStep() < steps.length) {
              <button 
                (click)="nextStep()" 
                [disabled]="!canProceed()"
                class="btn-primary text-xs py-2 px-4"
              >
                Siguiente →
              </button>
            } @else {
              <button 
                (click)="submit()" 
                [disabled]="submitting()"
                class="btn-primary text-xs py-2 px-4"
              >
                @if (submitting()) {
                  <app-loading [size]="16" [color]="'white'" />
                } @else {
                  🚀 Publicar
                }
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class CreateProfileComponent {
  currentStep = signal(1);
  submitting = signal(false);
  
  steps = [
    { id: 1, name: 'Username' },
    { id: 2, name: 'Info' },
    { id: 3, name: 'Links' },
    { id: 4, name: 'GitHub' },
    { id: 5, name: 'CV' },
    { id: 6, name: 'Preview' }
  ];

  // Step 1: Username
  username = '';
  usernameChecking = false;
  usernameAvailable: boolean | null = null;
  
  // Step 2: Info
  name = '';
  jobTitle = '';
  bio = '';
  avatarFile: File | null = null;
  avatarUrl = '';
  avatarPreview = signal<string | null>(null);
  avatarUploading = false;
  
  // Step 3: Links
  links: CreateLinkDto[] = [];
  
  // Step 4: GitHub
  githubUsername = '';
  githubSearch = '';
  githubRepos = signal<GithubRepo[]>([]);
  filteredRepos = signal<GithubRepo[]>([]);
  selectedRepos = signal<GithubRepo[]>([]);
  
  // Step 5: CV
  cvFile: File | null = null;
  cvUrl = '';
  cvUploading = false;
  uploadProgress = 0;

  constructor(
    private api: ApiService,
    private github: GithubService,
    private storage: StorageService,
    private router: Router
  ) {}

  checkUsername() {
    if (!this.username || this.username.length < 2) {
      this.usernameAvailable = null;
      return;
    }
    
    this.usernameChecking = true;
    this.api.checkUsername(this.username).subscribe({
      next: (res) => {
        this.usernameAvailable = res.available;
        this.usernameChecking = false;
      },
      error: () => {
        this.usernameAvailable = null;
        this.usernameChecking = false;
      }
    });
  }

  nextStep() {
    if (this.canProceed() && this.currentStep() < this.steps.length) {
      this.currentStep.update(v => v + 1);
    }
  }

  previousStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(v => v - 1);
    }
  }

  canProceed(): boolean {
    switch (this.currentStep()) {
      case 1:
        return this.usernameAvailable === true;
      case 2:
        return !!this.name && this.name.trim().length > 0;
      default:
        return true;
    }
  }

  // Step 2: Avatar
  onAvatarSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const file = input.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Solo se permiten imágenes JPG, PNG o WEBP');
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        alert('El archivo no puede superar los 4MB');
        return;
      }
      this.avatarFile = file;
      this.avatarPreview.set(URL.createObjectURL(file));
      this.uploadAvatar();
    }
  }

  uploadAvatar() {
    if (!this.avatarFile) return;
    this.avatarUploading = true;
    this.storage.uploadAvatar(this.avatarFile).subscribe({
      next: (res) => {
        this.avatarUrl = res.url;
        this.avatarUploading = false;
      },
      error: () => {
        this.avatarUploading = false;
      }
    });
  }

  // Step 3: Links
  addLink() {
    // Agregar un link CUSTOM por defecto (ya que es el único que permite múltiples)
    this.links.push({ type: 'CUSTOM', url: '', title: '' });
  }

  hasLinkType(type: LinkType): boolean {
    return this.links.some(link => link.type === type);
  }

  canAddLinkType(type: LinkType): boolean {
    // CUSTOM siempre se puede agregar
    if (type === 'CUSTOM') return true;
    // Los demás tipos solo se pueden agregar una vez
    return !this.hasLinkType(type);
  }

  removeLink(index: number) {
    this.links.splice(index, 1);
  }

  getLinkTypeName(type: LinkType): string {
    const names: Record<LinkType, string> = {
      'PORTFOLIO': 'Portfolio',
      'LINKEDIN': 'LinkedIn',
      'GITHUB': 'GitHub',
      'CV': 'Currículum',
      'CUSTOM': 'Personalizado'
    };
    return names[type];
  }

  getLinkEmoji(type: LinkType): string {
    const emojis: Record<LinkType, string> = {
      'PORTFOLIO': '🌐',
      'LINKEDIN': '💼',
      'GITHUB': '💻',
      'CV': '📄',
      'CUSTOM': '🔗'
    };
    return emojis[type];
  }

  getLinkDisplayTitle(link: CreateLinkDto): string {
    if (link.title) return link.title;
    return this.getLinkTypeName(link.type);
  }

  // Step 4: GitHub
  searchGithubRepos() {
    if (!this.githubUsername) {
      this.githubRepos.set([]);
      this.filteredRepos.set([]);
      return;
    }
    
    this.github.getRepos(this.githubUsername).subscribe({
      next: (repos) => {
        this.githubRepos.set(repos);
        this.filteredRepos.set(repos);
      },
      error: () => {
        this.githubRepos.set([]);
        this.filteredRepos.set([]);
      }
    });
  }

  filterRepos() {
    if (!this.githubSearch) {
      this.filteredRepos.set(this.githubRepos());
      return;
    }
    
    const search = this.githubSearch.toLowerCase();
    this.filteredRepos.set(
      this.githubRepos().filter(repo => 
        repo.name.toLowerCase().includes(search) ||
        (repo.description && repo.description.toLowerCase().includes(search))
      )
    );
  }

  isRepoSelected(repo: GithubRepo): boolean {
    return this.selectedRepos().some(r => r.id === repo.id);
  }

  toggleRepo(repo: GithubRepo) {
    if (this.isRepoSelected(repo)) {
      this.selectedRepos.update(repos => repos.filter(r => r.id !== repo.id));
    } else if (this.selectedRepos().length < 5) {
      this.selectedRepos.update(repos => [...repos, repo]);
    }
  }

  // Step 5: CV
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file && file.type === 'application/pdf') {
      this.cvFile = file;
      this.uploadCv();
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.cvFile = input.files[0];
      this.uploadCv();
    }
  }

  removeCv() {
    this.cvFile = null;
    this.cvUrl = '';
  }

  uploadCv() {
    if (!this.cvFile) return;
    
    this.cvUploading = true;
    this.uploadProgress = 0;
    
    const interval = setInterval(() => {
      this.uploadProgress += 10;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
      }
    }, 100);

    this.storage.uploadCV(this.cvFile!).subscribe({
      next: (res) => {
        this.cvUrl = res.url;
        this.cvUploading = false;
        clearInterval(interval);
        this.uploadProgress = 100;
      },
      error: () => {
        this.cvUploading = false;
        clearInterval(interval);
      }
    });
  }

  submit() {
    this.submitting.set(true);
    
    const profile: CreateProfileDto = {
      username: this.username.toLowerCase(),
      name: this.name,
      jobTitle: this.jobTitle || undefined,
      bio: this.bio || undefined,
      avatarUrl: this.avatarUrl || undefined,
      githubUrl: this.githubUsername ? `github.com/${this.githubUsername}` : undefined,
      cvUrl: this.cvUrl || undefined,
      links: this.links.filter(l => l.url),
      featuredRepos: this.selectedRepos().map(repo => ({
        name: repo.name,
        description: repo.description || undefined,
        url: repo.html_url,
        stars: repo.stargazers_count
      }))
    };

    this.api.createProfile(profile).subscribe({
      next: (created) => {
        this.submitting.set(false);
        this.router.navigate(['/', created.username]);
      },
      error: () => {
        this.submitting.set(false);
      }
    });
  }
}
