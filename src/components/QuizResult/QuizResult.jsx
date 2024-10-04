// import React, { useEffect, useState } from "react";
// import "../AddDepartment/Table.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaSignOutAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { MdPreview } from "react-icons/md";
// import "../QuizResult/QuizResult.css";
// import apiService from "../../../api";
// import Footer from "../footer/footer";
// import { ImCross } from "react-icons/im";
// import Datetime from "../datetime";
// import { FaCheck } from "react-icons/fa";
// import { FaCalendarAlt } from "react-icons/fa";
// import { FaClock } from "react-icons/fa6";
// export default function QuizResult() {
//   const user_ID = localStorage.getItem("ID");
//   const [myData, setmyData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [quizData, setQuizData] = useState([]);

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [showResultTable, setShowResultTable] = useState(false);
//   const Data = async () => {
//     setLoading(true);
//     const data = await apiService.get(
//       `QuizTransaction/GetQuizDates/${user_ID}`
//     );
//     if (Array.isArray(data)) {
//       setmyData(data);
//     } else {
//       setmyData([]);
//     }
//     setLoading(false);
//     console.log(data);
//   };

//   useEffect(() => {
//     Data();
//   }, []);

//   const fetchData = async (answer_Date) => {
//     console.log("answer_Date", answer_Date);
//     setLoading(true);
//     const data = await apiService.get(
//       `Quiz_AnsTransaction/Result?Quiz_Date=${answer_Date}&User_ID=${user_ID}`
//     );
//     if (Array.isArray(data)) {
//       setmyData(data);
//     } else {
//       setmyData([]);
//     }
//     setLoading(false);
//     // console.log(" quiz_Date", answer_Date);
//     setQuizData(data.resultList);
//     setFormData(data.scoreResult);
//     console.log("cvbn", data);
//     console.log("score", data.scoreResult);
//   };
//   const handleEditClick = (row) => {
//     setShowResultTable(true);
//     fetchData(row.answer_Date);
//   };
//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear());
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");

//     return (
//       <div>
//         {" "}
//         <FaCalendarAlt style={{ marginRight: "5px", marginLeft: "0px" }} />
//         {`${day}/${month}/${year} `}
//         <FaClock style={{ marginRight: "5px" }} />
//         {`${hours}:${minutes}`}
//       </div>
//     );
//   };
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear());

//     return (
//       <div>
//         {" "}
//         <FaCalendarAlt style={{ marginRight: "5px", marginLeft: "0px" }} />
//         {`${day}/${month}/${year} `}
//       </div>
//     );
//   };

//   const filterDataByDate = () => {
//     const filteredData = myData.filter((item) => {
//       const quizDate = new Date(item.quiz_Date);
//       if (startDate && endDate) {
//         return quizDate >= new Date(startDate) && quizDate <= new Date(endDate);
//       }
//       if (startDate && !endDate) {
//         return quizDate.toDateString() === new Date(startDate).toDateString();
//       }
//       return true;
//     });
//     filteredData.startDate = startDate;
//     filteredData.endDate = endDate;

//     return filteredData;
//   };

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
//             <Datetime></Datetime>

//             <span>
//               <h2>Answers</h2>
//             </span>
//           </div>

//           <br />
//           <div className="block">
//             <label className="search">Start Date:</label>
//             <input
//               type="date"
//               id="startDate"
//               value={startDate}
//               className="search-input searchh"
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//             <br />
//             <label className="search">End Date :</label>
//             <input
//               type="date"
//               id="endDate"
//               className="search-input searchh"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>
//           <br />

