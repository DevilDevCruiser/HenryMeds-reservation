import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button, Container } from '@mui/material';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { IconButton } from '@mui/material';

interface WeeklyViewProps {
  onChange: (date: Date) => void;
}

const WeeklyView: React.FC<WeeklyViewProps> = (props) => {
  const { onChange } = props;
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const setCurrentDate = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
  }

  const renderWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const firstDateofWeek = dayjs(selectedDate).startOf('week').toDate();

    return days.map((day, index) => {
      const date = new Date(firstDateofWeek);
      date.setDate(date.getDate() + index);
      return (
        <Grid item key={index} padding={0}>
          <Button size='small' color='primary' variant={date.getDate() === selectedDate?.getDate() ? "contained" : "outlined"} sx={{ minWidth: 0 }}
            onClick={() => {
              setCurrentDate(date);
            }}>
            <Box>
              <Typography variant="caption" display="block" fontSize={10}>
                {day}
              </Typography>
              <Typography variant="button" display="block" fontSize={14}>
                {dayjs(date).format('DD')}
              </Typography>
            </Box>
          </Button>
        </Grid>
      );
    });

  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <div>
        <Typography variant="h5" gutterBottom>
          {dayjs(selectedDate).format('MMM DD, YYYY  ddd')}
          <MobileDatePicker
            value={dayjs(selectedDate)}
            onAccept={(newValue) => {
              if (newValue) {
                setCurrentDate(newValue.toDate());
              }
            }}
            slots={{
              textField: (props) => {
                return <Button onClick={props.onClick} color='primary'> Go to</Button>
              }
            }} />
        </Typography>

        <Grid container spacing={1}
          alignItems='center'
          justifyContent="center">
          <IconButton size='small' color='primary' onClick={() => setCurrentDate(dayjs(selectedDate).subtract(1, 'week').toDate())}>
            <NavigateBeforeIcon />
          </IconButton>
          {renderWeek()}
          <IconButton size='small' color='primary' onClick={() => setCurrentDate(dayjs(selectedDate).add(1, 'week').toDate())}>
            <NavigateNextIcon />
          </IconButton>
        </Grid>
      </div>
    </Container>
  );
};

export default WeeklyView;