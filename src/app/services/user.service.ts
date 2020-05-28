import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserData } from "../models/user-data.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private user: UserData;
  private userUpdated = new Subject<UserData>();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  getUserData() {
    console.log(this.authService.getID());
    this.http
      .get<{ message: string, userDetails: UserData }>(
        "http://localhost:3000/api/user/" + this.authService.getID())
    
      .subscribe((userDetails) => {
        
        this.user = userDetails.userDetails;
        this.userUpdated.next(this.user);
      });
  }
  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  getUser() {
    return this.user;
  }

  updateUser(
    id: string,
    gender: string,
    dateOfBirth: string,
    country: string,
    region: string,
    zipCode: string,
    user: string,
  ) {
    let UserData: UserData = {
      id : id ,
      gender: gender,
    dateOfBirth: dateOfBirth,
    country: country,
    region: region,
    zipCode: zipCode,
    user: user
    };

    this.http
      .patch<{ message: string }>(
        "http://localhost:3000/api/user/" + this.authService.getID(),
        UserData
      )
      .subscribe(() => {
        this.user = UserData;
        this.router.navigate(["/UserPanel"]);
      });
  }
}
