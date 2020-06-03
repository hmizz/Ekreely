import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room.model';
import { Subscription } from 'rxjs';
import { RoomsService } from 'src/app/services/rooms.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.component.html',
  styleUrls: ['./my-rooms.component.css']
})
export class MyRoomsComponent implements OnInit {
public myrooms: Room[]=[];
public room: Room ;
public tab : any ;
public reservation
private roomsSub: Subscription;
  constructor(public roomsService: RoomsService, public authService: AuthService) { }

  ngOnInit(): void {
    this.roomsService.getMyRooms(this.authService.getUserId());
    this.roomsSub = this.roomsService.getMyRoomsListener().subscribe(
      (rooms: Room[]) => {
        this.myrooms = rooms;
      }
    );
  }

  getRoom(id: string){
    return this.myrooms.filter(room => (room.id == id));
  }

}
