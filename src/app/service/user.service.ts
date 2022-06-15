import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // ApiUrl = 'http://localhost:4000';

  constructor(private _httpClient: HttpClient) {}

  // Get all user
  getAll(p: any, limit: any, search: string) {
    return this._httpClient.get<any>(
      `${environment.apiUrl}/users?page=${p}&limit=${limit}&search=${search}`
    );
  }

  // Get user By id
  getById(id: string) {
    return this._httpClient.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  // Update user by id
  updateByid(id: any, newData: any) {
    return this._httpClient.patch(`${environment.apiUrl}/users/${id}`, newData);
  }

  // Create user by id
  createNewUser(userdata: User) {
    return this._httpClient.post(`${environment.apiUrl}/register`, userdata);
  }

  // Celete user by id
  deleteUserById(id: any) {
    return this._httpClient.delete(`${environment.apiUrl}/users/${id}`);
  }
}
