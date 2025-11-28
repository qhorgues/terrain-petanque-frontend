import { Component, ViewChild } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, RouterLink],
  templateUrl: "./menu.component.html",
  styleUrl: "./menu.component.css",
})
export class MenuComponent {
  @ViewChild("sidenav") sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  openSidenav() {
    this.sidenav.open();
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(["(max-width: 768px)"])
      .subscribe((result) => {
        if (result.matches) {
          this.sidenav.mode = "over";
          this.sidenav.close();
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
      });
  }
}
