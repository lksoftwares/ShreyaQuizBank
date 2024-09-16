// import "../Navbar/Navbar.css";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import apiService from "../../../api";

// function Navbar() {
//   const [userDetails, setUserDetails] = useState(null);

//   const user_ID = localStorage.getItem("ID");

//   // const fetchUserDetailsById = async (user_ID) => {
//   //   setError(null);

//   //   try {
//   //     const response = await axios.get(
//   //       `${url}/Users/AllUsers?User_ID=${user_ID}`,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );

//   //     if (response.data && response.data.length > 0) {
//   //       setUserDetails(response.data[0]);
//   //       toast.success("User details fetched successfully!");
//   //     } else {
//   //       toast.warn("No user found with this ID.");
//   //     }
//   //   } catch (error) {
//   //     setError("Failed to fetch user details");
//   //     toast.error("Error fetching user details.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const fetchUserDetailsById = async () => {
//     const data = await apiService.get(`Users/AllUsers?User_ID=${user_ID}`);
//     setUserDetails(data.usersLists);
//     console.log("user", data.usersLists);
//   };

//   useEffect(() => {
//     if (user_ID) {
//       fetchUserDetailsById(user_ID);
//     }
//   }, [user_ID]);

//   return (
//     <div>
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
      <ToastContainer />
      <nav className="navb">
        <center>
          {userDetails && (
            <div>
              <span className="clr"> Welcome {userDetails.user_Name}...</span>
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
