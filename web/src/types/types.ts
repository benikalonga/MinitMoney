export type Transaction = {
  id: string;
  userId: string;
  recipient: Beneficiary;
  method: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
};
export interface Beneficiary {
  id: string;
  name: string;
  method: string;
}
export interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  pinHash: string;
}
