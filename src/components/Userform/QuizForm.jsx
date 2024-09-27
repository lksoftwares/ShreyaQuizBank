// import "./UserForm.css";
// import { useState, useEffect } from "react";
// import { FaSignOutAlt } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import apiService from "../../../api";
// import { Link } from "react-router-dom";
// import Footer from "../footer/footer";
// import Datetime from "../datetime";
// function QuizForm() {
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
//         <center>
//           <br />
//           <fieldset className="fieldset" style={{ marginTop: "-65px" }}>
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
//       </form>
//       <Footer></Footer>
//     </div>
//   );
// }

// export default QuizForm;
import "./UserForm.css";
import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../../../api";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import Datetime from "../datetime";

function QuizForm() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState([]);
  const userId = localStorage.getItem("ID");

  // userdetails
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

  useEffect(() => {
    if (userId) {
      fetchQuestionsByUserId(userId);
    }
  }, [userId]);

  //fetch questions
  const fetchQuestionsByUserId = async (user_id) => {
    setLoading(true);
    const data = await apiService.get(
      `QuizTransaction/GetAllQuizQuestion?User_ID=${user_id}`
    );

    // Filter questions based on isAllowed
    const filteredQuestions = data.filter((question) => question.isAllowed);
    setQuestions(filteredQuestions);

    setFormData(
      filteredQuestions.map((question) => ({
        Ques_ID: question.ques_ID,
        User_ID: userId,
        Answer: "",
      }))
    );
    setLoading(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[currentQuestionIndex].Answer = value;
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.post(
      "Quiz_AnsTransaction/SubmitAnswer",
      formData
    );
    toast.success(response);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (loading) {
    return <div className="loading-circle"></div>;
  }

  if (error) {
    return <div className="load">Error: {error}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const hasOptions =
    currentQuestion?.opt_A ||
    currentQuestion?.opt_B ||
    currentQuestion?.opt_C ||
    currentQuestion?.opt_D;

  return (
    <div className="App bg">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <center>
          <br />
          <fieldset className="fieldset" style={{ marginTop: "-65px" }}>
            <h1 className="h1">
              Knowledge Test Quiz
              <div className="quesno">
                {currentQuestionIndex + 1} / {questions.length}
              </div>
            </h1>

            {questions.length === 0 ? (
              <p>No questions available</p>
            ) : (
              <div>
                <h3>Question Description: </h3>
                <input
                  type="text"
                  placeholder="Enter Question here"
                  readOnly
                  value={currentQuestion.ques_Desc}
                  className="text-cont"
                />
                {hasOptions && (
                  <>
                    <h3>Answer Options:</h3>
                    <div className="options-container">
                      {/* Options A and B */}
                      <div className="options-row">
                        <div className="option-pair">
                          {currentQuestion.opt_A && (
                            <div className="option-box">
                              <input
                                type="text"
                                className="short"
                                placeholder="A"
                                readOnly
                              />
                              <input
                                type="text"
                                className="option"
                                placeholder="Option A"
                                readOnly
                                value={currentQuestion.opt_A}
                              />
                            </div>
                          )}

                          {currentQuestion.opt_B && (
                            <div className="option-box">
                              <input
                                type="text"
                                className="short short-cont"
                                placeholder="B"
                                readOnly
                              />
                              <input
                                type="text"
                                className="option"
                                placeholder="Option B"
                                readOnly
                                value={currentQuestion.opt_B}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Options C and D */}
                      <div className="options-row">
                        <div className="option-pair">
                          {currentQuestion.opt_C && (
                            <div className="option-box">
                              <input
                                type="text"
                                className="short"
                                placeholder="C"
                                readOnly
                              />
                              <input
                                type="text"
                                className="option"
                                placeholder="Option C"
                                readOnly
                                value={currentQuestion.opt_C}
                              />
                            </div>
                          )}

                          {currentQuestion.opt_D && (
                            <div className="option-box">
                              <input
                                type="text"
                                className="short short-cont"
                                placeholder="D"
                                readOnly
                              />
                              <input
                                type="text"
                                className="option"
                                placeholder="Option D"
                                readOnly
                                value={currentQuestion.opt_D}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <h3>Your Answer: </h3>
                <input
                  type="text"
                  className="long"
                  placeholder="Enter Your Answer"
                  value={formData[currentQuestionIndex]?.Answer || ""}
                  onChange={handleChange}
                  maxLength={hasOptions ? 1 : undefined} // Limit to 1 character for MCQs
                />
                <br />
                <span>
                  <button type="submit" className="submit">
                    Submit All Answers
                  </button>
                  <button
                    type="button"
                    className="button-cont"
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                  >
                    Next
                  </button>

                  <button
                    type="button"
                    className="button-cont"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </button>
                </span>
              </div>
            )}
          </fieldset>
        </center>
      </form>
      <Footer />
    </div>
  );
}

export default QuizForm;
