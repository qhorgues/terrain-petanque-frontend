import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { UserOutputInterface } from "../../interfaces/output/userOutputInterface";
import { UserDetailComponent } from "../user-detail/user-detail.component";

export interface DialogData {
  user: UserOutputInterface | null;
  mode: "view" | "create";
}

@Component({
  selector: "app-user-detail-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    UserDetailComponent,
  ],
  templateUrl: "./user-detail-dialog.component.html",
  styleUrls: ["./user-detail-dialog.component.css"],
})
export class UserDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onClose(result?: string): void {
    this.dialogRef.close(result);
  }
}
