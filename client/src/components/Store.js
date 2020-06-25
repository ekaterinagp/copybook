import React, { useReducer, useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

export const CTX = React.createContext();

const initialState = [
  {
    from: "Benjamin",
    msg: "Hello",
  },
  {
    from: "Catty",
    msg: "Hi",
  },
  {
    from: "Benjamin",
    msg: "How are you?",
  },
  {
    from: "Catty",
    msg: "Okaaay",
  },
  {
    from: "Benjamin",
    msg: "All good",
  },
  {
    from: "Catty",
    msg: "Nice",
  },
  {
    from: "Benjamin",
    msg: "Yes!",
  },
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
      console.log("user connected");

      initialState.push({
        from: payload.from,

        msg: payload.msg,
      });
      // setInitialState({
      //   ...initialState,
      //   from: payload.from,

      //   msg: payload.msg,
      // });
      console.log(initialState);

      // dispatch({ type: "RECIEVE_MESSAGE", payload: payload });
    });
  }

  const user = props.user.firstName;

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
