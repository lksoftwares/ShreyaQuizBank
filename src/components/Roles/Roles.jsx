// import React, { useEffect, useState } from "react";
// import { GrLinkPrevious } from "react-icons/gr";
// import { GrLinkNext } from "react-icons/gr";
// import "../AddDepartment/Table.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BsPencilSquare } from "react-icons/bs";
// import { MdDelete } from "react-icons/md";
// import Modal from "react-modal";
// import Button from "react-bootstrap/Button";
// import Datetime from "../datetime";
// import { FaSignOutAlt } from "react-icons/fa";

// import { IoMdAddCircle } from "react-icons/io";

// import apiService from "../../../api";
// import { Link } from "react-router-dom";
// import Footer from "../footer/footer";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     width: 470,
//     height: 300,
//     backgroundColor: "#384256",
//     color: "white",
//     borderColor: "Black",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

// export default function Roles() {
//   const token = localStorage.getItem("token");
//   const url = import.meta.env.VITE_BASE_URL;

//   const [myData, setmyData] = useState([]);
//   const [inputValues, setInputValues] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [modalsIsOpen, setModalsIsOpen] = useState(false);
//   const [formData, setFormData] = useState({ role_ID: "", roleName: "" });
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleClose = () => setModalIsOpen(false);
//   const handleShow = () => setModalIsOpen(true);

//   const handleModalsClose = () => setModalsIsOpen(false);
//   const handleModalsOpen = () => setModalsIsOpen(true);

//   const handleData = (e) => {
//     setInputValues(e.target.value);
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };
//   // Fetch all topics
//   const Data = async () => {
//     setLoading(true);
//     const data = await apiService.get("Roles/getallrole");
//     const filteredData = data.filter((role) =>
//       role.roleName.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setmyData(filteredData);
//     setLoading(false);
//   };
//   useEffect(() => {
//     Data();
//   }, [searchQuery]);

//   //add roles
//   const handleSubmit = async () => {
//     const response = await apiService.post("Roles/AddRole", {
//       roleName: inputValues,
//     });
//     toast.success(response);
//     setInputValues("");

//     handleClose();

//     Data();
//   };

//   //delete roles
//   const handleDelete = async (role_ID) => {
//     window.alert("Are you sure you want to delete?");
//     const response = await apiService.delete(`Roles/deleteRole/${role_ID}`);
//     toast.success(response);
//     Data();
//   };

