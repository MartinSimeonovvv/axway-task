import { useEffect, useState } from "react";
import { useParams } from "react-router";
import classes from "./EventResults.module.css";

const EventResults = () => {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`https://axway-auth-default-rtdb.firebaseio.com/events/${id}.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const result = Object.values(data)[3];

        const resultValues = Object.values(result);
        setResults(resultValues);
      });
  }, []);

  return (
    <div className={classes.scrollbar}>
      <table className={classes.table}>
        <tbody>
          <tr className={classes.tablerows}>
            <th>Position</th>
            <th>ID</th>
            <th>Name</th>
            <th>Time</th>
            <th>Gender</th>
            <th>Position in gender group</th>
          </tr>
          {results.length > 0 &&
            results.map((event) => {
              return (
                <tr className={classes.tablerows}>
                  <td>{event.position}</td>
                  <td>{event.id}</td>
                  <td>{event.name}</td>
                  <td>{event.time}</td>
                  <td>{event.gender}</td>
                  <td>{event.positioningendergroup}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EventResults;
