import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        {/* Cancel Icon */}
        <div className="w-32 h-32 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-16 h-16 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-2">
          Your payment was not completed.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Don't worry, you haven't been charged. You can try again whenever
          you're ready.
        </p>

        {/* Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 text-left">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-amber-500 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-amber-800 mb-1">
                Having trouble?
              </h3>
              <p className="text-amber-700 text-sm">
                If you're experiencing issues with payment, please contact our
                support team or try a different payment method.
              </p>
            </div>
          </div>
        </div>

        {/* Why Go Premium */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">
            Why upgrade to Premium?
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-purple-500">⭐</span>
              <span className="text-gray-700">
                Access exclusive premium lessons
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500">⭐</span>
              <span className="text-gray-700">
                Create unlimited lessons
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500">⭐</span>
              <span className="text-gray-700">
                One-time payment, lifetime access
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/pricing"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Try Again
          </Link>
          <Link
            to="/"
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
          >
            Go Home
          </Link>
        </div>

        {/* Support Link */}
        <p className="mt-6 text-gray-500 text-sm">
          Need help?{" "}
          <Link to="/contact" className="text-blue-600 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PaymentCancel;
