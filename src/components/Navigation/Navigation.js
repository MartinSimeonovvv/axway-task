import { useContext, useState, useEffect, useMemo, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { React } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const rerender = useRef(false);
  const [userData, setUserData] = useState({});

  rerender.current = true;

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, [rerender.current]);

  const isAdmin = userData?.usertype === "Admin";

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <header>
      <nav>
        <Link className={classes.active} to="/home">
          <i className="fas fa-home"></i>Home
        </Link>
        {isAdmin && (
          <Link to="/manage-events">
            <i className="fas fa-user-friends"></i>Manage Events
          </Link>
        )}
        {isAdmin && (
          <Link to="/new-event">
            <i className="fas fa-briefcase"></i>New Event
          </Link>
        )}
        {!isAdmin && (
          <Link to="/view-events">
            <i className="fas fa-user-friends"></i>View Events
          </Link>
        )}
        <div id="profile">
          <button onClick={logoutHandler}>
            <i className="fas fa-door-open"></i>
            {userData?.usertype}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
