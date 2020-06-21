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
import WhatsUp from "../components/WhatsUp";
import Posts from "../components/Posts";
import ModalPost from "../components/ModalPost";
import Overlay from "../components/Overlay";

import Stories from "../components/Stories";
import { Link, useHistory } from "react-router-dom";

export default function StartPage(props) {
  console.log(props);
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Group1",
      desc: "desc of group1",
      img: `https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_960_720.jpg`,
      members: 34,
    },
    {
      id: 2,
      name: "Group2",
      desc: "desc of group2",
      img: `https://cdn.pixabay.com/photo/2020/06/10/09/31/mockup-5281992_960_720.jpg`,
      members: 55,
    },
    {
      id: 3,
      name: "Group3",
      desc: "desc of group3",
      img: `https://cdn.pixabay.com/photo/2020/06/12/14/06/mockup-5290462_960_720.jpg`,
      members: 555,
    },
  ]);
  const [usersPosts, setUsersPost] = useState([
    {
      id: 1,
      name: "Jesper Hansen",
      feelings: "Feeling good",
      user_img:
        "https://cdn.pixabay.com/photo/2012/10/10/10/36/moon-landing-60582_960_720.jpg",
      img:
        "https://cdn.pixabay.com/photo/2020/06/01/20/06/moon-5248235_960_720.jpg",
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
      id: 2,
      name: "Hanna Panna",
      feelings: "Feeling bad",
      user_img:
        "https://cdn.pixabay.com/photo/2015/05/02/11/48/pope-749837_960_720.jpg",
      img: "",
      text: "text here about i am not fun",
      comments: [],
      likes: [],
    },
    {
      id: 3,
      name: "Anna A",
      feelings: "Feeling sick of it",
      user_img:
        "https://cdn.pixabay.com/photo/2016/03/04/03/54/anna-may-wong-1235440_960_720.jpg",
      img:
        "https://cdn.pixabay.com/photo/2016/03/04/03/54/anna-may-wong-1235440_960_720.jpg",
      text: "new picture",
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
    <>
      <div className="container-3-columns">
        <div
          className="main-left"
          // onMouseEnter={unblockGroups}
          // onMouseLeave={blockGroups}
        >
          <h2>Your groups</h2>
          {groups
            ? groups.map((group, i) => (
                <Link to={`/group/${group.id}`} key={i}>
                  <div className="group" key={i}>
                    <div>
                      <div
                        className="group-img"
                        style={{ backgroundImage: `url(${group.img})` }}
                      />
                    </div>
                    <div>
                      <div className="group-name">{group.name}</div>
                      <div className="group-name">{group.desc}</div>
                      <div>{group.members} members</div>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>
        <div className="main-middle">
          <Stories />
          {!show && (
            <WhatsUp
              onClick={openModal}
              img={props.user.user_img}
              user={props.user.name}
            />
          )}

          <ModalPost user={props.user} closeModal={closeModal} show={show} />
          <Posts
            posts={usersPosts}
            likeClick={handelLikeClick}
            color={"white"}
          />
          {/* <div className="posts">
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
        </div> */}
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
    </>
  );
}
