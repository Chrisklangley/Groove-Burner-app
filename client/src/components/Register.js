import React, { useState } from "react";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";

function Register() {
  const [triggerSignup, setTriggerSignup] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const [errorMessage, setErrorMessage] = useState(true);

  const validateForm = () => {
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      alert("Please fill in all fields");
      return false;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const body = {
      username,
      email,
      password,
    };
    const URL = "http://localhost:4838";

    await axios
      .post(triggerSignup ? `${URL}/login` : `${URL}/register`, body)
      .then((res) => {
        console.log(res.data);

        setTimeout(() => {
          if (isAuthenticated()) {
            navigate("/home");
            setErrorMessage(true);
          } else {
            setErrorMessage(false);
          }
        }, 2000);

        signIn({
          token: res.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {
            email: res.data.email,
            name: res.data.username,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(false);
      });
  };

  return (
    <div className="main-form-containter">
      <div className="form-containter">
        <form action="" className="form" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="login-btn">
            {triggerSignup ? `login` : "register"}
          </button>
        </form>
        <button
          className="signin-btn"
          onClick={() => setTriggerSignup(!triggerSignup)}
        >
          {!triggerSignup ? "need to login?" : "need to register?"}
          {errorMessage ? null : (
            <p className="error-message">User not authenticated</p>
          )}
        </button>
      </div>
    </div>
  );
}

export default Register;
