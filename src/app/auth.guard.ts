import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthServiceService);
  const router = inject(Router);

  if(authService.isLoggedIn()){
    return true; //allow navigation
  }
  else{
    router.parseUrl('/login');
    return false;
  }
};
