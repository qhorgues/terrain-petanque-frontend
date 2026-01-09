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
import { UserService } from "../../services/userService/user.service";
import { UserOutputInterface } from "../../interfaces/output/userOutputInterface";
import { UserInputInterface } from "../../interfaces/input/userInputInterface";

@Component({
  selector: "app-user-detail",
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
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  @Input() user: UserOutputInterface | null = null;
  @Input() mode: "view" | "create" = "view";
  @Output() closeDialog = new EventEmitter<string>();

  userForm!: FormGroup;
  isEditMode = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.mode === "create") {
      this.isEditMode = true;
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: [
        {
          value: this.user?.name || "",
          disabled: !this.isEditMode && this.mode !== "create",
        },
        [Validators.required],
      ],
      surname: [
        {
          value: this.user?.surname || "",
          disabled: !this.isEditMode && this.mode !== "create",
        },
        [Validators.required],
      ],
      username: [
        {
          value: this.user?.username || "",
          disabled: !this.isEditMode && this.mode !== "create",
        },
        [Validators.required],
      ],
      mail: [
        {
          value: this.user?.mail || "",
          disabled: !this.isEditMode && this.mode !== "create",
        },
        [Validators.required, Validators.email],
      ],
      password: [
        {
          value: "",
          disabled: !this.isEditMode && this.mode !== "create",
        },
        this.mode === "create"
          ? [Validators.required, Validators.minLength(6)]
          : [],
      ],
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.userForm.enable();
      // Le mot de passe n'est pas obligatoire en modification
      this.userForm.get("password")?.clearValidators();
      this.userForm.get("password")?.updateValueAndValidity();
    } else {
      this.userForm.disable();
      this.initForm();
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    const formValue = this.userForm.value;

    const userData: UserInputInterface = {
      name: formValue.name,
      surname: formValue.surname,
      username: formValue.username,
      mail: formValue.mail,
      password: formValue.password,
    };

    if (this.mode === "create") {
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open("Utilisateur créé avec succès", "Fermer", {
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
    } else if (this.user) {
      // Si le mot de passe est vide, on ne l'envoie pas
      if (!formValue.password) {
        delete formValue.password;
      }

      this.userService.fullyUpdateUser(userData, this.user.id).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open("Utilisateur modifié avec succès", "Fermer", {
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
      !this.user ||
      !confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      return;
    }

    this.loading = true;
    this.userService.deleteUser(this.user.id).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open("Utilisateur supprimé avec succès", "Fermer", {
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
