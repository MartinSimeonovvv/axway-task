import classes from "../Register.module.css";

const Month = ({ change, inputState }) => {
  return (
    <select
      value={inputState.month}
      onChange={change}
      className={classes.month}
      name="month"
      required
    >
      <option value="January">January</option>
      <option value="Jebruary">February</option>
      <option value="March">March</option>
      <option value="April">April</option>
      <option value="May">May</option>
      <option value="June">June</option>
      <option value="July">July</option>
      <option value="August">August</option>
      <option value="September">September</option>
      <option value="October">October</option>
      <option value="November">November</option>
      <option value="December">December</option>
    </select>
  );
};

export default Month;
