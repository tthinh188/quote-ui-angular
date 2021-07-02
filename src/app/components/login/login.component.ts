import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Credential } from 'src/app/module';
import { ApiService } from '../services/credentialService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  credential: Credential = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Role: "Member",
  };
  error!: string;
  errorList: string[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  handleSubmit(form: NgForm): void {
    this.error = "";
    if (form.valid) {
      if (form.value.Password !== form.value.ConfirmPassword) {
        this.error = "Password does not match";
        return;
      }
      else {
        this.credential = {
          ... this.credential,
          Email: form.value.Email,
          Password: form.value.Password,
          ConfirmPassword: form.value.ConfirmPassword
        }
        this.apiService.register(this.credential)
          .subscribe(res => {
            console.log(res);
          },
          err => {
            const result = Object.keys(err.error.ModelState)
            result.forEach(key => this.errorList.push(err.error.ModelState[key]));
            console.log(this.errorList[0])
            console.log(err.error.ModelState);
            this.error = err.error.Message;
          });

        // this.apiService.getAccessToken(this.credential)
        //   .subscribe(res => {
        //     console.log(res);
        //   },
        //   err => {
        //     console.log(err);
        //   });
      }
    }
    else {
      if (!form.value.Email || !form.value.Password || !form.value.ConfirmPassword)
        this.error = "Please fill the required form"
      else {
        this.error = "Email is not valid"
      }
    }
  }
}
