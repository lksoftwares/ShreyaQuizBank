// import "./UserForm.css";
// import { useState, useEffect } from "react";
// import { FaSignOutAlt } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import apiService from "../../../api";
// import { Link } from "react-router-dom";
// import Footer from "../footer/footer";
// import Datetime from "../datetime";
// function UserForm() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [formData, setFormData] = useState([]);
//   const userId = localStorage.getItem("ID");

//   // userdetails
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

//   useEffect(() => {
//     if (userId) {
//       fetchQuestionsByUserId(userId);
//     }
//   }, [userId]);
//   //fetch questions
//   const fetchQuestionsByUserId = async (user_id) => {
//     setLoading(true);
//     const data = await apiService.get(
//       `QuizTransaction/GetAllQuizQuestion?User_ID=${user_id}`
//     );
//     setQuestions(data);
//     console.log("asdfg", data);

//     setFormData(
//       data.map((question) => ({
//         Ques_ID: question.ques_ID,
//         User_ID: userId,
//         Answer: "",
//       }))
//     );
//     setLoading(false);
//   };

//   const handleChange = (e) => {
//     const { value } = e.target;
//     setFormData((prevData) => {
//       const updatedData = [...prevData];
//       updatedData[currentQuestionIndex].Answer = value;
//       return updatedData;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await apiService.post(
//       "Quiz_AnsTransaction/SubmitAnswer",
//       formData
//     );
//     toast.success(response);
//   };

//   const handleNextQuestion = () => {
//     setCurrentQuestionIndex((prevIndex) =>
//       Math.min(prevIndex + 1, questions.length - 1)
//     );
//   };

//   const handlePrevQuestion = () => {
//     setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//   };

//   if (loading) {
//     return <div className="loading-circle"></div>;
//   }

//   if (error) {
//     return <div className="load">Error: {error}</div>;
//   }

//   const currentQuestion = questions[currentQuestionIndex];

//   const hasOptions =
//     currentQuestion?.opt_A ||
//     currentQuestion?.opt_B ||
//     currentQuestion?.opt_C ||
//     currentQuestion?.opt_D;

//   return (
//     <div className="App bg">
//       <ToastContainer />
//       <form onSubmit={handleSubmit}>
//         <Datetime></Datetime>
//         {userDetails && (
//           <h2 className="user"> Welcome {userDetails.user_Name}...</h2>
//         )}{" "}
//         <div className="header-container">
//           <div>
//             <Link to="/">
//               <button
//                 className=" logout-btn"
//                 onClick={() => {
//                   localStorage.clear();
//                   toast.info("Logged out successfully!");
//                 }}
//               >
//                 <FaSignOutAlt style={{ marginTop: "6px" }} />
//               </button>
//             </Link>
//           </div>
//         </div>
//         <center>
//           <fieldset className="fieldset">
//             <h1 className="h1">
//               Knowledge Test Quiz
//               <div className="quesno">
//                 {currentQuestionIndex + 1} / {questions.length}
//               </div>
//             </h1>

//             {questions.length === 0 ? (
//               <p>No questions available</p>
//             ) : (
//               <div>
//                 <h3></h3>
//                 <h3>Question Description: </h3>
//                 <input
//                   type="text"
//                   placeholder="Enter Question here"
//                   readOnly
//                   value={currentQuestion.ques_Desc}
//                   className="text-cont"
//                 />
//                 {hasOptions && (
//                   <>
//                     <h3>Answer Options:</h3>
//                     <div className="options-container">
//                       {/* Options A and B */}
//                       <div className="options-row">
//                         <div className="option-pair">
//                           {currentQuestion.opt_A && (
//                             <div className="option-box">
//                               <input
//                                 type="text"
//                                 className="short"
//                                 placeholder="A"
//                                 readOnly
//                               />
//                               <input
//                                 type="text"
//                                 className="option"
//                                 placeholder="Option A"
//                                 readOnly
//                                 value={currentQuestion.opt_A}
//                               />
//                             </div>
//                           )}

//                           {currentQuestion.opt_B && (
//                             <div className="option-box">
//                               <input
//                                 type="text"
//                                 className="short short-cont"
//                                 placeholder="B"
//                                 readOnly
//                               />
//                               <input
//                                 type="text"
//                                 className="option"
//                                 placeholder="Option B"
//                                 readOnly
//                                 value={currentQuestion.opt_B}
//                               />
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Options C and D */}
//                       <div className="options-row">
//                         <div className="option-pair">
//                           {currentQuestion.opt_C && (
//                             <div className="option-box">
//                               <input
//                                 type="text"
//                                 className="short"
//                                 placeholder="C"
//                                 readOnly
//                               />
//                               <input
//                                 type="text"
//                                 className="option"
//                                 placeholder="Option C"
//                                 readOnly
//                                 value={currentQuestion.opt_C}
//                               />
//                             </div>
//                           )}

