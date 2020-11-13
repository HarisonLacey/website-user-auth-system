import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const ResponsePara = styled.p`
  color: ${(props) =>
    props.color === "Password Has Been Changed" ? "green" : "red"};
`;

const SpinnerDiv = styled.div`
  color: black;
`;

const PaddingForm = styled(Form)`
  padding-top: 4%;
`;

const DashboardPasswordReset = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dashboardResponse, setDashboardResponse] = useState("");

  const submitPassword = async (e) => {
    e.preventDefault();
    setDashboardResponse(
      <SpinnerDiv>
        <Spinner animation="border" size="sm" /> One Moment...
      </SpinnerDiv>
    );
    switch (newPassword === confirmPassword) {
      case true:
        try {
          let res = await fetch("/api/dashboard-reset", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currentPassword: currentPassword,
              newPassword: confirmPassword,
              id: props.user_id,
            }),
          });
          let response = await res.json();
          setDashboardResponse(response.message);
        } catch (err) {
          setDashboardResponse("An Error Occured");
        }
        break;
      case false:
        setDashboardResponse("Passwords Do Not Match");
        break;
      default:
        return null;
    }
  };

  const formDisable = () => {
    switch (!props.userType) {
      case true:
        return (
          <Form.Row name={props.name}>
            <Form.Group
              name={props.name}
              as={Col}
              xs={12}
              controlId="formBasicPassword"
            >
              <Form.Control
                onChange={(e) => setCurrentPassword(e.target.value)}
                name={props.name}
                type="password"
                placeholder="Current Password"
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
              <ResponsePara color={dashboardResponse} name={props.name}>
                {dashboardResponse}
              </ResponsePara>
            </Form.Group>
            <Form.Group name={props.name} as={Col} xs={12}>
              <Button name={props.name} variant="primary" type="submit" block>
                Reset
              </Button>
            </Form.Group>
            <Form.Group name={props.name} as={Col} xs={12}></Form.Group>
          </Form.Row>
        );
      case false:
        return (
          <Form.Row name={props.name}>
            <Form.Group
              name={props.name}
              as={Col}
              xs={12}
              controlId="formBasicPassword"
            >
              <Form.Control
                onChange={(e) => setCurrentPassword(e.target.value)}
                name={props.name}
                type="password"
                placeholder="Current Password"
                disabled
              />
            </Form.Group>
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
                disabled
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
                disabled
              />
            </Form.Group>
            <Form.Group name={props.name} as={Col} xs={12}>
              <ResponsePara color={dashboardResponse} name={props.name}>
                {dashboardResponse}
              </ResponsePara>
            </Form.Group>
            <Form.Group name={props.name} as={Col} xs={12}>
              <Button name={props.name} variant="primary" type="submit" block>
                Reset
              </Button>
            </Form.Group>
            <Form.Group name={props.name} as={Col} xs={12}>
              <hr name={props.name} />
            </Form.Group>
          </Form.Row>
        );
      default:
        return null;
    }
  };

  return (
    <PaddingForm name={props.name} onSubmit={submitPassword}>
      {formDisable()}
    </PaddingForm>
  );
};

export default DashboardPasswordReset;
