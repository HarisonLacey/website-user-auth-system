import React from "react";
import styled from "styled-components";

const LayoutContainer = styled.div`
  margin: 8% 8% 0;
  background-color: whitesmoke;
  height: 1500px;
  border: solid 1px black;
  border-bottom: none;
`;

const Layout = (props) => {
  return <LayoutContainer>{props.children}</LayoutContainer>;
};

export default Layout;
