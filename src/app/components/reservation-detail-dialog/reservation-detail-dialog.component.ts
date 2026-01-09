import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ReservationDetailComponent } from "../reservation-detail/reservation-detail.component";
import { ReservationOutputInterface } from "../../interfaces/output/reservationOutputInterface";

export interface ReservationDialogData {
  reservation: ReservationOutputInterface | null;
  mode: "view" | "create";
}

@Component({
  selector: "app-reservation-detail-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ReservationDetailComponent,
  ],
  templateUrl: "./reservation-detail-dialog.component.html",
  styleUrls: ["./reservation-detail-dialog.component.css"],
})
export class ReservationDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReservationDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReservationDialogData,
  ) {}

  onClose(result?: string): void {
    this.dialogRef.close(result);
  }
}
