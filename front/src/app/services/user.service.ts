import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: Users;
  users: Users[];
  readonly URL_API = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {
    this.selectedUser = new Users();
  }

  getUsers() {
    return this.http.get(this.URL_API);
  }
  // tslint:disable-next-line: variable-name
  getUser(_id: string){
    return this.http.get(this.URL_API + `/${_id}`)
  }
  postUser(user: Users){
    return this.http.post(this.URL_API, user);
  }
}