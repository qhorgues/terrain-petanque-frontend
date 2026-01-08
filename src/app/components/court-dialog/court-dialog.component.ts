import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-court-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./court-dialog.component.html",
  styleUrls: ["./court-dialog.component.css"],
})
export class CourtDialogComponent {
  courtForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourtDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    const court = data.court || {};
    this.courtForm = this.fb.group({
      name: [court.name || "", Validators.required],
      quantity: [court.quantity || 0, [Validators.required, Validators.min(0)]],
      description: [court.description || ""],
      latitude: [court.coordinates?.latitude || 0, Validators.required],
      longitude: [court.coordinates?.longitude || 0, Validators.required],
    });
  }

  save(): void {
    if (this.courtForm.valid) {
      const formValue = this.courtForm.value;
      const result = {
        name: formValue.name,
        quantity: formValue.quantity,
        description: formValue.description || null,
        coordinates: {
          latitude: formValue.latitude,
          longitude: formValue.longitude,
        },
      };
      this.dialogRef.close(result);
    }
  }
}
