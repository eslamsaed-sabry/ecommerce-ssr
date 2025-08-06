import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shared/interface/ibrands';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands-detalis',
  imports: [TranslatePipe],
  templateUrl: './brands-detalis.component.html',
  styleUrls: ['./brands-detalis.component.scss']
})
export class BrandsDetalisComponent implements OnInit {

  private readonly brandsService = inject(BrandsService)
  private readonly activatedRoute = inject(ActivatedRoute)



  brandID: any;
  subBrand!: IBrand;


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.brandID = res.get('id')
        this.brandsService.getSpecificBrand(this.brandID).subscribe({
          next: (res) => {
            this.subBrand = res.data
            console.log(res);
          }
        })
      }
    })
  }

}
