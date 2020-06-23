import React, { useState, useEffect } from "react";
import "./css/start.css";
import { useHistory } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { IoIosEye } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import LikesComments from "../components/LikesComments";
import { IconContext } from "react-icons";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";

export default function SingleGroup(props) {
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState();

  let history = useHistory();
  const groupId = window.location.href.match("([^/]+$)")[0];
  console.log(groupId);

  const getGroupDetails = async () => {
    setLoading(true);
    const res = await axios
      .get(`http://localhost:9090/groups/${groupId}`)
      .catch((error) => console.log(error.response.data));
    console.log(res.data);
    setGroup(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getGroupDetails();
  }, []);

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

  const handelLikeClick = (e) => {
    // setLikes(likes + 1);
    console.log(e.target.style);
    // e.target.style.fill = "blue";
  };

  return (
    <div className="single-group">
      <div className="svg-back">
        {" "}
        <MdArrowBack onClick={() => history.goBack()} />
      </div>
      {group ? (
        <div className="group-top">
          <div
            className="img-single-group"
            style={{ backgroundImage: `url(${group.img})` }}
          ></div>
          <div className="desc-group">
            <h1>{group.title}</h1>
            <div className="div-desc">
              <p className="title-border">{group.short_desc} &#xb7;</p>
              <p className="title-border">{group.contact} &#xb7;</p>
              <p>{group.members.length} members</p>
              <div className="members-img">
                {group.members.map((member, i) => (
                  <div className="img-member-group" key={i}>
                    <div className="tooltip">
                      <img src={member.user_img} alt="member-img" />
                      <span className="tooltiptext">
                        {member.first_name} {member.last_name}
                      </span>{" "}
                    </div>
                  </div>
                ))}
                <div className="img-member-group invite">Invite</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}

      <div className="single-group-main-container">
        <div className="center">
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
        </div>{" "}
        {group ? (
          <div className="about">
            <div>
              <h2>About the group</h2>

              <div className="long-desc">{group.long_desc}</div>
            </div>
            <div className="info-icons">
              <div className="single-icon">
                <IconContext.Provider value={{ size: "2em" }}>
                  <GiEarthAfricaEurope />
                  <div className="desc-icon">
                    <p>{group.public ? "Public" : "Private"}</p>
                    <p>
                      {group.public
                        ? "Anyone can see who's in the group and what they post"
                        : "Only members can see who's in the group and what they post"}
                    </p>
                  </div>
                </IconContext.Provider>
              </div>
              <div className="single-icon">
                <IconContext.Provider value={{ size: "2em" }}>
                  <IoIosEye />
                  <div className="desc-icon">
                    <p>{group.visible ? "Visible" : "Hidden"}</p>
                    <p>
                      {group.visible
                        ? "Anyone can find this group."
                        : "Only users with invitation can see this group"}
                    </p>
                  </div>
                </IconContext.Provider>
              </div>
              <div className="single-icon">
                <IconContext.Provider value={{ size: "2em" }}>
                  <MdLocationOn />
                  <div className="desc-icon">
                    <p>{group.location}</p>
                  </div>
                </IconContext.Provider>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
}
