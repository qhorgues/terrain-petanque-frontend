import { Routes } from "@angular/router";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { LoginComponent } from "./pages/login/login.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { authGuard } from "./services/auth/auth.guard";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { MapPage } from "./pages/map/map.page";
import { CourtPageComponent } from "./pages/court-page/court-page.component";

/**
 * This constant defines the routes.
 */
export const routes: Routes = [
  /**
   * The login page.
   */
  {
    path: "login",
    component: LoginComponent,
    canActivate: [authGuard]
  },

  /**
   * The login page.
   */
  {
    path: "signin",
    component: SigninComponent,
    canActivate: [authGuard]
  },

  /**
   * The map page.
   */
  {
    path: "map",
    component: MapPage,
    canActivate: [authGuard]
  },

  {
    path: "terrains",
    component: CourtPageComponent,
    canActivate: [authGuard]
  },

  /**
   * The main routes of the website.
   */
  {
    path: "",
    component: HomePageComponent,
    canActivate: [authGuard]
  },

  /**
   * If the URL is unknown.
   */
  {
    path: "**",
    component: NotFoundPageComponent,
    canActivate: [authGuard],
  },
];
