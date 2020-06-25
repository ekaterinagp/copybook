import React, { useReducer, useState } from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

const initialState = [
  { from: "Catty", msg: "Jello" },
  { from: "Betty", msg: "Pello" },
  { from: "Catty", msg: "Mello" },
  { from: "Betty", msg: "Jello" },
  { from: "Catty", msg: "Wello" },
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
  const [allChats, dispatch] = useReducer(reducer, initialState);

  if (!socket) {
    socket = io(":9090");
    socket.on("chat message", function (payload) {
      initialState.push({
        from: payload.from,

        msg: payload.msg,
      });
      console.log(initialState);

      dispatch({ type: "RECIEVE_MESSAGE", payload: payload });
    });
  }

  const user = "Kat" + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
