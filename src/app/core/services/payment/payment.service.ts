import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private HttpClient: HttpClient) { }


  checkOut(id: string , shippingData: object): Observable<any> {
   return  this.HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      {
        "shippingAddress": shippingData
      },
    

    )
  }

}
