import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

   endpoint: string = 'http://localhost:8000/api';
  //endpoint: string = 'api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add Post
  AddPost(data: Student): Observable<any> {
    let API_URL = `${this.endpoint}/add-post`;
	console.log(API_URL);
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

    // Add Post
  AddUpVote(data): Observable<any> {
      let API_URL = `${this.endpoint}/add-upvote`;
    console.log(API_URL);
      return this.http.post(API_URL, data)
        .pipe(
          catchError(this.errorMgmt)
        )
  }

   // Get Post
   GetUpvote(ipaddress,pid): Observable<any> {
     
    let API_URL = `${this.endpoint}/getupvote/${ipaddress}/${pid}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }



  // Get all Posts
  GetPosts() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get Post
  GetPost(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-post/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update Post
  UpdatePost(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update-post/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete Post
  DeletePost(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-post/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  public getIPAddress()
  {
    return this.http.get("http://api.ipify.org/?format=json");
  }

}