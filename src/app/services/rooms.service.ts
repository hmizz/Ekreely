import { Room } from "../models/room.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class RoomsService {
  private rooms: Room[] = [];
  private roomsUpdated = new Subject<Room[]>();
  private myRooms:Room[] = [];
  private myRoomsUpdated = new Subject<Room[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getRooms() {
    this.http
      .get<{ message: string; rooms: any }>("http://localhost:3000/api/rooms")
      .pipe(
        map((roomData) => {
          return roomData.rooms.map((room) => {
            return {
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
              host: null,
            };
          });
        })
      )
      .subscribe((transformedrooms) => {
        this.rooms = transformedrooms;
        this.roomsUpdated.next([...this.rooms]);
        this.router.navigate(['/rooms']);
      });
  }

  getRoomUpdateListener() {
    return this.roomsUpdated.asObservable();
  }

  searchRooms(city: string, startDate: Date, endDate: Date, capacity: number) {
    this.http
      .patch<{ message: string; rooms: any }>(
        "http://localhost:3000/api/rooms",
        {
          city: city,
          starDate: startDate,
          endDate: endDate,
          capacity: capacity,
        }
      )
      .pipe(
        map((roomData) => {
          return roomData.rooms.map((room) => {
            return {
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
      .subscribe((transformedrooms) => {
        this.rooms = transformedrooms;
        this.roomsUpdated.next([...this.rooms]);
        this.router.navigate(['/rooms']);
      });
  }
  getRoom(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      creator: string;
    }>("http://localhost:3000/api/rooms/" + id);
  }

  addRoom(title: string, content: string, creator: string) {
    const room: Room = {
      id: "string",
      type: "string",
      address: "string",
      country: "string",
      region: "string",
      zipCode: "string",
      createdOn: new Date(),
      facility: 0,
      commodity: 0,
      status: 0,
      description: "",
      pricePerNight: 0,
      host: { hostName: "string", hostId: "string" },
    };
    this.http
      .post<{ message: string; roomId: string }>(
        "http://localhost:3000/api/rooms",
        room
      )
      .subscribe((ResponseData) => {
        const id = ResponseData.roomId;
        room.id = id;
        this.rooms.push(room);
        this.roomsUpdated.next([...this.rooms]);
        this.router.navigate(["/"]);
        // ('/')
      });
  }

  getMyRooms(hostId: string){
    this.http
    .get<{ message: string; rooms: any }>("http://localhost:3000/api/rooms/myrooms/"+ hostId)
    .pipe(
      map((roomData) => {
        return roomData.rooms.map((room) => {
          return {
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
            host: {hostName: room.hostName, hostId: room.hostId},
          };
        });
      })
    )
    .subscribe((transformedrooms) => {
      this.myRooms = transformedrooms;
      this.myRoomsUpdated.next([...this.rooms]);
    });
    console.log(this.myRooms);
  }
  updateRoom(id: string, title: string, content: string, creator = null) {
    const room: Room = {
      id: "string",
      type: "string",
      address: "string",
      country: "string",
      region: "string",
      zipCode: "string",
      createdOn: new Date(),
      facility: 0,
      commodity: 0,
      status: 0,
      description: "",
      pricePerNight: 0,
      host: { hostName: "string", hostId: "string" },
    };
    this.http
      .put("http://localhost:3000/api/rooms/" + id, room)
      .subscribe((response) => {
        const updatedrooms = [...this.rooms];
        const oldroomIndex = updatedrooms.findIndex((p) => p.id === room.id);
        updatedrooms[oldroomIndex] = room;
        this.rooms = updatedrooms;
        this.roomsUpdated.next([...this.rooms]);
        this.router.navigate(["/"]);
        // ('/')
      });
  }
  deleteRoom(roomId: string) {
    this.http
      .delete("http://localhost:3000/api/rooms/" + roomId)
      .subscribe(() => {
        const updatedrooms = this.rooms.filter((room) => room.id !== roomId);
        this.rooms = updatedrooms;
        this.roomsUpdated.next([...this.rooms]);
      });
  }
}
