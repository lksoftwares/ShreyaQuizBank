import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import data from "/src/data.json";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

import "./Table.css";
// import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Label } from "recharts";
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
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  //edit data
  let subtitles;
  const [modalsIsOpen, setIsOpens] = React.useState(false);
  function openModals() {
    setIsOpens(true);
  }
  function closeModals() {
    setIsOpens(false);
  }
  function afterOpenModals() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [myData, setmyData] = useState([]);
  const [loading, setLoading] = useState(false);

  //get data
  const Data = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await axios({
        url: "http://192.168.1.54:7241/Question/AllQuestions",
        method: "GET",
        data: myData,

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        setmyData(response.data);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
  const handleData = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  //post data

  const handleSubmit = async (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();

    try {
      inputValues.topic_ID = selectOptions.id;

      inputValues.quesType_ID = selectedOption.id;

      console.log("inputValues.topic_ID", inputValues.topic_ID);

      const response = await axios.post(
        "http://192.168.1.54:7241/Question/AddQuestions",

        inputValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Data();

      toast.success(response.data);

      console.log("Response:", response.data);
    } catch {
      toast.error(response.data);
    }
  };

  //delete data

  const handleDelete = async (ques_ID) => {
    const token = localStorage.getItem("token");

    window.alert("Are you sure to want to delete?");
    await axios.delete(
      `http://192.168.1.54:7241/Question/deleteQuestion/${ques_ID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    Data()
      .then((response) => {
        toast.success("Deleted Successfully");
      })
      .catch((err) => console.log(err));
  };

  //get topic
  const [selectOptions, setSelectOptions] = useState("");
  function handleChoose(data) {
    setSelectOptions(data);
  }

  const [options, setOptions] = useState([]);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios({
          method: "get",
          url: "http://192.168.1.54:7241/Topic/AllTopic",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userOptions = response.data.map((user) => ({
          id: user.topic_ID,
          label: user.topic_Name,
        }));
        setOptions(userOptions);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchOptions();
  }, []);

  //For type
  const [selectedOption, setSelectedOption] = useState("");
  const handleDropdownChange = (data) => {
    setSelectedOption(data);
  };
  const [option, setOption] = useState([]);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios({
          method: "get",
          url: "http://192.168.1.54:7241/QuesType/QuesType",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userOptions = response.data.map((user) => ({
          id: user.quesType_ID,
          label: user.quesType_Label,
          value: user.quesType_Value,
        }));
        setOption(userOptions);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchOptions();
  }, []);

  //update data
  const [formData, setFormData] = useState({
    user_ID: "",
    user_Name: "",
    user_Email: "",
    user_Password: "",
    status: "",
    role_ID: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setFormData(row);
    openModals();
  };
  // const handleModalClose = () => {
  //   setModalVisible(false);
  //   setSelectedRow(null);
  //   setFormData({});
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("formData", formData);
    try {
      formData.topic_ID = selectOptions.id;
      formData.quesType_ID = selectedOption.id;

      const res = await axios.put(
        `http://192.168.1.54:7241/Question/updateQuestions/${formData.ques_ID}`,

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
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Data();

      console.log(res.data);
      toast.success("Edited Successfully");

      // Close modal
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  useEffect(() => {
    Data();
  }, []);

  //status dropdown
  // const [selectedOptions, setSelectedOptions] = useState({
  //   Label: "",
  // });

  // function handleSelect(data) {
  //   console.log("daataaaa", data);

  //   setSelectedOptions(data);
  // }

  return (
    <>
      <ToastContainer />
      <div className="card-body">
        <span>
          <h2> Questions</h2>
          <button onClick={openModal} className="btun">
            Add Questions
          </button>
        </span>{" "}
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
                    value={[selectedOption, formData.quesType_ID]}
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
                  <button type="button" className="button2 buttonn ">
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
