export class Room {
  id: string;
  title: string;
  type: string;
  address: string;
  country: string;
  region: string;
  zipCode: string;
  createdOn: Date;
  facility: number;
  commodity: number;
  status: number;
  description: string;
  pricePerNight: number;
  capacity: number;
  host: { hostName: string; hostId: string };
}
