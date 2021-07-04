import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  access_token = localStorage.getItem('access_token');

  constructor() { }

  ngOnInit(): void {
  }

  goToHome():void {
    window.location.href = "/"
  }

  logout():void {
    localStorage.removeItem('access_token')
  }
}
