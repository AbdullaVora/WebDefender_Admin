// // // import React, { useState, useEffect } from "react";
// // // import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

// // // const Reports = () => {
// // //   const fakeReports = [
// // //     { tool: "Nmap", status: "Passed", timestamp: "2025-03-09T18:00:00Z" },
// // //     { tool: "Nikto", status: "Failed", timestamp: "2025-03-09T19:15:00Z" },
// // //     { tool: "SQLmap", status: "Passed", timestamp: "2025-03-09T19:45:00Z" },
// // //     { tool: "Metasploit", status: "Failed", timestamp: "2025-03-09T20:30:00Z" },
// // //     { tool: "Burp Suite", status: "Passed", timestamp: "2025-03-09T22:00:00Z" },
// // //   ];

// // //   const [reports, setReports] = useState([]);

// // //   useEffect(() => {
// // //     setTimeout(() => {
// // //       setReports(fakeReports);
// // //     }, 1000);
// // //   }, []);

// // //   const totalScans = reports.length;
// // //   const passed = reports.filter((r) => r.status === "Passed").length;
// // //   const failed = reports.filter((r) => r.status === "Failed").length;

// // //   const pieData = [
// // //     { name: "Passed", value: passed, color: "#06b6d4" }, // Cyan
// // //     { name: "Failed", value: failed, color: "#ef4444" }, // Red
// // //   ];

// // //   const lineData = reports.map((report, index) => ({
// // //     name: report.tool,
// // //     Passed: report.status === "Passed" ? 1 : 0,
// // //     Failed: report.status === "Failed" ? 1 : 0,
// // //   }));

// // //   return (
// // //     <div className="min-h-screen bg-[#0E1427] text-white p-8">
// // //       {/* Stats Cards */}
// // //       <div className="grid grid-cols-3 gap-6 mb-8">
// // //         <div className="bg-[#040C1F] p-6 rounded-xl shadow-md text-center">
// // //           <h3 className="text-lg font-semibold text-cyan-400">Total Scans</h3>
// // //           <p className="text-3xl font-bold">{totalScans}</p>
// // //         </div>
// // //         <div className="bg-[#040C1F] p-6 rounded-xl shadow-md text-center">
// // //           <h3 className="text-lg font-semibold text-green-400">Passed</h3>
// // //           <p className="text-3xl font-bold">{passed}</p>
// // //         </div>
// // //         <div className="bg-[#040C1F] p-6 rounded-xl shadow-md text-center">
// // //           <h3 className="text-lg font-semibold text-red-400">Failed</h3>
// // //           <p className="text-3xl font-bold">{failed}</p>
// // //         </div>
// // //       </div>

// // //       {/* Charts */}
// // //       <div className="grid grid-cols-2 gap-6">
// // //         <div className="bg-[#040C1F] p-6 rounded-xl shadow-md flex justify-center">
// // //           <ResponsiveContainer width="100%" height={250}>
// // //             <PieChart>
// // //               <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
// // //                 {pieData.map((entry, index) => (
// // //                   <Cell key={`cell-${index}`} fill={entry.color} />
// // //                 ))}
// // //               </Pie>
// // //               <Tooltip />
// // //             </PieChart>
// // //           </ResponsiveContainer>
// // //         </div>

// // //         <div className="bg-[#040C1F] p-6 rounded-xl shadow-md">
// // //           <ResponsiveContainer width="100%" height={250}>
// // //             <LineChart data={lineData}>
// // //               <CartesianGrid strokeDasharray="3 3" />
// // //               <XAxis dataKey="name" stroke="#ffffff" />
// // //               <YAxis stroke="#ffffff" />
// // //               <Tooltip />
// // //               <Legend />
// // //               <Line type="monotone" dataKey="Passed" stroke="#06b6d4" strokeWidth={3} />
// // //               <Line type="monotone" dataKey="Failed" stroke="#ef4444" strokeWidth={3} />
// // //             </LineChart>
// // //           </ResponsiveContainer>
// // //         </div>
// // //       </div>

// // //       {/* Report Table */}
// // //       <div className="mt-8 bg-[#040C1F] p-6 rounded-xl shadow-md">
// // //         <h2 className="text-xl font-semibold text-cyan-400 mb-4">Scan Reports</h2>
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full border-collapse border border-gray-700">
// // //             <thead className="bg-gray-700">
// // //               <tr>
// // //                 <th className="border border-gray-600 px-4 py-2 text-left">Tool</th>
// // //                 <th className="border border-gray-600 px-4 py-2 text-left">Status</th>
// // //                 <th className="border border-gray-600 px-4 py-2 text-left">Date</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {reports.map((report, index) => (
// // //                 <tr key={index} className="hover:bg-gray-600">
// // //                   <td className="border border-gray-600 px-4 py-2">{report.tool}</td>
// // //                   <td className={`border border-gray-600 px-4 py-2 font-semibold ${report.status === "Failed" ? "text-red-500" : "text-green-500"}`}>
// // //                     {report.status}
// // //                   </td>
// // //                   <td className="border border-gray-600 px-4 py-2">
// // //                     {new Date(report.timestamp).toLocaleString()}
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Reports;

// // import React, { useState, useEffect } from "react";
// // import {
// //   PieChart,
// //   Pie,
// //   Tooltip,
// //   Cell,
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Legend,
// //   BarChart,
// //   Bar,
// // } from "recharts";
// // import {
// //   Calendar,
// //   Clock,
// //   AlertTriangle,
// //   CheckCircle,
// //   Filter,
// //   Download,
// //   RefreshCw,
// //   ChevronDown,
// //   Search,
// //   Shield,
// // } from "lucide-react";

// // const Reports = () => {
// //   const fakeReports = [
// //     {
// //       id: "SCN-001",
// //       tool: "Nmap",
// //       status: "Passed",
// //       timestamp: "2025-03-09T18:00:00Z",
// //       duration: "3m 42s",
// //       target: "192.168.1.0/24",
// //       findings: 0,
// //       severity: "None",
// //     },
// //     {
// //       id: "SCN-002",
// //       tool: "Nikto",
// //       status: "Failed",
// //       timestamp: "2025-03-09T19:15:00Z",
// //       duration: "8m 12s",
// //       target: "example.com",
// //       findings: 14,
// //       severity: "High",
// //     },
// //     {
// //       id: "SCN-003",
// //       tool: "SQLmap",
// //       status: "Passed",
// //       timestamp: "2025-03-09T19:45:00Z",
// //       duration: "5m 38s",
// //       target: "app.internal.org/login",
// //       findings: 2,
// //       severity: "Low",
// //     },
// //     {
// //       id: "SCN-004",
// //       tool: "Metasploit",
// //       status: "Failed",
// //       timestamp: "2025-03-09T20:30:00Z",
// //       duration: "12m 05s",
// //       target: "10.0.0.15",
// //       findings: 8,
// //       severity: "Critical",
// //     },
// //     {
// //       id: "SCN-005",
// //       tool: "Burp Suite",
// //       status: "Passed",
// //       timestamp: "2025-03-09T22:00:00Z",
// //       duration: "15m 22s",
// //       target: "api.example.com",
// //       findings: 3,
// //       severity: "Medium",
// //     },
// //     {
// //       id: "SCN-006",
// //       tool: "OWASP ZAP",
// //       status: "Passed",
// //       timestamp: "2025-03-10T09:15:00Z",
// //       duration: "6m 40s",
// //       target: "payments.example.com",
// //       findings: 1,
// //       severity: "Low",
// //     },
// //     {
// //       id: "SCN-007",
// //       tool: "Dirb",
// //       status: "Failed",
// //       timestamp: "2025-03-10T10:45:00Z",
// //       duration: "4m 18s",
// //       target: "staging.example.com",
// //       findings: 5,
// //       severity: "High",
// //     },
// //   ];

// //   const [reports, setReports] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedTimeframe, setSelectedTimeframe] = useState("week");
// //   const [selectedStatus, setSelectedStatus] = useState("all");
// //   const [severityData, setSeverityData] = useState([]);

// //   useEffect(() => {
// //     setTimeout(() => {
// //       setReports(fakeReports);
// //       setLoading(false);

// //       // Calculate severity data for the bar chart
// //       const sevData = [
// //         {
// //           name: "Critical",
// //           value: fakeReports.filter((r) => r.severity === "Critical").length,
// //           color: "#ef4444",
// //         },
// //         {
// //           name: "High",
// //           value: fakeReports.filter((r) => r.severity === "High").length,
// //           color: "#f97316",
// //         },
// //         {
// //           name: "Medium",
// //           value: fakeReports.filter((r) => r.severity === "Medium").length,
// //           color: "#eab308",
// //         },
// //         {
// //           name: "Low",
// //           value: fakeReports.filter((r) => r.severity === "Low").length,
// //           color: "#06b6d4",
// //         },
// //         {
// //           name: "None",
// //           value: fakeReports.filter((r) => r.severity === "None").length,
// //           color: "#22c55e",
// //         },
// //       ];
// //       setSeverityData(sevData);
// //     }, 1000);
// //   }, []);

// //   // Filter reports
// //   const filteredReports = reports.filter((report) => {
// //     let match = true;

// //     // Filter by search term
// //     if (searchTerm) {
// //       match =
// //         match &&
// //         (report.tool.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           report.target.toLowerCase().includes(searchTerm.toLowerCase()));
// //     }

// //     // Filter by status
// //     if (selectedStatus !== "all") {
// //       match =
// //         match && report.status.toLowerCase() === selectedStatus.toLowerCase();
// //     }

// //     // Filter by timeframe
// //     if (selectedTimeframe !== "all") {
// //       const reportDate = new Date(report.timestamp);
// //       const now = new Date();
// //       let cutoff = new Date();

