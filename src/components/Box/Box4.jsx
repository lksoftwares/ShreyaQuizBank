import { FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../Box/Box.css";
import { useState } from "react";
import apiService from "../../../api";

export default function Box4() {
  const [myData, setmyData] = useState([]);
  const Data = async () => {
    const data = await apiService.get("Users/AllUSers");
    setmyData(data.totalUsers);
    console.log(data);
  };
  Data();
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="titlee">
          <center>
            <h1 className="headingg">Total Users</h1>
          </center>
        </div>
      </div>{" "}
      <Link to="/"></Link>
      <div className="chartInfo"></div>
      <center>
        <FaUsers className="icons"></FaUsers>

        <span className="dataa">{myData}</span>
      </center>
    </div>
  );
}
