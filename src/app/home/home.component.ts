import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RoomsService } from "../services/rooms.service";

@Component({
  selector: "app-home-cart",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
// tslint:disable-next-line: component-class-suffix
export class HomeComponent implements OnInit {
  isLoading = false;
  startDate: Date;
  endDate: Date;
  dateStatus = true;
  currentDate: Date;
  constructor(public roomsService: RoomsService) {}

  ngOnInit(): void {
    this.currentDate = new Date();
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let startDate: Date = new Date(form.value.startDate);
    let endDate: Date = new Date(form.value.endDate);
    if (startDate > endDate) {
      this.dateStatus = false;
      return;
    } else {
      this.dateStatus = true;
    }

    form.resetForm();
  }
}
