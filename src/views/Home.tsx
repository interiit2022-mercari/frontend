import React from "react";
import illus from "../images/illus.svg";

function Home() {
  return (
    <div className="home main_content">
      <div className="content">
        <img src={illus} alt="" />
        <h1>HMS</h1>
        <p>Transforming Healthcare</p>
      </div>
    </div>
  );
}

export default Home;
