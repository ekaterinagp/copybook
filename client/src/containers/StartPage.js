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
  const [people, setPeople] = useState();

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
    const res = await axios
      .get(`http://localhost:9090/posts/all`)
      .catch((error) => console.log(error.response.data));
    console.log(res);
    let modified = res.data.reverse();
    setUsersPosts(modified);
    setLoading(false);
    // getPosts();
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);

      const res = await axios
        .get(`http://localhost:9090/posts/all`)
        .catch((error) => console.log(error.response.data));
      console.log(res);
      let postModified = res.data.reverse();
      setUsersPosts(postModified);
      setLoading(false);
      console.log("get posts run");
    };

    getPosts();
  }, []);
  const getPeople = async () => {
    setLoading(true);

    const res = await axios
      .get(`http://localhost:9090/users/`)
      .catch((error) => console.log(error.response.data));
    console.log(res.data);
    // let postModified = res.data.reverse();
    // setUsersPosts(postModified);
    let modified = res.data.filter((one) => one.user_id != user.user_id);
    console.log(modified);
    const notFriends = [];
    //ASK HONEY BUNNY
    modified.forEach((one) => {
      user.friends.forEach((friend) => {
        if (modified.user_id != friend.user_id) {
          notFriends.push(one);
        }
      });
    });
    console.log(user.friends);

    setPeople(modified);
    setLoading(false);
  };

  useEffect(() => {
    getPeople();
  }, []);

  const addFriend = async (person) => {
    console.log(person);
    let data = {
      user_id: user.user_id,
      friend_firstName: person.firstName,
      friend_lastName: person.lastName,
      friend_id: person.user_id,
      friend_img: person.user_img,
    };
    const res = await axios.post(`http://localhost:9090/users/add/`, data);
    console.log(res);
    getPeople();
  };
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
          <h2>People</h2>
          <div className="people-container">
            {people && people.length ? (
              people.map((person, i) => (
                <div key={i}>
                  <div
                    className="photo-one"
                    id={person.user_id}
                    style={{
                      backgroundImage: `url(${person.user_img})`,
                    }}
                  ></div>{" "}
                  <h4>
                    {person.firstName} {person.lastName}
                  </h4>
                  <button onClick={() => addFriend(person)}>Add friend</button>
                </div>
              ))
            ) : (
              <p>No found</p>
            )}
          </div>
        </div>
        <div className="main-middle">
          <Stories />
          {!show && <WhatsUp onClick={openModal} user={props.user} />}

          <ModalPost
            user={user}
            closeModal={closeModal}
            show={show}
            setUsersPosts={setUsersPosts}
          />
          <Posts
            posts={usersPosts}
            likeClick={handelLikeClick}
            color={"white"}
            setUsersPosts={setUsersPosts}
            user={user}
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
