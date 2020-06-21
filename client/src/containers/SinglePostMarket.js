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
    title: "Car Fiat",
    price: 100000,
    desc: "New amazing car",
    long_desc: "very amazing very amazing very amazing",
    img:
      "https://cdn.pixabay.com/photo/2016/09/02/08/32/cuba-1638594_960_720.jpg",
    contact: "A AA, 2345678",
    user_id: 2,
    firstName: "Ben",
    lastName: "Hannov",
    user_img:
      "https://cdn.pixabay.com/photo/2014/05/03/00/10/standing-336554_960_720.jpg",
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
        <div className="top-desc">
          <h2>
            {post.title} : {post.desc}
          </h2>
          <h2>kr. {post.price}</h2> <p>{post.address}</p>
        </div>
        <div className="middle-desc">
          <h2>Description</h2>
          <p>
            <bold>Category:</bold>
            {post.category}
          </p>
          <p>{post.long_desc}</p>
        </div>
        <div className="bottom-desc">
          <h2>Seller information</h2>
          <div className="user-info-market">
            <img className="user-img-market" src={post.user_img} />
            <p>
              {post.firstName} {post.lastName}
            </p>
          </div>

          <button className="send-msg">Contact seller</button>
        </div>
      </div>

      <MdArrowBack onClick={() => history.goBack()} />
    </div>
  );
}
