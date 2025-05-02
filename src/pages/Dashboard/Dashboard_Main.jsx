// // import React from "react";
// // import Header from "../../components/Header";
// // import Aside from "../../components/Aside";
// // import { GrPieChart } from "react-icons/gr";
// // import LanguageIcon from "@mui/icons-material/Language";
// // import DnsIcon from "@mui/icons-material/Dns";
// // import WifiTetheringErrorIcon from "@mui/icons-material/WifiTetheringError";

// // // const Main = () => {
// // //     const scanners = [{ icon: <LanguageIcon fontSize="inherit" className='text-[#04D2D2]' style={{ fontSize: '55px' }} />, name: 'IpAddress' }, { icon: <DnsIcon fontSize="inherit" className='text-[#04D2D2]' style={{ fontSize: '55px' }} />, name: 'Hostname' }, { icon: <WifiTetheringErrorIcon fontSize="inherit" className='text-[#04D2D2]' style={{ fontSize: '55px' }} />, name: 'Ports' }]
// // //     return (
// // //         <>
// // //             <Header />
// // //             <Aside />
// // //             <div className='main-container'>
// // //                 <h2 className='text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]'>Dashboard</h2>
// // //                 <div className="scannerBox mx-2 my-5 p-2">
// // //                     <span className='flex items-center gap-2 text-[#04D2D2] font-semibold'><GrPieChart color='#04D2D2' size={22} /> Scanning Surface Summary </span>
// // //                     <div className="flex justify-between flex-wrap items-cente my-3">
// // //                         {scanners.map((scanner, index) => (
// // //                             <div key={index} className="boxes flex justify-center gap-18 rounded-2xl items-center mb-4 bg-[#040C1F] p-5 w-[415px] h-[100px]">
// // //                                 {scanner.icon}
// // //                                 <span className='text-[#04D2D2] text-[55px]'>1</span>
// // //                                 <span className='text-[#04D2D2] font-bold text-[25px]'>{scanner.name}</span>
// // //                             </div>
// // //                         ))}

// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </>
// // //     )
// // // }

// // const Dashboard_Main = () => {
// //   const scanners = [
// //     {
// //       icon: (
// //         <LanguageIcon
// //           fontSize="inherit"
// //           className="text-[#04D2D2]"
// //           style={{ fontSize: "55px" }}
// //         />
// //       ),
// //       name: "IpAddress",
// //     },
// //     {
// //       icon: (
// //         <DnsIcon
// //           fontSize="inherit"
// //           className="text-[#04D2D2]"
// //           style={{ fontSize: "55px" }}
// //         />
// //       ),
// //       name: "Hostname",
// //     },
// //     {
// //       icon: (
// //         <WifiTetheringErrorIcon
// //           fontSize="inherit"
// //           className="text-[#04D2D2]"
// //           style={{ fontSize: "55px" }}
// //         />
// //       ),
// //       name: "Ports",
// //     },
// //   ];

// //   return (
// //     <div className="main-container">
// //       <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
// //         Dashboard
// //       </h2>
// //       <div className="scannerBox mx-2 my-5 p-2">
// //         <span className="flex items-center gap-2 text-[#04D2D2] font-semibold">
// //           <GrPieChart color="#04D2D2" size={22} /> Scanning Surface Summary
// //         </span>
// //         <div className="flex justify-between flex-wrap items-center my-3">
// //           {scanners.map((scanner, index) => (
// //             <div
// //               key={index}
// //               className="boxes flex justify-center gap-18 rounded-2xl items-center mb-4 bg-[#040C1F] p-5 w-[415px] h-[100px]"
// //             >
// //               {scanner.icon}
// //               <span className="text-[#04D2D2] text-[55px]">1</span>
// //               <span className="text-[#04D2D2] font-bold text-[25px]">
// //                 {scanner.name}
// //               </span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard_Main;

// // import React from "react";
// // import Header from "../../components/Header";
// // import Aside from "../../components/Aside";
// // import { GrPieChart } from "react-icons/gr";
// // import LanguageIcon from "@mui/icons-material/Language";
// // import DnsIcon from "@mui/icons-material/Dns";
// // import WifiTetheringErrorIcon from "@mui/icons-material/WifiTetheringError";

