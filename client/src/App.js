import React, { useState, useEffect } from "react";
import "./App.css";
// import { Route, Switch, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";

import Watch from "./containers/Watch";
import Marketplace from "./containers/Marketplace";

import Profile from "./containers/Profile";
import { Route, NavLink, Redirect, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { GiElephant } from "react-icons/gi";
import { MdSearch, MdArrowDropDownCircle } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

import SinglePostMarket from "./containers/SinglePostMarket";
import SingleGroup from "./containers/SingleGroup";
import FirstPage from "./containers/FirstPage";
import axios from "axios";
import Register from "./containers/Register";
import SingleFriend from "./containers/SingleFriend";

import StartPage from "./containers/StartPage";

function App() {
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(1);
  const [user, setUser] = useState();
  const [groups, setGroups] = useState();
  const [loading, setLoading] = useState(false);

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

  const getGroups = async () => {
    setLoading(true);
    const res = await axios
      .get(`http://localhost:9090/groups/all`)
      .catch((error) => console.log(error.response.data));
    console.log(res);
    setGroups(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("id")) {
      getUser();
      getGroups();
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
    <div className="App">
      <NavBar user={user} />
      <div className="App-intro">
        {/* <Route path="/home" exact component={() => <StartPage user={user} />} /> */}
        {loggedIn ? (
          <Route
            path="/home"
            exact
            component={() => (
              <StartPage user={user} groups={groups} getUser={getUser} />
            )}
          />
        ) : (
          <Route exact path="/home" component={FirstPage} />
        )}
        <Route
          path="/watch"
          component={() => <Watch user={user} getUser={getUser} />}
        />
        <Route path="/marketplace" component={Marketplace} />

        <Route
          path="/profile"
          component={() => (
            <Profile user={user} setUser={setUser} getUser={getUser} />
          )}
        />
        <Route exact path={`/post/:postId`} component={SinglePostMarket} />
        <Route
          exact
          path={`/group/:groupId`}
          component={() => <SingleGroup groups={groups} />}
        />
        <Route path="/register" component={Register} />
        {/* <Route path="/start" component={FirstPage} /> */}
        <Route
          exact
          path={`/friend/:friendId`}
          component={() => <SingleFriend user={user} getUser={getUser} />}
        />
        <Redirect to="/home" />
      </div>
    </div>
  );
}

export default App;
