import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Book } from "../book";

@Component({
  selector: "app-book-form",
  template: `
    <form
      class="book-form"
      autocomplete="off"
      [formGroup]="bookForm"
      (ngSubmit)="submitForm()"
    >
      <div class="form-floating mb-3">
        <input
          class="form-control"
          type="text"
          id="title"
          formControlName="title"
          placeholder="Title"
          required
        />
        <label for="title">Title</label>
      </div>

      <div
        *ngIf="title.invalid && (title.dirty || title.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="title.errors?.['required']">Title is required.</div>
      </div>

      <div class="form-floating mb-3">
        <input
          class="form-control"
          type="text"
          formControlName="author"
          placeholder="Author"
          required
        />
        <label for="author">Author</label>
      </div>

      <div
        *ngIf="author.invalid && (author.dirty || author.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="author.errors?.['required']">Author is required.</div>
      </div>

      <div class="form-floating mb-3">
        <input
          class="form-control"
          type="text"
          id="genre"
          formControlName="genre"
          placeholder="Genre"
          required
        />
        <label for="genre">Genre</label>
      </div>

      <!--<div *ngIf="genre.invalid && (genre.dirty || genre.touched)" class="alert alert-danger">
       <div *ngIf="genre.errors?.['required']">
         Name is required.
       </div>
       <div *ngIf="name.errors?.['minlength']">
         Name must be at least 3 characters long.
       </div>
     </div> -->

      <div class="form-floating mb-3">
        <input
          class="form-control"
          type="text"
          id="start"
          formControlName="start"
          placeholder="Start"
          required
        />
        <label for="start">Start</label>
      </div>

      <div
        *ngIf="start.invalid && (start.dirty || start.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="start.errors?.['required']">Start is required.</div>
      </div>

      <div class="form-floating mb-3">
        <input
          class="form-control"
          type="text"
          id="finish"
          formControlName="finish"
          placeholder="Finish"
          required
        />
        <label for="finish">Finish</label>
      </div>

      <!-- <div *ngIf="finish.invalid && (finish.dirty || name.touched)" class="alert alert-danger">
       <div *ngIf="finish.errors?.['required']">
         Name is required.
       </div>
       <div *ngIf="name.errors?.['minlength']">
         Name must be at least 3 characters long.
       </div>
     </div> -->

      <div class="form-floating mb-3">
        <input
          class="form-control"
          type="text"
          id="chapters"
          formControlName="chapters"
          placeholder="Chapters"
          required
        />
        <label for="chapters">Chapters</label>
      </div>

      <div
        *ngIf="chapters.invalid && (chapters.dirty || chapters.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="chapters.errors?.['required']">Chapters is required.</div>
      </div>

      <button
        class="btn btn-primary"
        type="submit"
        [disabled]="bookForm.invalid"
      >
        Add
      </button>
    </form>
  `,
  styles: [
    `
      .book-form {
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
      }
    `,
  ],
})
export class BookFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Book> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Book>();

  @Output()
  formSubmitted = new EventEmitter<Book>();

  bookForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  get title() {
    return this.bookForm.get("title")!;
  }
  get author() {
    return this.bookForm.get("author")!;
  }
  get genre() {
    return this.bookForm.get("genre")!;
  }
  get start() {
    return this.bookForm.get("start")!;
  }
  get finish() {
    return this.bookForm.get("finish")!;
  }
  get chapters() {
    return this.bookForm.get("chapters")!;
  }

  ngOnInit() {
    this.initialState.subscribe((book) => {
      this.bookForm = this.fb.group({
        title: [book.title, [Validators.required]],
        author: [book.author, [Validators.required]],
        genre: [book.genre],
        start: [book.start, [Validators.required]],
        finish: [book.finish],
        chapters: [book.chapters, [Validators.required]],
      });
    });

    this.bookForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
  }

  submitForm() {
    this.formSubmitted.emit(this.bookForm.value);
  }
}
