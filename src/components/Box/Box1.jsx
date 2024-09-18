// import { BsQuestionSquareFill } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import "../Box/Box.css";
// import { useState } from "react";
// import apiService from "../../../api";

// export default function Box2() {
//   const [myData, setmyData] = useState({
//     totalQuestions: "",
//   });
//   const Data = async () => {
//     const data = await apiService.get("Question/TotalQuestion");
//     setmyData(data);
//     console.log(data);
//   };
//   Data();
//   return (
//     <div className="chartBox">
//       <div className="boxInfo">
//         <div className="titlee">
//           <center>
//             <h1 className="headingg">Total Questions</h1>
//           </center>
//         </div>
//       </div>{" "}
//       <Link to="/"></Link>
//       <div className="chartInfo"></div>
//       <center>
//         <BsQuestionSquareFill className="icons"></BsQuestionSquareFill>

//         <span className="dataa">{myData.totalQuestions}</span>
//       </center>
//     </div>
//   );
// }
// import { RiAdminFill } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import "../Box/Box.css";
// import { useState, useEffect } from "react";
// import apiService from "../../../api";

// export default function Box5() {
//   const [data, setData] = useState([]);
//   const [myData, setmyData] = useState(0);

//   const fetchData = async () => {
//     try {
//       // Make API call to fetch the user and questions data
//       const response = await apiService.get("Question/TotalQuestion");

//       setmyData(response);
//       setData(response.questionsByTopic);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="chartBox">
//       <div className="boxInfo">
//         <div className="titlee">
//           <center>
//             <h1 className="headingg">Total Questions</h1>
//           </center>
//         </div>
//       </div>
//       <Link to="/"></Link>
//       <div className="chartInfo"></div>
//       <center>
//         <RiAdminFill className="icons" />
//         <span className="dataa">{myData.totalQuestions}</span>
//       </center>
//       <br />
//       <h1>Questions by Topic:</h1>
//       <ul className="lists">
//         {data.map((topic, index) => (
//           <li key={index} className="list">
//             {topic.topic_Name}: {topic.totalQuestionsByTopic} Questions
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaDatabase } from "react-icons/fa6";
import { FaJava } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TbBrandLaravel } from "react-icons/tb";

import "../Box/Box.css";
import { useState, useEffect } from "react";
import apiService from "../../../api";
export default function Box5() {
  const [data, setData] = useState([]);
  const [myData, setmyData] = useState(0);

  const fetchData = async () => {
    const response = await apiService.get("Question/TotalQuestion");

    setmyData(response);
    setData(response.questionsByTopic);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to map topic to an appropriate icon
  const getTopicIcon = (topicName) => {
    switch (topicName.toLowerCase()) {
      case "html":
        return <FaHtml5 />;
      case "java":
        return <FaJava />;
      case "sql":
        return <FaDatabase />;
      case "laravel":
        return <TbBrandLaravel />;
      default:
        return <BsFillQuestionSquareFill />; // Default icon
    }
  };

  return (
    <div className="chartBox">
      <Link to="/admin/questions" className="no-underline">
        <div className="boxInfo">
          <div className="titlee">
            <center>
              <h1 className="headingg">Total Questions</h1>
            </center>
          </div>
        </div>
        <div className="chartInfo"></div>
        <center>
          <BsFillQuestionSquareFill className="icons" />
          <span className="dataa">{myData.totalQuestions}</span>
        </center>
        <br />
        <h1 className="ques"> Total Questions by Topic:</h1>
        {data.map((topic, index) => (
          <p key={index} className="list">
            {getTopicIcon(topic.topic_Name)}
            {topic.topic_Name} : {topic.totalQuestionsByTopic}
          </p>
        ))}
      </Link>
    </div>
  );
}
