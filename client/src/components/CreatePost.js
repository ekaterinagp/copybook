import React, { useState } from "react";

export default function CreatePost(props) {
  const [post, setPost] = useState({
    id: null,
    name: "",
    feeling: "",
    user_img: "",
    img: "",
    text: "",
    tag: [
      {
        id: null,
        name: "",
        user_img: "",
      },
    ],
    comments: [],
    likes: [],
  });
}
