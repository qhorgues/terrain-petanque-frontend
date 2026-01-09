import { Component } from "@angular/core";
import { CourtListComponent } from "../../components/court-list/court-list.component";

@Component({
  selector: "app-court-page",
  standalone: true,
  imports: [CourtListComponent],
  templateUrl: "./court-page.component.html",
  styleUrl: "./court-page.component.css",
})
export class CourtPageComponent {}
