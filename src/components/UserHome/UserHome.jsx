import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpcomingQuiz from "../UpcomingQuiz/UpcomingQuiz";
import Navbar from "../Navbar/Navbar";
import "../UserHome/UserHome.css";
import apiService from "../../../api";

function UserHome() {
  const [userDetails, setUserDetails] = useState(null);
  const user_ID = localStorage.getItem("ID");
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

  return (
    <div>
      <Navbar></Navbar>

      <UpcomingQuiz></UpcomingQuiz>

      <ToastContainer />
      <div className="user-home-container">
        {userDetails && (
          <div className="user-details-form">
            <div className="form-group">
              <label htmlFor="userRole">User Role:</label>
              <input
                type="text"
                id="userRole"
                name="userRole"
                value={userDetails.userRole}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName">User Name:</label>
              <input
                type="text"
                id="userName"
                name="user_Name"
                value={userDetails.user_Name}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="userEmail">User Email:</label>
              <input
                type="email"
                id="userEmail"
                name="user_Email"
                value={userDetails.user_Email}
                readOnly
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHome;
// import React from "react";
// import Navbar from "../Navbar/Navbar";
// import UpcomingQuiz from "../UpcomingQuiz/UpcomingQuiz";
// function UserHome() {
//   return (
//     <div>
//       <Navbar></Navbar>
//       <UpcomingQuiz></UpcomingQuiz>
//     </div>
//   );
// }

// export default UserHome;
