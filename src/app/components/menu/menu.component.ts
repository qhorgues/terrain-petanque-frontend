import { Component, OnInit, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NavigationComponent } from "../navigation/navigation.component";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, RouterLink, MatSidenavModule, NavigationComponent],
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.css",
})
export class MenuComponent implements OnInit{
  drawer = input<MatDrawer>();

  isConnect: boolean = false;

  constructor(private authService : AuthService) {}

  ngOnInit(): void {
    this.isConnect = this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }

  toggleSidenav() {
    this.drawer()?.toggle();
  }

  closeSidenav() {
    this.drawer()?.close();
  }

  openSidenav() {
    this.drawer()?.open();
  }

}
