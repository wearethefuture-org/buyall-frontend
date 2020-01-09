import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit {
  @Input() canDelete: boolean;
  @Input() canEdit: boolean;
  @Input() headers: string[];
  @Input() body: object[];
  @Output() editEmmiter: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteEmmiter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
}
