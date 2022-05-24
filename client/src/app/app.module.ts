import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BookListComponent } from "./book-list/book-list.component";
import { BookFormComponent } from "./book-form/book-form.component";
import { AddBookComponent } from "./add-book/add-book.component";
import { EditBookComponent } from "./edit-book/edit-book.component";

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookFormComponent,
    AddBookComponent,
    EditBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
