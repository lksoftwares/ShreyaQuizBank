import "../Userform/UserForm.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserHome() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = import.meta.env.VITE_BASE_URL;

  const token = localStorage.getItem("token");
  const user_ID = localStorage.getItem("ID");

  const fetchUserDetailsById = async (user_ID) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${url}/Users/AllUsers?User_ID=${user_ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.length > 0) {
        setUserDetails(response.data[0]);
        toast.success("User details fetched successfully!");
      } else {
        toast.warn("No user found with this ID.");
      }
    } catch (error) {
      setError("Failed to fetch user details");
      toast.error("Error fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user_ID) {
      fetchUserDetailsById(user_ID);
    }
  }, [user_ID]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="user-home-container">
      <h4>User Details</h4>
      <ToastContainer />
      {loading && <p className="error">Loading user details...</p>}
      {error && <p className="error">{error}</p>}
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
          <div className="form-group">
            <label htmlFor="userPassword">User Password:</label>
            <input
              type="password"
              id="userPassword"
              name="user_Password"
              value={userDetails.user_Password}
              readOnly
            />
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}></form>
    </div>
  );
}

export default UserHome;
