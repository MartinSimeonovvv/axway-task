import classes from "../Register.module.css";

const Gender = ({ change, inputState }) => {
  return (
    <div className={classes.gender}>
      <select name="gender" onChange={change} value={inputState.gender}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
  );
};

export default Gender;
