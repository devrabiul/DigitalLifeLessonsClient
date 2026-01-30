import { Link, Outlet }  from "react-router";

export default function DashboardLayout() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
              <h3 className="font-bold text-gray-900 mb-3">Dashboard</h3>
              <nav className="space-y-2">
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard/my-lessons"
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  My Lessons
                </Link>
                <Link
                  to="/dashboard/add-lesson"
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Add Lesson
                </Link>
                <Link
                  to="/dashboard/my-favorites"
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  My Favorites
                </Link>
                <Link
                  to="/dashboard/profile"
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Profile
                </Link>
              </nav>
            </div>
          </aside>

          <section className="lg:col-span-9">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
              <Outlet />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
