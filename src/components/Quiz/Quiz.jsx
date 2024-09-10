// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../Quiz/Quiz.css";
// import Select from "react-select";

// function Quiz() {
//   const [myData, setMyData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [options, setOptions] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   const [topics, setTopics] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [date, setDate] = useState("");

//   const fetchData = async (topic = "") => {
//     const token = localStorage.getItem("token");

//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get(
//         `http://192.168.1.54:7241/Question/AllQuestions?Topic_Name=${topic}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMyData(res.data);
//       filterData(res.data, topic);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const response = await axios.get(
//           "http://192.168.1.54:7241/Users/AllUSers",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const optionsData = response.data.map((option) => ({
//           value: option.user_ID,
//           label: option.user_Name,
//         }));
//         setOptions(optionsData);
//       } catch (error) {
//         console.error("Error fetching options:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const response = await axios.get(
//           "http://192.168.1.54:7241/Topic/AllTopic",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const optionsData = response.data.map((option) => ({
//           value: option.topic_ID,
//           label: option.topic_Name,
//         }));
//         setTopics(optionsData);
//       } catch (error) {
//         console.error("Error fetching topics:", error);
//       }
//     };

//     fetchTopics();
//   }, []);

//   const handleTopicChange = (selected) => {
//     setSelectedTopic(selected);
//     fetchData(selected ? selected.label : "");
//   };

//   const handleChange = (selected) => {
//     setSelectedOptions(selected);
//     console.log(selected);
//   };

//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toISOString().split("T")[0];
//     setDate(formattedDate);
//   }, []);

//   const handleDateChange = (event) => {
//     setDate(event.target.value);
//   };

//   const filterData = (data, topic) => {
//     const filtered = data.filter((item) => !topic || item.topic_Name === topic);
//     setFilteredData(filtered);
//   };

//   return (
//     <div>
//       <h2 className="top">Quiz</h2>
//       <input
//         type="date"
//         className="input-cont"
//         id="date"
//         value={date}
//         onChange={handleDateChange}
//       />
//       <Select
//         value={selectedTopic}
//         onChange={handleTopicChange}
//         className="dropdown-cont"
//         options={topics}
//         placeholder="Select a topic..."
//       />
//       <Select
//         isMulti
//         value={selectedOptions}
//         className="dropdown-cont"
//         onChange={handleChange}
//         options={options}
//         placeholder="Select options..."
//       />
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
//                     <input type="checkbox" className="input-checkbox" />
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
//     </div>
//   );
// }

// export default Quiz;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Quiz/Quiz.css";
import Select from "react-select";

function Quiz() {
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [date, setDate] = useState("");
  const [checkedQues, setCheckedQues] = useState([]);

  const fetchData = async (topic = "") => {
    const token = localStorage.getItem("token");

    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `http://192.168.1.54:7241/Question/AllQuestions?Topic_Name=${topic}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMyData(res.data);
      setCheckedQues(res.data.map((ques) => ques.ques_ID));

      filterData(res.data, topic);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://192.168.1.54:7241/Users/AllUSers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const optionsData = response.data.map((option) => ({
          value: option.user_ID,
          label: option.user_Name,
        }));
        console.log(selectedOptions.user_ID);
        setOptions(optionsData);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://192.168.1.54:7241/Topic/AllTopic",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const optionsData = response.data.map((option) => ({
          value: option.topic_ID,
          label: option.topic_Name,
        }));
        setTopics(optionsData);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

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
    setSelectedTopic(selected);
    fetchData(selected ? selected.label : "");
  };

  const handleChange = (selected) => {
    for (let length = 0; length < selected.length; length++) {
      console.log("Selected option ID:", selected[length].value);
    }
    setSelectedOptions(selected);
  };
  //time
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log("gfd", inputValue);
  };
  const saveQuestions = async () => {
    if (selectedQues.length === 0) {
      alert("No questions selected.");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const userIds = selectedOptions.map((option) => option.value);

      const QuestionData = userIds.flatMap((userId) =>
        selectedQues.map((ques_ID) => ({
          ques_ID,
          Quiz_Date: date,
          User_ID: userId,
          Allowed_Time: inputValue,
        }))
      );

      await axios({
        method: "post",
        url: `http://192.168.1.54:7241/QuizTransaction/AddQuizTransaction`,
        data: QuestionData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(QuestionData);
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  console.log("formattedDate", date);

  const filterData = (data, topic) => {
    const filtered = data.filter((item) => !topic || item.topic_Name === topic);
    setFilteredData(filtered);
  };

  return (
    <div>
      <h2 className="top">Quiz</h2>
      <label htmlFor="">Select Time:</label>
      <br />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Time"
      />
      <br />
      <input
        type="date"
        className="input-cont"
        id="date"
        value={date}
        onChange={handleDateChange}
      />{" "}
      <br />
      <label htmlFor="">Select Topic:</label>
      <Select
        value={selectedTopic}
        onChange={handleTopicChange}
        className="dropdown-cont cont "
        options={topics}
        placeholder="Select a topic..."
      />{" "}
      <br />
      <label htmlFor="" className="user">
        Select User:
      </label>
      <Select
        isMulti
        value={selectedOptions}
        className="dropdown-cont user "
        onChange={handleChange}
        options={options}
        placeholder="Select User..."
      />
      <br />
      <br /> <br />
      {loading && <p className="load">Loading Please Wait...</p>}
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
          {myData.length > 0 ? (
            myData.map((row) => (
              <tr key={row.ques_ID}>
                <td>
                  <center>
                    <input
                      type="checkbox"
                      className="input-checkbox"
                      onChange={() => handleCheckboxChange(row.ques_ID)}
                    />
                  </center>
                </td>
                <td>{row.topic_Name}</td>
                <td>{row.ques_Desc}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Question Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={saveQuestions} className="bg-blue-700 py-3 mt-3 text-md">
        Submit
      </button>
    </div>
  );
}

export default Quiz;
