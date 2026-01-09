import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatOptionModule } from "@angular/material/core";
import { startWith, map } from "rxjs/operators";
import { Observable } from "rxjs";

import { UserService } from "../../services/userService/user.service";
import { CourtService } from "../../services/courtService/court.service";
import { ReservationService } from "../../services/reservationService/reservation.service";

import { ReservationOutputInterface } from "../../interfaces/output/reservationOutputInterface";
import { ReservationInputInterface } from "../../interfaces/input/reservationInputInterface";
import { CourtOutputInterface } from "../../interfaces/output/courtOutputInterface";
import { UserOutputInterface } from "../../interfaces/output/userOutputInterface";

@Component({
  selector: "app-reservation-detail",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatOptionModule
  ],
  templateUrl: "./reservation-detail.component.html",
  styleUrls: ["./reservation-detail.component.css"],
})
export class ReservationDetailComponent implements OnInit {
  @Input() reservation: ReservationOutputInterface | null = null;
  @Input() mode: "view" | "create" = "view";
  @Output() closeDialog = new EventEmitter<string>();

  reservationForm!: FormGroup;
  isEditMode = false;
  loading = false;

  users: UserOutputInterface[] = [];
  courts: CourtOutputInterface[] = [];

  filteredUsers: UserOutputInterface[] = [];
  filteredCourts: CourtOutputInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private userService: UserService,
    private courtService: CourtService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
    this.loadCourts();

    if (this.mode === "create") this.isEditMode = true;

    // Filtrage dynamique
    this.reservationForm.get('userId')?.valueChanges.pipe(
      startWith(''),
      map(value => this.filterUsers(value))
    ).subscribe(filtered => this.filteredUsers = filtered);

    this.reservationForm.get('courtId')?.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCourts(value))
    ).subscribe(filtered => this.filteredCourts = filtered);
  }

  initForm(): void {
    this.reservationForm = this.fb.group({
      userId: [
        { value: this.reservation?.userId || "", disabled: !this.isEditMode && this.mode !== "create" },
        [Validators.required]
      ],
      courtId: [
        { value: this.reservation?.courtId || "", disabled: !this.isEditMode && this.mode !== "create" },
        [Validators.required]
      ],
      reservation: [
        { value: this.reservation?.reservation || 1, disabled: !this.isEditMode && this.mode !== "create" },
        [Validators.required, Validators.min(1)]
      ]
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.users = users;
        this.filteredUsers = users;
      },
      error: err => console.error(err)
    });
  }

  loadCourts(): void {
    this.courtService.getAllCourts().subscribe({
      next: courts => {
        this.courts = courts;
        this.filteredCourts = courts;
      },
      error: err => console.error(err)
    });
  }

  displayUser = (id: number) => {
    const user = this.users.find(u => u.id === id);
    return user ? user.name : '';
  }

  displayCourt = (id: number) => {
    const court = this.courts.find(c => c.id === id);
    return court ? court.name : '';
  }

  private filterUsers(value: string | number): UserOutputInterface[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.users.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  private filterCourts(value: string | number): CourtOutputInterface[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.courts.filter(court => court.name.toLowerCase().includes(filterValue));
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.reservationForm.enable();
    } else {
      this.reservationForm.disable();
      this.initForm();
    }
  }

  onSubmit(): void {
    if (this.reservationForm.invalid) return;

    this.loading = true;
    const formValue = this.reservationForm.value;
    const reservationData: ReservationInputInterface = {
      reservation: formValue.reservation
    };

    if (this.mode === "create") {
      this.reservationService.createReservation(reservationData, formValue.userId, formValue.courtId).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open("Réservation créée avec succès", "Fermer", { duration: 3000 });
          this.closeDialog.emit("created");
        },
        error: err => {
          this.loading = false;
          this.snackBar.open("Erreur lors de la création", "Fermer", { duration: 3000 });
          console.error(err);
        }
      });
    } else if (this.reservation) {
      this.reservationService.partialUpdateReservation(reservationData, formValue.userId, formValue.courtId).subscribe({
        next: () => {
          this.loading = false;
          this.snackBar.open("Réservation modifiée avec succès", "Fermer", { duration: 3000 });
          this.closeDialog.emit("updated");
        },
        error: err => {
          this.loading = false;
          this.snackBar.open("Erreur lors de la modification", "Fermer", { duration: 3000 });
          console.error(err);
        }
      });
    }
  }

  onDelete(): void {
    if (!this.reservation || !confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) return;

    this.loading = true;
    this.reservationService.deleteReservation(this.reservation.userId, this.reservation.courtId).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open("Réservation supprimée avec succès", "Fermer", { duration: 3000 });
        this.closeDialog.emit("deleted");
      },
      error: err => {
        this.loading = false;
        this.snackBar.open("Erreur lors de la suppression", "Fermer", { duration: 3000 });
        console.error(err);
      }
    });
  }
}
