import React, { useState } from "react";
import Search from "../components/Search";
import "../containers/css/market.css";

export default function Marketplace() {
  const [savedItems, setSavedItems] = useState([
    {
      title: "car",
      price: 200000,
      img:
        "https://cdn.pixabay.com/photo/2016/09/02/08/32/cuba-1638594_960_720.jpg",
      contact: "A AA, 2345678",
    },
    {
      title: "dress",
      price: 200,
      img:
        "https://cdn.pixabay.com/photo/2016/06/11/16/51/prom-1450373_960_720.jpg",
      contact: "B BB, 234533678",
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
                <h3>{item.title}</h3>
                <h3>{item.price}</h3>
                <p>{item.contact}</p>
              </div>
            ))
          ) : (
            <p>You have no saved items yet</p>
          )}
        </div>
      </div>
      <div className="market-center"></div>
    </div>
  );
}
