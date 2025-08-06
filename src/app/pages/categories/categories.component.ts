import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category/category.service';
import { ICategory } from '../../shared/interface/icategory';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly categoryService = inject(CategoryService)
  myCategory : ICategory[] = []


  ngOnInit(): void {
    this.callCategory()
  }
  callCategory() {
    this.categoryService.getCategory().subscribe({
      next: (res) => {
        this.myCategory = res.data
        console.log(res);
      }
    })




  
 
  }

}
