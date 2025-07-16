type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address
}