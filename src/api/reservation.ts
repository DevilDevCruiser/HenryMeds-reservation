import dayjs from 'dayjs';
import { Reservation, ProviderSlot } from '../types/reservation';
import { isSameDay } from '../utils/date';
import { isReservationExpired } from '../utils/reservation';

let reservations: Reservation[] = [
  {
    id: 1,
    clientId: 1,
    providerId: 2,
    date: new Date(),
    slot: 14,
    confirmed: false,
    createdAt: new Date(),
  },
  {
    id: 2,
    clientId: 1,
    providerId: 3,
    date: new Date(),
    slot: 14,
    confirmed: false,
    createdAt: dayjs(new Date()).startOf('day').toDate(),
  },
  {
    id: 3,
    clientId: 1,
    providerId: 3,
    date: new Date(),
    slot: 10,
    confirmed: true,
    createdAt: new Date(),
  },
  {
    id: 4,
    clientId: 4,
    providerId: 2,
    date: new Date(),
    slot: 11,
    confirmed: true,
    createdAt: new Date(),
  },
];

let providerSlots: ProviderSlot[] = [
  {
    providerId: 2,
    from: 9,
    to: 12,
    date: new Date(),
  },
  {
    providerId: 3,
    from: 10,
    to: 20,
    date: new Date(),
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateSlotsForDay = async (
  providerId: number,
  date: Date,
  slots: ProviderSlot[]
) => {
  await sleep(500);
  providerSlots = providerSlots.filter(
    (slot) => slot.providerId !== providerId && !isSameDay(slot.date, date)
  );
  providerSlots.push(...slots);
};

export const reserveSlot = async (
  clientId: number,
  providerId: number,
  date: Date,
  slot: number
) => {
  await sleep(500);
  const reservation: Reservation = {
    id: Math.floor(Math.random() * 500),
    clientId,
    providerId,
    date,
    slot,
    confirmed: false,
    createdAt: new Date(),
  };
  reservations.push(reservation);
};

export const confirmReservation = async (reservationId: number) => {
  await sleep(500);
  const reservation = reservations.find(
    (reservation) => reservation.id === reservationId
  );
  if (reservation) {
    reservation.confirmed = true;
  }
};

export const getReservationsForProvider = async (
  providerId: number,
  date: Date
) => {
  await sleep(500);
  return reservations
    .filter(
      (reservation) =>
        reservation.providerId === providerId &&
        isSameDay(reservation.date, date)
    )
    .sort((a, b) => a.slot - b.slot);
};

export const getSlotsForProvider = async (providerId: number, date: Date) => {
  await sleep(500);
  return providerSlots.filter(
    (slot) => slot.providerId === providerId && isSameDay(slot.date, date)
  );
};

export const getReservationsForClient = async (
  clientId: number,
  date: Date
) => {
  await sleep(500);
  return reservations
    .filter(
      (reservation) =>
        reservation.clientId === clientId && isSameDay(reservation.date, date)
    )
    .sort((a, b) => a.slot - b.slot);
};

export const getAvailableSlotsForProvider = async (
  providerId: number,
  date: Date
) => {
  const reservations = (
    await getReservationsForProvider(providerId, date)
  ).filter((reservation) => !isReservationExpired(reservation));
  console.log(reservations)
  const slots = await getSlotsForProvider(providerId, date);
  const reservedSlots = reservations.map((reservation) => reservation.slot);
  const availableSlots = slots
    .flatMap((slot) =>
      Array.from({ length: slot.to - slot.from }, (_, i) => i + slot.from)
    )
    .filter((slot) => !reservedSlots.includes(slot));
  return availableSlots;
};

export const removeReservation = async (reservationId: number) => {
  await sleep(500);
  reservations = reservations.filter(
    (reservation) => reservation.id !== reservationId
  );
};
