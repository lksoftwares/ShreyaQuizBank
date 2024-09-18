import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "../Box/Box.css";
import { useState } from "react";
import apiService from "../../../api";
import { FaUsers } from "react-icons/fa6";
export default function Box5() {
  const [myData, setmyData] = useState([]);
  const [data, setData] = useState([]);
  const Data = async () => {
    const data = await apiService.get("Users/AllUSers");
    setmyData(data.totalAdmin);
    setData(data.totalUsers);
  };
  Data();
  return (
    <div className="chartBox">
      <Link to="/admin/users" className="no-underline">
        <div className="boxInfo">
          <div className="titlee">
            <h1 className="headinggs">Total Admin</h1>
          </div>
        </div>{" "}
        <div className="chartInfo"></div>
        <RiAdminFill className="icons admin-icon"></RiAdminFill>
        <span className="dataa">{myData}</span>
        <br />
        <div className="boxInfo">
          <div className="titlee">
            <center>
              <h1 className="headinggs right titl">Total Users</h1>
            </center>
          </div>
        </div>{" "}
        <div className="chartInfo"></div>
        <center>
          <FaUsers className="icons right"></FaUsers>

          <span className="dataa">{data}</span>
        </center>
      </Link>
    </div>
  );
}
