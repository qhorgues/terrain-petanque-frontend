import { Component } from "@angular/core";
import { UserListComponent } from "../../components/user-list/user-list.component";

@Component({
  selector: "app-user-list-page",
  standalone: true,
  imports: [UserListComponent],
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.css",
})
export class UserPage {}
