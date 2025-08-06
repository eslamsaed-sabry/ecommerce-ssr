import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  private readonly toastrService = inject(ToastrService)
  isLoading: boolean = false
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
  })

  submitForm() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          localStorage.setItem('myToken', res.token)
          this.authService.getUesrData()
          this.toastrService.success(res.message, 'freshCart', { newestOnTop: true, progressBar: true, positionClass: 'toast-top-center' })
          this.router.navigate(['/home'])
        }
      })
    } else {
      this.loginForm.markAllAsTouched()
    }

  }
}