//                           {currentQuestion.opt_D && (
//                             <div className="option-box">
//                               <input
//                                 type="text"
//                                 className="short short-cont"
//                                 placeholder="D"
//                                 readOnly
//                               />
//                               <input
//                                 type="text"
//                                 className="option"
//                                 placeholder="Option D"
//                                 readOnly
//                                 value={currentQuestion.opt_D}
//                               />
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}
//                 <h3>Your Answer: </h3>
//                 <input
//                   type="text"
//                   className="long"
//                   placeholder="Enter Your Answer"
//                   value={formData[currentQuestionIndex]?.Answer || ""}
//                   onChange={handleChange}
//                   maxLength={hasOptions ? 1 : undefined} // Limit to 1 character for MCQs
//                 />
//                 <br />
//                 <span>
//                   {currentQuestionIndex === questions.length - 1 ? (
//                     <button type="submit" className="submit">
//                       Submit All Answers
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       className="button-cont"
//                       onClick={handleNextQuestion}
//                       disabled={currentQuestionIndex === questions.length - 1}
//                     >
//                       Next
//                     </button>
//                   )}
//                   <button
//                     type="button"
//                     className="button-cont"
//                     onClick={handlePrevQuestion}
//                     disabled={currentQuestionIndex === 0}
//                   >
//                     Previous
//                   </button>
//                 </span>
//               </div>
//             )}
//           </fieldset>
//         </center>
//         <Footer></Footer>
//       </form>
//     </div>
//   );
// }

// export default UserForm;

// import React, { useEffect, useState } from "react";
// import { BiSolidShow } from "react-icons/bi";
// import "./UserForm.css";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import apiService from "../../../api";
// import { Link } from "react-router-dom";
// import { FaSignOutAlt } from "react-icons/fa";
// import { FaCalendarAlt } from "react-icons/fa";
// import { FaClock } from "react-icons/fa6";
// import Footer from "../footer/footer";
// import Datetime from "../datetime";
// import QuizForm from "./QuizForm";
// export default function Quiztransaction() {
//   const [myData, setMyData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const user_ID = localStorage.getItem("ID");
//   const [showQuizForm, setShowQuizForm] = useState(false);

//   // Fetch data from the API
//   const Data = async () => {
//     setLoading(true);
//     const data = await apiService.get(`QuizTransaction/willBeQuiz/${user_ID}`);
//     // console.log("dataaaa", data);
//     setMyData(data);
//     setLoading(false);
//     console.log(data);
//   };

//   useEffect(() => {
//     Data();
//   }, []);
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
//   const handleclick = () => {
//     setShowQuizForm(true);
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
//           <br />
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
//                 <th>View</th>
//               </tr>
//             </thead>
//             <tbody>
//               {myData.map((row, index) => (
//                 <tr>
//                   <td>{index + 1}</td>
//                   <td>{formatDate(row.quiz_Date)}</td>
//                   <center>
//                     <BiSolidShow
//                       className="icon1"
//                       onClick={handleclick}
//                       style={{
//                         fontSize: 40,
//                         marginTop: "15px",
//                         color: row.isAllowed ? "blue" : "CadetBlue",
//                         opacity: row.isAllowed ? 1 : 0.5,
//                         pointerEvents: row.isAllowed ? "auto" : "none",
//                       }}
//                     />
//                   </center>
//                 </tr>
//               ))}
//               {showQuizForm && <QuizForm />}
//             </tbody>

//             <Footer />
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import { BiSolidShow } from "react-icons/bi";
import "./UserForm.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../../../api";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import Footer from "../footer/footer";
import Datetime from "../datetime";
import QuizForm from "./QuizForm";

export default function QuizTransaction() {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user_ID = localStorage.getItem("ID");
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const location = useLocation(); // Get the current location

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    const data = await apiService.get(`QuizTransaction/willBeQuiz/${user_ID}`);
    setMyData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <FaCalendarAlt style={{ marginRight: "5px" }} />
        {`${day}/${month}/${year} `}
        <FaClock style={{ marginRight: "5px" }} />
        {`${hours}:${minutes}:${seconds} ${ampm}`}
      </div>
    );
  };

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
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
            {showQuizForm && <button onClick={handleBackToTable}>Back</button>}
          </div>
          {showQuizForm ? (
            <QuizForm quizData={selectedQuiz} onBack={handleBackToTable} />
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Quiz Date</th>
                  <th>Quiz Name</th>

                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {myData.map((row, index) => (
                  <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>{formatDate(row.quiz_Date)}</td>
                    <td>{row.quiz_Name}</td>

                    <td>
                      <center>
                        <BiSolidShow
                          className="icon1"
                          onClick={() => {
                            handleQuizClick(row);
                          }}
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
              <Footer />
            </table>
          )}
        </div>
      </div>
    </>
  );
}
