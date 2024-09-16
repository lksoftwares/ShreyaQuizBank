import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AddDepartment/Table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import apiService from "../../../api";

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
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_BASE_URL;
  const [myData, setmyData] = useState([]);
  const [inputValues, setInputValues] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalsIsOpen, setModalsIsOpen] = useState(false);
  const [formData, setFormData] = useState({ role_ID: "", roleName: "" });
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setModalIsOpen(false);
  const handleShow = () => setModalIsOpen(true);

  const handleModalsClose = () => setModalsIsOpen(false);
  const handleModalsOpen = () => setModalsIsOpen(true);

  const handleData = (e) => {
    setInputValues(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  // Fetch all topics
  const Data = async () => {
    setLoading(true);
    const data = await apiService.get("Roles/getallrole");
    const filteredData = data.filter((role) =>
      role.roleName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setmyData(filteredData);
    setLoading(false);
  };
  useEffect(() => {
    Data();
  }, [searchQuery]);

  //add roles
  const handleSubmit = async () => {
    const response = await apiService.post("Roles/AddRole", {
      roleName: inputValues,
    });
    toast.success(response);
    handleClose();
    Data();
  };

  //delete roles
  const handleDelete = async (role_ID) => {
    window.alert("Are you sure you want to delete?");
    const response = await apiService.delete(`Roles/deleteRole/${role_ID}`);
    toast.success(response);
    Data();
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setFormData(row);
    handleModalsOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //update data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.put(
      `Roles/updateRole/${formData.role_ID}`,
      {
        roleName: formData.roleName,
      }
    );
    toast.success(response);
    handleModalsClose();
    Data();
  };

  return (
    <>
      <div>
        <ToastContainer />
        <div className="card-body">
          <span>
            <h2>Roles</h2>
            <button onClick={handleShow} className="btun">
              Add Roles
            </button>
          </span>
          <label className="search">Search Roles: </label>
          <input
            type="text"
            placeholder="Search by Role Name"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
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

        {/* Edit Modal */}
        <Modal
          isOpen={modalsIsOpen}
          onRequestClose={handleModalsClose}
          style={customStyles}
          className="modall"
          contentLabel="Edit Role"
        >
          <form onSubmit={handleFormSubmit}>
            <center>
              <h1>Edit Role</h1>
            </center>
            <hr />
            <label className="fonts">
              Role Name:
              <br />
              <input
                type="text"
                name="roleName"
                className="mar inputt"
                value={formData.roleName}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit" className="button1 buton1">
              Save
            </button>
            <button
              type="button"
              className="button2 buttonn1"
              onClick={handleModalsClose}
            >
              Cancel
            </button>
          </form>
        </Modal>

        {/* Add Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleClose}
          style={customStyles}
          contentLabel="Add Role"
          className="modall"
        >
          <center>
            <h1>Add Role</h1>
          </center>
          <hr />
          <label htmlFor="" className="fonts">
            Role Name:
          </label>
          <br />
          <input
            type="text"
            className="mar inputt"
            placeholder="Enter Role Name here"
            value={inputValues}
            onChange={handleData}
          />
          <center>
            <Button
              className="button1 buton1"
              variant="primary"
              onClick={handleSubmit}
            >
              Add
            </Button>
            <Button
              variant="danger"
              onClick={handleClose}
              className="button2 buttonn1"
            >
              Close
            </Button>
          </center>
        </Modal>
      </div>
    </>
  );
}
