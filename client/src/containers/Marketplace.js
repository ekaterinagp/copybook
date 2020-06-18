import React, { useState } from "react";
import Search from "../components/Search";
import "../containers/css/market.css";

import { Link, useHistory } from "react-router-dom";

export default function Marketplace() {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      title: "car",
      price: 200000,
      desc: "New amazing car",
      img:
        "https://cdn.pixabay.com/photo/2016/09/02/08/32/cuba-1638594_960_720.jpg",
      contact: "A AA, 2345678",
      address: "Copenhegen N",
      category: "Transport",
    },
    {
      id: 2,
      title: "dress",
      price: 200,
      desc: "Ball dress",
      img:
        "https://cdn.pixabay.com/photo/2016/06/11/16/51/prom-1450373_960_720.jpg",
      contact: "B BB, 234533678",
      address: "Copenhegen SV",
      category: "Clothing",
    },
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "car",
      price: 200000,
      desc: "New amazing car",
      img:
        "https://cdn.pixabay.com/photo/2016/09/02/08/32/cuba-1638594_960_720.jpg",
      contact: "A AA, 2345678",
      address: "Copenhegen N",
      category: "Transport",
    },
    {
      id: 2,
      title: "dress",
      price: 200,
      desc: "Ball dress",
      img:
        "https://cdn.pixabay.com/photo/2016/06/11/16/51/prom-1450373_960_720.jpg",
      contact: "B BB, 234533678",
      address: "Copenhegen SV",
      category: "Clothing",
    },
    {
      id: 3,
      title: "table",
      price: 2000,
      desc: "New amazing table",
      img:
        "https://cdn.pixabay.com/photo/2015/05/31/10/55/tablet-791051_960_720.jpg",
      contact: "A AA, 2345678",
      address: "Copenhegen K",
      category: "Furniture",
    },
    {
      id: 4,
      title: "dress",
      price: 200,
      desc: "very good",
      img:
        "https://cdn.pixabay.com/photo/2017/09/06/19/09/women-2722641_960_720.jpg",
      contact: "B BB, 234533678",
      address: "Copenhegen V",
      category: "Clothing",
    },
  ]);

  const getValue = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="market-container">
      <div className="market-left">
        <div>
          <h2>Marketplace</h2>
          <Search placeholder={"Search at Marketplace"} getValue={getValue} />
        </div>
        <div className="saved-items">
          <h3>Your saved items</h3>
          {savedItems.length ? (
            savedItems.map((item, i) => (
              <div key={i}>
                <img src={item.img} alt="" />
                <h3>{item.price}</h3>
                <p>
                  {" "}
                  {item.title} {item.desc}
                </p>
                <p>{item.address}</p>

                <p>{item.contact}</p>
              </div>
            ))
          ) : (
            <p>You have no saved items yet</p>
          )}
        </div>
        <h2>Add filters for categories here</h2>
      </div>
      <div className="market-center">
        <h2>Today's picks for you</h2>
        <div className="market-items-container">
          {posts.length ? (
            posts.map((item, i) => (
              <Link to={`/post/${item.id}`} key={i}>
                <div key={i} className="single-market-post">
                  <div
                    className="img-div"
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                  {/* // <img src={item.img} alt="" /> */}
                  <h3>kr. {item.price}</h3>
                  <p>
                    {" "}
                    {item.title} {item.desc}
                  </p>
                  <p>{item.address}</p>
                  <p>{item.contact}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>There are no posts for you</p>
          )}
        </div>
      </div>
    </div>
  );
}
