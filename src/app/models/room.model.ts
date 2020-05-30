export class Room {
    id: string;
    type: string ;
    adress: string;
    country: string;
    region: string;
    zipCode: string;
    createdOn: Date;
    facility: number;
    commodity: number;
    host: {hostName: string, hostId: string};
  }