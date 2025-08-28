export interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  pinHash: string;
}
export interface Beneficiary {
  id: string;
  name: string;
  method: string;
}
export interface Transaction {
  id: string;
  userId: string;
  recipient: string;
  amount: number;
  method: string;
  currency: string;
  status: string;
  createdAt: string;
}

export interface Database {
  users: User[];
  transactions: Transaction[];
}
