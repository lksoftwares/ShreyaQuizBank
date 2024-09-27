import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FaSignOutAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import Datetime from "../datetime";

import Modal from "react-modal";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import apiService from "../../../api";
import "./Table.css";
import Button from "react-bootstrap/Button";
import { IoMdAddCircle } from "react-icons/io";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastQuestion = currentPage * itemsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
  const currentQuestions = myData.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(myData.length / itemsPerPage);

  return (
    <>
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
            <h2> Questions</h2>
          </span>
          <div className=" header-top">
            <label className="search ">Search By Topic Name: </label>
            <input
              type="text"
              placeholder="Enter Topic Name"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              className="search-input"
            />

            <button onClick={openModal} className="btton">
              <IoMdAddCircle style={{ fontSize: 22 }} />{" "}
            </button>
          </div>
        </div>
        <br />
        <br /> <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {loading && <div className="loading-circle"></div>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th> S.NO</th>

              <th> Topic</th>
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
            {currentQuestions.map((row, index) => (
              <tr key={row.ques_ID}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td>{row.topic_Name}</td>
                <td>{row.ques_Desc}</td>
                <td>{row.opt_A}</td>
                <td>{row.opt_B}</td>
                <td>{row.opt_C}</td>
                <td>{row.opt_D}</td>
                <td>{row.correct_Answer}</td>
                <td>{row.remarks}</td>
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
          <Footer></Footer>{" "}
        </table>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination"
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        {/* modal form add */}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          className="modal-seet scroll"
        >
          <div className="modal-scroll">
            <fieldset>
              <center>
                <h1 className="labell ">Add Question</h1>
              </center>
              <div className="drop">
                <label htmlFor="" className="labell">
                  {" "}
                  Select Topic:{" "}
                </label>

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
                <label htmlFor="" className="labell">
                  {" "}
                  Select Typee:
                </label>
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
              <h3 className="labell">Question Description : </h3>
              <input
                type="text"
                className="margin  "
                placeholder="Enter ques Name here "
                name="ques_Desc"
                value={inputValues.ques_Desc}
                onChange={handleData}
              />{" "}
              <h3 className="labell">Answer Option</h3>
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
                  <br />
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
              <label htmlFor="" className="labell">
                Correct Answer:{" "}
              </label>
              <input
                type="text"
                className="margin  "
                placeholder="Enter Topic Name here "
                name="correct_Answer"
                value={inputValues.correct_Answer}
                onChange={handleData}
              />{" "}
              <br />
              <label htmlFor="" className="labell">
                {" "}
                Remarks: <br />
              </label>
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
          </div>
        </Modal>
        {/* edit modal form */}
        <Modal
          isOpen={modalsIsOpen}
          onAfterOpen={afterOpenModals}
          onRequestClose={closeModals}
          style={customStyles}
          className="modal-seet scroll"
          contentLabel="Example Modal"
        >
          <form onSubmit={handleFormSubmit}>
            <div className="modal-scroll">
              <fieldset>
                <center>
                  <h1>Edit Question</h1>
                </center>
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
                    <br />
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
                />{" "}
                <br />
                <label htmlFor=""> Remarks: </label>
                <br />
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
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}
