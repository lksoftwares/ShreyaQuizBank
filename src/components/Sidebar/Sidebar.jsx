// import React, { useState, useEffect } from "react";
// import "../Sidebar/Sidebar.css";
// import apiService from "../../../api";

// function Sidebar() {
//   const [myData, setMyData] = useState([]);
//   const userId = localStorage.getItem("ID");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await apiService.get(`QuizTransaction/upcomingQuiz`);
//         if (data && data.length > 1) {
//           const remainingQuizzes = data.slice(1);
//           setMyData(remainingQuizzes);
//         } else {
//           setMyData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setMyData(["Error fetching quiz dates"]);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   return (
//     <div className="sidebar">
//       <center>
//         <h6 className="head">UPCOMING QUIZ</h6>
//       </center>
//       <hr />
//       {myData.length > 0 ? (
//         <marquee behavior="scroll" direction="up">
//           <ul className="all-dates">
//             {myData.map((quiz, index) => (
//               <li key={index}>
//                 Quiz Name: {quiz.quiz_Name} <br /> Next Date: {quiz.quiz_Date}
//               </li>
//             ))}
//           </ul>
//         </marquee>
//       ) : (
//         "Loading..."
//       )}
//     </div>
//   );
// }

// export default Sidebar;
// import React, { useState, useEffect } from "react";
// import "../Sidebar/Sidebar.css";
// import apiService from "../../../api";

// function Sidebar() {
//   const [myData, setMyData] = useState([]);
//   const userId = localStorage.getItem("ID");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await apiService.get(`QuizTransaction/upcomingQuiz`);
//         if (data && data.length > 1) {
//           const remainingQuizzes = data.slice(1);
//           setMyData(remainingQuizzes);
//         } else {
//           setMyData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setMyData(["Error fetching quiz dates"]);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear());
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");

//     const ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12; // Convert to 12-hour format
//     hours = hours ? String(hours).padStart(2, "0") : "12"; // Handle '0' hours

//     return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
//   };

//   return (
//     <div className="sidebar">
//       <center>
//         <h6 className="head">UPCOMING QUIZ</h6>
//       </center>
//       <hr />
//       {myData.length > 0 ? (
//         <marquee behavior="scroll" direction="up">
//           <ul className="all-dates">
//             {myData.map((quiz, index) => (
//               <li key={index}>
//                 <center> {quiz.quiz_Name}</center> <br />
//                 {formatDateTime(quiz.quiz_Date)}
//                 <hr />
//               </li>
//             ))}
//           </ul>
//         </marquee>
//       ) : (
//         "Loading..."
//       )}
//     </div>
//   );
// }

// export default Sidebar;
// import React, { useState, useEffect } from "react";
// import "../Sidebar/Sidebar.css";
// import apiService from "../../../api";
// import { FaCalendarAlt } from "react-icons/fa";
// import { FaClock } from "react-icons/fa6";
// function Sidebar() {
//   const [myData, setMyData] = useState([]);
//   const userId = localStorage.getItem("ID");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await apiService.get(`QuizTransaction/upcomingQuiz`);
//         if (data && data.length > 1) {
//           const remainingQuizzes = data.slice(1);
//           setMyData(remainingQuizzes);
//         } else {
//           setMyData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setMyData(["Error fetching quiz dates"]);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear());
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");

//     const ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12; // Convert to 12-hour format
//     hours = hours ? String(hours).padStart(2, "0") : "12"; // Handle '0' hours

//     return {
//       date: `${day}/${month}/${year}`,
//       time: `${hours}:${minutes}:${seconds} ${ampm}`,
//     };
//   };