// // // const Main = () => {
// // //     const scanners = [{ icon: <LanguageIcon fontSize="inherit" className='text-[#04D2D2]' style={{ fontSize: '55px' }} />, name: 'IpAddress' }, { icon: <DnsIcon fontSize="inherit" className='text-[#04D2D2]' style={{ fontSize: '55px' }} />, name: 'Hostname' }, { icon: <WifiTetheringErrorIcon fontSize="inherit" className='text-[#04D2D2]' style={{ fontSize: '55px' }} />, name: 'Ports' }]
// // //     return (
// // //         <>
// // //             <Header />
// // //             <Aside />
// // //             <div className='main-container'>
// // //                 <h2 className='text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]'>Dashboard</h2>
// // //                 <div className="scannerBox mx-2 my-5 p-2">
// // //                     <span className='flex items-center gap-2 text-[#04D2D2] font-semibold'><GrPieChart color='#04D2D2' size={22} /> Scanning Surface Summary </span>
// // //                     <div className="flex justify-between flex-wrap items-cente my-3">
// // //                         {scanners.map((scanner, index) => (
// // //                             <div key={index} className="boxes flex justify-center gap-18 rounded-2xl items-center mb-4 bg-[#040C1F] p-5 w-[415px] h-[100px]">
// // //                                 {scanner.icon}
// // //                                 <span className='text-[#04D2D2] text-[55px]'>1</span>
// // //                                 <span className='text-[#04D2D2] font-bold text-[25px]'>{scanner.name}</span>
// // //                             </div>
// // //                         ))}

// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </>
// // //     )
// // // }

// // const Dashboard_Main = () => {
// //   const scanners = [
// //     {
// //       icon: (
// //         <LanguageIcon
// //           fontSize="inherit"
// //           className="text-[#04D2D2]"
// //           style={{ fontSize: "55px" }}
// //         />
// //       ),
// //       name: "IpAddress",
// //     },
// //     {
// //       icon: (
// //         <DnsIcon
// //           fontSize="inherit"
// //           className="text-[#04D2D2]"
// //           style={{ fontSize: "55px" }}
// //         />
// //       ),
// //       name: "Hostname",
// //     },
// //     {
// //       icon: (
// //         <WifiTetheringErrorIcon
// //           fontSize="inherit"
// //           className="text-[#04D2D2]"
// //           style={{ fontSize: "55px" }}
// //         />
// //       ),
// //       name: "Ports",
// //     },
// //   ];

// //   return (
// //     <div className="main-container">
// //       <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
// //         Dashboard
// //       </h2>
// //       <div className="scannerBox mx-2 my-5 p-2">
// //         <span className="flex items-center gap-2 text-[#04D2D2] font-semibold">
// //           <GrPieChart color="#04D2D2" size={22} /> Scanning Surface Summary
// //         </span>
// //         <div className="flex justify-between flex-wrap items-center my-3">
// //           {scanners.map((scanner, index) => (
// //             <div
// //               key={index}
// //               className="boxes flex justify-center gap-18 rounded-2xl items-center mb-4 bg-[#040C1F] p-5 w-[415px] h-[100px]"
// //             >
// //               {scanner.icon}
// //               <span className="text-[#04D2D2] text-[55px]">1</span>
// //               <span className="text-[#04D2D2] font-bold text-[25px]">
// //                 {scanner.name}
// //               </span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard_Main;

// import React, { useState } from 'react';

// const Dashboard_Main = () => {
//   // State for active tab
//   const [activeTab, setActiveTab] = useState('overview');

//   // Fixed data values
//   const scanData = {
//     scannedAssets: {
//       completed: 0,
//       total: 5
//     },
//     runningScans: {
//       active: 0,
//       total: 2
//     }
//   };

//   // Calculate percentage for the circle graphs
//   const scannedPercentage = (scanData.scannedAssets.completed / scanData.scannedAssets.total) * 100 || 0;
//   const runningPercentage = (scanData.runningScans.active / scanData.runningScans.total) * 100 || 0;

//   // Calculate stroke-dasharray values for SVG circles (circumference is 283 for r=45)
//   const scannedDashArray = `${scannedPercentage * 2.83} 283`;
//   const runningDashArray = `${runningPercentage * 2.83} 283`;

//   return (
//     <div className="main-container">
//       <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
//         Dashboard
//       </h2>
//       <div className="bg-[#0E1427] min-h-screen p-6">
//         <div className="mx-auto">
//           {/* <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1> */}

//           {/* Navigation Tabs */}
//           <div className="border-b border-gray-200 mb-6">
//             <div className="flex">
//               <button
//                 className={`px-4 py-2 font-medium transition-colors duration-200 ${activeTab === 'overview' ? 'border-b-3 border-[#04D2D2] text-[#04D2D2]' : 'text-gray-500 hover:text-[#04D2D2]'}`}
//                 onClick={() => setActiveTab('overview')}
//               >
//                 Overview
//               </button>
//               <button
//                 className={`px-4 py-2 font-medium relative transition-colors duration-200 ${activeTab === 'whatsNew' ? 'border-b-3 border-[#04D2D2] text-[#04D2D2]' : 'text-gray-500 hover:text-[#04D2D2]'}`}
//                 onClick={() => setActiveTab('whatsNew')}
//               >
//                 What's new
//                 <span className="absolute top-2 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
//               </button>
//               <button
//                 className={`px-4 py-2 font-medium transition-colors duration-200 ${activeTab === 'help' ? 'border-b-3 border-[#04D2D2] text-[#04D2D2]' : 'text-gray-500 hover:text-[#04D2D2]'}`}
//                 onClick={() => setActiveTab('help')}
//               >
//                 Help
//               </button>
//             </div>
//           </div>

