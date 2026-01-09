import { Component } from "@angular/core";
import { ReservationListComponent } from "../../components/reservation-list/reservation-list.component";

@Component({
  selector: "app-reservation-page",
  standalone: true,
  imports: [ReservationListComponent],
  templateUrl: "./reservation-page.component.html",
  styleUrls: ["./reservation-page.component.css"],
})
export class ReservationPageComponent {}
