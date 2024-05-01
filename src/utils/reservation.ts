import { Reservation } from "../types/reservation";
import dayjs from "dayjs";

export const isReservationExpired = (reservation: Reservation) => {
  return dayjs().diff(reservation.createdAt, 'minute') > 30;
};