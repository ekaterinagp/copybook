import React from "react";
import StartPage from "../containers/StartPage";
import Watch from "../containers/Watch";
import Marketplace from "../containers/Marketplace";
import Groups from "../containers/Groups";
import Profile from "../containers/Profile";
import { Route, NavLink, Redirect } from "react-router-dom";
import { IconContext } from "react-icons";
import { GiElephant } from "react-icons/gi";
import { MdSearch } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import profile from "../img/image.jpg";
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
  return (
    <>
      <div className="nav">
        <div className="left">
          <IconContext.Provider value={{ color: "blue", size: "3em" }}>
            <p className="logo">
              <GiElephant />
            </p>
          </IconContext.Provider>
          <div>
            <form>
              <div className="search-input">
                {" "}
                <input type="text" />
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
          <div>
            <NavLink to="/groups" activeClassName="active">
              {groupsIcon()}
            </NavLink>
          </div>
        </div>
        <div className="right">
          <div>
            <NavLink to="/profile">
              <img className="profile-img" src={profile} alt="Profile" />
            </NavLink>
          </div>

          <div>Ekaterina</div>
          <div>
            <div className="messages">{messageIcon()}</div>
            <div className="chat-counter">1</div>
          </div>
          <div>
            <div className="notification">{notificationIcon()}</div>
            <div className="notification-counter">1</div>
          </div>
          {/* <div>
            <div className="add">
              <AiOutlinePlusCircle />
            </div>
          </div> */}
        </div>
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
