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
import Debouncer from "../components/Debouncer";

export default function Profile(props) {
  console.log(props.user);
  const [user, setUser] = useState(props.user);
  const history = useHistory();
  let loggedIn = localStorage.getItem("id");
  const userID = localStorage.getItem("id");
  const [loading, setLoading] = useState(true);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [temp, setTemp] = useState();

  const [posts, setPosts] = useState();

  const handelLikeClick = (e) => {
    console.log(e.target.style);
    e.target.style.fill = "blue";
  };

  useEffect(() => {
    if (user) {
      const getPostsByUser = async (id) => {
        const posts = await axios.get(`http://localhost:9090/posts/${id}`);
        console.log(posts);
        setPosts(posts.data);
      };
      getPostsByUser(user.user_id);
    }
  }, []);

  const handelClickEdit = () => {
    setVisibleDetails(true);
  };

  const getNewData = (e) => {
    e.preventDefault();
    console.log(e.target.value, e.target.id);
    if (e.target.id == "lives") {
      setUser({ ...user, lives: e.target.value });
    }
    if (e.target.id == "works") {
      setUser({ ...user, works: e.target.value });
    }
  };

  const saveData = () => {
    console.log(temp);
    props.setUser(user);
    // props.setUser({ ...user, works: e.target.value });
    // props.setUser({ ...temp });
  };
  return (
    <>
      {!user ? (
        <p>Loading</p>
      ) : (
        <div className="profile-container">
          <div className="profile-top-user">
            <div
              className="cover"
              style={{ backgroundImage: `url(${user.cover_img})` }}
            >
              {" "}
              <div className="img-icon-profile">
                <img className="img-on-profile" src={user.user_img} />
                <IconContext.Provider value={{ size: "2em" }}>
                  <MdPhotoCamera />
                </IconContext.Provider>
              </div>
              <div className="button-change-cover">
                <IconContext.Provider value={{ size: "2em" }}>
                  <button>
                    <MdPhotoCamera /> <p>Edit Cover Photo</p>
                  </button>
                </IconContext.Provider>
              </div>
            </div>

            <h2 className="profile-name-full">
              {user.firstName} {user.lastName}
            </h2>
            <IconContext.Provider value={{ size: "2em" }}>
              {" "}
              <button className="editProfile">
                {" "}
                <MdEdit />
                <p className="button-text"> Edit Profile </p>
              </button>{" "}
            </IconContext.Provider>
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
                <div
                  className="edit-details"
                  style={{
                    display: visibleDetails ? "block" : "none",
                  }}
                >
                  <input
                    placeholder="works"
                    onChange={getNewData}
                    id="works"
                  ></input>
                  <input
                    placeholder="lives"
                    onMouseLeave={getNewData}
                    id="lives"
                  ></input>
                </div>
                {visibleDetails ? (
                  <button className="edit-intro" onClick={saveData}>
                    Save
                  </button>
                ) : (
                  <button className="edit-intro" onClick={handelClickEdit}>
                    Edit Details
                  </button>
                )}
              </div>
              <div className="photo">
                <h2>Photo</h2>
                <div className="photo-container">
                  {" "}
                  {user.photos && user.photos.length ? (
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
                  {user.friends && user.friends.length ? (
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
              <WhatsUp user={user} />
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
