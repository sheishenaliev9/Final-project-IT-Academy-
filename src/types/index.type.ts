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
}

// ========================
// Dish

export interface IDishType {
  id: number;
  name: string;
  photo: string;
  price: number;
  made_of: string;
  type: number;
}