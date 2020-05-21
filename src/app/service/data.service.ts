import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get('http://localhost:8080/api/books');
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>('http://localhost:8080/api/book', book, this.httpOptions);
  }
}
