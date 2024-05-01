import { List, ListItem, ListItemText, Typography, Chip, Grid } from '@mui/material';
import { useReservationsForProvider } from '../../hooks/reservations';
import { formatSlot } from '../../utils/date';
import { useAuthentication } from '../../hooks/auth';
import UserAvatar from '../UserAvatar';

type ReservationsProps = {
  date: Date
}

export default function Reservations(props: ReservationsProps) {
  const { date } = props;
  const { user } = useAuthentication();
  const { reservations, isLoading } = useReservationsForProvider(user?.id ?? 1, date);

  return (
    <div>
      <Typography variant="h6">Reservations</Typography>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <List>
            {reservations.map(reservation => (
              <ListItem
                secondaryAction={
                  reservation.confirmed ?
                    <Chip size='small' color="success" label="Confirmed" /> :
                    <Chip size='small' color="error" label="Pending" />
                }>
                <ListItemText primary={
                  <Grid container alignItems={'center'}>
                    <div>{`${formatSlot(reservation.slot, date)}~${formatSlot(reservation.slot + 1, date)}`}</div>
                    <UserAvatar userId={reservation.clientId} />
                  </Grid>}
                />
              </ListItem>
            ))}
          </List>
        </div >
      )
      }
    </div >
  )
}
