import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';

import { useSlotsForProvider } from '../../hooks/slots';
import { useAuthentication } from '../../hooks/auth';
import { ProviderSlot } from '../../types/reservation';
import { slotToTime, timeToSlot } from '../../utils/date';
import { useSlotsApi } from '../../hooks/slots';

interface EditSlotsDialogProps {
  open: boolean;
  handleClose: () => void;
  date: Date;
}

export default function EditSlotsDialog(props: EditSlotsDialogProps) {
  const { open, handleClose, date } = props;
  const { user } = useAuthentication();
  const { isLoading, slots, refresh } = useSlotsForProvider(user?.id ?? 0, date);
  const [editingSlots, setEditingSlots] = useState<ProviderSlot[]>(slots);
  const { updateSlotsForDay } = useSlotsApi();

  useEffect(() => {
    setEditingSlots(slots)
  }, [slots])
  const handleAddSlot = () => {
    setEditingSlots([...editingSlots, { from: 0, to: 0, date, providerId: user?.id ?? 0 }]);
  };

  const handleRemoveSlot = (index: number) => {
    const updatedSlots = [...editingSlots];
    updatedSlots.splice(index, 1);
    setEditingSlots(updatedSlots);
  };

  const handleTimeChange = (index: number, field: 'from' | 'to', value: number) => {
    const updatedSlots = [...editingSlots];
    updatedSlots[index][field] = value;
    setEditingSlots(updatedSlots);
  };

  const handleSubmit = () => {
    // check for slots overlap
    const slots = editingSlots
    .flatMap((slot) =>
      Array.from({ length: slot.to - slot.from }, (_, i) => i + slot.from)
    )
    .sort((a, b) => a - b);
    for (let i = 0; i < slots.length - 1; i++) {
      if (slots[i] === slots[i + 1]) {
        enqueueSnackbar('Slots overlap', { variant: 'error' });
        return;
      }
    }
    updateSlotsForDay(user?.id ?? 0, date, editingSlots).then(async () => {
      await refresh();
      handleClose();
    })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Update Availability</DialogTitle>
      <DialogContent>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <>
            {editingSlots.map((slot, index) => (
              <Grid container wrap="nowrap" key={index} spacing={2} padding={2} alignItems={'center'}>
                <Grid item>
                  <MobileTimePicker
                    label="Start Time"
                    minutesStep={15}
                    value={dayjs(slotToTime(slot.from, date))}
                    onChange={(value) => value && handleTimeChange(index, 'from', timeToSlot(value.toDate()))}
                  />
                </Grid>
                <Grid item>
                  <MobileTimePicker
                    label="End Time"
                    minutesStep={15}
                    value={dayjs(slotToTime(slot.to, date))}
                    onChange={(value) => value && handleTimeChange(index, 'to', timeToSlot(value.toDate()))}
                  />

                </Grid>

                <Grid item>
                  <IconButton onClick={() => handleRemoveSlot(index)}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button onClick={handleAddSlot}>Add Slot</Button>
          </>
        )}

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog >
  );
}
