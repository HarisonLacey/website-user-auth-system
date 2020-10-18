import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";
const queryString = require("query-string");

const ResponsePara = styled.p`
  color: ${(props) => (props.color === "Password Reset" ? "green" : "red")};
`;

const SpinnerDiv = styled.div`
  color: black;
`;

const PasswordReset = (props) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetResponse, setResetResponse] = useState("");
  const submitPassword = async (e) => {
    const query = queryString.parse(window.location.search);
    e.preventDefault();
    setResetResponse(
      <SpinnerDiv>
        <Spinner animation="border" size="sm" /> One Moment...
      </SpinnerDiv>
    );
    if (newPassword === confirmPassword) {
      try {
        let res = await fetch("/api/reset", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: confirmPassword,
            id: query.token,
          }),
        });
        let response = await res.json();
        setResetResponse(response.message);
        if (response.message === "Password Reset") {
          setTimeout(() => {
            window.history.pushState("", "", "/?reset=true");
            window.location.reload();
          }, 2000);
        }
      } catch (err) {
        setResetResponse("An Error Occured");
      }
    } else {
      setResetResponse("Passwords Do Not Match");
    }
  };
  return (
    <Form name={props.name} onSubmit={submitPassword}>
      <Form.Row name={props.name}>
        <Form.Group
          name={props.name}
          as={Col}
          xs={12}
          controlId="formBasicPassword"
        >
          <Form.Control
            onChange={(e) => setNewPassword(e.target.value)}
            name={props.name}
            type="password"
            placeholder="New Password"
            required
          />
        </Form.Group>
        <Form.Group
          name={props.name}
          as={Col}
          xs={12}
          controlId="formBasicPassword"
        >
          <Form.Control
            onChange={(e) => setConfirmPassword(e.target.value)}
            name={props.name}
            type="password"
            placeholder="Confirm Password"
            required
          />
        </Form.Group>
        <Form.Group name={props.name} as={Col} xs={12}>
          <ResponsePara color={resetResponse} name={props.name}>
            {resetResponse}
          </ResponsePara>
        </Form.Group>
        <Form.Group name={props.name} as={Col} xs={12}>
          <Button name={props.name} variant="primary" type="submit" block>
            Reset
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default PasswordReset;
