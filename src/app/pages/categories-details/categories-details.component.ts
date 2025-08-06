import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category/category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-details',
  imports: [],
  templateUrl: './categories-details.component.html',
  styleUrl: './categories-details.component.scss'
})
export class CategoriesDetailsComponent implements OnInit {

  private readonly categoryService = inject(CategoryService)
  private readonly activatedRoute = inject(ActivatedRoute)

  cateID: any;
  subcategories: any; 


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.cateID = res.get('id')
        this.categoryService.getAllSubCategoriesOnCategory(this.cateID).subscribe({
          next: (res) => {
            this.subcategories =res.data

            console.log(res);
          }
        })

      }
    })

  }

}
