import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { IProduct } from '../../shared/interface/IProduct';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [NgClass, TranslatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly wishlistService = inject(WishlistService)
  private readonly toastrService = inject(ToastrService)
  private readonly ngxSpinner = inject(NgxSpinnerService)
  private readonly cartService = inject(CartService)




  prodID: any;
  prodData: IProduct | null = null;
  isFavorite: boolean = false

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.prodID = res.get('id');

        this.productsService.getSpecifitcproduct(this.prodID).subscribe({
          next: (res) => {
            this.prodData = {
              ...res.data,
              isFavorite: false
            };

            this.wishlistService.getWishlist().subscribe({
              next: (wishlistRes) => {
                const wishlistIds = wishlistRes.data.map((item: any) => item._id);
                if (this.prodData && wishlistIds.includes(this.prodData._id)) {
                  this.prodData.isFavorite = true;
                }
              }
            });
          }
        });
      }
    });
  }


  toggleWishlist(prod: IProduct): void {
    prod.isFavorite = !prod.isFavorite;

    if (prod.isFavorite) {
      this.wishlistService.addProductToWishlist(prod._id).subscribe({
        next: (res) => {
          console.log('Added to wishlist')
          this.toastrService.success(res.message, 'freshCart', { newestOnTop: true, progressBar: true, positionClass: 'toast-top-center' })
        },
      });
    } else {
      this.wishlistService.removeProductFromWishlist(prod._id).subscribe({
        next: (res) => {
          console.log('Removed from wishlist')
          this.toastrService.info(res.message, 'freshCart', { newestOnTop: true, progressBar: true, positionClass: 'toast-top-center' })

        },
      });
    }
  }


  addProductToWishlist(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        this.isFavorite = true
        this.toastrService.success(res.message, 'freshCart', { newestOnTop: true, progressBar: true, positionClass: 'toast-top-center' })
      }
    })

  }


  addProductToCart(id: string): void {
    this.ngxSpinner.show();
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'freshCart', { newestOnTop: true, progressBar: true, positionClass: 'toast-top-center' })
        this.cartService.cartNamber.next(res.numOfCartItems)
        this.ngxSpinner.hide()
      }
    })
  }


}
