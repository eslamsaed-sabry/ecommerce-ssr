import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly paymentService = inject(PaymentService)
  payForm !: FormGroup;
  cartID :string = ''


  ngOnInit(): void {
    this.payForm = new FormGroup({
      details: new FormControl(null, Validators.required),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      city: new FormControl(null, Validators.required),

    })

    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.cartID = res.get('id') !

      }
    })

  }


  submitFoem(): void {
    console.log(this.payForm.value);
    this.paymentService.checkOut(this.cartID , this.payForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === "success"){
          window.open(res.session.url , '_self')
        }
      }
    })

  }
}
