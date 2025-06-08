import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@shared/data-access/auth/auth.service';
import { EnvironmentService } from '@shared/data-access/environment.service';
import { ClickOutsideDirective } from '@shared/util/click-outside.directive';

@Component({
  selector: 'app-dev-tools',
  imports: [CommonModule, ClickOutsideDirective],
  template: `
    <div
      *ngIf="environment.getEnvironment().enableDevTools"
      class="fixed bottom-4 right-4 z-50"
    >
      <div
        *ngIf="!isExpanded()"
        class="dev-indicator"
        title="Click to open dev tools (Ctrl+D)"
        tabindex="0"
        (click)="onButtonClick($event)"
        (keydown.enter)="onButtonClick($event)"
      >
        <span class="text-xs font-mono font-semibold">DEV</span>
      </div>

      <div *ngIf="isExpanded()" class="dev-panel" (clickOutside)="closePanel()">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="text-lg">🛠️</span>
            <span class="font-semibold text-white">Dev Tools</span>
          </div>
          <button
            class="text-gray-400 hover:text-white transition-colors text-lg leading-none"
            title="Close"
            (click)="closePanel()"
          >
            ✕
          </button>
        </div>

        <div class="mb-4 text-sm">
          <div class="text-gray-300 mb-1">
            Environment:
            <span class="text-green-400 font-mono">Local Development</span>
          </div>
          <div class="text-gray-300">
            API:
            <span class="text-blue-400 font-mono">{{
              environment.getEnvironment().apiUrl
            }}</span>
          </div>
        </div>

        <div class="border-t border-gray-600 pt-4">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-sm text-gray-300">Auth Status:</span>
            <span [class]="isLoggedIn() ? 'text-green-400' : 'text-red-400'">
              {{ isLoggedIn() ? '🟢 Logged In' : '🔴 Not Logged In' }}
            </span>
          </div>

          <div
            *ngIf="isLoggedIn()"
            class="text-xs text-gray-400 mb-3 font-mono"
          >
            User: dev&#64;dancier.local
          </div>

          <button
            [class]="isLoggedIn() ? 'dev-button-danger' : 'dev-button-success'"
            (click)="toggleAuth()"
          >
            <span
              [innerHTML]="isLoggedIn() ? '🔒 Logout' : '🔓 Login as Dev User'"
            ></span>
          </button>
        </div>

        <div class="border-t border-gray-600 pt-3 mt-4">
          <div class="text-xs text-gray-500 font-mono text-center">
            Press Ctrl+D to toggle
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dev-indicator {
        @apply bg-gray-900 bg-opacity-60 backdrop-blur-sm;
        @apply border border-gray-600 rounded-full;
        @apply px-3 py-1.5 cursor-pointer;
        @apply transition-all duration-300;
        @apply hover:bg-opacity-80 hover:scale-110;
        @apply text-green-400;
        animation: subtle-pulse 3s ease-in-out infinite;
      }

      .dev-panel {
        @apply bg-gray-900 bg-opacity-90 backdrop-blur-md;
        @apply border border-gray-600 rounded-lg;
        @apply p-4 min-w-[320px] max-w-[400px];
        @apply shadow-2xl;
        animation: slide-up 0.3s ease-out;
      }

      .dev-button-success {
        @apply w-full px-4 py-2 rounded-md;
        @apply bg-green-600 hover:bg-green-700;
        @apply text-white font-medium text-sm;
        @apply transition-colors duration-200;
        @apply border border-green-500;
      }

      .dev-button-danger {
        @apply w-full px-4 py-2 rounded-md;
        @apply bg-red-600 hover:bg-red-700;
        @apply text-white font-medium text-sm;
        @apply transition-colors duration-200;
        @apply border border-red-500;
      }

      @keyframes subtle-pulse {
        0%,
        100% {
          opacity: 0.6;
        }
        50% {
          opacity: 0.8;
        }
      }

      @keyframes slide-up {
        from {
          opacity: 0;
          transform: translateY(10px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevToolsComponent {
  protected environment = inject(EnvironmentService);
  private authService = inject(AuthService);

  private expanded = signal(false);

  isExpanded = computed(() => this.expanded());
  isLoggedIn = this.authService.isLoggedIn;

  constructor() {
    document.addEventListener('keydown', (event) => {
      if (
        event.ctrlKey &&
        event.key === 'd' &&
        this.environment.getEnvironment().enableDevTools
      ) {
        event.preventDefault();
        this.togglePanel();
      }
    });
  }

  onButtonClick(event: Event): void {
    event.stopPropagation();
    this.togglePanel();
  }

  togglePanel(): void {
    this.expanded.update((expanded) => !expanded);
  }

  closePanel(): void {
    this.expanded.set(false);
  }

  toggleAuth(): void {
    if (this.isLoggedIn()) {
      this.logout();
    } else {
      this.login();
    }
  }

  private login(): void {
    localStorage.setItem(
      'authData',
      JSON.stringify({
        isLoggedIn: true,
        isHuman: true,
        jwt: 'dev-mock-jwt-token',
      })
    );

    this.authService.setLoginState(true, 'dev-mock-jwt-token');
  }

  private logout(): void {
    localStorage.removeItem('authData');

    this.authService.setLoginState(false);
  }
}
