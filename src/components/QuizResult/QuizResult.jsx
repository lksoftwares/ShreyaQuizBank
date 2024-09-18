import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AddDepartment/Table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
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

export default function QuizResult() {
  const url = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const user_ID = localStorage.getItem("ID");
  const [myData, setmyData] = useState([]);

  const [loading, setLoading] = useState(false);

  const Data = async () => {
    setLoading(true);

    const response = await axios({
      url: `${url}/Quiz_AnsTransaction/Result?User_ID=${user_ID}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setmyData(response.data.resultList);
    //console.log(response.data);
    setLoading(false);
  };

  useEffect(() => {
    Data();
  }, []);

  return (
    <>
      <div>
        <ToastContainer />
        <div className="card-body">
          <span>
            <h2>Answers</h2>
            <Link to="/">
              <button
                className=" logout-btn"
                onClick={() => {
                  localStorage.clear();
                  toast.info("Logged out successfully!");
                }}
              >
                Logout
              </button>
            </Link>
          </span>
          {loading && <p className="load">Loading Please Wait...</p>}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Ques_Desc</th>
                <th>Answer</th>
                <th>Correct Answer</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {myData.map((row) => (
                <tr key={row.answer_ID}>
                  <td>{row.ques_Desc}</td>
                  <td>{row.answer}</td>
                  <td>{row.correct_Answer}</td>
                  <td>{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
