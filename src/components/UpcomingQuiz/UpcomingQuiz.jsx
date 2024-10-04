// import React, { useState, useEffect } from "react";
// import "./UpcomingQuiz.css";
// import apiService from "../../../api";

// function UpcomingQuiz() {
//   const [myData, setMyData] = useState(null);
//   const userId = localStorage.getItem("ID");
//   const roleId = localStorage.getItem("Roleid");

//   useEffect(() => {
//     const fetchData = async () => {
//       let data;
//       if (roleId === "5") {
//         data = await apiService.get(`QuizTransaction/upcomingQuiz`);
//       } else {
//         data = await apiService.get(
//           `QuizTransaction/upcomingQuiz?User_ID=${userId}`
//         );
//       }

//       if (data && data[0] && data[0].quiz_Date) {
//         const quizDate = new Date(data[0].quiz_Date);
//         const formattedDate = `${quizDate
//           .getDate()
//           .toString()
//           .padStart(2, "0")}/${(quizDate.getMonth() + 1)
//           .toString()
//           .padStart(2, "0")}/${quizDate.getFullYear()}`;

//         let hours = quizDate.getHours();
//         const minutes = String(quizDate.getMinutes()).padStart(2, "0");

//         const formattedTime = `${hours}:${minutes}`;
//         setMyData(`${formattedDate} at ${formattedTime}`);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   return (
//     <div>
//       <div className="marquee-container">
//         <div className="marquee-content">
//           Next quiz is scheduled on {myData || "/ No quiz Available"}.
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UpcomingQuiz;
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa"; // Import icons
import "./UpcomingQuiz.css";
import apiService from "../../../api";

function UpcomingQuiz() {
  const [myData, setMyData] = useState(null);
  const userId = localStorage.getItem("ID");
  const roleId = localStorage.getItem("Roleid");

  useEffect(() => {
    const fetchData = async () => {
      let data;
      if (roleId === "5") {
        data = await apiService.get(`QuizTransaction/upcomingQuiz`);
      } else {
        data = await apiService.get(
          `QuizTransaction/upcomingQuiz?User_ID=${userId}`
        );
      }

      if (data && data[0] && data[0].quiz_Date) {
        const quizDate = new Date(data[0].quiz_Date);
        const formattedDate = `${quizDate
          .getDate()
          .toString()
          .padStart(2, "0")}/${(quizDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${quizDate.getFullYear()}`;

        let hours = quizDate.getHours();
        const minutes = String(quizDate.getMinutes()).padStart(2, "0");

        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12; // Convert to 12-hour format
        hours = hours ? hours : 12; // The hour '0' should be '12'

        const formattedTime = `${hours}:${minutes} ${ampm}`;

        setMyData(
          <>
            <FaCalendarAlt />
            <span className="up">{formattedDate}</span> at
            <FaClock style={{ marginLeft: "10px" }} />
            <span className="up">{formattedTime}</span>
          </>
        );
      }
    };

    fetchData();
  }, [userId, roleId]); // Include roleId in the dependency array

  return (
    <div>
      <div className="marquee-container">
        <div className="marquee-content">
          Next quiz is scheduled on {myData || "/ No quiz Available"}.
        </div>
      </div>
    </div>
  );
}

export default UpcomingQuiz;
