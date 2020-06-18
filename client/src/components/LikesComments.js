import React from "react";
import { AiTwotoneLike, AiFillPropertySafety } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import "../containers/css/watch.css";
import { FaRegCommentAlt } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import Comments from "../components/Comments";

import { IconContext } from "react-icons";

export default function LikesComments(props) {
  return (
    <div className="bottom-video">
      <div className="like icon-action">
        <IconContext.Provider value={{ size: "1.5em" }}>
          <p className="justify-end">Like </p>{" "}
          <AiOutlineLike onClick={props.handleClick} />
        </IconContext.Provider>
      </div>
      <div className="comment icon-action">
        <IconContext.Provider value={{ size: "1.5em" }}>
          <p className="justify-end">Comment </p> <FaRegCommentAlt />
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
          <AiTwotoneLike /> <p> {props.likes ? props.likes : 0} </p>
        </IconContext.Provider>
      </div>
      <div className="comments-put">{props.comments.length} comments</div>
      <Comments comments={props.comments} />
    </div>
  );
}
