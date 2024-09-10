import { RiQuestionAnswerFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../Box/Box.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Box1() {
  const token = localStorage.getItem("token");

  const [myData, setmyData] = useState([]);
  const [err, setError] = useState("");

  const Data = async () => {
    try {
      const res = await axios({
        url: "http://192.168.1.54:7241/Quiz_AnsTransaction/TotalQuizAnsTransaction",
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setmyData(response.data.totalTest);
        console.log(response.data.totalTest);
      });
    } catch (err) {
      setError(err.message);
    }
  };
  Data();
  useEffect(() => {
    Data();
  }, []);

  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="titlee">
          <center>
            <h1 className="headingg">Total Quiz Answer</h1>
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
