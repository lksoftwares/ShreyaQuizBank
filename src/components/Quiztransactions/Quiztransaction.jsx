// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../Users/user.css";
// import { ToastContainer, toast } from "react-toastify";
// import { BsPencilSquare } from "react-icons/bs";
// import { MdDelete } from "react-icons/md";
// import "react-toastify/dist/ReactToastify.css";
// import Modal from "react-modal";
// import Select from "react-select";
// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",

//     width: 470,
//     height: 300,
//     backgroundColor: "#384256",
//     color: "white",
//     borderColor: "Black",

//     bottom: "auto",

//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };
// export default function Quiztransaction() {
//   const [myData, setmyData] = useState([]);

//   let subtitles;
//   const [modalsIsOpen, setIsOpens] = React.useState(false);
//   function openModals() {
//     setIsOpens(true);
//   }
//   function closeModals() {
//     setIsOpens(false);
//   }
//   function afterOpenModals() {
//     // references are now sync'd and can be accessed.
//     subtitle.style.color = "#f00";
//   }
//   const [loading, setLoading] = useState(false);

//   //get data
//   const Data = async () => {
//     const token = localStorage.getItem("token");
//     setLoading(true);

//     try {
//       const res = await axios({
//         url: "http://192.168.1.54:7241/QuizTransaction/GetAllQuizQuestion",
//         method: "GET",
//         data: myData,

//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }).then((response) => {
//         setmyData(response.data);
//       });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     Data();
//   }, []);

//   //delete data

//   const handleDelete = async (quiz_ID) => {
//     const token = localStorage.getItem("token");

//     window.alert("Are you sure to want to delete?");
//     await axios.delete(
//       `http://192.168.1.54:7241/QuizTransaction/deleteQuizTransaction/${quiz_ID}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     Data()
//       .then((response) => {
//         toast.success("Deleted Successfully");
//       })
//       .catch((err) => console.log(err));
//   };

//   //edit data
//   // update data
//   const [formData, setFormData] = useState({
//     user_ID: "",
//     ques_ID: "",
//     quiz_Date: "",
//   });
//   const [selectedRow, setSelectedRow] = useState(null);

//   const handleEditClick = (row) => {
//     setSelectedRow(row);
//     setFormData(row);
//     openModals();
//   };
//   // const handleModalClose = () => {
//   //   setModalVisible(false);
//   //   setSelectedRow(null);
//   //   setFormData({});
//   // };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     console.log("formData", formData);
//     try {
//       const res = await axios.put(
//         `http://192.168.1.54:7241/QuizTransaction/updateQuizTransaction/${formData.quiz_ID}`,

//         {
//           user_ID: formData.user_ID,
//           ques_ID: formData.ques_ID,
//           quiz_Date: formData.quiz_Date,
//         },

//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       Data();

//       console.log(res.data);
//       toast.success("Edited Successfully");

//       // Close modal
//     } catch (error) {
//       console.error("Error updating data:", error);
//     }
//   };
//   useEffect(() => {
//     Data();
//   }, []);

//   return (
//     <>
//       <div>
//         <ToastContainer></ToastContainer>
//         <div className="card-body">
//           <span>
//             <h2> Quiz Transaction</h2>
//           </span>
//           {loading && <p className="load">Loading Please Wait...</p>}

//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>QuesDate</th>

//                 <th>Quiz Description</th>

//                 <th>UserEmail</th>

//                 <th>Edit</th>
//                 <th>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {myData.map((row) => (
//                 <tr key={row.quiz_ID}>
//                   <td>{row.quiz_Date}</td>

//                   <td>{row.ques_Desc}</td>

//                   <td>{row.user_Email}</td>

//                   <td>
//                     <center>
//                       <BsPencilSquare
//                         onClick={() => handleEditClick(row)}
//                         className="icon1"
//                       />
//                     </center>
//                   </td>
//                   <td>
//                     <center>
//                       <MdDelete
//                         onClick={() => handleDelete(row.quiz_ID)}
//                         className="icon"
//                       />
//                     </center>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* edit modal */}

//         <Modal
//           isOpen={modalsIsOpen}
//           onAfterOpen={afterOpenModals}
//           onRequestClose={closeModals}
//           style={customStyles}
//         >
//           <form onSubmit={handleFormSubmit}>
//             <center>
//               {" "}
//               <h1>Edit Quiz</h1>
//             </center>
//             <hr />
//             <br />
//             <label className="fonts">
//               Quiz Date:
//               <br />
//               <br />
//               <input
//                 type="date"
//                 name="quiz_Date"
//                 className="mar inputt"
//                 value={formData.quiz_Date}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <button type="submit" className="button1 buton1 ">
//               Save
//             </button>
//             <button type="button" className="button2 buttonn1 ">
//               Cancel
//             </button>
//           </form>
//         </Modal>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Users/user.css";
import { ToastContainer, toast } from "react-toastify";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

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

export default function Quiztransaction() {
  const [myData, setMyData] = useState([]);
  const [formData, setFormData] = useState({
    user_ID: "",
    ques_ID: "",
    quiz_Date: "",
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalsIsOpen, setModalsIsOpen] = useState(false);

  // Function to open the modal
  function openModals() {
    setModalsIsOpen(true);
  }

  // Function to close the modal
  function closeModals() {
    setModalsIsOpen(false);
  }

  // Fetch data from the API
  const Data = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const res = await axios({
        url: "http://192.168.1.54:7241/QuizTransaction/GetAllQuizQuestion",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyData(res.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Data();
  }, []);

  // Handle deletion of a quiz transaction
  const handleDelete = async (quiz_ID) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(
          `http://192.168.1.54:7241/QuizTransaction/deleteQuizTransaction/${quiz_ID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Data();
        toast.success("Deleted Successfully");
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Handle edit button click
  const handleEditClick = (row) => {
    setSelectedRow(row);
    setFormData(row);
    openModals();
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://192.168.1.54:7241/QuizTransaction/updateQuizTransaction/${formData.quiz_ID}`,
        {
          user_ID: formData.user_ID,
          ques_ID: formData.ques_ID,
          quiz_Date: formData.quiz_Date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Data();
      toast.success("Edited Successfully");
      closeModals(); // Close modal on successful save
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
        <div className="card-body">
          <span>
            <h2>Quiz Transaction</h2>
          </span>
          {loading && <p className="load">Loading Please Wait...</p>}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Quiz Date</th>
                <th>Quiz Description</th>
                <th>User Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {myData.map((row) => (
                <tr key={row.quiz_ID}>
                  <td>{row.quiz_Date}</td>
                  <td>{row.ques_Desc}</td>
                  <td>{row.user_Email}</td>
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
                        onClick={() => handleDelete(row.quiz_ID)}
                        className="icon"
                      />
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Quiz Modal */}
        <Modal
          isOpen={modalsIsOpen}
          onRequestClose={closeModals}
          style={customStyles}
        >
          <form onSubmit={handleFormSubmit}>
            <center>
              <h1>Edit Quiz</h1>
            </center>
            <hr />
            <br />
            <label className="fonts">
              Quiz Date:
              <br />
              <br />
              <input
                type="date"
                name="quiz_Date"
                className="mar inputt"
                value={formData.quiz_Date}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <center>
              <button type="submit" className="button1 buton1">
                Save
              </button>
              <button
                type="button"
                className="button2 buttonn1"
                onClick={closeModals} // Close modal on cancel
              >
                Cancel
              </button>
            </center>
          </form>
        </Modal>
      </div>
    </>
  );
}
