import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  FaBook,
  FaHeart,
  FaPlus,
  FaArrowRight,
  FaClock,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user?.email) {
          const { data } = await api.get(`/stats/user/${user.email}`);
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Lessons Created",
      value: stats?.lessonsCount || 0,
      icon: <FaBook className="text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Total Favorites",
      value: stats?.favoritesCount || 0,
      icon: <FaHeart className="text-rose-600" />,
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.displayName || "User"}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your life lessons today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4 text-xl`}
            >
              {stat.icon}
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {stat.value}
            </p>
          </div>
        ))}

        <Link
          to="/dashboard/add-lesson"
          className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl shadow-lg border border-transparent hover:scale-[1.02] transition-transform text-white flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-bold mb-1">Create a New Lesson</h3>
            <p className="text-white/80 text-sm">
              Share your lesson and inspire the community.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 font-semibold">
            Add Lesson <FaPlus />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Weekly Contributions
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats?.contributionData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recently Added</h3>
            <Link
              to="/dashboard/my-lessons"
              className="text-sm text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4 flex-1">
            {stats?.recentLessons?.length > 0 ? (
              stats.recentLessons.map((lesson) => (
                <Link
                  key={lesson._id}
                  to={`/lessons/${lesson._id}`}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <FaClock className="text-gray-400 group-hover:text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {lesson.category} •{" "}
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 italic">
                No lessons added yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
