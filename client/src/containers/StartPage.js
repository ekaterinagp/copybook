import React, { useState } from "react";
import "./css/start.css";
import { FaImages } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";
import { MdLiveTv } from "react-icons/md";
import { AiOutlineGift } from "react-icons/ai";
import { IconContext } from "react-icons";
import Contacts from "../components/Contacts";
import LikesComments from "../components/LikesComments";
import Comments from "../components/Comments";

export default function StartPage(props) {
  const [comments, setComments] = useState([
    {
      id: 1,
      created: "01-03-2019",
      text: "Cool",
      firstName: "A",
      lastName: "AA",
      img:
        "https://cdn.pixabay.com/photo/2016/11/01/03/27/girl-1787357_960_720.jpg",
    },
    {
      id: 2,
      text: "I like it",
      created: "05-03-2019",
      firstName: "B",
      lastName: "BB",
      img:
        "https://cdn.pixabay.com/photo/2016/07/18/20/33/elephant-1526709_960_720.jpg",
    },
  ]);
  const [groups, setGroups] = useState([
    {
      name: "Group1",
      desc: "desc of group1",
      img: ``,
      members: 34,
    },
    {
      name: "Group2",
      desc: "desc of group2",
      img: ``,
      members: 55,
    },
    {
      name: "Group3",
      desc: "desc of group3",
      img: ``,
      members: 555,
    },
  ]);
  const [usersPosts, setUsersPost] = useState([
    {
      name: "Jesper Hansen",
      feelings: "Feeling good",
      img: "link",
      text: "text here about i am fun",
      comments: [
        {
          id: 1,
          text: "Cool",
          created: "01-03-2019",
          firstName: "A",
          lastName: "AA",
          img:
            "https://cdn.pixabay.com/photo/2016/11/01/03/27/girl-1787357_960_720.jpg",
        },
        {
          id: 2,
          text: "I like it",
          created: "05-03-2019",
          firstName: "B",
          lastName: "BB",
          img:
            "https://cdn.pixabay.com/photo/2016/07/18/20/33/elephant-1526709_960_720.jpg",
        },
      ],
      likes: [
        {
          id: 3,
          firstName: "Anna",
          lastName: "A",
        },
        {
          id: 5,
          firstName: "Ben",
          lastName: "B",
        },
      ],
    },
    {
      name: "Hanna Panna",
      feelings: "Feeling bad",
      img: "link",
      text: "text here about i am not fun",
      comments: [],
      likes: [],
    },
    {
      name: "Anna A",
      feelings: "Feeling sick of it",
      img: "link",
      text: "text here about i am exhausted",
      comments: [],
      likes: [],
    },
  ]);

  const [birthday, setBirthday] = useState([
    {
      name: "Ben Benson",
    },
  ]);
  const blockGroups = () => {
    document.querySelector("body").style.overflowY = "hidden";
  };
  const unblockGroups = () => {
    document.querySelector("body").style.overflowY = "scroll";
  };
  const [likes, setLikes] = useState(2);

  const handelLikeClick = (e) => {
    setLikes(likes + 1);
    console.log(e.target.style);
    e.target.style.fill = "blue";
  };

  return (
    <div className="container-3-columns">
      <div
        className="main-left"
        // onMouseEnter={unblockGroups}
        // onMouseLeave={blockGroups}
      >
        {groups
          ? groups.map((group, i) => (
              <div className="group" key={i}>
                <div>
                  <img src="https://source.unsplash.com/random/120x60" alt="" />
                </div>
                <div>
                  <div className="group-name">{group.name}</div>
                  <div className="group-name">{group.desc}</div>
                  <div>{group.members}</div>
                </div>
              </div>
            ))
          : null}
      </div>
      <div className="main-middle">
        <div className="mind">
          <div>
            <form>
              <input
                type="text"
                placeholder={`${props.user}, what are you up to?`}
              />
            </form>
          </div>
          <div>
            <div className="icons-container">
              <IconContext.Provider
                value={{ color: "lightgreen", size: "1.5em" }}
              >
                <FaImages />{" "}
              </IconContext.Provider>{" "}
              <p className="icon-title">Photo/Video</p>
            </div>
            <div className="icons-container">
              <IconContext.Provider value={{ color: "#FAA41A", size: "1.5em" }}>
                <GoSmiley />{" "}
              </IconContext.Provider>
              <p className="icon-title">Feelings/Activity</p>
            </div>
            <div className="icons-container">
              <IconContext.Provider value={{ color: "#f02849", size: "1.5em" }}>
                <MdLiveTv />{" "}
              </IconContext.Provider>
              <p className="icon-title">Live Video</p>
            </div>
          </div>
        </div>
        <div className="posts">
          {usersPosts
            ? usersPosts.map((post, i) => (
                <div className="post" key={i}>
                  <div className="mini-profile">
                    <img src="https://source.unsplash.com/random/51x58" />
                    <div>
                      <div>{post.name}</div>
                      <div>{post.feelings}</div>
                      <img
                        src="https://source.unsplash.com/random/600x400"
                        alt=""
                      ></img>
                    </div>
                  </div>
                  <div>{post.text}</div>
                  {console.log(post)}
                  {console.log(post.comments, post.likes)}
                  <LikesComments
                    handleClick={handelLikeClick}
                    likes={post.likes}
                    comments={post.comments}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
      <div
        className="main-right"
        // onMouseEnter={unblockGroups}
        // onMouseLeave={blockGroups}
      >
        <div className="birthday-block">
          <h2>Birthdays</h2>
          {birthday.length
            ? birthday.map((man, i) => (
                <div className="birthday" key={i}>
                  <AiOutlineGift />
                  <p className="birthday-title">
                    Today is {man.name}'s birthday!{" "}
                  </p>
                </div>
              ))
            : null}
        </div>
        <div className="friends-activity">
          <h2>Contacts</h2>
          <Contacts />
        </div>
      </div>
    </div>
  );
}
