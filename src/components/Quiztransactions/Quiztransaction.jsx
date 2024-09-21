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

import Button from "react-bootstrap/Button";
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
  const [myData, setMyData] = useState([]);
  const [modalsIsOpen, setIsOpens] = React.useState(false);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    User_ID: "",
    Quiz_Date: "",
  });
  // Fetch data from the API
  const Data = async () => {
    setLoading(true);
    const data = await apiService.get("QuizTransaction/GetAllQuizQuestion");
    setMyData(data);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.put(
      `QuizTransaction/updateQuizTransaction/${formData.User_ID}`,
      {
        Quiz_Date: formData.Quiz_Date,
      }
    );
    toast.success(response);
    setIsOpens(false);
    fetchData();
  };
  const handleEditClick = (row) => {
    const formattedDate = row.quiz_Date
      ? new Date(row.quiz_Date).toISOString().split("T")[0]
      : "";

    setFormData({
      User_ID: row.User_ID,
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
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <div>
        <ToastContainer />
        <div className="card-body">
          <div className="header-container">
            <div>
              {" "}
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
              </Link>{" "}
            </div>
            <Datetime></Datetime>

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
          {loading && <p className="load">Loading Please Wait...</p>}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Quiz Date</th>
                <th>Quiz Description</th>
                {/* <th>User Email</th> */}
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {myData.map((row, index) => (
                <tr key={row.quiz_ID}>
                  <td>{index + 1}</td>
                  <td>
                    {formatDate(row.quiz_Date)} {row.quiz_Date.split(" ")[1]}
                  </td>
                  <td>{row.ques_Desc}</td>
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
        </div>
        <Modal
          isOpen={modalsIsOpen}
          onRequestClose={() => setIsOpens(false)}
          style={customStyles}
          className="modall"
        >
          <form onSubmit={handleFormSubmit}>
            <center>
              <h1>Edit Date</h1>
            </center>
            <hr />
            <br />
            <label className="fonts">
              Select Date:
              <br />
              <br />
              <input
                type="date"
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
