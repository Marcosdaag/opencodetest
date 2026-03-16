import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubRepo } from '../../core/models/github.model';

@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a 
      [href]="repo.html_url" 
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
          {{ repo.stargazers_count }}
        </div>
      </div>
      
      <p class="text-theme-secondary text-sm mb-4 line-clamp-2">
        {{ repo.description || 'Sin descripción' }}
      </p>
      
      <div class="flex items-center gap-4">
        @if (repo.language) {
          <div class="flex items-center gap-2 text-sm text-theme-secondary">
            <span class="w-3 h-3 rounded-full" [ngClass]="getLanguageColor(repo.language)"></span>
            {{ repo.language }}
          </div>
        }
      </div>
    </a>
  `
})
export class RepoCardComponent {
  @Input({ required: true }) repo!: GithubRepo;

  getLanguageColor(language: string): string {
    const colors: Record<string, string> = {
      'JavaScript': 'bg-yellow-400',
      'TypeScript': 'bg-blue-400',
      'Python': 'bg-green-400',
      'Java': 'bg-orange-400',
      'C++': 'bg-pink-400',
      'C#': 'bg-purple-400',
      'Ruby': 'bg-red-400',
      'Go': 'bg-cyan-400',
      'Rust': 'bg-orange-500',
      'PHP': 'bg-indigo-400',
      'HTML': 'bg-red-500',
      'CSS': 'bg-blue-500',
      'Shell': 'bg-green-500',
    };
    return colors[language] || 'bg-slate-400';
  }
}
