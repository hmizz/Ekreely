import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../../services/rooms.service';
import { NgForm } from '@angular/forms';
import { Room } from '../../../models/room.model';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  selectedRoom: Room;
  roomID: string;



  constructor(public roomsService: RoomsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('roomID')) {
        this.roomID = paramMap.get('roomID');
        console.log('Success ' + 'id : ' + this.roomID);
        this.selectedRoom = this.roomsService.getRoom(this.roomID);
      } else {
        console.log('Failed to load');
      }
    });
  }

  onSaveRoom(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const roomForm: Room = {
      id: this.selectedRoom.id,
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
      createdOn: this.selectedRoom.createdOn, 
      host: null,
    };



    this.roomsService.editRoom(roomForm);
    console.log('From component submitted ', this.selectedRoom.id);
  }


}
