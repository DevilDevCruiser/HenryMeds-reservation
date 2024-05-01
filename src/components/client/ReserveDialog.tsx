import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Grid, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { useAvailableSlotsForProvider } from '../../hooks/slots';
import { useAuthentication, useUsersByRole } from '../../hooks/auth';
import { formatSlot } from '../../utils/date';
import { useReservationApi } from '../../hooks/reservations';

interface ReserveDialogProps {
  open: boolean;
  handleClose: () => void;
  date: Date;
}

export default function ReserveDialog(props: ReserveDialogProps) {
  const { open, handleClose, date } = props;
  const { user } = useAuthentication();
  const providers = useUsersByRole('provider')
  const [providerId, setProviderId] = useState<number>(providers[0]?.id);
  const { reserveSlot } = useReservationApi();
  const { isLoading, slots, refresh } = useAvailableSlotsForProvider(providerId, date);

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
    >
      <DialogTitle>Add new reservation</DialogTitle>
      <DialogContent>
        <br />
        <Autocomplete
          disablePortal
          getOptionLabel={(option) => option.username}
          options={providers}
          onChange={(_, newValue) => {
            if (newValue) {
              setProviderId(newValue.id);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Provider" />}
        />
        <br />
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <>
            <Grid container >
              {slots.map((slot) => (
                <Grid item key={slot} xs={24}>
                  <Button fullWidth variant='contained' onClick={async () => {
                    await reserveSlot(user?.id ?? 1, providerId, date, slot);
                    await refresh();
                    handleClose();
                  }}>
                    {formatSlot(slot, date)} ~ {formatSlot(slot + 1, date)}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </>
        )}

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog >
  );
}
