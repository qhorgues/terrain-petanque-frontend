import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';

/**
 * This class represents the navigation buttons box component.
 */
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  /**
   * This attribute represents if the user is connected.
   */
  isConnect: boolean = false;



  /**
   * The constructor.
   * 
   * @param authService The service of authentification. 
   */
  constructor(private authService : AuthService) {}



  /**
   * The method initialize the component.
   */
  ngOnInit(): void {
    this.isConnect = this.authService.isLoggedIn();
  }
}