//           {loading && <div className="loading-circle"></div>}
//           {filterDataByDate().length > 0 ? (
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Quiz Date</th>
//                   <th>View Result</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterDataByDate().map((row, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{formatDate(row.answer_Date)}</td>
//                     <td>
//                       <center>
//                         <MdPreview
//                           style={{ fontSize: 35, color: "blue" }}
//                           onClick={() => handleEditClick(row)}
//                         />
//                       </center>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//         {showResultTable && (
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Date</th>
//                 <th>Ques Desc</th>
//                 <th>User Answer</th>
//                 <th>Correct Answer</th>
//                 <th>Result</th>
//               </tr>
//             </thead>
//             <tbody>
//               {quizData.map((row, index) => (
//                 <tr key={row.user_ID}>
//                   <td>{index + 1}</td>
//                   <td>{formatDateTime(row.quiz_Date)}</td>
//                   <td>{row.ques_Desc}</td>
//                   <td>
//                     <span
//                       style={{
//                         color: row.result === "Correct" ? "green" : "red",
//                       }}
//                     >
//                       {row.answer}
//                     </span>
//                   </td>
//                   <td>{row.correct_Answer}</td>
//                   {row.result === "Correct" ? (
//                     <FaCheck style={{ color: "green" }} className="correct" />
//                   ) : (
//                     <ImCross style={{ color: "red" }} className="correct" />
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         <Footer />
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import "../AddDepartment/Table.css";
import { FaSadCry } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSignOutAlt, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPreview } from "react-icons/md";
import "../QuizResult/QuizResult.css";
import { IoMdArrowRoundBack } from "react-icons/io";

import apiService from "../../../api";
import Footer from "../footer/footer";
import { ImCross } from "react-icons/im";
import Datetime from "../datetime";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

export default function QuizResult() {
  const user_ID = localStorage.getItem("ID");
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [showResultTable, setShowResultTable] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchQuizDates = async () => {
    setLoading(true);
    const data = await apiService.get(
      `QuizTransaction/GetQuizDates?User_ID=${user_ID}`
    );
    setMyData(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizDates();
  }, []);

  const fetchQuizResults = async (answer_Date) => {
    setLoading(true);
    const data = await apiService.get(
      `Quiz_AnsTransaction/Result?Quiz_Date=${answer_Date}&User_ID=${user_ID}`
    );
    setQuizData(data.resultList);
    setLoading(false);
    setShowResultTable(true);
  };

  const handleEditClick = (row) => {
    fetchQuizResults(row.answer_Date);
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

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    let hours = date.getHours(); // Change to let
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12";

    return (
      <div>
        <FaCalendarAlt style={{ marginRight: "5px", marginLeft: "0px" }} />
        {`${day}/${month}/${year} `}
        <FaClock style={{ marginRight: "5px" }} />
        {`${hours}:${minutes} ${ampm}`}
      </div>
    );
  };

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
              <h2>Answers</h2>
            </span>
          </div>

          <br />
          <div className="block">
            <label className="search">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              className="search-input searchh"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <br />
            <label className="search">End Date:</label>
            <input
              type="date"
              id="endDate"
              className="search-input searchh"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <br />

          {loading && <div className="loading-circle"></div>}

          {!showResultTable && (
            <div className="table-container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Quiz Date</th>
                    <th>View Result</th>
                  </tr>
                </thead>
                <tbody>
                  {filterDataByDate().length > 0 ? (
                    filterDataByDate().map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(row.answer_Date)}</td>
                        <td>
                          <center>
                            <MdPreview
                              style={{ fontSize: 35, color: "blue" }}
                              onClick={() => handleEditClick(row)}
                            />
                          </center>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        <h4>
                          {" "}
                          <FaSadCry style={{ marginRight: "10px" }} />
                          No Data Found
                        </h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {showResultTable && (
            <>
              <button
                style={{ float: "right", width: "50px", marginTop: "-50px" }}
                onClick={() => setShowResultTable(false)}
                className="back-button"
              >
                <IoMdArrowRoundBack size={24} />
              </button>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Date</th>
                    <th>Ques Desc</th>
                    <th>User Answer</th>
                    <th>Correct Answer</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.length > 0 ? (
                    quizData.map((row, index) => (
                      <tr key={row.user_ID}>
                        <td>{index + 1}</td>
                        <td>{formatDateTime(row.quiz_Date)}</td>
                        <td>{row.ques_Desc}</td>
                        <td>
                          <p
                            style={{
                              color: row.result === "Correct" ? "green" : "red",
                            }}
                          >
                            {row.answer}
                          </p>
                        </td>
                        <td>{row.correct_Answer}</td>
                        <td>
                          {row.result === "Correct" ? (
                            <FaCheck
                              style={{ color: "green" }}
                              className="correct"
                            />
                          ) : (
                            <ImCross
                              style={{ color: "red" }}
                              className="correct"
                            />
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        <h4>
                          {" "}
                          <FaSadCry style={{ marginRight: "10px" }} />
                          No Data Found
                        </h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