//   const handleEditClick = (row) => {
//     setSelectedRow(row);
//     setFormData(row);
//     handleModalsOpen();
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   //update data
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const response = await apiService.put(
//       `Roles/updateRole/${formData.role_ID}`,
//       {
//         roleName: formData.roleName,
//       }
//     );
//     toast.success(response);
//     handleModalsClose();
//     Data();
//   };
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const indexOfLastQuestion = currentPage * itemsPerPage;
//   const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
//   const currentQuestions = myData.slice(
//     indexOfFirstQuestion,
//     indexOfLastQuestion
//   );
//   const totalPages = Math.ceil(myData.length / itemsPerPage);
//   return (
//     <>
//       <div>
//         <ToastContainer />

//         <div className="card-body">
//           <div className="header-container">
//             <div>
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
//             <span>
//               <Datetime></Datetime>

//               <h2>Roles</h2>
//             </span>

//             <div className=" header-top">
//               <label className="search">Search Roles: </label>
//               <input
//                 type="text"
//                 placeholder="Search by Role Name"
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 className="search-inputs"
//               />
//               <button onClick={handleShow} className="btun">
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

//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>S.No</th>

//                 <th>Role Name</th>
//                 <th>Edit</th>
//                 <th>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentQuestions.map((row, index) => (
//                 <tr key={row.role_ID}>
//                   <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>

//                   <td>{row.roleName}</td>
//                   <td>
//                     <center>
//                       <BsPencilSquare
//                         onClick={() => handleEditClick(row)}
//                         className="icon1"
//                       />
//                     </center>
//                   </td>
//                   <td>
//                     <center>
//                       <MdDelete
//                         onClick={() => handleDelete(row.role_ID)}
//                         className="icon"
//                       />
//                     </center>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <Footer></Footer>{" "}
//           </table></div>
//           <div className="pagination">
//             {myData.length > itemsPerPage && (
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
//         </div>

//         {/* Edit Modal */}
//         <Modal
//           isOpen={modalsIsOpen}
//           onRequestClose={handleModalsClose}
//           style={customStyles}
//           className="modall"
//           contentLabel="Edit Role"
//         >
//           <form onSubmit={handleFormSubmit}>
//             <center>
//               <h1>Edit Role</h1>
//             </center>
//             <hr />
//             <label className="fonts">
//               Role Name:
//               <br />
//               <input
//                 type="text"
//                 name="roleName"
//                 className="mar inputt"
//                 value={formData.roleName}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <button type="submit" className="button1 buton1">
//               Save
//             </button>
//             <button
//               type="button"
//               className="button2 buttonn1"
//               onClick={handleModalsClose}
//             >
//               Cancel
//             </button>
//           </form>
//         </Modal>

//         {/* Add Modal */}
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={handleClose}
//           style={customStyles}
//           contentLabel="Add Role"
//           className="modall"
//         >
//           <center>
//             <h1>Add Role</h1>
//           </center>
//           <hr />
//           <label htmlFor="" className="fonts">
//             Role Name:
//           </label>
//           <br />
//           <input
//             type="text"
//             className="mar inputt"
//             placeholder="Enter Role Name here"
//             value={inputValues}
//             onChange={handleData}
//           />
//           <center>
//             <Button
//               className="button1 buton1"
//               variant="primary"
//               onClick={handleSubmit}
//             >
//               Add
//             </Button>
//             <Button
//               variant="danger"
//               onClick={handleClose}
//               className="button2 buttonn1"
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
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import "../AddDepartment/Table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import Datetime from "../datetime";
import { FaSignOutAlt } from "react-icons/fa";
import { FaSadCry } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

import apiService from "../../../api";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: 470,
    height: 300,
    backgroundColor: "#384256",
    color: "white",
    borderColor: "Black",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Roles() {
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_BASE_URL;

  const [myData, setmyData] = useState([]);
  const [inputValues, setInputValues] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalsIsOpen, setModalsIsOpen] = useState(false);
  const [formData, setFormData] = useState({ role_ID: "", roleName: "" });
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setModalIsOpen(false);
  const handleShow = () => setModalIsOpen(true);

  const handleModalsClose = () => setModalsIsOpen(false);
  const handleModalsOpen = () => setModalsIsOpen(true);

  const handleData = (e) => {
    setInputValues(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  // Fetch all topics
  const Data = async () => {
    setLoading(true);
    const data = await apiService.get("Roles/getallrole");
    const filteredData = data.filter((role) =>
      role.roleName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setmyData(filteredData);
    setLoading(false);
  };
  useEffect(() => {
    Data();
  }, [searchQuery]);

  //add roles
  const [highlightedFields, setHighlightedFields] = useState({
    inputValues: false,
  });
  const handleSubmit = async () => {
    const response = await apiService.post("Roles/AddRole", {
      roleName: inputValues,
    });
    setHighlightedFields({
      inputValues: false,
    });
    if (!inputValues) {
      toast.error("All fields are required.");
      setHighlightedFields({
        inputValues: !inputValues,
      });
      return;
    }
    if (response.dup === true) {
      toast.warning(response.message);
    } else {
      toast.success(response.message);
      setInputValues("");

      handleClose();

      console.log("response.data", response);
    }
    // toast.success(response);
    // handleClose();

    Data();
  };

  const handleDelete = async (role_ID) => {
    const confirmed = window.confirm("Are you sure you want to delete?");

    if (confirmed) {
      const response = await apiService.delete(`Roles/deleteRole/${role_ID}`);
      toast.success(response);
      Data();
    } else {
      toast.warning("Deletion is cancelled.");
    }
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setFormData(row);
    handleModalsOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //update data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.put(
      `Roles/updateRole/${formData.role_ID}`,
      {
        roleName: formData.roleName,
      }
    );
    if (response.dup === true) {
      toast.warning(response.message);
    } else {
      toast.success(response.message);

      handleModalsClose();

      console.log("response.data", response);
    }
    // toast.success(response);
    // handleModalsClose();
    Data();
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastQuestion = currentPage * itemsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
  const currentQuestions = myData.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(myData.length / itemsPerPage);
  return (
    <>
      <div>
        <ToastContainer />
        <div className="card-body">
          <div className="header-container">
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
            <span>
              <Datetime />
              <h2>Roles</h2>
            </span>
            <div className="header-top">
              <label className="search">Search Roles: </label>
              <input
                type="text"
                placeholder="Search by Role Name"
                value={searchQuery}
                onChange={handleSearch}
                className="search-inputs"
              />
              <button onClick={handleShow} className="btun">
                <IoMdAddCircle style={{ fontSize: 22 }} />
              </button>
            </div>
          </div>
          <br /> <br /> <br /> <br />
          <br /> <br /> <br /> <br />
          {loading && <div className="loading-circle"></div>}
          <div className="table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Role Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentQuestions.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      <h4>
                        <FaSadCry style={{ marginRight: "10px" }} />
                        No Data Found
                      </h4>
                    </td>
                  </tr>
                ) : (
                  currentQuestions.map((row, index) => (
                    <tr key={row.role_ID}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{row.roleName}</td>
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
                            onClick={() => handleDelete(row.role_ID)}
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
            {myData.length > itemsPerPage && (
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
        </div>

        {/* Edit Modal */}
        <Modal
          isOpen={modalsIsOpen}
          onRequestClose={handleModalsClose}
          style={customStyles}
          className="modall"
          contentLabel="Edit Role"
        >
          <form onSubmit={handleFormSubmit}>
            <center>
              <h1>Edit Role</h1>
            </center>
            <hr />
            <label className="fonts">
              Role Name:
              <br />
              <input
                type="text"
                name="roleName"
                className="mar inputt"
                value={formData.roleName}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit" className="button1 buton1">
              Save
            </button>
            <button
              type="button"
              className="button2 buttonn1"
              onClick={handleModalsClose}
            >
              Cancel
            </button>
          </form>
        </Modal>

        {/* Add Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleClose}
          style={customStyles}
          contentLabel="Add Role"
          className="modall"
        >
          <center>
            <h1>Add Role</h1>
          </center>
          <hr />
          <label htmlFor="" className="fonts">
            Role Name:
          </label>
          <br />
          <input
            type="text"
            className={`mar inputt ${
              highlightedFields.inputValues ? "highlight" : ""
            }`}
            placeholder="Enter Role Name here"
            value={inputValues}
            onChange={handleData}
          />
          <center>
            <Button
              className="button1 buton1"
              variant="primary"
              onClick={handleSubmit}
            >
              Add
            </Button>
            <Button
              variant="danger"
              onClick={handleClose}
              className="button2 buttonn1"
            >
              Close
            </Button>
          </center>
        </Modal>
      </div>
    </>
  );
}
