// import React, { useState, useEffect } from "react";
// import "../UpcomingQuiz/UpcomingQuiz.css";
// import apiService from "../../../api";

// function UpcomingQuiz() {
//   const [myData, setMyData] = useState("");
//   const userId = localStorage.getItem("ID");
//   // const role_ID = localStorage.getItem("Roleid");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await apiService.get(
//           `QuizTransaction/upcomingQuiz/${userId}`
//         );
//         if (data && data[0] && data[0].quiz_Date) {
//           setMyData(data[0].quiz_Date);
//         } else {
//           setMyData();
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
//           Your next quiz is scheduled on {myData || "Loading..."}.
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
  const [quizDates, setQuizDates] = useState([]);
  const userId = localStorage.getItem("ID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.get(
          `QuizTransaction/upcomingQuiz/${userId}`
        );
        console.log("sdvxc", data);
        if (data && data.length > 0) {
          const dates = data.map((quiz) => quiz.quiz_Date); // Extract all quiz dates
          setQuizDates(dates);
        } else {
          setQuizDates([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setQuizDates(["Error fetching quiz dates"]);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <div className="marquee-container">
        <div className="marquee-content">
          {quizDates.length > 0 ? (
            quizDates.map((date, index) => (
              <div key={index}> Next Quiz is scheduled on {date}.</div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpcomingQuiz;
