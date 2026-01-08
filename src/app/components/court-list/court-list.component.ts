import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CourtService } from "../../services/courtService/court.service";
import { CourtOutputInterface } from "../../interfaces/output/courtOutputInterface";
import { CourtListItemComponent } from "../court-list-item/court-list-item.component";
import { CourtDetailDialogComponent } from "../court-detail-dialog/court-detail-dialog.component";

@Component({
  selector: "app-court-list",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CourtListItemComponent,
  ],
  templateUrl: "./court-list.component.html",
  styleUrls: ["./court-list.component.css"],
})
export class CourtListComponent implements OnInit {
  courts: CourtOutputInterface[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private courtService: CourtService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadCourts();
  }

  loadCourts(): void {
    this.loading = true;
    this.error = null;
    this.courtService.getAllCourts().subscribe({
      next: (data) => {
        this.courts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Erreur lors du chargement des terrains";
        this.loading = false;
        console.error(err);
      },
    });
  }

  openCourtDetail(court: CourtOutputInterface): void {
    const dialogRef = this.dialog.open(CourtDetailDialogComponent, {
      width: "600px",
      data: { court, mode: "view" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "updated" || result === "deleted") {
        this.loadCourts();
      }
    });
  }

  openAddCourt(): void {
    const dialogRef = this.dialog.open(CourtDetailDialogComponent, {
      width: "600px",
      data: { court: null, mode: "create" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "created") {
        this.loadCourts();
      }
    });
  }
}
