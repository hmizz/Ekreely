// use auth data to submit data to the backend and then if we need a user then we will add a seperate model
export interface AuthData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}
