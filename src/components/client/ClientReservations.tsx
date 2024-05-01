import React from 'react'
import { List, ListItem, ListItemText, Button, Typography, Chip, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useReservationsForClient } from '../../hooks/reservations';
import { formatSlot } from '../../utils/date';
import { useAuthentication } from '../../hooks/auth';
import UserAvatar from '../UserAvatar';
import { useReservationApi } from '../../hooks/reservations';
import ReserveDialog from './ReserveDialog';
import { isReservationExpired } from '../../utils/reservation';

type ReservationsProps = {
  date: Date
}

export default function ClientReservations(props: ReservationsProps) {
  const { date } = props;
  const { user } = useAuthentication();
  const { reservations, isLoading, refresh } = useReservationsForClient(user?.id ?? 1, date);
  const { confirmReservation, removeReservation } = useReservationApi();

  const onConfirm = async (reservationId: number) => {
    await confirmReservation(reservationId);
    await refresh();
  }


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await refresh();
  };

  const handleRemove = async (reservationId: number) => {
    await removeReservation(reservationId);
    await refresh();
  }

  return (
    <div>
      <Typography variant="h6">Reservations</Typography>
      <hr />
      <Button variant="contained" onClick={handleClickOpen}>Add new reservation</Button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <List>
            {reservations.map(reservation => (
              <ListItem
                secondaryAction={
                  <>
                    {
                      isReservationExpired(reservation) ?
                        <Chip size='small' color="error" label="Expired" /> : (
                          reservation.confirmed ?
                            <Chip size='small' color="success" label="Confirmed" /> :
                            <Button size='small' variant='contained' color="error"
                              onClick={() => onConfirm(reservation.id)}>
                              Confirm
                            </Button>
                        )
                    }
                    <IconButton color='secondary' onClick={() => handleRemove(reservation.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }>
                <ListItemText primary={
                  <Grid container alignItems={'center'}>
                    <div>{`${formatSlot(reservation.slot, date)}~${formatSlot(reservation.slot + 1, date)}`}</div>
                    <UserAvatar userId={reservation.providerId} />
                  </Grid>}
                />
              </ListItem>
            ))}
          </List>
        </div >
      )
      }
      {open && <ReserveDialog open={open} handleClose={handleClose} date={date} />}
    </div >
  )
}
