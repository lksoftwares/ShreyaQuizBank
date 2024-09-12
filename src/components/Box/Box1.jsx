import { BsQuestionSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../Box/Box.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Box2() {
  const token = localStorage.getItem("token");
  const [err, setError] = useState("");

  const [myData, setmyData] = useState([]);

  const Data = async () => {
    try {
      const res = await axios({
        url: "http://192.168.1.54:7241/Question/TotalQuestion",
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setmyData(response.data.totalQuestions);
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
            <h1 className="headingg">Total Questions</h1>
          </center>
        </div>
      </div>{" "}
      <Link to="/"></Link>
      <div className="chartInfo"></div>
      <center>
        <BsQuestionSquareFill className="icons"></BsQuestionSquareFill>

        <span className="dataa">{myData}</span>
      </center>
    </div>
  );
}
