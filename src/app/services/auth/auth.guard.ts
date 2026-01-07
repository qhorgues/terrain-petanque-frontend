import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * This function is the auth guard.
 *
 * @param route The current route.
 * @param state The current state.
 * @returns
 */
export const authGuard: CanActivateFn = (route, state) => {

  /**
   * This variable is the authentification service.
   */
  const authService = inject(AuthService);

  /**
   * This variable is the router service.
   */
  const router = inject(Router);

  /**
   * If the user is not connected, go them in the login page.
   */
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }
  /**
   * If the user is connected, avoid him to go in login and sign in page.
   */
  else {
    if (state.url === "/login" || state.url === "/signin") {
      return router.createUrlTree(['/'])
    }
  }

  return true;
};
