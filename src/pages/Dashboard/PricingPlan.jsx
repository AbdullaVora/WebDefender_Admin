// import React, { useState } from 'react';

// const PricingPlan = () => {
//   const [billingCycle, setBillingCycle] = useState('monthly');

//   const plans = [
//     {
//       name: "Free",
//       assets: 5,
//       parallelScans: 2,
//       priceMonthly: 0,
//       features: [
//         "Save scan data for up to 30 days",
//         "Some tools included",
//         "Small business scope",
//         "Simple reporting",
//         "Two-Factor Authentication"
//       ],
//       current: true,
//       color: "bg-green-50",
//       buttonColor: "bg-green-200 text-green-800"
//     },
//     {
//       name: "Basic",
//       assets: 5,
//       parallelScans: 2,
//       priceMonthly: 6627,
//       originalPrice: 7797,
//       features: [
//         "Everything in Free",
//         "All tools included",
//         "Light, Deep and Custom modes",
//         "Automation capabilities",
//         "Multiple workspaces",
//         "Manual findings",
//         "Continuous security monitoring"
//       ],
//       color: "bg-blue-50",
//       buttonColor: "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
//     },
//     {
//       name: "Advanced",
//       assets: 50,
//       parallelScans: 5,
//       priceMonthly: 14815,
//       originalPrice: 17429,
//       features: [
//         "Everything in Basic",
//         "Medium business scope",
//         "Scan behind logged in",
//         "Scan internal networks",
//         "Advanced reporting"
//       ],
//       color: "bg-indigo-50",
//       buttonColor: "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
//     },
//     {
//       name: "Teams",
//       assets: 500,
//       parallelScans: 10,
//       priceMonthly: 30800,
//       originalPrice: 36235,
//       features: [
//         "Everything in Advanced",
//         "Large business scope",
//         "API access",
//         "White label reports",
//         "Multi-user access",
//         "Integrations",
//         "Premium support",
//         "Additional payment methods"
//       ],
//       color: "bg-purple-50",
//       buttonColor: "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
//     }
//   ];

//   const formatPrice = (price) => {
//     if (price === 0) return "₹0";
//     return `₹${price.toLocaleString('en-IN')}`;
//   };

//   return (
//     <div className=" mx-auto p-4 bg-white">
//       <div className="flex flex-col mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">Change plan</h1>
//       </div>

//       <div className="flex justify-between mb-8">
//         <div className="inline-flex bg-gray-200 rounded-full p-1">
//           <button
//             className={`px-4 py-2 rounded-full ${
//               billingCycle === 'monthly' ? 'bg-white shadow-sm' : ''
//             }`}
//             onClick={() => setBillingCycle('monthly')}
//           >
//             Monthly
//           </button>
//           <button
//             className={`px-4 py-2 rounded-full flex items-center ${
//               billingCycle === 'yearly' ? 'bg-white shadow-sm' : ''
//             }`}
//             onClick={() => setBillingCycle('yearly')}
//           >
//             Yearly
//           </button>
//         </div>

//         <div className="flex items-center space-x-6">
//           <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
//             <span>Explore our Services</span>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//             </svg>
//           </a>

//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {plans.map((plan) => (
//           <div
//             key={plan.name}
//             className={`rounded-lg border overflow-hidden transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${plan.current ? plan.color : 'bg-gray-50'}`}
//           >
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h2>
//               <div className="space-y-1 text-sm text-gray-600 mb-6">
//                 <p>Up to {plan.assets} assets</p>
//                 <p>Up to {plan.parallelScans} parallel scans</p>
//               </div>

//               {plan.originalPrice && (
//                 <div className="text-gray-500 line-through text-sm">₹{plan.originalPrice.toLocaleString('en-IN')}</div>
//               )}

//               <div className="flex items-baseline mb-4">
//                 <div className="text-2xl font-bold">{formatPrice(plan.priceMonthly)}</div>
//                 <div className="text-gray-500 ml-1">/month</div>
//               </div>

//               {plan.current ? (
//                 <button className={`w-full py-2 rounded-md font-medium ${plan.buttonColor}`}>
//                   Current plan
//                 </button>
//               ) : (
//                 <button className={`w-full py-2 rounded-md font-medium ${plan.buttonColor}`}>
//                   Upgrade to {plan.name}
//                 </button>
//               )}
//             </div>

