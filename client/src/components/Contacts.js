import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import Chip from "@material-ui/core/Chip";
import { CTX } from "./Store";

export default function Contacts(props) {
  const [contacts, setContacts] = useState(props.user.friends);
  const [chatOpened, setChatOpened] = useState(false);

  ///socket

  const { allChats, sendChatAction, user } = React.useContext(CTX);

  console.log({ allChats });

  useEffect(() => {
    if (allChats) {
      contacts.forEach((contact) => {
        contact.active = true;
      });
      setContacts(contacts);
    }
  }, [allChats]);

  const [textValue, setTextValue] = useState("");

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

  const handleKeyClick = (e) => {
    if (!textValue) {
      return;
    }
    console.log(e.key, e.code);
    if (e.key == "Enter") {
      sendChatAction({
        from: user,
        msg: textValue,
      });
      setTextValue("");
    }
  };

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
              display: contact.chatOpen ? "grid" : "none",
            }}
            key={i + "dhdklg"}
          >
            <div className="chat-top" key={i} onClick={() => openChat(contact)}>
              <img className="mini" src={contact.user_img} />
              <h2>
                {contact.firstName} {contact.lastName}
              </h2>
            </div>
            <div className="styled-list">
              {" "}
              {allChats.map((chat, i) => (
                <div className="chat-lines" key={i}>
                  <Chip label={chat.from} />
                  <div>{chat.msg}</div>
                </div>
              ))}
            </div>
            <input
              placeholder="Type here"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              className="chat-type"
              onKeyDown={(e) => handleKeyClick(e)}
            ></input>{" "}
          </div>
        </>
      ))}
    </>
  );
}
