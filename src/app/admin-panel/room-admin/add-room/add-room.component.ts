import { Component, OnInit } from "@angular/core";
import { Room } from "../../../models/room.model";
import { NgForm } from "@angular/forms";
import { RoomAdminService } from "../../../services/admin/room-admin.service";
import { stringify } from "querystring";

@Component({
  selector: "app-add-room",
  templateUrl: "./add-room.component.html",
  styleUrls: ["./add-room.component.css"],
})
export class AddRoomComponent implements OnInit {
  constructor(public roomAdminService: RoomAdminService) {}

  ngOnInit(): void {}

  onSubmitRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const roomForm: Room = {
      id: "",
      type: form.value.roomType,
      address: form.value.roomAddress,
      country: form.value.roomCountry,
      region: form.value.roomRegion,
      zipCode: form.value.roomZipCode,
      createdOn: form.value.roomCreatedOn,
      facility: form.value.roomFacility,
      commodity: form.value.roomCommodity,
      status: form.value.roomStatus,
      description: "",
      pricePerNight: 0,
      host: form.value.roomHost,
    };

    this.roomAdminService.addRoom(roomForm);
    form.resetForm();
  }
}
