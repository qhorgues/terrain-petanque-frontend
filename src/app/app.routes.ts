import { Routes } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginComponent } from "./pages/login/login.component";
import { MapPage } from "./pages/map/map.page";
import { MapComponent } from "./components/map/map.component";

export const routes: Routes = [
  // { path: "", component: HomeComponent },
  // { path: "users/new", component: NewUserComponent },
  // { path: "users/:id", component: UserDetailComponent },
  // { path: "users", component: UsersComponent },
  { path: "map", component: MapComponent },
  { path: "login", component: LoginComponent },
  { path: "**", component: NotFoundComponent },
];
