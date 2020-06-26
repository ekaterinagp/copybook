import React, { useState, useEffect } from "react";
import "../containers/css/profile.css";
import { MdPhotoCamera, MdEdit } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import { MdWork } from "react-icons/md";
import { BsHouseDoorFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import WhatsUp from "../components/WhatsUp";
import Posts from "../components/Posts";
import axios from "axios";

export default function SingleFriend(props) {
  const [mainUser, setMainUser] = useState(props.user);
  const history = useHistory();
  const friendId = window.location.href.match("([^/]+$)")[0];
  console.log(friendId);
  let loggedIn = localStorage.getItem("id");
  const userID = localStorage.getItem("id");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getUserById = async (friendId) => {
      const friend = await axios.get(`http://localhost:9090/users/${friendId}`);
      console.log(friend);
      setUser(friend.data);
    };
    getUserById(friendId);
  }, []);

  useEffect(() => {
    const getPostsByUser = async (friendId) => {
      const posts = await axios.get(`http://localhost:9090/posts/${friendId}`);
      console.log(posts);
      setPosts(posts.data);
    };
    getPostsByUser(friendId);
  }, []);

  const handelLikeClick = (e) => {
    console.log(e.target.style);
    e.target.style.fill = "blue";
  };

  const removeFriend = async (id) => {
    console.log(id);
    // const token = localStorage.getItem("token");
    const data = {
      email: mainUser.email,
    };
    const res = await axios
      .put(`http://localhost:9090/users/deletefriend/${id}`, data)
      .catch((error) => console.log(error.response.data));
    props.getUser();
    history.push("/home");
  };

  return (
    <>
      {!user ? (
        <p>Loading</p>
      ) : (
        <div className="profile-container-2">
          <div className="profile-top">
            <div
              className="cover"
              style={{ backgroundImage: `url(${user.cover_img})` }}
            >
              <div className="img-icon-profile">
                <img className="on-profile" src={user.user_img} />
              </div>
            </div>

            <h2 className="profile-name-full">
              {user.firstName} {user.lastName}
            </h2>
            <div className="bio">{user.bio}</div>
            <div className="remove-friend">
              <button onClick={() => removeFriend(user.user_id)}>
                Remove from friends
              </button>
            </div>
          </div>
          <div className="profile-bottom">
            <div className="left-part">
              <div className="intro">
                <h2>Intro</h2>
                <div className="grid-intro">
                  {" "}
                  <IconContext.Provider value={{ size: "2em", color: "grey" }}>
                    <MdWork />
                  </IconContext.Provider>{" "}
                  <p>Works at {user.works} </p>
                </div>
                <div className="grid-intro">
                  <IconContext.Provider value={{ size: "2em", color: "grey" }}>
                    <BsHouseDoorFill />
                  </IconContext.Provider>{" "}
                  <p>Lives in {user.lives}</p>
                </div>
                {/* <button className="edit-intro">Edit Details</button> */}
              </div>
              <div className="photo">
                <h2>Photo</h2>
                <div className="photo-container">
                  {" "}
                  {user.photos.length ? (
                    user.photos.map((photo, i) => (
                      <div
                        key={i}
                        className="photo-one"
                        style={{ backgroundImage: `url(${photo})` }}
                      ></div>
                    ))
                  ) : (
                    <h3>No photos yet</h3>
                  )}
                </div>
              </div>
              <div className="friends">
                <h2>Friends</h2>
                <div className="friends-container">
                  {" "}
                  {user.friends.length ? (
                    user.friends.map((friend, i) => (
                      <div key={i}>
                        <Link to={`/friend/${friend.user_id}`}>
                          <div
                            className="photo-one"
                            id={friend.user_id}
                            style={{
                              backgroundImage: `url(${friend.user_img})`,
                            }}
                          ></div>{" "}
                        </Link>
                        <h4>
                          {friend.firstName} {friend.lastName}
                        </h4>
                      </div>
                    ))
                  ) : (
                    <h3>No friends yet</h3>
                  )}
                </div>
              </div>
            </div>
            <div className="right-part">
              {/* <WhatsUp user={user} /> */}
              <h2>Posts</h2>
              <Posts
                posts={posts}
                likeClick={handelLikeClick}
                color={"#f0f2f5"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
