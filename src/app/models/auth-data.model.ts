// use auth data to submit data to the backend and then if we need a user then we will add a seperate model
export interface AuthData {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
}
