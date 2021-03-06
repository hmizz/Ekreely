// tslint:disable-next-line: eofline
// service to send req to add new user
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private fullName: string;
  private authStatusListener = new Subject<boolean>();
  getToken() {
    return this.token;
  }
  getUserId() {
    return this.userId;
  }
  getFullName() {
    return this.fullName;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  createUser(fullName: string,  phoneNumber: string, email: string, password: string) {
    const authData: AuthData = {fullName, phoneNumber, email, password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(() => {
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
      this.authStatusListener.next(false);
    });
  }
  login(fullName: string,  phoneNumber: string, email: string, password: string) {
    const authData: AuthData = {fullName, phoneNumber, email, password};
    this.http.post<{token: string, expiresIn: number, userId: string, fullName: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.fullName= response.fullName;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date( now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate,this.fullName, this.userId);
          this.router.navigate(['/']);
       }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    console.log(authInformation);
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(authInformation);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.fullName = authInformation.fullName;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  private setAuthTimer(duration: number) {
    console.log('setting timer:' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    } , duration * 1000);
  }
  private saveAuthData(token: string, expirationDate: Date,fullName:string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('fulName', fullName);
    localStorage.setItem('userId', userId);

  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userId');

  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const fullName = localStorage.getItem('fullName');
    const userId = localStorage.getItem('userId');

    if (!(token || expirationDate)) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      fullName,
      userId
    };
  }
}
