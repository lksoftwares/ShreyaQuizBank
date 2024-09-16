import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Users/user.css";
import { ToastContainer, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import apiService from "../../../api";

export default function Quiztransaction() {
  const [myData, setMyData] = useState([]);

  const [loading, setLoading] = useState(false);

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
  return (
    <>
      <div>
        <ToastContainer />
        <div className="card-body">
          <span>
            <h2>Question Transaction</h2>
          </span>
          {loading && <p className="load">Loading Please Wait...</p>}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Quiz Date</th>
                <th>Quiz Description</th>
                {/* <th>User Email</th>
                <th>Edit</th> */}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {myData.map((row) => (
                <tr key={row.quiz_ID}>
                  <td>{row.quiz_Date}</td>
                  <td>{row.ques_Desc}</td>

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
          </table>
        </div>
      </div>
    </>
  );
}
