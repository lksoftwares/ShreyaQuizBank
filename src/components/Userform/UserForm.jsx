// import React, { useEffect, useState } from "react";
// import { BiSolidShow } from "react-icons/bi";
// import "./UserForm.css";
// import { IoMdArrowRoundBack } from "react-icons/io";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import apiService from "../../../api";
// import { Link, useLocation } from "react-router-dom";
// import { FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
// import { FaClock } from "react-icons/fa6";
// import Footer from "../footer/footer";
// import Datetime from "../datetime";
// import QuizForm from "./QuizForm";
// import { useNavigate } from "react-router-dom";

// export default function QuizTransaction() {
//   const [myData, setMyData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const user_ID = localStorage.getItem("ID");
//   const [showQuizForm, setShowQuizForm] = useState(false);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const location = useLocation(); // Get the current location

//   const navigate = useNavigate();
//   // Fetch data from the API
//   const fetchData = async () => {
//     setLoading(true);
//     const data = await apiService.get(`QuizTransaction/willBeQuiz/${user_ID}`);
//     setMyData(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear());
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");

//     return (
//       <div>
//         <FaCalendarAlt style={{ marginRight: "5px" }} />
//         {`${day}/${month}/${year} `}
//         <FaClock style={{ marginRight: "5px" }} />
//         {`${hours}:${minutes}`}
//       </div>
//     );
//   };

//   const handleQuizClick = (quiz) => {
//     setSelectedQuiz(quiz);
//     setShowQuizForm(true);
//   };

//   const handleBackToTable = () => {
//     setShowQuizForm(false);
//     setSelectedQuiz(null);
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
//             <Datetime />
//             <span>
//               <h2>Knowledge Quiz</h2>
//             </span>
//           </div>
//           <br /> <br />
//           <br />
//           <br /> <br />
//           {loading && <div className="loading-circle"></div>}
//           <div className="menu">
//             {showQuizForm && (
//               <button onClick={handleBackToTable} style={{ width: "50px" }}>
//                 {" "}
//                 <IoMdArrowRoundBack size={24} />{" "}
//               </button>
//             )}
//           </div>
//           {showQuizForm ? (
//             <QuizForm quizData={selectedQuiz} onBack={handleBackToTable} />
//           ) : (
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>S.NO</th>
//                   <th>Quiz Date</th>
//                   <th>Quiz Name</th>

//                   <th>View</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {myData.map((row, index) => (
//                   <tr key={row.id}>
//                     <td>{index + 1}</td>
//                     <td>{formatDate(row.quiz_Date)}</td>
//                     <td>{row.quiz_Name}</td>

//                     <td>
//                       <center>
//                         <BiSolidShow
//                           className="icon1"
//                           onClick={() => {
//                             handleQuizClick(row);
//                           }}
//                           style={{
//                             fontSize: 40,
//                             marginTop: "15px",
//                             color: row.isAllowed ? "blue" : "CadetBlue",
//                             opacity: row.isAllowed ? 1 : 0.5,
//                             pointerEvents: row.isAllowed ? "auto" : "none",
//                           }}
//                         />
//                       </center>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               <Footer />
//             </table>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { BiSolidShow } from "react-icons/bi";
// import "./UserForm.css";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import apiService from "../../../api";
// import { Link, useLocation } from "react-router-dom";
// import { FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
// import { FaClock } from "react-icons/fa6";
// import Footer from "../footer/footer";
// import Datetime from "../datetime";
// import QuizForm from "./QuizForm";
// import { useNavigate } from "react-router-dom";

// export default function QuizTransaction() {
//   const [myData, setMyData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const user_ID = localStorage.getItem("ID");
//   const [showQuizForm, setShowQuizForm] = useState(false);
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const location = useLocation(); // Get the current location

//   const navigate = useNavigate();
//   // Fetch data from the API
//   const fetchData = async () => {
//     setLoading(true);
//     const data = await apiService.get(`QuizTransaction/willBeQuiz/${user_ID}`);
//     setMyData(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear());
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");

//     return (
//       <div>
//         <FaCalendarAlt style={{ marginRight: "5px" }} />
//         {`${day}/${month}/${year} `}
//         <FaClock style={{ marginRight: "5px" }} />
//         {`${hours}:${minutes}`}
//       </div>
//     );
//   };

//   const handleQuizClick = (quiz) => {
//     setSelectedQuiz(quiz);
//     setShowQuizForm(true);
//   };

