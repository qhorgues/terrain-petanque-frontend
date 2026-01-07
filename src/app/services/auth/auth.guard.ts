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
   *
   */
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  return true;
};
