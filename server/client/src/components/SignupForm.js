import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import google from "../images/google.png";
import facebook from "../images/facebook.png";
import styled from "styled-components";

const ResponsePara = styled.p`
  color: ${(props) => (props.color === "Successful Signup!" ? "green" : "red")};
`;

const SpinnerDiv = styled.div`
  color: black;
`;

const HR = styled.hr`
  width: 0;
`;

const SignupForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupResponse, setSignupResponse] = useState("");
  useEffect(() => {
    // text underline animation effect
    const mouseOverFunction = () => {
      let childArray = document.getElementsByClassName("third-container");
      for (let i = 0; i < childArray.length; i++) {
        childArray[i].onmouseenter = () => {
          let count = 1;
          let widthCount = 10;
          let handle = setInterval(() => {
            widthCount += 10;
            childArray[i].children[1].style.width = `${widthCount}%`;
            childArray[i].children[1].style.border = "solid 1px lightgrey";
            count++;
            if (count > 9) {
              window.clearInterval(handle);
            }
          }, 20);
        };
      }
    };
    mouseOverFunction();
    const mouseOutFunction = () => {
      let childArray = document.getElementsByClassName("third-container");
      for (let i = 0; i < childArray.length; i++) {
        childArray[i].onmouseleave = () => {
          childArray[i].children[1].style.width = "0";
        };
      }
    };
    mouseOutFunction();
  }, []);
  const signup = async (e) => {
    e.preventDefault();
    setSignupResponse(
      <SpinnerDiv>
        <Spinner animation="border" size="sm" /> One Moment...
      </SpinnerDiv>
    );
    const capital = (e) => {
      return e.charAt(0).toUpperCase() + e.slice(1);
    };
    try {
      let res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: capital(firstName),
          lastName: capital(lastName),
          fullName: capital(firstName) + " " + capital(lastName),
          email: email,
          password: password,
        }),
      });
      let response = await res.json();
      setSignupResponse(response.message);
      if (response.message === "Successful Signup!") {
        setTimeout(() => {
          window.history.pushState("", "", "/");
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      setSignupResponse("An Error Occured");
    }
  };
  return (
    <Form name={props.name} onSubmit={signup}>
      <Form.Row name={props.name}>
        <Form.Group name={props.name} as={Col} xs={6}>
          <a
            onClick={() =>
              setSignupResponse(
                <SpinnerDiv>
                  <Spinner animation="border" size="sm" /> One Moment...
                </SpinnerDiv>
              )
            }
            name={props.name}
            href="http://localhost:3001/auth/google"
          >
            <div className="third-container" name={props.name}>
              <img name={props.name} src={google} alt="google" /> Google Join
              <HR />
            </div>
          </a>
        </Form.Group>
        <Form.Group name={props.name} as={Col} xs={6}>
          <a
            onClick={() =>
              setSignupResponse(
                <SpinnerDiv>
                  <Spinner animation="border" size="sm" /> One Moment...
                </SpinnerDiv>
              )
            }
            name={props.name}
            href="http://localhost:3001/auth/facebook"
          >
            <div className="third-container" name={props.name}>
              <img name={props.name} src={facebook} alt="facebook" /> Facebook
              Join
              <HR />
            </div>
          </a>
        </Form.Group>
        <Form.Group name={props.name} as={Col} xs={12}>
          <hr name={props.name} />
        </Form.Group>
        <Form.Group
          name={props.name}
          as={Col}
          xs={6}
          controlId="formBasicEmail"
        >
          <Form.Control
            onChange={(e) => setFirstName(e.target.value)}
            name={props.name}
            type="text"
            placeholder="First Name"
            required
          />
        </Form.Group>
        <Form.Group
          name={props.name}
          as={Col}
          xs={6}
          controlId="formBasicEmail"
        >
          <Form.Control
            onChange={(e) => setLastName(e.target.value)}
            name={props.name}
            type="text"
            placeholder="Last Name"
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
            onChange={(e) => setEmail(e.target.value)}
            name={props.name}
            type="email"
            placeholder="Email"
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
            onChange={(e) => setPassword(e.target.value)}
            name={props.name}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group name={props.name} as={Col} xs={12}>
          <ResponsePara color={signupResponse} name={props.name}>
            {signupResponse}
          </ResponsePara>
        </Form.Group>
        <Form.Group name={props.name} as={Col} xs={12}>
          <Button name={props.name} variant="primary" type="submit" block>
            Signup
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SignupForm;
