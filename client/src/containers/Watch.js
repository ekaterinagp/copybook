import React, { useState, useEffect } from "react";

import axios from "axios";
import { MdSearch } from "react-icons/md";
import { GiSaveArrow } from "react-icons/gi";
import { AiTwotoneLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import "./css/watch.css";
import { IconContext } from "react-icons";
import Debouncer from "../components/Debouncer";
import Contacts from "../components/Contacts";
import Search from "../components/Search";
import LikesComments from "../components/LikesComments";

export default function Watch(props) {
  const [user, setUser] = useState();
  // const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    let userId = localStorage.getItem("id");
    const res = await axios
      .get(`http://localhost:9090/users/${userId}`)
      .catch((error) => console.log(error.response.data));
    console.log(res);
    setUser(res.data);
    setLoading(false);
  };
  console.log(props);
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
  const [savedVideos, setSavedVideos] = useState(props.user.videos);
  const [loading, setLoading] = useState(true);
  const [popularVideos, setPopularVideos] = useState([]);
  const [searchedVideo, setSearchedVideo] = useState([]);
  const [term, setTerm] = useState();
  const [likes, setLikes] = useState(12);

  const saveVideo = async (link) => {
    let userId = localStorage.getItem("id");
    console.log(link);
    savedVideos.push({ link: link });
    const res = await axios
      .post(`http://localhost:9090/watch/save/${userId}`, { link: link })
      .catch((error) => console.log(error.response.data));
    props.getUser();
    //save to databse and fetch again
    // setSavedVideos(...{ link: link });
    console.log(savedVideos);
  };
  const abortController = new AbortController();

  // const fetchPopularVideos = async () => {
  //   const API_KEY = "16795333-601a6aef6f988f75f286fd11f";
  //   let URL = "https://pixabay.com/api/videos/?key=" + API_KEY;
  //   setLoading(true);

  //   const videos = await axios
  //     .get(URL)
  //     .catch((error) => console.log(error.response.data));
  //   console.log(videos.data.hits);

  //   setPopularVideos(videos.data.hits);
  //   setLoading(false);
  // };

  const fetchSearchVideo = async (term) => {
    const API_KEY = "16795333-601a6aef6f988f75f286fd11f";
    // let term = "Nature";
    let URL =
      "https://pixabay.com/api/videos/?key=" +
      API_KEY +
      "&q=" +
      encodeURIComponent(term);
    const videos = await axios.get(URL);
    // .catch((error) => console.log(error.response.data));

    console.log(videos.data.hits);
    setSearchedVideo(videos.data.hits);
  };

  const getValue = (e) => {
    if (e.target.value == "") {
      setTerm("");
    }
    const debouncer = new Debouncer();
    // e.preventDefault();
    console.log(e.target.value);
    if (e.target.value) {
      console.log("there is a value");
      let term = e.target.value;
      setTerm(term);
      debouncer.call(1000, () => {
        try {
          fetchSearchVideo(term);
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      console.log("no value!");
      setSearchedVideo([]);
    }
  };

  // useEffect(() => {}, [savedVideos]);

  useEffect(() => {
    const fetchPopularVideos = async () => {
      const API_KEY = "16795333-601a6aef6f988f75f286fd11f";
      let URL = "https://pixabay.com/api/videos/?key=" + API_KEY;
      setLoading(true);

      const videos = await axios
        .get(URL)
        .catch((error) => console.log(error.response.data));
      console.log(videos.data.hits);
      setPopularVideos(videos.data.hits);
      setLoading(false);
    };
    fetchPopularVideos();
    getUser();
  }, []);

  const handelLikeClick = (e) => {
    setLikes(likes + 1);
    console.log(e.target.style);
    e.target.style.fill = "blue";
  };

  return (
    <div className="watch-container">
      <div className="watch-left">
        <div>
          <h2>Watch</h2>{" "}
          <Search placeholder={"Search video"} getValue={getValue} />
        </div>
        <div className="block-divider">
          <h3>Saved videos</h3>
          <div className="saved-videos">
            {savedVideos ? (
              savedVideos.map((video, i) => (
                <div className="saved-single-video" key={i}>
                  {/* <h3>{video.title}</h3> */}
                  <video width="200" height="150" controls>
                    <source src={video.link} type="video/mp4" />
                  </video>
                </div>
              ))
            ) : (
              <p>You do not have videos yet </p>
            )}
          </div>
        </div>
      </div>
      <div className="watch-center">
        {searchedVideo.length && term !== "" ? (
          <>
            <h2>Search results for {term} </h2>
            {searchedVideo.map((video, i) => (
              <div className="single-video" key={i}>
                <div className="video-top">
                  <h3>
                    {video.tags} by {video.user}
                  </h3>{" "}
                  <IconContext.Provider
                    value={{ color: "lightgreen", size: "2em" }}
                  >
                    <div className="tooltip">
                      <GiSaveArrow
                        onClick={() => saveVideo(video.videos.medium.url)}
                      />
                      <span className="tooltiptext">Save video</span>
                    </div>
                  </IconContext.Provider>
                </div>
                {/* Save video
           </button> */}
                <video width="500" height="400" controls>
                  <source src={video.videos.medium.url} type="video/mp4" />
                </video>
              </div>
            ))}
          </>
        ) : (
          <>
            <h2>Popular videos for you</h2>
            <div className="popular">
              {popularVideos.length ? (
                popularVideos.map((video, i) => (
                  <div className="single-video" key={i}>
                    <div className="video-top">
                      <h3>
                        {video.tags} by {video.user}
                      </h3>{" "}
                      <IconContext.Provider
                        value={{ color: "lightgreen", size: "2em" }}
                      >
                        <div className="tooltip">
                          <GiSaveArrow
                            onClick={() => saveVideo(video.videos.medium.url)}
                          />
                          <span className="tooltiptext">Save video</span>
                        </div>
                      </IconContext.Provider>
                    </div>

                    <video width="500" height="400" controls>
                      <source src={video.videos.medium.url} type="video/mp4" />
                    </video>

                    <LikesComments
                      handleClick={handelLikeClick}
                      likes={likes}
                      comments={comments}
                    />
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </>
        )}
      </div>
      <div className="watch-right">
        <Contacts />
      </div>
    </div>
  );
}
