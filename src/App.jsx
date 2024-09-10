import Login from "./login/login";
import Home from "./Home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Register from "./Register/Register";
import GetData from "./components/AddDepartment/GetData";
import "./App.scss";
import User from "./components/Users/User";
import Menu from "./components/Menu/Menu";
import InputQues from "./components/Inputques/InputQues";
import GetTopic from "./components/AddTopic/AddTopic";
import Roles from "./components/Roles/Roles";
import Quiztransaction from "./components/Quiztransactions/Quiztransaction";
import Quiz from "./components/Quiz/Quiz";
function App() {
  const Layout = () => {
    return (
      <>
        <div className="mainn">
          <div className="containerr">
            <div className="menucontainerr">
              <Menu></Menu>
            </div>
            <div className="contentcontainerr">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },

    {
      path: "/questions",
      element: <GetData />,
    },
    {
      path: "/topic",
      element: <GetTopic />,
    },
    {
      path: "/inputques",
      element: <InputQues />,
    },
    {
      path: "/home",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
      ],
    },
    {
      path: "/questions",
      element: <Layout />,
      children: [
        {
          path: "/questions",
          element: <GetData />,
        },
      ],
    },
    {
      path: "/topic",
      element: <Layout />,
      children: [
        {
          path: "/topic",
          element: <GetTopic />,
        },
      ],
    },
    {
      path: "/users",
      element: <Layout />,
      children: [
        {
          path: "/users",
          element: <User />,
        },
      ],
    },
    {
      path: "/roles",
      element: <Layout />,
      children: [
        {
          path: "/roles",
          element: <Roles />,
        },
      ],
    },
    {
      path: "/quiztransactions",
      element: <Layout />,
      children: [
        {
          path: "/quiztransactions",
          element: <Quiztransaction />,
        },
      ],
    },
    {
      path: "/quiz",
      element: <Layout />,
      children: [
        {
          path: "/quiz",
          element: <Quiz />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
