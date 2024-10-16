// import "./UserForm.css";
// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import apiService from "../../../api";
// import Footer from "../footer/footer";

// function QuizForm({ quizData }) {
//   // if (!quizData) {
//   //   return null;
//   // }
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
//   const fetchData = async () => {
//     setLoading(true);

//     const data = await apiService.get(`QuizTransaction/willBeQuiz/${user_ID}`);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   //fetch questions
//   const fetchQuestionsByUserId = async (user_id) => {
//     setLoading(true);
//     const data = await apiService.get(
//       `QuizTransaction/GetAllQuizQuestion?User_ID=${user_id}`
//     );

//     // Filter questions based on isAllowed
//     const filteredQuestions = data.filter((question) => question.isAllowed);
//     setQuestions(filteredQuestions);

//     setFormData(
//       filteredQuestions.map((question) => ({
//         Ques_ID: question.ques_ID,
//         User_ID: userId,
//         Answer: "",
//         quiz_Date: quizData.formattedDate,
//         quiz_Name: quizData.formattedName,
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
//       {/* <p style={{ color: "black" }}>Quiz Date: {quizData.formattedDate}</p> */}
//       {/* <p style={{ color: "black" }}>Quiz Date: {quizData.formattedName}</p> */}

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
//                   maxLength={hasOptions ? 1 : undefined}
//                 />
//                 <br />
//                 <span>
//                   {currentQuestionIndex === questions.length - 1 && (
//                     <button type="submit" className="submit">
//                       Submit All Answers
//                     </button>
//                   )}
//                   {questions.length > 1 && (
//                     <>
//                       {currentQuestionIndex < questions.length - 1 && (
//                         <button
//                           type="button"
//                           className="button-cont"
//                           onClick={handleNextQuestion}
//                         >
//                           Next
//                         </button>
//                       )}
//                       <button
//                         type="button"
//                         className="button-cont"
//                         onClick={handlePrevQuestion}
//                         disabled={currentQuestionIndex === 0}
//                       >
//                         Previous
//                       </button>
//                     </>
//                   )}
//                 </span>
//               </div>
//             )}
//           </fieldset>
//         </center>
//       </form>
//       <Footer />
//     </div>
//   );
// }

// export default QuizForm;
import "./UserForm.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../../../api";
import Footer from "../footer/footer";

function QuizForm({ quizData }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState([]);
  const userId = localStorage.getItem("ID");

  const [userDetails, setUserDetails] = useState(null);
  const user_ID = localStorage.getItem("ID");

  const allowed_Time = quizData?.allowed_Time * 60 || 0;

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

  const fetchData = async () => {
    setLoading(true);
    const data = await apiService.get(`QuizTransaction/willBeQuiz/${user_ID}`);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchQuestionsByUserId = async (user_id) => {
    setLoading(true);
    const data = await apiService.get(
      `QuizTransaction/GetAllQuizQuestion?User_ID=${user_id}`
    );

    const filteredQuestions = data.filter((question) => question.isAllowed);
    setQuestions(filteredQuestions);

    setFormData(
      filteredQuestions.map((question) => ({
        Ques_ID: question.ques_ID,
        User_ID: userId,
        Answer: "",
        quiz_Date: quizData.formattedDate,
        quiz_Name: quizData.formattedName,
      }))
    );
    setLoading(false);
  };

  const [remainingTime, setRemainingTime] = useState(allowed_Time);

  // Load remaining time from localStorage
  useEffect(() => {
    const savedStartTime = localStorage.getItem("quizStartTime");
    const savedRemainingTime = localStorage.getItem("remainingTime");

    if (savedStartTime && savedRemainingTime) {
      const elapsedTime = Math.floor(
        (Date.now() - parseInt(savedStartTime, 10)) / 1000
      );
      const timeLeft = allowed_Time - elapsedTime;

      if (timeLeft > 0) {
        setRemainingTime(timeLeft);
      } else {
        handleSubmit();
      }
    } else {
      localStorage.setItem("quizStartTime", Date.now());
      setRemainingTime(allowed_Time);
    }
  }, [allowed_Time]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        const newTime = prev - 1;
        localStorage.setItem("remainingTime", newTime);
        return newTime;
      });
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        localStorage.setItem("remainingTime", remainingTime);
      } else {
        // On tab switch back, re-calculate remaining time
        const savedStartTime = localStorage.getItem("quizStartTime");
        if (savedStartTime) {
          const elapsedTime = Math.floor(
            (Date.now() - parseInt(savedStartTime, 10)) / 1000
          );
          const timeLeft = allowed_Time - elapsedTime;
          setRemainingTime(timeLeft > 0 ? timeLeft : 0);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      localStorage.setItem("remainingTime", remainingTime); // Save remaining time on unmount
    };
  }, [allowed_Time, remainingTime]);

  const [hasWarned, setHasWarned] = useState(false);

  useEffect(() => {
    if (remainingTime < 40 && remainingTime > 0 && !hasWarned) {
      toast.warn("Hurry up! Less than 40 seconds left!");
      setHasWarned(true);
    } else if (remainingTime >= 40) {
      setHasWarned(false);
    }
  }, [remainingTime, hasWarned]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[currentQuestionIndex].Answer = value;
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const response = await apiService.post(
      "Quiz_AnsTransaction/SubmitAnswer",
      formData
    );
    toast.success(response);
    localStorage.removeItem("remainingTime");
    localStorage.removeItem("quizStartTime");
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
      <ToastContainer position="top-right" />

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
                <div
                  style={{
                    fontSize: "20px",
                    color: "black",
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  Time Left: {Math.floor(remainingTime / 60)}:
                  {(remainingTime % 60).toString().padStart(2, "0")}
                </div>
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
                  maxLength={hasOptions ? 1 : undefined}
                />
                <br />
                <span>
                  {currentQuestionIndex === questions.length - 1 && (
                    <button type="submit" className="submit">
                      Submit All Answers
                    </button>
                  )}
                  {questions.length > 1 && (
                    <>
                      {currentQuestionIndex < questions.length - 1 && (
                        <button
                          type="button"
                          className="button-cont"
                          onClick={handleNextQuestion}
                        >
                          Next
                        </button>
                      )}
                      <button
                        type="button"
                        className="button-cont"
                        onClick={handlePrevQuestion}
                        disabled={currentQuestionIndex === 0}
                      >
                        Previous
                      </button>
                    </>
                  )}
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
