import React, { useState } from "react";
import "./css/market.css";
import { MdArrowBack } from "react-icons/md";
import { useHistory } from "react-router-dom";

export default function SinglePostMarket({ match }) {
  let params = match.params;
  let history = useHistory();
  //fetch item
  const [post, setPost] = useState({
    id: 1,
    title: "car",
    price: 200000,
    desc: "New amazing car",
    img:
      "https://cdn.pixabay.com/photo/2016/09/02/08/32/cuba-1638594_960_720.jpg",
    contact: "A AA, 2345678",
    address: "Copenhegen N",
    category: "Transport",
  });
  console.log(params);
  return (
    <div className="single-post-market">
      <div
        className="img-single"
        style={{ backgroundImage: `url(${post.img})` }}
      ></div>
      <div className="desc-post">
        <h2>{post.title}</h2>
        <h2>kr. {post.price}</h2>
        <p>{post.desc}</p>
        <p>{post.contact}</p>
        <p>{post.address}</p>
        <p>{post.category}</p>
      </div>
      <MdArrowBack onClick={() => history.goBack()} />
    </div>
  );
}
