export class Room {
  id: string;
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
  host: { hostName: string; hostId: string };
}
