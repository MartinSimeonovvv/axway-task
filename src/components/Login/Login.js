import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./Login.module.css";
import AuthContext from "../../store/auth-context";

const Login = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onInputChangeHandler = (e) => {
    setInputState((prevInputState) => {
      return {
        ...prevInputState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIS8UytU3g7H9Aw6QSaB_ra1PxulV3rOo",
      {
        method: "POST",
        body: JSON.stringify({
          email: inputState.email,
          password: inputState.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        localStorage.setItem("uid", data.localId);
        const loggedInEmail = data.email;
        const allUsers = JSON.parse(localStorage.getItem("allUsers"));
        const selectedUser = allUsers.find(
          (user) => user.email === loggedInEmail
        );
        localStorage.setItem("userData", JSON.stringify(selectedUser));
        history.replace("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            name="email"
            required
            value={inputState.email}
            onChange={onInputChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            id="password"
            name="password"
            required
            value={inputState.password}
            onChange={onInputChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Login</button>}
          {isLoading && <p>Sending request...</p>}
          <button type="button" className={classes.toggle}>
            Don't have an accont?<Link to="/">Register</Link>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