//           {/* Tab Content */}
//           {activeTab === 'overview' && (
//             <>
//               {/* Attack Surface Summary */}
//               <div className="mb-8">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center">
//                     <svg className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//                     </svg>
//                     <h2 className="text-lg font-semibold text-[#04D2D2]">Attack surface summary</h2>
//                   </div>
//                   <span className="text-sm text-gray-400">Workspace overview</span>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   {[
//                     { value: '1', label: 'IP ADDRESS' },
//                     { value: '1', label: 'HOSTNAME' },
//                     { value: '1', label: 'PORT' },
//                     { value: '1', label: 'PROTOCOL' },
//                     { value: '0', label: 'SERVICES' },
//                     { value: '5', label: 'TECHNOLOGIES' }
//                   ].map((item, index) => (
//                     <div
//                       key={index}
//                       className="bg-[#040C1F] rounded-lg shadow-sm p-6 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-104 hover:shadow-[0px_0px_8px_#04D2D2] hover:bg-[#040c1fce] cursor-pointer"
//                     >
//                       <span className="text-4xl font-semibold text-[#04D2D2] mb-2">{item.value}</span>
//                       <span className="text-xs text-[#04D2D2] uppercase tracking-wider font-bold">{item.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Scan Activity */}
//               <div className="mb-8">
//                 <div className="flex items-center mb-4">
//                   <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
//                   </svg>
//                   <h2 className="text-lg font-semibold text-[#04D2D2]">Scan activity</h2>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-[#040C1F] rounded-lg p-6 transform transition-all duration-300 hover:scale-103 hover:shadow-[0px_0px_10px_#04D2D2] hover:bg-[#040c1fce] cursor-pointer">
//                     <div className="flex items-center mb-4">
//                       <svg className="h-4 w-4 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M13 10V3L4 14h7v7l9-11h-7z" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-500">Scanned assets</span>
//                     </div>

//                     <div className="flex justify-center">
//                       <div className="relative w-40 h-40">
//                         <svg className="w-full h-full" viewBox="0 0 100 100">
//                           {/* Background circle */}
//                           <circle
//                             cx="50" cy="50" r="45"
//                             fill="none"
//                             stroke="#e6e6e6"
//                             strokeWidth="10"
//                           />

//                           {/* Progress circle - fixed at 0/5 ratio */}
//                           <circle
//                             cx="50" cy="50" r="45"
//                             fill="none"
//                             stroke="#60a5fa"
//                             strokeWidth="10"
//                             strokeLinecap="round"
//                             strokeDasharray={scannedDashArray}
//                             transform="rotate(-90 50 50)"
//                           />
//                         </svg>
//                         <div className="absolute inset-0 flex flex-col items-center justify-center">
//                           <span className="text-3xl font-light text-blue-500">{scanData.scannedAssets.completed}</span>
//                           <span className="text-sm text-gray-500">/ {scanData.scannedAssets.total}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bg-[#040C1F] rounded-lg shadow-sm p-6 transform transition-all duration-300 hover:scale-103 hover:shadow-[0px_0px_10px_#04D2D2] hover:bg-[#040c1fce] cursor-pointer">
//                     <div className="flex items-center mb-4">
//                       <svg className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4l3 3" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-500">Running scans</span>
//                     </div>

//                     <div className="flex justify-center">
//                       <div className="relative w-40 h-40">
//                         <svg className="w-full h-full" viewBox="0 0 100 100">
//                           {/* Background circle */}
//                           <circle
//                             cx="50" cy="50" r="45"
//                             fill="none"
//                             stroke="#e6e6e6"
//                             strokeWidth="10"
//                           />

//                           {/* Progress circle - fixed at 0/2 ratio */}
//                           <circle
//                             cx="50" cy="50" r="45"
//                             fill="none"
//                             stroke="#60a5fa"
//                             strokeWidth="10"
//                             strokeLinecap="round"
//                             strokeDasharray={runningDashArray}
//                             transform="rotate(-90 50 50)"
//                           />
//                         </svg>
//                         <div className="absolute inset-0 flex flex-col items-center justify-center">
//                           <span className="text-3xl font-light text-blue-500">{scanData.runningScans.active}</span>
//                           <span className="text-sm text-gray-500">/ {scanData.runningScans.total}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Latest Scans */}
//               <div>
//                 <div className="flex items-center mb-4">
//                   <svg className="h-5 w-5 text-green-400 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <circle cx="12" cy="12" r="10" />
//                     <path d="M12 6v6l4 2" />
//                   </svg>
//                   <h2 className="text-lg font-semibold text-[#04D2D2]">Latest scans</h2>
//                 </div>

