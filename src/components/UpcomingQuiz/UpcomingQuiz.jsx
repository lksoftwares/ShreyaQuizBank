// import React, { useState, useEffect } from "react";
// import "../UpcomingQuiz/UpcomingQuiz.css";
// import apiService from "../../../api";

// function UpcomingQuiz() {
//   const [myData, setMyData] = useState(null); // Initialize as null to handle conditional rendering
//   const userId = localStorage.getItem("ID");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await apiService.get(`QuizTransaction/upcomingQuiz`);
//         if (data && data[0] && data[0].quiz_Date) {
//           const quizDate = new Date(data[0].quiz_Date);
//           const formattedDate = `${quizDate
//             .getDate()
//             .toString()
//             .padStart(2, "0")}/${(quizDate.getMonth() + 1)
//             .toString()
//             .padStart(2, "0")}/${quizDate.getFullYear()}`;
//           setMyData(formattedDate);
//         } else {
//           setMyData("No upcoming quiz date available.");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setMyData("Error fetching quiz date");
//       }
//     };

//     fetchData();
//   }, [userId]);

//   return (
//     <div>
//       <div className="marquee-container">
//         <div className="marquee-content">
//           Next quiz is scheduled on {myData || "Loading..."}.
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UpcomingQuiz;
import React, { useState, useEffect } from "react";
import "../UpcomingQuiz/UpcomingQuiz.css";
import apiService from "../../../api";

function UpcomingQuiz() {
  const [myData, setMyData] = useState(null); // Initialize as null to handle conditional rendering
  const userId = localStorage.getItem("ID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.get(`QuizTransaction/upcomingQuiz`);
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
          const seconds = String(quizDate.getSeconds()).padStart(2, "0");

          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12; // Convert to 12-hour format
          hours = hours ? String(hours).padStart(2, "0") : "12"; // Handle '0' hours

          const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
          setMyData(`${formattedDate} at ${formattedTime}`);
        } else {
          setMyData("No upcoming quiz date available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMyData("Error fetching quiz date");
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <div className="marquee-container">
        <div className="marquee-content">
          Next quiz is scheduled on {myData || "Loading..."}.
        </div>
      </div>
    </div>
  );
}

export default UpcomingQuiz;
