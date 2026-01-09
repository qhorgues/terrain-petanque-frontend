import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { ReservationOutputInterface } from "../../interfaces/output/reservationOutputInterface";
import { UserService } from "../../services/userService/user.service";
import { CourtService } from "../../services/courtService/court.service";

@Component({
  selector: "app-reservation-list-item",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: "./reservation-list-item.component.html",
  styleUrls: ["./reservation-list-item.component.css"],
})
export class ReservationListItemComponent implements OnInit {
  @Input() reservation!: ReservationOutputInterface;

  username: string = "Utilisateur inconnu";
  courtName: string = "Terrain inconnu";

  constructor(
    private userService: UserService,
    private courtService: CourtService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadCourt();
  }

  private loadUser(): void {
    this.userService.getUser(this.reservation.userId).subscribe({
      next: (user) => {
        if (user) this.username = user.username;
      },
      error: (err) => console.error(err),
    });
  }

  private loadCourt(): void {
    this.courtService.getCourt(this.reservation.courtId).subscribe({
      next: (court) => {
        if (court) this.courtName = court.name;
      },
      error: (err) => console.error(err),
    });
  }
}
