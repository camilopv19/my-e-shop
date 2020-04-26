import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {
  appUser: AppUser;
  isCollapsed = true;

  constructor(private auth: AuthService, private router: Router) {
    auth.appUser$.subscribe( user => this.appUser = user);
   }

   toggle(){
    this.isCollapsed = !this.isCollapsed;
   }

  logout(){
    this.auth.logout();
    this.toggle();
    this.router.navigate(['/login']);
  }
}
