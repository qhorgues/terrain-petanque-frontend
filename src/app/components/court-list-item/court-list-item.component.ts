import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CourtOutputInterface } from "../../interfaces/output/courtOutputInterface";

@Component({
  selector: "app-court-list-item",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: "./court-list-item.component.html",
  styleUrls: ["./court-list-item.component.css"],
})
export class CourtListItemComponent {
  @Input() court!: CourtOutputInterface;
}
