import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider";
import router from "./router/router.jsx";
import { RouterProvider } from "react-router-dom";
import ToastProvider from "./context/ToastProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
    <ToastProvider />
  </AuthProvider>,
);
