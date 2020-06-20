import React, { useState, useEffect } from "react";
import "../containers/css/profile.css";
import { MdPhotoCamera, MdEdit } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

import { MdWork } from "react-icons/md";
import { BsHouseDoorFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import WhatsUp from "../components/WhatsUp";
import Posts from "../components/Posts";

export default function Profile() {
  const [user, setUser] = useState({
    id: 1,
    firstName: "Anna",
    lastName: "A",
    img:
      "https://cdn.pixabay.com/photo/2017/11/11/21/55/girl-2940655_960_720.jpg",
    cover:
      "https://cdn.pixabay.com/photo/2018/04/06/00/25/nature-3294681_960_720.jpg",
    work: "Bank",
    lives: "Copenhagen",
    photos: [
      "https://cdn.pixabay.com/photo/2016/04/21/22/26/mystical-portrait-of-a-girl-1344632_960_720.jpg",
      "https://cdn.pixabay.com/photo/2015/12/01/20/28/fall-1072821_960_720.jpg",
      "https://cdn.pixabay.com/photo/2018/06/13/18/20/wave-3473335__340.jpg",
      "https://cdn.pixabay.com/photo/2016/08/09/05/15/water-1579915_960_720.jpg",
      "https://cdn.pixabay.com/photo/2015/07/27/18/56/parent-863085_960_720.jpg",
      "https://cdn.pixabay.com/photo/2017/04/08/16/16/beach-2213618_960_720.jpg",
    ],
    friends: [
      {
        id: 4,
        firstName: "Ben",
        lastName: "Benson",
        img:
          "https://cdn.pixabay.com/photo/2018/04/29/16/23/boy-3360378_960_720.jpg",
      },
      {
        id: 6,
        firstName: "Den",
        lastName: "Denson",
        img:
          "https://cdn.pixabay.com/photo/2016/08/04/21/22/pokemon-1571013_960_720.jpg",
      },
      {
        id: 5,
        firstName: "Eva",
        lastName: "Enson",
        img:
          "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_960_720.jpg",
      },
      {
        id: 7,
        firstName: "Jen",
        lastName: "Jenson",
        img:
          "https://cdn.pixabay.com/photo/2017/05/11/08/48/model-2303361_960_720.jpg",
      },
    ],
  });

  const [posts, setPosts] = useState([
    {
      id: 1,
      user_id: 1,
      name: "Anna A",
      user_img:
        "https://cdn.pixabay.com/photo/2017/11/11/21/55/girl-2940655_960_720.jpg",
      created_at: "01-06-2020",
      feelings: "feeling excitied",
      img:
        "https://cdn.pixabay.com/photo/2017/06/07/10/47/elephant-2380009_960_720.jpg",
      text: "Love elephants",
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
          firstName: "George",
          lastName: "Jensen",
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
      user_id: 1,
      name: "Anna A",
      user_img:
        "https://cdn.pixabay.com/photo/2017/11/11/21/55/girl-2940655_960_720.jpg",
      created_at: "06-06-2020",
      feelings: "feeling blue",
      img:
        "https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014713_960_720.jpg",
      text: "Sunset",
      comments: [
        {
          id: 4,
          text: "Nice",
          created: "06-06-2020",
          firstName: "A",
          lastName: "AA",
          img:
            "https://cdn.pixabay.com/photo/2016/11/01/03/27/girl-1787357_960_720.jpg",
        },
        {
          id: 5,
          text: "I like it",
          created: "06-06-2020",
          firstName: "B",
          lastName: "BB",
          img:
            "https://cdn.pixabay.com/photo/2016/07/18/20/33/elephant-1526709_960_720.jpg",
        },
      ],
      likes: [
        {
          id: 3,
          firstName: "George",
          lastName: "Jensen",
        },
        {
          id: 5,
          firstName: "Ben",
          lastName: "B",
        },
      ],
    },
  ]);

  const handelLikeClick = (e) => {
    console.log(e.target.style);
    e.target.style.fill = "blue";
  };

  return (
    <div className="profile-container">
      <div className="profile-top">
        <div
          className="cover"
          style={{ backgroundImage: `url(${user.cover})` }}
        >
          {" "}
          <div className="img-icon-profile">
            <img className="img-on-profile" src={user.img} />
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
              <p>Works at {user.work} </p>
            </div>
            <div className="grid-intro">
              <IconContext.Provider value={{ size: "2em", color: "grey" }}>
                <BsHouseDoorFill />
              </IconContext.Provider>{" "}
              <p>Lives in {user.lives}</p>
            </div>
            <button className="edit-intro">Edit Details</button>
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
                    <div
                      className="photo-one"
                      style={{ backgroundImage: `url(${friend.img})` }}
                    ></div>
                    <h4>
                      {friend.firstName} {friend.lastName}
                    </h4>
                  </div>
                ))
              ) : (
                <h3>No photos yet</h3>
              )}
            </div>
          </div>
        </div>
        <div className="right-part">
          <WhatsUp user={user.firstName} />
          <h2>Posts</h2>
          <Posts posts={posts} likeClick={handelLikeClick} color={"#f0f2f5"} />
        </div>
      </div>
    </div>
  );
}