// //       if (selectedTimeframe === "day") {
// //         cutoff.setDate(now.getDate() - 1);
// //       } else if (selectedTimeframe === "week") {
// //         cutoff.setDate(now.getDate() - 7);
// //       } else if (selectedTimeframe === "month") {
// //         cutoff.setMonth(now.getMonth() - 1);
// //       }

// //       match = match && reportDate >= cutoff;
// //     }

// //     return match;
// //   });

// //   const totalScans = filteredReports.length;
// //   const passed = filteredReports.filter((r) => r.status === "Passed").length;
// //   const failed = filteredReports.filter((r) => r.status === "Failed").length;

// //   const totalFindings = filteredReports.reduce((sum, r) => sum + r.findings, 0);

// //   const pieData = [
// //     { name: "Passed", value: passed, color: "#22c55e" }, // Green
// //     { name: "Failed", value: failed, color: "#ef4444" }, // Red
// //   ];

// //   const lineData = Array.from({ length: 7 }, (_, i) => {
// //     const date = new Date();
// //     date.setDate(date.getDate() - 6 + i);
// //     const dateString = date.toLocaleDateString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //     });

// //     // Count the number of passed and failed scans for this date
// //     const scansForDay = reports.filter((r) => {
// //       const reportDate = new Date(r.timestamp);
// //       return (
// //         reportDate.getDate() === date.getDate() &&
// //         reportDate.getMonth() === date.getMonth() &&
// //         reportDate.getFullYear() === date.getFullYear()
// //       );
// //     });

// //     return {
// //       name: dateString,
// //       Passed: scansForDay.filter((r) => r.status === "Passed").length,
// //       Failed: scansForDay.filter((r) => r.status === "Failed").length,
// //     };
// //   });

// //   const renderStatusBadge = (status) => {
// //     if (status === "Passed") {
// //       return (
// //         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
// //           <CheckCircle className="w-3 h-3 mr-1" />
// //           Passed
// //         </span>
// //       );
// //     } else {
// //       return (
// //         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
// //           <AlertTriangle className="w-3 h-3 mr-1" />
// //           Failed
// //         </span>
// //       );
// //     }
// //   };

// //   const getSeverityBadge = (severity) => {
// //     let classes =
// //       "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

// //     switch (severity) {
// //       case "Critical":
// //         return (
// //           <span className={`${classes} bg-red-900 text-red-300`}>
// //             {severity}
// //           </span>
// //         );
// //       case "High":
// //         return (
// //           <span className={`${classes} bg-orange-900 text-orange-300`}>
// //             {severity}
// //           </span>
// //         );
// //       case "Medium":
// //         return (
// //           <span className={`${classes} bg-yellow-900 text-yellow-300`}>
// //             {severity}
// //           </span>
// //         );
// //       case "Low":
// //         return (
// //           <span className={`${classes} bg-blue-900 text-blue-300`}>
// //             {severity}
// //           </span>
// //         );
// //       default:
// //         return (
// //           <span className={`${classes} bg-green-900 text-green-300`}>
// //             {severity}
// //           </span>
// //         );
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#0E1427] text-white p-4 md:p-8">
// //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
// //         <div>
// //           <h1 className="text-2xl md:text-3xl font-bold text-[#04D2D2]">
// //             Security Scan Reports
// //           </h1>
// //           <p className="text-gray-400 mt-1">
// //             Overview and analytics of security scan results
// //           </p>
// //         </div>
// //         <div className="flex mt-4 md:mt-0 space-x-2">
// //           <button className="flex items-center px-3 py-2 bg-[#1A2335] hover:bg-[#253247] rounded-md text-sm transition-colors">
// //             <Download className="w-4 h-4 mr-2" />
// //             Export
// //           </button>
// //           <button className="flex items-center px-3 py-2 bg-[#1A2335] hover:bg-[#253247] rounded-md text-sm transition-colors">
// //             <RefreshCw className="w-4 h-4 mr-2" />
// //             Refresh
// //           </button>
// //         </div>
// //       </div>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
// //         <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl shadow-md border border-[#1A2335] hover:border-[#04D2D2] transition-colors duration-300">
// //           <div className="flex justify-between items-start">
// //             <div>
// //               <p className="text-sm text-gray-400">Total Scans</p>
// //               <h3 className="text-2xl md:text-3xl font-bold mt-1">
// //                 {totalScans}
// //               </h3>
// //             </div>
// //             <div className="p-2 rounded-md bg-[#1A2335]">
// //               <Shield className="w-6 h-6 text-[#04D2D2]" />
// //             </div>
// //           </div>
// //           <div className="mt-4 text-xs text-gray-400 flex items-center">
// //             <Calendar className="w-3 h-3 mr-1" />
// //             Last 7 days
// //           </div>
// //         </div>

// //         <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl shadow-md border border-[#1A2335] hover:border-[#04D2D2] transition-colors duration-300">
// //           <div className="flex justify-between items-start">
// //             <div>
// //               <p className="text-sm text-gray-400">Passed</p>
// //               <h3 className="text-2xl md:text-3xl font-bold mt-1 text-green-400">
// //                 {passed}
// //               </h3>
// //             </div>
// //             <div className="p-2 rounded-md bg-green-900">
// //               <CheckCircle className="w-6 h-6 text-green-400" />
// //             </div>
// //           </div>
// //           <div className="mt-4 text-xs">
// //             <span className="text-green-400">
// //               {passed > 0 && totalScans > 0
// //                 ? Math.round((passed / totalScans) * 100)
// //                 : 0}
// //               %
// //             </span>
// //             <span className="text-gray-400 ml-1">success rate</span>
// //           </div>
// //         </div>

// //         <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl shadow-md border border-[#1A2335] hover:border-[#04D2D2] transition-colors duration-300">
// //           <div className="flex justify-between items-start">
// //             <div>
// //               <p className="text-sm text-gray-400">Failed</p>
// //               <h3 className="text-2xl md:text-3xl font-bold mt-1 text-red-400">
// //                 {failed}
// //               </h3>
// //             </div>
// //             <div className="p-2 rounded-md bg-red-900">
// //               <AlertTriangle className="w-6 h-6 text-red-400" />
// //             </div>
// //           </div>
// //           <div className="mt-4 text-xs">
// //             <span className="text-red-400">
// //               {failed > 0 && totalScans > 0
// //                 ? Math.round((failed / totalScans) * 100)
// //                 : 0}
// //               %
// //             </span>
// //             <span className="text-gray-400 ml-1">failure rate</span>
// //           </div>
// //         </div>

// //         <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl shadow-md border border-[#1A2335] hover:border-[#04D2D2] transition-colors duration-300">
// //           <div className="flex justify-between items-start">
// //             <div>
// //               <p className="text-sm text-gray-400">Total Findings</p>
// //               <h3 className="text-2xl md:text-3xl font-bold mt-1 text-[#04D2D2]">
// //                 {totalFindings}
// //               </h3>
// //             </div>
// //             <div className="p-2 rounded-md bg-[#1A2335]">
// //               <AlertTriangle className="w-6 h-6 text-[#04D2D2]" />
// //             </div>
// //           </div>
// //           <div className="mt-4 text-xs text-gray-400 flex items-center">
// //             <Clock className="w-3 h-3 mr-1" />
// //             Across all scans
// //           </div>
// //         </div>
// //       </div>

// //       {/* Filter Controls */}
// //       <div className="mb-6 p-4 bg-[#040C1F] rounded-xl shadow-md border border-[#1A2335]">
// //         <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
// //           <div className="relative max-w-xs">
// //             <input
// //               type="text"
// //               className="pl-9 pr-4 py-2 bg-[#1A2335] border border-[#253247] text-white rounded-md w-full focus:outline-none focus:border-[#04D2D2] focus:ring-1 focus:ring-[#04D2D2]"
// //               placeholder="Search scans..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //             />
// //             <div className="absolute left-3 top-2.5 text-gray-400">
// //               <Search size={16} />
// //             </div>
// //           </div>

// //           <div className="flex space-x-2 md:space-x-4">
// //             <div>
// //               <div className="text-xs text-gray-400 mb-1">Timeframe</div>
// //               <select
// //                 className="bg-[#1A2335] border border-[#253247] text-white rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#04D2D2]"
// //                 value={selectedTimeframe}
// //                 onChange={(e) => setSelectedTimeframe(e.target.value)}
// //               >
// //                 <option value="day">Last 24 hours</option>
// //                 <option value="week">Last 7 days</option>
// //                 <option value="month">Last 30 days</option>
// //                 <option value="all">All time</option>
// //               </select>
// //             </div>

