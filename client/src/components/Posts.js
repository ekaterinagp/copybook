import React, { useState } from "react";
import "../containers/css/start.css";
import LikesComments from "./LikesComments";
import axios from "axios";

export default function Posts(props) {
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(true);
  console.log(props.posts);
  const color = props.color;
  const usersPosts = props.posts;

  const getPosts = async () => {
    setLoading(true);

    const res = await axios
      .get(`http://localhost:9090/posts/all`)
      .catch((error) => console.log(error.response.data));
    console.log(res);
    if (init) {
      res.data.forEach((one) => {
        one.commentsAreOpen = false;
      });
    } else {
      props.usersPosts.forEach((post) => {
        let found = res.data.find((one) => one.post_id === post.post_id);
        found.commentsAreOpen = post.commentsAreOpen;
      });
    }
    let postsModified = res.data.reverse();
    props.setUsersPosts(postsModified);
    setLoading(false);
    console.log("get posts run");
  };

  const toggleComments = (e) => {
    let id = e.target.id;
    console.log("opencomments", id);
    props.posts.forEach((one) => {
      if (one.post_id === id) {
        console.log(one);
        one.commentsAreOpen = !one.commentsAreOpen;
      }
    });
    props.setUsersPosts([...props.posts]);
  };

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

              {/* {console.log(post)}
              {console.log(post.comments, post.likes)} */}
              <LikesComments
                handleClick={props.likeClick}
                likes={post.likes}
                post_id={post.post_id}
                comments={post.comments}
                getPosts={getPosts}
                user={props.user}
                posts={usersPosts}
                toggleComments={toggleComments}
                commentsAreOpen={post.commentsAreOpen ? true : false}
              />
            </div>
          ))
        : null}
    </div>
  );
}
