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
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";

/**
 * This class represents a list of courts component.
 */
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
    MatPaginatorModule
  ],
  templateUrl: "./court-list.component.html",
  styleUrls: ["./court-list.component.css"],
})
export class CourtListComponent implements OnInit {
  /**
   * This attribute represents the courts.
   */
  courts: CourtOutputInterface[] = [];

  /**
   * This attribute represents the court paged.
   */
  pagedCourts: CourtOutputInterface[] = [];

  /**
   * This attribute represents if the page is loading.
   */
  loading = true;

  /**
   * This attribute represents if there are an error while loading.
   */
  error: string | null = null;

  /**
   * This attribute represents the number of court to display.
   */
  pageSize = 16;

  /**
   * This attribute represents the index of the page.
   */
  pageIndex = 0;

  /**
   * The constructor.
   *
   * @param courtService The service for the court.
   * @param dialog The dialog system to modificate/add a court.
   */
  constructor(
    private courtService: CourtService,
    private dialog: MatDialog,
  ) {}

  /**
   * This method initialize the component.
   */
  ngOnInit(): void {
    this.loadCourts();
  }

  /**
   * This method loads the courts.
   */
  loadCourts(): void {
    this.loading = true;
    this.error = null;
    this.courtService.getAllCourts().subscribe({
      next: (data) => {
        this.courts = data;
        this.loading = false;
        this.pageIndex = 0;
        this.updatePagedCourts();
      },
      error: (err) => {
        this.error = "Erreur lors du chargement des terrains";
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * This method updates the court paged.
   */
  updatePagedCourts(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedCourts = this.courts.slice(start, end);
  }

  /**
   * This method is trigger when the page change.
   *
   * @param event The event's register.
   */
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedCourts();
  }

  /**
   * This method opens the dialog for a court.
   *
   * @param court The court.
   */
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

  /**
   * This method opens a dialog to add a court.
   */
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
