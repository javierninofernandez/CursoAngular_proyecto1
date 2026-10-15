// login.component.ts
// Pantalla de login con uso del servicio de autenticacion auth.service.ts
// Uso de Formulario reactivo
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule,  Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { AuthService } from '../../auth.service';
import { AuthService } from '../../auth.service.fake';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  loading = false;
  error = '';

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error en el login:', err);
        console.error('Estado HTTP:', err.status);
        console.error('Respuesta:', err.error);

        this.error =
          `Error de login: HTTP ${err.status}`;

        this.loading = false;
      },
        complete: () => {
          this.loading = false;
        }      
    });
  }
}