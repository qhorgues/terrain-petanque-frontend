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
  const router = inject(Router)

  /**
   * This variable is if the user is connected.
   */
  const isLoggedIn = authService.isLoggedIn();



  /**
   * This variable is if the user want to go in the login or signin page.
   */
  const isAuthPage = state.url === '/login' || state.url === '/signin';



  if (!isLoggedIn && !isAuthPage) {
    return router.createUrlTree(['/login']);
  }

  if (isLoggedIn && isAuthPage) {
    return router.createUrlTree(['/']);
  }

  return true;
};
