import React from "react";
import { FaImages } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";
import { MdLiveTv } from "react-icons/md";

import { IconContext } from "react-icons";

export default function WhatsUp(props) {
  return (
    <div className="mind">
      <div>
        <form>
          <input
            type="text"
            placeholder={`${props.user}, what are you up to?`}
          />
        </form>
      </div>
      <div>
        <div className="icons-container">
          <IconContext.Provider value={{ color: "lightgreen", size: "1.5em" }}>
            <FaImages />{" "}
          </IconContext.Provider>{" "}
          <p className="icon-title">Photo/Video</p>
        </div>
        <div className="icons-container">
          <IconContext.Provider value={{ color: "#FAA41A", size: "1.5em" }}>
            <GoSmiley />{" "}
          </IconContext.Provider>
          <p className="icon-title">Feelings/Activity</p>
        </div>
        <div className="icons-container">
          <IconContext.Provider value={{ color: "#f02849", size: "1.5em" }}>
            <MdLiveTv />{" "}
          </IconContext.Provider>
          <p className="icon-title">Live Video</p>
        </div>
      </div>
    </div>
  );
}
