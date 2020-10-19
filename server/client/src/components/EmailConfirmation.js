import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const ResponsePara = styled.p`
  color: ${(props) =>
    props.color ===
    "Reset Email Has Been Sent. Please Follow Instructions. Make Sure To Check Spam Folder"
      ? "green"
      : "red"};
`;

const SpinnerDiv = styled.div`
  color: black;
`;

const EmailConfirmation = (props) => {
  const [email, setEmail] = useState("");
  const [emailResponse, setEmailResponse] = useState("");
  const submitEmail = async (e) => {
    e.preventDefault();
    setEmailResponse(
      <SpinnerDiv>
        <Spinner animation="border" size="sm" /> One Moment...
      </SpinnerDiv>
    );
    try {
      let res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      let response = await res.json();
      setEmailResponse(response.message);
    } catch (err) {
      setEmailResponse("An Error Occured");
    }
  };
  return (
    <Form name={props.name} onSubmit={submitEmail}>
      <Form.Row name={props.name}>
        <Form.Group
          name={props.name}
          as={Col}
          xs={12}
          controlId="formBasicPassword"
        >
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            name={props.name}
            type="email"
            placeholder="Send Confirmation Email"
            required
          />
        </Form.Group>
        <Form.Group name={props.name} as={Col} xs={12}>
          <ResponsePara color={emailResponse} name={props.name}>
            {emailResponse}
          </ResponsePara>
        </Form.Group>
        <Form.Group name={props.name} as={Col} xs={12}>
          <Button name={props.name} variant="primary" type="submit" block>
            Send
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default EmailConfirmation;
