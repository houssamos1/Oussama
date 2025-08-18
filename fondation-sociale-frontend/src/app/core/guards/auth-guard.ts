
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  // Rediriger vers la page de connexion avec l'URL de retour
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};