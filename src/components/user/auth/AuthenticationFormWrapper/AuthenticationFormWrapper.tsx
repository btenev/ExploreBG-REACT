import { useState } from "react";

import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

const AuthenticationFormWrapper = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <article className="forms">
      <div className="buttons">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? "current" : ""}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={isLogin ? "" : "current"}
        >
          Register
        </button>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}
    </article>
  );
};

export default AuthenticationFormWrapper;
