import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Users/user.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import Select from "react-select";

// import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: 690,
    height: 400,
    backgroundColor: "#384256",
    color: "white",
    borderColor: "Black",

    bottom: "auto",

    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function User() {
  const [myData, setmyData] = useState([]);
  const [show, setShow] = useState(false);
  const [inputValues, setInputValues] = useState("");
  const token = localStorage.getItem("token");

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
    setLoading(true);

    try {
      const res = await axios({
        url: "http://192.168.1.54:7241/Users/AllUSers",
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

  //delete data

  const handleDelete = async (user_ID) => {
    const token = localStorage.getItem("token");

    window.alert("Are you sure to want to delete?");
    await axios.delete(`http://192.168.1.54:7241/Users/deleteUser/${user_ID}`, {
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
  const [formData, setFormData] = useState({
    user_ID: "",
    user_Name: "",
    user_Email: "",
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
      formData.role_ID = selectOptions.id;
      console.log("formData.role_ID", formData.role_ID);

      const res = await axios.put(
        `http://192.168.1.54:7241/Users/updateUsers/${formData.user_ID}`,

        {
          user_Name: formData.user_Name,
          user_Email: formData.user_Email,
          status: formData.status,
          role_ID: formData.role_ID,
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

  //get roles
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
          url: "http://192.168.1.54:7241/Roles/getallrole",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userOptions = response.data.map((user) => ({
          id: user.role_ID,
          label: user.roleName,
        }));
        setOptions(userOptions);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchOptions();
  }, []);

  return (
    <>
      <div>
        <ToastContainer></ToastContainer>
        <div className="card-body">
          <span>
            {" "}
            <h2> Users</h2>
          </span>
          {loading && <p className="load">Loading Please Wait...</p>}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>UserName</th>
                <th>Email</th>
                <th>Status</th>
                <th>UserRole</th>

                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {myData.map((row) => (
                <tr key={row.user_ID}>
                  <td>{row.user_Name}</td>
                  <td>{row.user_Email}</td>

                  <td>{row.status == 1 ? "Active" : "Deactive"}</td>
                  <td>{row.userRole}</td>

                  <td>
                    <center>
                      <BsPencilSquare
                        onClick={() => handleEditClick(row)}
                        className="icon1 "
                      />
                    </center>
                  </td>

                  <td>
                    <center>
                      <MdDelete
                        onClick={() => handleDelete(row.user_ID)}
                        className="icon"
                      />
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={modalsIsOpen}
          onAfterOpen={afterOpenModals}
          onRequestClose={closeModals}
          style={customStyles}
        >
          <form onSubmit={handleFormSubmit}>
            <center>
              {" "}
              <h1>Edit Topics</h1>
            </center>
            <hr />
            <br />{" "}
            <label className="fonts">
              UserName:
              <br />
              <input
                type="text"
                name="user_Name"
                className="mar "
                value={formData.user_Name}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label className="fonts">
              UserEmail:
              <br />
              <input
                type="text"
                name="user_Email"
                className="mar "
                value={formData.user_Email}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label className="fonts">
              UserPassword:
              <br />
              <input
                type="text"
                name="user_Password"
                className="mar "
                value={formData.user_Password}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label className="fonts">
              Status:
              <br />
              <input
                type="text"
                name="status"
                className="mar "
                value={formData.status}
                onChange={handleInputChange}
              />
            </label>{" "}
            <br />
            <label className="fonts"> Select users: </label>
            <Select
              options={options}
              placeholder="Select Topic"
              isSearchable={true}
              value={[selectOptions, formData.role_ID]}
              onChange={handleChoose}
              className="color"
            />
            <br />
            <button type="submit" className="button1 button ">
              Save
            </button>
            <button type="button" className="button2 ">
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    </>
  );
}
