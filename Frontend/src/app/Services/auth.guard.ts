import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}
/*  
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
*/

canActivate(route: ActivatedRouteSnapshot): boolean {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const expectedRoles = route.data['perfil'];
  

  if (!token || !expectedRoles.includes(user.role)) {
    this.router.navigate(['/no-autorizado']);
    return false;
  }

  return true;
}

}
