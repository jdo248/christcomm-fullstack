import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import CButton from "../components/CButton";
import LoginHeader from "../components/login/LoginHeader";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { async } from "q";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const createSession = async (token) => {
    setLoading(true);
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("email", email);
    document.cookie = "token=" + token + ";email=" + email + ";";
    window.localStorage.setItem("isAdmin", false);
    setIsLoggedIn(true);
    setLoading(false);
  };
  const ifLoggedIn = () => {
    if (isLoggedIn) {
      window.location.href = "/";
    }
    return;
  };
  useEffect(() => {
    ifLoggedIn();
  }, [isLoggedIn]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 4500);
    }
  }, [error]);

  const onSignupBtnClick = async () => {
    setLoading(true);
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    const data = {
      email: email,
      username: username,
      password: password,
      password2: confirmPassword,
    };
    const response = await fetch("/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();

    if (response.status === 201) {
      setLoading(false);
      window.location.href = "/login";
    } else {
      setError("Error signing up: ", res);
      setLoading(false);
    }
    // .catch((err) => {
    //   setError("Error signing up: ", err);
    //   setLoading(false);
    // });
  };

  const onSignUpDup = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    onSignupBtnClick();
  };

  return (
    <div className="signup-container h-100 d-flex flex-column min-vh-100">
      <LoginHeader />
      <div className="signup-form container d-flex w-75 p-2 h-100 flex-grow-1">
        <Form
          className="row align-items-center m-auto"
          style={{ maxWidth: 550 }}
        >
          <Form.Group controlId="formBasicUName">
            <Form.Label className="fw-bold mt-2"> Userwname </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="fw-bold mt-2">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="fw-bold mt-2">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="fw-bold mt-2">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <CButton
            className={`my-4 mx-auto fw-bold w-[96%] ${
              loading ? "disabled" : ""
            }`}
            onClick={onSignUpDup}
            color={"primary"}
          >
            {loading ? "Signing up..." : "Signup"}
          </CButton>
          <div className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </div>
      {error ? (
        <div className="max-w-100 mb-4">
          <p
            className="p-2 rounded m-auto alert alert-danger border-0 opacity-80"
            style={{ maxWidth: 400 }}
          >
            {error.toString()}
          </p>{" "}
        </div>
      ) : null}
      <Footer />
    </div>
  );
};
export default Signup;
