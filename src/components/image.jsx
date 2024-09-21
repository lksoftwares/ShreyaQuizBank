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
import React, { useState } from "react";
import "./image.css";
import apiService from "../../api";
import { toast } from "react-toastify";

export default function Image() {
  const [selectedImage, setSelectedImage] = useState(null);
  const url = import.meta.env.VITE_BASE_URL;

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
          {console.log("selectedImage", selectedImage)}

          <img
            src={
              selectedImage
                ? `${url}/public/images/${selectedImage}`
                : "http://192.168.1.56:7241/public/images/14c216ed-8929-4028-a66d-4259696e9838.png"
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
