import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";

const Landing = () => {
  const [auth, setAuth] = useState("");
  const [username, setUsername] = useState("");
  const [user_id, setUser_id] = useState("");
  const [userType, setUserType] = useState("");
  useEffect(() => {
    const authenticate = async () => {
      try {
        let res = await fetch("/api/authenticate");
        let response = await res.json();
        setAuth(response.message);
        setUsername(response.username);
        setUser_id(response.user_id);
        setUserType(response.userType);
      } catch (err) {
        console.log(err.message);
      }
    };
    authenticate();
  });
  return (
    <Layout>
      <Header
        auth={auth}
        username={username}
        user_id={user_id}
        userType={userType}
      />
    </Layout>
  );
};

export default Landing;
