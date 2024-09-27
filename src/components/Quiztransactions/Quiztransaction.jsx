// import React, { useEffect, useState } from "react";
// import { BsPencilSquare } from "react-icons/bs";
// import "../Users/user.css";
// import { ToastContainer, toast } from "react-toastify";
// import { MdDelete } from "react-icons/md";
// import "react-toastify/dist/ReactToastify.css";
// import apiService from "../../../api";
// import { Link } from "react-router-dom";
// import Modal from "react-modal";
// import { FaSignOutAlt } from "react-icons/fa";
// import { FaCalendarAlt } from "react-icons/fa";
// import { FaClock } from "react-icons/fa6";
// import Footer from "../footer/footer";
// import Datetime from "../datetime";
// export default function Quiztransaction() {
//   const customStyles = {
//     content: {
//       right: "auto",
//       width: 470,
//       height: 300,
//       backgroundColor: "#384256",
//       color: "white",
//       borderColor: "Black",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-50%, -50%)",
//     },
//   };
//   const [myData, setMyData] = useState([]);
//   const [modalsIsOpen, setIsOpens] = React.useState(false);

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     User_ID: "",
//     Quiz_Date: "",
//   });
//   // Fetch data from the API
//   const Data = async () => {
//     setLoading(true);
//     const data = await apiService.get("QuizTransaction/GetAllQuizQuestion");
//     setMyData(data);
//     setLoading(false);
//   };
//   useEffect(() => {
//     Data();
//   }, []);
//   // Handle deletion of a quiz transaction
//   const handleDelete = async (quiz_ID) => {
//     window.alert("Are you sure you want to delete?");
//     const response = await apiService.delete(
//       `QuizTransaction/deleteQuizTransaction/${quiz_ID}`
//     );

