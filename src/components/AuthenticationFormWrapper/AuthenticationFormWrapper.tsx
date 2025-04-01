import { useState } from 'react';

const AuthenticationWrapper = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <article className="forms">
      <div className="buttons">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? 'current' : ''}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={isLogin ? '' : 'current'}
        >
          Register
        </button>
      </div>

      {isLogin ? 'Login' : 'RegisterForm'}
    </article>
  );
};

export default AuthenticationWrapper;
