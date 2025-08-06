import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { IProduct } from '../../../shared/interface/IProduct';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient: HttpClient) { }

  addProductToWishlist(id:string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      },
     

    )

  }

  getLoggedUserWishlist(): Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist` , 
    
    )


  }

  removeProductFromWishlist(id: string): Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,
      
    )

  }

  getWishlist(): Observable<{ data: IProduct[] }> {
    return this.httpClient.get<{ data: IProduct[] }>(
      `${environment.baseUrl}/api/v1/wishlist`,
 
    );
  }

}
