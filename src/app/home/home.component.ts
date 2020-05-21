import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../model/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: any;
  addBookForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder,
              private data: DataService) {
                this.addBookForm = this.formBuilder.group({
                  title: ['', Validators.required],
                  author: ['', Validators.required],
                  cover: ['', Validators.required]
                });
              }

  ngOnInit(): void {
    this.data.getBooks().subscribe(data => {
      this.books = data;
      console.log(this.books);
    });
  }
  onAddBookPost(): void {
    const book: Book = {
      title: this.addBookForm.controls.title.value,
      author: this.addBookForm.controls.author.value,
      cover: this.addBookForm.controls.cover.value
    };
    this.submitted = true;
    if (this.addBookForm.invalid) {
      return;
    }
    this.success = true;
    this.data.addBook(book).subscribe(data => {
      // this.books = data;
      this.books.push(data);
      console.log(this.books);
    });
  }

}
