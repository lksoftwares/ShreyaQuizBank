// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../Users/user.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BsPencilSquare } from "react-icons/bs";
// import { MdDelete } from "react-icons/md";
// import Modal from "react-modal";
// import Select from "react-select";
// import Button from "react-bootstrap/Button";
// import apiService from "../../../api";
// import { Link } from "react-router-dom";
// import Footer from "../footer/footer";
// import Datetime from "../datetime";
// import { ImCheckmark } from "react-icons/im";
// import { IoMdAddCircle } from "react-icons/io";
// import { FaSignOutAlt } from "react-icons/fa";
// import { GrLinkPrevious } from "react-icons/gr";
// import { GrLinkNext } from "react-icons/gr";

// import { ImCross } from "react-icons/im";
// import { FaUserAlt } from "react-icons/fa";

// const customStyles = {
//   content: {
//     right: "auto",
//     width: 660,
//     height: 700,
//     backgroundColor: "#384256",
//     color: "white",
//     borderColor: "Black",
//     transform: "translate(-50%, -50%)",
//   },
// };
// const customstyles = {
//   content: {
//     right: "auto",
//     width: 460,
//     height: 450,
//     backgroundColor: "#384256",
//     color: "white",
//     borderColor: "Black",
//     transform: "translate(-50%, -50%)",
//   },
// };

// export default function User() {
//   const url = import.meta.env.VITE_BASE_URL;
//   const [myData, setMyData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]); // Data to be displayed after filtering
//   const [searchQuery, setSearchQuery] = useState(""); // Store search input

//   const [modalIsOpen, setIsOpen] = React.useState(false);
//   const [modalsIsOpen, setModalsIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     user_ID: "",
//     user_Name: "",
//     user_Email: "",
//     status: "",
//     role_ID: "",
//   });
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [options, setOptions] = useState([]);
//   const [selectOptions, setSelectOptions] = useState(null);
//   const token = localStorage.getItem("token");

//   // Fetch users data
//   const fetchUsers = async () => {
//     setLoading(true);
//     const data = await apiService.get("Users/AllUSers");
//     setMyData(data.usersLists);
//     setFilteredData(data.usersLists);
//     setLoading(false);
//   };
//   useEffect(() => {
//     fetchUsers();
//   }, []);
//   // Fetch roles options
//   const fetchOptions = async () => {
//     const data = await apiService.get("Roles/getallrole");
//     const userOptions = data.map((user) => ({
//       id: user.role_ID,
//       label: user.roleName,
//     }));
//     setOptions(userOptions);
//   };
//   useEffect(() => {
//     fetchOptions();
//   }, []);

//   // Filter the user list based on the search query
//   useEffect(() => {
//     const filtered = myData.filter((user) => {
//       const userName = user.user_Name.toLowerCase();
//       const userEmail = user.user_Email.toLowerCase();
//       const userRole = user.userRole ? user.userRole.toLowerCase() : "";
//       const userStatus = user.status === 1 ? "active" : "deactive"; // Adjust status to match your use case

//       return (
//         userName.includes(searchQuery.toLowerCase()) ||
//         userEmail.includes(searchQuery.toLowerCase()) ||
//         userRole.includes(searchQuery.toLowerCase()) ||
//         userStatus.includes(searchQuery.toLowerCase())
//       );
//     });
//     setFilteredData(filtered);
//   }, [searchQuery, myData]);
//   // Open modal
//   const openModals = () => setModalsIsOpen(true);

//   // Close modal
//   const closeModals = () => {
//     setModalsIsOpen(false);
//     setSelectedRow(null);
//     setFormData({
//       user_ID: "",
//       user_Name: "",
//       user_Email: "",
//       status: "",
//       role_Name: "",
//       role_ID: "",
//     });
//   };

