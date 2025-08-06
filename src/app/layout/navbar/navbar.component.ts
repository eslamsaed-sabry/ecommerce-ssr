import { CartService } from './../../core/services/cart/cart.service';
import { Component, input, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(
    private flowbiteService: FlowbiteService,
    public authService: AuthService,
    private cartService: CartService,
    private myTranslateService: MyTranslateService
  ) { }

  numberOfItems: number = 0;

  isLoggedIn = input<boolean>(true);

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.cartService.cartNamber.subscribe({
      next: (value) => {
        this.numberOfItems = value;
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.cartService.getLoggedUserCart().subscribe({
        next: (res) => {
          this.cartService.cartNamber.next(res.numOfCartItems)
        }
      });
    }
  }

  changeLang(lang: string): void {
    this.myTranslateService.changeLang(lang);
    const dropdownElement = document.getElementById('dropdownNavbar');
    if (dropdownElement) {
      dropdownElement.classList.add('hidden');
    }
  }
}
