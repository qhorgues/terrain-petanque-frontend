import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { UserService } from "../../services/userService/user.service";
import { UserOutputInterface } from "../../interfaces/output/userOutputInterface";
import { UserListItemComponent } from "../user-list-item/user-list-item.component";
import { UserDetailDialogComponent } from "../user-detail-dialog/user-detail-dialog.component";

/**
 * This class represents a list of users component.
 */
@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    UserListItemComponent,
    MatPaginatorModule,
  ],
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  /**
   * This attribute represents the users.
   */
  users: UserOutputInterface[] = [];

  /**
   * This attribute represents the users paged.
   */
  pagedUsers: UserOutputInterface[] = [];

  /**
   * This attribute represents if the page is loading.
   */
  loading = true;

  /**
   * This attribute represents if there are an error while loading.
   */
  error: string | null = null;

  /**
   * This attribute represents the number of users to display.
   */
  pageSize = 16;

  /**
   * This attribute represents the index of the page.
   */
  pageIndex = 0;

  /**
   * The constructor.
   *
   * @param userService The service for the users.
   * @param dialog The dialog system to modificate/add a user.
   */
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  /**
   * This method initialize the component.
   */
  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * This method loads the users.
   */
  loadUsers(): void {
    this.loading = true;
    this.error = null;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
        this.pageIndex = 0;
        this.updatePagedUsers();
      },
      error: (err) => {
        this.error = "Erreur lors du chargement des utilisateurs";
        this.loading = false;
        console.error(err);
      },
    });
  }

  /**
   * This method updates the users paged.
   */
  updatePagedUsers(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedUsers = this.users.slice(start, end);
  }

  /**
   * This method is trigger when the page change.
   *
   * @param event The event's register.
   */
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedUsers();
  }

  /**
   * This method opens the dialog for a user.
   *
   * @param user The user.
   */
  openUserDetail(user: UserOutputInterface): void {
    const dialogRef = this.dialog.open(UserDetailDialogComponent, {
      width: "600px",
      data: { user, mode: "view" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "updated" || result === "deleted") {
        this.loadUsers();
      }
    });
  }

  /**
   * This method opens a dialog to add a user.
   */
  openAddUser(): void {
    const dialogRef = this.dialog.open(UserDetailDialogComponent, {
      width: "600px",
      data: { user: null, mode: "create" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "created") {
        this.loadUsers();
      }
    });
  }
}
