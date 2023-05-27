import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, take } from 'rxjs';
import { ProfileService } from '@core/profile/profile.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DancerProfileSufficientGuard implements CanActivate {
  constructor(private profileService: ProfileService, private router: Router) {}

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
