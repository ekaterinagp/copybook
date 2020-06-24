import React, { useState } from "react";
import axios from "axios";
import Error from "./Error";

export default function AddComment(props) {
  const [user, setUser] = useState(props.user);
  const [text, setText] = useState();
  const [error, setError] = useState("");
  const loggedIn = localStorage.getItem("id");

  const addNewComment = async (e) => {
    e.preventDefault();
    setText("");
    const post_id = props.post_id;
    const comment = {
      firstName: user.firstName,
      lastName: user.lastName,
      text: text,
      user_id: user.user_id,
      user_img: user.user_img,
    };
    console.log(comment);
    try {
      const addCommentRes = await axios.post(
        `http://localhost:9090/posts/addcomment/${post_id}`,
        comment
      );
      console.log(addCommentRes);
      props.getPosts();
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="add-comment-div">
      {loggedIn ? (
        <form onSubmit={addNewComment} className="add-comment form-style-6">
          {error && <Error error={error} clearError={() => setError("")} />}
          <textarea
            type="text"
            className="text"
            value={text}
            placeholder="Text"
            onChange={(e) => setText(e.target.value)}
          />
          <button className="add-comment-button">Add comment</button>
        </form>
      ) : (
        <p>Only authorized users can leave comments</p>
      )}
    </div>
  );
}
