import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
userName = '';
pass = '';

loginForm: FormGroup;
errorMessage : string = '';
constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private authService: AuthService // Inyecta el servicio de autenticación
) {
  this.loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    pass: ['', Validators.required]
  });
}
onSubmit() {
  this.authService.login(this.userName, this.pass).subscribe({
    next: () => {
      const role = this.authService.getRole();
      if (role === 1) this.router.navigate(['/usuario']);
      else if (role === 2) this.router.navigate(['/publicacion']);
      else if (role === 3) this.router.navigate(['/empresa']);

    },
    error: err => alert('Credenciales incorrectas')
  });
}
}


