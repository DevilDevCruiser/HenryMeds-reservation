import { useState } from "react";
import { Paper } from "@mui/material";
import WeeklyView from "../components/WeeklyView"
import Slots from "../components/provider/Slots";
import Reservations from "../components/provider/Reservations";

export default function ProviderPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  return (
    <div>
      <WeeklyView onChange={setCurrentDate} />
      <Paper sx={{ marginTop: 5, padding: 2 }}>
        <Slots date={currentDate} />
      </Paper>
      <Paper sx={{ marginTop: 5, padding: 2 }}>
        <Reservations date={currentDate} />
      </Paper>
    </div>
  )
}
