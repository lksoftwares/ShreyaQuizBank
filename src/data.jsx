import { IoHome } from "react-icons/io5";
import { BsQuestionSquareFill } from "react-icons/bs";
import { MdSystemSecurityUpdateGood } from "react-icons/md";
import { MdBorderColor } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { BsClipboard2Data } from "react-icons/bs";

export const menu = [
  {
    id: 1,
    title: "",
    listItems: [
      {
        id: 1,
        title: "Home",
        url: "/home",
        icon: <IoHome />,
      },
      {
        id: 2,
        title: "Questions",
        url: "/questions",
        icon: <BsQuestionSquareFill />,
      },

      {
        id: 3,
        title: " Topics ",
        url: "/topic",
        icon: <MdBorderColor />,
      },
      {
        id: 4,
        title: "Users",
        url: "/users",
        icon: <FaUser />,
      },

      {
        id: 5,
        title: "Roles",
        url: "/roles",
        icon: <RiAdminFill />,
      },
      {
        id: 6,
        title: "Transaction",
        url: "/quiztransactions",
        icon: <MdSystemSecurityUpdateGood />,
      },
      {
        id: 7,
        title: "Quiz",
        url: "/quiz",
        icon: <BsClipboard2Data />,
      },
      {
        id: 8,
        title: "User Form",
        url: "/userform",
        icon: <ImProfile />,
      },
      // {
      //   id: 8,
      //   title: "Roles",
      //   url: "/home",
      //   icon: <SiGoogleforms />,
      // },
      // {
      //   id: 9,
      //   title: "Company",
      //   url: "/home",
      //   icon: <PiBuildingApartmentFill />,
      // },
      // {
      //   id: 10,
      //   title: "Leave",
      //   url: "/home",
      //   icon: <GrNotes />,
      // },
      // {
      //   id: 11,
      //   title: "Backups",
      //   url: "/users/1",
      //   icon: <MdBackup />,
      // },
      // {
      //   id: 12,
      //   title: "Charts",
      //   url: "/",
      //   icon: <FaChartLine />,
      // },
      // {
      //   id: 13,
      //   title: "Logs",
      //   url: "/users/1",
      //   icon: <TbLogs />,
      // },
    ],
  },
];

// export const topDealsUsers = [
//   {
//     Emp_id: 66,
//     Name: "Tiya",
//     Email: "aryan@gmail.com",
//     AdharNo: "989889898",
//     icon: <FaCircleUser />,
//   },
//   {
//     Emp_id: 84,
//     Name: "Aryana",
//     Email: "aryan@gmail.com",
//     AdharNo: "989889898",
//     icon: <FaCircleUser />,
//   },
//   {
//     Emp_id: 122,
//     Name: "Rahul",
//     Email: "rahul12@gmail.com",
//     AdharNo: "988909",
//     icon: <FaCircleUser />,
//   },
//   {
//     Emp_id: 140,
//     Name: "Sima",
//     Email: "Sima123@gmail.com",
//     AdharNo: "989889898",
//     icon: <FaCircleUser />,
//   },
// ];

// export const Data = [
//   {
//     totalEmp: 280,

//     statusCode: "200",
//     message: "",
//     isAuth: true,
//   },
// ];

// export const Data2 = [
//   {
//     totalDep: 67,

//     statusCode: "201",
//     message: "",
//     isAuth: true,
//   },
// ];

// export const Data3 = [
//   {
//     CurrentActiveUsers: 30,

//     statusCode: "200",
//     message: "",
//     isAuth: true,
//   },
// ];
//login data
export const User = {
  username: "Shreya",
  password: "shreya15",
};
