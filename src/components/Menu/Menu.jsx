import "./Menu.css";
import React from "react";
import { Link } from "react-router-dom";
import { menu } from "../../data";
import Image from "../image";

const Menu = () => {
  return (
    <div className="menuu">
      <center>
        <Image></Image>

        <h1 className="headings">Lk Softwares</h1>
      </center>
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <div className="Titlee">{item.title}</div>

          {item.listItems.map((listItem) => (
            <div>
              {/* <Link to="/home" className="listItemm" key={listItem.id}></Link>
              <span className="listItemTitlee">{listItem.icon}</span>
              <Link to={listItem.url} className="listItemm">
                {listItem.title}
              </Link> */}
              <Link to={listItem.url} className="listItemm" key={listItem.id}>
                <div className="listItemTitlee">{listItem.icon}</div>
                <div className="listItemTitlee">{listItem.title}</div>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Menu;
