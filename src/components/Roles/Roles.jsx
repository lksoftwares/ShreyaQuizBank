import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AddDepartment/Table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import ReactDOM from "react-dom";
import Modal from "react-modal";
// import Modal from "react-bootstrap/Modal";
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
export default function Roles() {
  const [myData, setmyData] = useState([]);
  const [show, setShow] = useState(false);
  const [inputValues, setInputValues] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleData = (e) => {
    setInputValues(e.target.value);
  };

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
  const [loading, setLoading] = useState(false);

  //get data
  const Data = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await axios({
        url: "http://192.168.1.54:7241/Roles/getallrole",
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
  useEffect(() => {
    Data();
  }, []);

  //post data
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://192.168.1.54:7241/Roles/AddRole",

        { roleName: inputValues },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Data();
      toast.success(response.data);
    } catch {
      console.error();
    }
  };

  //delete data

  const handleDelete = async (role_ID) => {
    const token = localStorage.getItem("token");

    window.alert("Are you sure to want to delete?");
    await axios.delete(`http://192.168.1.54:7241/Roles/deleteRole/${role_ID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Data()
      .then((response) => {
        toast.success("Deleted Successfully");
      })
      .catch((err) => console.log(err));
  };

  //edit data
  // update data

  // const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    topic_ID: "",
    topic_Name: "",
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
      const res = await axios.put(
        `http://192.168.1.54:7241/Roles/updateRole/${formData.role_ID}`,

        { roleName: formData.roleName },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Data()
        .then((response) => {
          toast.success("Edited Successfully");
          fetchData(); // Refresh data
          handleModalClose();
        })
        .catch((err) => {
          console.log(err);
        });
      // Close modal
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  useEffect(() => {
    Data();
  }, []);

  return (
    <>
      <div>
        <ToastContainer></ToastContainer>
        <div className="card-body">
          <span>
            {" "}
            <h2> Roles</h2>
            <button onClick={openModal} className="btun">
              Add Roles{" "}
            </button>
          </span>
          {loading && <p className="load">Loading Please Wait...</p>}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {myData.map((row) => (
                <tr key={row.role_ID}>
                  <td>{row.roleName}</td>
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
                        onClick={() => handleDelete(row.role_ID)}
                        className="icon"
                      />
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* edit modal */}

        <Modal
          isOpen={modalsIsOpen}
          onAfterOpen={afterOpenModals}
          onRequestClose={closeModals}
          style={customStyles}
        >
          <form onSubmit={handleFormSubmit}>
            <center>
              {" "}
              <h1>Edit Users</h1>
            </center>
            <hr />
            <br />
            <label className="fonts">
              RoleName:
              <br />
              <br />
              <input
                type="text"
                name="roleName"
                className="mar inputt"
                value={formData.roleName}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit" className="button1 buton1 ">
              Save
            </button>
            <button type="button" className="button2 buttonn1 ">
              Cancel
            </button>
          </form>
        </Modal>

        {/* add modal */}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <center>
            {" "}
            <h1>Add Role</h1>
          </center>
          <hr />
          <br />
          <label htmlFor="" className="fonts">
            Role Name :
          </label>
          <br />
          <br />
          <input
            type="text"
            className="mar inputt"
            placeholder="Enter Topic Name here "
            name="roleName"
            value={inputValues}
            onChange={handleData}
          />
          <center>
            <Button
              className="button1 buton1 "
              variant="primary"
              onClick={handleSubmit}
              onChange={handleClose}
            >
              Add
            </Button>
            <Button
              variant="danger"
              onClick={handleClose}
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
