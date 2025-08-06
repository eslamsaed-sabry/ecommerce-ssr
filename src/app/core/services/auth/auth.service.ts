import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router ,  private readonly toastrService : ToastrService) { }

  userData: any;
  signUp(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)

  }
  signIn(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }

  getUesrData(): void {
    this.userData = jwtDecode(localStorage.getItem('myToken')!)
  }

  signOut() {
    localStorage.removeItem('myToken')
    this.userData = null
    this.toastrService.success( 'sign out ')
    this.router.navigate(['/login'])


  }

}
