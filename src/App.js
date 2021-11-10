import { Fragment, useContext, useEffect } from "react";
import { Route } from "react-router";

import AuthContext from "./store/auth-context";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ViewEvents from "./components/ViewEvents/ViewEvents";
import ManageEvents from "./components/ManageEvents/ManageEvents";
import EventResults from "./components/EventResults/EventResults";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import Home from "./components/HomePage/Home";
import Edit from "./components/Edit/Edit";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  useEffect(() => {
    fetch("https://axway-auth-default-rtdb.firebaseio.com/users.json")
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        if (data) {
          const userData = Object.values(data);
          localStorage.setItem("allUsers", JSON.stringify(userData));
        }
      });
  }, [isLoggedIn]);

  return (
    <Fragment>
      {isLoggedIn && <Navigation />}
      {isLoggedIn && (
        <Route exact path="/home">
          <Home />
        </Route>
      )}
      {isLoggedIn && (
        <Route exact path="/new-event">
          <CreateEvent />
        </Route>
      )}
      {isLoggedIn && (
        <Route exact path="/view-events">
          <ViewEvents />
        </Route>
      )}
      {isLoggedIn && (
        <Route exact path="/manage-events">
          <ManageEvents />
        </Route>
      )}
      {isLoggedIn && (
        <Route exact path="/edit/:id">
          <Edit />
        </Route>
      )}
      {isLoggedIn && (
        <Route exact path="/event-results/:id">
          <EventResults />
        </Route>
      )}
      {!isLoggedIn && (
        <Route exact path="/">
          <Register />
        </Route>
      )}
      {!isLoggedIn && (
        <Route exact path="/login">
          <Login />
        </Route>
      )}
    </Fragment>
  );
}

export default App;
