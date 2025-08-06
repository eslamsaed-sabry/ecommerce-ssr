import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shared/interface/ibrands';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink , RouterModule,TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {


  private readonly brandsService = inject(BrandsService)

  myBrands: IBrand[] = []; 
  ngOnInit(): void {
    this.callBrands()
  }

  callBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.myBrands = res.data
        console.log(res);
      }
    })

  }

}
