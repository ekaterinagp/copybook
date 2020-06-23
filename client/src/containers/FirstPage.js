import React, { useState, useEffect } from "react";
import "./css/first.css";
import { GiElephant } from "react-icons/gi";
import { IconContext } from "react-icons";
import { useHistory, BrowserRouter, Link } from "react-router-dom";
import Login from "../components/Login";
import { Redirect } from "react-router-dom";

export default function FirstPage() {
  const [user, setUser] = useState({
    token: "",
    user: "",
  });

  const history = useHistory();
  const register = () => history.push("/register");
  return (
    <div className="first-page-container">
      <div className="elephant-logo">
        <IconContext.Provider value={{ color: "blue", size: "15em" }}>
          <p className="elephant">
            <GiElephant />
          </p>
        </IconContext.Provider>
      </div>
      <div className="login-part">
        <Login setUser={setUser} />
        <div className="not-registered align">
          <p>Not registered? Sign up</p>{" "}
          <BrowserRouter>
            <Link to="/register" onClick={register}>
              Sign up
            </Link>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}
