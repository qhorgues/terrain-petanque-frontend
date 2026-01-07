import { Routes } from "@angular/router";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { authGuard } from "./services/auth/auth.guard";

/**
 * This constant defines the routes.
 */
export const routes: Routes = [
  /**
   * The login page.
   */
  {
    path: 'login',
    component: LoginComponent
  },

  /**
   * The login page.
   */
  {
    path: 'signin',
    component: LoginComponent
  },

  /**
   * The main routes of the website.
   */
  {
    path: '',
    component: HomePageComponent,
    canActivate: [authGuard],
    children: [

    ]
  },

  /**
   * If the URL is unknown.
   */
  {
    path: "**",
    component: NotFoundPageComponent
  }
];
