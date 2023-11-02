// ========================
// User
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

export interface IMenuType {
  id: number;
  name: string;
  photo: string;
  price: number;
  made_of: string;
  amount: string;
  type: number;
  category?: number;
}

// ========================
// Restaurant

export interface IRestaurantType {
  id: number;
  available_tables: number;
  rating: number;
  dishes: IMenuType[];
  drinks: IMenuType[];
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
  total_price: number;
  person: number;
  dishes: IMenuType[];
  drinks: IMenuType[];
}

export interface ICartActions {
  person_id?: string;
  dish_id?: string;
  drink_id?: string;
  action?: string;
}

// ========================
// Table

export interface ITableType {
  id: number;
  number: number;
  is_reserved: boolean;
  reserved_time: null;
  restaurant: number;
  reserved_by: null;
  dishes: IMenuType[];
}
