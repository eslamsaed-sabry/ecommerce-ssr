import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { ProductsService } from '../../core/services/product/products.service';
import { IProduct } from '../../shared/interface/IProduct';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [NgClass, FormsModule, SearchPipe, RouterLink,TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly ngxSpinner = inject(NgxSpinnerService);
  private readonly toastrService = inject(ToastrService);
  private readonly productsService = inject(ProductsService)

  myProducts: IProduct[] = []
  
  searchItem: any;







  ngOnInit(): void {
    this.callProduct()
  }


  callProduct() {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {

        const wishlistIds = res.data.map((item: any) => item._id);

        this.productsService.getProducts().subscribe({
          next: (res) => {
            console.log(res);
            this.myProducts = res.data.map((product: IProduct) => ({
              ...product,
              isFavorite: wishlistIds.includes(product._id)
            }));
          }
        });
      }
    });
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
  toggleWishlist(prod: IProduct): void {
    prod.isFavorite = !prod.isFavorite;

    if (prod.isFavorite) {
      this.wishlistService.addProductToWishlist(prod._id).subscribe({
        next: (res) => {
          this.toastrService.success(res.message, 'freshCart', { newestOnTop: true, progressBar: true, positionClass: 'toast-top-center' })
        },
      });
    } else {
      this.wishlistService.removeProductFromWishlist(prod._id).subscribe({
        next: (res) => {
          this.toastrService.info(res.message, 'freshCart', { newestOnTop: true, progressBar: true, positionClass: 'toast-top-center' })

        },
      });
    }
  }



}
