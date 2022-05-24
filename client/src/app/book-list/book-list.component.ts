import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../book';
import { BookService } from '../book.service';
 
@Component({
 selector: 'app-books-list',
 template: `
   <h2 class="text-center m-5">Books List</h2>
 
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>Title</th>
               <th>Author</th>
               <th>Genre</th>
               <th>Start</th>
               <th>Finish</th>
               <th>Chapters</th>
               <th>Action</th>
           </tr>
       </thead>
 
       <tbody>
           <tr *ngFor="let book of books$ | async">
               <td>{{book.title}}</td>
               <td>{{book.author}}</td>
               <td>{{book.genre}}</td>
               <td>{{book.start}}</td>
               <td>{{book.finish}}</td>
               <td>{{book.chapters}}</td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['edit/', book._id]">Edit</button>
                   <button class="btn btn-danger" (click)="deleteBook(book._id || '')">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Book</button>
 `
})
export class BookListComponent implements OnInit {
 books$: Observable<Book[]> = new Observable();
 
 constructor(private booksService: BookService) { }
 
 ngOnInit(): void {
   this.fetchBooks();
 }
 
 deleteBook(id: string): void {
   this.booksService.deleteBook(id).subscribe({
     next: () => this.fetchBooks()
   });
 }
 
 private fetchBooks(): void {
   this.books$ = this.booksService.getBooks();
 }
}