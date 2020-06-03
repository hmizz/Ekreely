import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room.model';
import { RoomAdminService } from '../../services/admin/room-admin.service';
import { RoomsService } from '../../services/rooms.service'
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-room-admin',
  templateUrl: './room-admin.component.html',
  styleUrls: ['./room-admin.component.css']
})
export class RoomAdminComponent implements OnInit {

  private roomSub: Subscription;
  roomsList: Room[];
  public selectedRoom: Room;

  constructor(public roomsService: RoomsService) { }

  ngOnInit(): void {
    this.roomsService.getRooms();
    this.roomSub = this.roomsService.getRoomUpdateListener()
      .subscribe((roomsList: Room[]) => {
        this.roomsList = roomsList;
      });
  }


  onSelect(room: Room): void {
    this.selectedRoom = room;
  }

  onAdd() {
    this.selectedRoom = null;
  }

  onDelete(id: string) {
    this.roomsService.deleteRoom(id);
  }

}
