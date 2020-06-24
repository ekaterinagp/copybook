import React, { useState } from "react";
import axios from "axios";
import AddComment from "./AddComment";

export default function Comments(props) {
  const [user, setUser] = useState(props.user);
  const post_id = props.post_id;
  const deleteComment = async (e) => {
    console.log(e.target.id);
    const token = localStorage.getItem("token");
    let comment_id = e.target.id;
    const res = await axios
      .put(`http://localhost:9090/posts/deletecomment/${comment_id}`, token)
      .catch((error) => console.log(error.response.data));

    props.getPosts();
  };
  return (
    <>
      {props.comments.length ? (
        <div className="middle-div-comments">
          {/* {console.log(props.comments)} */}

          {props.comments.map(
            ({ text, comment_id, firstName, lastName, user_img }) => {
              return (
                <div className="comment-structure" key={text}>
                  <div className="comment-single-structure">
                    <img className="mini" src={user_img} alt="" />
                    <p className="comment-author">
                      <strong>
                        {" "}
                        {firstName} {lastName}
                      </strong>
                    </p>
                    <p className="comment-text">{text}</p>
                  </div>
                  {user && user.user_img == user_img ? (
                    <p
                      className="delete-comment"
                      onClick={deleteComment}
                      id={comment_id}
                    >
                      Delete comment
                    </p>
                  ) : null}
                </div>
              );
            }
          )}
        </div>
      ) : null}
      <AddComment
        post_id={post_id}
        user={props.user}
        getPosts={props.getPosts}
      />
    </>
  );
}
