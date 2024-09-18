// import "../Navbar/Navbar.css";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useState, useEffect } from "react";
// import apiService from "../../../api";

// function Navbar() {
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
//       <ToastContainer />

//       <nav className="navb">
//         <center>
//           {userDetails && (
//             <div>
//               <span className="clr"> Welcome {userDetails.user_Name}...</span>
//               <Link to="/">
//                 <button
//                   className="btnnn"
//                   onClick={() => {
//                     localStorage.clear();
//                     toast.info("Logged out successfully!");
//                   }}
//                 >
//                   Logout
//                 </button>
//               </Link>
//             </div>
//           )}
//         </center>
//       </nav>
//     </div>
//   );
// }

// export default Navbar;
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import apiService from "../../../api";

function Navbar() {
  const [userDetails, setUserDetails] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div>
      <ToastContainer />

      <nav className="navb">
        <center>
          {userDetails && (
            <div className="date">
              {currentTime}
              <span className="clr">Welcome {userDetails.user_Name}...</span>
              <Link to="/">
                <button
                  className="btnnn"
                  onClick={() => {
                    localStorage.clear();
                    toast.info("Logged out successfully!");
                  }}
                >
                  Logout
                </button>
              </Link>
            </div>
          )}
        </center>
      </nav>
    </div>
  );
}

export default Navbar;
