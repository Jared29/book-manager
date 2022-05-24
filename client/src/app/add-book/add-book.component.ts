import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';
 
@Component({
 selector: 'app-add-book',
 template: `
   <h2 class="text-center m-5">Add a New Book</h2>
   <app-book-form (formSubmitted)="addBook($event)"></app-book-form>
 `
})
export class AddBookComponent {
 constructor(
   private router: Router,
   private bookService: BookService
 ) { }
 
 addBook(book: Book) {
   this.bookService.createBook(book)
     .subscribe({
       next: () => {
         this.router.navigate(['/books']);
       },
       error: (error) => {
         alert("Failed to create book");
         console.error(error);
       }
     });
 }
}