import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  Book:any = [];

  constructor(private crudService: CrudService ) { }

  ngOnInit(): void {
    this.crudService.GetBooks().subscribe(res => {
      console.log(res)
      this.Book = res;
    })
  }
  
  delete(id:any, i:any) {
    console.log(id)
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteBook(id).subscribe((res) => {
        this.Book.splice(i,1);
      })
    }
  }

}
