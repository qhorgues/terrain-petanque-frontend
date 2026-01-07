import { Routes } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginComponent } from "./pages/login/login.component";
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
    canActivate: [authGuard],
    children: [
      /**
       * If the URL is unknown.
       */
      {
        path: "**",
        component: NotFoundComponent
      }
    ]
  }
];
