import React from "react";
import styled from "styled-components";
import Credentials from "./Credentials";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HeaderContainer = styled(Container)`
  border-bottom: solid 1px lightgrey;
  @media screen and (min-width: 1376px) {
    border: solid 1px lightgrey;
    border-top: none;
  }
`;

// grid breakpoints

// xs < 769px
// md >= 769px
// lg >= 992px
// xl >= 1200px

const Header = (props) => {
  return (
    <HeaderContainer>
      <Row>
        <Col xs={3} md={4} lg={5} xl={5}></Col>
        <Col xs={4} md={5} lg={5} xl={5}></Col>
        <Col xs={5} md={3} lg={2} xl={2}>
          <Credentials
            auth={props.auth}
            username={props.username}
            user_id={props.user_id}
            userType={props.userType}
          />
        </Col>
      </Row>
    </HeaderContainer>
  );
};

export default Header;
