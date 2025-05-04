// // import React, { useState } from "react";
// // import { ChevronDown, Search, Filter, ExternalLink, ShieldAlert, Globe, Server, Database, Code } from "lucide-react";
// // import PageTitle from "../../components/PageTitle";

// // const AttackSurface = () => {
// //   const [filters, setFilters] = useState({});
// //   const [expanded, setExpanded] = useState({});

// //   const surfaceItems = [
// //     {
// //       id: "1.2.3.4:443",
// //       ipAddress: "1.2.3.4",
// //       netblock: "1.2.3.0/24",
// //       service: "HTTPS",
// //       os: "Linux",
// //       port: 443,
// //       protocol: "TCP",
// //       duration: "Always on",
// //       url: "https://example.com",
// //       technologies: [
// //         { name: "Nginx", icon: <Server size={16} className="text-green-500" /> },
// //         { name: "PHP", icon: <Code size={16} className="text-blue-500" /> },
// //         { name: "MySQL", icon: <Database size={16} className="text-orange-500" /> },
// //         { name: "jQuery", icon: <Code size={16} className="text-indigo-500" /> },
// //         { name: "React", icon: <Code size={16} className="text-blue-300" /> }
// //       ]
// //     },
// //     {
// //       id: "5.6.7.8:80",
// //       ipAddress: "5.6.7.8",
// //       netblock: "5.6.7.0/24",
// //       service: "HTTP",
// //       os: "Windows",
// //       port: 80,
// //       protocol: "TCP",
// //       duration: "Intermittent",
// //       url: "http://test.example.com",
// //       technologies: [
// //         { name: "Apache", icon: <Server size={16} className="text-red-500" /> },
// //         { name: "WordPress", icon: <Globe size={16} className="text-blue-500" /> },
// //       ]
// //     }
// //   ];

// //   const toggleExpand = (id) => {
// //     setExpanded(prev => ({
// //       ...prev,
// //       [id]: !prev[id]
// //     }));
// //   };

// //   return (
// //     <div className="bg-[#0E1427] text-white p-6">
// //       <PageTitle
// //         title="Attack Surface"
// //         desc="Mapping surface of both traditional security indicators and API bodies, ports, services, tech stacks and other attack vectors."
// //       />

// //       <div className="flex justify-between items-center mb-6">
// //         <button className="bg-[#1E293B] hover:bg-[#263548] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300 border border-[#2A3A55] hover:border-[#04D2D2]">
// //           <Filter size={16} />
// //           Export to
// //           <ChevronDown size={16} />
// //         </button>

// //         <div className="flex items-center gap-4">
// //           <div className="text-sm text-gray-400">
// //             Live feed
// //           </div>
// //           <label className="inline-flex items-center cursor-pointer">
// //             <input type="checkbox" value="" className="sr-only peer" defaultChecked />
// //             <div className="relative w-11 h-6 bg-[#1E293B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04D2D2]"></div>
// //           </label>
// //         </div>
// //       </div>

// //       <div className="bg-[#040C1F] border border-[#1E293B] rounded-xl overflow-hidden mb-6">
// //         <div className="flex justify-between items-center p-4 border-b border-[#1E293B]">
// //           <div className="flex items-center gap-2">
// //             <span>{surfaceItems.length} Surfaces</span>
// //             <button className="text-gray-400 hover:text-[#04D2D2]">
// //               <ChevronDown size={16} />
// //             </button>
// //           </div>

// //           <div className="flex items-center gap-4">
// //             <div className="relative">
// //               <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //               <input
// //                 type="text"
// //                 placeholder="Filter..."
// //                 className="bg-[#0E1427] text-white pl-10 pr-4 py-2 rounded-lg border border-[#1E293B] focus:border-[#04D2D2] focus:outline-none w-64"
// //               />
// //             </div>
// //             <button className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#263548] text-gray-400 hover:text-[#04D2D2] transition-colors">
// //               <Filter size={16} />
// //             </button>
// //           </div>
// //         </div>

// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-[#0A1121] text-gray-400 text-sm">
// //               <tr>
// //                 <th className="px-4 py-3 text-left">IP Address / ID</th>
// //                 <th className="px-4 py-3 text-left">Netblock</th>
// //                 <th className="px-4 py-3 text-left">OS</th>
// //                 <th className="px-4 py-3 text-left">Port</th>
// //                 <th className="px-4 py-3 text-left">Protocol</th>
// //                 <th className="px-4 py-3 text-left">Duration</th>
// //                 <th className="px-4 py-3 text-left">URL</th>
// //                 <th className="px-4 py-3 text-left">Technologies</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {surfaceItems.map((item) => (
// //                 <tr
// //                   key={item.id}
// //                   className="border-t border-[#1E293B] hover:bg-[#0A1121] transition-colors duration-200"
// //                 >
// //                   <td className="px-4 py-3">
// //                     <div className="flex items-center gap-2 text-[#04D2D2] font-medium">
// //                       <ShieldAlert size={16} className="text-[#04D2D2]" />
// //                       {item.ipAddress}
// //                     </div>
// //                   </td>
// //                   <td className="px-4 py-3 text-gray-300">{item.netblock}</td>
// //                   <td className="px-4 py-3 text-gray-300">{item.os}</td>
// //                   <td className="px-4 py-3 text-gray-300">{item.port}</td>
// //                   <td className="px-4 py-3 text-gray-300">{item.protocol}</td>
// //                   <td className="px-4 py-3 text-gray-300">{item.duration}</td>
// //                   <td className="px-4 py-3">
// //                     <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-[#04D2D2] flex items-center gap-1">
// //                       {new URL(item.url).hostname}
// //                       <ExternalLink size={14} />
// //                     </a>
// //                   </td>
// //                   <td className="px-4 py-3">
// //                     <div className="flex flex-wrap gap-2">
// //                       {item.technologies.slice(0, 3).map((tech, idx) => (
// //                         <div key={idx} className="flex items-center gap-1 bg-[#1E293B] px-2 py-1 rounded text-xs">
// //                           {tech.icon}
// //                           {tech.name}
// //                         </div>
// //                       ))}
// //                       {item.technologies.length > 3 && (
// //                         <div
// //                           className="flex items-center gap-1 bg-[#1E293B] px-2 py-1 rounded text-xs cursor-pointer hover:bg-[#263548]"
// //                           onClick={() => toggleExpand(item.id)}
// //                         >
// //                           +{item.technologies.length - 3} more
// //                         </div>
// //                       )}
// //                     </div>
// //                     {expanded[item.id] && (
// //                       <div className="mt-2 grid grid-cols-2 gap-2">
// //                         {item.technologies.slice(3).map((tech, idx) => (
// //                           <div key={idx} className="flex items-center gap-1 bg-[#1E293B] px-2 py-1 rounded text-xs">
// //                             {tech.icon}
// //                             {tech.name}
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       <div className="flex justify-between items-center">
// //         <div className="flex items-center gap-2">
// //           <span className="text-sm text-gray-400">Rows per page:</span>
// //           <select className="bg-[#1E293B] border border-[#2A3A55] text-white rounded-md px-2 py-1 text-sm focus:outline-none focus:border-[#04D2D2]">
// //             <option>10</option>
// //             <option>25</option>
// //             <option>50</option>
// //             <option>100</option>
// //           </select>
// //         </div>

// //         <div className="flex items-center gap-4">
// //           <button className="bg-[#1E293B] hover:bg-[#263548] text-white px-3 py-1 rounded-lg transition-colors duration-300 border border-[#2A3A55] hover:border-[#04D2D2]">
// //             Previous
// //           </button>
// //           <span className="text-sm text-gray-400">1 of 1</span>
// //           <button className="bg-[#1E293B] hover:bg-[#263548] text-white px-3 py-1 rounded-lg transition-colors duration-300 border border-[#2A3A55] hover:border-[#04D2D2]">
// //             Next
// //           </button>
// //         </div>
// //       </div>

// //       <div className="flex justify-center mt-6">
// //         <button className="bg-[#04D2D2] hover:bg-[#03afaf] text-[#0E1427] font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2">
// //           <Search size={16} />
// //           TRACK
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AttackSurface;

// import React, { useState, useEffect } from "react";
// import {
//   ChevronDown,
//   Search,
//   Filter,
//   ExternalLink,
//   ShieldAlert,
//   Globe,
//   Server,
//   Database,
//   Code,
// } from "lucide-react";
// import PageTitle from "../../components/PageTitle";

// // Mock PageTitle component since it's imported in the original
// const AttackSurface = () => {
//   // State management
//   const [searchTerm, setSearchTerm] = useState("");
//   const [expanded, setExpanded] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [liveFeed, setLiveFeed] = useState(true);
//   const [filteredItems, setFilteredItems] = useState([]);

