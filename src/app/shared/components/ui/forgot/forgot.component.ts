import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotService } from '../../../../core/services/forgot/forgot.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule , TranslatePipe],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {

 private readonly forgotService = inject (ForgotService)
 private readonly authService = inject (AuthService)
 private readonly router = inject (Router)

  step :number =1

  forgotPasswordForm :FormGroup =new FormGroup({
    email : new FormControl( null , [Validators.required])
  })
  verifyCodeForm :FormGroup =new FormGroup({
    resetCode : new FormControl( null , [Validators.required])
  })
  resetPasswordForm :FormGroup =new FormGroup({
    email : new FormControl( null , [Validators.required]),
    newPassword : new FormControl( null , [Validators.required])
  })

  forgotPass(){
    let emailValue = this.forgotPasswordForm.get('email')?.value
    this.resetPasswordForm.get('email')?.patchValue(emailValue)

    this.forgotService.forgotPass(this.forgotPasswordForm.value).subscribe({
      next:(res)=>{
        if(res.statusMsg == 'success'){
          this.step =2
        }

      }
    }) 
  }
    verifyCode(){

    this.forgotService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next:(res)=>{
        if(res.status == 'success'){
          this.step =3
        }
      }
    })
  }
  resetPass(){

    this.forgotService.resetPass(this.resetPasswordForm.value).subscribe({
      next:(res)=>{

          localStorage.setItem('myToken' , res.token)

          this.authService.getUesrData()
          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 1000)       
      }
    })
  }

}
