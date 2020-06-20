import React from "react";
import "../containers/css/start.css";
import LikesComments from "./LikesComments";

export default function Posts(props) {
  console.log(props.posts);
  const color = props.color;
  const usersPosts = props.posts;
  return (
    <div className="posts" style={{ backgroundColor: color }}>
      {usersPosts
        ? usersPosts.map((post, i) => (
            <div className="post" key={i}>
              <div className="mini-profile">
                <img src={post.user_img} />
                <div>
                  <div>{post.name}</div>
                  <div>{post.feelings}</div>
                  <img className="post-img" src={post.img} alt=""></img>
                </div>
              </div>
              <div>{post.text}</div>
              {console.log(post)}
              {console.log(post.comments, post.likes)}
              <LikesComments
                handleClick={props.likeClick}
                likes={post.likes}
                comments={post.comments}
              />
            </div>
          ))
        : null}
    </div>
  );
}
