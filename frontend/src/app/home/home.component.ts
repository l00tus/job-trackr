import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  username: string = '';
  isBrowser: boolean = false;
  isLoggedIn: boolean = false;
  isAppInitialized: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private userService: UserService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  async ngOnInit(): Promise<void> {
    if (this.isBrowser) {
      try {
        this.isLoggedIn = await this.userService.userLoggedIn();
      } catch (err) {
        console.error(err);
        this.isLoggedIn = false;
      }
      
      if (this.isLoggedIn) {        
        try {
          await this.userService.fetchUser();
          this.username = this.userService.getUsername();
        } catch (err) {
          console.error(err);
        }
      }

      this.isAppInitialized = true;
    }
  }
}
