import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axiox/instatance";
import Swal from "sweetalert2";
import "./Login.scss";

function Login({ isLoggedIn, setIsLoggedIn }) {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleUserData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const isEmailValid = (email) => {
    // Regular expression pattern for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("credentials", credentials);
    const { username, password, email } = credentials;
    if (!email || !username || !password) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `All fields are required`,
      });
    }
    if (!isEmailValid(credentials.email)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Enter a valid email`,
      });
    }
    axiosInstance
      .post("/rest/login-admin", credentials)
      .then((response) => {
        const { status, message, results } = response.data;
        console.log("response", { status, message, results });
        if (status) setIsLoggedIn(true);
      })
      .catch((error) => {
        const { status, message, results } = error?.response?.data;
        console.error("[Error] : Admin Login Error --", message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${message}`,
        });
      });
  };

  return (
    // <div className="login-body">
      <div className="login-wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={credentials.username}
              required
              onChange={(e) => {
                handleUserData(e);
              }}
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={credentials.email}
              required
              onChange={(e) => {
                handleUserData(e);
              }}
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="password"
              name="password"
              value={credentials.password}
              required
              onChange={handleUserData}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <button type="submit" className="btn" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    // </div>
  );
}

export default Login;
