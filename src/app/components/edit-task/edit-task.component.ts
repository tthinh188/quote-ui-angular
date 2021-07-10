import { Component, Input, OnInit } from '@angular/core';
import { Quote } from 'src/app/module';
import { AppService } from 'src/app/services/AppService';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  quote!: Quote;
  error!: string;

  // @Input() handleDelete: any;
  // @Input() goToEdit: any;
  // @Input() closeEditBox: any;
  // @Input() fetchAllQuotes: any;
  // @Input() handleEdit: any;
  // @Input() editing: boolean = false;
  // @Input() quote!: Quote;
  // @Input() error!: string;
  // @Input() access_token!: string;
  // @Input() quotes!: Array<Quote>;
  
  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  handleEdit(form: NgForm): void {
  
  }


}
