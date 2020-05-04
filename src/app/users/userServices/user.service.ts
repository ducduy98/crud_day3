import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {User} from "../userModels/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http: HttpClient) {

  }

  getUsersList(): Observable<User[]> {
    return this.http
      .get<User[]>(`/api/users`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(`/api/users/${id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  addNewUser(userData: User): Observable<User> {
    return this.http
      .post<User>(`/api/users`, userData)
      .pipe(catchError((error: any) => throwError(error.json())));
  }


  updateUser(userData: User): Observable<User>  {
    return this.http
      .put<User>(`/api/products/${userData.id}`, userData)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  searchProduct(keyword: any): Observable<User[]> {
    return of(null);
  }
}