//                 <div className="bg-[#040C1F] rounded-lg shadow-sm overflow-hidden">
//                   <div className="p-4 border-b border-[#04D2D2] transition-all duration-200 hover:scale-101 hover:bg-[#040c1fce] cursor-pointer">
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center">
//                         <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
//                           <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
//                             <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
//                           </svg>
//                         </div>
//                         <div>
//                           <p className="font-medium text-[#04D2D2]">Network Scan</p>
//                           <p className="text-sm text-gray-500">Completed 5 hours ago</p>
//                         </div>
//                       </div>
//                       <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
//                         Successful
//                       </div>
//                     </div>
//                   </div>

//                   <div className="p-4 transition-all duration-200 hover:scale-101 hover:bg-[#040c1fce] cursor-pointer">
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center">
//                         <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 mr-3">
//                           <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
//                             <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
//                           </svg>
//                         </div>
//                         <div>
//                           <p className="font-medium text-[#04D2D2]">Vulnerability Scan</p>
//                           <p className="text-sm text-gray-500">Completed 1 day ago</p>
//                         </div>
//                       </div>
//                       <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
//                         3 Issues Found
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           {activeTab === 'whatsNew' && (
//             <div className="bg-[#040C1F] rounded-lg shadow">
//               <h3 className="text-lg font-semibold text-[#04D2D2] mb-4 px-5 pt-5">What's New</h3>
//               <div className="space-y-4">
//                 <div className="flex items-start hover:bg-[#6262621e] p-4">
//                   <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 mt-1 flex-shrink-0">
//                     <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-400">New Feature: Enhanced Scanning Engine</p>
//                     <p className="text-sm text-gray-500 mt-1">Our scanning engine has been upgraded to provide 30% faster results and improved detection rates.</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start hover:bg-[#6262621e] p-4">
//                   <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 mt-1 flex-shrink-0">
//                     <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-400">New Integration: SIEM Connectors</p>
//                     <p className="text-sm text-gray-500 mt-1">Connect your Security Information and Event Management systems for consolidated reporting.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'help' && (
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="text-lg font-semibold mb-4">Help Center</h3>
//               <div className="space-y-4">
//                 <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
//                   <h4 className="font-medium text-blue-700">Getting Started Guide</h4>
//                   <p className="text-sm text-gray-600 mt-1">Learn the basics of setting up scans and interpreting results.</p>
//                 </div>

//                 <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
//                   <h4 className="font-medium text-blue-700">Advanced Configuration</h4>
//                   <p className="text-sm text-gray-600 mt-1">Detailed options for customizing your scanning parameters.</p>
//                 </div>

//                 <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
//                   <h4 className="font-medium text-blue-700">Troubleshooting</h4>
//                   <p className="text-sm text-gray-600 mt-1">Solutions for common issues and error messages.</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard_Main;

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"
import {
  Shield,
  Activity,
  Clock,
  AlertTriangle,
  Server,
  Database,
  Globe,
  Zap,
  ChevronRight,
  Search,
  Menu,
  Bell,
  User,
} from "lucide-react";
import apiInstance from "../../api/instance";
import { Link } from "react-router-dom";

const Dashboard_Main = () => {


  useEffect(() => {
    const welcomeShown = localStorage.getItem('welcome_shown');

    if (!welcomeShown) {
      Swal.fire({
        title: 'Welcome to Web Scanner!',
        text: 'We\'re happy to have you here.',
        background: '#0b0f1a',
        color: '#00e0d0',
        icon: 'success',
        iconColor: '#00e0d0',
        timer: 1500, // auto close after 3 seconds
        timerProgressBar: true, // show progress bar
        showConfirmButton: false, // hide OK button
      }).then(() => {
        localStorage.setItem('welcome_shown', 'true');
      });
    }
  }, []);


  // State for scan data with more realistic initial values
  const [scanData, setScanData] = useState({
    scannedAssets: {
      completed: 3,
      total: 5,
    },
    runningScans: {
      active: 1,
      total: 2,
    },
    recentEvents: [
      {
        id: 1,
        type: "Network Scan",
        status: "Successful",
        time: "5 hours ago",
        description: "Completed scan on 192.168.1.0/24",
        icon: "network",
        statusColor: "green",
      },
      {
        id: 2,
        type: "Vulnerability Scan",
        status: "3 Issues Found",
        time: "1 day ago",
        description: "Web server vulnerabilities detected",
        icon: "security",
        statusColor: "yellow",
      },
      {
        id: 3,
        type: "Asset Discovery",
        status: "Completed",
        time: "2 days ago",
        description: "Found 2 new devices on network",
        icon: "discovery",
        statusColor: "blue",
      },
    ],
    criticalAlerts: 2,
    highAlerts: 5,
    mediumAlerts: 8,
    lowAlerts: 12,
  });

  // For time display
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userId, setUserId] = useState(null);
  const [ipCount, setIpCount] = useState(0);
  const [techCount, setTechCount] = useState(0);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id)
  }, [])


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch data from API
  useEffect(() => {
    if (!userId) return; // 🚫 Skip if userId isn't ready

    const fetchReports = async () => {
      try {
        // setLoading(true);
        const response = await apiInstance.get('/api/reports', {
          params: {
            userId
          }
        });
        const data = response.data;
        // setApiData(data);

        const allReports = transformApiData(data);
        console.log("All reports:", allReports); // Debugging line
        const filteredIPReports = allReports.filter(report => report.tool === "WAF Detector");

        //count ip address
        let totalIp = 0;
        filteredIPReports.forEach(item => {
          const ip = item?.rawData?.IP_Information?.IPAddress;
          if (ip) totalIp += 1;
        });

        setIpCount(totalIp);

        // Count all technologies across all categories
        const filteredTechReports = allReports.filter(report => report.tool === "Technologies_Report" || report.tool === "Technologies Report")
        let totalTech = 0;
        filteredTechReports.forEach(item => {
          const detectedTech = item?.rawData?.detected_technologies;
          if (detectedTech) {
            // Sum up technologies from all categories
            Object.values(detectedTech).forEach(category => {
              if (Array.isArray(category)) {
                totalTech += category.length;
              }
            });
          }
        });
        setTechCount(totalTech);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        // setLoading(false);
      }
    };

    fetchReports();
  }, [userId]); // ✅ Trigger this effect only after userId is set

  const transformApiData = (data) => {
    console.log("Transforming API data:", data); // Debugging line
    const allReports = [];

    // Process each report type and map to common format
    Object.keys(data).forEach(reportType => {
      data[reportType].forEach(report => {
        // Extract target from different possible locations in the report
        const target = report.results?.[0]?.target ||
          report.results?.[0]?.url ||
          report.results?.[0]?.domain ||
          report.url ||
          report.domain ||
          report.target ||
          (report.targets && report.targets[0]) ||  // Fixed: Add null check
          report.Target_URL ||
          report["Target URL"] ||
          report.data?.domain_name ||
          report[0]?.data ||
          "Unknown target";

        console.log("Extracted target:", target);


        const commonReport = {
          id: report._id || report.id || `RPT-${Math.random().toString(36).substr(2, 8)}`,
          tool: getToolName(reportType),
          status: getStatus(report, reportType),
          timestamp: report.created_time,
          duration: report.duration || `${Math.floor(Math.random() * 20) + 1}m ${Math.floor(Math.random() * 60)}s`,
          target: target,  // Use the extracted target
          findings: report.vulnerabilities ? report.vulnerabilities.length :
            (report.issues ? report.issues.length :
              (report.files ? report.files.length :
                (report.results?.[0]?.subdomains ? report.results?.[0]?.subdomains.length : 0))),
          severity: determineSeverity(report),
          details: generateDetails(report, reportType),
          rawData: report
        };

        allReports.push(commonReport);
      });
    });

    return allReports;
  };

  // Helper function to get tool name based on report type
  const getToolName = (reportType) => {
    const toolNames = {
      subdomain_reports: "Subdomain Scanner",
      sql_reports: "SQL Injection Scanner",
      hidden_files: "Hidden Files Finder",
      Xss_Report: "XSS Scanner",
      Waf_Report: "WAF Detector",
      JsParser_Report: "JavaScript Analyzer",
      EmailAudit_Report: "Email Security Auditor",
      Whois_Report: "Whois Lookup",  // Add this line
    };
    return toolNames[reportType] || reportType;
  };

  const getStatus = (report, reportType) => {
    const statusMap = {
      sql_reports: "success",
      hidden_files: "success",
      JsParser_Report: "success",
      EmailAudit_Report: "success",
      Whois_Report: "success",  // Whois reports are always successful
    };

    if (reportType === "subdomain_reports") {
      const subdomainLength = report?.results?.[0]?.subdomains?.length || 0;
      return subdomainLength > 0 ? "Passed" : "Failed";
    } else if (reportType === "Xss_Report") {
      const xssLength = report?.vulnerabilities?.length || 0;
      return xssLength > 0 ? "Passed" : "Failed";
    } else if (reportType === "Waf_Report") {
      const allFieldsPresent =
        (report?.IP_Information ?? false) &&
        (report?.WAF_Detection_Result ?? false) &&
        (report?.Server ?? false) &&
        (report?.Protection_Methods ?? false) &&
        (report?.Status_Code ?? false);

      console.log("waf", allFieldsPresent);

      return allFieldsPresent ? "Passed" : "Failed";
    }



    return statusMap[reportType] || "unknown";
  };

  // Determine severity based on report content
  const determineSeverity = (report) => {
    if (report.severity) return report.severity;

    if (report.vulnerabilities && report.vulnerabilities.length > 0) {
      const hasCritical = report.vulnerabilities.some(v => v.severity === 'critical') || report.vulnerabilities.length > 70;
      if (hasCritical) return "Critical";

      const hasHigh = report.vulnerabilities.some(v => v.severity === 'high') || report.vulnerabilities.length > 40;
      if (hasHigh) return "High";

      const hasMedium = report.vulnerabilities.some(v => v.severity === 'medium') || report.vulnerabilities.length > 20;
      if (hasMedium) return "Medium";

      return "Low";
    }

    return "None";
  };

  // Generate details text based on report type
  const generateDetails = (report, reportType) => {
    switch (reportType) {
      case 'subdomain_reports':
        return `Found ${report.results?.[0]?.subdomains ? report.results?.[0]?.subdomains.length : 0} subdomains`;
      case 'sql_reports':
        return `Found ${report.vulnerabilities ? report.vulnerabilities.length : 0} SQL injection vulnerabilities`;
      case 'hidden_files':
        return `Found ${report.files ? report.files.length : 0} hidden files/directories`;
      case 'Xss_Report':
        return `Found ${report.vulnerabilities ? report.vulnerabilities.length : 0} XSS vulnerabilities`;
      case 'Waf_Report':
        return `WAF detection results for ${report.target || 'unknown target'}`;
      case 'JsParser_Report':
        return `Found ${report.issues ? report.issues.length : 0} JavaScript security issues`;
      case 'EmailAudit_Report':
        return `Email security audit results with ${report.issues ? report.issues.length : 0} findings`;
      case 'Whois_Report':
        return `Whois lookup results for ${report.data?.domain_name || 'unknown target'}`;
      default:
        return "Security scan completed";
    }
  };

  // Calculate percentages for the circle graphs
  const scannedPercentage =
    (scanData.scannedAssets.completed / scanData.scannedAssets.total) * 100 ||
    0;
  const runningPercentage =
    (scanData.runningScans.active / scanData.runningScans.total) * 100 || 0;

  // Calculate stroke-dasharray values for SVG circles (circumference is 283 for r=45)
  const scannedDashArray = `${scannedPercentage * 2.83} 283`;
  const runningDashArray = `${runningPercentage * 2.83} 283`;

  // Risk score calculation (example based on alerts)
  const riskScore = Math.round(
    (scanData.criticalAlerts * 10 +
      scanData.highAlerts * 5 +
      scanData.mediumAlerts * 2 +
      scanData.lowAlerts * 0.5) /
    2
  );

  // Function to get risk level
  const getRiskLevel = (score) => {
    if (score >= 40) return { text: "Critical", color: "text-red-600" };
    if (score >= 25) return { text: "High", color: "text-orange-500" };
    if (score >= 10) return { text: "Medium", color: "text-yellow-500" };
    return { text: "Low", color: "text-green-500" };
  };

  const riskLevel = getRiskLevel(riskScore);

  // Mock data for vulnerability trends
  const vulnerabilityTrends = [25, 28, 22, 30, 35, 28, 20];

  return (
    <div className="flex flex-col h-screen bg-[#0E1427]">

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto">
          {/* Dashboard Header with Time and Quick Stats */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#04D2D2]">
                Dashboard
              </h2>
              <p className="text-gray-400 text-sm">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                |{" "}
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase">
                  Environment
                </div>
                <div className="text-[#04D2D2] font-bold">Production</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase">
                  Last Updated
                </div>
                <div className="text-[#04D2D2] font-bold">5 minutes ago</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase">
                  Scan Status
                </div>
                <div className="text-green-500 font-bold flex items-center">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                  Active
                </div>
              </div>
            </div>
          </div>

          {/* Risk Score Panel */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-[#040C1F] rounded-lg p-6 col-span-1 shadow-md border border-[#1E293B] transform transition-all duration-300 hover:shadow-[0px_0px_8px_#04D2D2] hover:border-[#04D2D2]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#04D2D2]">
                  Risk Score
                </h3>
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>

              <div className="flex items-center justify-center mb-2">
                <div className="relative h-32 w-32">
                  {/* Background circle */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#2A3042"
                      strokeWidth="10"
                    />
                    {/* Risk score arc - value based on calculated risk */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={
                        riskScore >= 40
                          ? "#EF4444"
                          : riskScore >= 25
                            ? "#F97316"
                            : riskScore >= 10
                              ? "#EAB308"
                              : "#10B981"
                      }
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${riskScore * 2.83} 283`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {riskScore}
                    </span>
                    <span className={`text-sm font-medium ${riskLevel.color}`}>
                      {riskLevel.text}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex flex-col items-center p-2 bg-[#0E1427] rounded">
                  <span className="text-xs text-gray-400">Critical</span>
                  <span className="text-red-500 font-bold">
                    {scanData.criticalAlerts}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 bg-[#0E1427] rounded">
                  <span className="text-xs text-gray-400">High</span>
                  <span className="text-orange-500 font-bold">
                    {scanData.highAlerts}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 bg-[#0E1427] rounded">
                  <span className="text-xs text-gray-400">Medium</span>
                  <span className="text-yellow-500 font-bold">
                    {scanData.mediumAlerts}
                  </span>
                </div>
                <div className="flex flex-col items-center p-2 bg-[#0E1427] rounded">
                  <span className="text-xs text-gray-400">Low</span>
                  <span className="text-green-500 font-bold">
                    {scanData.lowAlerts}
                  </span>
                </div>
              </div>
            </div>

            {/* Vulnerability Trends */}
            <div className="bg-[#040C1F] rounded-lg p-6 col-span-3 shadow-md border border-[#1E293B] transform transition-all duration-300 hover:shadow-[0px_0px_8px_#04D2D2] hover:border-[#04D2D2]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[#04D2D2]">
                  Vulnerability Trends
                </h3>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 text-xs bg-[#0E1427] text-gray-300 rounded-full">
                    Last 7 Days
                  </span>
                  <span className="px-3 py-1 text-xs bg-[#0E1427] text-gray-300 rounded-full">
                    Last 30 Days
                  </span>
                  <span className="px-3 py-1 text-xs bg-[#04D2D2] text-[#040C1F] rounded-full font-medium">
                    Custom
                  </span>
                </div>
              </div>

              <div className="h-48 flex items-end space-x-4 mt-4 px-2">
                {vulnerabilityTrends.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-full bg-[#04D2D2] rounded-t transition-all duration-500 ease-in-out hover:bg-blue-400"
                      style={{
                        height: `${value * 2}px`,
                        opacity: 0.7 + index * 0.05,
                      }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-2">
                      Day {index + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 text-sm">
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-red-500 rounded-full mr-2"></span>
                  <span className="text-gray-400">Critical: +12%</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-orange-500 rounded-full mr-2"></span>
                  <span className="text-gray-400">High: -5%</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></span>
                  <span className="text-gray-400">Medium: +8%</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-gray-400">Low: -2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Attack Surface Summary */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-red-500 mr-2" />
                <h2 className="text-lg font-semibold text-[#04D2D2]">
                  Attack Surface Summary
                </h2>
              </div>
              <button className="px-4 py-2 bg-[#04D2D2] text-[#040C1F] rounded-md text-sm font-medium hover:bg-[#03aeae] transition-colors duration-200">
                View Details
              </button>
            </div>

            <div className="grid grid-cols-6 gap-4">
              {[
                {
                  value: ipCount,
                  label: "IP ADDRESSES",
                  icon: <Server className="h-6 w-6" />,
                  path: "/surface",
                },
                {
                  value: "2",
                  label: "HOSTNAMES",
                  icon: <Globe className="h-6 w-6" />,
                  path: "/hostnames",
                },
                {
                  value: "0",
                  label: "PORTS",
                  icon: <Database className="h-6 w-6" />,
                  path: "/ports",
                },
                {
                  value: "0",
                  label: "PROTOCOLS",
                  icon: <Activity className="h-6 w-6" />,
                  path: "/protocols",
                },
                {
                  value: techCount,
                  label: "SERVICES",
                  icon: <Zap className="h-6 w-6" />,
                  path: "/surface",
                },
                {
                  value: techCount,
                  label: "TECHNOLOGIES",
                  icon: <Shield className="h-6 w-6" />,
                  path: "/surface",
                },
              ].map((item, index) => (
                <Link to={item.path} key={index}>
                  <div className="bg-[#040C1F] rounded-lg shadow-sm p-6 flex flex-col items-center justify-center transform transition-all duration-300 hover:shadow-[0px_0px_8px_#04D2D2] hover:bg-[#0a1935] cursor-pointer border border-[#1E293B]">
                    <div className="text-[#04D2D2] mb-3">{item.icon}</div>
                    <span className="text-3xl font-semibold text-[#04D2D2] mb-2">
                      {item.value}
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      {item.label}
                    </span>
                  </div>
                </Link>
              ))}

            </div>
          </div>

          {/* Scan Activity */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Scanned Assets */}
            <div className="bg-[#040C1F] rounded-lg p-6 shadow-md border border-[#1E293B] transform transition-all duration-300 hover:shadow-[0px_0px_8px_#04D2D2] hover:border-[#04D2D2]">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-md font-medium text-[#04D2D2]">
                  Scanned Assets
                </span>
              </div>

              <div className="flex justify-center">
                <div className="relative w-36 h-36">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#2A3042"
                      strokeWidth="10"
                    />

                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={scannedDashArray}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-light text-blue-500">
                      {scanData.scannedAssets.completed}
                    </span>
                    <span className="text-sm text-gray-400">
                      / {scanData.scannedAssets.total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs text-gray-400">
                  Last scan completed 5 hours ago
                </span>
                <button className="mt-3 w-full py-2 bg-[#1A2335] text-[#04D2D2] rounded text-sm hover:bg-[#253247] transition-colors duration-200">
                  View Assets
                </button>
              </div>
            </div>

            {/* Running Scans */}
            <div className="bg-[#040C1F] rounded-lg p-6 shadow-md border border-[#1E293B] transform transition-all duration-300 hover:shadow-[0px_0px_8px_#04D2D2] hover:border-[#04D2D2]">
              <div className="flex items-center mb-4">
                <Activity className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-md font-medium text-[#04D2D2]">
                  Running Scans
                </span>
              </div>

              <div className="flex justify-center">
                <div className="relative w-36 h-36">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#2A3042"
                      strokeWidth="10"
                    />

                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={runningDashArray}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-light text-green-500">
                      {scanData.runningScans.active}
                    </span>
                    <span className="text-sm text-gray-400">
                      / {scanData.runningScans.total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs text-gray-400">
                  Scan in progress (65% complete)
                </span>
                <button className="mt-3 w-full py-2 bg-[#1A2335] text-[#04D2D2] rounded text-sm hover:bg-[#253247] transition-colors duration-200">
                  View Scan Details
                </button>
              </div>
            </div>

            {/* Protection Status */}
            <div className="bg-[#040C1F] rounded-lg p-6 shadow-md border border-[#1E293B] transform transition-all duration-300 hover:shadow-[0px_0px_8px_#04D2D2] hover:border-[#04D2D2]">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-md font-medium text-[#04D2D2]">
                  Protection Status
                </span>
              </div>

              <div className="flex flex-col space-y-4 mt-2">
                <div className="flex justify-between items-center p-3 bg-[#1A2335] rounded">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-300">Firewall</span>
                  </div>
                  <span className="text-xs text-green-500">Active</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-[#1A2335] rounded">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-300">Antivirus</span>
                  </div>
                  <span className="text-xs text-green-500">Active</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-[#1A2335] rounded">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-300">IDS/IPS</span>
                  </div>
                  <span className="text-xs text-yellow-500">Warning</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-[#1A2335] rounded">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-300">DLP</span>
                  </div>
                  <span className="text-xs text-red-500">Inactive</span>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Scans */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-green-400 mr-2" />
                <h2 className="text-lg font-semibold text-[#04D2D2]">
                  Recent Activity
                </h2>
              </div>
              <button className="text-sm text-[#04D2D2] hover:text-[#03aeae] transition-colors duration-200 flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="bg-[#040C1F] rounded-lg shadow-sm overflow-hidden border border-[#1E293B]">
              {scanData.recentEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`p-4 ${index !== scanData.recentEvents.length - 1
                    ? "border-b border-[#1E293B]"
                    : ""
                    } transition-all duration-200 hover:bg-[#0a1935] cursor-pointer`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${event.icon === "network"
                          ? "bg-blue-100 text-blue-500"
                          : event.icon === "security"
                            ? "bg-purple-100 text-purple-500"
                            : "bg-green-100 text-green-500"
                          }`}
                      >
                        {event.icon === "network" && (
                          <Globe className="h-5 w-5" />
                        )}
                        {event.icon === "security" && (
                          <Shield className="h-5 w-5" />
                        )}
                        {event.icon === "discovery" && (
                          <Search className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-[#04D2D2]">
                            {event.type}
                          </p>
                          <span className="text-xs text-gray-500 ml-3">
                            ID: {event.id.toString().padStart(6, "0")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {event.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {event.time}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${event.statusColor === "green"
                        ? "bg-green-100 text-green-800"
                        : event.statusColor === "yellow"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {event.status}
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-[#0a1935] text-center">
                <button className="text-[#04D2D2] text-sm hover:text-[#03aeae] transition-colors duration-200">
                  Load More Activities
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_Main;
