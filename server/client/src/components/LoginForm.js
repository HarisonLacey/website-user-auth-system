import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import google from "../images/google.png";
import facebook from "../images/facebook.png";
import styled from "styled-components";

const ResponsePara = styled.p`
  color: ${(props) => (props.color === "Welcome Back!" ? "green" : "red")};
`;

const SpinnerDiv = styled.div`
  color: black;
`;

const HR = styled.hr`
  width: 0;
`;

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState("");
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
  const login = async (e) => {
    e.preventDefault();
    setLoginResponse(
      <SpinnerDiv>
        <Spinner animation="border" size="sm" /> One Moment...
      </SpinnerDiv>
    );
    try {
      let res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let response = await res.json();
      setLoginResponse(response.message);
      if (response.message === "Welcome Back!") {
        setTimeout(() => {
          window.history.pushState("", "", "/");
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      setLoginResponse("An Error Occured");
    }
  };
  return (
    <Form name={props.name} onSubmit={login}>
      <Form.Row name={props.name}>
        <Form.Group name={props.name} as={Col} xs={6}>
          <a
            onClick={() =>
              setLoginResponse(
                <SpinnerDiv>
                  <Spinner animation="border" size="sm" /> One Moment...
                </SpinnerDiv>
              )
            }
            name={props.name}
            href="http://localhost:3001/auth/google"
          >
            <div className="third-container" name={props.name}>
              <img name={props.name} src={google} alt="google" /> Google Login
              <HR />
            </div>
          </a>
        </Form.Group>
        <Form.Group name={props.name} as={Col} xs={6}>
          <a
            onClick={() =>
              setLoginResponse(
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
              Login
              <HR />
            </div>
          </a>
        </Form.Group>
        <Form.Group name={props.name} as={Col} xs={12}>
          <hr name={props.name} />
        </Form.Group>
        <Form.Group
          as={Col}
          xs={12}
          name={props.name}
          controlId="formBasicEmail"
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
          as={Col}
          xs={12}
          name={props.name}
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
          <ResponsePara color={loginResponse} name={props.name}>
            {loginResponse}
          </ResponsePara>
        </Form.Group>
        <Form.Group name={props.name} as={Col} xs={12}>
          <Button name={props.name} variant="primary" type="submit" block>
            Login
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default LoginForm;
