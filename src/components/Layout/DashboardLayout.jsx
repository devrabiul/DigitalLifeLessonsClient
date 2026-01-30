import { Link, Outlet, useLocation }  from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function DashboardLayout() {
  const { user, dbUser } = useAuth();
  const location = useLocation();
  const isAdmin = dbUser?.role === 'admin';

  const isActiveLink = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const linkClass = (path) => 
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
      isActiveLink(path) 
        ? 'bg-violet-100 text-violet-700 font-medium' 
        : 'text-gray-700 hover:bg-gray-50'
    }`;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 sticky top-24">
              {/* User Info */}
              <div className="flex items-center gap-3 p-3 mb-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl">
                <img 
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=7c3aed&color=fff`} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{user?.displayName || 'User'}</p>
                  <div className="flex items-center gap-1.5">
                    {isAdmin ? (
                      <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">Admin</span>
                    ) : dbUser?.isPremium ? (
                      <span className="text-xs px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full font-medium">Premium</span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">Free</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Navigation */}
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Dashboard</h3>
              <nav className="space-y-1 mb-6">
                <Link to="/dashboard" className={linkClass('/dashboard')}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </Link>
                <Link to="/dashboard/my-lessons" className={linkClass('/dashboard/my-lessons')}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  My Lessons
                </Link>
                <Link to="/dashboard/add-lesson" className={linkClass('/dashboard/add-lesson')}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Lesson
                </Link>
                <Link to="/dashboard/my-favorites" className={linkClass('/dashboard/my-favorites')}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  My Favorites
                </Link>
                <Link to="/dashboard/profile" className={linkClass('/dashboard/profile')}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
              </nav>

              {/* Admin Navigation - Only visible for admins */}
              {isAdmin && (
                <>
                  <h3 className="font-bold text-red-600 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Admin Panel
                  </h3>
                  <nav className="space-y-1">
                    <Link to="/dashboard/admin" className={linkClass('/dashboard/admin') + ' ' + (location.pathname === '/dashboard/admin' ? '' : '')}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Admin Overview
                    </Link>
                    <Link to="/dashboard/admin/manage-users" className={linkClass('/dashboard/admin/manage-users')}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Manage Users
                    </Link>
                    <Link to="/dashboard/admin/manage-lessons" className={linkClass('/dashboard/admin/manage-lessons')}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Manage Lessons
                    </Link>
                    <Link to="/dashboard/admin/reports" className={linkClass('/dashboard/admin/reports')}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Reported Content
                    </Link>
                  </nav>
                </>
              )}

              {/* Upgrade Banner for Free Users */}
              {!dbUser?.isPremium && !isAdmin && (
                <div className="mt-6 p-4 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl text-white">
                  <h4 className="font-bold mb-1">Upgrade to Premium</h4>
                  <p className="text-sm text-violet-100 mb-3">Unlock all features and premium lessons.</p>
                  <Link to="/pricing" className="block w-full py-2 bg-white text-violet-600 text-center font-semibold rounded-lg hover:bg-violet-50 transition-colors">
                    View Plans
                  </Link>
                </div>
              )}
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
