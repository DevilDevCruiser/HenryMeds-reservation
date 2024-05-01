import { useState, useEffect, useCallback } from 'react';
import { getSlotsForProvider, updateSlotsForDay, getAvailableSlotsForProvider } from '../api/reservation';
import { ProviderSlot } from '../types/reservation';

export const useSlotsForProvider = (providerId: number, date: Date) => {
  const [isLoading, setIsLoading] = useState(true);
  const [slots, setSlots] = useState<ProviderSlot[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setSlots(await getSlotsForProvider(providerId, date));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setIsLoading(false);
    }
  }, [providerId, date, ]);

  useEffect(() => {
    fetchData();
  }, [providerId, date, fetchData]);

  return { isLoading, slots, refresh: fetchData };
};

export const useAvailableSlotsForProvider = (providerId: number, date: Date) => {
  const [isLoading, setIsLoading] = useState(true);
  const [slots, setSlots] = useState<number[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setSlots(await getAvailableSlotsForProvider(providerId, date));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setIsLoading(false);
    }
  }, [providerId, date, ]);

  useEffect(() => {
    fetchData();
  }, [providerId, date, fetchData]);

  return { isLoading, slots, refresh: fetchData };
};

export const useSlotsApi = () => {
  return {
    updateSlotsForDay,
  };
};
