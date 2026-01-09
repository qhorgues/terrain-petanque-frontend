import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { UserOutputInterface } from "../../interfaces/output/userOutputInterface";

@Component({
  selector: "app-user-list-item",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: "./user-list-item.component.html",
  styleUrls: ["./user-list-item.component.css"],
})
export class UserListItemComponent {
  @Input() user!: UserOutputInterface;
}
