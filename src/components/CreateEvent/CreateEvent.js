import { useState } from "react";
import { useHistory } from "react-router-dom";

import classes from "./CreateEvent.module.css";

const CreateEvent = () => {
  const history = useHistory();
  const uid = localStorage.getItem("uid");

  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [distance, setDistance] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  const createSubmitHandler = (event) => {
    event.preventDefault();

    fetch("https://axway-auth-default-rtdb.firebaseio.com/events.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid,
        date,
        place,
        distance,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          let errorMessage = "Something went wrong!";
          throw new Error(errorMessage);
        }
        history.replace("/manage-events");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <section className={classes.create}>
      <h1>Create New Event</h1>
      <form onSubmit={createSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="date">Date of event</label>
          <input
            value={date}
            onChange={handleDateChange}
            type="date"
            placeholder="Date of event"
            id="date"
            name="date"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="place">Place</label>
          <input
            value={place}
            onChange={handlePlaceChange}
            type="text"
            placeholder="Place"
            id="place"
            name="place"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="distance">Distance in meters</label>
          <input
            value={distance}
            onChange={handleDistanceChange}
            type="number"
            placeholder="Distance"
            id="distance"
            name="distance"
            required
          />
        </div>
        <div className={classes.actions}>
          <button>Create</button>
        </div>
      </form>
    </section>
  );
};

export default CreateEvent;
