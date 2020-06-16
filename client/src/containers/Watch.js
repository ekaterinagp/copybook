import React, { useState, useEffect } from "react";

import axios from "axios";
import { MdSearch } from "react-icons/md";
import { GiSaveArrow } from "react-icons/gi";
import "./css/watch.css";
import { IconContext } from "react-icons";
import Debouncer from "../components/Debouncer";

export default function Watch() {
  const [savedVideos, setSavedVideos] = useState([
    {
      // title: "Nature",
      link:
        "https://player.vimeo.com/external/396036988.hd.mp4?s=d409153a1984fc0bd388cdc8d0a3a94eed888de3&profile_id=170",
    },
    {
      // title: "Video2",
      link:
        "https://player.vimeo.com/external/402679728.hd.mp4?s=d24e05f20b7e859ad5bc7adc30c707e689c01078&profile_id=170",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [popularVideos, setPopularVideos] = useState([]);
  const [searchedVideo, setSearchedVideo] = useState([]);
  const [term, setTerm] = useState();

  const saveVideo = (link) => {
    console.log(link);
    savedVideos.push({ link: link });
    //save to databse and fetch again
    // setSavedVideos(...{ link: link });
    console.log(savedVideos);
  };
  const abortController = new AbortController();

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
    const debouncer = new Debouncer();
    e.preventDefault();
    console.log(e.target.value);
    let term = e.target.value;
    setTerm(term);
    debouncer.call(1000, () => {
      try {
        setLoading(true);
        fetchSearchVideo(term);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    fetchPopularVideos();
    // fetchSearchVideo();
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
            <input
              type="text"
              placeholder={`Search video `}
              onChange={getValue}
            />
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
        {searchedVideo.length ? (
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
                    {/* Save video
                  </button> */}
                    <video width="500" height="400" controls>
                      <source src={video.videos.medium.url} type="video/mp4" />
                    </video>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </>
        )}
      </div>
      <div className="watch-right"></div>
    </div>
  );
}
