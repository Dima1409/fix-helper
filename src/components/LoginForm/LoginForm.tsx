import { useState } from "react";

const LoginForm: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const initialValues = {
    login: "",
    password: "",
  };
  const hideShowPassword = () => {
    setShow(!show);
  };
  const handleSubmit = () => {
    alert(`${initialValues.login} ${initialValues.password}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" placeholder="login"></input>
      </label>
      <label>
        <input type={show ? "text" : "password"} placeholder="password"></input>
        <button onClick={hideShowPassword}>
          {show ? "показати" : "приховати"}
        </button>
      </label>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
