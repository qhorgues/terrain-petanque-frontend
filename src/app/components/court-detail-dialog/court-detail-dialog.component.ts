import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CourtOutputInterface } from "../../interfaces/output/courtOutputInterface";
import { CourtDetailComponent } from "../court-detail/court-detail.component";

export interface DialogData {
  court: CourtOutputInterface | null;
  mode: "view" | "create";
}

@Component({
  selector: "app-court-detail-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    CourtDetailComponent,
  ],
  templateUrl: "./court-detail-dialog.component.html",
  styleUrls: ["./court-detail-dialog.component.css"],
})
export class CourtDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CourtDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onClose(result?: string): void {
    this.dialogRef.close(result);
  }
}
