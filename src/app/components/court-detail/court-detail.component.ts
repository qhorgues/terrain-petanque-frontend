import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { CourtService } from "../../services/courtService/court.service";
import { CourtOutputInterface } from "../../interfaces/output/courtOutputInterface";
import { CourtInputInterface } from "../../interfaces/input/courtInputInterface";

@Component({
  selector: "app-court-detail",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: "./court-detail.component.html",
  styleUrls: ["./court-detail.component.css"],
})
export class CourtDetailComponent implements OnInit {
  @Input() court: CourtOutputInterface | null = null;
  @Input() mode: "view" | "create" = "view";
  @Output() closeDialog = new EventEmitter<string>();

  courtForm!: FormGroup;
  isEditMode = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private courtService: CourtService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.mode === "create") {
      this.isEditMode = true;
    }
  }

  initForm(): void {
    this.courtForm = this.fb.group({
      name: [
        {
          value: this.court?.name || "",
          disabled: !this.isEditMode && this.mode !== "create",
        },
        [Validators.required],
      ],
      quantity: [
        {
          value: this.court?.quantity || 1,
          disabled: !this.isEditMode && this.mode !== "create",
        },
        [Validators.required, Validators.min(1)],
      ],
      description: [
        {
          value: this.court?.description || "",
          disabled: !this.isEditMode && this.mode !== "create",
        },
      ],
      latitude: [
        {
          value: this.court?.coordinates.latitude?.toString() || "",
          disabled: !this.isEditMode && this.mode !== "create",
        },
        [Validators.required],
      ],
      longitude: [
        {
          value: this.court?.coordinates.longitude?.toString() || "",
          disabled: !this.isEditMode && this.mode !== "create",
        },
        [Validators.required],
      ],
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.courtForm.enable();
    } else {
      this.courtForm.disable();
      this.initForm();
    }
  }

  onSubmit(): void {
    if (this.courtForm.invalid) {
      return;
    }

    this.loading = true;
    const formValue = this.courtForm.value;

    const courtData: CourtInputInterface = {
      name: formValue.name,
      quantity: formValue.quantity,
      description: formValue.description || undefined,
      coordinates: {
        latitude: parseFloat(formValue.latitude),
        longitude: parseFloat(formValue.longitude),
      },
    };

    if (this.mode === "create") {
      this.courtService.createCourt(courtData).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open("Terrain créé avec succès", "Fermer", {
            duration: 3000,
          });
          this.closeDialog.emit("created");
        },
        error: (err) => {
          this.loading = false;
          this.snackBar.open("Erreur lors de la création", "Fermer", {
            duration: 3000,
          });
          console.error(err);
        },
      });
    } else if (this.court) {
      this.courtService.fullyUpdateCourt(courtData, this.court.id).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open("Terrain modifié avec succès", "Fermer", {
            duration: 3000,
          });
          this.closeDialog.emit("updated");
        },
        error: (err) => {
          this.loading = false;
          this.snackBar.open("Erreur lors de la modification", "Fermer", {
            duration: 3000,
          });
          console.error(err);
        },
      });
    }
  }

  onDelete(): void {
    if (
      !this.court ||
      !confirm("Êtes-vous sûr de vouloir supprimer ce terrain ?")
    ) {
      return;
    }

    this.loading = true;
    this.courtService.deleteCourt(this.court.id).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open("Terrain supprimé avec succès", "Fermer", {
          duration: 3000,
        });
        this.closeDialog.emit("deleted");
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open("Erreur lors de la suppression", "Fermer", {
          duration: 3000,
        });
        console.error(err);
      },
    });
  }
}
