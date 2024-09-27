// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../Quiz/Quiz.css";
// import Select from "react-select";
// import apiService from "../../../api";

// function Quiz() {
//   const url = import.meta.env.VITE_BASE_URL;
//   const token = localStorage.getItem("token");

//   const [myData, setMyData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [options, setOptions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   const [topics, setTopics] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [date, setDate] = useState("");
//   const [checkedQues, setCheckedQues] = useState([]);

//   const fetchData = async (topic = "") => {
//     setLoading(true);
//     const data = await apiService.get(
//       `Question/AllQuestions?Topic_Name=${topic}`
//     );
//     setMyData(data);
//     setCheckedQues(data.map((ques) => ques.ques_ID));
//     filterData(data, topic);
//     setLoading(false);
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
//   //get all users
//   const fetchDataa = async () => {
//     const data = await apiService.get("Users/AllUSers");
//     console.log("sd", data);
//     const optionsData = data.usersLists.map((option) => ({
//       value: option.user_ID,
//       label: option.user_Name,
//     }));
//     setOptions(optionsData);
//   };
//   fetchDataa();
//   const fetchTopics = async () => {
//     setLoading(true);
//     const data = await apiService.get("Topic/AllTopic");
//     const optionsData = data.map((option) => ({
//       value: option.topic_ID,
//       label: option.topic_Name,
//     }));
//     setTopics(optionsData);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchTopics();
//   }, []);
//   const [selectedQues, setSelectedQues] = useState([]);

//   const handleCheckboxChange = (ques_ID) => {
//     setSelectedQues((prevSelected) => {
//       if (prevSelected.includes(ques_ID)) {
//         return prevSelected.filter((id) => id !== ques_ID);
//       }
//       return [...prevSelected, ques_ID];
//     });
//   };

//   const handleTopicChange = (selected) => {
//     setSelectedTopic(selected);
//     fetchData(selected ? selected.label : "");
//   };

//   const handleChange = (selected) => {
//     for (let length = 0; length < selected.length; length++) {
//       console.log("Selected option ID:", selected[length].value);
//     }
//     setSelectedOptions(selected);
//   };
//   //time
//   const [inputValue, setInputValue] = useState("");

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//     console.log("gfd", inputValue);
//   };
//   const saveQuestions = async () => {
//     if (selectedQues.length === 0) {
//       toast.warning("No questions selected.");
//       return;
//     }
//     const userIds = selectedOptions.map((option) => option.value);

//     const QuestionData = userIds.flatMap((userId) =>
//       selectedQues.map((ques_ID) => ({
//         ques_ID,
//         Quiz_Date: date,
//         User_ID: userId,
//         Allowed_Time: inputValue,
//       }))
//     );

//     await axios({
//       method: "post",
//       url: `${url}/QuizTransaction/AddQuizTransaction`,
//       data: QuestionData,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((response) => {
//       toast.success(response.data);
//     });
//     console.log(QuestionData);
//   };

//   useEffect(() => {
//     const now = new Date();

//     const formattedDateTime = `${now.getFullYear()}-${String(
//       now.getMonth() + 1
//     ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(
//       now.getHours()
//     ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
//       now.getSeconds()
//     ).padStart(2, "0")}`;

//     setDate(formattedDateTime);
//   }, []);
//   const handleDateChange = (event) => {
//     setDate(event.target.value);
//   };
//   console.log("formattedDate", date);

//   const filterData = (data, topic) => {
//     const filtered = data.filter((item) => !topic || item.topic_Name === topic);
//     setFilteredData(filtered);
//   };

