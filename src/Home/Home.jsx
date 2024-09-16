import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "../Home/Home.css";
import Box1 from "../components/Box/Box1";
import Box2 from "../components/Box/Box2";
import Box3 from "../components/Box/Box3";
import Box4 from "../components/Box/Box4";
import Box5 from "../components/Box/Box5";
function Home() {
  return (
    <div>
      <Navbar></Navbar>

      <div className="homee">
        <div className="boxx box5 ">
          <Box5 />
        </div>
        <div className="boxx box1 ">
          <Box4 />
        </div>
        <div className="boxx box2 ">
          <Box1 />
        </div>
        <br />

        <div className="boxx box3">
          <Box2 />
        </div>
        <div className="boxx box4">
          <Box3 />
        </div>
      </div>
    </div>
  );
}

export default Home;