//   return (
//     <div className="sidebar">
//       <center>
//         <h6 className="head">UPCOMING QUIZ</h6>
//       </center>
//       <hr />
//       {myData.length > 0 ? (
//         <marquee behavior="scroll" direction="up">
//           <ul className="all-dates">
//             {myData.map((quiz, index) => {
//               const { date, time } = formatDateTime(quiz.quiz_Date);
//               return (
//                 <li key={index}>
//                   <center>{quiz.quiz_Name}</center>
//                   <br />
//                   <FaCalendarAlt /> {date}
//                   <FaClock style={{ marginLeft: 10 }} /> {time}
//                   <hr />
//                 </li>
//               );
//             })}
//           </ul>
//         </marquee>
//       ) : (
//         "Loading..."
//       )}
//     </div>
//   );
// }

// export default Sidebar;
// import React, { useState, useEffect } from "react";
// import "../Sidebar/Sidebar.css";
// import apiService from "../../../api";
// import { FaCalendarAlt } from "react-icons/fa";
// import { FaClock } from "react-icons/fa6";

// function Sidebar() {
//   const [myData, setMyData] = useState([]);
//   const userId = localStorage.getItem("ID");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await apiService.get(
//           `QuizTransaction/upcomingQuiz?User_ID=${userId}`
//         );
//         if (data && data.length > 1) {
//           const remainingQuizzes = data.slice(1);
//           setMyData(remainingQuizzes);
//         } else {
//           setMyData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setMyData(["Error fetching quiz dates"]);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear());
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");

//     const ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12; // Convert to 12-hour format
//     hours = hours ? String(hours).padStart(2, "0") : "12"; // Handle '0' hours

//     return {
//       date: `${day}/${month}/${year}`,
//       time: `${hours}:${minutes}:${seconds} ${ampm}`,
//     };
//   };

//   return (
//     <div className="sidebar">
//       <center>
//         <h6 className="head">UPCOMING QUIZ</h6>
//       </center>
//       <hr />
//       {myData.length > 0 ? (
//         <marquee behavior="scroll" direction="up">
//           <ul className="all-dates">
//             {myData.map((quiz, index) => {
//               const { date, time } = formatDateTime(quiz.quiz_Date);
//               const isTopThree = index < 3;
//               const textStyle = { color: isTopThree ? "red" : "black" };

//               return (
//                 <li key={index} style={textStyle}>
//                   <center>{quiz.quiz_Name}</center>
//                   <br />
//                   <FaCalendarAlt /> {date}
//                   <FaClock style={{ marginLeft: 10 }} /> {time}
//                   <hr />
//                 </li>
//               );
//             })}
//           </ul>
//         </marquee>
//       ) : (
//         "Loading..."
//       )}
//     </div>
//   );
// }

// export default Sidebar;
import React, { useState, useEffect } from "react";
import "../Sidebar/Sidebar.css";
import apiService from "../../../api";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

function Sidebar() {
  const [myData, setMyData] = useState([]);
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

      if (data && data.length > 0) {
        const remainingQuizzes = data.slice(0);
        setMyData(remainingQuizzes);
      }
    };

    fetchData();
  }, [userId, roleId]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    // const seconds = String(date.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12";

    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes} ${ampm}`,
    };
  };

  return (
    <div className="sidebar">
      <center>
        <h6 className="head">UPCOMING QUIZ</h6>
      </center>
      <hr />
      {myData.length > 0 ? (
        <marquee behavior="scroll" direction="up">
          <ul className="all-dates">
            {myData.map((quiz, index) => {
              const { date, time } = formatDateTime(quiz.quiz_Date);
              const isTopThree = index < 3;
              const textStyle = { color: isTopThree ? "red" : "black" };

              return (
                <li key={index} style={textStyle}>
                  <center>{quiz.quiz_Name}</center>
                  <br />
                  <FaCalendarAlt /> {date}
                  <FaClock style={{ marginLeft: 10 }} /> {time}
                  <hr />
                </li>
              );
            })}
          </ul>
        </marquee>
      ) : (
        "No Quiz Available..."
      )}
    </div>
  );
}

export default Sidebar;
1;
