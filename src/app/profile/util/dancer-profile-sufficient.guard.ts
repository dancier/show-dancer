import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take } from 'rxjs';
import { ProfileOldService } from '@shared/data-access/profile/profile-old.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DancerProfileSufficientGuard {
  constructor(
    private profileService: ProfileOldService,
    private router: Router
  ) {}

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
