import React, { useState } from "react";
import DashboardPasswordReset from "./DashboardPasswordReset";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const Para = styled.p`
  padding-top: 4%;
`;

const Dashboard = (props) => {
  const [passwordReset, setPasswordReset] = useState(false);
  const [mainDashboardResponse, setMainDashboardResponse] = useState("");
  const resetForm = () => {
    if (!passwordReset) {
      return null;
    } else {
      return (
        <DashboardPasswordReset
          user_id={props.user_id}
          userType={props.userType}
          name="form"
        />
      );
    }
  };

  const logout = async () => {
    try {
      let res = await fetch("/api/logout");
      let response = await res.json();
      setMainDashboardResponse(
        <div>
          <Spinner animation="border" size="sm" /> {response.message}
        </div>
      );
      if (response.message === "Logging Out...") {
        setTimeout(() => {
          window.history.pushState("", "", "/");
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      setMainDashboardResponse("An Error Occured");
    }
  };

  const formToggle = () => {
    switch (passwordReset) {
      case false:
        setPasswordReset(true);
        break;
      case true:
        setPasswordReset(false);
        break;
      default:
        return null;
    }
  };
  return (
    <div name={props.name}>
      <h4 name={props.name}>Hello, {props.username}</h4>
      <hr name={props.name} />
      <Button
        name={props.name}
        onClick={formToggle}
        variant="primary"
        type="submit"
        block
      >
        Change Password
      </Button>
      {resetForm()}
      <Button
        name={props.name}
        onClick={logout}
        variant="primary"
        type="submit"
        block
      >
        Logout
      </Button>
      <Para name={props.name}>{mainDashboardResponse}</Para>
    </div>
  );
};

export default Dashboard;
