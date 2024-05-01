import dayjs from "dayjs";

export const isSameDay = (date1: Date, date2: Date): boolean => {
  const day1 = dayjs(date1).startOf('day');
  const day2 = dayjs(date2).startOf('day');
  return day1.isSame(day2);
};

export const timeToSlot = (date: Date) => {
  const day = dayjs(date).startOf('day');
  const time = dayjs(date);
  const diff = time.diff(day, 'minute');
  return diff / 15;
}

export const slotToTime = (slot: number, date: Date) => {
  const day = dayjs(date).startOf('day');
  return day.add(slot * 15, 'minute').toDate();
}

export const formatSlot = (slot: number, date: Date) => {
  return dayjs(slotToTime(slot, date)).format('HH:mm')
}