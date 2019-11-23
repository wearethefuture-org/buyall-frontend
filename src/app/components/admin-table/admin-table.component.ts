import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/* ******************************************************
      Make view responsive (adjust to small screens)
   ****************************************************** */
@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {
  @Input() canDelete: boolean = false;
  @Input() canEdit: boolean = false;
  @Input() headers: string[];
  @Input() body: object[];
  @Output() editEmmiter = new EventEmitter<string>();
  @Output() deleteEmmiter = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
}
