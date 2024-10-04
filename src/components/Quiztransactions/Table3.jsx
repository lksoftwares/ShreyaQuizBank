import React, { useEffect, useState } from "react";
import "../Users/user.css";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../../../api";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import { BiSolidShow } from "react-icons/bi";

import { MdDelete } from "react-icons/md";
import Footer from "../footer/footer";

import { FaSadCry } from "react-icons/fa";

export default function Quiztransaction() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [myData, setMyData] = useState([]);

  const [modalsIsOpen, setIsOpens] = React.useState(false);

  const [loading, setLoading] = useState(false);
  const [showResultTable, setShowResultTable] = useState(false);
  const [selectedQuizDate, setSelectedQuizDate] = useState(null);
  const [formData, setFormData] = useState({
    quiz_ID: "",
    User_ID: "",
    Quiz_Date: "",
    user_Name: "",
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

  const handleDelete = async (quiz_ID) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await apiService.delete(
        `QuizTransaction/deleteQuizTransaction/${quiz_ID}`
      );
      toast.success(response);
      Data();
    }
  };

  const fetchData = async (quiz_Date) => {
    setLoading(true);
    const data = await apiService.get(
      `QuizTransaction/GetAllQuizQuestion?quizDate=${quiz_Date}`
    );

    setMyData(Array.isArray(myData) ? myData : []);
    setLoading(false);
  };

  const handleEditClick = (row) => {
    setSelectedQuizDate(row.quiz_Date);
    fetchData(row.quiz_Date);
    setShowResultTable(true);
  };
  // useEffect(() => {
  //   if (selectedQuizDate) {
  //     setShowResultTable(true);
  //   } else {
  //     setShowResultTable(false);
  //   }
  // }, [selectedQuizDate]);

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
    fetchData();
  };
  const formatDatee = (dateString) => {
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

  return (
    <>
      <div>
        <ToastContainer />

        {loading && <div className="loading-circle"></div>}

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
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{formatDatee(row.quiz_Date)}</td>
                    <td>
                      <center>
                        <MdDelete
                          onClick={() => handleDelete(row.quiz_ID)}
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{ width: "60px" }}
              >
                <GrLinkPrevious size={20} />{" "}
              </button>
            </>
          )}
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
      </div>
    </>
  );
}
