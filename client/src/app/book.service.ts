import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, tap } from "rxjs";

import { Book } from "./book";

@Injectable({
  providedIn: "root",
})
export class BookService {
  private url = "http://localhost:5200";
  private books$: Subject<Book[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  private refreshBooks() {
    this.httpClient.get<Book[]>(`${this.url}/books`).subscribe((books) => {
      this.books$.next(books);
    });
  }

  getBooks(): Subject<Book[]> {
    this.refreshBooks();
    return this.books$;
  }

  getBook(id: string): Observable<Book> {
    return this.httpClient.get<Book>(`${this.url}/books/${id}`);
  }

  createBook(book: Book): Observable<string> {
    return this.httpClient.post(`${this.url}/books`, book, {
      responseType: "text",
    });
  }

  updateBook(id: string, book: Book): Observable<string> {
    return this.httpClient.put(`${this.url}/books/${id}`, book, {
      responseType: "text",
    });
  }

  deleteBook(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/books/${id}`, {
      responseType: "text",
    });
  }
}
