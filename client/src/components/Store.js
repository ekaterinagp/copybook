import React, { useReducer, useState, useEffect, createContext } from "react";
import io from "socket.io-client";
import axios from "axios";

export const CTX = createContext();

let initialState = [
  { from: "Benjamin", msg: "Hello!" },
  { from: "Catty", msg: "Hi!" },
  { from: "Benjamin", msg: "How are you!" },
  { from: "Catty", msg: "Better! you?" },
  { from: "Benjamin", msg: "okay!" },
  { from: "Catty", msg: "Wanna go out?" },
];

function reducer(state, action) {
  console.log(action);
  console.log(state);

  const { from, msg, topic } = action.payload;
  console.log(action.payload);
  console.log(action.type);

  switch (action.type) {
    case "RECIEVE_MESSAGE":
      return {
        ...state,

        from,

        msg,
      };
    default:
      console.log(state);
      return state;
  }
}

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

export default function Store(props) {
  const [allchats, dispatch] = useReducer(reducer, initialState);
  if (!socket) {
    socket = io(":9090");
    socket.on("chat message", function (payload) {
      console.log("user connected");
      console.log(payload);
      initialState.push({
        from: payload.from,

        msg: payload.msg,
      });

      console.log(initialState);

      // dispatch({ type: "RECIEVE_MESSAGE", payload: payload });
      console.log(initialState);
    });
  }

  const user = props.user.firstName;

  return (
    <CTX.Provider
      value={{
        allChats: initialState,
        sendChatAction,
        user,
      }}
    >
      {props.children}
    </CTX.Provider>
  );
}
