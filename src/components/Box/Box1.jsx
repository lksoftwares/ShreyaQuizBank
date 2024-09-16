import { BsQuestionSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../Box/Box.css";
import { useState } from "react";
import apiService from "../../../api";

export default function Box2() {
  const [myData, setmyData] = useState({
    totalQuestions: "",
  });
  const Data = async () => {
    const data = await apiService.get("Question/TotalQuestion");
    setmyData(data);
    console.log(data);
  };
  Data();
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="titlee">
          <center>
            <h1 className="headingg">Total Questions</h1>
          </center>
        </div>
      </div>{" "}
      <Link to="/"></Link>
      <div className="chartInfo"></div>
      <center>
        <BsQuestionSquareFill className="icons"></BsQuestionSquareFill>

        <span className="dataa">{myData.totalQuestions}</span>
      </center>
    </div>
  );
}
