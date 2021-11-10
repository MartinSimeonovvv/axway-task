import classes from "./ViewEvents.module.css";
import { useHistory } from "react-router-dom";

const Event = (props) => {
  const history = useHistory();

  const onClickHandler = () => {
    history.replace(`/event-results/${props.id}`);
  };
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <tr className={classes.tablerows}>
      <td>{props.date}</td>
      <td>{props.place}</td>
      <td>{props.distance}</td>
      <div className={classes.results} onClick={onClickHandler}>
        Results
      </div>
    </tr>
  );
};

export default Event;
