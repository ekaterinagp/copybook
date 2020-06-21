import React from "react";
import "./modal.css";
import ReactDOM from "react-dom";
import { FaImages } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";
import { BsPersonPlusFill } from "react-icons/bs";
import { IconContext } from "react-icons";

export default function Modal(props) {
  const { show, closeModal } = props;

  const modal = (
    <>
      <div className={show ? "overlay" : "hide"} onClick={closeModal} />
      <div className={show ? "modal" : "hide"}>
        <button id="close-btn" onClick={closeModal}>
          X
        </button>
        <div className="modal-top">
          {" "}
          <h2>Create Post</h2>
        </div>
        <div className="modal-middle">
          <img className="mini" src={props.user.user_img} />
          <h3>{props.user.name}</h3>
        </div>
        <div className="text">
          <textarea
            placeholder={`What's on your mind,${props.user.name}?`}
          ></textarea>
        </div>
        <div className="modal-bottom">
          <div className="add-to-post">
            <h3>Add to your post</h3>
            <div className="icons-add-more">
              <IconContext.Provider
                value={{ color: "lightgreen", size: "1.5em" }}
              >
                <div className="tooltip">
                  <FaImages /> <span className="tooltiptext">Add an image</span>
                </div>
              </IconContext.Provider>{" "}
              {/* <p className="icon-title">Photo/Video</p> */}
              <IconContext.Provider value={{ color: "#FAA41A", size: "1.5em" }}>
                <div className="tooltip">
                  <GoSmiley />{" "}
                  <span className="tooltiptext">Feeling/activity</span>
                </div>
              </IconContext.Provider>
              {/* <p className="icon-title">Feelings/Activity</p> */}
              <IconContext.Provider value={{ color: "blue", size: "1.5em" }}>
                <div className="tooltip">
                  <BsPersonPlusFill />{" "}
                  <span className="tooltiptext">Tag a friend</span>
                </div>
              </IconContext.Provider>
              {/* <p className="icon-title">Feelings/Activity</p> */}
            </div>
          </div>
          <button className="add-post">Post</button>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
}
