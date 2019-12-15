import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicsService extends BaseService {

  constructor(
    public router: Router,
    http: HttpClient
  ) { super(router, http); }

  getCharacteristicSettingById(id: number): Observable<any> { // interface here
    return this.get(`/setting/${id}`);
  }
}
