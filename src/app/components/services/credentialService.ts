import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credential } from 'src/app/module';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable()
export class ConfigService {
    constructor(private http: HttpClient) { }
}

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) {
    }

    register(credential: Credential): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(credential);
        return this.http.post(`${env.BASE_URL}/api/Account/Register`, body, { 'headers': headers });
    }

    getAccessToken(credential: Credential): Observable<any> {
        let body = new URLSearchParams();
        body.set('UserName', credential.Email);
        body.set('Password', credential.Password);
        body.set('grant_type', 'password');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        })
        return this.http.post(`${env.BASE_URL}/token`, body, { 'headers': headers })
    }
}