import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  isLoading : boolean= false
  errorMes : string =''
  succMes : string =''



  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
    rePassword: new FormControl(null, [Validators.required,]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: this.confirmPassword })

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value
    const rePassword = group.get('rePassword')?.value
    if (password === rePassword) {
      return null
    } else {
      return { mismatch: true }
    }

  }


  submitForm() { 
    if (this.registerForm.valid) {
      this.isLoading= true;
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
              this.isLoading= false;
              console.log(res);
              this.errorMes =''
              this.succMes = res.message
              setTimeout(()=>{
                this.router.navigate(['/login'])
              })     
        }
      })
    }else{
      this.registerForm.markAllAsTouched()
    }

  }

}
