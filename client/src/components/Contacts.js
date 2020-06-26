import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import Chip from "@material-ui/core/Chip";
import { CTX } from "./Store";
import Debouncer from "./Debouncer";

export default function Contacts(props) {
  const [contacts, setContacts] = useState(props.user.friends);
  const [chatOpened, setChatOpened] = useState(false);

  const { allChats, sendChatAction, user, connectedUsers } = React.useContext(
    CTX
  );
  console.log({ allChats });
  console.log({ connectedUsers });

  ///socket

  useEffect(() => {
    // console.log("use effect run");
    // if (connectedUsers.length) {
    //   const contactsId = contacts.map((one) => one.user_id);
    //   let modified = connectedUsers
    //     .filter((one) => one != user.user_id)
    //     .filter((one) => contactsId.includes(one));
    //   console.log({ modified });
    // }
    console.log({ contacts });
    contacts[0].active = true;
    contacts[1].active = true;
    setContacts(contacts);
  }, [connectedUsers]);

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

  const debouncer = new Debouncer();

  const handleKeyClick = (e) => {
    if (textValue == "") {
      return;
    }
    console.log(e.key, e.code);
    if (e.key == "Enter") {
      sendChatAction({
        from: user,
        msg: textValue,
      });
      setTimeout(() => {
        setTextValue("");
      }, 1000);
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
            <div>
              <input
                placeholder="Type here"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                className="chat-type"
                onKeyDown={(e) => handleKeyClick(e)}
              ></input>{" "}
            </div>
          </div>
        </>
      ))}
    </>
  );
}
