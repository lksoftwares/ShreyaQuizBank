// import React, { useEffect, useState } from "react";
// import "../AddDepartment/Table.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BsPencilSquare } from "react-icons/bs";
// import { MdDelete } from "react-icons/md";
// import Modal from "react-modal";
// import { FaSignOutAlt } from "react-icons/fa";
// import { GrLinkPrevious } from "react-icons/gr";
// import { GrLinkNext } from "react-icons/gr";
// import Button from "react-bootstrap/Button";
// import apiService from "../../../api";
// import { Link } from "react-router-dom";
// import Footer from "../footer/footer";
// import { IoMdAddCircle } from "react-icons/io";

// import Datetime from "../datetime";

// const customStyles = {
//   content: {
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

// export default function GetTopic() {
//   const [inputValues, setInputValues] = useState("");
//   const [modalIsOpen, setIsOpen] = React.useState(false);
//   const [modalsIsOpen, setIsOpens] = React.useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     topic_ID: "",
//     topic_Name: "",
//   });
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [topics, setTopics] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(""); // State for the search term
//   const Role_ID = localStorage.getItem("Roleid");

//   // Handle input change for search
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleEditClick = (row) => {
//     setSelectedRow(row);
//     setFormData(row);
//     setIsOpens(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Update topics
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const response = await apiService.put(
//       `Topic/updateTopics/${formData.topic_ID}`,
//       {
//         topic_Name: formData.topic_Name,
//       }
//     );
//     toast.success(response);
//     setIsOpens(false);
//     fetchData();
//   };

//   // Add topics
//   const handleSubmit = async () => {
//     const response = await apiService.post("Topic/AddTopic", {
//       Topic_Name: inputValues,
//     });
//     toast.success(response);
//     setIsOpen(false);
//     setInputValues("");
//     fetchData();
//   };

//   // Delete topics
//   const deleteResource = async (topic_ID) => {
//     window.alert("Are you sure you want to delete?");
//     const response = await apiService.delete(`Topic/deleteTopic/${topic_ID}`);
//     toast.success(response);
//     fetchData();
//   };

//   // Fetch all topics
//   const fetchData = async () => {
//     setLoading(true);
//     if (Role_ID == 5) {
//       const data = await apiService.get("Topic/AllTopic");
//       setTopics(data);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Filter topics based on the search term
//   const filteredTopics = topics.filter((topic) =>
//     topic.topic_Name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const indexOfLastQuestion = currentPage * itemsPerPage;
//   const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
//   const currentQuestions = filteredTopics.slice(
//     indexOfFirstQuestion,
//     indexOfLastQuestion
//   );

//   const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);
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

//             <Datetime></Datetime>

//             <span>
//               <h2>Topics</h2>
//             </span>
//             <div className="header-top">
//               <label className="search">Search Topics: </label>
//               <input
//                 type="text"
//                 placeholder="Search Topics"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
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
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Topic Name</th>
//                   <th>Edit</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentQuestions.map((row, index) => (
//                   <tr key={row.topic_ID}>
//                     <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>

//                     <td>{row.topic_Name}</td>
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
//                           onClick={() => deleteResource(row.topic_ID)}
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
//             {filteredTopics.length > itemsPerPage && (
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
//           onRequestClose={() => setIsOpens(false)}
//           style={customStyles}
//           className="modall"
//         >
//           <form onSubmit={handleFormSubmit}>
//             <center>
//               <h1>Edit Topics</h1>
//             </center>
//             <hr />
//             <br />
//             <label className="fonts">
//               Topic Name:
//               <br />
//               <br />
//               <input
//                 type="text"
//                 name="topic_Name"
//                 className="mar inputt"
//                 value={formData.topic_Name}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <button type="submit" className="button1 buton1 ">
//               Save
//             </button>
//             <button
//               type="button"
//               className="button2 buttonn1 "
//               onClick={() => setIsOpens(false)}
//             >
//               Cancel
//             </button>
//           </form>
//         </Modal>

//         {/* Add Modal */}
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={() => setIsOpen(false)}
//           style={customStyles}
//           className="modall"
//         >
//           <center>
//             <h1>Add Topics</h1>
//           </center>
//           <hr />
//           <br />
//           <label htmlFor="" className="fonts">
//             Topic Name :
//           </label>
//           <br />
//           <br />
//           <input
//             type="text"
//             className="mar inputt"
//             placeholder="Enter Topic Name here "
//             name="topic_Name"
//             value={inputValues}
//             onChange={(e) => setInputValues(e.target.value)}
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
import "../AddDepartment/Table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import { FaSignOutAlt } from "react-icons/fa";
import { GrLinkPrevious } from "react-icons/gr";
import { FaSadCry } from "react-icons/fa";

import { GrLinkNext } from "react-icons/gr";
import Button from "react-bootstrap/Button";
import apiService from "../../../api";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import { IoMdAddCircle } from "react-icons/io";

import Datetime from "../datetime";

const customStyles = {
  content: {
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

export default function GetTopic() {
  const [inputValues, setInputValues] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalsIsOpen, setIsOpens] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic_ID: "",
    topic_Name: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const Role_ID = localStorage.getItem("Roleid");

  // Handle input change for search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setFormData(row);
    setIsOpens(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Update topics
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.put(
      `Topic/updateTopics/${formData.topic_ID}`,
      {
        topic_Name: formData.topic_Name,
      }
    );
    toast.success(response);
    setIsOpens(false);
    fetchData();
  };

  // Add topics
  const handleSubmit = async () => {
    const response = await apiService.post("Topic/AddTopic", {
      Topic_Name: inputValues,
    });
    toast.success(response);
    setIsOpen(false);
    setInputValues("");
    fetchData();
  };

  // Delete topics
  const deleteResource = async (topic_ID) => {
    window.alert("Are you sure you want to delete?");
    const response = await apiService.delete(`Topic/deleteTopic/${topic_ID}`);
    toast.success(response);
    fetchData();
  };

  // Fetch all topics
  const fetchData = async () => {
    setLoading(true);
    if (Role_ID == 5) {
      const data = await apiService.get("Topic/AllTopic");
      setTopics(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter topics based on the search term
  const filteredTopics = topics.filter((topic) =>
    topic.topic_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastQuestion = currentPage * itemsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
  const currentQuestions = filteredTopics.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);
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

            <Datetime />

            <span>
              <h2>Topics</h2>
            </span>
            <div className="header-top">
              <label className="search">Search Topics: </label>
              <input
                type="text"
                placeholder="Search Topics"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-inputs"
              />
              <button onClick={() => setIsOpen(true)} className="btun">
                <IoMdAddCircle style={{ fontSize: 22 }} />
              </button>
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          {loading && <div className="loading-circle"></div>}

          <div className="table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Topic Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentQuestions.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      <h4>
                        {" "}
                        <FaSadCry style={{ marginRight: "10px" }} />
                        No Data Found
                      </h4>
                    </td>
                  </tr>
                ) : (
                  currentQuestions.map((row, index) => (
                    <tr key={row.topic_ID}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{row.topic_Name}</td>
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
                            onClick={() => deleteResource(row.topic_ID)}
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
            {filteredTopics.length > itemsPerPage && (
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
          onRequestClose={() => setIsOpens(false)}
          style={customStyles}
          className="modall"
        >
          <form onSubmit={handleFormSubmit}>
            <center>
              <h1>Edit Topics</h1>
            </center>
            <hr />
            <br />
            <label className="fonts">
              Topic Name:
              <br />
              <br />
              <input
                type="text"
                name="topic_Name"
                className="mar inputt"
                value={formData.topic_Name}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit" className="button1 buton1 ">
              Save
            </button>
            <button
              type="button"
              className="button2 buttonn1 "
              onClick={() => setIsOpens(false)}
            >
              Cancel
            </button>
          </form>
        </Modal>

        {/* Add Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          className="modall"
        >
          <center>
            <h1>Add Topics</h1>
          </center>
          <hr />
          <br />
          <label htmlFor="" className="fonts">
            Topic Name :
          </label>
          <br />
          <br />
          <input
            type="text"
            className="mar inputt"
            placeholder="Enter Topic Name here "
            name="topic_Name"
            value={inputValues}
            onChange={(e) => setInputValues(e.target.value)}
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
