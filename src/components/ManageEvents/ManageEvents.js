import { useEffect, useState } from "react";

import classes from "./ManageEvents.module.css";
import Event from "./Events";

const url = "https://axway-auth-default-rtdb.firebaseio.com/events.json";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const result = Object.entries(data);
        setEvents(result);
      });
  }, []);

  return (
    <div className={classes.scrollbar}>
      <table className={classes.table}>
        <tbody>
          <tr className={classes.tablerows}>
            <th>Date</th>
            <th>Place</th>
            <th>Distance in meters</th>
            <th>Action</th>
          </tr>
          {events.map(([key, event]) => {
            return <Event key={key} id={key} {...event} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvents;
