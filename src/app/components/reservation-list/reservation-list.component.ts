import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { ReservationService } from "../../services/reservationService/reservation.service";
import { ReservationOutputInterface } from "../../interfaces/output/reservationOutputInterface";
import { ReservationListItemComponent } from "../reservation-list-item/reservation-list-item.component";
import { ReservationDetailDialogComponent } from "../reservation-detail-dialog/reservation-detail-dialog.component";

@Component({
  selector: "app-reservation-list",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReservationListItemComponent
  ],
  templateUrl: "./reservation-list.component.html",
  styleUrls: ["./reservation-list.component.css"],
})
export class ReservationListComponent implements OnInit {
  reservations: ReservationOutputInterface[] = [];
  pagedReservations: ReservationOutputInterface[] = [];

  loading = true;
  error: string | null = null;

  pageSize = 16;
  pageIndex = 0;

  constructor(
    private reservationService: ReservationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.loading = true;
    this.error = null;

    this.reservationService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.loading = false;
        this.pageIndex = 0;
        this.updatePagedReservations();
      },
      error: (err) => {
        this.error = "Erreur lors du chargement des réservations";
        this.loading = false;
        console.error(err);
      },
    });
  }

  updatePagedReservations(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedReservations = this.reservations.slice(start, end);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedReservations();
  }

  openReservationDetail(reservation: ReservationOutputInterface): void {
    const dialogRef = this.dialog.open(ReservationDetailDialogComponent, {
      width: "600px",
      data: { reservation, mode: "view" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "updated" || result === "deleted") {
        this.loadReservations();
      }
    });
  }

  openAddReservation(): void {
    const dialogRef = this.dialog.open(ReservationDetailDialogComponent, {
      width: "600px",
      data: { reservation: null, mode: "create" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "created") {
        this.loadReservations();
      }
    });
  }
}
