import { RouterLink } from '@angular/router';
import { Icart } from '../../shared/interface/icart';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);
  private readonly platformId = inject(PLATFORM_ID);

  cartDetils: Icart  = {} as Icart;
 
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cartService.getLoggedUserCart().subscribe({
        next: (res) => {
          this.cartDetils = res.data;
          console.log(res);
          
        }
      });
    }
  }

  deleteItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetils = res.data;
        this.cartService.cartNamber.next(res.numOfCartItems);
      }
    });
  }

  updateCart(quantity: any, id: string): void {
    this.cartService.updateCartProductQuantity(quantity, id).subscribe({
      next: (res) => {
        this.cartDetils = res.data;
      }
    });
  }

  clearData(): void {
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetils = {} as Icart;
        this.cartService.cartNamber.next(0);
      }
    });
  }

}
