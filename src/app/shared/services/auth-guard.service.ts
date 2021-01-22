import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(router, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user => {
      if (user) return true;

      //When the user is anonymous, the url which is trying to go will be passed as url params
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }}); 
      return false;
    })
    )
  }
}
