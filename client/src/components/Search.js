import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdSearch } from "react-icons/md";
import "../containers/css/watch.css";

export default function Search(props) {
  return (
    <form className="formSearch">
      <MdSearch />
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={props.getValue}
        style={{ textIndent: "15px" }}
      />
    </form>
  );
}
