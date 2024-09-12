import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AddDepartment/Table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";

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

export default function GetTopic() {
  const [myData, setMyData] = useState([]);
  const [show, setShow] = useState(false);
  const [inputValues, setInputValues] = useState("");

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalsIsOpen, setIsOpens] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic_ID: "",
    topic_Name: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsOpen(true);

  const handleData = (e) => {
    setInputValues(e.target.value);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setFormData(row);
    setIsOpens(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://192.168.1.54:7241/Topic/updateTopics/${formData.topic_ID}`,
        { topic_Name: formData.topic_Name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await Data();
      toast.success("Edited Successfully");
      setIsOpens(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://192.168.1.54:7241/Topic/AddTopic",
        { Topic_Name: inputValues }
      );
      await Data();
      toast.success(response.data);
      setInputValues("");
      setIsOpen(false); // Close the modal after successful submission
    } catch {
      console.error();
    }
  };

  const handleDelete = async (topic_ID) => {
    const token = localStorage.getItem("token");
    window.alert("Are you sure to want to delete?");
    await axios.delete(
      `http://192.168.1.54:7241/Topic/deleteTopic/${topic_ID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await Data();
    toast.success("Deleted Successfully");
  };

  const Data = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await axios({
        url: "http://192.168.1.54:7241/Topic/AllTopic",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            <h2>Topics</h2>
            <button onClick={() => setIsOpen(true)} className="btun">
              Add Topic
            </button>
          </span>
          {loading && <p className="load">Loading Please Wait...</p>}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Topic Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {myData.map((row) => (
                <tr key={row.topic_ID}>
                  <td>{row.topic_Name}</td>
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
                        onClick={() => handleDelete(row.topic_ID)}
                        className="icon"
                      />
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        <Modal
          isOpen={modalsIsOpen}
          onRequestClose={() => setIsOpens(false)}
          style={customStyles}
        >
          <form onSubmit={handleFormSubmit}>
            <center>
              <h1>Edit Topics</h1>
            </center>
            <hr />
            <br />
            <label className="fonts">
              Topic Name:
              <br />
              <br />
              <input
                type="text"
                name="topic_Name"
                className="mar inputt"
                value={formData.topic_Name}
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

        {/* Add Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
          <center>
            <h1>Add Topics</h1>
          </center>
          <hr />
          <br />
          <label htmlFor="" className="fonts">
            Topic Name :
          </label>
          <br />
          <br />
          <input
            type="text"
            className="mar inputt"
            placeholder="Enter Topic Name here "
            name="topic_Name"
            value={inputValues}
            onChange={handleData}
          />
          <center>
            <Button
              className="button1 buton1 "
              variant="primary"
              onClick={handleSubmit}
            >
              Add
            </Button>
            <Button
              variant="danger"
              onClick={() => setIsOpen(false)}
              className="button2 buttonn1 "
            >
              Close
            </Button>
          </center>
        </Modal>
      </div>
    </>
  );
}
