import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  FaHouse,
  FaPlus,
  FaBook,
  FaHeart,
  FaUser,
  FaHammer,
  FaUsers,
  FaFlag,
  FaRightFromBracket,
  FaChevronRight,
} from "react-icons/fa6";

const DashboardLayout = () => {
  const { user, role, logoutUser } = useAuth();
  const location = useLocation();

  const userLinks = [
    { path: "/dashboard", label: "Overview", icon: <FaHouse /> },
    { path: "/dashboard/add-lesson", label: "Add Lesson", icon: <FaPlus /> },
    { path: "/dashboard/my-lessons", label: "My Lessons", icon: <FaBook /> },
    { path: "/dashboard/my-favorites", label: "Favorites", icon: <FaHeart /> },
    { path: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
  ];

  const adminLinks = [
    { path: "/dashboard/admin", label: "Admin Stats", icon: <FaHammer /> },
    {
      path: "/dashboard/admin/manage-users",
      label: "Users",
      icon: <FaUsers />,
    },
    {
      path: "/dashboard/admin/manage-lessons",
      label: "Lessons",
      icon: <FaBook />,
    },
    {
      path: "/dashboard/admin/reported-lessons",
      label: "Reports",
      icon: <FaFlag />,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              LL
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Life Lessons
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-8 overflow-y-auto pt-4">
          <div>
            <p className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              Member Area
            </p>
            <div className="space-y-1">
              {userLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                    isActive(link.path)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-lg transition-colors ${isActive(link.path) ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`}
                    >
                      {link.icon}
                    </span>
                    <span className="font-semibold text-sm">{link.label}</span>
                  </div>
                  {isActive(link.path) && (
                    <FaChevronRight className="text-[10px]" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {role === "admin" && (
            <div>
              <p className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                Administration
              </p>
              <div className="space-y-1">
                {adminLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                      isActive(link.path)
                        ? "bg-purple-50 text-purple-600"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-lg transition-colors ${isActive(link.path) ? "text-purple-600" : "text-gray-400 group-hover:text-gray-600"}`}
                      >
                        {link.icon}
                      </span>
                      <span className="font-semibold text-sm">
                        {link.label}
                      </span>
                    </div>
                    {isActive(link.path) && (
                      <FaChevronRight className="text-[10px]" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                {user?.displayName?.charAt(0) || "U"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {user?.displayName}
                </p>
                <p className="text-[10px] text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={logoutUser}
              className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-colors"
            >
              <FaRightFromBracket /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium">Dashboard</span>
            <FaChevronRight className="text-[10px] text-gray-300" />
            <span className="text-gray-900 font-bold capitalize">
              {location.pathname.split("/").pop() || "Overview"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {role === "admin" && (
              <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-purple-200">
                ADMIN PANEL
              </span>
            )}
            <Link
              to="/pricing"
              className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              Upgrade
            </Link>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
