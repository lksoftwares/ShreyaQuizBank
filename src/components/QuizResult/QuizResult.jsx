// import React, { useEffect, useState } from "react";
// import "../AddDepartment/Table.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaSignOutAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { ImCross } from "react-icons/im";
// import { FaCheck } from "react-icons/fa";
// import "../QuizResult/QuizResult.css";
// import apiService from "../../../api";
// import Footer from "../footer/footer";

// export default function QuizResult() {
//   const user_ID = localStorage.getItem("ID");
//   const [myData, setmyData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const Data = async () => {
//     setLoading(true);
//     const data = await apiService.get(
//       `Quiz_AnsTransaction/Result?User_ID=${user_ID}`
//     );
//     setmyData(data.resultList);
//     console.log(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     Data();
//   }, []);
//   const formatDateTime = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear());
//     let hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");

//     const ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12; // Convert to 12-hour format
//     hours = hours ? String(hours).padStart(2, "0") : "12"; // Handle '0' hours

//     return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
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
//               </Link>
//             </div>

//             <span>
//               <h2>Answers</h2>
//             </span>
//           </div>
//           <br /> <br />
//           <br />
//           <br />
//           <br />
//           {loading && <p className="load">Loading Please Wait...</p>}
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th> Date</th>
//                 <th>Ques Desc</th>
//                 <th>User Answer</th>
//                 <th>Correct Answer</th>
//                 <th>Result</th>
//               </tr>
//             </thead>
//             <tbody>
//               {myData.map((row, index) => (
//                 <tr key={row.answer_ID}>
//                   <td>{index + 1}</td>
//                   <td> {formatDateTime(row.quiz_Date)}</td>
//                   <td>{row.ques_Desc}</td>
//                   <td>
//                     <span
//                       style={{
//                         color: row.result === "Correct" ? "green" : "red",
//                       }}
//                     >
//                       {row.answer}{" "}
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
//           <Footer></Footer>{" "}
//         </div>
//       </div>
//     </>
//   );
// }

// quiz dates-----------------------------------------------------------
import React, { useEffect, useState } from "react";
import "../AddDepartment/Table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPreview } from "react-icons/md";
import "../QuizResult/QuizResult.css";
import apiService from "../../../api";
import Footer from "../footer/footer";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

export default function QuizResult() {
  const user_ID = localStorage.getItem("ID");
  const [myData, setmyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const Data = async () => {
    setLoading(true);
    const data = await apiService.get(`QuizTransaction/GetQuizDates`);
    if (Array.isArray(data)) {
      setmyData(data);
    } else {
      setmyData([]);
    }
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    Data();
  }, []);

  const fetchData = async (quiz_Date) => {
    setLoading(true);
    const data = await apiService.get(
      `Quiz_AnsTransaction/Result?Quiz_Date=${quiz_Date}&User_ID=${user_ID}`
    );
    if (Array.isArray(data)) {
      setmyData(data);
    } else {
      setmyData([]);
    }
    setLoading(false);
    console.log(" quiz_Date", quiz_Date);
    setQuizData(data.resultList);
    console.log("cvbn", data);
  };

  const handleEditClick = (row) => {
    fetchData(row.quiz_Date);
  };

  const formatDateTime = (dateString) => {
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

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
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
                  className=" logout-btn"
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
              <h2>Answers</h2>
            </span>
          </div>
          <br /> <br />
          <br />
          <br />
          <br />
          {loading && <p className="load">Loading Please Wait...</p>}
          {myData.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Quiz Date</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {myData.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{formatDateTime(row.quiz_Date)}</td>
                    <td>
                      <center>
                        <MdPreview
                          style={{ fontSize: 35, color: "blue" }}
                          onClick={() => handleEditClick(row)}
                        />
                      </center>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}{" "}
        </div>

        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.No</th>
                <th> Date</th>
                <th>Ques Desc</th>
                <th>User Answer</th>
                <th>Correct Answer</th>
                <th>Result</th>
              </tr>
            </thead>{" "}
            <tbody>
              {quizData.map((row, index) => (
                <tr key={row.user_ID}>
                  <td>{index + 1}</td>
                  <td> {formatDateTime(row.quiz_Date)}</td>
                  <td>{row.ques_Desc}</td>
                  <td>
                    <span
                      style={{
                        color: row.result === "Correct" ? "green" : "red",
                      }}
                    >
                      {row.answer}{" "}
                    </span>
                  </td>
                  <td>{row.correct_Answer}</td>
                  {row.result === "Correct" ? (
                    <FaCheck style={{ color: "green" }} className="correct" />
                  ) : (
                    <ImCross style={{ color: "red" }} className="correct" />
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <Footer />
        </div>
      </div>
    </>
  );
}