// //             <div>
// //               <div className="text-xs text-gray-400 mb-1">Status</div>
// //               <select
// //                 className="bg-[#1A2335] border border-[#253247] text-white rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#04D2D2]"
// //                 value={selectedStatus}
// //                 onChange={(e) => setSelectedStatus(e.target.value)}
// //               >
// //                 <option value="all">All</option>
// //                 <option value="passed">Passed</option>
// //                 <option value="failed">Failed</option>
// //               </select>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Charts */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
// //         <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl shadow-md border border-[#1A2335]">
// //           <h3 className="text-lg font-semibold text-[#04D2D2] mb-4">
// //             Scan Status
// //           </h3>
// //           <ResponsiveContainer width="100%" height={240}>
// //             <PieChart>
// //               <Pie
// //                 data={pieData}
// //                 dataKey="value"
// //                 nameKey="name"
// //                 cx="50%"
// //                 cy="50%"
// //                 outerRadius={80}
// //                 innerRadius={50}
// //                 paddingAngle={2}
// //                 label={({ name, percent }) =>
// //                   `${name}: ${(percent * 100).toFixed(0)}%`
// //                 }
// //               >
// //                 {pieData.map((entry, index) => (
// //                   <Cell key={`cell-${index}`} fill={entry.color} />
// //                 ))}
// //               </Pie>
// //               <Tooltip formatter={(value) => [`${value} Scans`, null]} />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl shadow-md border border-[#1A2335]">
// //           <h3 className="text-lg font-semibold text-[#04D2D2] mb-4">
// //             Scans Over Time
// //           </h3>
// //           <ResponsiveContainer width="100%" height={240}>
// //             <LineChart
// //               data={lineData}
// //               margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
// //             >
// //               <CartesianGrid strokeDasharray="3 3" stroke="#1A2335" />
// //               <XAxis dataKey="name" stroke="#93a3b8" />
// //               <YAxis stroke="#93a3b8" />
// //               <Tooltip
// //                 contentStyle={{
// //                   backgroundColor: "#1A2335",
// //                   borderColor: "#253247",
// //                 }}
// //               />
// //               <Legend />
// //               <Line
// //                 type="monotone"
// //                 dataKey="Passed"
// //                 stroke="#22c55e"
// //                 strokeWidth={2}
// //                 activeDot={{ r: 6 }}
// //                 dot={{ r: 4 }}
// //               />
// //               <Line
// //                 type="monotone"
// //                 dataKey="Failed"
// //                 stroke="#ef4444"
// //                 strokeWidth={2}
// //                 activeDot={{ r: 6 }}
// //                 dot={{ r: 4 }}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl shadow-md border border-[#1A2335]">
// //           <h3 className="text-lg font-semibold text-[#04D2D2] mb-4">
// //             Finding Severity
// //           </h3>
// //           <ResponsiveContainer width="100%" height={240}>
// //             <BarChart
// //               data={severityData}
// //               layout="vertical"
// //               margin={{ top: 5, right: 30, bottom: 5, left: 60 }}
// //             >
// //               <CartesianGrid
// //                 strokeDasharray="3 3"
// //                 stroke="#1A2335"
// //                 horizontal={false}
// //               />
// //               <XAxis type="number" stroke="#93a3b8" />
// //               <YAxis dataKey="name" type="category" stroke="#93a3b8" />
// //               <Tooltip
// //                 contentStyle={{
// //                   backgroundColor: "#1A2335",
// //                   borderColor: "#253247",
// //                 }}
// //               />
// //               <Bar dataKey="value" radius={[0, 4, 4, 0]}>
// //                 {severityData.map((entry, index) => (
// //                   <Cell key={`cell-${index}`} fill={entry.color} />
// //                 ))}
// //               </Bar>
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>

// //       {/* Report Table */}
// //       <div className="bg-[#040C1F] rounded-xl shadow-md border border-[#1A2335]">
// //         <div className="p-4 md:p-6 border-b border-[#1A2335]">
// //           <h2 className="text-xl font-semibold text-[#04D2D2]">Scan Reports</h2>
// //           <p className="text-sm text-gray-400 mt-1">
// //             Detailed list of security scan results
// //           </p>
// //         </div>