//             <div className="p-6 pt-0">
//               <ul className="space-y-3">
//                 {plan.features.map((feature, index) => (
//                   <li key={index} className="flex items-start">
//                     <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span className="text-sm text-gray-600">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Creative addition: Feature comparison section */}
//       <div className="mt-16 bg-gray-50 rounded-lg p-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-6">Feature Comparison</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Feature</th>
//                 {plans.map(plan => (
//                   <th key={plan.name} className="py-3 px-4 text-center text-sm font-medium text-gray-700">
//                     {plan.name}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               <tr>
//                 <td className="py-3 px-4 text-sm text-gray-700">Assets</td>
//                 {plans.map(plan => (
//                   <td key={plan.name} className="py-3 px-4 text-center text-sm text-gray-600">
//                     {plan.assets}
//                   </td>
//                 ))}
//               </tr>
//               <tr>
//                 <td className="py-3 px-4 text-sm text-gray-700">Parallel Scans</td>
//                 {plans.map(plan => (
//                   <td key={plan.name} className="py-3 px-4 text-center text-sm text-gray-600">
//                     {plan.parallelScans}
//                   </td>
//                 ))}
//               </tr>
//               <tr>
//                 <td className="py-3 px-4 text-sm text-gray-700">Data Retention</td>
//                 <td className="py-3 px-4 text-center text-sm text-gray-600">30 days</td>
//                 <td className="py-3 px-4 text-center text-sm text-gray-600">90 days</td>
//                 <td className="py-3 px-4 text-center text-sm text-gray-600">180 days</td>
//                 <td className="py-3 px-4 text-center text-sm text-gray-600">365 days</td>
//               </tr>
//               <tr>
//                 <td className="py-3 px-4 text-sm text-gray-700">Advanced Security</td>
//                 <td className="py-3 px-4 text-center text-sm text-gray-600">
//                   <span className="text-red-500">✗</span>
//                 </td>
//                 <td className="py-3 px-4 text-center text-sm text-gray-600">
//                   <span className="text-green-500">✓</span>
//                 </td>
//                 <td className="py-3 px-4 text-center text-sm text-gray-600">
//                   <span className="text-green-500">✓</span>
//                 </td>
//                 <td className="py-3 px-4 text-center text-sm text-gray-600">
//                   <span className="text-green-500">✓</span>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Creative addition: FAQ section */}
//       <div className="mt-10">
//         <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
//         <div className="space-y-4">
//           <div className="p-4 border rounded-lg">
//             <h3 className="font-medium text-gray-800 mb-2">What happens if I exceed my asset limit?</h3>
//             <p className="text-gray-600 text-sm">You'll be notified when you're approaching your limit. You can upgrade your plan at any time to increase your asset allowance.</p>
//           </div>
//           <div className="p-4 border rounded-lg">
//             <h3 className="font-medium text-gray-800 mb-2">Can I switch between plans?</h3>
//             <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
//           </div>
//           <div className="p-4 border rounded-lg">
//             <h3 className="font-medium text-gray-800 mb-2">Is there a trial period for paid plans?</h3>
//             <p className="text-gray-600 text-sm">We offer a 14-day trial for all paid plans. Contact our sales team for more information.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingPlan;

import React, { useState } from "react";
import {
  Check,
  X,
  ExternalLink,
  Shield,
  Database,
  Users,
  Zap,
} from "lucide-react";
import PageTitle from "../../components/PageTitle";

