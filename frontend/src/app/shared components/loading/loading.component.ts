import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center" [ngClass]="containerClass">
      <div class="animate-spin rounded-full border-2 border-t-transparent"
           [ngClass]="spinnerClass"
           [style.width.px]="size"
           [style.height.px]="size">
      </div>
    </div>
  `
})
export class LoadingComponent {
  @Input() size: number = 40;
  @Input() color: 'accent' | 'white' | 'slate' = 'accent';

  get spinnerClass(): string {
    const classes = {
      accent: 'border-accent-500',
      white: 'border-white',
      slate: 'border-slate-400'
    };
    return classes[this.color];
  }

  get containerClass(): string {
    return this.fullPage ? 'min-h-screen' : '';
  }

  @Input() fullPage: boolean = false;
}
