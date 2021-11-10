const UserType = ({ change, inputState }) => {
  return (
    <div>
      <select value={inputState.usertype} onChange={change} name="usertype">
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
    </div>
  );
};

export default UserType;
