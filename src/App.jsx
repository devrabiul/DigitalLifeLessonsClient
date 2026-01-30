import "./App.css";
import { BrowserRouter, Routes, Route }  from "react-router";
import Home from "./pages/Home";
import PublicLessons from "./pages/PublicLessons";
import LessonDetails from "./pages/LessonDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard/DashboardHome";
import AddLesson from "./pages/Dashboard/AddLesson";
import MyLessons from "./pages/Dashboard/MyLessons";
import MyFavorites from "./pages/Dashboard/MyFavorites";
import Profile from "./pages/Dashboard/Profile";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import ToastProvider from "./components/UI/ToastProvider.jsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import DashboardLayout from "./components/Layout/DashboardLayout.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<PublicLessons />} />
            <Route path="/lessons/:id" element={<LessonDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="add-lesson" element={<AddLesson />} />
              <Route path="my-lessons" element={<MyLessons />} />
              <Route path="my-favorites" element={<MyFavorites />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          
          {/* 404 Page without Navbar and Footer */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastProvider />
    </>
  );
}

export default App;
