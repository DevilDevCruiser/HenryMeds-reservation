import { useState } from "react";
import WeeklyView from "../components/WeeklyView"
import ClientReservations from "../components/client/ClientReservations";
import { Paper } from "@mui/material";

export default function ClientPage() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  return (
    <div>
      <WeeklyView onChange={setCurrentDate} />
      <Paper sx={{ marginTop: 5, padding: 2 }}>
        <ClientReservations date={currentDate} />
      </Paper>
    </div>
  )
}
