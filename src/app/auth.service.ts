import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';  //param passed from the auth-guard.service
    localStorage.setItem('returnUrl', returnUrl);                               //uses the local storage of the webBrowser in case of login
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap(user =>{ 
        if (user) return this.userService.get(user.uid).valueChanges();
        return of(null);
      }))   
      /* switchMap executes the first ob$ and then "jumps" to the next and if the templates uses async pipe in the
      *   template, it will cause an infinite loop by changeDetection, that's why it's implemented a subscribe method in the 
      *   bs-navbar component
      */

  }
}
