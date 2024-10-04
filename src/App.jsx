// import Login from "./login/login";
// import Home from "./Home/Home";
// import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import Register from "./Register/Register";
// import GetData from "./components/AddDepartment/GetData";
// import "./App.scss";
// import User from "./components/Users/User";
// import Menu from "./components/Menu/Menu";
// import UserHome from "./components/UserHome/UserHome";
// import InputQues from "./components/Inputques/InputQues";
// import GetTopic from "./components/AddTopic/AddTopic";
// import Roles from "./components/Roles/Roles";
// import Quiztransaction from "./components/Quiztransactions/Quiztransaction";
// import Quiz from "./components/Quiz/Quiz";
// import UserForm from "./components/Userform/UserForm";
// import QuizResult from "./components/QuizResult/QuizResult";
// function App() {
//   const Layout = () => {
//     return (
//       <>
//         <div className="mainn">
//           <div className="containerr">
//             <div className="menucontainerr">
//               <Menu></Menu>
//             </div>
//             <div className="contentcontainerr">
//               <Outlet></Outlet>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Login />,
//     },

//     {
//       path: "/register",
//       element: <Register />,
//     },

//     {
//       path: "/admin/questions",
//       element: <GetData />,
//     },
//     {
//       path: "/admin/topic",
//       element: <GetTopic />,
//     },
//     {
//       path: "/inputques",
//       element: <InputQues />,
//     },

//     {
//       path: "/admin",
//       element: <Layout />,
//       children: [
//         {
//           path: "/admin",
//           element: <Home />,
//         },
//       ],
//     },
//     {
//       path: "/admin/questions",
//       element: <Layout />,
//       children: [
//         {
//           path: "/admin/questions",
//           element: <GetData />,
//         },
//       ],
//     },
//     {
//       path: "/admin/topics",
//       element: <Layout />,
//       children: [
//         {
//           path: "/admin/topics",
//           element: <GetTopic />,
//         },
//       ],
//     },
//     {
//       path: "/admin/users",
//       element: <Layout />,
//       children: [
//         {
//           path: "/admin/users",
//           element: <User />,
//         },
//       ],
//     },

//     {
//       path: "/admin/roles",
//       element: <Layout />,
//       children: [
//         {
//           path: "/admin/roles",
//           element: <Roles />,
//         },
//       ],
//     },
//     {
//       path: "/admin/transaction",
//       element: <Layout />,
//       children: [
//         {
//           path: "/admin/transaction",
//           element: <Quiztransaction />,
//         },
//       ],
//     },
//     {
//       path: "/admin/quiz",
//       element: <Layout />,
//       children: [
//         {
//           path: "/admin/quiz",
//           element: <Quiz />,
//         },
//       ],
//     },

//     {
//       path: "/user/quiz",
//       element: <Layout />,
//       children: [
//         {
//           path: "/user/quiz",
//           element: <UserForm />,
//         },
//       ],
//     },

//     {
//       path: "/user/home",
//       element: <Layout />,
//       children: [
//         {
//           path: "/user/home",
//           element: <UserHome />,
//         },
//       ],
//     },
//     {
//       path: "/user/quizresult",
//       element: <Layout />,
//       children: [
//         {
//           path: "/user/quizresult",
//           element: <QuizResult />,
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;
import Login from "./login/login";
import Home from "./Home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Register from "./Register/Register";
import GetData from "./components/AddDepartment/GetData";
import "./App.scss";
import User from "./components/Users/User";
import Menu from "./components/Menu/Menu";
import UserHome from "./components/UserHome/UserHome";
import InputQues from "./components/Inputques/InputQues";
import GetTopic from "./components/AddTopic/AddTopic";
import Roles from "./components/Roles/Roles";
import Quiztransaction from "./components/Quiztransactions/Quiztransaction";
import Quiz from "./components/Quiz/Quiz";
import UserForm from "./components/Userform/UserForm";
import QuizResult from "./components/QuizResult/QuizResult";
import AdminQuizResult from "./components/AdminQuizResult/AdminQuizResult";

function App() {
  const role_ID = localStorage.getItem("Roleid");

  const Layout = () => (
    <div className="mainn">
      <div className="containerr">
        <div className="menucontainerr">
          <Menu />
        </div>
        <div className="contentcontainerr">
          <Outlet />
        </div>
      </div>
    </div>
  );

  const adminRoutes = [
    {
      path: "/admin",
      element: <Home />,
    },
    {
      path: "/admin/questions",
      element: <GetData />,
    },
    {
      path: "/admin/topics",
      element: <GetTopic />,
    },
    {
      path: "/admin/users",
      element: <User />,
    },
    // {
    //   path: "/inputques",
    //   element: <InputQues />,
    // },
    {
      path: "/admin/quiz",
      element: <Quiz />,
    },
    {
      path: "/admin/roles",
      element: <Roles />,
    },
    {
      path: "/admin/transaction",
      element: <Quiztransaction />,
    },
    {
      path: "/admin/quizresult",
      element: <AdminQuizResult />,
    },
  ];

  const userRoutes = [
    {
      path: "/user/quiz",
      element: <UserForm />,
    },
    {
      path: "/user/home",
      element: <UserHome />,
    },
    {
      path: "/user/quizresult",
      element: <QuizResult />,
    },
  ];

  const commonRoutes = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  let routes;

  if (role_ID == 5) {
    routes = [
      ...commonRoutes,
      {
        path: "/admin",
        element: <Layout />,
        children: adminRoutes,
      },
    ];
  } else if (role_ID == 3) {
    routes = [
      ...commonRoutes,
      {
        path: "/user",
        element: <Layout />,
        children: userRoutes,
      },
    ];
  } else {
    routes = [
      ...commonRoutes,
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ];
  }

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
