export interface IUserType {
  username: string;
  email?: string;
  password: string;
  number?: string;
}

export type Inputs = {
  username: string;
  password: string;
  email?: string;
  number?: number;
};

export interface IPersonType {
  email: string;
  id: number;
  name: string;
  number: string;
  photo: string | null;
  user: number;
  tg_id: string;
}

// ========================
// Dish

export interface IDishType {
  id: number;
  name: string;
  photo: string;
  price: number;
  made_of: string;
  amount: string;
  type: number;
}

// ========================
// Restaurant

export interface IRestaurantType {
  id: number;
  available_tables: number;
  rating: number;
  dishes: IDishType[];
  drinks: IDishType[];
  name: string;
  description: string;
  photo_1: string;
  average_bill: number;
  tables: number;
  address: string;
  plan: string;
  owner: number;
  type: number[];
}

// ========================
// Cart

export interface ICartType {
  id: number;
  person: number;
  totalPrice: number
  dishes: IDishType[];
  drinks: IDishType[];
}
