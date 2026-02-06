import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <ul className="space-y-3">
          <li><a href="/dashboard">Dashboard Home</a></li>
          <li><a href="/dashboard/add-lesson">Add Lesson</a></li>
          <li><a href="/dashboard/my-lessons">My Lessons</a></li>
          <li><a href="/dashboard/my-favorites">My Favorites</a></li>
          <li><a href="/dashboard/profile">Profile</a></li>

          <hr className="border-gray-700 my-4" />

          <li><a href="/dashboard/admin">Admin Home</a></li>
          <li><a href="/dashboard/admin/manage-users">Manage Users</a></li>
          <li><a href="/dashboard/admin/manage-lessons">Manage Lessons</a></li>
          <li><a href="/dashboard/admin/reported-lessons">Reported Lessons</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
