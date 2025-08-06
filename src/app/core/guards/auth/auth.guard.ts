import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let token: string | null = null;

  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('myToken');
  }

  if (token !== null) {
    return true;
  } else {
    router.navigate(['/login']);5
    return false;
  }
};
