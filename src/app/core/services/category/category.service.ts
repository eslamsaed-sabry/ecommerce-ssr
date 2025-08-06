import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private HttpClient :HttpClient) { 
  }
  getCategory() :Observable<any>{
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/categories`) 
  }

  getAllSubCategoriesOnCategory(id:string):Observable<any>{
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}/subcategories`)
  }


}