// //         {loading ? (
// //           <div className="p-8 flex justify-center">
// //             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#04D2D2]"></div>
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto p-4">
// //             <table className="w-full">
// //               <thead>
// //                 <tr className="bg-[#1A2335] text-[#04D2D2]">
// //                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
// //                     ID
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
// //                     Tool
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
// //                     Target
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
// //                     Status
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
// //                     Findings
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
// //                     Severity
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
// //                     Duration
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
// //                     Date
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-[#1A2335]">
// //                 {filteredReports.length === 0 ? (
// //                   <tr>
// //                     <td
// //                       colSpan="8"
// //                       className="px-4 py-8 text-center text-gray-400"
// //                     >
// //                       No scan reports match your filter criteria
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   filteredReports.map((report, index) => (
// //                     <tr
// //                       key={index}
// //                       className="hover:bg-[#1A2335] cursor-pointer transition-colors"
// //                     >
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#04D2D2]">
// //                         {report.id}
// //                       </td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm">
// //                         {report.tool}
// //                       </td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
// //                         {report.target}
// //                       </td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm">
// //                         {renderStatusBadge(report.status)}
// //                       </td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm">
// //                         {report.findings}
// //                       </td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm">
// //                         {getSeverityBadge(report.severity)}
// //                       </td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
// //                         {report.duration}
// //                       </td>
// //                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
// //                         {new Date(report.timestamp).toLocaleString()}
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         <div className="p-4 border-t border-[#1A2335] flex justify-between items-center text-sm text-gray-400">
// //           <div>
// //             Showing {filteredReports.length} of {reports.length} reports
// //           </div>
// //           <div className="flex space-x-2">
// //             <button className="px-3 py-1 rounded bg-[#1A2335] hover:bg-[#253247] disabled:opacity-50 disabled:cursor-not-allowed">
// //               Previous
// //             </button>
// //             <button className="px-3 py-1 rounded bg-[#1A2335] hover:bg-[#253247]">
// //               Next
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Reports;

// import React, { useState, useEffect } from "react";
// import {
//   PieChart,
//   Pie,
//   Tooltip,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   BarChart,
//   Bar,
// } from "recharts";
// import {
//   Calendar,
//   Clock,
//   AlertTriangle,
//   CheckCircle,
//   Filter,
//   Download,
//   RefreshCw,
//   ChevronDown,
//   Search,
//   Shield,
//   Eye,
//   Trash2,
//   Settings,
//   Plus,
//   FileText,
// } from "lucide-react";
// import PageTitle from "../../components/PageTitle";

// const Reports = () => {
//   const fakeReports = [
//     {
//       id: "SCN-001",
//       tool: "Nmap",
//       status: "Passed",
//       timestamp: "2025-03-09T18:00:00Z",
//       duration: "3m 42s",
//       target: "192.168.1.0/24",
//       findings: 0,
//       severity: "None",
//       details: "Network scan completed with no vulnerabilities detected.",
//     },
//     {
//       id: "SCN-002",
//       tool: "Nikto",
//       status: "Failed",
//       timestamp: "2025-03-09T19:15:00Z",
//       duration: "8m 12s",
//       target: "example.com",
//       findings: 14,
//       severity: "High",
//       details:
//         "Multiple vulnerabilities detected including outdated server software, insecure headers, and directory listing enabled.",
//     },
//     {
//       id: "SCN-003",
//       tool: "SQLmap",
//       status: "Passed",
//       timestamp: "2025-03-09T19:45:00Z",
//       duration: "5m 38s",
//       target: "app.internal.org/login",
//       findings: 2,
//       severity: "Low",
//       details:
//         "Minor SQL injection risks detected but properly sanitized by application.",
//     },
//     {
//       id: "SCN-004",
//       tool: "Metasploit",
//       status: "Failed",
//       timestamp: "2025-03-09T20:30:00Z",
//       duration: "12m 05s",
//       target: "10.0.0.15",
//       findings: 8,
//       severity: "Critical",
//       details:
//         "Critical vulnerabilities detected including remote code execution and privilege escalation vectors.",
//     },
//     {
//       id: "SCN-005",
//       tool: "Burp Suite",
//       status: "Passed",
//       timestamp: "2025-03-09T22:00:00Z",
//       duration: "15m 22s",
//       target: "api.example.com",
//       findings: 3,
//       severity: "Medium",
//       details:
//         "Several CORS issues and potential XSS vulnerabilities detected but contained by security controls.",
//     },
//     {
//       id: "SCN-006",
//       tool: "OWASP ZAP",
//       status: "Passed",
//       timestamp: "2025-03-10T09:15:00Z",
//       duration: "6m 40s",
//       target: "payments.example.com",
//       findings: 1,
//       severity: "Low",
//       details:
//         "Minor information disclosure in HTTP headers but no exploitable vulnerabilities.",
//     },
//     {
//       id: "SCN-007",
//       tool: "Dirb",
//       status: "Failed",
//       timestamp: "2025-03-10T10:45:00Z",
//       duration: "4m 18s",
//       target: "staging.example.com",
//       findings: 5,
//       severity: "High",
//       details:
//         "Multiple sensitive directories discovered with inadequate access controls.",
//     },
//     {
//       id: "SCN-008",
//       tool: "Nessus",
//       status: "Failed",
//       timestamp: "2025-03-11T14:20:00Z",
//       duration: "22m 15s",
//       target: "172.16.0.0/16",
//       findings: 23,
//       severity: "Critical",
//       details:
//         "Multiple critical vulnerabilities found including outdated software, default credentials, and remote exploits.",
//     },
//     {
//       id: "SCN-009",
//       tool: "OpenVAS",
//       status: "Passed",
//       timestamp: "2025-03-12T08:30:00Z",
//       duration: "18m 43s",
//       target: "customer-portal.example.com",
//       findings: 4,
//       severity: "Medium",
//       details:
//         "Several medium severity issues related to SSL/TLS configuration and outdated web server components.",
//     },
//     {
//       id: "SCN-010",
//       tool: "Hydra",
//       status: "Failed",
//       timestamp: "2025-03-13T11:05:00Z",
//       duration: "7m 22s",
//       target: "admin.example.com",
//       findings: 2,
//       severity: "High",
//       details:
//         "Brute force attack successful against two admin accounts with weak passwords.",
//     },
//   ];

//   const scanTools = [
//     { id: "nmap", name: "Nmap", description: "Network port scanner" },
//     { id: "nikto", name: "Nikto", description: "Web server scanner" },
//     { id: "sqlmap", name: "SQLmap", description: "SQL injection detection" },
//     {
//       id: "metasploit",
//       name: "Metasploit",
//       description: "Exploitation framework",
//     },
//     {
//       id: "burp",
//       name: "Burp Suite",
//       description: "Web vulnerability scanner",
//     },
//     {
//       id: "zap",
//       name: "OWASP ZAP",
//       description: "Web application security scanner",
//     },
//     { id: "dirb", name: "Dirb", description: "Web content scanner" },
//     { id: "nessus", name: "Nessus", description: "Vulnerability scanner" },
//     { id: "openvas", name: "OpenVAS", description: "Vulnerability scanner" },
//     { id: "hydra", name: "Hydra", description: "Password cracking tool" },
//   ];

//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTimeframe, setSelectedTimeframe] = useState("week");
//   const [selectedStatus, setSelectedStatus] = useState("all");
//   const [selectedSeverity, setSelectedSeverity] = useState("all");
//   const [severityData, setSeverityData] = useState([]);
//   const [toolData, setToolData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [newScanModalOpen, setNewScanModalOpen] = useState(false);
//   const [newScan, setNewScan] = useState({
//     tool: "",
//     target: "",
//     options: "",
//   });
//   const [scheduledScans, setScheduledScans] = useState([
//     {
//       id: "SCH-001",
//       tool: "Nmap",
//       target: "192.168.1.0/24",
//       schedule: "Daily - 00:00",
//       nextRun: "2025-04-20T00:00:00Z",
//     },
//     {
//       id: "SCH-002",
//       tool: "OWASP ZAP",
//       target: "www.example.com",
//       schedule: "Weekly - Sunday",
//       nextRun: "2025-04-20T12:00:00Z",
//     },
//   ]);

//   // Dark mode toggle
//   const [darkMode, setDarkMode] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setReports(fakeReports);
//       setLoading(false);

//       // Calculate severity data for the bar chart
//       const sevData = [
//         {
//           name: "Critical",
//           value: fakeReports.filter((r) => r.severity === "Critical").length,
//           color: "#ef4444",
//         },
//         {
//           name: "High",
//           value: fakeReports.filter((r) => r.severity === "High").length,
//           color: "#f97316",
//         },
//         {
//           name: "Medium",
//           value: fakeReports.filter((r) => r.severity === "Medium").length,
//           color: "#eab308",
//         },
//         {
//           name: "Low",
//           value: fakeReports.filter((r) => r.severity === "Low").length,
//           color: "#06b6d4",
//         },
//         {
//           name: "None",
//           value: fakeReports.filter((r) => r.severity === "None").length,
//           color: "#22c55e",
//         },
//       ];
//       setSeverityData(sevData);

//       // Calculate tool usage data
//       const tools = {};
//       fakeReports.forEach((report) => {
//         if (tools[report.tool]) {
//           tools[report.tool]++;
//         } else {
//           tools[report.tool] = 1;
//         }
//       });

//       const toolDataArray = Object.keys(tools).map((tool) => {
//         return { name: tool, value: tools[tool] };
//       });

//       setToolData(toolDataArray);
//     }, 1000);
//   }, []);

//   // Filter reports
//   const filteredReports = reports.filter((report) => {
//     let match = true;

//     // Filter by search term
//     if (searchTerm) {
//       match =
//         match &&
//         (report.tool.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           report.target.toLowerCase().includes(searchTerm.toLowerCase()));
//     }

//     // Filter by status
//     if (selectedStatus !== "all") {
//       match =
//         match && report.status.toLowerCase() === selectedStatus.toLowerCase();
//     }

//     // Filter by severity
//     if (selectedSeverity !== "all") {
//       match =
//         match &&
//         report.severity.toLowerCase() === selectedSeverity.toLowerCase();
//     }

//     // Filter by timeframe
//     if (selectedTimeframe !== "all") {
//       const reportDate = new Date(report.timestamp);
//       const now = new Date();
//       let cutoff = new Date();

//       if (selectedTimeframe === "day") {
//         cutoff.setDate(now.getDate() - 1);
//       } else if (selectedTimeframe === "week") {
//         cutoff.setDate(now.getDate() - 7);
//       } else if (selectedTimeframe === "month") {
//         cutoff.setMonth(now.getMonth() - 1);
//       }

//       match = match && reportDate >= cutoff;
//     }

//     return match;
//   });

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
//   const paginatedReports = filteredReports.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const totalScans = filteredReports.length;
//   const passed = filteredReports.filter((r) => r.status === "Passed").length;
//   const failed = filteredReports.filter((r) => r.status === "Failed").length;

//   const totalFindings = filteredReports.reduce((sum, r) => sum + r.findings, 0);

//   const pieData = [
//     { name: "Passed", value: passed, color: "#22c55e" }, // Green
//     { name: "Failed", value: failed, color: "#ef4444" }, // Red
//   ];

//   const lineData = Array.from({ length: 7 }, (_, i) => {
//     const date = new Date();
//     date.setDate(date.getDate() - 6 + i);
//     const dateString = date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//     });

//     // Count the number of passed and failed scans for this date
//     const scansForDay = reports.filter((r) => {
//       const reportDate = new Date(r.timestamp);
//       return (
//         reportDate.getDate() === date.getDate() &&
//         reportDate.getMonth() === date.getMonth() &&
//         reportDate.getFullYear() === date.getFullYear()
//       );
//     });

//     return {
//       name: dateString,
//       Passed: scansForDay.filter((r) => r.status === "Passed").length,
//       Failed: scansForDay.filter((r) => r.status === "Failed").length,
//     };
//   });

//   // Add a new scan
//   const handleAddScan = () => {
//     const now = new Date();
//     const newId = `SCN-${String(reports.length + 1).padStart(3, "0")}`;

//     // Simulate success or failure
//     const status = Math.random() > 0.5 ? "Passed" : "Failed";
//     const findingsCount =
//       status === "Passed"
//         ? Math.floor(Math.random() * 3)
//         : Math.floor(Math.random() * 15) + 1;

//     // Determine severity based on findings
//     let severity = "None";
//     if (findingsCount > 10) severity = "Critical";
//     else if (findingsCount > 7) severity = "High";
//     else if (findingsCount > 3) severity = "Medium";
//     else if (findingsCount > 0) severity = "Low";

//     const newReport = {
//       id: newId,
//       tool: newScan.tool,
//       status: status,
//       timestamp: now.toISOString(),
//       duration: `${Math.floor(Math.random() * 20) + 1}m ${Math.floor(
//         Math.random() * 60
//       )}s`,
//       target: newScan.target,
//       findings: findingsCount,
//       severity: severity,
//       details: `Scan completed with ${findingsCount} findings.`,
//     };

//     setReports([newReport, ...reports]);
//     setNewScan({
//       tool: "",
//       target: "",
//       options: "",
//     });
//     setNewScanModalOpen(false);

//     // Update charts data
//     const updatedSeverityData = [...severityData];
//     const sevIndex = updatedSeverityData.findIndex(
//       (item) => item.name === severity
//     );
//     if (sevIndex !== -1) {
//       updatedSeverityData[sevIndex].value++;
//       setSeverityData(updatedSeverityData);
//     }
//   };

//   // Schedule a scan
//   const handleScheduleScan = () => {
//     const newScheduleId = `SCH-${String(scheduledScans.length + 1).padStart(
//       3,
//       "0"
//     )}`;
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     const newScheduledScan = {
//       id: newScheduleId,
//       tool: newScan.tool,
//       target: newScan.target,
//       schedule: "Daily - 00:00",
//       nextRun: tomorrow.toISOString(),
//     };

//     setScheduledScans([...scheduledScans, newScheduledScan]);
//     setNewScan({
//       tool: "",
//       target: "",
//       options: "",
//     });
//     setNewScanModalOpen(false);
//   };

//   // Delete a report
//   const handleDeleteReport = (id) => {
//     const updatedReports = reports.filter((report) => report.id !== id);
//     setReports(updatedReports);

//     // Close modal if the deleted report was selected
//     if (selectedReport && selectedReport.id === id) {
//       setModalOpen(false);
//       setSelectedReport(null);
//     }
//   };

//   const renderStatusBadge = (status) => {
//     if (status === "Passed") {
//       return (
//         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
//           <CheckCircle className="w-3 h-3 mr-1" />
//           Passed
//         </span>
//       );
//     } else {
//       return (
//         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
//           <AlertTriangle className="w-3 h-3 mr-1" />
//           Failed
//         </span>
//       );
//     }
//   };

//   const getSeverityBadge = (severity) => {
//     let classes =
//       "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

//     switch (severity) {
//       case "Critical":
//         return (
//           <span className={`${classes} bg-red-900 text-red-300`}>
//             {severity}
//           </span>
//         );
//       case "High":
//         return (
//           <span className={`${classes} bg-orange-900 text-orange-300`}>
//             {severity}
//           </span>
//         );
//       case "Medium":
//         return (
//           <span className={`${classes} bg-yellow-900 text-yellow-300`}>
//             {severity}
//           </span>
//         );
//       case "Low":
//         return (
//           <span className={`${classes} bg-blue-900 text-blue-300`}>
//             {severity}
//           </span>
//         );
//       default:
//         return (
//           <span className={`${classes} bg-green-900 text-green-300`}>
//             {severity}
//           </span>
//         );
//     }
//   };

//   // Modal for report details
//   const ReportDetailsModal = () => {
//     if (!selectedReport) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//         <div className="bg-[#040C1F] border border-[#1A2335] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           <div className="p-6 border-b border-[#1A2335] flex justify-between items-center">
//             <h3 className="text-xl font-bold text-[#04D2D2]">
//               {selectedReport.id}: {selectedReport.tool} Scan Report
//             </h3>
//             <button
//               onClick={() => setModalOpen(false)}
//               className="text-gray-400 hover:text-white"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="p-6">
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div>
//                 <p className="text-sm text-gray-400">Target</p>
//                 <p className="text-lg font-medium">{selectedReport.target}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Status</p>
//                 <div className="mt-1">
//                   {renderStatusBadge(selectedReport.status)}
//                 </div>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Date & Time</p>
//                 <p className="font-medium">
//                   {new Date(selectedReport.timestamp).toLocaleString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Duration</p>
//                 <p className="font-medium">{selectedReport.duration}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Findings</p>
//                 <p className="font-medium">{selectedReport.findings}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Severity</p>
//                 <div className="mt-1">
//                   {getSeverityBadge(selectedReport.severity)}
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h4 className="text-md font-medium text-[#04D2D2] mb-2">
//                 Details
//               </h4>
//               <p className="text-gray-300 bg-[#1A2335] p-4 rounded-md">
//                 {selectedReport.details}
//               </p>
//             </div>

//             {selectedReport.findings > 0 && (
//               <div>
//                 <h4 className="text-md font-medium text-[#04D2D2] mb-2">
//                   Vulnerability Breakdown
//                 </h4>
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="bg-[#1A2335] text-[#04D2D2] text-xs uppercase">
//                       <th className="p-2 text-left">Type</th>
//                       <th className="p-2 text-left">Location</th>
//                       <th className="p-2 text-left">Severity</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-[#1A2335]">
//                     {Array.from({ length: selectedReport.findings }, (_, i) => {
//                       const vulnTypes = [
//                         "SQL Injection",
//                         "XSS",
//                         "CSRF",
//                         "Open Port",
//                         "Default Credential",
//                         "Missing Header",
//                         "Information Disclosure",
//                       ];
//                       const locations = [
//                         "/login",
//                         "/admin",
//                         "/api/users",
//                         "TCP/443",
//                         "UDP/53",
//                         "/includes/config.php",
//                         "/assets/backup",
//                       ];
//                       const severities = ["Critical", "High", "Medium", "Low"];

//                       const type =
//                         vulnTypes[Math.floor(Math.random() * vulnTypes.length)];
//                       const location =
//                         locations[Math.floor(Math.random() * locations.length)];
//                       const sev =
//                         severities[
//                           Math.floor(Math.random() * severities.length)
//                         ];

//                       return (
//                         <tr key={i} className="hover:bg-[#1A2335]">
//                           <td className="p-2">{type}</td>
//                           <td className="p-2 text-gray-300">{location}</td>
//                           <td className="p-2">{getSeverityBadge(sev)}</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>

//           <div className="p-6 border-t border-[#1A2335] flex justify-end space-x-3">
//             <button
//               onClick={() => setModalOpen(false)}
//               className="px-4 py-2 bg-[#1A2335] hover:bg-[#253247] rounded-md text-sm transition-colors"
//             >
//               Close
//             </button>
//             <button
//               onClick={() => window.alert("Report exported to PDF!")}
//               className="flex items-center px-4 py-2 bg-[#04D2D2] hover:bg-[#03BEBE] text-black rounded-md text-sm transition-colors"
//             >
//               <Download className="w-4 h-4 mr-2" />
//               Export Report
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Modal for new scan
//   const NewScanModal = () => {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//         <div className="bg-[#040C1F] border border-[#1A2335] rounded-xl w-full max-w-md">
//           <div className="p-6 border-b border-[#1A2335] flex justify-between items-center">
//             <h3 className="text-xl font-bold text-[#04D2D2]">
//               New Security Scan
//             </h3>
//             <button
//               onClick={() => setNewScanModalOpen(false)}
//               className="text-gray-400 hover:text-white"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="p-6">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 Security Tool
//               </label>
//               <select
//                 className="w-full bg-[#1A2335] border border-[#253247] text-white rounded-md px-3 py-2 focus:outline-none focus:border-[#04D2D2]"
//                 value={newScan.tool}
//                 onChange={(e) =>
//                   setNewScan({ ...newScan, tool: e.target.value })
//                 }
//               >
//                 <option value="">Select a tool</option>
//                 {scanTools.map((tool) => (
//                   <option key={tool.id} value={tool.name}>
//                     {tool.name} - {tool.description}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 Target
//               </label>
//               <input
//                 type="text"
//                 className="w-full bg-[#1A2335] border border-[#253247] text-white rounded-md px-3 py-2 focus:outline-none focus:border-[#04D2D2]"
//                 placeholder="IP, Domain, or URL"
//                 value={newScan.target}
//                 onChange={(e) =>
//                   setNewScan({ ...newScan, target: e.target.value })
//                 }
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-300 mb-1">
//                 Additional Options
//               </label>
//               <textarea
//                 className="w-full bg-[#1A2335] border border-[#253247] text-white rounded-md px-3 py-2 focus:outline-none focus:border-[#04D2D2]"
//                 placeholder="Command line options (optional)"
//                 rows={3}
//                 value={newScan.options}
//                 onChange={(e) =>
//                   setNewScan({ ...newScan, options: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           <div className="p-6 border-t border-[#1A2335] flex justify-end space-x-3">
//             <button
//               onClick={() => setNewScanModalOpen(false)}
//               className="px-4 py-2 bg-[#1A2335] hover:bg-[#253247] rounded-md text-sm transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleScheduleScan}
//               className="px-4 py-2 bg-[#1A2335] hover:bg-[#253247] rounded-md text-sm transition-colors"
//               disabled={!newScan.tool || !newScan.target}
//             >
//               Schedule
//             </button>
//             <button
//               onClick={handleAddScan}
//               className="flex items-center px-4 py-2 bg-[#04D2D2] hover:bg-[#03BEBE] text-black rounded-md text-sm transition-colors"
//               disabled={!newScan.tool || !newScan.target}
//             >
//               <Play className="w-4 h-4 mr-2" />
//               Run Scan
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Render tabs component
//   const Tabs = () => {
//     const [activeTab, setActiveTab] = useState("reports");

//     return (
//       <div className="">
//         <div className="border-b border-[#1A2335]">
//           <nav className="flex -mb-px">
//             <button
//               className={`mr-4 py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === "reports"
//                   ? "border-[#04D2D2] text-[#04D2D2]"
//                   : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
//               }`}
//               onClick={() => setActiveTab("reports")}
//             >
//               Reports
//             </button>
//             <button
//               className={`mr-4 py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === "scheduled"
//                   ? "border-[#04D2D2] text-[#04D2D2]"
//                   : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
//               }`}
//               onClick={() => setActiveTab("scheduled")}
//             >
//               Scheduled Scans
//             </button>
//             <button
//               className={`mr-4 py-4 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === "tools"
//                   ? "border-[#04D2D2] text-[#04D2D2]"
//                   : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
//               }`}
//               onClick={() => setActiveTab("tools")}
//             >
//               Tools
//             </button>
//           </nav>
//         </div>

//         {activeTab === "reports" && (
//           <div className="mt-6">
//             {/* Report Table */}
//             <div className="bg-[#040C1F] rounded-xl shadow-md border border-[#1A2335]">
//               <div className="p-4 md:p-6 border-b border-[#1A2335] flex justify-between items-center">
//                 <div>
//                   <h2 className="text-xl font-semibold text-[#04D2D2]">
//                     Scan Reports
//                   </h2>
//                   <p className="text-sm text-gray-400 mt-1">
//                     Detailed list of security scan results
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setNewScanModalOpen(true)}
//                   className="flex items-center px-3 py-2 bg-[#04D2D2] hover:bg-[#03BEBE] text-black rounded-md text-sm transition-colors"
//                 >
//                   <Plus className="w-4 h-4 mr-2" />
//                   New Scan
//                 </button>
//               </div>

//               {loading ? (
//                 <div className="p-8 flex justify-center">
//                   <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#04D2D2]"></div>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto p-4">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-[#1A2335] text-[#04D2D2]">
//                         <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                           ID
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                           Tool
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                           Target
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                           Status
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                           Findings
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                           Severity
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                           Date
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-[#1A2335]">
//                       {paginatedReports.length > 0 ? (
//                         paginatedReports.map((report) => (
//                           <tr key={report.id} className="hover:bg-[#1A2335]">
//                             <td className="px-4 py-3 whitespace-nowrap text-sm">
//                               {report.id}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm">
//                               {report.tool}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm">
//                               {report.target}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm">
//                               {renderStatusBadge(report.status)}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm">
//                               {report.findings}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm">
//                               {getSeverityBadge(report.severity)}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm">
//                               {new Date(report.timestamp).toLocaleDateString()}
//                             </td>
//                             <td className="px-4 py-3 whitespace-nowrap text-sm flex space-x-2">
//                               <button
//                                 onClick={() => {
//                                   setSelectedReport(report);
//                                   setModalOpen(true);
//                                 }}
//                                 className="text-[#04D2D2] hover:text-[#03BEBE]"
//                                 title="View Details"
//                               >
//                                 <Eye className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteReport(report.id)}
//                                 className="text-red-400 hover:text-red-500"
//                                 title="Delete Report"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td
//                             colSpan="8"
//                             className="px-4 py-8 text-center text-gray-400"
//                           >
//                             No reports found with the current filters.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>

//                   {/* Pagination */}
//                   <div className="flex items-center justify-between border-t border-[#1A2335] bg-[#040C1F] px-4 py-3 sm:px-6 mt-4">
//                     <div className="flex flex-1 justify-between sm:hidden">
//                       <button
//                         onClick={() => setPage(Math.max(1, page - 1))}
//                         disabled={page === 1}
//                         className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
//                           page === 1
//                             ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
//                             : "bg-[#1A2335] text-white hover:bg-[#253247]"
//                         }`}
//                       >
//                         Previous
//                       </button>
//                       <button
//                         onClick={() => setPage(Math.min(totalPages, page + 1))}
//                         disabled={page === totalPages}
//                         className={`relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
//                           page === totalPages
//                             ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
//                             : "bg-[#1A2335] text-white hover:bg-[#253247]"
//                         }`}
//                       >
//                         Next
//                       </button>
//                     </div>
//                     <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//                       <div>
//                         <p className="text-sm text-gray-400">
//                           Showing{" "}
//                           <span className="font-medium">
//                             {(page - 1) * itemsPerPage + 1}
//                           </span>{" "}
//                           to{" "}
//                           <span className="font-medium">
//                             {Math.min(
//                               page * itemsPerPage,
//                               filteredReports.length
//                             )}
//                           </span>{" "}
//                           of{" "}
//                           <span className="font-medium">
//                             {filteredReports.length}
//                           </span>{" "}
//                           results
//                         </p>
//                       </div>
//                       <div>
//                         <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
//                           <button
//                             onClick={() => setPage(Math.max(1, page - 1))}
//                             disabled={page === 1}
//                             className={`relative inline-flex items-center px-2 py-2 rounded-l-md ${
//                               page === 1
//                                 ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
//                                 : "bg-[#1A2335] text-white hover:bg-[#253247]"
//                             }`}
//                           >
//                             <span className="sr-only">Previous</span>
//                             <svg
//                               className="h-5 w-5"
//                               xmlns="http://www.w3.org/2000/svg"
//                               viewBox="0 0 20 20"
//                               fill="currentColor"
//                               aria-hidden="true"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           </button>
//                           {Array.from(
//                             { length: totalPages },
//                             (_, i) => i + 1
//                           ).map((pageNum) => (
//                             <button
//                               key={pageNum}
//                               onClick={() => setPage(pageNum)}
//                               className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
//                                 page === pageNum
//                                   ? "bg-[#04D2D2] text-black"
//                                   : "bg-[#1A2335] text-white hover:bg-[#253247]"
//                               }`}
//                             >
//                               {pageNum}
//                             </button>
//                           ))}
//                           <button
//                             onClick={() =>
//                               setPage(Math.min(totalPages, page + 1))
//                             }
//                             disabled={page === totalPages || totalPages === 0}
//                             className={`relative inline-flex items-center px-2 py-2 rounded-r-md ${
//                               page === totalPages || totalPages === 0
//                                 ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
//                                 : "bg-[#1A2335] text-white hover:bg-[#253247]"
//                             }`}
//                           >
//                             <span className="sr-only">Next</span>
//                             <svg
//                               className="h-5 w-5"
//                               xmlns="http://www.w3.org/2000/svg"
//                               viewBox="0 0 20 20"
//                               fill="currentColor"
//                               aria-hidden="true"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           </button>
//                         </nav>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === "scheduled" && (
//           <div className="mt-6">
//             <div className="bg-[#040C1F] rounded-xl shadow-md border border-[#1A2335]">
//               <div className="p-4 md:p-6 border-b border-[#1A2335] flex justify-between items-center">
//                 <div>
//                   <h2 className="text-xl font-semibold text-[#04D2D2]">
//                     Scheduled Scans
//                   </h2>
//                   <p className="text-sm text-gray-400 mt-1">
//                     Automated security scanning schedule
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setNewScanModalOpen(true)}
//                   className="flex items-center px-3 py-2 bg-[#04D2D2] hover:bg-[#03BEBE] text-black rounded-md text-sm transition-colors"
//                 >
//                   <Plus className="w-4 h-4 mr-2" />
//                   New Schedule
//                 </button>
//               </div>

//               <div className="overflow-x-auto p-4">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-[#1A2335] text-[#04D2D2]">
//                       <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                         ID
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                         Tool
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                         Target
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                         Schedule
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                         Next Run
//                       </th>
//                       <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-[#1A2335]">
//                     {scheduledScans.length > 0 ? (
//                       scheduledScans.map((scan) => (
//                         <tr key={scan.id} className="hover:bg-[#1A2335]">
//                           <td className="px-4 py-3 whitespace-nowrap text-sm">
//                             {scan.id}
//                           </td>
//                           <td className="px-4 py-3 whitespace-nowrap text-sm">
//                             {scan.tool}
//                           </td>
//                           <td className="px-4 py-3 whitespace-nowrap text-sm">
//                             {scan.target}
//                           </td>
//                           <td className="px-4 py-3 whitespace-nowrap text-sm">
//                             {scan.schedule}
//                           </td>
//                           <td className="px-4 py-3 whitespace-nowrap text-sm">
//                             {new Date(scan.nextRun).toLocaleString()}
//                           </td>
//                           <td className="px-4 py-3 whitespace-nowrap text-sm flex space-x-2">
//                             <button
//                               onClick={() => {
//                                 const now = new Date();
//                                 const newId = `SCN-${String(
//                                   reports.length + 1
//                                 ).padStart(3, "0")}`;

//                                 // Simulate success or failure
//                                 const status =
//                                   Math.random() > 0.5 ? "Passed" : "Failed";
//                                 const findingsCount =
//                                   status === "Passed"
//                                     ? Math.floor(Math.random() * 3)
//                                     : Math.floor(Math.random() * 15) + 1;

//                                 // Determine severity based on findings
//                                 let severity = "None";
//                                 if (findingsCount > 10) severity = "Critical";
//                                 else if (findingsCount > 7) severity = "High";
//                                 else if (findingsCount > 3) severity = "Medium";
//                                 else if (findingsCount > 0) severity = "Low";

//                                 const newReport = {
//                                   id: newId,
//                                   tool: scan.tool,
//                                   status: status,
//                                   timestamp: now.toISOString(),
//                                   duration: `${
//                                     Math.floor(Math.random() * 20) + 1
//                                   }m ${Math.floor(Math.random() * 60)}s`,
//                                   target: scan.target,
//                                   findings: findingsCount,
//                                   severity: severity,
//                                   details: `Scan completed with ${findingsCount} findings.`,
//                                 };

//                                 setReports([newReport, ...reports]);
//                                 alert(
//                                   `Manual execution of scheduled scan ${scan.id} initiated.`
//                                 );
//                               }}
//                               className="text-[#04D2D2] hover:text-[#03BEBE]"
//                               title="Run Now"
//                             >
//                               <RefreshCw className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => {
//                                 setScheduledScans(
//                                   scheduledScans.filter((s) => s.id !== scan.id)
//                                 );
//                               }}
//                               className="text-red-400 hover:text-red-500"
//                               title="Delete Schedule"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="6"
//                           className="px-4 py-8 text-center text-gray-400"
//                         >
//                           No scheduled scans. Create a new schedule to automate
//                           your security testing.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "tools" && (
//           <div className="mt-6">
//             <div className="bg-[#040C1F] rounded-xl shadow-md border border-[#1A2335]">
//               <div className="p-4 md:p-6 border-b border-[#1A2335]">
//                 <h2 className="text-xl font-semibold text-[#04D2D2]">
//                   Security Tools
//                 </h2>
//                 <p className="text-sm text-gray-400 mt-1">
//                   Available security scanning tools
//                 </p>
//               </div>

//               <div className="p-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {scanTools.map((tool) => (
//                     <div
//                       key={tool.id}
//                       className="border border-[#1A2335] rounded-lg p-4 hover:bg-[#0A1525] transition-colors"
//                     >
//                       <h3 className="text-lg font-medium text-[#04D2D2]">
//                         {tool.name}
//                       </h3>
//                       <p className="text-gray-400 text-sm mt-1">
//                         {tool.description}
//                       </p>
//                       <div className="mt-4 flex justify-between items-center">
//                         <button
//                           onClick={() => {
//                             setNewScan({
//                               tool: tool.name,
//                               target: "",
//                               options: "",
//                             });
//                             setNewScanModalOpen(true);
//                           }}
//                           className="text-[#04D2D2] hover:text-[#03BEBE] text-sm flex items-center"
//                         >
//                           <Play className="w-4 h-4 mr-1" />
//                           Run Scan
//                         </button>
//                         <div className="text-xs text-gray-400">
//                           {reports.filter((r) => r.tool === tool.name).length}{" "}
//                           scans
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div
//       className={`p-6`}
//     >
//       {/* Main content */}
//       <div className="flex flex-col min-h-screen text-white bg-[#0E1427]">
//         <PageTitle title="Security Scan Reports" desc="View and analyze your security scanning results"/>

//         {/* Dashboard stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-400 text-sm">Total Scans</p>
//                 <h3 className="text-2xl font-bold mt-2">{totalScans}</h3>
//               </div>
//               <div className="bg-[#1A2335] p-3 rounded-lg">
//                 <Shield className="h-6 w-6 text-[#04D2D2]" />
//               </div>
//             </div>
//             <div className="mt-4 text-xs text-gray-400">
//               <span className="inline-flex items-center text-green-400">
//                 <svg
//                   className="w-3 h-3 mr-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 10l7-7m0 0l7 7m-7-7v18"
//                   ></path>
//                 </svg>
//                 12% increase
//               </span>{" "}
//               from last week
//             </div>
//           </div>

//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-400 text-sm">Pass Rate</p>
//                 <h3 className="text-2xl font-bold mt-2">
//                   {totalScans ? Math.round((passed / totalScans) * 100) : 0}%
//                 </h3>
//               </div>
//               <div className="bg-[#1A2335] p-3 rounded-lg">
//                 <CheckCircle className="h-6 w-6 text-[#04D2D2]" />
//               </div>
//             </div>
//             <div className="mt-4 text-xs text-gray-400">
//               <span
//                 className={`inline-flex items-center ${
//                   passed > failed ? "text-green-400" : "text-red-400"
//                 }`}
//               >
//                 <svg
//                   className={`w-3 h-3 mr-1 ${
//                     passed > failed ? "" : "transform rotate-180"
//                   }`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 10l7-7m0 0l7 7m-7-7v18"
//                   ></path>
//                 </svg>
//                 {passed > failed ? "+" : "-"}
//                 {Math.abs(
//                   Math.round(((passed - failed) / (totalScans || 1)) * 100)
//                 )}
//                 %
//               </span>{" "}
//               from last week
//             </div>
//           </div>

//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-400 text-sm">Total Findings</p>
//                 <h3 className="text-2xl font-bold mt-2">{totalFindings}</h3>
//               </div>
//               <div className="bg-[#1A2335] p-3 rounded-lg">
//                 <AlertTriangle className="h-6 w-6 text-[#04D2D2]" />
//               </div>
//             </div>
//             <div className="mt-4 text-xs text-gray-400">
//               <span className="inline-flex items-center text-red-400">
//                 <svg
//                   className="w-3 h-3 mr-1 transform rotate-180"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 10l7-7m0 0l7 7m-7-7v18"
//                   ></path>
//                 </svg>
//                 8% increase
//               </span>{" "}
//               from last week
//             </div>
//           </div>

//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-400 text-sm">Critical Issues</p>
//                 <h3 className="text-2xl font-bold mt-2">
//                   {reports.filter((r) => r.severity === "Critical").length}
//                 </h3>
//               </div>
//               <div className="bg-[#1A2335] p-3 rounded-lg">
//                 <FileText className="h-6 w-6 text-[#04D2D2]" />
//               </div>
//             </div>
//             <div className="mt-4 text-xs text-gray-400">
//               <span className="inline-flex items-center text-gray-400">
//                 <svg
//                   className="w-3 h-3 mr-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M20 12H4"
//                   ></path>
//                 </svg>
//                 No change
//               </span>{" "}
//               from last week
//             </div>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
//           {/* Pie Chart */}
//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <h3 className="text-lg font-medium mb-4">Scan Results</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={90}
//                   paddingAngle={5}
//                   dataKey="value"
//                   label={({ name, percent }) =>
//                     `${name}: ${(percent * 100).toFixed(0)}%`
//                   }
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(value, name) => [`${value} scans`, name]}
//                   contentStyle={{
//                     backgroundColor: "#1A2335",
//                     border: "none",
//                     borderRadius: "8px",
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Line Chart */}
//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <h3 className="text-lg font-medium mb-4">Scan Trends</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={lineData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#1A2335" />
//                 <XAxis dataKey="name" stroke="#4B5563" />
//                 <YAxis stroke="#4B5563" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1A2335",
//                     border: "none",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="Passed"
//                   stroke="#22c55e"
//                   strokeWidth={2}
//                   activeDot={{ r: 8 }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="Failed"
//                   stroke="#ef4444"
//                   strokeWidth={2}
//                   activeDot={{ r: 8 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Bar Chart */}
//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <h3 className="text-lg font-medium mb-4">Issue Severity</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={severityData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#1A2335" />
//                 <XAxis dataKey="name" stroke="#4B5563" />
//                 <YAxis stroke="#4B5563" />
//                 <Tooltip
//                   formatter={(value) => [`${value} issues`]}
//                   contentStyle={{
//                     backgroundColor: "#1A2335",
//                     border: "none",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Bar dataKey="value">
//                   {severityData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-[#040C1F] p-4 rounded-xl border border-[#1A2335] flex flex-col md:flex-row md:items-center mb-6 space-y-3 md:space-y-0 md:space-x-4">
//           <div className="flex-grow">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full pl-10 pr-3 py-2 border border-[#1A2335] rounded-md bg-[#1A2335] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04D2D2] focus:border-transparent"
//                 placeholder="Search scans..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <div>
//               <select
//                 className="bg-[#1A2335] border border-[#253247] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#04D2D2]"
//                 value={selectedTimeframe}
//                 onChange={(e) => setSelectedTimeframe(e.target.value)}
//               >
//                 <option value="all">All Time</option>
//                 <option value="day">Last 24 Hours</option>
//                 <option value="week">Last 7 Days</option>
//                 <option value="month">Last 30 Days</option>
//               </select>
//             </div>

//             <div>
//               <select
//                 className="bg-[#1A2335] border border-[#253247] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#04D2D2]"
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//               >
//                 <option value="all">All Status</option>
//                 <option value="passed">Passed</option>
//                 <option value="failed">Failed</option>
//               </select>
//             </div>

//             <div>
//               <select
//                 className="bg-[#1A2335] border border-[#253247] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#04D2D2]"
//                 value={selectedSeverity}
//                 onChange={(e) => setSelectedSeverity(e.target.value)}
//               >
//                 <option value="all">All Severity</option>
//                 <option value="critical">Critical</option>
//                 <option value="high">High</option>
//                 <option value="medium">Medium</option>
//                 <option value="low">Low</option>
//                 <option value="none">None</option>
//               </select>
//             </div>

//             <button
//               className="flex items-center bg-[#1A2335] text-gray-400 px-3 py-2 rounded-md hover:bg-[#253247]"
//               onClick={() => {
//                 setSearchTerm("");
//                 setSelectedTimeframe("week");
//                 setSelectedStatus("all");
//                 setSelectedSeverity("all");
//                 setPage(1);
//               }}
//             >
//               <RefreshCw className="w-4 h-4 mr-2" />
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* Main Content Tabs */}
//         <Tabs />
//       </div>

