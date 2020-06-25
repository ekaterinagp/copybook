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
    {
      id: 3,
      user_id: 5,
      firstName: "L",
      lastName: "LL",
      user_img:
        "https://cdn.pixabay.com/photo/2016/11/29/09/32/concept-1868728_960_720.jpg",
      story:
        "https://cdn.pixabay.com/photo/2016/11/29/09/32/concept-1868728_960_720.jpg",
      text: "work work work",
      created_at: "14-06-2020",
    },

    {
      id: 4,
      user_id: 6,
      firstName: "B",
      lastName: "BB",
      user_img:
        "https://cdn.pixabay.com/photo/2015/10/12/14/59/girl-984060_960_720.jpg",
      story:
        "https://cdn.pixabay.com/photo/2016/02/23/02/55/juggler-1216853_960_720.jpg",
      text: "fun fun fun",
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
