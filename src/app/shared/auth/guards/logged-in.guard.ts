import { inject } from '@angular/core';
import { AuthStorageService } from '../services/auth-storage.service';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = () => {
  const authStorageService = inject(AuthStorageService);
  const router = inject(Router);

  if (authStorageService.getSnapshot().isLoggedIn) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};

export const loggedOutGuard: CanActivateFn = () => {
  const authStorageService = inject(AuthStorageService);
  const router = inject(Router);

  if (authStorageService.getSnapshot().isLoggedIn) {
    return router.createUrlTree(['/recommendations']);
  } else {
    return true;
  }
};
