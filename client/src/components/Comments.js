import React from "react";

export default function Comments(props) {
  return (
    <div className="middle-div-comments">
      {console.log(props.comments)}
      {props.comments.map(({ text, created, firstName, lastName, id, img }) => {
        return (
          <div className="mini-profile" key={text}>
            <img src={img} alt="" />
            <p className="comment-author">
              {firstName} {lastName}
            </p>
            <p className="comment-text">{text}</p>

            <p className="comment-time">{created}</p>
            {console.log(id)}
            <p
              className="delete-comment"
              // onClick={() => deleteComment(id)}
              id={id}
            >
              Delete comment
            </p>
          </div>
        );
      })}
    </div>
  );
}
