import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Contacts() {
  const [users, setUsers] = useState([
    {
      name: "Bjarne Honey",
      active: false,
      img: "link",
    },
    {
      name: "Hannah Beach",
      active: true,
      img: "link",
    },
    {
      name: "Anna A",
      active: true,
      img: "link",
    },
  ]);
  return (
    <>
      {users.map((user, i) => (
        <div className="mini-profile-contacts" key={i}>
          <div className="grid-img-active">
            <img src="https://source.unsplash.com/random/50x55" alt="" />
            <div
              className={`active-user ${
                user.active ? "user-active" : "not-active"
              }`}
            ></div>
          </div>
          <div>
            <div>{user.name}</div>
          </div>
        </div>
      ))}
    </>
  );
}