//   const handleDelete = async (user_ID) => {
//     window.alert("Are you sure you want to delete?");
//     const response = await apiService.delete(`Users/deleteUser/${user_ID}`);
//     toast.success(response);
//     fetchUsers();
//   };
//   // Handle edit
//   const handleEditClick = (row) => {
//     setSelectedRow(row);
//     setFormData(row);
//     openModals();
//     const defaultOption = options.find((option) => option.id === row.role_ID);
//     setSelectOptions(defaultOption);
//   };

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle form submit
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const response = await axios.put(
//       `${url}/Users/updateUsers/${formData.user_ID}`,
//       {
//         user_Name: formData.user_Name,
//         user_Email: formData.user_Email,
//         status: formData.status,
//         role_ID: selectOptions ? selectOptions.id : formData.role_ID,
//         role_Name: formData.role_Name,
//       },

//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     toast.success(response.data);
//     closeModals();
//     fetchUsers();
//   };

//   // Handle role selection
//   const handleChoose = (data) => {
//     setSelectOptions(data);
//   };

//   const [formDataa, setFormDataa] = useState({
//     user_Name: "",
//     user_Email: "",
//     user_Password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormDataa({
//       ...formDataa,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // POST request to the registration endpoint
//       const response = await axios.post(`${url}/Users/register`, formDataa, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success(response.data);
//       console.log("response.data", response.data);
//     } catch (err) {
//       toast.error(err.response ? err.response.data : err.message);
//     } finally {
//       setLoading(false);
//     }
//     setFormDataa("");
//     setIsOpen(false);
//     fetchUsers();
//   };

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Number of items to display per page
//   const indexOfLastUser = currentPage * itemsPerPage;
//   const indexOfFirstUser = indexOfLastUser - itemsPerPage;
//   const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   return (
//     <>
//       <div>
//         <ToastContainer />
//         <div className="card-body">
//           <div className="header-container user-head">
//             <div>
//               {" "}
//               <Link to="/">
//                 <button
//                   className=" logout-btn"
//                   onClick={() => {
//                     localStorage.clear();
//                     toast.info("Logged out successfully!");
//                   }}
//                 >
//                   <FaSignOutAlt style={{ marginTop: "6px" }} />
//                 </button>
//               </Link>
//             </div>
//             <Datetime></Datetime>
//             <span>
//               <h2>Users</h2>
//             </span>{" "}
//             <div className="header-top">
//               <label className="search">Search Users: </label>
//               <input
//                 type="text"
//                 placeholder="Search by Username, Email, or Role"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)} // Update search query
//                 className="search-inputs"
//               />
//               <button onClick={() => setIsOpen(true)} className="btun">
//                 <IoMdAddCircle style={{ fontSize: 22 }} />{" "}
//               </button>
//             </div>
//           </div>

//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           {loading && <div className="loading-circle"></div>}
//           <div className="table-container">
//             <table className="table table-striped ">
//               <thead>
//                 <tr>
//                   <th>S.No</th>

//                   <th>UserName</th>
//                   <th>Email</th>
//                   <th>Role</th>

//                   <th>Status</th>
//                   <th>Edit</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentUsers.map((row, index) => (
//                   <tr key={row.user_ID}>
//                     <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
//                     <td>{row.user_Name}</td>
//                     <td>{row.user_Email}</td>
//                     <td>
//                       {row.userRole === "User" && (
//                         <FaUserAlt style={{ color: "red", fontSize: "20px" }} />
//                       )}
//                       {row.userRole === "Admin" && (
//                         <FaUserAlt
//                           style={{ color: "green", fontSize: "20px" }}
//                         />
//                       )}
//                     </td>
//                     <td>
//                       {row.status === 1 ? (
//                         <ImCheckmark
//                           style={{ color: "green", fontSize: "20px" }}
//                         />
//                       ) : (
//                         <ImCross style={{ color: "red", fontSize: "20px" }} />
//                       )}
//                     </td>
//                     <td>
//                       <center>
//                         <BsPencilSquare
//                           onClick={() => handleEditClick(row)}
//                           className="icon1"
//                         />
//                       </center>
//                     </td>
//                     <td>
//                       <center>
//                         <MdDelete
//                           onClick={() => handleDelete(row.user_ID)}
//                           className="icon"
//                         />
//                       </center>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               <Footer></Footer>{" "}
//             </table>
//           </div>
//           <div className="pagination">
//             {filteredData.length > itemsPerPage && (
//               <>
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                   }
//                   disabled={currentPage === totalPages}
//                   className="pagination"
//                   style={{ width: "60px" }}
//                 >
//                   <GrLinkNext size={20} />{" "}
//                 </button>
//                 <span>{`Page ${currentPage} of ${totalPages}`}</span>
//                 <button
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   disabled={currentPage === 1}
//                   style={{ width: "60px" }}
//                 >
//                   <GrLinkPrevious size={20} />{" "}
//                 </button>
//               </>
//             )}
//           </div>
//         </div>{" "}
//         <Modal
//           isOpen={modalsIsOpen}
//           onRequestClose={closeModals}
//           style={customStyles}
//           className="modal-set"
//         >
//           <form onSubmit={handleFormSubmit}>
//             <center>
//               <h1>Edit User</h1>
//             </center>
//             <hr />
//             <br />
//             <label className="fonts">
//               UserName:
//               <br />
//               <input
//                 type="text"
//                 name="user_Name"
//                 className="mar"
//                 value={formData.user_Name}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <br />
//             <label className="fonts">
//               UserEmail:
//               <br />
//               <input
//                 type="text"
//                 name="user_Email"
//                 className="mar"
//                 value={formData.user_Email}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <br />
//             <label className="fonts">
//               UserPassword:
//               <br />
//               <input
//                 type="text"
//                 name="user_Password"
//                 className="mar"
//                 value={formData.user_Password || ""}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <br />
//             <label className="fonts">
//               Status:
//               <br />
//               <input
//                 type="text"
//                 name="status"
//                 className="mar"
//                 value={formData.status}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <br />
//             <label className="fonts">Select Role:</label>
//             <Select
//               options={options}
//               placeholder="Select Role"
//               value={selectOptions}
//               onChange={handleChoose}
//               className="color"
//             />
//             <br />

