import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room } from 'src/app/models/room.model';
import { Subscription } from 'rxjs';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit, OnDestroy {
  isLoading = false;
  message = false ;
  rooms: Room[] = [] ;
  private roomsSub: Subscription ;
  constructor(public roomsService: RoomsService) { }

  ngOnInit(): void {
    this.isLoading= true ;
    this.roomsSub = this.roomsService.getRoomUpdateListener()
    .subscribe((rooms: Room[]) => {
      this.isLoading = false;
      this.rooms = rooms;
      console.log(this.rooms);
    });
    if (this.rooms.length==0)
    {
     this.message =true;
    }
  }
  ngOnDestroy() {
    this.roomsSub.unsubscribe();
  }
}
