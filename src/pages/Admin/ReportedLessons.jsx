import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { FaFlag, FaTrash, FaEye, FaCheck, FaXmark } from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-hot-toast";

const ReportedLessons = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get("/admin/reports");
      setReports(res.data);
    } catch (err) {
      toast.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (id) => {
    if (!window.confirm("CRITICAL: This will permanently delete the lesson. Continue?")) return;
    try {
      await api.delete(`/lessons/${id}`);
      toast.success("Lesson removed permanently");
      fetchReports();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleIgnoreReport = async (lessonId) => {
    try {
      await api.delete(`/admin/reports/${lessonId}/ignore`);
      toast.success("Reports cleared for this lesson");
      fetchReports();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  if (loading) return <div className="p-8 text-center animate-pulse">Scanning for flags...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
         <h1 className="text-3xl font-black text-gray-900 mb-1">Reported Content</h1>
         <p className="text-gray-500 font-medium">Review and moderate community-flagged lessons</p>
      </div>

      {reports.length === 0 ? (
        <div className="bg-emerald-50 border border-emerald-100 rounded-[32px] py-16 text-center">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500 shadow-sm">
              <FaCheck className="text-xl" />
           </div>
           <h3 className="text-xl font-bold text-emerald-900 mb-2">Platform Clean!</h3>
           <p className="text-emerald-700/70 font-medium">No active reports requiring attention at this time.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Lesson Title</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Flag Count</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Review Details</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reports.map((r) => (
                <tr key={r._id} className="hover:bg-rose-50/20 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate max-w-[300px]">{r.lesson.title}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">by {r.lesson.author?.name || "Anonymous"}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 font-black text-xs rounded-full border border-rose-100 animate-pulse">
                         <FaExclamationTriangle className="text-[10px]" /> {r.reportCount}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => setSelectedReport(r)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold border border-gray-100 hover:bg-white hover:shadow-md transition-all"
                      >
                         <FaEye /> View Reasons
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                       <button
                         onClick={() => handleIgnoreReport(r._id)}
                         className="p-2 text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100"
                         title="Mark as Safe / Ignore"
                       >
                         <FaCheck />
                       </button>
                      <button
                        onClick={() => handleDeleteLesson(r._id)}
                        className="p-2 text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-600 hover:text-white transition-all border border-rose-100"
                        title="Delete Content"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reasons Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={() => setSelectedReport(null)}></div>
           <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300">
              <div className="p-8">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                          <FaFlag className="text-rose-600" /> Report Summary
                       </h2>
                       <p className="text-sm text-gray-500 font-medium mt-1">{selectedReport.lesson.title}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedReport(null)}
                      className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all shadow-sm"
                    >
                      <FaXmark />
                    </button>
                 </div>

                 <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {selectedReport.reasons.map((report, idx) => (
                       <div key={idx} className="p-5 bg-gray-50 rounded-[24px] border border-gray-100">
                          <div className="flex items-center justify-between mb-3">
                             <span className="px-3 py-1 bg-white text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm border border-rose-50">
                                {report.reason}
                             </span>
                             <span className="text-[10px] text-gray-400 font-bold">{new Date(report.timestamp).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm font-bold text-gray-900 italic">"Sent by {report.reporter}"</p>
                       </div>
                    ))}
                 </div>

                 <div className="mt-10 flex gap-4">
                    <button
                      onClick={() => {
                        handleIgnoreReport(selectedReport._id);
                        setSelectedReport(null);
                      }}
                      className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
                    >
                       IGNORE & CLEAR
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteLesson(selectedReport._id);
                        setSelectedReport(null);
                      }}
                      className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all active:scale-95"
                    >
                       DELETE PERMANENTLY
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ReportedLessons;