//   return (
//     <div>
//       <ToastContainer />
//       <h2 className="top">Quiz Transactions</h2>
//       <div className="input-wrapper">
//         <label className="user">Select Time:</label>
//         <br />
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           className="input-cont"
//           placeholder="Enter Time"
//         />
//         <label className="user marginn">Select Date:</label>
//         <input
//           type="datetime-local"
//           className="input-cont "
//           id="appt-time"
//           name="appt-time"
//           step="2"
//           value={date}
//           onChange={handleDateChange}
//         />{" "}
//       </div>
//       <div className="input-wrapper">
//         <label className="user">Select Topic:</label>
//         <Select
//           value={selectedTopic}
//           onChange={handleTopicChange}
//           className=" input-cont  "
//           options={topics}
//           placeholder="Select topic"
//         />{" "}
//         <label className="user marginn">Select User:</label>
//         <Select
//           isMulti
//           value={selectedOptions}
//           className="input-cont  "
//           onChange={handleChange}
//           options={options}
//           placeholder="Select User"
//         />
//       </div>
//       {loading && <p className="load">Loading Please Wait...</p>}
//       {error && <p>Error: {error}</p>}
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th></th>
//             <th>Topic</th>
//             <th>Question Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {myData.length > 0 ? (
//             myData.map((row) => (
//               <tr key={row.ques_ID}>
//                 <td>
//                   <center>
//                     <input
//                       type="checkbox"
//                       className="input-checkbox"
//                       onChange={() => handleCheckboxChange(row.ques_ID)}
//                     />
//                   </center>
//                 </td>
//                 <td>{row.topic_Name}</td>
//                 <td>{row.ques_Desc}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7">Question Not Found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <button onClick={saveQuestions} className="bg-blue-700 py-3 mt-3 text-md">
//         Submit
//       </button>
//     </div>
//   );
// }

// export default Quiz;
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../Quiz/Quiz.css";
// import Select from "react-select";
// import apiService from "../../../api";

// function Quiz() {
//   const url = import.meta.env.VITE_BASE_URL;
//   const token = localStorage.getItem("token");

//   const [myData, setMyData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [options, setOptions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [selectedTopics, setSelectedTopics] = useState([]); // Multiple selected topics
//   const [topics, setTopics] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [date, setDate] = useState("");
//   const [checkedQues, setCheckedQues] = useState([]);

//   const fetchData = async (topics = []) => {
//     setLoading(true);
//     const topicNames = topics.map((topic) => topic.label).join(",");
//     const data = await apiService.get(
//       `Question/AllQuestions?Topic_Name=${topicNames}`
//     );
//     setMyData(data);
//     setCheckedQues(data.map((ques) => ques.ques_ID));
//     filterData(data, topics);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Get all users
//   const fetchDataa = async () => {
//     const data = await apiService.get("Users/AllUSers");
//     const optionsData = data.usersLists.map((option) => ({
//       value: option.user_ID,
//       label: option.user_Name,
//     }));
//     setOptions(optionsData);
//   };

//   useEffect(() => {
//     fetchDataa();
//   }, []);

//   const fetchTopics = async () => {
//     setLoading(true);
//     const data = await apiService.get("Topic/AllTopic");
//     const optionsData = data.map((option) => ({
//       value: option.topic_ID,
//       label: option.topic_Name,
//     }));
//     setTopics(optionsData);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchTopics();
//   }, []);

//   const [selectedQues, setSelectedQues] = useState([]);

//   const handleCheckboxChange = (ques_ID) => {
//     setSelectedQues((prevSelected) => {
//       if (prevSelected.includes(ques_ID)) {
//         return prevSelected.filter((id) => id !== ques_ID);
//       }
//       return [...prevSelected, ques_ID];
//     });
//   };

//   const handleTopicChange = (selected) => {
//     setSelectedTopics(selected); // Handle multiple topics
//     fetchData(selected);
//   };

//   const handleChange = (selected) => {
//     setSelectedOptions(selected);
//   };

