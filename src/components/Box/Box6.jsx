import { PiUsersFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import "../Box/Box.css";
import { useState } from "react";
import apiService from "../../../api";

export default function Box6() {
  const [myData, setmyData] = useState([]);

  const Data = async () => {
    const data = await apiService.get("Users/participation");
    setmyData(data.no_Of_Participated_User);
    console.log(data.no_Of_Participated_User);
  };
  Data();
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="titlee">
          <center>
            <h1 className="headingg">Total Users Participated</h1>
          </center>
        </div>
      </div>{" "}
      <Link to="/"></Link>
      <div className="chartInfo"></div>
      <center>
        <PiUsersFill className="icons"></PiUsersFill>

        <span className="dataa">{myData}</span>
      </center>
    </div>
  );
}
