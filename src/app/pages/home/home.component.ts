import { CategoryService } from '../../core/services/category/category.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { error } from 'console';
import { IProduct } from '../../shared/interface/IProduct';
import { ICategory } from '../../shared/interface/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {  NgxSpinnerService } from 'ngx-spinner';
import { TranslatePipe } from '@ngx-translate/core';




@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, SearchPipe,TranslatePipe, FormsModule, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  private readonly productsService = inject(ProductsService)
  private readonly categoryService = inject(CategoryService)
  private readonly cartService = inject(CartService)
  private readonly wishlistService = inject(WishlistService)
  private readonly toastrService = inject(ToastrService)
  private readonly ngxSpinner = inject(NgxSpinnerService)

  myProducts: IProduct[] = []
  myCategory: ICategory[] = []
  searchItem: any;
  isFavorite: boolean = false


  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ['', ''],
    items: 1,
    nav: true
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    rtl: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.callProduct()
    this.callCategory()
  }


  callProduct() {
    this.wishlistService.getWishlist().subscribe({
      next: (wishlistRes) => {
        const wishlistIds = wishlistRes.data.map((item: any) => item._id);

        this.productsService.getProducts().subscribe({
          next: (res) => {
            this.myProducts = res.data.map((product: IProduct) => ({
              ...product,
              isFavorite: wishlistIds.includes(product._id)
            }));
          }
        });
      }
    });
  }


  callCategory() {
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        this.myCategory = res.data
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

  addProductToWishlist(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        this.isFavorite = true
        this.toastrService.success(res.message, 'freshCart', { newestOnTop: true, progressBar: true, positionClass: 'toast-top-center' })
      }
    })

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



}
