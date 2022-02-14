import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'penny-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public authService : AuthService, private router : Router) {
    
  }
  ngOnInit(): void {
    this.authService.me()
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl("/auth/login")
  }
}
