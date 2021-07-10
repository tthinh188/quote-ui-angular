import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription  } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { Quote } from 'src/app/module';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id!: number;
  routeSub!: Subscription;
  access_token = localStorage.getItem('access_token') || '';
  quote!: Quote;

  constructor(private activatedRoute: ActivatedRoute, private appService: AppService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {this.id = params['id']})
    this.appService.getQuote(this.access_token, this.id).subscribe(
      res => {
        this.quote = res;
      },
      err => {
        console.log(err);
      },
    )
  }

}
