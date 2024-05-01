export type ProviderSlot = {
  providerId: number;
  from: number;
  to: number;
  date: Date;
};

export type Reservation = {
  id: number;
  clientId: number;
  providerId: number;
  slot: number;
  date: Date;
  confirmed: boolean;
  createdAt: Date;
};
