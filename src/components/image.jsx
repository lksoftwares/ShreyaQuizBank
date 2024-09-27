// import React from "react";
// import "./image.css";
// import { useState } from "react";
// import apiService from "../../api";

// export default function Image() {
//   const [formData, setFormData] = useState({
//     user_ID: "",
//   });
//   const [selectedImage, setSelectedImage] = useState(null);
//   const url = import.meta.env.VITE_BASE_URL;

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const formData = new FormData();
//       formData.append("image", file);

//       const response = await apiService.put(
//         `Users/updateUsers/${formData.user_ID}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success(response);
//     }
//     setSelectedImage(URL.createObjectURL(file));
//     console.log(response.data);
//   };

//   return (
//     <div>
//       <center>
//         <label htmlFor="fileInput">
//           <input
//             type="file"
//             id="fileInput"
//             style={{ display: "none" }}
//             onChange={handleImageChange}
//           />
//           <img
//             src={`${url}images/${selectedImage}` || `${url}src/images/lk.png`}
//             alt="preview "
//           />
//         </label>
//       </center>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import "./image.css";
import apiService from "../../api";
import { toast } from "react-toastify";
import axios from "axios";
export default function Image() {
  const [selectedImage, setSelectedImage] = useState(null);
  const url = import.meta.env.VITE_BASE_URL;
  // const fetchData = async () => {
  //   try {
  const user_ID = localStorage.getItem("ID");
  //     const token = localStorage.getItem("token");

  //     const res = await axios({
  //       method: "get",
  //       url: `${url}Users/ProfileImage${user_ID}`,

  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("res Image data", res.data);

  //     console.log("Image", res.data.imageUrl);
  //     // setSelectedImage(res.data.imageUrl);
  //     console.log(selectedImage);
  //   } catch (error) {
  //     console.log("error occur", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // });

  const fetchData = async () => {
    const res = await apiService.get(`Users/ProfileImage/${user_ID}`);
    console.log("res Image data", res.data);

    console.log("Image", res.imageUrl);
    setSelectedImage(res.imageUrl);
    console.log(selectedImage);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      // Get user_ID and token from local storage
      const user_ID = localStorage.getItem("ID");
      console.log(user_ID);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("Image", file);

      // Send PUT request to update user image
      const response = await apiService.put(
        `Users/updateUsers/${user_ID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response);
      console.log(response.data);
    }
    console.log("selectedImage", selectedImage);
    // Preview the selected image
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <div>
      <center>
        <label htmlFor="fileInput">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {/* {console.log("selectedImage", selectedImage)} */}

          <img
            src={
              selectedImage
                ? `${selectedImage}`
                : `${url}/public/images/f903a142-a14c-46e1-b1aa-0e9520f7264d.png`
            }
            alt="preview"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              marginLeft: "40px",
              marginTop: "20px",
            }}
          />
        </label>
      </center>
    </div>
  );
}
