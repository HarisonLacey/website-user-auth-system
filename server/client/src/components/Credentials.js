import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import EmailConfirmation from "./EmailConfirmation";
import PasswordReset from "./PasswordReset";
import Dashboard from "./Dashboard";
import close from "../images/close.png";
import Spinner from "react-bootstrap/Spinner";
const queryString = require("query-string");

const CredentialContainer = styled.div.attrs((props) => ({
  display: "inline-block",
}))`
  height: 60px;
  padding-top: 10%;
  padding-left: 5%;
  h3 {
    font-family: "Poppins", sans-serif;
    display: ${(props) => props.display};
    margin-left: 5%;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .img {
    position: relative;
    left: 18.5rem;
    bottom: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
  h5 {
    cursor: pointer;
    font-size: 1em;
    &:hover {
      text-decoration: underline;
    }
  }
  a {
    color: black;
    text-decoration: none;
  }
  p, .credLoad {
    font-weight: bold;
    font-size: 0.8rem;
  }
  .credLoad {
    font-size: 1rem;
  }
`;

const FormContainer = styled.div`
  position: relative;
  right: 34rem;
  top: 10em;
  width: 21.5rem;
  padding: 10%;
  border: solid 1px lightgrey;
  border-radius: 5%;
`;

const Credentials = (props) => {
  const [formType, setFormType] = useState(null);

  useEffect(() => {
    const queryCheck = async () => {
      const query = queryString.parse(window.location.search);
      if (query.token || query.reset) {
        try {
          let res = await fetch("/api/query", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: query,
            }),
          });
          let response = await res.json();
          setFormType(response.message);
        } catch (err) {
          return err.message;
        }
      }
    };
    queryCheck();
    window.addEventListener("click", (e) => {
      const att = e.target.getAttribute("name");
      switch (att) {
        case "login":
          setFormType(att);
          break;
        case "signup":
          setFormType(att);
          break;
        case "forgot":
          setFormType(att);
          break;
        case "dashboard":
          setFormType(att);
          break;
        case "form":
          return null;
        case null:
          window.history.pushState("", "", "/");
          setFormType(null);
          break;
        default:
          return null;
      }
    });
  });

  const formRender = () => {
    switch (formType) {
      case "login":
        return (
          <FormContainer name="form">
            <img
              className="img"
              onClick={() => setFormType(null)}
              src={close}
              alt="close"
            />
            <LoginForm name="form" />
            <h5 name="forgot">Forgot Password?</h5>
          </FormContainer>
        );
      case "signup":
        return (
          <FormContainer name="form">
            <img
              className="img"
              onClick={() => setFormType(null)}
              src={close}
              alt="close"
            />
            <SignupForm name="form" />
          </FormContainer>
        );
      case "forgot":
        return (
          <FormContainer name="form">
            <img
              className="img"
              onClick={() => setFormType(null)}
              src={close}
              alt="close"
            />
            <EmailConfirmation name="form" />
          </FormContainer>
        );
      case "reset":
        return (
          <FormContainer name="form">
            <img
              className="img"
              onClick={() => setFormType(null)}
              src={close}
              alt="close"
            />
            <PasswordReset name="form" />
          </FormContainer>
        );
      case "dashboard":
        return (
          <FormContainer name="form">
            <img
              className="img"
              onClick={() => setFormType(null)}
              src={close}
              alt="close"
            />
            <Dashboard
              username={props.username}
              user_id={props.user_id}
              userType={props.userType}
              name="form"
            />
          </FormContainer>
        );
      default:
        return null;
    }
  };

  const loginRender = () => {
    if (props.auth !== "authenticated" && props.auth !== "not authenticated") {
      return (
        <div className="credLoad">
          <Spinner animation="border" size="sm" /> One Moment...
        </div>
      );
    } else if (props.auth === "not authenticated") {
      return (
        <div>
          <h3 name="login">Login</h3>
          <h3 name="signup">Signup</h3>
        </div>
      );
    } else {
      return <h3 name="dashboard">Dashboard</h3>;
    }
  };

  return (
    <CredentialContainer>
      {loginRender()}
      {formRender()}
    </CredentialContainer>
  );
};

export default Credentials;