//   // Initial data
//   const surfaceItems = [
//     {
//       id: "1.2.3.4:443",
//       ipAddress: "1.2.3.4",
//       netblock: "1.2.3.0/24",
//       service: "HTTPS",
//       os: "Linux",
//       port: 443,
//       protocol: "TCP",
//       duration: "Always on",
//       url: "https://example.com",
//       technologies: [
//         {
//           name: "Nginx",
//           icon: <Server size={16} className="text-green-500" />,
//         },
//         { name: "PHP", icon: <Code size={16} className="text-blue-500" /> },
//         {
//           name: "MySQL",
//           icon: <Database size={16} className="text-orange-500" />,
//         },
//         {
//           name: "jQuery",
//           icon: <Code size={16} className="text-indigo-500" />,
//         },
//         { name: "React", icon: <Code size={16} className="text-blue-300" /> },
//       ],
//     },
//     {
//       id: "5.6.7.8:80",
//       ipAddress: "5.6.7.8",
//       netblock: "5.6.7.0/24",
//       service: "HTTP",
//       os: "Windows",
//       port: 80,
//       protocol: "TCP",
//       duration: "Intermittent",
//       url: "http://test.example.com",
//       technologies: [
//         { name: "Apache", icon: <Server size={16} className="text-red-500" /> },
//         {
//           name: "WordPress",
//           icon: <Globe size={16} className="text-blue-500" />,
//         },
//       ],
//     },
//     {
//       id: "9.10.11.12:22",
//       ipAddress: "9.10.11.12",
//       netblock: "9.10.11.0/24",
//       service: "SSH",
//       os: "Linux",
//       port: 22,
//       protocol: "TCP",
//       duration: "Always on",
//       url: "ssh://admin@example.org",
//       technologies: [
//         {
//           name: "OpenSSH",
//           icon: <Server size={16} className="text-yellow-500" />,
//         },
//         {
//           name: "Ubuntu",
//           icon: <Server size={16} className="text-orange-500" />,
//         },
//       ],
//     },
//     {
//       id: "13.14.15.16:3389",
//       ipAddress: "13.14.15.16",
//       netblock: "13.14.0.0/16",
//       service: "RDP",
//       os: "Windows Server",
//       port: 3389,
//       protocol: "TCP",
//       duration: "Business Hours",
//       url: "rdp://example.net",
//       technologies: [
//         {
//           name: "Windows Server",
//           icon: <Server size={16} className="text-blue-500" />,
//         },
//         { name: "IIS", icon: <Globe size={16} className="text-gray-500" /> },
//         {
//           name: "SQL Server",
//           icon: <Database size={16} className="text-red-400" />,
//         },
//       ],
//     },
//     {
//       id: "17.18.19.20:8080",
//       ipAddress: "17.18.19.20",
//       netblock: "17.18.19.0/24",
//       service: "HTTP-ALT",
//       os: "Linux",
//       port: 8080,
//       protocol: "TCP",
//       duration: "Always on",
//       url: "http://api.example.com:8080",
//       technologies: [
//         {
//           name: "Tomcat",
//           icon: <Server size={16} className="text-yellow-500" />,
//         },
//         { name: "Java", icon: <Code size={16} className="text-red-500" /> },
//         { name: "Spring", icon: <Code size={16} className="text-green-500" /> },
//         {
//           name: "MongoDB",
//           icon: <Database size={16} className="text-green-400" />,
//         },
//       ],
//     },
//   ];

//   // Filter items based on search term
//   useEffect(() => {
//     const filtered = surfaceItems.filter((item) => {
//       const searchLower = searchTerm.toLowerCase();
//       return (
//         item.ipAddress.toLowerCase().includes(searchLower) ||
//         item.netblock.toLowerCase().includes(searchLower) ||
//         item.os.toLowerCase().includes(searchLower) ||
//         item.protocol.toLowerCase().includes(searchLower) ||
//         item.service.toLowerCase().includes(searchLower) ||
//         new URL(item.url).hostname.toLowerCase().includes(searchLower) ||
//         item.technologies.some((tech) =>
//           tech.name.toLowerCase().includes(searchLower)
//         )
//       );
//     });

//     setFilteredItems(filtered);
//   }, [searchTerm]);

//   // Initial filtered items
//   useEffect(() => {
//     setFilteredItems(surfaceItems);
//   }, []);

//   // Toggle expanded state for technologies
//   const toggleExpand = (id) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   // Pagination
//   const totalPages = Math.ceil(filteredItems.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const currentItems = filteredItems.slice(startIndex, endIndex);

//   // Handle page navigation
//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Handle rows per page change
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(parseInt(e.target.value));
//     setCurrentPage(1); // Reset to first page when changing rows per page
//   };

