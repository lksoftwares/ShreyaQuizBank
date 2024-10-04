import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "../Home/Home.css";
import Box1 from "../components/Box/Box1";
import Box2 from "../components/Box/Box2";
import Box3 from "../components/Box/Box3";
// import Box4 from "../components/Box/Box4";
import Box5 from "../components/Box/Box5";
import Box6 from "../components/Box/Box6";
import UpcomingQuiz from "../components/UpcomingQuiz/UpcomingQuiz";
import Footer from "../components/footer/footer";
import Sidebar from "../components/Sidebar/Sidebar";
function Home() {
  return (
    <div>
      <Navbar></Navbar>

      <UpcomingQuiz></UpcomingQuiz>
      <Sidebar></Sidebar>

      <div className="homee">
        <div className="boxx box5 ">
          <Box5 />
        </div>
        <div className="boxx box6">
          <Box3 />
        </div>{" "}
        <div className="boxx box2">
          <Box2 />
        </div>
        <br />
        <div className="boxx box1 ">
          <Box6 />
        </div>{" "}
        <br />
        <div className="boxx box3 ">
          <Box1 />
        </div>{" "}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
