import { useState, useEffect, useCallback } from 'react';
import { getReservationsForProvider, getReservationsForClient, confirmReservation, reserveSlot, removeReservation} from '../api/reservation';
import { Reservation } from '../types/reservation';

export const useReservationsForProvider = (providerId: number, date: Date) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setReservations(await getReservationsForProvider(providerId, date));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setIsLoading(false);
    }
  }, [providerId, date, ]);

  useEffect(() => {
    fetchData();
  }, [providerId, date, fetchData]);

  return { isLoading, reservations, refresh: fetchData };
}

export const useReservationsForClient = (clientId: number, date: Date) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setReservations(await getReservationsForClient(clientId, date));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setIsLoading(false);
    }
  }, [clientId, date, ]);

  useEffect(() => {
    fetchData();
  }, [clientId, date, fetchData]);

  return { isLoading, reservations, refresh: fetchData };
}

export const useReservationApi = () => {
  return {
    confirmReservation,
    reserveSlot,
    removeReservation
  }
}