import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Quote } from '../module';

@Injectable({ providedIn: 'root' })

export class AppService {
    constructor(private http: HttpClient) { }

    getAllQuote(access_token: string): Observable<any> {
        let header = new HttpHeaders().set("Authorization", `bearer ${access_token}`);
        return this.http.get(`${env.BASE_URL}/api/Quote`, { headers: header });
    }

    addQuote(access_token: string, quote: Quote): Observable<any> {
        let header = new HttpHeaders().set("Authorization", `bearer ${access_token}`);
        return this.http.post(`${env.BASE_URL}/api/Quote`, quote, { headers: header });
    }
}