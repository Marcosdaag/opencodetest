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
    <div class="min-h-[calc(100vh-4rem)] py-8 px-4">
      <div class="max-w-2xl mx-auto">
        <!-- Progress Bar -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-2">
            @for (step of steps; track step.id; let i = $index) {
              <div class="flex items-center" [class.flex-1]="i < steps.length - 1">
                <div class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300"
                     [class.bg-accent-500]="currentStep() >= i + 1"
                     [class.text-white]="currentStep() >= i + 1"
                     [class.bg-primary-700]="currentStep() < i + 1"
                     [class.text-slate-400]="currentStep() < i + 1">
                  @if (currentStep() > i + 1) {
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  } @else {
                    {{ i + 1 }}
                  }
                </div>
                @if (i < steps.length - 1) {
                  <div class="flex-1 h-0.5 mx-2 transition-all duration-300"
                       [class.bg-accent-500]="currentStep() > i + 1"
                       [class.bg-primary-700]="currentStep() <= i + 1">
                  </div>
                }
              </div>
            }
          </div>
          <div class="text-center">
            <span class="text-slate-400 text-sm">Paso {{ currentStep() }} de {{ steps.length }}</span>
          </div>
        </div>

        <!-- Step Content -->
        <div class="card-static">
          @switch (currentStep()) {
            @case (1) {
              <div @slide>
                <h2 class="text-2xl font-bold text-white mb-2">Elige tu username</h2>
                <p class="text-slate-400 mb-6">Este será tu enlace único: freelnk.com/{{ username }}</p>
                
                <div class="mb-4">
                  <label class="block text-slate-300 text-sm mb-2">Username</label>
                  <div class="flex items-center gap-2">
                    <span class="text-slate-500">freelnk.com/</span>
                    <input 
                      type="text" 
                      [(ngModel)]="username" 
                      (ngModelChange)="checkUsername()"
                      class="input-field flex-1"
                      placeholder="tu-nombre"
                      maxlength="30"
                    >
                  </div>
                  @if (usernameChecking) {
                    <p class="text-slate-400 text-sm mt-2">Verificando...</p>
                  } @else if (username) {
                    @if (usernameAvailable === true) {
                      <p class="text-green-400 text-sm mt-2 flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Username disponible
                      </p>
                    } @else if (usernameAvailable === false) {
                      <p class="text-red-400 text-sm mt-2 flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Username no disponible
                      </p>
                    }
                  }
                </div>
              </div>
            }
            
            @case (2) {
              <div @slide>
                <h2 class="text-2xl font-bold text-white mb-2">Información personal</h2>
                <p class="text-slate-400 mb-6">Cuéntanos quién eres</p>
                
                <div class="space-y-4">
                  <div>
                    <label class="block text-slate-300 text-sm mb-2">Nombre completo *</label>
                    <input 
                      type="text" 
                      [(ngModel)]="name"
                      class="input-field"
                      placeholder="Juan Pérez"
                      maxlength="100"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-slate-300 text-sm mb-2">Título profesional</label>
                    <input 
                      type="text" 
                      [(ngModel)]="jobTitle"
                      class="input-field"
                      placeholder="Desarrollador Full Stack"
                      maxlength="100"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-slate-300 text-sm mb-2">Bio</label>
                    <textarea 
                      [(ngModel)]="bio"
                      class="input-field min-h-[100px]"
                      placeholder="Cuéntanos sobre ti..."
                      maxlength="800"
                    ></textarea>
                    <p class="text-slate-500 text-xs mt-1">{{ bio?.length || 0 }}/800 caracteres</p>
                  </div>
                </div>
              </div>
            }
            
            @case (3) {
              <div @slide>
                <h2 class="text-2xl font-bold text-white mb-2">Agrega tus links</h2>
                <p class="text-slate-400 mb-6">Añade tu portfolio, LinkedIn y más</p>
                
                <div class="space-y-4 mb-6">
                  @for (link of links; track $index) {
                    <div class="bg-primary-700/50 rounded-lg p-4">
                      <div class="flex items-start gap-3">
                        <select [(ngModel)]="link.type" class="input-field w-40">
                          <option value="PORTFOLIO">Portfolio</option>
                          <option value="LINKEDIN">LinkedIn</option>
                          <option value="GITHUB">GitHub</option>
                          <option value="CUSTOM">Personalizado</option>
                        </select>
                        <input 
                          type="text" 
                          [(ngModel)]="link.title"
                          class="input-field flex-1"
                          placeholder="Título del link"
                        >
                        <button (click)="removeLink($index)" class="text-slate-400 hover:text-red-400 transition-colors">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <input 
                        type="url" 
                        [(ngModel)]="link.url"
                        class="input-field mt-3"
                        placeholder="https://"
                      >
                    </div>
                  }
                </div>
                
                <button (click)="addLink()" class="btn-ghost w-full flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Agregar link
                </button>
              </div>
            }
            
            @case (4) {
              <div @slide>
                <h2 class="text-2xl font-bold text-white mb-2">Conecta GitHub</h2>
                <p class="text-slate-400 mb-6">Selecciona hasta 5 repositorios destacados</p>
                
                <div class="mb-4">
                  <label class="block text-slate-300 text-sm mb-2">Tu usuario de GitHub</label>
                  <div class="flex gap-2">
                    <input 
                      type="text" 
                      [(ngModel)]="githubUsername"
                      (ngModelChange)="searchGithubRepos()"
                      class="input-field flex-1"
                      placeholder="tu-usuario"
                    >
                  </div>
                </div>
                
                @if (githubRepos().length > 0) {
                  <div class="mb-4">
                    <input 
                      type="text" 
                      [(ngModel)]="githubSearch"
                      (ngModelChange)="filterRepos()"
                      class="input-field"
                      placeholder="Buscar repositorios..."
                    >
                  </div>
                  
                  <div class="space-y-2 max-h-64 overflow-y-auto">
                    @for (repo of filteredRepos(); track repo.id) {
                      <div 
                        class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all"
                        [class.bg-accent-500/20]="isRepoSelected(repo)"
                        [class.bg-primary-700/50]="!isRepoSelected(repo)"
                        (click)="toggleRepo(repo)"
                      >
                        <div class="w-5 h-5 rounded border-2 flex items-center justify-center"
                             [class.border-accent-500]="isRepoSelected(repo)"
                             [class.border-slate-500]="!isRepoSelected(repo)">
                          @if (isRepoSelected(repo)) {
                            <svg class="w-3 h-3 text-accent-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          }
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-white font-medium truncate">{{ repo.name }}</p>
                          <p class="text-slate-400 text-sm truncate">{{ repo.description || 'Sin descripción' }}</p>
                        </div>
                        <div class="flex items-center gap-1 text-slate-400 text-sm">
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          {{ repo.stargazers_count }}
                        </div>
                      </div>
                    }
                  </div>
                  <p class="text-slate-400 text-sm mt-2">{{ selectedRepos().length }}/5 repositorios seleccionados</p>
                }
              </div>
            }
            
            @case (5) {
              <div @slide>
                <h2 class="text-2xl font-bold text-white mb-2">Sube tu CV</h2>
                <p class="text-slate-400 mb-6">Añade tu currículum en PDF</p>
                
                @if (!cvFile && !cvUrl) {
                  <div 
                    class="border-2 border-dashed border-primary-600 rounded-lg p-8 text-center cursor-pointer hover:border-accent-500 transition-colors"
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
                    <svg class="w-12 h-12 mx-auto text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p class="text-slate-400">Arrastra un archivo PDF o haz clic para seleccionar</p>
                    <p class="text-slate-500 text-sm mt-2">Máximo 10MB</p>
                  </div>
                }
                
                @if (cvFile) {
                  <div class="bg-primary-700/50 rounded-lg p-4 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-white font-medium">{{ cvFile.name }}</p>
                      <p class="text-slate-400 text-sm">{{ (cvFile.size / 1024 / 1024).toFixed(2) }} MB</p>
                    </div>
                    <button (click)="removeCv()" class="text-slate-400 hover:text-red-400 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                }
                
                @if (cvUploading) {
                  <div class="mt-4">
                    <div class="h-2 bg-primary-700 rounded-full overflow-hidden">
                      <div class="h-full bg-accent-500 transition-all duration-300" [style.width.%]="uploadProgress"></div>
                    </div>
                    <p class="text-slate-400 text-sm mt-2">Subiendo... {{ uploadProgress }}%</p>
                  </div>
                }
              </div>
            }
            
            @case (6) {
              <div @slide>
                <h2 class="text-2xl font-bold text-white mb-2">Vista previa</h2>
                <p class="text-slate-400 mb-6">Así se verá tu perfil</p>
                
                <div class="bg-primary-700/50 rounded-xl p-6">
                  <div class="text-center mb-6">
                    <div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-2xl font-bold text-white mb-3">
                      {{ name?.charAt(0)?.toUpperCase() || '?' }}
                    </div>
                    <h3 class="text-white font-semibold text-lg">{{ name || 'Tu nombre' }}</h3>
                    @if (jobTitle) {
                      <p class="text-accent-400 text-sm">{{ jobTitle }}</p>
                    }
                    @if (bio) {
                      <p class="text-slate-400 text-sm mt-3">{{ bio }}</p>
                    }
                  </div>
                  
                  @if (links.length > 0) {
                    <div class="space-y-2 mb-4">
                      @for (link of links; track $index) {
                        <div class="bg-primary-800 rounded-lg p-3 flex items-center gap-3">
                          <div class="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center">
                            <svg class="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          </div>
                          <span class="text-white">{{ link.title }}</span>
                        </div>
                      }
                    </div>
                  }
                  
                  @if (selectedRepos().length > 0) {
                    <div class="border-t border-primary-600 pt-4 mt-4">
                      <p class="text-slate-400 text-sm mb-2">Proyectos destacados: {{ selectedRepos().length }}</p>
                    </div>
                  }
                  
                  @if (cvUrl) {
                    <div class="border-t border-primary-600 pt-4 mt-4">
                      <div class="flex items-center gap-2 text-green-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        CV subido
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          }
          
          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button 
              (click)="previousStep()" 
              [disabled]="currentStep() === 1"
              class="btn-ghost"
              [class.invisible]="currentStep() === 1"
            >
              <svg class="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>
            
            @if (currentStep() < steps.length) {
              <button 
                (click)="nextStep()" 
                [disabled]="!canProceed()"
                class="btn-primary"
              >
                Siguiente
                <svg class="w-5 h-5 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            } @else {
              <button 
                (click)="submit()" 
                [disabled]="submitting()"
                class="btn-primary"
              >
                @if (submitting()) {
                  <app-loading [size]="20" [color]="'white'" />
                } @else {
                  Publicar perfil
                  <svg class="w-5 h-5 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
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
    { id: 2, name: 'Información' },
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
      case 3:
        return true; // Links son opcionales
      case 4:
        return true; // GitHub es opcional
      case 5:
        return true; // CV es opcional
      default:
        return true;
    }
  }

  // Step 3: Links
  addLink() {
    this.links.push({ type: 'CUSTOM', url: '', title: '' });
  }

  removeLink(index: number) {
    this.links.splice(index, 1);
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
      githubUrl: this.githubUsername ? `github.com/${this.githubUsername}` : undefined,
      cvUrl: this.cvUrl || undefined,
      links: this.links.filter(l => l.url && l.title),
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
