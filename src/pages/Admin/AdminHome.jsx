import React, { useEffect, useState } from "react";
import api from "../../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  FaUsers,
  FaBook,
  FaFlag,
  FaPlus,
  FaArrowRight,
  FaChartLine,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/stats/admin");
        setStats(data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const overviewCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <FaUsers className="text-purple-600" />,
      bg: "bg-purple-50",
    },
    {
      title: "Public Lessons",
      value: stats?.totalPublicLessons || 0,
      icon: <FaBook className="text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Flagged Lessons",
      value: stats?.totalReports || 0,
      icon: <FaFlag className="text-rose-600" />,
      bg: "bg-rose-50",
    },
    {
      title: "New Today",
      value: stats?.todayLessons || 0,
      icon: <FaPlus className="text-emerald-600" />,
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview 📊</h1>
        <p className="text-gray-600">
          Monitor platform activity and growth metrics.
        </p>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div
              className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-4 text-xl`}
            >
              {card.icon}
            </div>
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Platform Growth Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Lesson Growth</h3>
            <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-medium">
              <FaChartLine /> Last 7 Days
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.growthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#4f46e5"
                  radius={[6, 6, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Active Contributors */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Top Contributors
          </h3>
          <div className="space-y-6">
            {stats?.activeContributors?.length > 0 ? (
              stats.activeContributors.map((creator, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {creator.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {creator.name}
                      </p>
                      <p className="text-xs text-gray-500">{creator._id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {creator.count}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                      Lessons
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 italic">
                No active contributors yet.
              </div>
            )}

            <Link
              to="/dashboard/admin/manage-users"
              className="w-full py-3 bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              View Management <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
