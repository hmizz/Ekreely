import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { Room } from 'src/app/models/room.model';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit {

  constructor(public roomsService: RoomsService, public authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmitRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const room: Room = {
      id: "",
      title: form.value.title,
      type: form.value.type,
      address: form.value.address,
      country: "",
      region: form.value.region,
      zipCode: "",
      createdOn: null,
      facility: 0,
      commodity: form.value.roomCommodity,
      status: 0,
      description: form.value.description,
      pricePerNight: form.value.pricePerNight,
      capacity: form.value.capacity,
      host: {hostName:this.authService.getFullName() , hostId:this.authService.getUserId()},
    };

    this.roomsService.addRoom(room);
    form.resetForm();
  }
}
