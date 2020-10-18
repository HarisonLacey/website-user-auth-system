import React, { useEffect } from "react";
import Layout from "../components/Layout";

const Redirect = () => {
useEffect(() => {
    const redirectCall = async () => {
        try {
            let res = await fetch("/api/redirect");
            let response = await res.json();
            switch(response.message === "redirect") {
                case true:
                    window.location.href = "/";
                    break;
                case false:
                    window.location.href = "/";
                    break
                default:
                    return null
            }
        } catch(err) {
           window.location.href= "/";
        }
    }
    redirectCall();
})
return <Layout />
}

export default Redirect;

