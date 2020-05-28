import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { UserData } from "src/app/models/user-data.model";
import { Subscription } from "rxjs";
import { FormGroup, NgForm } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  public userData: UserData;
  private userSub: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserData();
    this.userSub = this.userService
      .getUserUpdateListener()
      .subscribe((user: UserData) => {
        this.userData = user;
        console.log(this.userData);
      });
  }

  onUpdateUser(form : NgForm) {
    this.userService.updateUser(
      this.userData.id,
      form.value.gender,
      form.value.dateOfBirth,
      form.value.country,
      form.value.region,
      form.value.zipCode,
      this.userData.user
    );
    this.userData = this.userService.getUser();
  }
}