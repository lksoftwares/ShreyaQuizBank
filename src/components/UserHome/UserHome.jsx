// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import UpcomingQuiz from "../UpcomingQuiz/UpcomingQuiz";
// import Navbar from "../Navbar/Navbar";
// import "../UserHome/UserHome.css";
// import apiService from "../../../api";

// function UserHome() {
//   const [userDetails, setUserDetails] = useState(null);
//   const user_ID = localStorage.getItem("ID");
//   const fetchUserDetailsById = async () => {
//     const response = await apiService.get(`Users/AllUsers?User_ID=${user_ID}`);
//     if (response.usersLists && response.usersLists.length > 0) {
//       setUserDetails(response.usersLists[0]);
//     }
//   };
//   useEffect(() => {
//     if (user_ID) {
//       fetchUserDetailsById();
//     }
//   }, [user_ID]);

//   return (
//     <div>
//       <Navbar></Navbar>

//       <UpcomingQuiz></UpcomingQuiz>

//       <ToastContainer />
//       <div className="user-home-container">
//         {userDetails && (
//           <div className="user-details-form">
//             <div className="form-group">
//               <label htmlFor="userRole">User Role:</label>
//               <input
//                 type="text"
//                 id="userRole"
//                 name="userRole"
//                 value={userDetails.userRole}
//                 readOnly
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="userName">User Name:</label>
//               <input
//                 type="text"
//                 id="userName"
//                 name="user_Name"
//                 value={userDetails.user_Name}
//                 readOnly
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="userEmail">User Email:</label>
//               <input
//                 type="email"
//                 id="userEmail"
//                 name="user_Email"
//                 value={userDetails.user_Email}
//                 readOnly
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserHome;

import React, { useEffect, useState } from "react";
import UpcomingQuiz from "../UpcomingQuiz/UpcomingQuiz";
import Navbar from "../Navbar/Navbar";
import apiService from "../../../api";
import "../UserHome/UserHome.css";
import Footer from "../footer/footer";
import Sidebar from "../Sidebar/Sidebar";
import { FaUserCircle } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
function UserHome() {
  const user_ID = localStorage.getItem("ID");
  const [myData, setMyData] = useState({
    correctAnswer: "",
    totalQuestion: "",
  });
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserDetailsById = async () => {
    const response = await apiService.get(`Users/AllUsers?User_ID=${user_ID}`);
    if (response.usersLists && response.usersLists.length > 0) {
      setUserDetails(response.usersLists[0]);
    }
  };
  useEffect(() => {
    if (user_ID) {
      fetchUserDetailsById();
    }
  }, [user_ID]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await apiService.get(
        `Quiz_AnsTransaction/Result?User_ID=${user_ID}`
      );
      setMyData(data.scoreResult);
      console.log("jkjkj", data.scoreResult.correctAnswer);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <UpcomingQuiz />
      <Sidebar />
      <div className="score-results">
        {loading && <p>Loading...</p>}
        {!loading && myData.length === 0 && <p>No results available.</p>}

        <div>
          <p className="score">Your Score Results</p>
          <hr />
          <br />
          <br />
          <p className="user-name answer">
            <FaUserCircle /> Name: {userDetails?.user_Name}
          </p>
          <p className="answer">
            <MdAttachEmail /> Email: {userDetails?.user_Email}
          </p>
          <p className=" correctt answer ">
            <FaCheck /> Correct Answers: {myData.correctAnswer}
          </p>
          <p className=" question answer">
            <FaCircleQuestion /> Total Questions: {myData.totalQuestion}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserHome;
