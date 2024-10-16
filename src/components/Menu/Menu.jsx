// import "./Menu.css";
// import React from "react";
// import { Link } from "react-router-dom";
// import { menu } from "../../data";
// import Image from "../image";

// const Menu = () => {
//   return (
//     <div className="menuu">
//       <center>
//         <Image></Image>

//         <h1 className="headings">Lk Softwares</h1>
//       </center>
//       {menu.map((item) => (
//         <div className="item" key={item.id}>
//           <div className="Titlee">{item.title}</div>

//           {item.listItems.map((listItem) => (
//             <div>
//               {/* <Link to="/home" className="listItemm" key={listItem.id}></Link>
//               <span className="listItemTitlee">{listItem.icon}</span>
//               <Link to={listItem.url} className="listItemm">
//                 {listItem.title}
//               </Link> */}
//               <Link to={listItem.url} className="listItemm" key={listItem.id}>
//                 <div className="listItemTitlee">{listItem.icon}</div>
//                 <div className="listItemTitlee">{listItem.title}</div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };
// export default Menu;
import "./Menu.css";
import React from "react";
import { Link } from "react-router-dom";
import Image from "../image";
import { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { BsQuestionSquareFill } from "react-icons/bs";
import { MdSystemSecurityUpdateGood } from "react-icons/md";
import { MdBorderColor } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { BsClipboard2Data } from "react-icons/bs";
import apiService from "../../../api";

const Menu = () => {
  const role_ID = localStorage.getItem("Roleid");
  const [menu, setMenu] = useState([]);

  const fetchMenu = async () => {
    const data = await apiService.get(`Menues/getallMenues`);
    setMenu(data);
  };

  useEffect(() => {
    fetchMenu();
  }, [role_ID]);

  const [userDetails, setUserDetails] = useState(null);
  const user_ID = localStorage.getItem("ID");

  const fetchUserDetailsById = async () => {
    const response = await apiService.get(`Users/AllUsers?User_ID=${user_ID}`);
    if (response.usersLists && response.usersLists.length > 0) {
      setUserDetails(response.usersLists[0]);
    }
  };

  useEffect(() => {
    if (user_ID) {
      fetchUserDetailsById();
    }
  }, [user_ID]); // Add dependency to avoid unnecessary calls

  return (
    <div className="menuu">
      <center>
        <Image />
        {userDetails && (
          <h1 className="headings">
            Welcome <br />
            {userDetails.role_ID === 5 ? (
              <p className="headd">{userDetails.user_Name} (A)</p>
            ) : userDetails.role_ID === 3 ? (
              <p className="headd">{userDetails.user_Name} (U)</p>
            ) : null}
          </h1>
        )}{" "}
        <hr className="hr" />
      </center>
      <div className="scrollableMenu">
        {menu.map((item, menu_id) => (
          <ul key={menu_id} style={{ margin: "0px" }}>
            <Link className="menuuu" to={item.menu_URL}>
              {menu_id === 0 && <IoHome />}
              {menu_id === 1 && <RiAdminFill />}
              {menu_id === 2 && <FaUser />}
              {menu_id === 3 && <ImProfile />}
              {menu_id === 4 && <BsQuestionSquareFill />}
              {menu_id === 5 && <MdSystemSecurityUpdateGood />}
              {menu_id === 6 && <MdBorderColor />}
              {menu_id === 7 && <BsClipboard2Data />}
              <span className="listItemTitlee">{item.menu_Name}</span>
            </Link>
          </ul>
        ))}
      </div>
    </div>
  );
};
export default Menu;
