import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { showError } from "../utils/toast";
import api from "../services/api";

const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Check if user is premium (this should come from your backend/context)
  const isPremium = user?.isPremium || false;

  const features = [
    {
      feature: "Browse Public Lessons",
      free: true,
      premium: true,
    },
    {
      feature: "Save Lessons to Favorites",
      free: true,
      premium: true,
    },
    {
      feature: "Create Lessons",
      free: "Up to 5",
      premium: "Unlimited",
    },
    {
      feature: "Access Premium Lessons",
      free: false,
      premium: true,
    },
    {
      feature: "Create Premium Lessons",
      free: false,
      premium: true,
    },
    {
      feature: "Ad-Free Experience",
      free: false,
      premium: true,
    },
    {
      feature: "Priority Listing",
      free: false,
      premium: true,
    },
    {
      feature: "Featured Badge on Profile",
      free: false,
      premium: true,
    },
    {
      feature: "Early Access to New Features",
      free: false,
      premium: true,
    },
    {
      feature: "Priority Support",
      free: false,
      premium: true,
    },
  ];

  const handleUpgrade = async () => {
    if (!user) {
      showError("Please login to upgrade");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/payments/create-checkout-session", {
        userId: user.uid,
        email: user.email,
      });

      if (response.data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.url;
      } else {
        showError("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      showError(error?.response?.data?.message || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            Pricing Plans
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock the full potential of Life Lessons with our Premium plan.
            One-time payment, lifetime access.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900">৳0</span>
              <span className="text-gray-500 ml-2">forever</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Browse all public lessons</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Save lessons to favorites</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">Create up to 5 lessons</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-400">Access premium lessons</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-400">Ad-free experience</span>
              </li>
            </ul>
            <button
              disabled
              className="w-full py-4 bg-gray-100 text-gray-500 font-semibold rounded-xl cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Premium ⭐</h3>
              <p className="text-white/80">Unlock everything, forever</p>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold">৳1500</span>
              <span className="text-white/80 ml-2">one-time</span>
              <p className="text-sm text-white/70 mt-1">Lifetime access</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Everything in Free</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Unlimited lesson creation</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Access all premium lessons</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Create premium lessons</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Ad-free experience</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Priority listing & support</span>
              </li>
            </ul>

            {isPremium ? (
              <div className="w-full py-4 bg-white/20 text-white font-semibold rounded-xl text-center">
                ✓ You're Premium!
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Upgrade to Premium"
                )}
              </button>
            )}
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Feature Comparison
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Free
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">
                    Premium ⭐
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {features.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof item.free === "boolean" ? (
                        item.free ? (
                          <svg
                            className="w-5 h-5 text-green-500 mx-auto"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-300 mx-auto"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )
                      ) : (
                        <span className="text-sm text-gray-600">{item.free}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof item.premium === "boolean" ? (
                        item.premium ? (
                          <svg
                            className="w-5 h-5 text-green-500 mx-auto"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-300 mx-auto"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )
                      ) : (
                        <span className="text-sm font-medium text-purple-600">
                          {item.premium}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is this a one-time payment?
              </h3>
              <p className="text-gray-600">
                Yes! Pay once and enjoy Premium benefits forever. No recurring
                charges, no hidden fees.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit/debit cards through Stripe, including
                Visa, Mastercard, and American Express.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I get a refund?
              </h3>
              <p className="text-gray-600">
                We offer a 7-day money-back guarantee. If you're not satisfied,
                contact our support team for a full refund.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        {!isPremium && (
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions? Feel free to{" "}
              <Link to="/contact" className="text-blue-600 hover:underline">
                contact us
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
