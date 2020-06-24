import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:9090";

export default function Contacts(props) {
  const [contacts, setContacts] = useState(props.user.friends);
  const [chatOpened, setChatOpened] = useState(false);

  const [response, setResponse] = useState("");
  const socket = socketIOClient(ENDPOINT);
  useEffect(() => {
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  // const sendChatMsg = (e) => {
  //   console.log(e.target.value);
  //   setTimeout(() => {
  //     socket.emit("chat", "e.target.value");
  //   }, 500);
  // };
  // const sendChatMsg = (e) => {
  //   setTimeout(() => {
  //     console.log("honey bunny 2");

  //     socket.emit("chat", "honey bunny 2");
  //   }, 5000);
  // };

  // setTimeout(() => {
  //   console.log("honey bunny");

  //   socket.emit("chat", "honey bunny");
  // }, 5000);

  const addChatOpen = (contacts) => {
    contacts.forEach((contact) => {
      contact.chatOpen = false;
    });
    setContacts(contacts);
  };

  useEffect(() => {
    if (contacts) {
      addChatOpen(contacts);
      console.log(contacts);
    }
  }, []);

  const openChat = (contact) => {
    console.log(contact);
    contact.chatOpen = !contact.chatOpen;
    setContacts([...contacts]);
    // setChatOpened(true);
  };
  return (
    <>
      {contacts.map((contact, i) => (
        <>
          <div
            className="mini-profile-contacts"
            key={i}
            onClick={() => openChat(contact)}
          >
            <div className="grid-img-active">
              <img className="mini" src={contact.user_img} alt="" />
              <div
                className={`active-user ${
                  contact.active ? "user-active" : "not-active"
                }`}
              ></div>
            </div>
            <div>
              <div>
                {contact.firstName} {contact.lastName}
              </div>
            </div>
          </div>
          <div
            className="one-chat"
            style={{
              display: contact.chatOpen ? "block" : "none",
            }}
          >
            <div className="chat-top" key={i}>
              <img className="mini" src={contact.user_img} />
              <h2>
                {contact.firstName} {contact.lastName}
              </h2>
            </div>

            <div>{response}</div>
            <input placeholder="Type here" className="chat-type"></input>
          </div>
        </>
      ))}
    </>
  );
}
