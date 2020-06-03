import { Component, OnInit, SystemJsNgModuleLoader } from "@angular/core";
import { Room } from "../../../models/room.model";
import { NgForm } from "@angular/forms";
import { RoomsService } from "../../../services/rooms.service";

@Component({
  selector: "app-add-room",
  templateUrl: "./add-room.component.html",
  styleUrls: ["./add-room.component.css"],
})
export class AddRoomComponent implements OnInit {


  constructor(public roomsService: RoomsService) {}

  ngOnInit(): void {}

  onSubmitRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const date = new Date();
    console.log(form.value.roomRegion);
    const roomForm: Room = {
      id: "",
      title: form.value.roomTitle,
      type: form.value.roomType,
      address: form.value.roomAddress,
      country: form.value.roomCountry,
      region: form.value.roomRegion,
      zipCode: form.value.roomZipCode,
      facility: form.value.roomFacility,
      commodity: form.value.roomCommodity,
      status: form.value.roomStatus,
      description: form.value.roomDescription,
      pricePerNight: form.value.roomPrice,
      capacity: form.value.roomCapacity,
      createdOn: date, 
      host: null,
      

    };

    this.roomsService.addRoom(roomForm);
    
  }
}
