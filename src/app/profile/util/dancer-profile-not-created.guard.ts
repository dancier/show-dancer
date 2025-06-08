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
export class DancerProfileNotCreatedGuard {
  private profileService = inject(OwnProfileService);
  private router = inject(Router);

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!childRoute || !childRoute.routeConfig) {
      return false;
    }
    const baseUrlPath = 'profile/initial-setup';

    return this.profileService.profile$.pipe(
      take(1),
      map((profile) => {
        switch (childRoute!.routeConfig!.path) {
          case 'username':
          case '':
            if (profile.dancerName) {
              return this.router.createUrlTree([baseUrlPath, 'personal-info']);
            }
            break;
          case 'personal-info':
            if (profile.birthDate) {
              return this.router.createUrlTree([baseUrlPath, 'dances-self']);
            }
            break;
          case 'dances-self':
            if (profile.ableTo.length > 0) {
              return this.router.createUrlTree([baseUrlPath, 'dances-partner']);
            }
            break;
          case 'dances-partner':
            if (profile.wantsTo.length > 0) {
              return this.router.createUrlTree([baseUrlPath, 'profile-image']);
            }
            break;
          case 'profile-image':
            if (profile.profileImageHash) {
              return this.router.createUrlTree(['profile']);
            }
        }
        return true;
      })
    );
  }
}