//       {/* Show modals if open */}
//       {modalOpen && <ReportDetailsModal />}
//       {newScanModalOpen && <NewScanModal />}
//     </div>
//   );
// };

// // Missing Play component
// const Play = ({ className, ...props }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//       {...props}
//     >
//       <polygon points="5 3 19 12 5 21 5 3"></polygon>
//     </svg>
//   );
// };

// export default Reports;



import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  ChevronDown,
  Search,
  Shield,
  Eye,
  Trash2,
  Plus,
  FileText,
} from "lucide-react";
import PageTitle from "../../components/PageTitle";
import apiInstance from "../../api/instance";

const Reports = () => {
  // Sample data structure that matches your API response
  const [apiData, setApiData] = useState({
    subdomain_reports: [],
    sql_reports: [],
    hidden_files: [],
    Xss_Report: [],
    Waf_Report: [],
    JsParser_Report: [],
    EmailAudit_Report: [],
  });

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [severityData, setSeverityData] = useState([]);
  const [toolData, setToolData] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id)
  }, [])


  // Fetch data from API
  useEffect(() => {
    if (!userId) return; // 🚫 Skip if userId isn't ready

    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await apiInstance.get('/api/reports', {
          params: {
            userId
          }
        });
        const data = response.data;
        setApiData(data);

        const allReports = transformApiData(data);
        setReports(allReports);

        calculateChartData(allReports);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, [userId]); // ✅ Trigger this effect only after userId is set

  // Transform API data into a unified format for the UI
  // const transformApiData = (data) => {
  //   const allReports = [];

  //   // Process each report type and map to common format
  //   Object.keys(data).forEach(reportType => {
  //     data[reportType].forEach(report => {
  //       const commonReport = {
  //         id: report._id || report.id || `RPT-${Math.random().toString(36).substr(2, 8)}`,
  //         tool: getToolName(reportType),
  //         status: report.scanStatus === "success" ? "Passed" : "Failed",
  //         timestamp: report.created_time,
  //         duration: report.duration || `${Math.floor(Math.random() * 20) + 1}m ${Math.floor(Math.random() * 60)}s`,
  //         target: report.target || report.url || report.domain || "Unknown target",
  //         findings: report.vulnerabilities ? report.vulnerabilities.length :
  //           (report.issues ? report.issues.length :
  //             (report.files ? report.files.length : 0)),
  //         severity: determineSeverity(report),
  //         details: generateDetails(report, reportType),
  //         rawData: report // Store the original report data for download
  //       };

  //       allReports.push(commonReport);
  //     });
  //   });

  //   return allReports;
  // };


  const transformApiData = (data) => {
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
          report.Target_URL ||
          "Unknown target";

        console.log("Extracted target:", target);


        const commonReport = {
          id: report._id || report.id || `RPT-${Math.random().toString(36).substr(2, 8)}`,
          tool: getToolName(reportType),
          status: report.scanStatus === "success" ? "Passed" : "Failed",
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
      EmailAudit_Report: "Email Security Auditor"
    };
    return toolNames[reportType] || reportType;
  };

  // Determine severity based on report content
  const determineSeverity = (report) => {
    if (report.severity) return report.severity;

    if (report.vulnerabilities && report.vulnerabilities.length > 0) {
      const hasCritical = report.vulnerabilities.some(v => v.severity === 'critical');
      if (hasCritical) return "Critical";

      const hasHigh = report.vulnerabilities.some(v => v.severity === 'high');
      if (hasHigh) return "High";

      return "Medium";
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
      default:
        return "Security scan completed";
    }
  };

  // Calculate chart data based on reports
  const calculateChartData = (reports) => {
    const sevData = [
      { name: "Critical", value: 0, color: "#ef4444" },
      { name: "High", value: 0, color: "#f97316" },
      { name: "Medium", value: 0, color: "#eab308" },
      { name: "Low", value: 0, color: "#06b6d4" },
      { name: "None", value: 0, color: "#22c55e" },
    ];

    reports.forEach(report => {
      const severity = report.severity || "None";
      const sevIndex = sevData.findIndex(item => item.name === severity);
      if (sevIndex !== -1) {
        sevData[sevIndex].value++;
      }
    });

    setSeverityData(sevData);

    // Calculate tool usage data
    const tools = {};
    reports.forEach(report => {
      if (tools[report.tool]) {
        tools[report.tool]++;
      } else {
        tools[report.tool] = 1;
      }
    });

    const toolDataArray = Object.keys(tools).map(tool => {
      return { name: tool, value: tools[tool] };
    });

    setToolData(toolDataArray);
  };

  const [reports, setReports] = useState([]);

  // Filter reports
  const filteredReports = reports.filter((report) => {
    let match = true;

    // Filter by search term
    if (searchTerm) {
      match =
        match &&
        (report.tool.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.target.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filter by status
    if (selectedStatus !== "all") {
      match =
        match && report.status.toLowerCase() === selectedStatus.toLowerCase();
    }

    // Filter by severity
    if (selectedSeverity !== "all") {
      match =
        match &&
        report.severity.toLowerCase() === selectedSeverity.toLowerCase();
    }

    // Filter by timeframe
    if (selectedTimeframe !== "all") {
      const reportDate = new Date(report.timestamp);
      const now = new Date();
      let cutoff = new Date();

      if (selectedTimeframe === "day") {
        cutoff.setDate(now.getDate() - 1);
      } else if (selectedTimeframe === "week") {
        cutoff.setDate(now.getDate() - 7);
      } else if (selectedTimeframe === "month") {
        cutoff.setMonth(now.getMonth() - 1);
      }

      match = match && reportDate >= cutoff;
    }

    return match;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalScans = filteredReports.length;
  const passed = filteredReports.filter((r) => r.status === "Passed").length;
  const failed = filteredReports.filter((r) => r.status === "Failed").length;
  const totalFindings = filteredReports.reduce((sum, r) => sum + r.findings, 0);

  const pieData = [
    { name: "Passed", value: passed, color: "#22c55e" },
    { name: "Failed", value: failed, color: "#ef4444" },
  ];

  const lineData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    const dateString = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const scansForDay = reports.filter((r) => {
      const reportDate = new Date(r.timestamp);
      return (
        reportDate.getDate() === date.getDate() &&
        reportDate.getMonth() === date.getMonth() &&
        reportDate.getFullYear() === date.getFullYear()
      );
    });

    return {
      name: dateString,
      Passed: scansForDay.filter((r) => r.status === "Passed").length,
      Failed: scansForDay.filter((r) => r.status === "Failed").length,
    };
  });

  // Download report as JSON
  const downloadReport = (report) => {
    const dataStr = JSON.stringify(report.rawData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${report.tool}_${report.id}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const renderStatusBadge = (status) => {
    if (status === "Passed") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
          <CheckCircle className="w-3 h-3 mr-1" />
          Passed
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Failed
        </span>
      );
    }
  };

  const getSeverityBadge = (severity) => {
    let classes = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

    switch (severity) {
      case "Critical":
        return <span className={`${classes} bg-red-900 text-red-300`}>{severity}</span>;
      case "High":
        return <span className={`${classes} bg-orange-900 text-orange-300`}>{severity}</span>;
      case "Medium":
        return <span className={`${classes} bg-yellow-900 text-yellow-300`}>{severity}</span>;
      case "Low":
        return <span className={`${classes} bg-blue-900 text-blue-300`}>{severity}</span>;
      default:
        return <span className={`${classes} bg-green-900 text-green-300`}>{severity}</span>;
    }
  };

  // Report Details Modal
  const ReportDetailsModal = () => {
    if (!selectedReport) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-[#040C1F] border border-[#1A2335] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-[#1A2335] flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#04D2D2]">
              {selectedReport.id}: {selectedReport.tool} Scan Report
            </h3>
            <button
              onClick={() => setModalOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-400">Target</p>
                <p className="text-lg text-[#04D2D2] font-medium">{selectedReport.target}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <div className="mt-1">
                  {renderStatusBadge(selectedReport.status)}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Date & Time</p>
                <p className="font-medium text-[#04D2D2]">
                  {new Date(selectedReport.timestamp).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Duration</p>
                <p className="font-medium text-[#04D2D2]">{selectedReport.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Findings</p>
                <p className="font-medium text-[#04D2D2]">{selectedReport.findings}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Severity</p>
                <div className="mt-1">
                  {getSeverityBadge(selectedReport.severity)}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-md font-medium text-[#04D2D2] mb-2">
                Details
              </h4>
              <p className="text-gray-300 bg-[#1A2335] p-4 rounded-md">
                {selectedReport.details}
              </p>
            </div>

            {selectedReport.findings > 0 && (
              <div>
                <h4 className="text-md font-medium text-[#04D2D2] mb-2">
                  Findings Preview
                </h4>
                <pre className="text-gray-300 bg-[#1A2335] p-4 rounded-md overflow-x-auto text-xs">
                  {JSON.stringify(selectedReport.rawData, null, 2).slice(0, 1000)}...
                </pre>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-[#1A2335] flex justify-end space-x-3">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-[#1A2335] hover:bg-[#253247] rounded-md text-sm transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => downloadReport(selectedReport)}
              className="flex items-center px-4 py-2 bg-[#04D2D2] hover:bg-[#03BEBE] text-black rounded-md text-sm transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Full Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main table component
  const ReportsTable = () => {
    return (
      <div className="bg-[#040C1F] rounded-xl shadow-md border border-[#1A2335]">
        <div className="p-4 md:p-6 border-b border-[#1A2335] flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-[#04D2D2]">
              Scan Reports
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Detailed list of security scan results
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center px-3 py-2 bg-[#1A2335] hover:bg-[#253247] rounded-md text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#04D2D2]"></div>
          </div>
        ) : (
          <div className="overflow-x-auto p-4">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1A2335] text-[#04D2D2]">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Tool
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Target
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Findings
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2335]">
                {paginatedReports.length > 0 ? (
                  paginatedReports.map((report) => (
                    <tr key={report.id} className="hover:bg-[#1A2335]">
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {report.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {report.tool}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {report.target || report.results?.domain || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {renderStatusBadge(report.status)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {report.findings}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {getSeverityBadge(report.severity)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {new Date(report.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setModalOpen(true);
                          }}
                          className="text-[#04D2D2] hover:text-[#03BEBE]"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => downloadReport(report)}
                          className="text-green-400 hover:text-green-500"
                          title="Download Report"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      {filteredReports.length === 0 && reports.length > 0
                        ? "No reports match your filter criteria"
                        : "No scan reports available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-[#1A2335] bg-[#040C1F] px-4 py-3 sm:px-6 mt-4">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${page === 1
                    ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
                    : "bg-[#1A2335] text-white hover:bg-[#253247]"
                    }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className={`relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${page === totalPages
                    ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
                    : "bg-[#1A2335] text-white hover:bg-[#253247]"
                    }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-400">
                    Showing{" "}
                    <span className="font-medium">
                      {(page - 1) * itemsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        page * itemsPerPage,
                        filteredReports.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredReports.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md ${page === 1
                        ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
                        : "bg-[#1A2335] text-white hover:bg-[#253247]"
                        }`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {Array.from(
                      { length: totalPages },
                      (_, i) => i + 1
                    ).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${page === pageNum
                          ? "bg-[#04D2D2] text-black"
                          : "bg-[#1A2335] text-white hover:bg-[#253247]"
                          }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setPage(Math.min(totalPages, page + 1))
                      }
                      disabled={page === totalPages || totalPages === 0}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md ${page === totalPages || totalPages === 0
                        ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
                        : "bg-[#1A2335] text-white hover:bg-[#253247]"
                        }`}
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Main content */}
      <div className="flex flex-col min-h-screen text-white bg-[#0E1427]">
        <PageTitle title="Security Scan Reports" desc="View and analyze your security scanning results" />

        {/* Dashboard stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Scans</p>
                <h3 className="text-2xl font-bold mt-2">{totalScans}</h3>
              </div>
              <div className="bg-[#1A2335] p-3 rounded-lg">
                <Shield className="h-6 w-6 text-[#04D2D2]" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              <span className="inline-flex items-center text-green-400">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  ></path>
                </svg>
                {reports.length > 0 ? "Data loaded" : "Loading data"}
              </span>
            </div>
          </div>

          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Pass Rate</p>
                <h3 className="text-2xl font-bold mt-2">
                  {totalScans ? Math.round((passed / totalScans) * 100) : 0}%
                </h3>
              </div>
              <div className="bg-[#1A2335] p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-[#04D2D2]" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              <span className="inline-flex items-center">
                {passed} passed scans
              </span>
            </div>
          </div>

          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Findings</p>
                <h3 className="text-2xl font-bold mt-2">{totalFindings}</h3>
              </div>
              <div className="bg-[#1A2335] p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-[#04D2D2]" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              <span className="inline-flex items-center">
                Across all scans
              </span>
            </div>
          </div>

          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Critical Issues</p>
                <h3 className="text-2xl font-bold mt-2">
                  {reports.filter((r) => r.severity === "Critical").length}
                </h3>
              </div>
              <div className="bg-[#1A2335] p-3 rounded-lg">
                <FileText className="h-6 w-6 text-[#04D2D2]" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              <span className="inline-flex items-center">
                Requires immediate attention
              </span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Pie Chart */}
          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <h3 className="text-lg font-medium mb-4">Scan Results</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} scans`, name]}
                  contentStyle={{
                    backgroundColor: "#1A2335",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <h3 className="text-lg font-medium mb-4">Scan Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2335" />
                <XAxis dataKey="name" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A2335",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Passed"
                  stroke="#22c55e"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="Failed"
                  stroke="#ef4444"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <h3 className="text-lg font-medium mb-4">Issue Severity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2335" />
                <XAxis dataKey="name" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip
                  formatter={(value) => [`${value} issues`]}
                  contentStyle={{
                    backgroundColor: "#1A2335",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value">
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#040C1F] p-4 rounded-xl border border-[#1A2335] flex flex-col md:flex-row md:items-center mb-6 space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-[#1A2335] rounded-md bg-[#1A2335] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04D2D2] focus:border-transparent"
                placeholder="Search scans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div>
              <select
                className="bg-[#1A2335] border border-[#253247] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#04D2D2]"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="day">Last 24 Hours</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            <div>
              <select
                className="bg-[#1A2335] border border-[#253247] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#04D2D2]"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div>
              <select
                className="bg-[#1A2335] border border-[#253247] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#04D2D2]"
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="none">None</option>
              </select>
            </div>

            <button
              className="flex items-center bg-[#1A2335] text-gray-400 px-3 py-2 rounded-md hover:bg-[#253247]"
              onClick={() => {
                setSearchTerm("");
                setSelectedTimeframe("week");
                setSelectedStatus("all");
                setSelectedSeverity("all");
                setPage(1);
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <ReportsTable />
      </div>

      {/* Show modal if open */}
      {modalOpen && <ReportDetailsModal />}
    </div>
  );
};

export default Reports;
