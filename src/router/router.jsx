import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PublicLessons from "../pages/PublicLessons/PublicLessons";
import LessonDetails from "../pages/LessonDetails/LessonDetails";
import NotFound from "../pages/NotFound/NotFound";

import AddLesson from "../pages/Dashboard/AddLesson";
import MyLessons from "../pages/Dashboard/MyLessons";
import UpdateLesson from "../pages/Dashboard/UpdateLesson";
import Favorites from "../pages/Dashboard/Favorites";
import Profile from "../pages/Dashboard/Profile";
import Pricing from "../pages/Pricing/Pricing";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Payment/PaymentCancel";
import DashboardHome from "../pages/Dashboard/DashboardHome";

import AdminHome from "../pages/Admin/AdminHome";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageLessons from "../pages/Admin/ManageLessons";
import ReportedLessons from "../pages/Admin/ReportedLessons";
import AdminProfile from "../pages/Admin/AdminProfile";

import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "lessons", element: <PublicLessons /> },
      { path: "lessons/:id", element: <LessonDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "payment/success", element: <PaymentSuccess /> },
      { path: "payment/cancel", element: <PaymentCancel /> },
      { path: "pricing", element: <Pricing /> },
      { path: "profile/:email", element: <Profile /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "update-lesson/:id", element: <UpdateLesson /> },
      { path: "my-favorites", element: <Favorites /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  {
    path: "/dashboard/admin",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminHome /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "manage-lessons", element: <ManageLessons /> },
      { path: "reported-lessons", element: <ReportedLessons /> },
      { path: "profile", element: <AdminProfile /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
