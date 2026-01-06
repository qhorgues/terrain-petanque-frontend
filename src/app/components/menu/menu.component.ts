import { Component, OnInit, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NavigationComponent } from "../navigation/navigation.component";
import { AuthService } from "../../services/auth/auth.service";

/**
 * This class represents a up bar component.
 */
@Component({
  selector: "app-menu",
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, RouterLink, MatSidenavModule, NavigationComponent],
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.css",
})
export class MenuComponent implements OnInit{
  /**
   * This attribute represents the drawer we can open in the up bar.
   */
  drawer = input<MatDrawer>();



  /**
   * This attribute represents if the user is connected or not.
   */
  isConnect: boolean = false;



  /**
   * The constructor.
   * 
   * @param authService The service of authentification. 
   */
  constructor(private authService : AuthService) {}

  

  /**
   * This method initializes the component.
   */
  ngOnInit(): void {
    this.isConnect = this.authService.isLoggedIn();
  }



  /**
   * This method logout the user.
   */
  logout(): void {
    this.authService.logout();
    window.location.reload();
  }



  /**
   * This method open/close the drawer.
   * 
   * Open the drawer if the drawer is closed.
   * Close the drawer if the drawer is openned.
   */
  toggleSidenav() {
    this.drawer()?.toggle();
  }



  /**
   * This method open the drawer.
   */
  closeSidenav() {
    this.drawer()?.close();
  }



  /**
   * This method close the drawer.
   */
  openSidenav() {
    this.drawer()?.open();
  }

}
