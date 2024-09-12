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
import { useEffect, useState } from "react";
import axios from "axios";
import { IoHome } from "react-icons/io5";
import { BsQuestionSquareFill } from "react-icons/bs";
import { MdSystemSecurityUpdateGood } from "react-icons/md";
import { MdBorderColor } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { BsClipboard2Data } from "react-icons/bs";
const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const role_ID = localStorage.getItem("Roleid");
        const res = await axios({
          method: "get",
          url: `http://192.168.1.54:7241/Menues/getallMenues?Role_ID=${role_ID}`,
        });
        setMenu(res.data);
        console.log("data", res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenu();
  }, []);
  return (
    <div className="menuu">
      <center>
        <Image></Image>

        <h1 className="headings">Lk Softwares</h1>
      </center>
      <div>
        {menu.map((item, menu_id) => (
          <ul key={menu_id}>
            <Link className="menuuu" to={item.menu_URL}>
              {menu_id === 0 && <IoHome />}
              {menu_id === 1 && <BsQuestionSquareFill />}
              {menu_id === 2 && <MdSystemSecurityUpdateGood />}
              {menu_id === 3 && <MdBorderColor />}
              {menu_id === 4 && <ImProfile />}
              {menu_id === 5 && <FaUser />}
              {menu_id === 6 && <RiAdminFill />}
              {menu_id === 7 && <BsClipboard2Data />}

              <span className="  listItemTitlee ">{item.menu_Name}</span>
            </Link>
          </ul>
        ))}
      </div>
    </div>
  );
};
export default Menu;
