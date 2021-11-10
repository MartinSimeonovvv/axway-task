import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./Register.module.css";

import Month from "./Selects/Month";
import Year from "./Selects/Year";
import Day from "./Selects/Day";
import Gender from "./Selects/Gender";
import UserType from "./Selects/UserType";
import AuthContext from "../../store/auth-context";

const Register = () => {
  const history = useHistory();
  const [inputState, setInputState] = useState({
    firstName: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    day: "",
    year: "",
    month: "",
    usertype: "",
  });
  const [error, setError] = useState(true);
  const onInputChangeHandler = (e) => {
    setInputState((prevInputState) => {
      return {
        ...prevInputState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIS8UytU3g7H9Aw6QSaB_ra1PxulV3rOo",
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
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        localStorage.setItem("userData", JSON.stringify(inputState));
        authCtx.login(data.idToken, expirationTime.toISOString());
        localStorage.setItem("uid", data.localId);

        fetch("https://axway-auth-default-rtdb.firebaseio.com/users.json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputState),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Email already exists");
            }

            return response.json();
          })
          .then((data) => {
            history.replace("/home");
          })
          .catch((error) => {
            //setError(error.message);
            alert(error.message);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        {error && <p style={{ color: "red", fontSize: 15 }}>{error}</p>}
        <div className={classes.control}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            placeholder="Enter First Name"
            id="firstname"
            name="firstName"
            required
            value={inputState.firstName}
            onChange={onInputChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            id="lastname"
            name="lastname"
            required
            value={inputState.lastname}
            onChange={onInputChangeHandler}
          />
        </div>
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
        <label className={classes.genderlabel}>Gender</label>
        <Gender change={onInputChangeHandler} inputState={inputState} />
        <label className={classes.dateofbirthlabel}>Date of birth</label>
        <div className={classes.dateofbirth}>
          <Day change={onInputChangeHandler} inputState={inputState} />
          <Month change={onInputChangeHandler} inputState={inputState} />
          <Year change={onInputChangeHandler} inputState={inputState} />
        </div>
        <label className={classes.usertypelabel}>User Type</label>
        <div className={classes.usertype}>
          <UserType change={onInputChangeHandler} inputState={inputState} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Create Account</button>}
          {isLoading && <p>Sending request...</p>}
          <button type="button" className={classes.toggle}>
            Login with existing account<Link to="/login"> Sign in</Link>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
