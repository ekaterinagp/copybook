import React from "react";
import StartPage from "../containers/StartPage";
import Watch from "../containers/Watch";
import Marketplace from "../containers/Marketplace";
import Groups from "../containers/Groups";
import Profile from "../containers/Profile";
import { Route, NavLink, Redirect } from "react-router-dom";
import "./navbar.css";

export default function NavBar() {
  return (
    <>
      <div className="nav">
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/watch">Watch</NavLink>
          </li>
          <li>
            <NavLink to="/marketplace">Marketplace</NavLink>
          </li>
          <li>
            <NavLink to="/groups">Groups</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        </ul>
      </div>
      <div className="App-intro">
        <Route path="/home" exact component={StartPage} />
        <Route path="/watch" component={Watch} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/groups" component={Groups} />
        <Route path="/profile" component={Profile} />
        <Redirect to="/home" />
      </div>
    </>
  );
}