//     toast.success(response);
//     Data();
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const response = await apiService.put(
//       `QuizTransaction/updateQuizTransaction/${formData.User_ID}`,
//       {
//         Quiz_Date: formData.Quiz_Date,
//       }
//     );
//     toast.success(response);
//     setIsOpens(false);
//     fetchData();
//   };
//   const handleEditClick = (row) => {
//     const formattedDate = row.quiz_Date
//       ? new Date(row.quiz_Date).toISOString().split("T")[0]
//       : "";

//     setFormData({
//       User_ID: row.User_ID,
//       Quiz_Date: formattedDate,
//     });
//     setIsOpens(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear());
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");

//     const ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12;
//     hours = hours ? String(hours).padStart(2, "0") : "12";

//     return (
//       <div>
//         {" "}
//         <FaCalendarAlt style={{ marginRight: "5px", marginLeft: "0px" }} />
//         {`${day}/${month}/${year} `}
//         <FaClock style={{ marginRight: "5px" }} />
//         {`${hours}:${minutes}:${seconds} ${ampm}`}
//       </div>
//     );
//   };

//   return (
//     <>
//       <div>
//         <ToastContainer />
//         <div className="card-body">
//           <div className="header-container">
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
//               </Link>{" "}
//             </div>
//             <Datetime></Datetime>

//             <span>
//               <h2>Question Transaction</h2>
//             </span>
//           </div>
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           {loading && <div className="loading-circle"></div>}

//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>S.NO</th>
//                 <th>Quiz Date</th>
//                 <th>Quiz Description</th>
//                 {/* <th>User Email</th> */}
//                 <th>Edit</th>
//                 <th>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {myData.map((row, index) => (
//                 <tr key={row.quiz_ID}>
//                   <td>{index + 1}</td>
//                   <td>{formatDate(row.quiz_Date)}</td>

//                   <td>{row.ques_Desc}</td>
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
//                         onClick={() => handleDelete(row.quiz_ID)}
//                         className="icon"
//                       />
//                     </center>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <Footer />
//           </table>
//         </div>
//         <Modal
//           isOpen={modalsIsOpen}
//           onRequestClose={() => setIsOpens(false)}
//           style={customStyles}
//           className="modall"
//         >
//           <form onSubmit={handleFormSubmit}>
//             <center>
//               <h1>Edit Date</h1>
//             </center>
//             <hr />
//             <br />
//             <label className="fonts">
//               Select Date:
//               <br />
//               <br />
//               <input
//                 type="date"
//                 name="Quiz_Date"
//                 className="mar inputt"
//                 value={formData.Quiz_Date}
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
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import "../Users/user.css";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../../../api";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import Footer from "../footer/footer";
import Datetime from "../datetime";

export default function Quiztransaction() {
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

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [myData, setMyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalsIsOpen, setIsOpens] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    quiz_ID: "",
    User_ID: "",
    Quiz_Date: "",
  });

  // Fetch data from the API
  const Data = async () => {
    setLoading(true);
    const data = await apiService.get("QuizTransaction/GetAllQuizQuestion");
    // console.log("dataaaa", data);
    setMyData(data);
    setFilteredData(data);
    setLoading(false);
  };

  useEffect(() => {
    Data();
  }, []);

  // Handle deletion of a quiz transaction
  const handleDelete = async (quiz_ID) => {
    window.alert("Are you sure you want to delete?");
    const response = await apiService.delete(
      `QuizTransaction/deleteQuizTransaction/${quiz_ID}`
    );

    toast.success(response);
    Data();
  };
  console.log("formData", formData.quiz_ID);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.put(
      `QuizTransaction/updateQuizTransaction/${formData.quiz_ID}`,
      {
        Quiz_Date: formData.Quiz_Date,
      }
    );
    toast.success(response);
    setIsOpens(false);
    Data();
  };

  const handleEditClick = (row) => {
    const formattedDate = row.quiz_Date
      ? new Date(row.quiz_Date).toISOString().slice(0, 19)
      : "";
    console.log("row.User_IDrow.User_ID", row.quiz_ID);
    setFormData({
      quiz_ID: row.quiz_ID,
      Quiz_Date: formattedDate,
    });
    setIsOpens(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12";

    return (
      <div>
        <FaCalendarAlt style={{ marginRight: "5px", marginLeft: "0px" }} />
        {`${day}/${month}/${year} `}
        <FaClock style={{ marginRight: "5px" }} />
        {`${hours}:${minutes}:${seconds} ${ampm}`}
      </div>
    );
  };
  const filterDataByDate = () => {
    const filtered = myData.filter((row) => {
      const quizDate = new Date(row.quiz_Date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return quizDate >= start && quizDate <= end;
      }
      if (start) {
        return quizDate >= start;
      }
      if (end) {
        return quizDate <= end;
      }
      return true;
    });

    return filtered;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastQuestion = currentPage * itemsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
  const currentQuestions = filterDataByDate().slice(
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
            <Datetime />
            <span>
              <h2>Question Transaction</h2>
            </span>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="block">
            <label htmlFor="startDate" className="search">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              className="search-input"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <br />
            <label htmlFor="endDate" className="search">
              End Date :
            </label>
            <input
              type="date"
              id="endDate"
              className="search-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <br />
          {loading && <div className="loading-circle"></div>}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Quiz Date</th>
                <th>Quiz Description</th>
                <th>Quiz Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentQuestions.map((row, index) => (
                <tr key={row.quiz_ID}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{formatDate(row.quiz_Date)}</td>
                  <td>{row.ques_Desc}</td>
                  <td>{row.quiz_Name}</td>

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
                        onClick={() => handleDelete(row.quiz_ID)}
                        className="icon"
                      />
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>

            <Footer />
          </table>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination"
            >
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <Modal
          isOpen={modalsIsOpen}
          onRequestClose={() => setIsOpens(false)}
          style={customStyles}
          className="modall"
        >
          <form onSubmit={handleFormSubmit}>
            <center>
              <h1>Edit Date & Time</h1>
            </center>
            <hr />
            <br />
            <label className="fonts">
              Select Date & Time:
              <br />
              <br />
              <input
                type="datetime-local"
                name="Quiz_Date"
                className="mar inputt"
                value={formData.Quiz_Date}
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
      </div>
    </>
  );
}
