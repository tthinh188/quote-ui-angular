import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Quote } from 'src/app/module';
import { AppService } from 'src/app/services/AppService';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css']
})
export class AddQuoteComponent implements OnInit {
  quote!: Quote
  error: string = '';
  constructor(private appService: AppService) { }
  access_token = localStorage.getItem('access_token');

  ngOnInit(): void {
  }

  handleAddQuote(form: NgForm): void {
    console.log(new Date(form.value.DueDate).toISOString().slice(0, 19))

    if (form.valid) {
      this.quote = {
        ... this.quote,
        QuoteType: form.value.QuoteType,
        Contact: form.value.Contact,
        Task: form.value.Task,
        DueDate: new Date(form.value.DueDate).toISOString().slice(0, 19),
        TaskType: form.value.TaskType,
      }

      if(this.access_token)
        this.appService.addQuote(this.access_token, this.quote)
          .subscribe(res => {
            window.location.href = '/';
          }, err =>{
            console.log(err)
          })
        ;
    }
    else {
      this.error = 'Please fill the required form'
    }
  }
}
