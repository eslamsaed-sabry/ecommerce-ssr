import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let token: string | null = null;

  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('myToken');
  }

  if (token !== null) {
    router.navigate(['/home']);
    return false;
  } else {
    return true; 
  }
};
