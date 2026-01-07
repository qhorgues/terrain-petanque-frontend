import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

/**
 * This class represent a component of the 404.
 */
@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: "./not-found.component.html",
  styleUrl: "./not-found.component.css",
})
export class NotFoundComponent {}
