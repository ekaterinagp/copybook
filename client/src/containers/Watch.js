import React, { useState, useEffect } from "react";
import pexels from "../components/pexel";
import { MdSearch } from "react-icons/md";
import "./css/watch.css";

export default function Watch() {
  const [savedVideos, setSavedVideos] = useState([
    {
      title: "Nature",
      link:
        "https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile_id=164&oauth2_token_id=57447761",
    },
    {
      title: "Video2",
      link:
        "https://player.vimeo.com/external/331114247.sd.mp4?s=774a9cd251c1df88f5f031864a7b66dcdd393837&profile_id=164&oauth2_token_id=57447761",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [popularVideos, setPopularVideos] = useState([]);

  const fetchVideos = async () => {
    setLoading(true);
    const videos = await pexels.get(`/videos/popular`);
    console.log(videos.data.videos);
    setPopularVideos(videos.data.videos);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);
  //data.videos[0].video_files[0].link
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
                  <h3>{video.title}</h3>
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
                <video width="400" height="300" controls>
                  <source src={video.video_files[0].link} type="video/mp4" />
                </video>
              </div>
            ))
          ) : (
            <p>Can not load popular videos</p>
          )}
        </div>
      </div>
      <div className="watch-right"></div>
    </div>
  );
}
