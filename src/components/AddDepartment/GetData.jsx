// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import Modal from "react-modal";
// import { BsPencilSquare } from "react-icons/bs";
// import { MdDelete } from "react-icons/md";
// import { ToastContainer, toast } from "react-toastify";
// import apiService from "../../../api";
// import "./Table.css";
// // import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     height: 500,

//     bottom: "auto",

//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };
// export default function GetData() {
//   const url = import.meta.env.VITE_BASE_URL;
//   const token = localStorage.getItem("token");

//   let subtitle;
//   const [modalIsOpen, setIsOpen] = React.useState(false);

//   function openModal() {
//     setIsOpen(true);
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }
//   function afterOpenModal() {
//     subtitle.style.color = "#f00";
//   }

//   //edit data
//   let subtitles;
//   const [modalsIsOpen, setIsOpens] = React.useState(false);
//   function openModals() {
//     setIsOpens(true);
//   }
//   function closeModals() {
//     setIsOpens(false);
//   }
//   function afterOpenModals() {
//     subtitle.style.color = "#f00";
//   }
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const [myData, setmyData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   //get data
//   const Data = async () => {
//     const data = await apiService.get("Question/AllQuestions");
//     setmyData(data);
//   };
//   Data();

//   const [inputValues, setInputValues] = useState({
//     ques_Desc: "",
//     opt_A: "",
//     opt_B: "",
//     opt_C: "",
//     opt_D: "",
//     topic_ID: "",
//     quesType_ID: "",
//     correct_Answer: "",
//     remarks: "",
//     Status: "",
//   });
//   const handleData = (e) => {
//     const { name, value } = e.target;
//     setInputValues({ ...inputValues, [name]: value });
//   };

//   //post data
//   const handleSubmit = async () => {
//     inputValues.topic_ID = selectOptions.id;
//     inputValues.quesType_ID = selectedOption.id;
//     const response = await apiService.post(
//       "Question/AddQuestions",
//       inputValues
//     );
//     toast.success(response);
//     setIsOpen(false);
//   };

//   //delete data
//   const handleDelete = async (ques_ID) => {
//     window.alert("Are you sure to want to delete?");
//     const response = await apiService.delete(
//       `Question/deleteQuestion/${ques_ID}`
//     );
//     toast.success(response);
//     console.log("sd", response);
//     Data();
//   };

//   //update data
//   const [formData, setFormData] = useState({
//     user_ID: "",
//     user_Name: "",
//     user_Email: "",
//     user_Password: "",
//     status: "",
//     role_ID: "",
//   });
//   const [selectedRow, setSelectedRow] = useState(null);

//   const handleEditClick = (row) => {
//     setSelectedRow(row);
//     setFormData(row);
//     openModals();
//     const defaultOption = options.find((option) => option.id === row.topic_ID);
//     setSelectOptions(defaultOption);
//     const defaultOptions = option.find(
//       (option) => option.id === row.quesType_ID
//     );
//     setSelectedOption(defaultOptions);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleModalClose = () => {
//     setIsOpens(false);
//     setSelectedRow(null);
//     setFormData({});
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     formData.topic_ID = selectOptions.id;
//     formData.quesType_ID = selectedOption.id;
//     const response = await apiService.put(
//       `Question/updateQuestions/${formData.ques_ID}`,
//       {
//         ques_Desc: formData.ques_Desc,
//         opt_A: formData.opt_A,
//         opt_B: formData.opt_B,
//         opt_C: formData.opt_C,
//         opt_D: formData.opt_D,
//         correct_Answer: formData.correct_Answer,
//         remarks: formData.remarks,
//         topic_ID: formData.topic_ID,
//         quesType_ID: formData.quesType_ID,
//       }
//     );
//     toast.success(response);
//     handleModalClose();
//     Data();
//   };
//   //get topic
//   const [selectOptions, setSelectOptions] = useState("");
//   function handleChoose(data) {
//     setSelectOptions(data);
//   }
//   const [options, setOptions] = useState([]);
//   const fetchOptions = async () => {
//     const data = await apiService.get("Topic/AllTopic");
//     const userOptions = data.map((user) => ({
//       id: user.topic_ID,
//       label: user.topic_Name,
//     }));
//     setOptions(userOptions);
//   };
//   fetchOptions();
//   //For type
//   const [selectedOption, setSelectedOption] = useState("");
//   const handleDropdownChange = (data) => {
//     setSelectedOption(data);
//   };
//   const [option, setOption] = useState([]);
//   const fetchOption = async () => {
//     const data = await apiService.get("QuesType/QuesType");
//     const userOptions = data.map((user) => ({
//       id: user.quesType_ID,
//       label: user.quesType_Label,
//       value: user.quesType_Value,
//     }));
//     setOption(userOptions);
//   };
//   fetchOption();

//   return (
//     <>
//       <ToastContainer />
//       <div className="card-body">
//         <span>
//           <h2> Questions</h2>
//           <button onClick={openModal} className="btun">
//             Add Questions
//           </button>
//         </span>{" "}
//         {loading && <p className="load">Loading Please Wait...</p>}
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th> Topic</th>
//               <th>QuesType</th>
//               <th>Question Description</th>
//               <th> A</th>
//               <th>B</th>
//               <th>C</th>
//               <th>D</th>

//               <th>Correct Answer</th>
//               <th>Remarks</th>

//               {/* <th>Status</th> */}

//               <th> Edit</th>
//               <th> Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {myData.map((row) => (
//               <tr key={row.ques_ID}>
//                 <td>{row.topic_Name}</td>
//                 <td>{row.quesType_Label}</td>
//                 <td>{row.ques_Desc}</td>
//                 <td>{row.opt_A}</td>
//                 <td>{row.opt_B}</td>
//                 <td>{row.opt_C}</td>
//                 <td>{row.opt_D}</td>

//                 <td>{row.correct_Answer}</td>
//                 <td>{row.remarks}</td>
//                 {/* <td>{row.Status}</td> */}

//                 <td>
//                   <center>
//                     <BsPencilSquare
//                       onClick={() => handleEditClick(row)}
//                       className="icon1"
//                     />
//                   </center>
//                 </td>
//                 <td>
//                   <center>
//                     <MdDelete
//                       onClick={() => handleDelete(row.ques_ID)}
//                       className="icon"
//                     />
//                   </center>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {/* modal form add */}
//         <div className="modal-content">
//           <Modal
//             isOpen={modalIsOpen}
//             onAfterOpen={afterOpenModal}
//             onRequestClose={closeModal}
//             style={customStyles}
//             contentLabel="Example Modal"
//           >
//             <fieldset>
//               <h1 className="h1">Knowledge Test Quiz</h1>
//               <br />
//               <div className="drop">
//                 <label htmlFor=""> Select Topic: </label>

//                 <Select
//                   options={options}
//                   placeholder="Select Topic"
//                   isSearchable={true}
//                   value={selectOptions}
//                   onChange={handleChoose}
//                   className="dropdown "
//                 />
//               </div>
//               <br />
//               <div className="drop">
//                 <label htmlFor=""> Select Typee:</label>
//                 <Select
//                   options={option}
//                   placeholder="Select Type"
//                   isSearchable={true}
//                   value={selectedOption}
//                   onChange={handleDropdownChange}
//                   className="dropdown "
//                 />
//               </div>
//               <br />
//               <h3>Question Description : </h3>
//               <input
//                 type="text"
//                 className="margin  "
//                 placeholder="Enter ques Name here "
//                 name="ques_Desc"
//                 value={inputValues.ques_Desc}
//                 onChange={handleData}
//               />{" "}
//               <h3>Answer Option</h3>
//               {selectedOption.value === "mcq" && (
//                 <div>
//                   <input type="text " className="short" placeholder="A" />
//                   <input
//                     type="text"
//                     className=" small "
//                     placeholder="Enter Topic Name here "
//                     name="opt_A"
//                     value={inputValues.opt_A}
//                     onChange={handleData}
//                   />
//                   <span>
//                     <input
//                       type="text "
//                       className="short short-box"
//                       placeholder="B"
//                     />
//                     <input
//                       type="text"
//                       className=" small "
//                       placeholder="Enter Topic Name here "
//                       name="opt_B"
//                       value={inputValues.opt_B}
//                       onChange={handleData}
//                     />
//                   </span>

//                   <input type="text " className="short" placeholder="C" />
//                   <input
//                     type="text"
//                     className=" small "
//                     placeholder="Enter Topic Name here "
//                     name="opt_C"
//                     value={inputValues.opt_C}
//                     onChange={handleData}
//                   />
//                   <span>
//                     <input
//                       type="text "
//                       className="short short-box"
//                       placeholder="D"
//                     />
//                     <input
//                       type="text"
//                       className=" small "
//                       placeholder="Enter Topic Name here "
//                       name="opt_D"
//                       value={inputValues.opt_D}
//                       onChange={handleData}
//                     />
//                   </span>
//                 </div>
//               )}
//               {selectedOption.value === "fillups" && (
//                 <div>
//                   <p>Please fill the correct Answer:</p>
//                   <input type="text" placeholder="Your answer" />
//                 </div>
//               )}
//               {selectedOption.value === "oword" && (
//                 <div>
//                   <p>Please fill the correct One Word Answer:</p>
//                   <input type="text" placeholder="Your answer" />
//                 </div>
//               )}
//               <label htmlFor="">Correct Answer: </label>
//               <input
//                 type="text"
//                 className="margin  "
//                 placeholder="Enter Topic Name here "
//                 name="correct_Answer"
//                 value={inputValues.correct_Answer}
//                 onChange={handleData}
//               />
//               <label htmlFor=""> Remarks: </label>
//               <input
//                 type="text"
//                 className="margin  "
//                 placeholder="Enter Topic Name here "
//                 name="remarks"
//                 value={inputValues.remarks}
//                 onChange={handleData}
//               />
//               <span>
//                 <center>
//                   <Button
//                     className="button1 buton "
//                     variant="primary"
//                     onClick={handleSubmit}
//                     onChange={handleClose}
//                   >
//                     Add
//                   </Button>
//                   <button
//                     type="reset"
//                     value="Reset Form"
//                     className="button2 buttonn"
//                   >
//                     Reset
//                   </button>
//                 </center>
//               </span>
//             </fieldset>
//           </Modal>

//           {/* edit modal form */}

//           <Modal
//             isOpen={modalsIsOpen}
//             onAfterOpen={afterOpenModals}
//             onRequestClose={closeModals}
//             style={customStyles}
//             contentLabel="Example Modal"
//           >
//             <form onSubmit={handleFormSubmit}>
//               <fieldset>
//                 <h1 className="h1">Knowledge Test Quiz</h1>
//                 <br />
//                 <div className="drop">
//                   <label htmlFor=""> Select Topic: </label>

//                   <Select
//                     options={options}
//                     placeholder="Select Topic"
//                     isSearchable={true}
//                     value={[selectOptions, formData.topic_ID]}
//                     onChange={handleChoose}
//                     className="dropdown "
//                   />
//                 </div>
//                 <br />
//                 <div className="drop">
//                   <label htmlFor=""> Select Typee:</label>
//                   <Select
//                     options={option}
//                     placeholder="Select Type"
//                     isSearchable={true}
//                     value={([formData.quesType_ID], selectedOption)}
//                     onChange={handleDropdownChange}
//                     className="dropdown "
//                     name="quesType_ID"
//                   />
//                 </div>
//                 <br />
//                 <h3>Question Description : </h3>
//                 <input
//                   type="text"
//                   className="margin  "
//                   placeholder="Enter ques Name here "
//                   name="ques_Desc"
//                   value={formData.ques_Desc}
//                   onChange={handleInputChange}
//                 />{" "}
//                 <h3>Answer Option</h3>
//                 {selectedOption.value === "mcq" && (
//                   <div>
//                     <input type="text " className="short" placeholder="A" />
//                     <input
//                       type="text"
//                       className=" small "
//                       placeholder="Enter Topic Name here "
//                       name="opt_A"
//                       value={formData.opt_A}
//                       onChange={handleInputChange}
//                     />
//                     <span>
//                       <input
//                         type="text "
//                         className="short short-box"
//                         placeholder="B"
//                       />
//                       <input
//                         type="text"
//                         className=" small "
//                         placeholder="Enter Topic Name here "
//                         name="opt_B"
//                         value={formData.opt_B}
//                         onChange={handleInputChange}
//                       />
//                     </span>

//                     <input type="text " className="short" placeholder="C" />
//                     <input
//                       type="text"
//                       className=" small "
//                       placeholder="Enter Topic Name here "
//                       name="opt_C"
//                       value={formData.opt_C}
//                       onChange={handleInputChange}
//                     />
//                     <span>
//                       <input
//                         type="text "
//                         className="short short-box"
//                         placeholder="D"
//                       />
//                       <input
//                         type="text"
//                         className=" small "
//                         placeholder="Enter Topic Name here "
//                         name="opt_D"
//                         value={formData.opt_D}
//                         onChange={handleInputChange}
//                       />
//                     </span>
//                   </div>
//                 )}
//                 {selectedOption.value === "fillups" && (
//                   <div>
//                     <p>Please fill the correct Answer:</p>
//                     <input type="text" placeholder="Your answer" />
//                   </div>
//                 )}
//                 {selectedOption.value === "oword" && (
//                   <div>
//                     <p>Please fill the correct One Word Answer:</p>
//                     <input type="text" placeholder="Your answer" />
//                   </div>
//                 )}
//                 <label htmlFor="">Correct Answer: </label>
//                 <input
//                   type="text"
//                   className="margin  "
//                   placeholder="Enter Topic Name here "
//                   name="correct_Answer"
//                   value={formData.correct_Answer}
//                   onChange={handleInputChange}
//                 />
//                 <label htmlFor=""> Remarks: </label>
//                 <input
//                   type="text"
//                   className="margin  "
//                   placeholder="Enter Topic Name here "
//                   name="remarks"
//                   value={formData.remarks}
//                   onChange={handleInputChange}
//                 />
//                 <span>
//                   <br />
//                   <button type="submit" className="button1 buton ">
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     className="button2 buttonn "
//                     onClick={handleModalClose}
//                   >
//                     Cancel
//                   </button>
//                 </span>
//               </fieldset>
//             </form>
//           </Modal>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

import Modal from "react-modal";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import apiService from "../../../api";
import "./Table.css";
import Button from "react-bootstrap/Button";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: 500,
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function GetData() {
  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  //edit data
  let subtitles;
  function openModals() {
    setIsOpens(true);
  }
  function closeModals() {
    setIsOpens(false);
  }
  function afterOpenModals() {
    subtitle.style.color = "#f00";
  }
  const handleClose = () => setShow(false);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalsIsOpen, setIsOpens] = React.useState(false);
  const [show, setShow] = useState(false);
  const [myData, setmyData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [inputValues, setInputValues] = useState({
    ques_Desc: "",
    opt_A: "",
    opt_B: "",
    opt_C: "",
    opt_D: "",
    topic_ID: "",
    quesType_ID: "",
    correct_Answer: "",
    remarks: "",
    Status: "",
  });

  const [searchTopic, setSearchTopic] = useState("");
  const [searchQuesType, setSearchQuesType] = useState("");

  const handleData = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async () => {
    inputValues.topic_ID = selectOptions.id;
    inputValues.quesType_ID = selectedOption.id;
    const response = await apiService.post(
      "Question/AddQuestions",
      inputValues
    );
    toast.success(response);
    setIsOpen(false);
    Data();
  };

  const handleDelete = async (ques_ID) => {
    window.alert("Are you sure to want to delete?");
    const response = await apiService.delete(
      `Question/deleteQuestion/${ques_ID}`
    );
    toast.success(response);
    Data();
  };

  const [formData, setFormData] = useState({
    user_ID: "",
    user_Name: "",
    user_Email: "",
    user_Password: "",
    status: "",
    role_ID: "",
  });

  const [selectedRow, setSelectedRow] = useState(null);
  const [selectOptions, setSelectOptions] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [option, setOption] = useState([]);

  const fetchOptions = async () => {
    const data = await apiService.get("Topic/AllTopic");
    const userOptions = data.map((user) => ({
      id: user.topic_ID,
      label: user.topic_Name,
    }));
    setOptions(userOptions);
  };

  const fetchOption = async () => {
    const data = await apiService.get("QuesType/QuesType");
    const userOptions = data.map((user) => ({
      id: user.quesType_ID,
      label: user.quesType_Label,
      value: user.quesType_Value,
    }));
    setOption(userOptions);
  };

  const Data = async () => {
    setLoading(true);
    try {
      const data = await apiService.get("Question/AllQuestions");
      const filteredData = data.filter((item) => {
        const topicMatch = searchTopic
          ? item.topic_Name.toLowerCase().includes(searchTopic.toLowerCase())
          : true;
        const quesTypeMatch = searchQuesType
          ? item.quesType_Label
              .toLowerCase()
              .includes(searchQuesType.toLowerCase())
          : true;

        return topicMatch && quesTypeMatch;
      });
      setmyData(filteredData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
    fetchOption();
    Data();
  }, [searchTopic, searchQuesType]);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setFormData(row);
    openModals();
    const defaultOption = options.find((option) => option.id === row.topic_ID);
    setSelectOptions(defaultOption);
    const defaultOptions = option.find(
      (option) => option.id === row.quesType_ID
    );
    setSelectedOption(defaultOptions);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalClose = () => {
    setIsOpens(false);
    setSelectedRow(null);
    setFormData({});
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    formData.topic_ID = selectOptions.id;
    formData.quesType_ID = selectedOption.id;
    const response = await apiService.put(
      `Question/updateQuestions/${formData.ques_ID}`,
      {
        ques_Desc: formData.ques_Desc,
        opt_A: formData.opt_A,
        opt_B: formData.opt_B,
        opt_C: formData.opt_C,
        opt_D: formData.opt_D,
        correct_Answer: formData.correct_Answer,
        remarks: formData.remarks,
        topic_ID: formData.topic_ID,
        quesType_ID: formData.quesType_ID,
      }
    );
    toast.success(response);
    handleModalClose();
    Data();
  };

  function handleChoose(data) {
    setSelectOptions(data);
  }

  const handleDropdownChange = (data) => {
    setSelectedOption(data);
  };
  return (
    <>
      <ToastContainer />
      <div className="card-body">
        <span>
          <h2> Questions</h2>
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
          </Link>{" "}
        </span>

        <button onClick={openModal} className="btun">
          Add Questions
        </button>
        <div className="search-container">
          <label className="search ">Search By Topic Name: </label>
          <input
            type="text"
            placeholder="Enter Topic Name"
            value={searchTopic}
            onChange={(e) => setSearchTopic(e.target.value)}
            className="search-input"
          />
          <label className="search search-label ">Search By Ques Type: </label>

          <input
            type="text"
            placeholder="Enter Question Type"
            value={searchQuesType}
            onChange={(e) => setSearchQuesType(e.target.value)}
            className="search-input"
          />
        </div>
        {loading && <p className="load">Loading Please Wait...</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th> Topic</th>
              <th>QuesType</th>
              <th>Question Description</th>
              <th> A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>

              <th>Correct Answer</th>
              <th>Remarks</th>

              {/* <th>Status</th> */}

              <th> Edit</th>
              <th> Delete</th>
            </tr>
          </thead>
          <tbody>
            {myData.map((row) => (
              <tr key={row.ques_ID}>
                <td>{row.topic_Name}</td>
                <td>{row.quesType_Label}</td>
                <td>{row.ques_Desc}</td>
                <td>{row.opt_A}</td>
                <td>{row.opt_B}</td>
                <td>{row.opt_C}</td>
                <td>{row.opt_D}</td>

                <td>{row.correct_Answer}</td>
                <td>{row.remarks}</td>
                {/* <td>{row.Status}</td> */}

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
                      onClick={() => handleDelete(row.ques_ID)}
                      className="icon"
                    />
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* modal form add */}
        <div className="modal-content">
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <fieldset>
              <h1 className="h1">Knowledge Test Quiz</h1>
              <br />
              <div className="drop">
                <label htmlFor=""> Select Topic: </label>

                <Select
                  options={options}
                  placeholder="Select Topic"
                  isSearchable={true}
                  value={selectOptions}
                  onChange={handleChoose}
                  className="dropdown "
                />
              </div>
              <br />
              <div className="drop">
                <label htmlFor=""> Select Typee:</label>
                <Select
                  options={option}
                  placeholder="Select Type"
                  isSearchable={true}
                  value={selectedOption}
                  onChange={handleDropdownChange}
                  className="dropdown "
                />
              </div>
              <br />
              <h3>Question Description : </h3>
              <input
                type="text"
                className="margin  "
                placeholder="Enter ques Name here "
                name="ques_Desc"
                value={inputValues.ques_Desc}
                onChange={handleData}
              />{" "}
              <h3>Answer Option</h3>
              {selectedOption.value === "mcq" && (
                <div>
                  <input type="text " className="short" placeholder="A" />
                  <input
                    type="text"
                    className=" small "
                    placeholder="Enter Topic Name here "
                    name="opt_A"
                    value={inputValues.opt_A}
                    onChange={handleData}
                  />
                  <span>
                    <input
                      type="text "
                      className="short short-box"
                      placeholder="B"
                    />
                    <input
                      type="text"
                      className=" small "
                      placeholder="Enter Topic Name here "
                      name="opt_B"
                      value={inputValues.opt_B}
                      onChange={handleData}
                    />
                  </span>

                  <input type="text " className="short" placeholder="C" />
                  <input
                    type="text"
                    className=" small "
                    placeholder="Enter Topic Name here "
                    name="opt_C"
                    value={inputValues.opt_C}
                    onChange={handleData}
                  />
                  <span>
                    <input
                      type="text "
                      className="short short-box"
                      placeholder="D"
                    />
                    <input
                      type="text"
                      className=" small "
                      placeholder="Enter Topic Name here "
                      name="opt_D"
                      value={inputValues.opt_D}
                      onChange={handleData}
                    />
                  </span>
                </div>
              )}
              {selectedOption.value === "fillups" && (
                <div>
                  <p>Please fill the correct Answer:</p>
                  <input type="text" placeholder="Your answer" />
                </div>
              )}
              {selectedOption.value === "oword" && (
                <div>
                  <p>Please fill the correct One Word Answer:</p>
                  <input type="text" placeholder="Your answer" />
                </div>
              )}
              <label htmlFor="">Correct Answer: </label>
              <input
                type="text"
                className="margin  "
                placeholder="Enter Topic Name here "
                name="correct_Answer"
                value={inputValues.correct_Answer}
                onChange={handleData}
              />
              <label htmlFor=""> Remarks: </label>
              <input
                type="text"
                className="margin  "
                placeholder="Enter Topic Name here "
                name="remarks"
                value={inputValues.remarks}
                onChange={handleData}
              />
              <span>
                <center>
                  <Button
                    className="button1 buton "
                    variant="primary"
                    onClick={handleSubmit}
                    onChange={handleClose}
                  >
                    Add
                  </Button>
                  <button
                    type="reset"
                    value="Reset Form"
                    className="button2 buttonn"
                  >
                    Reset
                  </button>
                </center>
              </span>
            </fieldset>
          </Modal>

          {/* edit modal form */}

          <Modal
            isOpen={modalsIsOpen}
            onAfterOpen={afterOpenModals}
            onRequestClose={closeModals}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <form onSubmit={handleFormSubmit}>
              <fieldset>
                <h1 className="h1">Knowledge Test Quiz</h1>
                <br />
                <div className="drop">
                  <label htmlFor=""> Select Topic: </label>

                  <Select
                    options={options}
                    placeholder="Select Topic"
                    isSearchable={true}
                    value={[selectOptions, formData.topic_ID]}
                    onChange={handleChoose}
                    className="dropdown "
                  />
                </div>
                <br />
                <div className="drop">
                  <label htmlFor=""> Select Typee:</label>
                  <Select
                    options={option}
                    placeholder="Select Type"
                    isSearchable={true}
                    value={([formData.quesType_ID], selectedOption)}
                    onChange={handleDropdownChange}
                    className="dropdown "
                    name="quesType_ID"
                  />
                </div>
                <br />
                <h3>Question Description : </h3>
                <input
                  type="text"
                  className="margin  "
                  placeholder="Enter ques Name here "
                  name="ques_Desc"
                  value={formData.ques_Desc}
                  onChange={handleInputChange}
                />{" "}
                <h3>Answer Option</h3>
                {selectedOption.value === "mcq" && (
                  <div>
                    <input type="text " className="short" placeholder="A" />
                    <input
                      type="text"
                      className=" small "
                      placeholder="Enter Topic Name here "
                      name="opt_A"
                      value={formData.opt_A}
                      onChange={handleInputChange}
                    />
                    <span>
                      <input
                        type="text "
                        className="short short-box"
                        placeholder="B"
                      />
                      <input
                        type="text"
                        className=" small "
                        placeholder="Enter Topic Name here "
                        name="opt_B"
                        value={formData.opt_B}
                        onChange={handleInputChange}
                      />
                    </span>

                    <input type="text " className="short" placeholder="C" />
                    <input
                      type="text"
                      className=" small "
                      placeholder="Enter Topic Name here "
                      name="opt_C"
                      value={formData.opt_C}
                      onChange={handleInputChange}
                    />
                    <span>
                      <input
                        type="text "
                        className="short short-box"
                        placeholder="D"
                      />
                      <input
                        type="text"
                        className=" small "
                        placeholder="Enter Topic Name here "
                        name="opt_D"
                        value={formData.opt_D}
                        onChange={handleInputChange}
                      />
                    </span>
                  </div>
                )}
                {selectedOption.value === "fillups" && (
                  <div>
                    <p>Please fill the correct Answer:</p>
                    <input type="text" placeholder="Your answer" />
                  </div>
                )}
                {selectedOption.value === "oword" && (
                  <div>
                    <p>Please fill the correct One Word Answer:</p>
                    <input type="text" placeholder="Your answer" />
                  </div>
                )}
                <label htmlFor="">Correct Answer: </label>
                <input
                  type="text"
                  className="margin  "
                  placeholder="Enter Topic Name here "
                  name="correct_Answer"
                  value={formData.correct_Answer}
                  onChange={handleInputChange}
                />
                <label htmlFor=""> Remarks: </label>
                <input
                  type="text"
                  className="margin  "
                  placeholder="Enter Topic Name here "
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                />
                <span>
                  <br />
                  <button type="submit" className="button1 buton ">
                    Save
                  </button>
                  <button
                    type="button"
                    className="button2 buttonn "
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                </span>
              </fieldset>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}
