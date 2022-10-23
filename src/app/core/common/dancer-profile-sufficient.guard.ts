import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '@features/profile/services/profile.service';

@Injectable({
  providedIn: 'root',
})
export class DancerProfileSufficientGuard implements CanActivate {
  constructor(private profileService: ProfileService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.profileService.isDancerProfileSufficient()) {
      return this.router.createUrlTree(['profile', 'initial-setup']);
    }
    return true;
  }
}