//   return (
//     <div className="bg-[#0E1427] text-white p-6">
//       <PageTitle
//         title="Attack Surface"
//         desc="Mapping surface of both traditional security indicators and API bodies, ports, services, tech stacks and other attack vectors."
//       />

//       <div className="flex justify-between items-center mb-6">
//         <div className="flex gap-2">
//           <button className="bg-[#1E293B] hover:bg-[#263548] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300 border border-[#2A3A55] hover:border-[#04D2D2]">
//             <Filter size={16} />
//             Export to
//             <ChevronDown size={16} />
//           </button>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="text-sm text-gray-400">Live feed</div>
//           <label className="inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               className="sr-only peer"
//               checked={liveFeed}
//               onChange={() => setLiveFeed(!liveFeed)}
//             />
//             <div className="relative w-11 h-6 bg-[#1E293B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04D2D2]"></div>
//           </label>
//         </div>
//       </div>

//       <div className="bg-[#040C1F] border border-[#1E293B] rounded-xl overflow-hidden mb-6">
//         <div className="flex justify-between items-center p-4 border-b border-[#1E293B]">
//           <div className="flex items-center gap-2">
//             <span>{filteredItems.length} Surfaces</span>
//             <button className="text-gray-400 hover:text-[#04D2D2]">
//               <ChevronDown size={16} />
//             </button>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Search
//                 size={16}
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="text"
//                 placeholder="Filter..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="bg-[#0E1427] text-white pl-10 pr-4 py-2 rounded-lg border border-[#1E293B] focus:border-[#04D2D2] focus:outline-none w-64"
//               />
//             </div>
//             <button className="p-2 rounded-lg bg-[#1E293B] hover:bg-[#263548] text-gray-400 hover:text-[#04D2D2] transition-colors">
//               <Filter size={16} />
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-[#0A1121] text-gray-400 text-sm">
//               <tr>
//                 <th className="px-4 py-3 text-left">IP Address / ID</th>
//                 <th className="px-4 py-3 text-left">Netblock</th>
//                 <th className="px-4 py-3 text-left">OS</th>
//                 <th className="px-4 py-3 text-left">Port</th>
//                 <th className="px-4 py-3 text-left">Protocol</th>
//                 <th className="px-4 py-3 text-left">Duration</th>
//                 <th className="px-4 py-3 text-left">URL</th>
//                 <th className="px-4 py-3 text-left">Technologies</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.length > 0 ? (
//                 currentItems.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="border-t border-[#1E293B] hover:bg-[#0A1121] transition-colors duration-200"
//                   >
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2 text-[#04D2D2] font-medium">
//                         <ShieldAlert size={16} className="text-[#04D2D2]" />
//                         {item.ipAddress}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-gray-300">{item.netblock}</td>
//                     <td className="px-4 py-3 text-gray-300">{item.os}</td>
//                     <td className="px-4 py-3 text-gray-300">{item.port}</td>
//                     <td className="px-4 py-3 text-gray-300">{item.protocol}</td>
//                     <td className="px-4 py-3 text-gray-300">{item.duration}</td>
//                     <td className="px-4 py-3">
//                       <a
//                         href={item.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-[#04D2D2] flex items-center gap-1"
//                       >
//                         {new URL(item.url).hostname}
//                         <ExternalLink size={14} />
//                       </a>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex flex-wrap gap-2">
//                         {item.technologies.slice(0, 3).map((tech, idx) => (
//                           <div
//                             key={idx}
//                             className="flex items-center gap-1 bg-[#1E293B] px-2 py-1 rounded text-xs"
//                           >
//                             {tech.icon}
//                             {tech.name}
//                           </div>
//                         ))}
//                         {item.technologies.length > 3 && (
//                           <div
//                             className="flex items-center gap-1 bg-[#1E293B] px-2 py-1 rounded text-xs cursor-pointer hover:bg-[#263548]"
//                             onClick={() => toggleExpand(item.id)}
//                           >
//                             +{item.technologies.length - 3} more
//                           </div>
//                         )}
//                       </div>
//                       {expanded[item.id] && (
//                         <div className="mt-2 grid grid-cols-2 gap-2">
//                           {item.technologies.slice(3).map((tech, idx) => (
//                             <div
//                               key={idx}
//                               className="flex items-center gap-1 bg-[#1E293B] px-2 py-1 rounded text-xs"
//                             >
//                               {tech.icon}
//                               {tech.name}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="8"
//                     className="px-4 py-6 text-center text-gray-400"
//                   >
//                     No results found for "{searchTerm}"
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-400">Rows per page:</span>
//           <select
//             className="bg-[#1E293B] border border-[#2A3A55] text-white rounded-md px-2 py-1 text-sm focus:outline-none focus:border-[#04D2D2]"
//             value={rowsPerPage}
//             onChange={handleRowsPerPageChange}
//           >
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//             <option value={50}>50</option>
//             <option value={100}>100</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-4">
//           <button
//             className={`bg-[#1E293B] text-white px-3 py-1 rounded-lg transition-colors duration-300 border border-[#2A3A55] ${
//               currentPage > 1
//                 ? "hover:bg-[#263548] hover:border-[#04D2D2]"
//                 : "opacity-50 cursor-not-allowed"
//             }`}
//             onClick={goToPreviousPage}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>
//           <span className="text-sm text-gray-400">
//             {currentPage} of {totalPages || 1}
//           </span>
//           <button
//             className={`bg-[#1E293B] text-white px-3 py-1 rounded-lg transition-colors duration-300 border border-[#2A3A55] ${
//               currentPage < totalPages
//                 ? "hover:bg-[#263548] hover:border-[#04D2D2]"
//                 : "opacity-50 cursor-not-allowed"
//             }`}
//             onClick={goToNextPage}
//             disabled={currentPage >= totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           className="bg-[#04D2D2] hover:bg-[#03afaf] text-[#0E1427] font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
//           onClick={() => alert("Starting to track attack surface...")}
//         >
//           <Search size={16} />
//           TRACK
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AttackSurface;
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Search,
  Filter,
  ExternalLink,
  ShieldAlert,
  Globe,
  Server,
  Database,
  Code,
  X,
  Shield,
  Cloud,
  Lock,
  Network,
  HardDrive,
  Cpu,
  ShieldCheck,
  ShieldOff,
  Wifi,
  WifiOff,
  Activity,
  AlertCircle,
} from "lucide-react";
import PageTitle from "../../components/PageTitle";
import apiInstance from "../../api/instance";

// Technology icon mapping
const technologyIcons = {
  "Cloudflare": <Cloud size={16} className="text-blue-400" />,
  "Nginx": <Server size={16} className="text-green-500" />,
  "Apache": <Server size={16} className="text-red-500" />,
  "IIS": <Server size={16} className="text-purple-500" />,
  "MySQL": <Database size={16} className="text-orange-500" />,
  "MongoDB": <Database size={16} className="text-green-400" />,
  "SQL Server": <Database size={16} className="text-red-400" />,
  "PHP": <Code size={16} className="text-blue-500" />,
  "Java": <Code size={16} className="text-red-500" />,
  "JavaScript": <Code size={16} className="text-yellow-400" />,
  "React": <Code size={16} className="text-blue-300" />,
  "jQuery": <Code size={16} className="text-indigo-500" />,
  "WordPress": <Globe size={16} className="text-blue-500" />,
  "OpenSSH": <Server size={16} className="text-yellow-500" />,
  "Ubuntu": <HardDrive size={16} className="text-orange-500" />,
  "Windows Server": <Server size={16} className="text-blue-500" />,
  "Tomcat": <Server size={16} className="text-yellow-500" />,
  "Spring": <Code size={16} className="text-green-500" />,
  "WAF": <ShieldCheck size={16} className="text-green-500" />,
  "Firewall": <Shield size={16} className="text-orange-500" />,
  "CDN": <Network size={16} className="text-blue-400" />,
  "DDoS Protection": <Activity size={16} className="text-red-500" />,
  "Unknown": <AlertCircle size={16} className="text-gray-500" />,
  "Rate Limiting": <Shield size={16} className="text-yellow-500" />,
  "Captcha": <Lock size={16} className="text-purple-500" />,
};

const AttackSurface = () => {
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [liveFeed, setLiveFeed] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredIPReports, setFilteredIPReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    os: [],
    protocol: [],
    status: [],
  });

  // Fetch data from API
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) return;
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await apiInstance.get('/api/reports', {
          params: { userId }
        });
        const data = response.data;
        const allReports = transformApiData(data);
        const wafReports = allReports.filter(report => report.tool === "WAF Detector");
        const techReport = allReports.filter(report => report.tool === "Technologies Scanner");
        const ipReports = allReports.filter(report => report.tool === "WAF Detector" && report.tool === "Technologies Scanner");
        console.log("IP Reports:", wafReports); // Debugging line
        setFilteredIPReports(wafReports);
        setFilteredItems(processWafReports(wafReports));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, [userId]);

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


  // Process WAF reports into table format
  const processWafReports = (reports) => {
    return reports.map(report => {
      const rawData = report.rawData || {};
      const wafInfo = rawData.WAF_Info || {};
      const ipInfo = rawData.IP_Information || {};

      // Extract technologies
      const technologies = [];
      if (rawData.WAF_Detection_Result && rawData.WAF_Detection_Result.length > 0) {
        technologies.push({
          name: rawData.WAF_Detection_Result[0],
          icon: technologyIcons[rawData.WAF_Detection_Result[0]] || technologyIcons["WAF"]
        });
      }

      if (rawData.Server && rawData.Server !== "Unknown Server") {
        technologies.push({
          name: rawData.Server,
          icon: technologyIcons[rawData.Server] || technologyIcons["Unknown"]
        });
      }

      if (rawData.Protection_Methods) {
        rawData.Protection_Methods.split(", ").forEach(method => {
          technologies.push({
            name: method,
            icon: technologyIcons[method] || technologyIcons["Unknown"]
          });
        });
      }

      console.log(report); // Debugging line

      return {
        id: report.id,
        ipAddress: ipInfo.IPAddress || "Unknown",
        location: ipInfo.Location || "Unknown",
        os: ipInfo.ISP ? ipInfo.ISP.split(",")[0] : "Unknown",
        port: rawData.Status_Code || "Unknown",
        protocol: "HTTPS", // Default to HTTPS for web services
        duration: report.duration || "Unknown",
        url: rawData.Target_URL ? `https://${rawData.Target_URL}` : "#",
        technologies,
        vulnerabilityScore: (report.rawData.Server_Info?.severity === "info" || report.rawData.severity === "info")
          ? "Low"
          : (report.rawData.Server_Info?.severity || report.rawData.severity)|| "None",

        status: report.status,
        rawData: report.rawData
      };
    });
  };

  // Apply filters and search
  useEffect(() => {
    if (filteredIPReports.length === 0) return;

    let results = processWafReports(filteredIPReports);

    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(
        (item) =>
          item.ipAddress.toLowerCase().includes(searchLower) ||
          item.location.toLowerCase().includes(searchLower) ||
          item.os.toLowerCase().includes(searchLower) ||
          item.protocol.toLowerCase().includes(searchLower) ||
          item.port.toString().includes(searchLower) ||
          item.url.toLowerCase().includes(searchLower) ||
          item.technologies.some((tech) =>
            tech.name.toLowerCase().includes(searchLower)
          )
      );
    }

    // Apply active filters
    Object.entries(activeFilters).forEach(([filterType, selectedValues]) => {
      if (selectedValues.length > 0) {
        results = results.filter((item) =>
          selectedValues.includes(item[filterType])
        );
      }
    });

    setFilteredItems(results);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchTerm, activeFilters, filteredIPReports]);

  // Extract all possible filter values
  const filterOptions = {
    os: [...new Set(filteredIPReports.map(report => {
      const ipInfo = report.rawData?.IP_Information || {};
      return ipInfo.ISP ? ipInfo.ISP.split(",")[0] : "Unknown";
    }))],
    protocol: ["HTTP", "HTTPS", "TCP", "UDP"],
    status: ["Passed", "Failed"],
  };

  // Initial filtered items
  // useEffect(() => {
  //   setFilteredItems(surfaceItems);
  // }, []);

  // Toggle expanded state for technologies
  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle filter menu
  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  // Toggle filter selection
  const toggleFilter = (type, value) => {
    setActiveFilters((prev) => {
      const updated = { ...prev };

      if (updated[type].includes(value)) {
        updated[type] = updated[type].filter((v) => v !== value);
      } else {
        updated[type] = [...updated[type], value];
      }

      return updated;
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      os: [],
      protocol: [],
      duration: [],
    });
    setSearchTerm("");
  };

  // Remove a specific filter
  const removeFilter = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((v) => v !== value),
    }));
  };

  // Count total active filters
  const totalActiveFilters = Object.values(activeFilters).flat().length;

  // Sort functionality
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to filtered items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedItems.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentItems = sortedItems.slice(startIndex, endIndex);

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Export functionality
  const [showExportMenu, setShowExportMenu] = useState(false);

  const toggleExportMenu = () => {
    setShowExportMenu(!showExportMenu);
  };

  const exportData = (format) => {
    alert(`Exporting data in ${format} format...`);
    setShowExportMenu(false);
  };

  return (
    <div className="bg-[#0E1427] text-white p-6">
      <PageTitle
        title="Attack Surface"
        desc="Mapping surface of both traditional security indicators and API bodies, ports, services, tech stacks and other attack vectors."
      />

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <button
            className="bg-[#1E293B] hover:bg-[#263548] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300 border border-[#2A3A55] hover:border-[#04D2D2]"
            onClick={toggleExportMenu}
          >
            <Filter size={16} />
            Export to
            <ChevronDown size={16} />
          </button>

          {showExportMenu && (
            <div className="absolute top-full left-0 mt-2 bg-[#1E293B] border border-[#2A3A55] rounded-lg shadow-lg z-10 w-48">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-[#263548] cursor-pointer border-b border-[#2A3A55]"
                  onClick={() => exportData("CSV")}
                >
                  CSV
                </li>
                <li
                  className="px-4 py-2 hover:bg-[#263548] cursor-pointer border-b border-[#2A3A55]"
                  onClick={() => exportData("JSON")}
                >
                  JSON
                </li>
                <li
                  className="px-4 py-2 hover:bg-[#263548] cursor-pointer"
                  onClick={() => exportData("PDF")}
                >
                  PDF
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">Live feed</div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={liveFeed}
              onChange={() => setLiveFeed(!liveFeed)}
            />
            <div className="relative w-11 h-6 bg-[#1E293B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#04D2D2]"></div>
          </label>
        </div>
      </div>

      {/* Active filters display */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(activeFilters).map(([type, values]) =>
            values.map((value) => (
              <div
                key={`${type}-${value}`}
                className="bg-[#1E293B] px-3 py-1 rounded-lg flex items-center gap-2 text-sm"
              >
                <span className="text-gray-400">{type}:</span>
                <span>{value}</span>
                <button
                  className="text-gray-400 hover:text-[#04D2D2]"
                  onClick={() => removeFilter(type, value)}
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
          <button
            className="text-[#04D2D2] hover:underline text-sm flex items-center"
            onClick={clearAllFilters}
          >
            Clear all filters
          </button>
        </div>
      )}

      <div className="bg-[#040C1F] border border-[#1E293B] rounded-xl overflow-hidden mb-6">
        <div className="flex justify-between items-center p-4 border-b border-[#1E293B]">
          <div className="flex items-center gap-2">
            <span>{filteredItems.length} Surfaces</span>
            <button className="text-gray-400 hover:text-[#04D2D2]">
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Filter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#0E1427] text-white pl-10 pr-4 py-2 rounded-lg border border-[#1E293B] focus:border-[#04D2D2] focus:outline-none w-64"
              />
            </div>
            <div className="relative">
              <button
                className={`p-2 rounded-lg ${showFilterMenu
                  ? "bg-[#04D2D2] text-[#0E1427]"
                  : "bg-[#1E293B] text-gray-400 hover:text-[#04D2D2]"
                  } transition-colors relative`}
                onClick={toggleFilterMenu}
              >
                <Filter size={16} />
                {totalActiveFilters > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {totalActiveFilters}
                  </span>
                )}
              </button>

              {/* Filter menu */}
              {showFilterMenu && (
                <div className="absolute top-full right-0 mt-2 bg-[#1E293B] border border-[#2A3A55] rounded-lg shadow-lg z-10 w-64">
                  <div className="p-3 border-b border-[#2A3A55]">
                    <h3 className="font-medium">Filters</h3>
                  </div>

                  {/* OS Filter */}
                  <div className="p-3 border-b border-[#2A3A55]">
                    <h4 className="text-sm text-gray-400 mb-2">
                      Operating System
                    </h4>
                    <div className="space-y-2">
                      {filterOptions.os.map((os) => (
                        <label
                          key={os}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={activeFilters.os.includes(os)}
                            onChange={() => toggleFilter("os", os)}
                            className="rounded border-gray-500 text-[#04D2D2] focus:ring-[#04D2D2] bg-[#0E1427]"
                          />
                          <span className="text-sm">{os}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Protocol Filter */}
                  <div className="p-3 border-b border-[#2A3A55]">
                    <h4 className="text-sm text-gray-400 mb-2">Protocol</h4>
                    <div className="space-y-2">
                      {filterOptions.protocol.map((protocol) => (
                        <label
                          key={protocol}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={activeFilters.protocol.includes(protocol)}
                            onChange={() => toggleFilter("protocol", protocol)}
                            className="rounded border-gray-500 text-[#04D2D2] focus:ring-[#04D2D2] bg-[#0E1427]"
                          />
                          <span className="text-sm">{protocol}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Duration Filter */}
                  <div className="p-3">
                    <h4 className="text-sm text-gray-400 mb-2">Duration</h4>
                    <div className="space-y-2">
                      {filterOptions.duration.map((duration) => (
                        <label
                          key={duration}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={activeFilters.duration.includes(duration)}
                            onChange={() => toggleFilter("duration", duration)}
                            className="rounded border-gray-500 text-[#04D2D2] focus:ring-[#04D2D2] bg-[#0E1427]"
                          />
                          <span className="text-sm">{duration}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 border-t border-[#2A3A55] flex justify-between">
                    <button
                      className="text-sm text-gray-400 hover:text-white"
                      onClick={clearAllFilters}
                    >
                      Clear all
                    </button>
                    <button
                      className="text-sm text-[#04D2D2] hover:text-white"
                      onClick={toggleFilterMenu}
                    >
                      Apply filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0A1121] text-gray-400 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">IP Address</th>
                <th className="px-4 py-3 text-left">HOSTNAME</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">ISP/OS</th>
                <th className="px-4 py-3 text-left">Status Code</th>
                <th className="px-4 py-3 text-left">Protocol</th>
                <th className="px-4 py-3 text-left">Technologies</th>
                <th className="px-4 py-3 text-left">Risk</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9">
                    <div className="px-4 py-10 flex justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#04D2D2]"></div>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-[#1E293B] hover:bg-[#0A1121] transition-colors duration-200"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-[#04D2D2] font-medium">
                        <ShieldAlert size={16} className="text-[#04D2D2]" />
                        {item.ipAddress}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-[#04D2D2] flex items-center gap-1"
                      >
                        {item.url.replace(/^https?:\/\//, '')}
                        <ExternalLink size={14} />
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{item.location}</td>
                    <td className="px-4 py-3 text-gray-300">{item.os}</td>
                    <td className="px-4 py-3 text-gray-300">
                      {item.status === "Passed" ? "200" : "404"}
                    </td>

                    <td className="px-4 py-3 text-gray-300">{item.protocol}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.slice(0, 3).map((tech, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1 bg-[#1E293B] px-2 py-1 rounded text-xs"
                          >
                            {tech.icon}
                            {tech.name}
                          </div>
                        ))}
                        {item.technologies.length > 3 && (
                          <div
                            className="flex items-center gap-1 bg-[#1E293B] px-2 py-1 rounded text-xs cursor-pointer hover:bg-[#263548]"
                            onClick={() => toggleExpand(item.id)}
                          >
                            +{item.technologies.length - 3} more
                          </div>
                        )}
                      </div>
                      {expanded[item.id] && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {item.technologies.slice(3).map((tech, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1 bg-[#1E293B] px-2 py-1 rounded text-xs"
                            >
                              {tech.icon}
                              {tech.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${item.vulnerabilityScore === "High"
                          ? "bg-red-900 text-red-300"
                          : item.vulnerabilityScore === "Medium"
                            ? "bg-yellow-900 text-yellow-300"
                            : item.vulnerabilityScore === "Low"
                              ? "bg-blue-900 text-green-300"
                              : "bg-green-900 text-green-300"
                          }`}
                      >
                        {item.vulnerabilityScore}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${item.status === "Passed"
                          ? "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-4 py-6 text-center text-gray-400">
                    No results found{" "}
                    {searchTerm
                      ? `for "${searchTerm}"`
                      : "with the selected filters"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Rows per page:</span>
          <select
            className="bg-[#1E293B] border border-[#2A3A55] text-white rounded-md px-2 py-1 text-sm focus:outline-none focus:border-[#04D2D2]"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button
            className={`bg-[#1E293B] text-white px-3 py-1 rounded-lg transition-colors duration-300 border border-[#2A3A55] ${currentPage > 1
              ? "hover:bg-[#263548] hover:border-[#04D2D2]"
              : "opacity-50 cursor-not-allowed"
              }`}
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-400">
            {currentPage} of {totalPages || 1}
          </span>
          <button
            className={`bg-[#1E293B] text-white px-3 py-1 rounded-lg transition-colors duration-300 border border-[#2A3A55] ${currentPage < totalPages
              ? "hover:bg-[#263548] hover:border-[#04D2D2]"
              : "opacity-50 cursor-not-allowed"
              }`}
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-[#04D2D2] hover:bg-[#03b8b8] text-[#0E1427] px-4 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2 font-medium"
          onClick={() => alert("Scan for new surfaces initiated!")}
        >
          <Search size={16} />
          Scan for new surfaces
        </button>
      </div>
    </div>
  );
};

export default AttackSurface;
