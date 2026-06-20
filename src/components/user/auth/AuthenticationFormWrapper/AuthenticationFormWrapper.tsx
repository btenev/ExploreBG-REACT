import { useState } from "react";
import { useLocation } from "react-router-dom";

import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

const AuthenticationFormWrapper = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const location = useLocation();
  const from = location.state?.from?.pathname;

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

      {isLogin ? (
        <LoginForm redirectTo={from} />
      ) : (
        <RegisterForm redirectTo={from} />
      )}
    </article>
  );
};

export default AuthenticationFormWrapper;