const PricingPlan = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Free",
      icon: <Shield size={24} />,
      assets: 5,
      parallelScans: 2,
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        "Save scan data for up to 30 days",
        "Some tools included",
        "Small business scope",
        "Simple reporting",
        "Two-Factor Authentication",
      ],
      current: true,
      buttonText: "Current Plan",
    },
    {
      name: "Basic",
      icon: <Database size={24} />,
      assets: 25,
      parallelScans: 2,
      priceMonthly: 6627,
      priceYearly: 71371,
      originalPriceMonthly: 7797,
      originalPriceYearly: 93564,
      features: [
        "Everything in Free",
        "All tools included",
        "Light, Deep and Custom modes",
        "Automation capabilities",
        "Multiple workspaces",
        "Manual findings",
        "Continuous security monitoring",
      ],
      buttonText: "Upgrade to Basic",
    },
    {
      name: "Advanced",
      icon: <Zap size={24} />,
      assets: 50,
      parallelScans: 5,
      priceMonthly: 14815,
      priceYearly: 159602,
      originalPriceMonthly: 17429,
      originalPriceYearly: 209148,
      features: [
        "Everything in Basic",
        "Medium business scope",
        "Scan behind logged in",
        "Scan internal networks",
        "Advanced reporting",
      ],
      buttonText: "Upgrade to Advanced",
    },
    {
      name: "Teams",
      icon: <Users size={24} />,
      assets: 500,
      parallelScans: 10,
      priceMonthly: 30800,
      priceYearly: 332640,
      originalPriceMonthly: 36235,
      originalPriceYearly: 434820,
      features: [
        "Everything in Advanced",
        "Large business scope",
        "API access",
        "White label reports",
        "Multi-user access",
        "Integrations",
        "Premium support",
        "Additional payment methods",
      ],
      buttonText: "Upgrade to Teams",
    },
  ];

  const formatPrice = (price) => {
    if (price === 0) return "₹0";
    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen main-container bg-[#0E1427] text-white p-6">
      <PageTitle
        title="Plans & Pricing"
        desc="Choose the perfect security solution for your organization. All plans include our core security features with flexible options to scale as you grow."
      />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
        <div className="inline-flex bg-[#1E293B] rounded-full p-1">
          <button
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              billingCycle === "monthly"
                ? "bg-[#04D2D2] text-[#0E1427] shadow-md shadow-[#04D2D280]"
                : "text-gray-300"
            }`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm flex items-center transition-all duration-300 ${
              billingCycle === "yearly"
                ? "bg-[#04D2D2] text-[#0E1427] shadow-md shadow-[#04D2D280]"
                : "text-gray-300"
            }`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly
            <span className="ml-2 text-xs bg-[#0E1427] text-[#04D2D2] px-2 py-1 rounded-full">
              Save 10%
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="#comparison"
            className="flex items-center text-[#04D2D2] hover:text-white transition-colors duration-300"
          >
            <span className="text-sm">Compare Features</span>
            <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-[#040C1F] border ${
              plan.current ? "border-[#04D2D2]" : "border-[#1E293B]"
            } rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#04D2D280] hover:border-[#04D2D2] group`}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div
                  className={`p-2 rounded-lg bg-[#1E293B] ${
                    plan.current ? "text-[#04D2D2]" : "text-gray-300"
                  } mr-3`}
                >
                  {plan.icon}
                </div>
                <h2 className="text-xl font-bold text-white">{plan.name}</h2>
              </div>

              <div className="space-y-1 text-sm text-gray-400 mb-6">
                <p>Up to {plan.assets} assets</p>
                <p>Up to {plan.parallelScans} parallel scans</p>
              </div>

              {(billingCycle === "monthly"
                ? plan.originalPriceMonthly
                : plan.originalPriceYearly) && (
                <div className="text-gray-500 line-through text-sm">
                  {formatPrice(
                    billingCycle === "monthly"
                      ? plan.originalPriceMonthly
                      : plan.originalPriceYearly
                  )}
                </div>
              )}

              <div className="flex items-baseline mb-4">
                <div className="text-2xl font-bold text-white">
                  {formatPrice(
                    billingCycle === "monthly"
                      ? plan.priceMonthly
                      : plan.priceYearly
                  )}
                </div>
                <div className="text-gray-400 ml-1 text-sm">
                  /{billingCycle === "monthly" ? "month" : "year"}
                </div>
              </div>

              <button
                className={`w-full py-2 rounded-md font-medium transition-all duration-300 ${
                  plan.current
                    ? "bg-[#04D2D2] text-[#0E1427]"
                    : "bg-[#1E293B] text-white border border-[#1E293B] hover:border-[#04D2D2] hover:text-[#04D2D2]"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>

            <div className="p-6 border-t border-[#1E293B]">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-[#04D2D2] mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Feature comparison section */}
      <div
        id="comparison"
        className="mt-16 bg-[#040C1F] border border-[#1E293B] rounded-xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6">
          Feature Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-300 border-b border-[#1E293B]">
                  Feature
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className="py-3 px-4 text-center text-sm font-medium text-gray-300 border-b border-[#1E293B]"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-300 border-b border-[#1E293B]">
                  Assets
                </td>
                {plans.map((plan) => (
                  <td
                    key={plan.name}
                    className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]"
                  >
                    {plan.assets}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-300 border-b border-[#1E293B]">
                  Parallel Scans
                </td>
                {plans.map((plan) => (
                  <td
                    key={plan.name}
                    className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]"
                  >
                    {plan.parallelScans}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-300 border-b border-[#1E293B]">
                  Data Retention
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  30 days
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  90 days
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  180 days
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  365 days
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-300 border-b border-[#1E293B]">
                  Advanced Security Tools
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  <X size={18} className="inline text-red-400" />
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  <Check size={18} className="inline text-[#04D2D2]" />
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  <Check size={18} className="inline text-[#04D2D2]" />
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  <Check size={18} className="inline text-[#04D2D2]" />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-300 border-b border-[#1E293B]">
                  API Access
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  <X size={18} className="inline text-red-400" />
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  <X size={18} className="inline text-red-400" />
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  <X size={18} className="inline text-red-400" />
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  <Check size={18} className="inline text-[#04D2D2]" />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-300 border-b border-[#1E293B]">
                  Multi-user Access
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  <X size={18} className="inline text-red-400" />
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  <X size={18} className="inline text-red-400" />
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  <Check size={18} className="inline text-[#04D2D2]" />
                </td>
                <td className="py-3 px-4 text-center text-sm text-gray-400 border-b border-[#1E293B]">
                  <Check size={18} className="inline text-[#04D2D2]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ section */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#040C1F] border border-[#1E293B] rounded-xl p-6 hover:border-[#04D2D2] transition-all duration-300">
            <h3 className="font-medium text-[#04D2D2] mb-3">
              What happens if I exceed my asset limit?
            </h3>
            <p className="text-gray-300 text-sm">
              You'll be notified when you're approaching your limit. You can
              upgrade your plan at any time to increase your asset allowance or
              purchase additional assets as needed.
            </p>
          </div>
          <div className="bg-[#040C1F] border border-[#1E293B] rounded-xl p-6 hover:border-[#04D2D2] transition-all duration-300">
            <h3 className="font-medium text-[#04D2D2] mb-3">
              Can I switch between plans?
            </h3>
            <p className="text-gray-300 text-sm">
              Yes, you can upgrade or downgrade your plan at any time. Upgrades
              take effect immediately, while downgrades will be applied at the
              end of your current billing cycle.
            </p>
          </div>
          <div className="bg-[#040C1F] border border-[#1E293B] rounded-xl p-6 hover:border-[#04D2D2] transition-all duration-300">
            <h3 className="font-medium text-[#04D2D2] mb-3">
              Is there a trial period for paid plans?
            </h3>
            <p className="text-gray-300 text-sm">
              We offer a 14-day trial for all paid plans with no credit card
              required. Experience the full feature set before making a
              commitment.
            </p>
          </div>
          <div className="bg-[#040C1F] border border-[#1E293B] rounded-xl p-6 hover:border-[#04D2D2] transition-all duration-300">
            <h3 className="font-medium text-[#04D2D2] mb-3">
              Do you offer custom enterprise solutions?
            </h3>
            <p className="text-gray-300 text-sm">
              Absolutely. For organizations with specialized security needs,
              contact our sales team for a tailored solution that meets your
              specific requirements.
            </p>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="mt-16 bg-gradient-to-r from-[#040C1F] to-[#0E1427] border border-[#1E293B] rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Need Help Choosing the Right Plan?
        </h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Our security experts are ready to help you find the perfect solution
          for your organization's needs. Schedule a free consultation today.
        </p>
        <button className="bg-[#04D2D2] text-[#0E1427] px-6 py-3 rounded-lg font-medium hover:bg-[#03BEBE] transition-colors duration-300">
          Contact Sales
        </button>
      </div>
    </div>
  );
};

export default PricingPlan;
