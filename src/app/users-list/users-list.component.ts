import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getProductsList() {
    return this.http.get('http://localhost:3004/users');
  }
  

}
