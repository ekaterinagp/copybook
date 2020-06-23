import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
// import Watch from "./containers/Watch";
// import Marketplace from "./containers/Marketplace";
import StartPage from "./containers/StartPage";
// import Profile from "./containers/Profile";
// import Overlay from "./components/Overlay";
// import { MdFirstPage } from "react-icons/md";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <BrowserRouter>
        <Switch>
         
        </Switch>
      </BrowserRouter> */}
      {/* <Switch>
        <Route path="/home">
          <StartPage />
        </Route>
        <Route path="/watch">
          <Watch />
        </Route>
        <Route path="/marketplace">
          <Marketplace />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <StartPage />
        </Route>
      </Switch> */}
    </div>
  );
}

export default App;
