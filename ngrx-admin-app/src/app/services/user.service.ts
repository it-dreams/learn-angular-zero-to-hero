import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from '../modal/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  createUser(data: IUser) {
    return this.http.post<IUser>(this.baseUrl, data).pipe(catchError(this.handleError));
  }

  updateUser(data: IUser) {
    return this.http.put<IUser>(`${this.baseUrl}/${data.id}`, data).pipe(catchError(this.handleError));
  }

  deleteUser(id) {
    return this.http.delete<IUser>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
