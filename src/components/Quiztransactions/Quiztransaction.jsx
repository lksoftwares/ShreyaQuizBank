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

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [myData, setMyData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [modalsIsOpen, setIsOpens] = React.useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     quiz_ID: "",
//     User_ID: "",
//     Quiz_Date: "",
//   });

//   // Fetch data from the API
//   const Data = async () => {
//     setLoading(true);
//     const data = await apiService.get("QuizTransaction/GetAllQuizQuestion");
//     // console.log("dataaaa", data);
//     setMyData(data);
//     setFilteredData(data);
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
//   console.log("formData", formData.quiz_ID);

//   const formatDatee = (dateString) => {
//     const date = new Date(dateString);

//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const day = date.getDate().toString().padStart(2, "0");
//     const hours = date.getHours().toString().padStart(2, "0");
//     const minutes = date.getMinutes().toString().padStart(2, "0");
//     const seconds = date.getSeconds().toString().padStart(2, "0");

//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
//         <FaCalendarAlt style={{ marginRight: "5px", marginLeft: "0px" }} />
//         {`${day}/${month}/${year} `}
//         <FaClock style={{ marginRight: "5px" }} />
//         {`${hours}:${minutes}:${seconds} ${ampm}`}
//       </div>
//     );
//   };
//   const filterDataByDate = () => {
//     const filtered = myData.filter((row) => {
//       const quizDate = new Date(row.quiz_Date);
//       const start = startDate ? new Date(startDate) : null;
//       const end = endDate ? new Date(endDate) : null;

//       if (start && end) {
//         return quizDate >= start && quizDate <= end;
//       }
//       if (start) {
//         return quizDate >= start;
//       }
//       if (end) {
//         return quizDate <= end;
//       }
//       return true;
//     });

//     return filtered;
//   };

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const indexOfLastQuestion = currentPage * itemsPerPage;
//   const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
//   const currentQuestions = filterDataByDate().slice(
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
//                   className="logout-btn"
//                   onClick={() => {
//                     localStorage.clear();
//                     toast.info("Logged out successfully!");
//                   }}
//                 >
//                   <FaSignOutAlt style={{ marginTop: "6px" }} />
//                 </button>
//               </Link>
//             </div>
//             <Datetime />
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
//           <div className="block">
//             <label htmlFor="startDate" className="search">
//               Start Date:
//             </label>
//             <input
//               type="date"
//               id="startDate"
//               value={startDate}
//               className="search-input"
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//             <br />
//             <label htmlFor="endDate" className="search">
//               End Date :
//             </label>
//             <input
//               type="date"
//               id="endDate"
//               className="search-input"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>
//           <br />
//           {loading && <div className="loading-circle"></div>}
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>S.NO</th>
//                 <th>Quiz Date</th>
//                 <th>Quiz Description</th>
//                 <th>Quiz Name</th>
//                 <th>Edit</th>
//                 <th>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentQuestions.map((row, index) => (
//                 <tr key={row.quiz_ID}>
//                   <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
//                   <td>{formatDate(row.quiz_Date)}</td>
//                   <td>{row.ques_Desc}</td>
//                   <td>{row.quiz_Name}</td>

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
//           <div className="pagination">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="pagination"
//             >
//               Previous
//             </button>
//             <span>{`Page ${currentPage} of ${totalPages}`}</span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//         <Modal
//           isOpen={modalsIsOpen}
//           onRequestClose={() => setIsOpens(false)}
//           style={customStyles}
//           className="modall"
//         >
//           <form onSubmit={handleFormSubmit}>
//             <center>
//               <h1>Edit Date & Time</h1>
//             </center>
//             <hr />
//             <br />
//             <label className="fonts">
//               Select Date & Time:
//               <br />
//               <br />
//               <input
//                 type="datetime-local"
//                 name="Quiz_Date"
//                 id="quizDate"
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
import "../Users/user.css";
import axios from "axios";
import Modal from "react-modal";
import { FaCopy } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../../../api";
import { Link } from "react-router-dom";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { BiSolidShow } from "react-icons/bi";
import { FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Footer from "../footer/footer";
import Datetime from "../datetime";
import Select from "react-select";
import { FaSadCry } from "react-icons/fa";

import { IoMdArrowRoundBack } from "react-icons/io";
export default function Quiztransaction() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [myData, setMyData] = useState([]);
  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState([]);

  const [date, setDate] = useState("");
  const [quizNameFilter, setQuizNameFilter] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const url = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const [modalsIsOpen, setIsOpens] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [loading, setLoading] = useState(false);
  const [showResultTable, setShowResultTable] = useState(false);
  const [selectedQuizDate, setSelectedQuizDate] = useState(null);
  const [formData, setFormData] = useState({
    quiz_ID: "",
    User_ID: "",
    Quiz_Date: "",
    user_Name: "",
    quiz_Name: "",
  });
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
  const Data = async () => {
    setLoading(true);
    const data = await apiService.get("QuizTransaction/QuizTransactionDates");
    setMyData(data);
    setLoading(false);
  };

  useEffect(() => {
    Data();
  }, []);

  const fetchData = async (quiz_Date) => {
    setLoading(true);
    const data = await apiService.get(
      `QuizTransaction/WithInDayQuiz?quizDate=${quiz_Date}`
    );

    setData(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleEditClick = (row) => {
    setSelectedQuizDate(row.quiz_Date);
    fetchData(row.quiz_Date);

    setShowResultTable(true);
  };
  //third table
  const fetchedData = async (quiz_Date, quiz_Name) => {
    setLoading(true);
    console.log("quiz_Name", quiz_Name);
    const data = await apiService.get(
      `QuizTransaction/GetAllQuizQuestion?quizDate=${quiz_Date}&Quiz_Name=${quiz_Name}`
    );

    setDataa(Array.isArray(data) ? data : []);
    setLoading(false);
  };
  const [isEditing, setIsEditing] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const [viewingData, setViewingData] = useState(false); // New state to control view mode
  const handleEditClicked = (row) => {
    setSelectedQuizDate(row.quiz_Date);
    fetchedData(row.quiz_Date, row.quiz_Name);
    setCurrentRow(row);
    setViewingData(true); // Set view mode
    setIsEditing(false); // Reset edit state
    setShowResultTable(true);
  };
  // useEffect(() => {
  //   if (selectedQuizDate) {
  //     setShowResultTable(true);
  //   } else {
  //     setShowResultTable(false);
  //   }
  // }, [selectedQuizDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return (
      <div>
        <FaCalendarAlt style={{ marginRight: "5px", marginLeft: "0px" }} />
        {`${day}/${month}/${year} `}
      </div>
    );
  };

  const filterDataByDate = () => {
    const filteredData = myData.filter((item) => {
      const quizDate = new Date(item.quiz_Date);
      if (startDate && endDate) {
        return quizDate >= new Date(startDate) && quizDate <= new Date(endDate);
      }
      if (startDate && !endDate) {
        return quizDate.toDateString() === new Date(startDate).toDateString();
      }
      return true;
    });
    return filteredData;
  };

  const handleDelete = async (quiz_Date) => {
    console.log("quiz_Date", quiz_Date);
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await apiService.delete(
        `QuizTransaction/DeleteQuiz/${quiz_Date}`
      );
      toast.success(response);
      //fetchData(quiz_Date);
    }
  };
  const handleDeleted = async (quiz_Date) => {
    console.log("quiz_Date", quiz_Date);
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await apiService.delete(
        `QuizTransaction/deleteQuizTransaction/${quiz_Date}`
      );
      toast.success(response);
      //fetchData(quiz_Date);
    }
  };

  const handleFormSubmit = async (e, row) => {
    e.preventDefault();
    const response = await apiService.put(
      `QuizTransaction/updateQuizTransaction/${formData.quiz_ID}`,
      {
        Quiz_Date: formData.Quiz_Date,
      }
    );
    toast.success(response);
    setIsOpens(false);
    fetchedData(row.quiz_Date);
  };
  //edit third table
  const handleEditClicks = (row) => {
    const formattedDate = formatDatee(row.quiz_Date);

    console.log("row.User_IDrow.User_ID", formattedDate);
    setFormData({
      quiz_ID: row.quiz_ID,
      Quiz_Date: formattedDate,
    });
    setIsOpens(true);
  };

  const formatDatee = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    let hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    // const ampm = hours >= 12 ? "PM" : "AM";
    // hours = hours % 12;
    // hours = hours ? String(hours).padStart(2, "0") : "12";

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  //edit second table
  const [originalQuizDate, setOriginalQuizDate] = useState(null);
  const handleFormSubmited = async (e, Quiz_Date) => {
    e.preventDefault();
    const response = await apiService.put(
      `QuizTransaction/updateQuizDate/${originalQuizDate}/${formData.Quiz_Date}`,
      {
        Quiz_Date: formData.Quiz_Date,
      }
    );
    toast.success(response);
    setIsOpen(false);
    Data();
  };

  const handleEditsClick = (row) => {
    const formattedDate = formatedDate(row.quiz_Date);
    setOriginalQuizDate(row.quiz_Date);
    console.log("row.User_IDrow.User_ID", formattedDate);
    setFormData({
      quiz_ID: row.quiz_ID,

      Quiz_Date: formattedDate,
    });
    setIsOpen(true);
  };

  const formatedDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    let hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    // const ampm = hours >= 12 ? "PM" : "AM";
    // hours = hours % 12;
    // hours = hours ? String(hours).padStart(2, "0") : "12";

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  const handleInputtsChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const currentQuestions = filterDataByDate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastQuestion = currentPage * itemsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
  const currentQuestion = currentQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(myData.length / itemsPerPage);
  useEffect(() => {
    const now = new Date();

    const formattedDateTime = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    setDate(formattedDateTime);
  }, []);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };
  const fetchDataa = async () => {
    const data = await apiService.get("Users/AllUSers?Role_ID=3");
    const optionsData = data.usersLists.map((option) => ({
      value: option.user_ID,
      label: option.user_Name,
    }));
    setOptions(optionsData);
  };

  useEffect(() => {
    fetchDataa();
  }, []);
  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  const [inputValues, setInputValues] = useState("");

  const handleInputsChange = (event) => {
    setInputValues(event.target.value);
  };
  const resetInputs = () => {
    setInputValue("");
    setInputValues("");
    setSelectedOptions([]);
    setSelectedQues([]);
  };
  const saveQuestions = async () => {
    if (selectedQues.length === 0) {
      // toast.warning("No questions selected.");
      return;
    }
    const userIds = selectedOptions.map((option) => option.value);

    const QuestionData = userIds.flatMap((userId) =>
      selectedQues.map((ques_ID) => ({
        SelectedQuestions: selectedQues,
        Quiz_Date: date,
        User_ID: userId,
        Allowed_Time: inputValue,
        quiz_Name: inputValues,
      }))
    );

    await axios({
      method: "post",
      url: `${url}/QuizTransaction/CopyQuizTransaction`,
      data: QuestionData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      toast.success(response.data);
      Data();
      resetInputs();
    });
  };
  const [selectedQues, setSelectedQues] = useState([]);

  const handleCheckboxChange = (ques_ID) => {
    setSelectedQues((prevSelected) => {
      if (prevSelected.includes(ques_ID)) {
        return prevSelected.filter((id) => id !== ques_ID);
      }
      console.log("prevSelected", prevSelected);

      return [...prevSelected, ques_ID];
    });
  };
  const [currentPages, setCurrentPages] = useState(1);
  const itemsPerPages = 10;

  const totalPagess = Math.ceil(data.length / itemsPerPages);

  const indexOfLastItem = currentPages * itemsPerPages;
  const indexOfFirstItem = indexOfLastItem - itemsPerPages;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const handleback = () => {
    if (viewingData == false) {
      setViewingData(true);
      setShowResultTable(false); // Assuming this is specific to the last table
    } else if (viewingData == true) {
      setViewingData(false);
      setShowResultTable(true); // Assuming this is specific to the second table
    }
    // Add any other necessary logic to handle going back
  };

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

          {showResultTable ? (
            <>
              <div className="input-wrapper">
                <label className="users ">Select Date:</label>
                <input
                  type="datetime-local"
                  className="input-cont"
                  value={date}
                  onChange={handleDateChange}
                />
                <label className="users marginn">Time in Min:</label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="input-cont"
                  placeholder="Enter Time"
                />
              </div>
              <div className="input-wrapper">
                <label className="users ">Select User: </label>
                <Select
                  isMulti
                  value={selectedOptions}
                  className="input-cont dropdown-cont"
                  onChange={handleChange}
                  options={options}
                  placeholder="Select User"
                />
                <label className="users marginn">Quiz Name:</label>
                <input
                  type="text"
                  value={inputValues}
                  onChange={handleInputsChange}
                  className="input-cont"
                  placeholder="Enter Quiz Name"
                />
              </div>
              <br />
              <button
                onClick={handleback}
                className="back-btn"
                style={{
                  float: "right",
                  marginTop: "-50px",
                  width: "50px",
                }}
              >
                <IoMdArrowRoundBack size={24} />{" "}
              </button>
              {loading && <div className="loading-circle"></div>}

              {!viewingData && !isEditing && (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th></th>
                      <th>S.No</th>
                      <th>Quiz Date</th>
                      <th>Quiz Name</th>
                      <th>View</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: "center" }}>
                          <h4>
                            <FaSadCry style={{ marginRight: "10px" }} />
                            No Data Found
                          </h4>
                        </td>
                      </tr>
                    ) : (
                      currentItems.map((row, index) => (
                        <tr key={row.quiz_ID}>
                          <td>
                            <input
                              type="checkbox"
                              className="input-checkbox"
                              onChange={() => handleCheckboxChange(row.quiz_ID)}
                            />
                          </td>
                          <td>{index + 1 + indexOfFirstItem}</td>
                          <td>{formatedDate(row.quiz_Date)}</td>
                          <td>{row.quiz_Name}</td>
                          <td>
                            <center>
                              <BiSolidShow
                                style={{
                                  fontSize: 40,
                                  marginTop: "15px",
                                  color: "blue",
                                }}
                                onClick={() => handleEditClicked(row)} // Call view handler
                                className="icon1"
                              />
                            </center>
                          </td>
                          <td>
                            <center>
                              <BsPencilSquare
                                onClick={() => handleEditsClick(row)} // Call edit handler
                                className="icon1"
                              />
                            </center>
                          </td>
                          <td>
                            <center>
                              <MdDelete
                                onClick={() => handleDelete(row.quiz_Date)}
                                className="icon"
                              />
                            </center>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {viewingData && currentRow && (
                <div>
                  <button
                    onClick={() => setViewingData(false)}
                    className="btn btn-secondary"
                  >
                    Back
                  </button>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Quiz Date</th>
                        <th>Quiz Name</th>
                        <th>Ques Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataa.length === 0 ? (
                        <tr>
                          <td colSpan="4" style={{ textAlign: "center" }}>
                            <h4>
                              <FaSadCry style={{ marginRight: "10px" }} />
                              No Data Found
                            </h4>
                          </td>
                        </tr>
                      ) : (
                        dataa.map((row, index) => (
                          <tr key={row.quiz_ID}>
                            <td>{index + 1 + indexOfFirstItem}</td>
                            <td>{formatDatee(row.quiz_Date)}</td>
                            <td>{row.quiz_Name}</td>
                            <td>{row.ques_Desc}</td>
                            <td>
                              <center>
                                <MdDelete
                                  onClick={() => handleDeleted(row.quiz_Date)}
                                  className="icon"
                                />
                              </center>
                            </td>
                            <td>
                              <center>
                                <BsPencilSquare
                                  onClick={() => handleEditClicks(row)}
                                  className="icon1"
                                />
                              </center>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination Controls */}
              {data.length > itemsPerPage && (
                <div className="pagination">
                  <button
                    onClick={() =>
                      setCurrentPages((prev) => Math.min(prev + 1, totalPagess))
                    }
                    disabled={currentPages === totalPagess}
                    className="pagination"
                    style={{ width: "60px" }}
                  >
                    <GrLinkNext size={20} />{" "}
                  </button>
                  <span>{`Page ${currentPages} of ${totalPagess}`}</span>
                  <button
                    onClick={() =>
                      setCurrentPages((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPages === 1}
                    style={{ width: "60px" }}
                  >
                    <GrLinkPrevious size={20} />{" "}
                  </button>
                </div>
              )}
              <button
                style={{ width: "50px" }}
                onClick={saveQuestions}
                className="bg-blue-700 py-3 mt-3 text-md flex items-center justify-center"
              >
                <FaCopy size={20} />{" "}
              </button>
            </>
          ) : (
            <>
              <br /> <br />
              <br /> <br />
              <div className="input-wrapper">
                <label className="search" style={{ marginTop: "-85px" }}>
                  Start Date:
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  className="search-input searchh"
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <br />
                <label className="search" style={{ marginTop: "-85px" }}>
                  End Date :
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="search-input searchh"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="table-container">
                {loading && <div className="loading-circle"></div>}

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Quiz Date</th>
                      <th>Delete</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentQuestion.length === 0 ? (
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
                      currentQuestion.map((row, index) => (
                        <tr key={row.quiz_ID}>
                          <td>
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </td>
                          <td>{formatDate(row.quiz_Date)}</td>
                          <td>
                            <center>
                              <MdDelete
                                onClick={() => handleDelete(row.quiz_Date)}
                                className="icon"
                              />
                            </center>
                          </td>
                          <td>
                            <center>
                              <BiSolidShow
                                style={{
                                  fontSize: 40,
                                  marginTop: "15px",
                                  color: "blue",
                                }}
                                onClick={() => handleEditClick(row)}
                                className="icon1"
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
            </>
          )}
          <div className="pagination">
            {currentQuestions.length > itemsPerPage && (
              <>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="pagination"
                  style={{ width: "60px" }}
                >
                  <GrLinkNext size={20} />{" "}
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  style={{ width: "60px" }}
                >
                  <GrLinkPrevious size={20} />{" "}
                </button>
              </>
            )}
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
                id="quizDate"
                className="mar inputt"
                value={formData.Quiz_Date}
                onChange={handleInputtsChange}
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          className="modall"
        >
          <form onSubmit={handleFormSubmited}>
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
                id="quizDate"
                className="mar inputt"
                value={formData.Quiz_Date}
                onChange={handleInputtsChange}
              />
            </label>
            <button type="submit" className="button1 buton1 ">
              Save
            </button>
            <button
              type="button"
              className="button2 buttonn1 "
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    </>
  );
}
