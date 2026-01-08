import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { CourtDialogComponent } from "../court-dialog/court-dialog.component";
import { CourtOutputInterface } from "../../interfaces/output/courtOutputInterface";

@Component({
  selector: "app-court-list",
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: "./court-list.component.html",
  styleUrls: ["./court-list.component.css"],
})
export class CourtListComponent implements OnInit {
  courts: CourtOutputInterface[] = [];
  selectedCourt: CourtOutputInterface | null = null;
  private apiUrl = "http://localhost:8081/api/v1/courts";

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadCourts();
  }

  loadCourts(): void {
    this.http.get<CourtOutputInterface[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.courts = data;
      },
      error: (error) => {
        this.showMessage("Erreur lors du chargement des terrains");
        console.error("Error loading courts:", error);
      },
    });
  }

  selectCourt(court: CourtOutputInterface): void {
    this.selectedCourt = court;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CourtDialogComponent, {
      width: "500px",
      data: { mode: "add" },
      hasBackdrop: true,
      disableClose: false,
      panelClass: "court-dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.post<CourtOutputInterface>(this.apiUrl, result).subscribe({
          next: () => {
            this.showMessage("Terrain ajouté avec succès");
            this.loadCourts();
          },
          error: (error) => {
            this.showMessage("Erreur lors de l'ajout du terrain");
            console.error("Error adding court:", error);
          },
        });
      }
    });
  }

  openEditDialog(court: CourtOutputInterface): void {
    const dialogRef = this.dialog.open(CourtDialogComponent, {
      width: "500px",
      data: { mode: "edit", court: { ...court } },
      hasBackdrop: true,
      disableClose: false,
      panelClass: "court-dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .put<CourtOutputInterface>(`${this.apiUrl}/${court.id}`, result)
          .subscribe({
            next: () => {
              this.showMessage("Terrain modifié avec succès");
              this.loadCourts();
              this.selectedCourt = null;
            },
            error: (error) => {
              this.showMessage("Erreur lors de la modification du terrain");
              console.error("Error updating court:", error);
            },
          });
      }
    });
  }

  deleteCourt(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce terrain ?")) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.showMessage("Terrain supprimé avec succès");
          this.selectedCourt = null;
          this.loadCourts();
        },
        error: (error) => {
          this.showMessage("Erreur lors de la suppression du terrain");
          console.error("Error deleting court:", error);
        },
      });
    }
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, "Fermer", {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}
