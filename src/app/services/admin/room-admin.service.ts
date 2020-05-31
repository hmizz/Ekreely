import { Room } from "../../models/room.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { stringify } from "querystring";

@Injectable({ providedIn: "root" })
export class RoomAdminService {
  private roomsList: Room[];
  private roomsUpdated = new Subject<Room[]>();
  private resultRoom: Room;

  constructor(private http: HttpClient, public router: Router) {}

  getRoomsList() {
    this.http
      .get<{ message: string; roomsList: any }>(
        "http://localhost:3000/api/admin/room"
      )
      .pipe(
        map((data) => {
          return data.roomsList.map((room) => {
            return {
              id: room._id,
              type: room.type,
              address: room.address,
              country: room.country,
              region: room.region,
              zipCode: room.zipCode,
              createdOn: room.createdOn,
              facility: room.facility,
              commodity: room.commodity,
              status: room.status,
              description: room.description,
              pricePerNight: room.pricePerNight,
              host: room.host,
            };
          });
        })
      )
      .subscribe((data) => {
        this.roomsList = data;
        this.roomsUpdated.next([...this.roomsList]);
      });
  }

  getRoomsUpdateListener() {
    return this.roomsUpdated.asObservable();
  }

  addRoom(room: Room) {
    const postedRoom: Room = {
      id: room.id,
      type: room.type,
      address: room.address,
      country: room.country,
      region: room.region,
      zipCode: room.zipCode,
      createdOn: room.createdOn,
      facility: room.facility,
      commodity: room.commodity,
      status: room.status,
      description: "",
      pricePerNight: 0,
      host: room.host,
    };
    this.http
      .post<{ message: string; roomID: string }>(
        "http://localhost:3000/api/admin/room",
        postedRoom
      )
      .subscribe((responseData) => {
        console.log(responseData);
        const id = responseData.roomID;
        room.id = id;
        this.roomsList.push(room);
        this.roomsUpdated.next([...this.roomsList]);
        this.router.navigate(["/admin/room"]);
      });
  }

  deleteRoom(id: string) {
    this.http
      .delete("http://localhost:3000/api/admin/room/delete" + id)
      .subscribe(() => {
        this.roomsList = this.roomsList.filter((room) => room.id !== id);
        this.roomsUpdated.next([...this.roomsList]);
      });
  }

  editRoom(room: Room) {
    this.http
      .put("http://localhost:3000/api/admin/room/edit/" + room.id, room)
      .subscribe((response) => console.log(response));
    this.router.navigate(["/admin/room"]);
  }

  getRoom(id: string) {
    this.getRoomsList();
    return { ...this.roomsList.find((room) => room.id === id) };
  }

  returnList() {
    this.getRoomsList();
    return this.roomsList;
  }
}
