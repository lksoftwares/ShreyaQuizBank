import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiService from "../../api";

function Login() {
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    userRole: "",
    user_Email: "",
    user_Password: "",
    errors: "",
  });
  const handlechng = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // get roles
  const [selectOptions, setSelectOptions] = useState("");
  function handleChoose(data) {
    console.log(data);
    setSelectOptions(data);
  }
  const [options, setOptions] = useState([]);

  const fetchOptions = async () => {
    const data = await apiService.get("Roles/getallrole");
    const userOptions = data.map((user) => ({
      id: user.role_ID,
      label: user.roleName,
    }));

    setOptions(userOptions);
  };
  useEffect(() => {
    fetchOptions();
  }, []);
  //post data
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const handleSubmit = async (e) => {
    // const token = localStorage.getItem("token");

    e.preventDefault();

    setLoading(true);
    setSuccess(null);

    try {
      formData.role_ID = selectOptions.id;
      console.log("formData", formData.role_ID);
      console.log("formdata", formData);
      // POST request to the registration endpoint
      const response = await axios.post(`${url}/Users/Login`, formData);
      toast.warning(response.data);
      console.log("formData546", response.data.token);
      console.log("gtrdf", response.data);
      setSuccess("Registration successful!");
      localStorage.setItem("ID", response.data.user_id);
      localStorage.setItem("Roleid", response.data.role_ID);
      console.log("Roleid", response.data.role_ID);
      console.log(response.data.user_id);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data);
      localStorage.getItem("Roleid");
      // const tuk = response.data.token;
      // const decodedToken = jwtDecode(tuk);
      // console.log(
      //   " decodedToken.RoleID;  decodedToken.RoleID; ",
      //   decodedToken.role_ID
      // );

      const Role_Id = response.data.role_ID;
      console.log(Role_Id);

      if (Role_Id === 5) {
        navigate("/admin");
      } else {
        navigate("/user/home");
      }
    } catch (errors) {
      toast.error(
        "You have entered invalid information...Please enter valid details"
      );
      console.log(errors);
    } finally {
      setLoading(false);
    }
  };
  // const Token =response.token

  return (
    <div>
      <ToastContainer />
      <img src="../assets/images/pic1.jpg" alt="" />

      <div className="login-wrapper log">
        <div className="login-form-container">
          <br />

          <h3 className="login-title">Login Here</h3>
          <br />
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="label">UserRole :</Form.Label>
              <Select
                options={options}
                type="text"
                name="userRole"
                placeholder="Select userRole"
                value={[formData.userRole, selectOptions]}
                className="input"
                isSearchable={true}
                onChange={handleChoose}
                required
              />
            </Form.Group>
            <br />
            <br /> <br />
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="label">Username :</Form.Label>
              <Form.Control
                type="email"
                name="user_Email"
                placeholder="Enter username"
                value={formData.user_Email}
                className="input input2"
                onChange={handlechng}
                required
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="label">Password :</Form.Label>
              <Form.Control
                type="password"
                placeholder=" Enter Password"
                className="input"
                name="user_Password"
                value={formData.user_Password}
                onChange={handlechng}
                required
              />
            </Form.Group>
            <br />
            <span className="align">Don't Have Account?</span>
            <Link to="/register">
              <a href="" className="align">
                Register
              </a>
            </Link>
            <Button variant="primary" type="submit" className="login-button">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
