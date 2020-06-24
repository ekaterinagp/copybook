import React from "react";
import { AiTwotoneLike, AiFillPropertySafety } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import "../containers/css/watch.css";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import Comments from "../components/Comments";

import { IconContext } from "react-icons";

export default function LikesComments(props) {
  // console.log(props);

  // console.log(props);
  return (
    <>
      <div className="bottom-video">
        <div className="like icon-action">
          <IconContext.Provider value={{ size: "1.5em" }}>
            <p className="justify-end">Like </p>{" "}
            <AiOutlineLike id={props.post_id} onClick={props.handleClick} />
          </IconContext.Provider>
        </div>
        <div className="comment icon-action">
          <IconContext.Provider value={{ size: "1.5em" }}>
            {" "}
            <p
              id={props.post_id}
              className="example_b toggle"
              onClick={props.toggleComments}
              className="justify-end"
            >
              Comment{" "}
            </p>{" "}
            <FaRegCommentAlt id={props.post_id} />
          </IconContext.Provider>
        </div>
        <div className="share icon-action">
          <IconContext.Provider value={{ size: "1.5em" }}>
            <p className="justify-end">Share </p> <RiShareForwardLine />
          </IconContext.Provider>
        </div>
        <div></div>
        <div className="likes-put icon-action">
          <IconContext.Provider
            value={{
              size: "1.5em",
              color: "blue",
            }}
          >
            <AiTwotoneLike />{" "}
            <p>
              {" "}
              {props.likes && props.likes.length ? props.likes.length : ""}{" "}
            </p>
          </IconContext.Provider>
        </div>
        <div className="comments-put">
          {props.comments && props.comments.length ? props.comments.length : 0}{" "}
          comments
        </div>
      </div>
      <div
        style={{
          display: props.commentsAreOpen ? "block" : "none",
        }}
      >
        <Comments
          comments={props.comments ? props.comments : 0}
          getPosts={props.getPosts}
          user={props.user}
          post_id={props.post_id}
        />
      </div>
    </>
  );
}
