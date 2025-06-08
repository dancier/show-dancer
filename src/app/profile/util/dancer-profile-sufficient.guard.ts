import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take } from 'rxjs';
import { OwnProfileService } from '@shared/data-access/profile/own-profile.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DancerProfileSufficientGuard {
  private profileService = inject(OwnProfileService);
  private router = inject(Router);

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.profileService.isDancerProfileSufficient$().pipe(
      take(1),
      map((isSufficient) => {
        if (!isSufficient) {
          return this.router.createUrlTree(['profile', 'initial-setup']);
        }
        return true;
      })
    );
  }
}
