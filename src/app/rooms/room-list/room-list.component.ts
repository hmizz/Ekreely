import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room } from 'src/app/models/room.model';
import { Subscription } from 'rxjs';
import { RoomsService } from 'src/app/services/rooms.service';
import { NgForm } from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  
  message :boolean = false ;
  rooms: Room[] = [] ;
  filter = { Apartments: true, Villas: true, Condos: true ,Hotels:true,ShowAll:true };
  filter1 = { Tunis: true, Nabeul: true, Sousse: true,Bizert:true,Mednine:true,Mahdia:true };
  private roomsSub: Subscription ;
  selectedAll: any;
  constructor(public roomsService: RoomsService) {}

  ngOnInit(): void {
    this.roomsService.getRooms();
    this.roomsSub = this.roomsService.getRoomUpdateListener()
    .subscribe((rooms: Room[]) => {
      
      this.rooms = rooms;
    });
    this.message= false ;
    
  }
  
  filterType() {
    this.rooms = this.roomsService.getRoomsArray();
    this.rooms = this.rooms.filter(x => 
          (x.type === 'Apartments' && this.filter.Apartments)
       || (x.type === 'Villas' && this.filter.Villas)
       || (x.type === 'Condos' && this.filter.Condos)
       || (x.type === 'Hotels' && this.filter.Hotels)
       

    );
  }
  filterDate(value) {
    this.rooms = this.roomsService.getRoomsArray();
    this.rooms = this.rooms.filter(x => 
         (x.region === value  && this.filter1.Tunis)
    
   );
  }
  selectAll() {
    this.rooms = this.roomsService.getRoomsArray(); 
  }
}
