import { Outlet, Navigate } from "react-router-dom";
import Browse from "../pages/Browse";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import UProfile from "../pages/UProfile";
import HomeLayout from "../components/layout/HomeLayout";
import Signup from "../pages/Signup";
import { logout } from "./logout";
import Syllabus from "../pages/Syllabus";
import Courses from "../pages/Courses";
import Fees from "../pages/Fees";
import Subjects from "../pages/Subjects";
import Entry from "../pages/Entry";
import Saved from "../pages/Saved";
import NewEntry from "../pages/NewEntry";

const links = (isAuthenticated, isAdmin) => [
  {
    path: "",
    element:
      isAuthenticated || window.location.pathname === "/" ? (
        <HomeLayout />
      ) : (
        <Navigate to="/login" />
      ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "syllabus",
        element: <Syllabus />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "fees",
        element: <Fees />,
      },
      {
        path: "subject/:subject",
        element: <Subjects />,
      },
      {
        path: "post/:eid",
        element: <Entry />,
      },
      {
        path: "saved",
        element: <Saved />,
      },
      {
        path: "newentry",
        element: <NewEntry />,
      },
      {
        path: "uprofile/:id",
        element: <UProfile />,
      },
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
  {
    path: "login",
    element: isAuthenticated ? <Navigate to="/" /> : <Login />,
  },
  {
    path: "signup",
    element: isAuthenticated ? <Navigate to="/" /> : <Signup />,
  },
  {
    path: "logout",
    element: isAuthenticated ? logout : <Navigate to="/" />,
  },
];

export default links;
