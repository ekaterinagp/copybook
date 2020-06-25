import React, { useState, useEffect } from "react";
import StartPage from "../containers/StartPage";
import Watch from "../containers/Watch";
import Marketplace from "../containers/Marketplace";
import { useHistory } from "react-router-dom";
import Profile from "../containers/Profile";
import { Route, NavLink, Redirect, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { GiElephant } from "react-icons/gi";
import { MdSearch, MdArrowDropDownCircle } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

import SinglePostMarket from "../containers/SinglePostMarket";
import SingleGroup from "../containers/SingleGroup";
import FirstPage from "../containers/FirstPage";
import axios from "axios";
import Register from "../containers/Register";

import {
  homeIcon,
  watchIcon,
  marketIcon,
  groupsIcon,
  messageIcon,
  notificationIcon,
} from "../components/icons";

import "./navbar.css";

export default function NavBar(props) {
  const history = useHistory();
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(1);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const token = localStorage.getItem("auth-token");

  const showLogout = () => {
    setLogoutVisible((logoutVisible) => !logoutVisible);
  };

  const checkUserLoggedIn = async () => {
    if (token) {
      const tokenRes = await axios.post(
        "http://localhost:9090/users/tokenIsValid",

        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setLoggedIn(true);
      // console.log(tokenRes);
    } else {
      setLoggedIn(false);
      if (!loggedIn) {
        return <Redirect to={FirstPage} />;
      }
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // const goOut = () => {
  //   history.push(`/home`);
  // };

  const logout = () => {
    // localStorage.setItem("auth-token", "");
    // localStorage.setItem("id", "");
    localStorage.removeItem("id");
    localStorage.removeItem("auth-token");
    window.location.reload();
    // goOut();
  };

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
        {props.user ? (
          <div className="right">
            <div className="img-container">
              <NavLink to="/profile">
                {console.log("look here", props.user)}
                <img
                  className="profile-img"
                  src={props.user.user_img ? props.user.user_img : null}
                  alt="Profile"
                />
              </NavLink>
            </div>

            <div className="profile-name">
              {props.user.firstName}
              <div className="add" onClick={showLogout}>
                <AiOutlinePlusCircle />
              </div>
              {logoutVisible ? (
                <div className="logout-div" onClick={logout}>
                  <h4>Logout</h4>
                </div>
              ) : null}
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
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {/* <div className="App-intro">
       
        {loggedIn ? (
          <Route
            path="/home"
            exact
            component={() => <StartPage user={user} groups={groups} />}
          />
        ) : (
          <Route exact path="/home" component={FirstPage} />
        )}
        <Route path="/watch" component={() => <Watch user={user} />} />
        <Route path="/marketplace" component={Marketplace} />
       
        <Route path="/profile" component={() => <Profile user={user} />} />
        <Route exact path={`/post/:postId`} component={SinglePostMarket} />
        <Route
          exact
          path={`/group/:groupId`}
          component={() => <SingleGroup groups={groups} />}
        />
        <Route path="/register" component={Register} />
    

        <Redirect to="/home" />
      </div> */}
    </>
  );
}
