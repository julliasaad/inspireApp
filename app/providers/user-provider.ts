import { Headers, Http, RequestOptions } from '@angular/http';

import { IGroup } from '../interfaces/events';
import { IUser } from '../interfaces/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { StateProvider } from './state-provider';

@Injectable()
export class UserProvider {

  constructor(
    private http: Http,
    private stateProvider: StateProvider
  ) { }

  create(user: IUser): Observable<IUser> {
    console.log("entrei no create");
    let url = `https://quiet-dawn-28527.herokuapp.com/api/user`;
    return this.http.post(url, user)
      .switchMap(r => {
        console.dir(r);
        const result = r.json();
        return Observable.of(result);
    	});
  }

  // getId(email: string): Observable<string> {
  //   let url = `https://quiet-dawn-28527.herokuapp.com/api/user`;
  //   return this.http.post(url, email)
  //     .switchMap(r => {
  //       console.dir(r);
  //       const result = r.json();
  //       return Observable.of(result);
  //   	});
  // }
}