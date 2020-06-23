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
                  <div className="up-post">
                    <div className="up">
                      <strong>
                        {post.firstName} {post.lastName}
                      </strong>{" "}
                      {post.feeling ? (
                        <p className="feeling">is feeling {post.feeling}</p>
                      ) : null}
                      {post.tag && post.tag.length
                        ? post.tag.map((one, i) => (
                            <div key={i} className="tag-post-one">
                              {" "}
                              with{" "}
                              <strong>
                                {" "}
                                {one.firstName} {one.lastName}
                              </strong>
                            </div>
                          ))
                        : null}
                    </div>
                    <div></div>
                    <div className="text-post">{post.text}</div>
                  </div>
                  <img className="post-img" src={post.img} alt=""></img>
                </div>
              </div>

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
