import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookListComponent } from "./book-list/book-list.component";
import { AddBookComponent } from "./add-book/add-book.component";
import { EditBookComponent } from "./edit-book/edit-book.component";

const routes: Routes = [
  { path: "", redirectTo: "books", pathMatch: "full" },
  { path: "books", component: BookListComponent },
  { path: "books/new", component: AddBookComponent },
  { path: "books/edit/:id", component: EditBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
