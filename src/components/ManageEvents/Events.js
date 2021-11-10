import classes from "./ManageEvents.module.css";
import { Link } from "react-router-dom";

const Event = (props) => {
  const uid = localStorage.getItem("uid");
  const isOwner = uid === props.uid;

  return (
    <tr className={classes.tablerows}>
      <td>{props.date}</td>
      <td>{props.place}</td>
      <td>{props.distance}</td>
      {isOwner && (
        <div className={classes.activity}>
          <Link to={`/edit/${props.id}`} className={classes.editBtn}>
            Edit
          </Link>
          <a className={classes.deleteBtn}>Delete</a>
        </div>
      )}
      {!isOwner && <div className={classes.notowner}>Not owner of event</div>}
    </tr>
  );
};

export default Event;
