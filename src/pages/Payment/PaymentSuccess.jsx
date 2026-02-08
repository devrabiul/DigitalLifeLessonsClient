import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaCircleCheck,
  FaCrown,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa6";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const { user, refreshUserStatus } = useAuth();
  const sessionId = searchParams.get("session_id");

  const toastShown = React.useRef(false);

  useEffect(() => {
    let interval;
    const verifyPayment = async () => {
      if (!user?.email || !verifying || toastShown.current) return;

      try {
        const { data } = await api.get(
          `/payments/verify-payment?userId=${user.email}&session_id=${sessionId}`,
        );
        if (data.success && !toastShown.current) {
          toastShown.current = true;
          toast.success("Welcome to Premium!");
          setVerifying(false);
          await refreshUserStatus();
          if (interval) clearInterval(interval);
        }
      } catch (error) {
        console.error("Verification failed:", error);
      }
    };

    if (user && verifying) {
      interval = setInterval(verifyPayment, 3000);
      verifyPayment();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [user, sessionId, verifying, refreshUserStatus]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
        {verifying ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <FaSpinner className="text-5xl text-blue-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Verifying Payment...
            </h1>
            <p className="text-gray-600">
              Please wait while we confirm your upgrade.
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <FaCircleCheck className="text-5xl text-green-500" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Payment Successful!
              </h1>
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">
                <FaCrown /> PREMIUM UNLOCKED
              </div>
            </div>
            <p className="text-gray-600">
              Thank you for supporting Life Lessons! Your account has been
              upgraded to Premium for life.
            </p>
            <div className="pt-6">
              <Link
                to="/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors group"
              >
                Go to Dashboard{" "}
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
