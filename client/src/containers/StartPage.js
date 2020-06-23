import React, { useState, useEffect } from "react";
import "./css/start.css";

import { AiOutlineGift } from "react-icons/ai";
import { IconContext } from "react-icons";
import Contacts from "../components/Contacts";
import axios from "axios";

import WhatsUp from "../components/WhatsUp";
import Posts from "../components/Posts";
import ModalPost from "../components/ModalPost";

import Stories from "../components/Stories";
import { Link, useHistory } from "react-router-dom";
import FirstPage from "../containers/StartPage";

export default function StartPage(props) {
  console.log(props);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(props.user);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState(props.groups);
  const [usersPosts, setUsersPosts] = useState([]);
  // const [usersPosts, setUsersPost] = useState([
  //   {
  //     id: 1,
  //     name: "Jesper Hansen",
  //     feelings: "Feeling good",
  //     user_img:
  //       "https://cdn.pixabay.com/photo/2012/10/10/10/36/moon-landing-60582_960_720.jpg",
  //     img:
  //       "https://cdn.pixabay.com/photo/2020/06/01/20/06/moon-5248235_960_720.jpg",
  //     text: "text here about i am fun",
  //     tag: [
  //       {
  //         id: 3,
  //         name: "Betty Bett",
  //         user_img:
  //           "https://cdn.pixabay.com/photo/2019/12/04/10/22/engineer-4672332_960_720.jpg",
  //       },
  //       {
  //         id: 7,
  //         name: "Boris Becker",
  //         user_img:
  //           "https://cdn.pixabay.com/photo/2015/05/02/11/52/boris-becker-749855_960_720.jpg",
  //       },
  //     ],
  //     comments: [
  //       {
  //         id: 1,
  //         text: "Cool",
  //         created: "01-03-2019",
  //         firstName: "A",
  //         lastName: "AA",
  //         img:
  //           "https://cdn.pixabay.com/photo/2016/11/01/03/27/girl-1787357_960_720.jpg",
  //       },
  //       {
  //         id: 2,
  //         text: "I like it",
  //         created: "05-03-2019",
  //         firstName: "B",
  //         lastName: "BB",
  //         img:
  //           "https://cdn.pixabay.com/photo/2016/07/18/20/33/elephant-1526709_960_720.jpg",
  //       },
  //     ],
  //     likes: [
  //       {
  //         id: 3,
  //         firstName: "Anna",
  //         lastName: "A",
  //       },
  //       {
  //         id: 5,
  //         firstName: "Ben",
  //         lastName: "B",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Hanna Panna",
  //     feelings: "Feeling bad",
  //     user_img:
  //       "https://cdn.pixabay.com/photo/2015/05/02/11/48/pope-749837_960_720.jpg",
  //     img: "",
  //     text: "text here about i am not fun",
  //     comments: [],
  //     likes: [],
  //   },
  //   {
  //     id: 3,
  //     name: "Anna A",
  //     feelings: "Feeling sick of it",
  //     user_img:
  //       "https://cdn.pixabay.com/photo/2016/03/04/03/54/anna-may-wong-1235440_960_720.jpg",
  //     img:
  //       "https://cdn.pixabay.com/photo/2016/03/04/03/54/anna-may-wong-1235440_960_720.jpg",
  //     text: "new picture",
  //     comments: [],
  //     likes: [],
  //   },
  // ]);

  const getPosts = async () => {
    setLoading(true);

    const res = await axios
      .get(`http://localhost:9090/posts/all`)
      .catch((error) => console.log(error.response.data));
    console.log(res);
    setUsersPosts(res.data);
    setLoading(false);
  };

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

  const handelLikeClick = async (e) => {
    console.log(e.target.style);
    console.log(e.target.id);
    e.target.style.fill = "blue";
    let form = {
      firstName: user.firstName,
      lastName: user.lastName,
      user_id: user.user_id,
    };
    console.log(form);
    //take user, call api add like
    const addLike = await axios.post(
      `http://localhost:9090/posts/addlike/${e.target.id}`,
      form
    );
    getPosts();
  };
  useEffect(() => getPosts(), []);
  return (
    <>
      <div className="container-3-columns">
        <div
          className="main-left"
          // onMouseEnter={unblockGroups}
          // onMouseLeave={blockGroups}
        >
          <h2>Groups</h2>
          {groups
            ? groups.map((group, i) => (
                <Link
                  key={i}
                  to={{
                    pathname: `/group/${group.id}`,
                  }}
                >
                  <div className="group" key={i}>
                    <div>
                      <div
                        className="group-img"
                        style={{ backgroundImage: `url(${group.img})` }}
                      />
                    </div>
                    <div>
                      <div className="group-name">{group.title}</div>
                      <div className="group-name">{group.short_desc}</div>
                      <div>{group.members.length} members</div>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>
        <div className="main-middle">
          <Stories />
          {!show && <WhatsUp onClick={openModal} user={props.user} />}

          <ModalPost user={user} closeModal={closeModal} show={show} />
          <Posts
            posts={usersPosts}
            likeClick={handelLikeClick}
            color={"white"}
          />
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
