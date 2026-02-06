import React from "react";
import { Link } from "react-router-dom";
import { FaCircleXmark, FaArrowLeft, FaEnvelope } from "react-icons/fa6";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <FaCircleXmark className="text-5xl text-red-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Payment Cancelled
            </h1>
            <p className="text-gray-600">
              The payment process was cancelled or didn't complete. No charges
              were made to your account.
            </p>
          </div>

          <div className="pt-6 space-y-3">
            <Link
              to="/pricing"
              className="w-full inline-flex items-center justify-center gap-2 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
            >
              <FaArrowLeft /> Try Again
            </Link>
            <Link
              to="/contact"
              className="w-full inline-flex items-center justify-center gap-2 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              <FaEnvelope /> Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