//             <button type="submit" className="button1 button">
//               Save
//             </button>
//             <button type="button" className="button2" onClick={closeModals}>
//               Cancel
//             </button>
//           </form>
//         </Modal>
//         {/* add modal */}
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={() => setIsOpen(false)}
//           style={customstyles}
//           className="modall"
//         >
//           <center>
//             <h1>Add Users</h1>
//           </center>
//           <hr />
//           <br />
//           <label htmlFor="" className="fonts">
//             User Name :
//           </label>
//           <br />
//           <input
//             type="text"
//             className="mar inputt"
//             placeholder="Enter User Name here "
//             name="user_Name"
//             value={formDataa.user_Name}
//             onChange={handleChange}
//           />
//           <br />
//           <label htmlFor="" className="fonts">
//             User Email :
//           </label>
//           <br />
//           <input
//             type="text"
//             className="mar inputt"
//             placeholder="Enter email here "
//             name="user_Email"
//             value={formDataa.user_Email}
//             onChange={handleChange}
//           />
//           <br />
//           <label htmlFor="" className="fonts">
//             User Password :
//           </label>
//           <br />

//           <input
//             type="text"
//             className="mar inputt"
//             placeholder="Enter password here "
//             name="user_Password"
//             value={formDataa.user_Password}
//             onChange={handleChange}
//           />
//           <center>
//             <Button
//               className="button1 buton1 "
//               variant="primary"
//               onClick={handleSubmit}
//             >
//               Add
//             </Button>
//             <Button
//               variant="danger"
//               onClick={() => setIsOpen(false)}
//               className="button2 buttonn1 "
//             >
//               Close
//             </Button>
//           </center>
//         </Modal>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Users/user.css";
import { FaSadCry } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import apiService from "../../../api";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import Datetime from "../datetime";
import { ImCheckmark } from "react-icons/im";
import { IoMdAddCircle } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";

import { ImCross } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";

const customStyles = {
  content: {
    right: "auto",
    width: 660,
    height: 700,
    backgroundColor: "#384256",
    color: "white",
    borderColor: "Black",
    transform: "translate(-50%, -50%)",
  },
};
const customstyles = {
  content: {
    right: "auto",
    width: 460,
    height: 450,
    backgroundColor: "#384256",
    color: "white",
    borderColor: "Black",
    transform: "translate(-50%, -50%)",
  },
};

