import React from 'react'
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';

import { useSlotsForProvider } from '../../hooks/slots';
import { useAuthentication } from '../../hooks/auth';
import EditSlotsDialog from './EditSlotsDialog';
import { formatSlot } from '../../utils/date';

interface SlotsProps {
  date: Date;
}

export default function Slots(props: SlotsProps) {
  const { date } = props;
  const { user } = useAuthentication();
  const { isLoading, slots, refresh } = useSlotsForProvider(user?.id ?? 0, date);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await refresh();
  };

  return (
    <div>
      <Typography variant="h6">My Availability</Typography>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <List>
            {slots.map(slot => (
              <ListItem>
                <ListItemText primary={`${formatSlot(slot.from, slot.date)} ~ ${formatSlot(slot.to, slot.date)}`} />
              </ListItem>
            ))}
          </List>
          <Button variant='contained' onClick={handleClickOpen}>Update slots</Button>
        </div>
      )}
      {open && <EditSlotsDialog open={open} handleClose={handleClose} date={date} />}
    </div>
  )
}
