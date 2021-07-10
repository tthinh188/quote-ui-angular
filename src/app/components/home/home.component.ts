import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Quote } from 'src/app/module';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  access_token = localStorage.getItem('access_token') || '';
  displayedColumns: string[] = ['QuoteType', 'QuoteID', 'Contact', 'Task', 'DueDate', 'TaskType', 'Action'];
  searchOptions: string[] = ['QuoteID', 'QuoteType', 'Contact', 'Task', 'DueDate', 'TaskType'];

  dataSource = new MatTableDataSource<Quote>([]);

  checked: boolean = false;
  error: string = '';
  public quotes: Array<Quote> = [];
  public quote!: Quote;
  editing: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.fetchAllQuotes();
  }

  onChangeOrder(event: any): void {
    switch (event.value) {
      case 'QuoteID':
        this.quotes.sort((a, b) => a.QuoteID < b.QuoteID ? -1 : a.QuoteID > b.QuoteID ? 1 : 0);
        break;
      case 'QuoteType':
        this.quotes.sort((a, b) => a.QuoteType < b.QuoteType ? -1 : a.QuoteType > b.QuoteType ? 1 : 0);
        break;
      case 'Contact':
        this.quotes.sort((a, b) => a.Contact < b.Contact ? -1 : a.Contact > b.Contact ? 1 : 0);
        break;
      case 'Task':
        this.quotes.sort((a, b) => a.Task < b.Task ? -1 : a.Task > b.Task ? 1 : 0);
        break;
      case 'DueDate':
        this.quotes.sort((a, b) => a.DueDate < b.DueDate ? -1 : a.DueDate > b.DueDate ? 1 : 0);
        break;
      case 'TaskType':
        this.quotes.sort((a, b) => a.TaskType < b.TaskType ? -1 : a.TaskType > b.TaskType ? 1 : 0);
        break;
      default:
        return;
    }
    if (this.checked)
      this.quotes.reverse();
    this.dataSource = new MatTableDataSource<Quote>(this.quotes);
    this.dataSource.paginator = this.paginator;
  }

  handleCheckboxChange(): void {
    this.checked = !this.checked
    this.quotes.reverse();
    this.dataSource = new MatTableDataSource<Quote>(this.quotes);
    this.dataSource.paginator = this.paginator;
  }

  handleSearchChange(searchValue: string): void {
    if(searchValue.length > 1) {
      const task = this.quotes.filter((task) => task.QuoteType.toUpperCase() === searchValue.toUpperCase())
      this.dataSource = new MatTableDataSource<Quote>(task);
      this.dataSource.paginator = this.paginator;
    }

    if(!searchValue) {
      this.dataSource = new MatTableDataSource<Quote>(this.quotes);
      this.dataSource.paginator = this.paginator;    
    }
  }

  handleDelete(ID: number): void {
    if (this.access_token) {
      this.appService.removeQuote(this.access_token, ID)
        .subscribe(res => {
          this.fetchAllQuotes();
        }, err => {
          console.log(err)
        });
    }
  }

  goToEdit(ID: number): void {
    const findQuote = Object.assign({}, this.quotes.find(q => q.QuoteID === ID))
    if (findQuote) {
      this.quote = findQuote;
      this.editing = true;
    }
  }

  closeEditBox(): void {
    const confirmResult = confirm("Your changed won't be saved, Do you want to exit ?");
    if(confirmResult)
    this.editing = false;
  }

  goToDetails(id: number): void {
    this.router.navigate([`details/${id}`]);
  }

  fetchAllQuotes(): void {
    if (this.access_token) {
      this.appService.getAllQuote(this.access_token)
        .subscribe(res => {
          this.quotes = res;
        },
          err => {
            console.log(err);
          }, () => {
            this.dataSource = new MatTableDataSource<Quote>(this.quotes);
            this.dataSource.paginator = this.paginator;
          });
    }
  }

  handleEdit(form: NgForm): void {
    if (form.valid) {
      this.quote = {
        ... this.quote,
        QuoteType: form.value.QuoteType,
        Contact: form.value.Contact,
        Task: form.value.Task,
        DueDate: new Date(form.value.DueDate).toISOString().slice(0, 19),
        TaskType: form.value.TaskType,
      }
      if (this.access_token) {
        this.appService.updateQuote(this.access_token, this.quote)
          .subscribe(res => {
            this.fetchAllQuotes();
          }, err => {
            console.log(err);
          }, () => {
            this.editing = false;
            this.error = '';
          });
      }
    } else {
      this.error = 'Please fill the required fields'
    }
  }
}
