import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const url = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    user_Name: "",
    user_Email: "",
    user_Password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    const response = await axios.post(`${url}/Users/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // localStorage.setItem("token", response.token);
    console.log("formData", response.data);
    toast.success(response.data.message);
    // console.log("formData", formData);
  };
  return (
    <div>
      <ToastContainer />
      <img src="../assets/images/pic1.jpg" alt="" />
      <div className="login-wrapper">
        <div className="login-form-container">
          <h3 className="login-title">Register Here</h3>
          <br />
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="label">User_Name</Form.Label>
              <Form.Control
                type="name"
                name="user_Name"
                placeholder="Enter name"
                value={formData.User_Name}
                className="input"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="label">User_Email</Form.Label>
              <br />
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="user_Email"
                onChange={handleChange}
                value={formData.User_Email}
                className="input"
                required
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="label">User_Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=" Enter Password"
                className="input"
                name="user_Password"
                value={formData.User_Password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <span className="align">Already Have Account?</span>
            <Link to="/">
              <a href="" className="align">
                Login here
              </a>
            </Link>
            <p className="align">or</p>

            <Button variant="primary" type="submit" className="login-button">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;

// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import "./Register.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Register() {
//   const url = import.meta.env.VITE_BASE_URL;
//   const [formData, setFormData] = useState({
//     user_Name: "",
//     user_Email: "",
//     user_Password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccess(null);

//     try {
//       const response = await axios.post(`${url}/Users/register`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success(response.data.message);

//       // Assuming you have an endpoint to send the confirmation email
//       await axios.post(`${url}/Users/send-confirmation-email`, {
//         email: formData.user_Email,
//       });

//       toast.success("Confirmation email sent!");

//       // Optionally, navigate to a different page or clear the form
//       navigate("/");
//     } catch (error) {
//       toast.error("Registration failed. Please try again.");
//       console.error("Registration error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <ToastContainer />
//       <img src="../assets/images/pic1.jpg" alt="" />
//       <div className="login-wrapper">
//         <div className="login-form-container">
//           <h3 className="login-title">Register Here</h3>
//           <br />
//           <Form onSubmit={handleSubmit} className="login-form">
//             <Form.Group className="mb-3" controlId="formBasicName">
//               <Form.Label className="label">User_Name</Form.Label>
//               <Form.Control
//                 type="name"
//                 name="user_Name"
//                 placeholder="Enter name"
//                 value={formData.user_Name} // Corrected key to match state
//                 className="input"
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <br />
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label className="label">User_Email</Form.Label>
//               <br />
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 name="user_Email"
//                 onChange={handleChange}
//                 value={formData.user_Email} // Corrected key to match state
//                 className="input"
//                 required
//               />
//             </Form.Group>
//             <br />
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label className="label">User_Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder=" Enter Password"
//                 className="input"
//                 name="user_Password"
//                 value={formData.user_Password} // Corrected key to match state
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <br />
//             <span className="align">Already Have Account?</span>
//             <Link to="/">
//               <a href="" className="align">
//                 Login here
//               </a>
//             </Link>
//             <p className="align">or</p>

//             <Button
//               variant="primary"
//               type="submit"
//               className="login-button"
//               disabled={loading}
//             >
//               {loading ? "Registering..." : "Register"}
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;
