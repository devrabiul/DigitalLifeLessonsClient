import React, { useEffect, useState } from "react";
import { FaUsers, FaBook, FaFlag, FaBolt, FaArrowUp, FaChartLine } from "react-icons/fa6";
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

const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats/admin");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="space-y-10 pb-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Platform Overview</h1>
        <p className="text-gray-500 font-medium">Monitoring growth and community trends</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<FaUsers />} 
          title="Total Users" 
          value={stats.totalUsers} 
          color="bg-blue-500" 
          subtitle="Registered members"
        />
        <StatCard 
          icon={<FaBook />} 
          title="Public Lessons" 
          value={stats.totalPublicLessons} 
          color="bg-emerald-500" 
          subtitle="Active discussions"
        />
        <StatCard 
          icon={<FaFlag />} 
          title="Reports" 
          value={stats.totalReports} 
          color="bg-rose-500" 
          subtitle="Flagged content"
        />
        <StatCard 
          icon={<FaBolt />} 
          title="Today's Lessons" 
          value={stats.todayLessons} 
          color="bg-amber-500" 
          subtitle="New contributions"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm shadow-gray-100/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaChartLine className="text-blue-500" /> Lesson Growth
            </h3>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last 7 Days</span>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.growthData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm shadow-gray-100/50">
           <h3 className="text-xl font-bold text-gray-900 mb-8">Active Contributors</h3>
           <div className="space-y-6">
             {stats.activeContributors.map((c, i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-primary text-sm shadow-sm border border-gray-100">
                     {c.name?.charAt(0) || "U"}
                   </div>
                   <div>
                     <p className="font-bold text-gray-900 text-sm truncate max-w-[120px]">{c.name || c._id}</p>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{c.count} Lessons</p>
                   </div>
                 </div>
                 <div className={`px-2 py-1 rounded-lg text-[10px] font-black ${i === 0 ? 'bg-amber-100 text-amber-600' : 'bg-gray-200 text-gray-500'}`}>
                    RANK #{i+1}
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color, subtitle }) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 group">
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white text-xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">{title}</p>
    <div className="flex items-baseline gap-2">
      <h4 className="text-3xl font-black text-gray-900">{value}</h4>
      <span className="text-[10px] text-gray-400 font-medium">{subtitle}</span>
    </div>
  </div>
);

export default AdminHome;
