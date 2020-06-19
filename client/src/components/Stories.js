import React, { useState, useEffect } from "react";
import "../containers/css/start.css";

export default function Stories() {
  const [stories, setStories] = useState([
    {
      id: 1,
      user_id: 2,
      firstName: "Anna",
      lastName: "A",
      user_img:
        "https://cdn.pixabay.com/photo/2019/07/13/23/53/spring-equinox-4335941_960_720.jpg",
      story:
        "https://cdn.pixabay.com/photo/2018/10/13/12/43/sheep-3744175_960_720.jpg",
      text: "I am in Norway, it is awsome here!",
      created_at: "14-06-2020",
    },
    {
      id: 2,
      user_id: 4,
      firstName: "Ben",
      lastName: "B",
      user_img:
        "https://cdn.pixabay.com/photo/2020/05/23/08/12/old-5208526_960_720.jpg",
      story:
        "https://cdn.pixabay.com/photo/2020/05/15/15/29/leipzig-5173977_960_720.jpg",
      text: "summer looks like autumn",
      created_at: "14-06-2020",
    },
  ]);
  return (
    <div className="all-stories">
      {stories.map((story, i) => (
        <div key={i}>
          <div
            className="single-story"
            style={{ backgroundImage: `url(${story.story})` }}
          >
            <div className="mini-profile">
              <img src={story.user_img} alt="user-image" />

              {/* <p>{story.created_at}</p> */}
            </div>
            <h3 className="story-text">{story.text}</h3>

            <h4 className="name-story">
              {story.firstName} {story.lastName}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
