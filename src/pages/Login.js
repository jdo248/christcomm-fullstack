import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import CButton from "../components/CButton";
import LoginHeader from "../components/login/LoginHeader";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const onLoginBtnClick = async () => {
    setLoading(true);
    setError("");
    const data = {
      username: username,
      password: password,
    };
    let response = await fetch(`/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    let res = await response.json();

    if (response.status === 200) {
      localStorage.setItem("token", JSON.stringify(res));
      localStorage.setItem("user", JSON.stringify(jwt_decode(res.access)));
      setLoading(false);
      window.location.href = "/";
    } else {
      alert("Something went wrong!");
    }
    // fetch("http://localhost:5000/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (res.error) {
    //       setError("Error logging in: ", res.error);
    //       setLoading(false);
    //     } else {
    //       setToken(res.token);
    //       createSession(res.token);
    //       setLoading(false);
    //       window.location.href = "/";
    //     }
    //   })
    //   .catch((err) => {
    //     setError(err);
    //     setLoading(false);
    //   });
  };

  const onLoginDup = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (password === "" && username === "") {
      setError("Please enter username and password");
      setLoading(false);
      return;
    }
    if (password === "") {
      setError("Please enter password");
      setLoading(false);
      return;
    }
    if (username === "") {
      setError("Please enter username");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }
    // if (!email.includes("@")) {
    //   setError("Please enter a valid email");
    //   setLoading(false);
    //   return;
    // }
    onLoginBtnClick();
  };
  return (
    <div className="h-100 d-flex flex-column min-vh-100">
      <LoginHeader />
      <div className=" slin container d-flex w-75 p-2 h-100 flex-grow-1">
        <Form
          className="row align-items-center m-auto"
          style={{ maxWidth: 550 }}
        >
          {/* <Form.Group controlId="formBasicEmail">
            <Form.Label className="fw-bold">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group> */}
          <Form.Group controlId="formBasicUserName">
            <Form.Label className="fw-bold">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <Form.Group controlId="submit">
            <CButton
              className={`my-4 w-100 fw-bold ${loading ? "disabled" : ""}`}
              onClick={onLoginDup}
              color="primary"
            >
              {loading ? "Logging in..." : "Login"}
            </CButton>
            <div className="text-center">
              New member? Create an account <Link to="/signup">here</Link>
            </div>
          </Form.Group>
        </Form>
      </div>{" "}
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

export default Login;
