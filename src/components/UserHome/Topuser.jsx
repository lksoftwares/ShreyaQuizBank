// import { Link } from "react-router-dom";
// import "../UserHome/UserHome.css";
// import {
//   FaUser,
//   FaCheck,
//   FaQuestionCircle,
//   FaChartLine,
//   FaRegSadCry,
// } from "react-icons/fa"; // Added a sad face icon

// import { useState, useEffect } from "react";
// import apiService from "../../../api";

// export default function Box3() {
//   const [myData, setMyData] = useState(null); // Start with null for no data

//   const fetchData = async () => {
//     try {
//       const data = await apiService.get("Users/TopUser");
//       if (data.length > 0) {
//         setMyData(data[0]);
//       } else {
//         setMyData(null); // Set to null if no data
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setMyData(null); // Handle error by setting to null
//     }
//   };

//   useEffect(() => {
//     fetchData(); // Fetch data on component mount
//   }, []);

//   return (
//     <div className="chartBox">
//       <div className="boxInfo">
//         <div className="titlee">
//           <center>
//             <h1 className="headingss">Top User</h1>
//           </center>
//         </div>
//       </div>
//       <Link to="/"></Link>
//       <div className="chartInfo"></div>
//       <span className="topuser">
//         <br />
//         {myData ? (
//           <>
//             <FaUser style={{ marginRight: "5px" }} /> Name: {myData.user_Name}
//             <br />
//             <FaCheck style={{ marginRight: "5px" }} /> Correct:{" "}
//             {myData.is_Correct}/ {myData.totalQuestions}
//             <br />
//             <FaChartLine style={{ marginRight: "5px" }} /> Percentage:{" "}
//             {myData.avg_Correct}%
//           </>
//         ) : (
//           <>
//             <FaRegSadCry style={{ marginRight: "5px" }} /> No data available
//           </>
//         )}
//       </span>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import "../Box/Box.css";
import {
  FaUser,
  FaCheck,
  FaQuestionCircle,
  FaChartLine,
  FaRegSadCry,
} from "react-icons/fa"; // Added a sad face icon for no data

import { useState, useEffect } from "react";
import apiService from "../../../api";

export default function Box3() {
  const [myData, setMyData] = useState({
    user_Name: "",
    is_Correct: "",
    totalQuestions: "",
    avg_Correct: "",
  });

  const fetchData = async () => {
    const data = await apiService.get("Users/TopUser");
    if (data.length > 0) {
      setMyData(data[0]);
    } else {
      setMyData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCardColor = () => {
    const percentage = myData?.avg_Correct;
    if (percentage < 33) {
      return "#ec0000";
    } else if (percentage >= 33 && percentage <= 80) {
      return "#F6BE00";
    } else if (percentage > 80) {
      return "#0b0";
    }
    return "#a63d9d";
  };

  return (
    <div
      className="chartBox boxxx"
      style={{
        backgroundColor: getCardColor(),
        marginTop: "-20px",
        marginLeft: "-20px",
      }}
    >
      <div className="boxInfo">
        <div className="titlee">
          <center>
            <h1 className="headingss">Top User</h1>
          </center>
        </div>
      </div>
      <Link to="/"></Link>
      <div className="chartInfo"></div>
      <center className="toppuser">
        <br />
        {myData ? (
          <>
            <FaUser style={{ marginRight: "5px", marginLeft: "0px" }} /> Name:{" "}
            {myData.user_Name}
            <br />
            <FaCheck style={{ marginRight: "5px", marginLeft: "-22px" }} />{" "}
            Correct: {myData.is_Correct} / {myData.totalQuestions}
            <br />
            <FaChartLine style={{ marginRight: "5px" }} /> Percentage:{" "}
            {myData.avg_Correct}%
          </>
        ) : (
          <>
            <FaRegSadCry style={{ marginRight: "5px" }} /> No data available
          </>
        )}
      </center>
    </div>
  );
}
