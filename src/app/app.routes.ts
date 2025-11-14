import { Routes } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";

export const routes: Routes = [
  // { path: "", component: HomeComponent },
  // { path: "users/new", component: NewUserComponent },
  // { path: "users/:id", component: UserDetailComponent },
  // { path: "users", component: UsersComponent },
  { path: "**", component: NotFoundComponent },
];
