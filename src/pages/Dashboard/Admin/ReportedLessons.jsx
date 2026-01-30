import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import api from '../../../services/api';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import { showSuccess, showError } from '../../../utils/toast';
import Swal from 'sweetalert2';

const ReportedLessons = () => {
    const [reportedLessons, setReportedLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        fetchReportedLessons();
    }, [page]);

    const fetchReportedLessons = async () => {
        try {
            const response = await api.get('/admin/reports', { params: { page, limit: 20 } });
            setReportedLessons(response.data.reportedLessons || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Failed to fetch reports:', error);
            showError('Failed to load reports');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteLesson = async (lessonId, title) => {
        const result = await Swal.fire({
            title: 'Delete Lesson?',
            text: `This will permanently delete "${title}" and all associated reports.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete lesson'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/admin/lessons/${lessonId}`);
                showSuccess('Lesson deleted successfully');
                fetchReportedLessons();
            } catch (error) {
                showError('Failed to delete lesson');
            }
        }
    };

    const handleDismissReports = async (lessonId) => {
        const result = await Swal.fire({
            title: 'Dismiss Reports?',
            text: 'This will remove all reports for this lesson. The lesson will remain published.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#7c3aed',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, dismiss'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/admin/reports/${lessonId}`);
                showSuccess('Reports dismissed');
                fetchReportedLessons();
            } catch (error) {
                showError('Failed to dismiss reports');
            }
        }
    };

    const getReasonBadgeColor = (reason) => {
        const colors = {
            'Inappropriate Content': 'bg-red-100 text-red-700',
            'Hate Speech or Harassment': 'bg-red-100 text-red-700',
            'Misleading or False Information': 'bg-orange-100 text-orange-700',
            'Spam or Promotional Content': 'bg-yellow-100 text-yellow-700',
            'Sensitive or Disturbing Content': 'bg-purple-100 text-purple-700',
            'Other': 'bg-gray-100 text-gray-700'
        };
        return colors[reason] || 'bg-gray-100 text-gray-700';
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Reported Lessons</h2>
                <p className="text-gray-500 mt-1">Review and take action on reported content</p>
            </div>

            {reportedLessons.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">All Clear!</h3>
                    <p className="text-gray-500">No reported lessons to review at this time.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Lesson</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Author</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Reports</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {reportedLessons.map((item) => (
                                    <tr key={item.lesson._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-800 truncate max-w-xs">{item.lesson.title}</p>
                                                <p className="text-sm text-gray-500">{item.lesson.category}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{item.lesson.author?.name || 'Unknown'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedReport(item)}
                                                className="px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-full hover:bg-red-200 transition-colors"
                                            >
                                                {item.reportCount} reports - View details
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/lessons/${item.lesson._id}`}
                                                    className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => handleDismissReports(item.lesson._id)}
                                                    className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    Dismiss
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteLesson(item.lesson._id, item.lesson.title)}
                                                    className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Report Details Modal */}
            {selectedReport && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-800">Report Details</h3>
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-1">Lesson</p>
                                <p className="font-semibold text-gray-800">{selectedReport.lesson.title}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-2">Reports ({selectedReport.reportCount})</p>
                                <div className="space-y-3">
                                    {selectedReport.reports.map((report, index) => (
                                        <div key={index} className="p-3 bg-gray-50 rounded-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getReasonBadgeColor(report.reason)}`}>
                                                    {report.reason}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(report.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Reported by: {report.reporterUserEmail || report.reporterUserId || 'Anonymous'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={() => { handleDismissReports(selectedReport.lesson._id); setSelectedReport(null); }}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Dismiss Reports
                            </button>
                            <button
                                onClick={() => { handleDeleteLesson(selectedReport.lesson._id, selectedReport.lesson.title); setSelectedReport(null); }}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
                            >
                                Delete Lesson
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportedLessons;
