import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LoginComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "terrain-petanque-frontend";
}
