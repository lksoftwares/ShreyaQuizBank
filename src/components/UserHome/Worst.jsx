import { Link } from "react-router-dom";
import "../UserHome/UserHome.css";
import { FaCheck, FaQuestionCircle, FaChartLine } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { useState } from "react";
import apiService from "../../../api";

export default function Worst() {
  const user_ID = localStorage.getItem("ID");

  const [myData, setMyData] = useState({
    quiz_Date: "",
    correctAnswers: "",
    total_Questions: "",

    score_Percentage: "",
  });
  const Data = async () => {
    const data = await apiService.get(`Users/GetWorstQuizes/${user_ID}`);
    setMyData(data[0]);
    console.log("worst", data);
  };
  Data();
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="titlee">
          <center>
            <h1 className="headingss">Worst Quiz</h1>
          </center>
        </div>
      </div>{" "}
      <Link to="/"></Link>
      <div className="chartInfo"></div>
      <span className="topuser">
        <br />
        <BsFillCalendarDateFill style={{ marginRight: "5px" }} /> Name:{" "}
        {myData.quiz_Date}
        <br />
        <FaCheck style={{ marginRight: "5px" }} /> Correct:{" "}
        {myData.correctAnswers}
        <br />
        <FaQuestionCircle style={{ marginRight: "5px" }} /> Total Ques:
        {myData.total_Questions}
        <br />
        <FaChartLine style={{ marginRight: "5px" }} /> Average:{" "}
        {myData.score_Percentage}
      </span>
    </div>
  );
}
