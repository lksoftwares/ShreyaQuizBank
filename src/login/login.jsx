// import React, { useState, useEffect } from "react";
// import { Form, Button } from "react-bootstrap";
// import "./Login.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import apiService from "../../api";

// function Login() {
//   const token = localStorage.getItem("token");
//   const url = import.meta.env.VITE_BASE_URL;

//   const [formData, setFormData] = useState({
//     userRole: "",
//     user_Email: "",
//     user_Password: "",
//     errors: "",
//   });
//   const handlechng = (e) => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   // get roles
//   const [selectOptions, setSelectOptions] = useState("");
//   function handleChoose(data) {
//     console.log(data);
//     setSelectOptions(data);
//   }
//   const [options, setOptions] = useState([]);

//   const fetchOptions = async () => {
//     const data = await apiService.get("Roles/getallrole");
//     const userOptions = data.map((user) => ({
//       id: user.role_ID,
//       label: user.roleName,
//     }));

//     setOptions(userOptions);
//   };
//   useEffect(() => {
//     fetchOptions();
//   }, []);
//   //post data
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);
//   const handleSubmit = async (e) => {
//     // const token = localStorage.getItem("token");

//     e.preventDefault();

//     setLoading(true);
//     setSuccess(null);

//     try {
//       formData.role_ID = selectOptions.id;
//       const response = await axios.post(`${url}/Users/Login`, formData);
//       toast.warning(response.data);

//       setSuccess("Registration successful!");
//       localStorage.setItem("ID", response.data.user_id);
//       localStorage.setItem("Roleid", response.data.role_ID);
//       localStorage.setItem("token", response.data.token);
//       toast.success(response.data);
//       localStorage.getItem("Roleid");

//       const Role_Id = response.data.role_ID;
//       console.log(Role_Id);

//       if (Role_Id === 5) {
//         navigate("/admin");
//       } else {
//         navigate("/user/home");
//       }
//     } catch (errors) {
//       toast.error(
//         "You have entered invalid information...Please enter valid details"
//       );
//       console.log(errors);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <ToastContainer />
//       <img src="../assets/images/pic1.jpg" alt="" />

//       <div className="login-wrapper log">
//         <div className="login-form-container">
//           <br />

//           <h3 className="login-title">Login Here</h3>
//           <br />
//           <Form onSubmit={handleSubmit} className="login-form">
//             <Form.Group className="mb-3" controlId="formBasicUsername">
//               <Form.Label className="label">UserRole :</Form.Label>
//               <Select
//                 options={options}
//                 type="text"
//                 name="userRole"
//                 placeholder="Select userRole"
//                 value={[formData.userRole, selectOptions]}
//                 className="input"
//                 isSearchable={true}
//                 onChange={handleChoose}
//                 required
//               />
//             </Form.Group>
//             <br />
//             <br /> <br />
//             <Form.Group className="mb-3" controlId="formBasicUsername">
//               <Form.Label className="label">Username :</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="user_Email"
//                 placeholder="Enter username"
//                 value={formData.user_Email}
//                 className="input input2"
//                 onChange={handlechng}
//                 required
//               />
//             </Form.Group>
//             <br />
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label className="label">Password :</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder=" Enter Password"
//                 className="input"
//                 name="user_Password"
//                 value={formData.user_Password}
//                 onChange={handlechng}
//                 required
//               />
//             </Form.Group>
//             <br />
//             <span className="align">Don't Have Account?</span>
//             <Link to="/register">
//               <a href="" className="align">
//                 Register
//               </a>
//             </Link>
//             <Button variant="primary" type="submit" className="login-button">
//               Login
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
// import React, { useState, useEffect } from "react";
// import { Form, Button } from "react-bootstrap";
// import "./Login.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import apiService from "../../api";
// import { encryptToken } from "../utils/crytoutils"; // Import encryptToken

// function Login() {
//   const url = import.meta.env.VITE_BASE_URL;

//   const [formData, setFormData] = useState({
//     userRole: "",
//     user_Email: "",
//     user_Password: "",
//     errors: "",
//   });

//   const handleChange = (e) => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const [selectOptions, setSelectOptions] = useState("");
//   function handleChoose(data) {
//     setSelectOptions(data);
//   }

//   const [options, setOptions] = useState([]);

//   const fetchOptions = async () => {
//     const data = await apiService.get("Roles/getallrole");
//     const userOptions = data.map((user) => ({
//       id: user.role_ID,
//       label: user.roleName,
//     }));

//     setOptions(userOptions);
//   };

//   useEffect(() => {
//     fetchOptions();
//   }, []);

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccess(null);

