import React, { useState } from "react";
import { loginUser } from "../utils/ApiFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import './login.css';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const token = success.token;
      auth.handleLogin(token);
      navigate(redirectUrl, { replace: true });
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <div className="login-page">
      <section className="login-container shadow-lg">
        {errorMessage && <p className="alert">{errorMessage}</p>}

        <h2 className="login-title">Welcome Back</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={login.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={login.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-hotel">
            Login
          </button>

          <p className="register-link">
            Don't have an account yet? <Link to="/register">Register here</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;