//   const [inputValue, setInputValue] = useState("");

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const saveQuestions = async () => {
//     if (selectedQues.length === 0) {
//       toast.warning("No questions selected.");
//       return;
//     }
//     const userIds = selectedOptions.map((option) => option.value);

//     const QuestionData = userIds.flatMap((userId) =>
//       selectedQues.map((ques_ID) => ({
//         ques_ID,
//         Quiz_Date: date,
//         User_ID: userId,
//         Allowed_Time: inputValue,
//       }))
//     );

//     await axios({
//       method: "post",
//       url: `${url}/QuizTransaction/AddQuizTransaction`,
//       data: QuestionData,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((response) => {
//       toast.success(response.data);
//     });
//   };

//   useEffect(() => {
//     const now = new Date();

//     const formattedDateTime = `${now.getFullYear()}-${String(
//       now.getMonth() + 1
//     ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(
//       now.getHours()
//     ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
//       now.getSeconds()
//     ).padStart(2, "0")}`;

//     setDate(formattedDateTime);
//   }, []);

//   const handleDateChange = (event) => {
//     setDate(event.target.value);
//   };

//   const filterData = (data, selectedTopics) => {
//     const filtered = data.filter((item) =>
//       selectedTopics.some((topic) => topic.label === item.topic_Name)
//     );
//     setFilteredData(filtered);
//   };

//   return (
//     <div>
//       <ToastContainer />
//       <h2 className="top">Quiz Transactions</h2>
//       <div className="input-wrapper">
//         <label className="user">Select Time:</label>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           className="input-cont"
//           placeholder="Enter Time"
//         />
//         <label className="user marginn">Select Date:</label>
//         <input
//           type="datetime-local"
//           className="input-cont"
//           value={date}
//           onChange={handleDateChange}
//         />
//       </div>

//       <div className="input-wrapper">
//         <label className="user">Select Topic:</label>
//         <Select
//           isMulti
//           value={selectedTopics}
//           onChange={handleTopicChange}
//           className="input-cont"
//           options={topics}
//           placeholder="Select Topics"
//         />
//         <label className="user marginn">Select User:</label>
//         <Select
//           isMulti
//           value={selectedOptions}
//           className="input-cont"
//           onChange={handleChange}
//           options={options}
//           placeholder="Select User"
//         />
//       </div>

//       {loading && <p className="load">Loading Please Wait...</p>}
//       {error && <p>Error: {error}</p>}

//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th></th>
//             <th>Topic</th>
//             <th>Question Description</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length > 0 ? (
//             filteredData.map((row) => (
//               <tr key={row.ques_ID}>
//                 <td>
//                   <input
//                     type="checkbox"
//                     className="input-checkbox"
//                     onChange={() => handleCheckboxChange(row.ques_ID)}
//                   />
//                 </td>
//                 <td>{row.topic_Name}</td>
//                 <td>{row.ques_Desc}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7">No Questions Found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <button onClick={saveQuestions} className="bg-blue-700 py-3 mt-3 text-md">
//         Submit
//       </button>
//     </div>
//   );
// }

// export default Quiz;
import { ToastContainer, toast } from "react-toastify";
import { FaSignOutAlt } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Quiz/Quiz.css";
import Select from "react-select";
import apiService from "../../../api";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import Datetime from "../datetime";

function Quiz() {
  const url = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]); // Multiple selected topics
  const [topics, setTopics] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [date, setDate] = useState("");
  const [checkedQues, setCheckedQues] = useState([]);
  const fetchData = async (topics = []) => {
    setLoading(true);
    const topicNames = topics.map((topic) => topic.label).join(",");
    const data = await apiService.get(
      `Question/AllQuestions?Topic_Name=${topicNames}`
    );
    setMyData(data);
    setCheckedQues(data.map((ques) => ques.ques_ID));
    filterData(data, topics);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get all users
  const fetchDataa = async () => {
    const data = await apiService.get("Users/AllUSers");
    const optionsData = data.usersLists.map((option) => ({
      value: option.user_ID,
      label: option.user_Name,
    }));
    setOptions(optionsData);
  };

  useEffect(() => {
    fetchDataa();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);
    const data = await apiService.get("Topic/AllTopic");
    const optionsData = data.map((option) => ({
      value: option.topic_ID,
      label: option.topic_Name,
    }));
    setTopics(optionsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const [selectedQues, setSelectedQues] = useState([]);

  const handleCheckboxChange = (ques_ID) => {
    setSelectedQues((prevSelected) => {
      if (prevSelected.includes(ques_ID)) {
        return prevSelected.filter((id) => id !== ques_ID);
      }
      return [...prevSelected, ques_ID];
    });
  };

  const handleTopicChange = (selected) => {
    setSelectedTopics(selected); // Handle multiple topics
    fetchData(selected);
  };

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const [inputValues, setInputValues] = useState("");

  const handleInputsChange = (event) => {
    setInputValues(event.target.value);
  };

  const saveQuestions = async () => {
    if (selectedQues.length === 0) {
      toast.warning("No questions selected.");
      return;
    }
    const userIds = selectedOptions.map((option) => option.value);

    const QuestionData = userIds.flatMap((userId) =>
      selectedQues.map((ques_ID) => ({
        ques_ID,
        Quiz_Date: date,
        User_ID: userId,
        Allowed_Time: inputValue,
        quiz_Name: inputValues,
      }))
    );

    await axios({
      method: "post",
      url: `${url}/QuizTransaction/AddQuizTransaction`,
      data: QuestionData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      toast.success(response.data);
    });
  };

  useEffect(() => {
    const now = new Date();

    const formattedDateTime = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")}`;

    setDate(formattedDateTime);
  }, []);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Modified filterData to sort questions by topic
  const filterData = (data, selectedTopics) => {
    const filtered = data.filter((item) =>
      selectedTopics.some((topic) => topic.label === item.topic_Name)
    );
    const sortedData = filtered.sort((a, b) =>
      a.topic_Name.localeCompare(b.topic_Name)
    );
    setFilteredData(sortedData);
  };

  return (
    <div>
      <ToastContainer />
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
          </Link>
        </div>
        <Datetime></Datetime>

        <h2 className="top">Quiz Transactions</h2>

        <div className="input-wrapper">
          <label className="users ">Select Date:</label>
          <input
            type="datetime-local"
            className="input-cont"
            value={date}
            onChange={handleDateChange}
          />
          <label className="users marginn">Time in Min:</label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="input-cont"
            placeholder="Enter Time"
          />
        </div>

        <div className="input-wrapper">
          <label className="users">Select Topic:</label>
          <Select
            isMulti
            value={selectedTopics}
            onChange={handleTopicChange}
            className=" input-cont dropdown-cont"
            options={topics}
            placeholder="Select Topics"
          />
          <label className="users marginn">Select User: </label>
          <Select
            isMulti
            value={selectedOptions}
            className="input-cont dropdown-cont"
            onChange={handleChange}
            options={options}
            placeholder="Select User"
          />
          <label className="users marginn">Quiz Name:</label>
          <input
            type="text"
            value={inputValues}
            onChange={handleInputsChange}
            className="input-cont"
            placeholder="Enter Time"
          />
        </div>
      </div>
      <br />
      <br /> <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {loading && <div className="loading-circle"></div>}
      {error && <p>Error: {error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Topic</th>
            <th>Question Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row) => (
              <tr key={row.ques_ID}>
                <td>
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    onChange={() => handleCheckboxChange(row.ques_ID)}
                  />
                </td>
                <td>{row.topic_Name}</td>
                <td>{row.ques_Desc}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Questions Found</td>
            </tr>
          )}
        </tbody>
        <Footer></Footer>{" "}
      </table>
      <button onClick={saveQuestions} className="bg-blue-700 py-3 mt-3 text-md">
        Submit
      </button>
    </div>
  );
}

export default Quiz;
