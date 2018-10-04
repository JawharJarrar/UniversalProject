import { Observable } from 'rxjs';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

import { Signup } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  login(auth: Signup): Observable<Signup> {
     return this.http.post<Signup>(this.authUrl + 'login', auth);
  }

  register(auth: Signup) {
    this.http.post(this.authUrl + '/register', auth).subscribe();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', 'fake register token');
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
  IsLoggedin() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if  (!token) {
        return false;
    }
    return true;
   }
    }
}
