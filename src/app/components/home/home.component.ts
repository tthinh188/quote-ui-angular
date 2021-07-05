import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/AppService';
import { Quote } from 'src/app/module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  access_token = localStorage.getItem('access_token');

  public quotes: Array<Quote> = [];
  public quote!: Quote;
  editing: boolean = false;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.fetchAllQuotes();
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
    this.editing = false;
  }

  fetchAllQuotes(): void {
    if (this.access_token) {
      this.appService.getAllQuote(this.access_token)
        .subscribe(res => {
          this.quotes = res;
        },
          err => {
            console.log(err);
          });
    }
  }

  handleEdit(form: NgForm): void {
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
          console.log(this.quote)
          this.fetchAllQuotes();
          this.editing = false;
        }, err => {
          console.log(err);
        })
        ;

    }
  }
}
