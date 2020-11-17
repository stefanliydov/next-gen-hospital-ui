import { Injectable } from '@angular/core';
import { AuthKeywords } from '../../contants/contants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveProperty(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getProperty(key: string): string {
    return localStorage.getItem(key);
  }

  removeUser() {
    localStorage.removeItem(AuthKeywords.USERNAME);
  }
}
