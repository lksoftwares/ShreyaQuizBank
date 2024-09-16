import { RiQuestionAnswerFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../Box/Box.css";
import { useState } from "react";
import apiService from "../../../api";

export default function Box1() {
  const [myData, setmyData] = useState([]);

  const Data = async () => {
    const data = await apiService.get(
      "Quiz_AnsTransaction/TotalQuizAnsTransaction"
    );
    setmyData(data.totalTest);
    console.log(data.totalTest);
  };
  Data();
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="titlee">
          <center>
            <h1 className="headingg">Total Quiz Completed</h1>
          </center>
        </div>
      </div>{" "}
      <Link to="/"></Link>
      <div className="chartInfo"></div>
      <center>
        <RiQuestionAnswerFill className="icons"></RiQuestionAnswerFill>

        <span className="dataa">{myData}</span>
      </center>
    </div>
  );
}
