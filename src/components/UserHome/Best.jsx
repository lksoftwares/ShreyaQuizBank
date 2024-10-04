// import { Link } from "react-router-dom";
// import "../UserHome/UserHome.css";
// import { FaCheck, FaChartLine, FaRegSadCry } from "react-icons/fa"; // Added sad face icon
// import { BsFillCalendarDateFill } from "react-icons/bs";
// import { useState, useEffect } from "react";
// import apiService from "../../../api";
// import { FaCalendarAlt } from "react-icons/fa";
// import { FaClock } from "react-icons/fa6";
// export default function Best() {
//   const user_ID = localStorage.getItem("ID");

//   const [myData, setMyData] = useState(null);
//   const fetchData = async () => {
//     const data = await apiService.get(`Users/GetBestAndWorstQuizes/${user_ID}`);
//     if (data && data.bestQuizes && data.bestQuizes.length > 2) {
//       setMyData(data.bestQuizes[0]);
//     } else {
//       setMyData(null);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Function to format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
//     const year = String(date.getFullYear());

//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");

//     return (
//       <div>
//         {" "}
//         <FaCalendarAlt style={{ marginRight: "5px", marginLeft: "0px" }} />
//         {`${day}/${month}/${year} `}
//         <FaClock style={{ marginRight: "5px" }} />
//         {`${hours}:${minutes}`}
//       </div>
//     );
//   };

//   return (
//     <div className="chartBox">
//       <div className="boxInfo">
//         <div className="titlee">
//           <center>
//             <h1 className="headingss">Best Quiz</h1>
//           </center>
//         </div>
//       </div>
//       <Link to="/"></Link>
//       <div className="chartInfo"></div>
//       <span className="topusers">
//         <br />
//         {myData ? (
//           <>
//             {formatDate(myData.quiz_Date)}
//             <FaCheck style={{ marginRight: "5px" }} /> Correct:{" "}
//             {myData.correctAnswers} / {myData.total_Questions}
//             <br />
//             <FaChartLine style={{ marginRight: "5px" }} /> Percentage:{" "}
//             {myData.score_Percentage}%
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
import "../UserHome/UserHome.css";
import {
  FaCheck,
  FaChartLine,
  FaRegSadCry,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import apiService from "../../../api";

export default function Best() {
  const user_ID = localStorage.getItem("ID");
  const [myData, setMyData] = useState([]);

  const fetchData = async () => {
    const data = await apiService.get(`Users/GetBestAndWorstQuizes/${user_ID}`);
    if (data && data.bestQuizes) {
      setMyData(data.bestQuizes.slice(0, 2));
    } else {
      setMyData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return (
      <div>
        <FaCalendarAlt style={{ marginRight: "5px" }} />
        {`${day}/${month}/${year} `}
        <FaClock style={{ marginRight: "5px" }} />
        {`${hours}:${minutes}`}
      </div>
    );
  };

  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="titlee">
          <center>
            <h1 className="headingss">Best Quiz</h1>
          </center>
        </div>
      </div>
      <Link to="/"></Link>
      <div className="chartInfo"></div>
      <center>
        <span className="topusers">
          {myData.length > 0 ? (
            myData.map((quiz, index) => (
              <div key={index}>
                {formatDate(quiz.quiz_Date)}
                <FaCheck
                  style={{ marginRight: "5px", marginLeft: "-26px" }}
                />{" "}
                Correct: {quiz.correctAnswers} / {quiz.total_Questions}
                <br />
                <FaChartLine
                  style={{ marginRight: "5px", marginLeft: "10px" }}
                />{" "}
                Percentage: {quiz.score_Percentage}%
                <br />
                <br />
              </div>
            ))
          ) : (
            <div className="toppuser">
              <FaRegSadCry style={{ marginRight: "5px" }} /> No data available
            </div>
          )}
        </span>
      </center>
    </div>
  );
}