//     try {
//       formData.role_ID = selectOptions.id;
//       const response = await axios.post(`${url}/Users/Login`, formData);
//       toast.warning(response.data);

//       setSuccess("Registration successful!");
//       localStorage.setItem("ID", response.data.user_id);
//       localStorage.setItem("Roleid", response.data.role_ID);

//       // Encrypt the token before storing it
//       const encryptedToken = encryptToken(response.data.token);
//       localStorage.setItem("token", encryptedToken);

//       toast.success(response.data);

//       const Role_Id = response.data.role_ID;
//       console.log(Role_Id);

//       if (Role_Id === 5) {
//         navigate("/admin");
//       } else {
//         navigate("/user/home");
//       }
//     } catch (errors) {
//       toast.error(
//         "You have entered invalid information...Please enter valid details"
//       );
//       console.log(errors);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <ToastContainer />
//       <img src="../assets/images/pic1.jpg" alt="" />
//       <div className="login-wrapper log">
//         <div className="login-form-container">
//           <br />
//           <h3 className="login-title">Login Here</h3>
//           <br />
//           <Form onSubmit={handleSubmit} className="login-form">
//             <Form.Group className="mb-3" controlId="formBasicUsername">
//               <Form.Label className="label">UserRole :</Form.Label>
//               <Select
//                 options={options}
//                 name="userRole"
//                 placeholder="Select userRole"
//                 value={selectOptions}
//                 className="input"
//                 isSearchable={true}
//                 onChange={handleChoose}
//                 required
//               />
//             </Form.Group>
//             <br />
//             <br />
//             <br />
//             <Form.Group className="mb-3" controlId="formBasicUsername">
//               <Form.Label className="label">Username :</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="user_Email"
//                 placeholder="Enter username"
//                 value={formData.user_Email}
//                 className="input input2"
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <br />
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label className="label">Password :</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder=" Enter Password"
//                 className="input"
//                 name="user_Password"
//                 value={formData.user_Password}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <br />
//             <span className="align">Don't Have Account?</span>
//             <Link to="/register">
//               <a href="#" className="align">
//                 Register
//               </a>
//             </Link>
//             <Button variant="primary" type="submit" className="login-button">
//               Login
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import apiService from "../../api";
import { encryptToken } from "../utils/crytoutils";
import { useAuth } from "../auth"; // Import the AuthContext

function Login() {
  const url = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    userRole: "",
    user_Email: "",
    user_Password: "",
  });

  const [selectOptions, setSelectOptions] = useState(null);
  const [options, setOptions] = useState([]);

  const { login } = useAuth(); // Get the login function from AuthContext
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      const data = await apiService.get("Roles/getallrole");
      const userOptions = data.map((user) => ({
        id: user.role_ID,
        label: user.roleName,
      }));
      setOptions(userOptions);
    };

    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChoose = (data) => {
    setSelectOptions(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!selectOptions) {
        toast.error("Please select a user role.");
        return;
      }

      const response = await axios.post(`${url}/Users/Login`, {
        ...formData,
        role_ID: selectOptions.id,
      });

      const { user_id, role_ID, token } = response.data;

      // Encrypt the token before storing it
      const encryptedToken = encryptToken(token);
      localStorage.setItem("token", encryptedToken);
      localStorage.setItem("ID", user_id);
      localStorage.setItem("Roleid", role_ID);

      // Set user data in Auth context
      login({ user_id, role_ID });

      // Redirect based on role
      if (role_ID === 5) {
        navigate("/admin");
      } else {
        navigate("/user/home");
      }

      toast.success("Login successful!");
    } catch (error) {
      toast.error(
        "You have entered invalid information... Please enter valid details."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <img src="../assets/images/pic1.jpg" alt="" />
      <div className="login-wrapper log ">
        <div className="login-form-container zoom-out">
          <br />
          <h3 className="login-title">Login Here</h3>
          <br /> <br />
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group className="mb-3">
              <Form.Label className="label">UserRole :</Form.Label>
              <Select
                options={options}
                name="userRole"
                placeholder="Select userRole"
                value={selectOptions}
                className="input"
                isSearchable={true}
                onChange={handleChoose}
                required
              />
            </Form.Group>
            <br /> <br />
            <br />
            <Form.Group className="mb-3">
              <Form.Label className="label">Username :</Form.Label>
              <Form.Control
                type="email"
                name="user_Email"
                placeholder="Enter username"
                value={formData.user_Email}
                className="input input2"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3">
              <Form.Label className="label">Password :</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                className="input"
                name="user_Password"
                value={formData.user_Password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <span className="align">Don't Have an Account?</span>
            <Link to="/register" className="align">
              Register
            </Link>
            <Button
              variant="primary"
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
