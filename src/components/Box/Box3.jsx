// import { RiQuestionAnswerFill } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import "../Box/Box.css";
// import { useState } from "react";
// import apiService from "../../../api";

// export default function Box3() {
//   const [myData, setmyData] = useState([]);

//   const Data = async () => {
//     const data = await apiService.get(
//       "Quiz_AnsTransaction/TodayAnsTransaction"
//     );
//     setmyData(data.totalTestToday);
//   };
//   Data();
//   return (
//     <div className="chartBox">
//       <div className="boxInfo">
//         <div className="titlee">
//           <center>
//             <h1 className="headingg">Today Ans Transaction</h1>
//           </center>
//         </div>
//       </div>{" "}
//       <Link to="/"></Link>
//       <div className="chartInfo"></div>
//       <center>
//         <RiQuestionAnswerFill className="icons"></RiQuestionAnswerFill>

//         <span className="dataa">{myData}</span>
//       </center>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import "../Box/Box.css";
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
            <h1 className="headingg">Top User</h1>
          </center>
        </div>
      </div>{" "}
      <Link to="/"></Link>
      <div className="chartInfo"></div>
      <center className="topuser">
        <br />
        <FaUser style={{ marginRight: "5px" }} /> Name: {myData.user_Name}
        <FaCheck
          style={{ marginRight: "5px", marginLeft: "20px" }}
        /> Correct: {myData.is_Correct}
        <br />
        <br />
        <FaQuestionCircle style={{ marginRight: "5px" }} /> Total Ques:
        {myData.totalQuestions}
        <FaChartLine style={{ marginRight: "5px", marginLeft: "16px" }} />{" "}
        Average: {myData.avg_Correct}
      </center>
    </div>
  );
}
