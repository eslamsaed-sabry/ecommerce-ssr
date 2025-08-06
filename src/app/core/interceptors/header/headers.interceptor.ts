import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('myToken');

    if (token && (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist'))) {
      req = req.clone({
        setHeaders: {
          token: token
        }
      });
    }
  }

  return next(req);
};
