import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuoteDetailsComponent } from './components/quote-details/quote-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'addQuote',
    component: AddQuoteComponent,
  },
  {
    path: 'edit/:id',
    component: QuoteDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
