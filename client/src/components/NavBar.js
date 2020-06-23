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

export default function NavBar() {
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(1);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  //   {
  //   id: 3,
  //   name: "Anna",
  //   user_img:
  //     "https://cdn.pixabay.com/photo/2017/11/11/21/55/girl-2940655_960_720.jpg",
  //   friends: [
  //     {
  //       id: 3,
  //       name: "Gia Lia",
  //       user_img:
  //         "https://cdn.pixabay.com/photo/2016/12/19/21/36/winters-1919143_960_720.jpg",
  //     },
  //     {
  //       id: 6,
  //       name: "Lia Mart",
  //       user_img:
  //         "https://cdn.pixabay.com/photo/2017/06/24/02/56/art-2436545_960_720.jpg",
  //     },
  //     {
  //       id: 6,
  //       name: "Maya Pi",
  //       user_img:
  //         "https://cdn.pixabay.com/photo/2016/12/13/00/13/rabbit-1903016_960_720.jpg",
  //     },
  //   ],
  // }

  const getUser = async () => {
    setLoading(true);
    let userId = localStorage.getItem("id");
    const res = await axios
      .get(`http://localhost:9090/users/${userId}`)
      .catch((error) => console.log(error.response.data));
    console.log(res);
    setUser(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("id")) {
      getUser();
    }
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);

  const token = localStorage.getItem("auth-token");

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
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

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
        {user ? (
          <div className="right">
            <div className="img-container">
              <NavLink to="/profile">
                {console.log("look here", user)}
                <img
                  className="profile-img"
                  src={user.user_img ? user.user_img : null}
                  alt="Profile"
                />
              </NavLink>
            </div>

            <div className="profile-name">
              {user.firstName}
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
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="App-intro">
        {/* <Route path="/home" exact component={() => <StartPage user={user} />} /> */}
        {loggedIn ? (
          <Route
            path="/home"
            exact
            component={() => <StartPage user={user} />}
          />
        ) : (
          <Route exact path="/home" component={FirstPage} />
        )}
        <Route path="/watch" component={Watch} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/groups" component={Groups} />
        <Route path="/profile" component={Profile} />
        <Route exact path={`/post/:postId`} component={SinglePostMarket} />
        <Route exact path={`/group/:groupId`} component={SingleGroup} />
        <Route path="/register" component={Register} />
        {/* <Route path="/start" component={FirstPage} /> */}

        <Redirect to="/home" />
      </div>
    </>
  );
}
