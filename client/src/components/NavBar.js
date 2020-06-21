import React, { useState, useEffect } from "react";
import StartPage from "../containers/StartPage";
import Watch from "../containers/Watch";
import Marketplace from "../containers/Marketplace";
import Groups from "../containers/Groups";
import Profile from "../containers/Profile";
import { Route, NavLink, Redirect, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { GiElephant } from "react-icons/gi";
import { MdSearch, MdArrowDropDownCircle } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

import SinglePostMarket from "../containers/SinglePostMarket";
import SingleGroup from "../containers/SingleGroup";

import {
  homeIcon,
  watchIcon,
  marketIcon,
  groupsIcon,
  messageIcon,
  notificationIcon,
} from "../components/icons";

import "./navbar.css";

export default function NavBar() {
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(1);
  const [user, setUser] = useState({
    name: "Anna",
    user_img:
      "https://cdn.pixabay.com/photo/2017/11/11/21/55/girl-2940655_960_720.jpg",
  });
  return (
    <>
      <div className="nav">
        <div className="left">
          <IconContext.Provider value={{ color: "blue", size: "3em" }}>
            <Link to="/home">
              <p className="logo">
                <GiElephant />
              </p>
            </Link>
          </IconContext.Provider>
          <div>
            <form>
              <div className="search-input">
                {" "}
                <input type="text" placeholder="Search Facebook" />
                <IconContext.Provider
                  value={{ size: "1em", position: "absolute" }}
                >
                  <MdSearch />
                </IconContext.Provider>
              </div>
            </form>
          </div>
        </div>
        <div className="middle">
          <div>
            <NavLink to="/home" activeClassName="active">
              {homeIcon()}
            </NavLink>
          </div>
          <div>
            <NavLink to="/watch" activeClassName="active">
              {watchIcon()}
            </NavLink>
          </div>
          <div>
            <NavLink to="/marketplace" activeClassName="active">
              {marketIcon()}
            </NavLink>
          </div>
          {/* <div>
            <NavLink to="/groups" activeClassName="active">
              {groupsIcon()}
            </NavLink>
          </div> */}
        </div>
        <div className="right">
          <div className="img-container">
            <NavLink to="/profile">
              <img className="profile-img" src={user.user_img} alt="Profile" />
            </NavLink>
          </div>

          <div className="profile-name">
            {user.name}
            <div className="add">
              <AiOutlinePlusCircle />
            </div>
          </div>

          <div>
            <div className="messages">{messageIcon()}</div>
            <div className="chat-counter">{messages ? messages : null}</div>
          </div>
          <div>
            <div className="notification">{notificationIcon()}</div>
            <div className="notification-counter">
              {notifications ? notifications : null}
            </div>
          </div>
          {/* <div>
            <MdArrowDropDownCircle />
          </div> */}
        </div>
      </div>
      <div className="App-intro">
        <Route path="/home" exact component={() => <StartPage user={user} />} />
        <Route path="/watch" component={Watch} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/groups" component={Groups} />
        <Route path="/profile" component={Profile} />
        <Route exact path={`/post/:postId`} component={SinglePostMarket} />
        <Route exact path={`/group/:groupId`} component={SingleGroup} />
        <Redirect to="/home" />
      </div>
    </>
  );
}
