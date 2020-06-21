import React from "react";
import "./modal.css";

export default function Overlay(props) {
  return (
    <div
      className={props.show ? "overlay" : "hide"}
      onClick={props.closeModal}
    ></div>
  );
}
