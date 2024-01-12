import { inject } from '@angular/core';
import { AuthService } from '../../data-access/auth/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = () => {
  const authStorageService = inject(AuthService);
  const router = inject(Router);

  if (authStorageService.getSnapshot().isLoggedIn) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};

export const loggedOutGuard: CanActivateFn = () => {
  const authStorageService = inject(AuthService);
  const router = inject(Router);

  if (authStorageService.getSnapshot().isLoggedIn) {
    return router.createUrlTree(['/recommendations']);
  } else {
    return true;
  }
};
