import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  username: string = "";
  isLoggedIn: boolean = false;
  isAppInitialized: boolean = false;

  constructor(private authService: AuthService, private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    const status: string | null = localStorage.getItem('isLoggedIn');

    if(status) {
      this.isLoggedIn = true;
    }

    this.isAppInitialized = true;
  }
}
