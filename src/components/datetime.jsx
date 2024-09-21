// import React, { useState, useEffect } from "react";

// const formatDateTime = (date) => {
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = String(date.getFullYear());

//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const seconds = String(date.getSeconds()).padStart(2, "0");

//   return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
// };

// function Datetime() {
//   const [currentTime, setCurrentTime] = useState(formatDateTime(new Date()));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(formatDateTime(new Date()));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <p className="date">{currentTime}</p>
//     </div>
//   );
// }

// export default Datetime;
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa"; // Import the icons

const formatDateTime = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return {
    date: `${day}/${month}/${year}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
};

function Datetime() {
  const [{ date, time }, setCurrentTime] = useState(formatDateTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatDateTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dat">
      <FaCalendarAlt style={{ marginRight: "8px" }} className="date" />
      {date}
      <FaClock
        style={{ marginLeft: "15px", marginRight: "8px" }}
        className="datee"
      />
      {time}
    </div>
  );
}

export default Datetime;
