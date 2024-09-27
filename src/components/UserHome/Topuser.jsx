import { Link } from "react-router-dom";
import "../UserHome/UserHome.css";
import { FaUser, FaCheck, FaQuestionCircle, FaChartLine } from "react-icons/fa";

import { useState } from "react";
import apiService from "../../../api";

export default function Box3() {
  const [myData, setMyData] = useState({
    user_Name: "",
    is_Correct: "",
    totalQuestions: "",
    avg_Correct: "",
  });
  const Data = async () => {
    const data = await apiService.get("Users/TopUser");
    setMyData(data[0]);
    console.log("top", data[0]);
  };
  Data();
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="titlee">
          <center>
            <h1 className="headingss">Top User</h1>
          </center>
        </div>
      </div>{" "}
      <Link to="/"></Link>
      <div className="chartInfo"></div>
      <span className="topuser">
        <br />
        <FaUser style={{ marginRight: "5px" }} /> Name: {myData.user_Name}
        <br />
        <FaChartLine style={{ marginRight: "5px" }} /> Average:{" "}
        {myData.avg_Correct}
        <br />
        <FaQuestionCircle style={{ marginRight: "5px" }} /> Total Ques:
        {myData.totalQuestions}
        <br />
        <FaCheck style={{ marginRight: "5px" }} /> Correct: {myData.is_Correct}
      </span>
    </div>
  );
}