export default function User() {
  const url = import.meta.env.VITE_BASE_URL;
  const [myData, setMyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Data to be displayed after filtering
  const [searchQuery, setSearchQuery] = useState(""); // Store search input

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalsIsOpen, setModalsIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_ID: "",
    user_Name: "",
    user_Email: "",
    status: "",
    role_ID: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectOptions, setSelectOptions] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch users data
  const fetchUsers = async () => {
    setLoading(true);
    const data = await apiService.get("Users/AllUSers");
    setMyData(data.usersLists);
    setFilteredData(data.usersLists);
    setLoading(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  // Fetch roles options
  const fetchOptions = async () => {
    const data = await apiService.get("Roles/getallrole");
    const userOptions = data.map((user) => ({
      id: user.role_ID,
      label: user.roleName,
    }));
    setOptions(userOptions);
  };
  useEffect(() => {
    fetchOptions();
  }, []);

  // Filter the user list based on the search query
  useEffect(() => {
    const filtered = myData.filter((user) => {
      const userName = user.user_Name.toLowerCase();
      const userEmail = user.user_Email.toLowerCase();
      const userRole = user.userRole ? user.userRole.toLowerCase() : "";
      const userStatus = user.status === 1 ? "active" : "deactive"; // Adjust status to match your use case

      return (
        userName.includes(searchQuery.toLowerCase()) ||
        userEmail.includes(searchQuery.toLowerCase()) ||
        userRole.includes(searchQuery.toLowerCase()) ||
        userStatus.includes(searchQuery.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchQuery, myData]);
  // Open modal
  const openModals = () => setModalsIsOpen(true);

  // Close modal
  const closeModals = () => {
    setModalsIsOpen(false);
    setSelectedRow(null);
    setFormData({
      user_ID: "",
      user_Name: "",
      user_Email: "",
      status: "",
      role_Name: "",
      role_ID: "",
    });
  };

  const handleDelete = async (user_ID) => {
    window.alert("Are you sure you want to delete?");
    const response = await apiService.delete(`Users/deleteUser/${user_ID}`);
    toast.success(response);
    fetchUsers();
  };
  // Handle edit
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setFormData(row);
    openModals();
    const defaultOption = options.find((option) => option.id === row.role_ID);
    setSelectOptions(defaultOption);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.put(
      `${url}/Users/updateUsers/${formData.user_ID}`,
      {
        user_Name: formData.user_Name,
        user_Email: formData.user_Email,
        status: formData.status,
        role_ID: selectOptions ? selectOptions.id : formData.role_ID,
        role_Name: formData.role_Name,
      },

      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(response.data);
    closeModals();
    fetchUsers();
  };

  // Handle role selection
  const handleChoose = (data) => {
    setSelectOptions(data);
  };

  const [formDataa, setFormDataa] = useState({
    user_Name: "",
    user_Email: "",
    user_Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataa({
      ...formDataa,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // POST request to the registration endpoint
      const response = await axios.post(`${url}/Users/register`, formDataa, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data);
      console.log("response.data", response.data);
    } catch (err) {
      toast.error(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
    setFormDataa("");
    setIsOpen(false);
    fetchUsers();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  return (
    <>
      <div>
        <ToastContainer />
        <div className="card-body">
          <div className="header-container user-head">
            <div>
              <Link to="/">
                <button
                  className="logout-btn"
                  onClick={() => {
                    localStorage.clear();
                    toast.info("Logged out successfully!");
                  }}
                >
                  <FaSignOutAlt style={{ marginTop: "6px" }} />
                </button>
              </Link>
            </div>
            <Datetime />
            <span>
              <h2>Users</h2>
            </span>
            <div className="header-top">
              <label className="search">Search Users: </label>
              <input
                type="text"
                placeholder="Search by Username, Email, or Role"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                className="search-inputs"
              />
              <button onClick={() => setIsOpen(true)} className="btun">
                <IoMdAddCircle style={{ fontSize: 22 }} />
              </button>
            </div>
          </div>
          <br />
          <br />
          <br /> <br />
          <br /> <br />
          <br /> <br />
          {loading && <div className="loading-circle"></div>}
          <div className="table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      <h4>
                        {" "}
                        <FaSadCry style={{ marginRight: "10px" }} />
                        No Data Found
                      </h4>
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((row, index) => (
                    <tr key={row.user_ID}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{row.user_Name}</td>
                      <td>{row.user_Email}</td>
                      <td>
                        {row.userRole === "User" ? (
                          <FaUserAlt
                            style={{ color: "red", fontSize: "20px" }}
                          />
                        ) : (
                          <FaUserAlt
                            style={{ color: "green", fontSize: "20px" }}
                          />
                        )}
                      </td>
                      <td>
                        {row.status === 1 ? (
                          <ImCheckmark
                            style={{ color: "green", fontSize: "20px" }}
                          />
                        ) : (
                          <ImCross style={{ color: "red", fontSize: "20px" }} />
                        )}
                      </td>
                      <td>
                        <center>
                          <BsPencilSquare
                            onClick={() => handleEditClick(row)}
                            className="icon1"
                          />
                        </center>
                      </td>
                      <td>
                        <center>
                          <MdDelete
                            onClick={() => handleDelete(row.user_ID)}
                            className="icon"
                          />
                        </center>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <Footer />
            </table>
          </div>
          <div className="pagination">
            {filteredData.length > itemsPerPage && (
              <>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="pagination"
                  style={{ width: "60px" }}
                >
                  <GrLinkNext size={20} />
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  style={{ width: "60px" }}
                >
                  <GrLinkPrevious size={20} />
                </button>
              </>
            )}
          </div>
        </div>{" "}
        <Modal
          isOpen={modalsIsOpen}
          onRequestClose={closeModals}
          style={customStyles}
          className="modal-set"
        >
          <form onSubmit={handleFormSubmit}>
            <center>
              <h1>Edit User</h1>
            </center>
            <hr />
            <br />
            <label className="fonts">
              UserName:
              <br />
              <input
                type="text"
                name="user_Name"
                className="mar"
                value={formData.user_Name}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label className="fonts">
              UserEmail:
              <br />
              <input
                type="text"
                name="user_Email"
                className="mar"
                value={formData.user_Email}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label className="fonts">
              UserPassword:
              <br />
              <input
                type="text"
                name="user_Password"
                className="mar"
                value={formData.user_Password || ""}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label className="fonts">
              Status:
              <br />
              <input
                type="text"
                name="status"
                className="mar"
                value={formData.status}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label className="fonts">Select Role:</label>
            <Select
              options={options}
              placeholder="Select Role"
              value={selectOptions}
              onChange={handleChoose}
              className="color"
            />
            <br />

            <button type="submit" className="button1 button">
              Save
            </button>
            <button type="button" className="button2" onClick={closeModals}>
              Cancel
            </button>
          </form>
        </Modal>
        {/* add modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customstyles}
          className="modall"
        >
          <center>
            <h1>Add Users</h1>
          </center>
          <hr />
          <br />
          <label htmlFor="" className="fonts">
            User Name :
          </label>
          <br />
          <input
            type="text"
            className="mar inputt"
            placeholder="Enter User Name here "
            name="user_Name"
            value={formDataa.user_Name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="" className="fonts">
            User Email :
          </label>
          <br />
          <input
            type="text"
            className="mar inputt"
            placeholder="Enter email here "
            name="user_Email"
            value={formDataa.user_Email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="" className="fonts">
            User Password :
          </label>
          <br />

          <input
            type="text"
            className="mar inputt"
            placeholder="Enter password here "
            name="user_Password"
            value={formDataa.user_Password}
            onChange={handleChange}
          />
          <center>
            <Button
              className="button1 buton1 "
              variant="primary"
              onClick={handleSubmit}
            >
              Add
            </Button>
            <Button
              variant="danger"
              onClick={() => setIsOpen(false)}
              className="button2 buttonn1 "
            >
              Close
            </Button>
          </center>
        </Modal>
      </div>
    </>
  );
}
