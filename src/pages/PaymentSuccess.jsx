import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

// Pre-generate confetti positions to avoid Math.random during render
const generateConfetti = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    left: `${(i * 5 + Math.random() * 5) % 100}%`,
    top: `${(i * 7 + Math.random() * 5) % 100}%`,
    color: ["#10B981", "#8B5CF6", "#F59E0B", "#EC4899"][i % 4],
    delay: `${(i * 0.1) % 2}s`,
    duration: `${2 + (i * 0.2) % 2}s`,
  }));
};

const CONFETTI_ITEMS = generateConfetti();

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user, refreshUser } = useAuth();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyAndUpdatePayment = async () => {
      if (!sessionId || !user) {
        setVerifying(false);
        return;
      }

      try {
        // Verify payment with backend and update user premium status
        const response = await api.get(`/payments/verify/${sessionId}`);
        
        if (response.data?.success) {
          setVerified(true);
          // Refresh user data to get updated premium status
          await refreshUser();
        }
      } catch (error) {
        console.error("Payment verification error:", error);
      } finally {
        setVerifying(false);
      }
    };

    verifyAndUpdatePayment();
  }, [sessionId, user, refreshUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center relative">
        {/* Success Animation */}
        <div className="w-32 h-32 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Confetti Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {CONFETTI_ITEMS.map((item, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                left: item.left,
                top: item.top,
                backgroundColor: item.color,
                animationDelay: item.delay,
                animationDuration: item.duration,
              }}
            />
          ))}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-600 mb-2">
          Congratulations! You are now a{" "}
          <span className="font-semibold text-purple-600">Premium</span> member.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Enjoy unlimited access to all premium features and lessons.
        </p>

        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold mb-8">
          <span>⭐</span>
          <span>Premium Member</span>
        </div>

        {/* What's Next */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">
            What you can do now:
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">
                Access all premium lessons from top contributors
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">
                Create unlimited premium lessons
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">
                Enjoy an ad-free experience
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/dashboard"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/lessons"
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
          >
            Browse Lessons
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
