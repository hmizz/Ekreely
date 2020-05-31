import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room.model';
import { RoomAdminService } from '../../services/admin/room-admin.service';
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

  constructor(public roomAdminService: RoomAdminService) { }

  ngOnInit(): void {
    this.roomAdminService.getRoomsList();
    this.roomSub = this.roomAdminService.getRoomsUpdateListener()
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
    this.roomAdminService.deleteRoom(id);
  }

}
