import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/AppService';
import { Quote } from 'src/app/module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  access_token = localStorage.getItem('access_token');
  public quotes: Array<Quote> = [];

  constructor (private appService: AppService ) { }

  ngOnInit(): void {
    if(this.access_token) {
      this.appService.getAllQuote(this.access_token)
        .subscribe(res => {
          this.quotes = res;
        },
        err => {
          console.log(err);
        });
    }
  }

}
