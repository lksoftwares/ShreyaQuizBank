import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../Box/Box.css";
import { useState } from "react";
import apiService from "../../../api";

export default function Box5() {
  const [myData, setmyData] = useState([]);
  const Data = async () => {
    const data = await apiService.get("Users/AllUSers");
    setmyData(data.totalAdmin);
  };
  Data();
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="titlee">
          <center>
            <h1 className="headingg">Total Admin</h1>
          </center>
        </div>
      </div>{" "}
      <Link to="/"></Link>
      <div className="chartInfo"></div>
      <center>
        <RiAdminFill className="icons"></RiAdminFill>

        <span className="dataa">{myData}</span>
      </center>
    </div>
  );
}
