import { WishList } from './../../shared/interface/wish-list';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService)
  private readonly cartService = inject(CartService)
    private readonly toastrService = inject(ToastrService)
    private readonly ngxSpinner = inject(NgxSpinnerService)

  wishList: WishList = {} as WishList


  ngOnInit(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishList = res;
      }
    })

  }
deleteItem(id: string): void {
  this.wishlistService.removeProductFromWishlist(id).subscribe({
    next: (res) => {
      console.log(res);
      this.wishList.data = this.wishList.data.filter(prod => prod._id !== id);
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


}