//   const handleBackToTable = () => {
//     setShowQuizForm(false);
//     setSelectedQuiz(null);
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
//             <Datetime />
//             <span>
//               <h2>Knowledge Quiz</h2>
//             </span>
//           </div>
//           <br /> <br />
//           <br />
//           <br /> <br />
//           {loading && <div className="loading-circle"></div>}
//           <div className="menu">
//             {showQuizForm && (
//               <button onClick={handleBackToTable} style={{ width: "50px" }}>
//                 <IoMdArrowRoundBack size={24} />
//               </button>
//             )}
//           </div>
//           {/* Conditional rendering for no data */}
//           {myData.length === 0 ? (
//             <div className="empty-card">
//               <h3 style={{ fontSize: 50 }}>No Quiz Available</h3>
//             </div>
//           ) : showQuizForm ? (
//             <QuizForm quizData={selectedQuiz} onBack={handleBackToTable} />
//           ) : (
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>S.NO</th>
//                   <th>Quiz Date</th>
//                   <th>Quiz Name</th>
//                   <th>View</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {myData.map((row, index) => (
//                   <tr key={row.id}>
//                     <td>{index + 1}</td>
//                     <td>{formatDate(row.quiz_Date)}</td>
//                     <td>{row.quiz_Name}</td>
//                     <td>
//                       <center>
//                         <BiSolidShow
//                           className="icon1"
//                           onClick={() => handleQuizClick(row)}
//                           style={{
//                             fontSize: 40,
//                             marginTop: "15px",
//                             color: row.isAllowed ? "blue" : "CadetBlue",
//                             opacity: row.isAllowed ? 1 : 0.5,
//                             pointerEvents: row.isAllowed ? "auto" : "none",
//                           }}
//                         />
//                       </center>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               <Footer />
//             </table>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import { BiSolidShow } from "react-icons/bi";
import "./UserForm.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../../../api";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import Footer from "../footer/footer";
import Datetime from "../datetime";
import QuizForm from "./QuizForm";
import { useNavigate } from "react-router-dom";

export default function QuizTransaction() {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user_ID = localStorage.getItem("ID");
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const location = useLocation();

  const navigate = useNavigate();
  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    const data = await apiService.get(`QuizTransaction/willBeQuiz/${user_ID}`);
    setMyData(data);
    console.log("datadatadata", data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    let hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12";

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  };
  const formatDates = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    let hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12";

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  };
  const handleQuizClick = (quiz) => {
    setSelectedQuiz({
      ...quiz,
      formattedDate: formatDates(quiz.quiz_Date),
      formattedName: quiz.quiz_Name,
    });
    console.log("formattedName", quiz.quiz_Name);
    setShowQuizForm(true);
  };

  const handleBackToTable = () => {
    setShowQuizForm(false);
    setSelectedQuiz(null);
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
              <h2>Knowledge Quiz</h2>
            </span>
          </div>
          <br /> <br />
          <br />
          <br /> <br />
          {loading && <div className="loading-circle"></div>}
          <div className="menu">
            {showQuizForm && (
              <button onClick={handleBackToTable} style={{ width: "50px" }}>
                <IoMdArrowRoundBack size={24} />
              </button>
            )}
          </div>
          {myData.length === 0 ? (
            <div className="empty-card">
              <h3 style={{ fontSize: 45 }}>No Quiz Available</h3>
              <img
                src="../assets/images/nodata.png"
                alt="dfghj"
                style={{
                  height: "500px",
                  width: "550px",
                  marginLeft: "350px",
                  marginTop: "20px",
                }}
              />
            </div>
          ) : showQuizForm ? (
            <QuizForm quizData={selectedQuiz} onBack={handleBackToTable} />
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Quiz Date</th>
                  <th>Allowed Time</th>
                  <th>Quiz Name</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {myData.map((row, index) => (
                  <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>{formatDate(row.quiz_Date)}</td>
                    <td>{row.allowed_Time}</td>
                    <td>{row.quiz_Name}</td>
                    <td>
                      <center>
                        <BiSolidShow
                          className="icon1"
                          onClick={() => handleQuizClick(row)}
                          style={{
                            fontSize: 40,
                            marginTop: "15px",
                            color: row.isAllowed ? "blue" : "CadetBlue",
                            opacity: row.isAllowed ? 1 : 0.5,
                            pointerEvents: row.isAllowed ? "auto" : "none",
                          }}
                        />
                      </center>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
