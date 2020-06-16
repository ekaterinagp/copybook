import React, { useState, useEffect } from "react";
import pexels from "../components/pexel";
import axios from "axios";
import { MdSearch } from "react-icons/md";
import { GiSaveArrow } from "react-icons/gi";
import "./css/watch.css";
import { IconContext } from "react-icons";

export default function Watch() {
  const [savedVideos, setSavedVideos] = useState([
    {
      // title: "Nature",
      link:
        "https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile_id=164&oauth2_token_id=57447761",
    },
    {
      // title: "Video2",
      link:
        "https://player.vimeo.com/external/314181352.sd.mp4?s=d2cd7a37f6250cd543e6d13209730b4bcf242130&profile_id=164&oauth2_token_id=57447761",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [popularVideos, setPopularVideos] = useState([]);

  const saveVideo = (link) => {
    console.log(link);
    savedVideos.push({ link: link });
    //save to databse and fetch again
    // setSavedVideos(...{ link: link });
    console.log(savedVideos);
  };
  const abortController = new AbortController();

  const fetchPopularVideos = async () => {
    setLoading(true);
    const videos = await pexels
      .get(`/videos/popular`, {
        signal: abortController.signal,
      })
      .catch((error) => console.log(error.response.data));
    console.log(videos.data.videos);
    setPopularVideos(videos.data.videos);
    setLoading(false);
  };

  const fetchSearchVideo = async (term) => {
    setLoading(true);
    const API_KEY = "16795333-601a6aef6f988f75f286fd11f";
    // let term = "Nature";
    let URL =
      "https://pixabay.com/api/videos/?key=" +
      API_KEY +
      "&q=" +
      encodeURIComponent(term);
    const videos = await axios.get(URL);
    // .catch((error) => console.log(error.response.data));
    console.log(videos);
    setLoading(false);
  };

  useEffect(() => {
    fetchPopularVideos();
    fetchSearchVideo();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="watch-container">
      <div className="watch-left">
        <div>
          <h2>Watch</h2>{" "}
          <form className="formSearch">
            <MdSearch />
            <input type="text" placeholder={`Search video `} />
          </form>
        </div>
        <div className="block-divider">
          <h3>Saved videos</h3>
          <div className="saved-videos">
            {savedVideos.length ? (
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
        <h2>Popular videos for you</h2>
        <div className="popular">
          {popularVideos.length ? (
            popularVideos.map((video, i) => (
              <div className="single-video" key={i}>
                <div className="video-top">
                  <h3>Video by {video.user.name}</h3>{" "}
                  <IconContext.Provider
                    value={{ color: "lightgreen", size: "2em" }}
                  >
                    <div className="tooltip">
                      <GiSaveArrow
                        onClick={() => saveVideo(video.video_files[0].link)}
                      />
                      <span className="tooltiptext">Save video</span>
                    </div>
                  </IconContext.Provider>
                </div>
                {/* Save video
                </button> */}
                <video width="500" height="400" controls>
                  <source src={video.video_files[0].link} type="video/mp4" />
                </video>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="watch-right"></div>
    </div>
  );
}
