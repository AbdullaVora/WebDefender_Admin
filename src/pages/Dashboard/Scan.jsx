// // import React, { useState, useEffect } from 'react';
// // import { Plus, PlayCircle, Filter, MoreVertical, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// // // Mock data for the table
// // const generateMockData = (count) => {
// //   return Array(count).fill(0).map((_, index) => ({
// //     id: index + 1,
// //     name: `Scan ${index + 1}`,
// //     status: ['Complete', 'Pending', 'In Progress'][Math.floor(Math.random() * 3)],
// //     target: `target-${index + 1}.com`,
// //     summary: `Summary for scan ${index + 1}`,
// //     date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()
// //   }));
// // };

// // const Scan = () => {
// //   const [activeTab, setActiveTab] = useState('Scans');
// //   const [scans, setScans] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage, setItemsPerPage] = useState(25);
// //   const [sortColumn, setSortColumn] = useState('id');
// //   const [sortDirection, setSortDirection] = useState('asc');
// //   const [selectedScans, setSelectedScans] = useState([]);

// //   useEffect(() => {
// //     // Initialize with empty data
// //     setScans([]);
// //   }, []);

// //   const addNewScan = () => {
// //     const newScan = {
// //       id: scans.length + 1,
// //       name: `Scan ${scans.length + 1}`,
// //       status: 'Pending',
// //       target: 'example.com',
// //       summary: 'Initial scan',
// //       date: new Date().toLocaleDateString()
// //     };
// //     setScans([...scans, newScan]);
// //   };

// //   const handleSort = (column) => {
// //     const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
// //     setSortColumn(column);
// //     setSortDirection(direction);

// //     const sortedData = [...scans].sort((a, b) => {
// //       if (direction === 'asc') {
// //         return a[column] > b[column] ? 1 : -1;
// //       } else {
// //         return a[column] < b[column] ? 1 : -1;
// //       }
// //     });

// //     setScans(sortedData);
// //   };

// //   const handleSelectAll = (e) => {
// //     if (e.target.checked) {
// //       setSelectedScans(scans.map(scan => scan.id));
// //     } else {
// //       setSelectedScans([]);
// //     }
// //   };

// //   const handleSelectScan = (e, scanId) => {
// //     if (e.target.checked) {
// //       setSelectedScans([...selectedScans, scanId]);
// //     } else {
// //       setSelectedScans(selectedScans.filter(id => id !== scanId));
// //     }
// //   };

// //   return (
// //     <div className="main-container">
// //       {/* Main container with dark blue background */}
// //       <div className=" text-white p-6">
// //         <div className=" mx-auto">
// //           <div className="mb-2">
// //             <h1 className="text-2xl font-semibold">Scans</h1>
// //             <p className="text-sm text-gray-300">Showing all scans from the current workspace.</p>
// //           </div>

// //           <div className="flex justify-between items-center mb-6">
// //             <button
// //               onClick={addNewScan}
// //               className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
// //             >
// //               <Plus size={18} className="text-white" />
// //               <span className="text-white font-medium">New scan</span>
// //             </button>

// //             <button className="flex items-center gap-2 text-gray-300 hover:text-white">
// //               <PlayCircle size={18} />
// //               <span>How to generate a scan report</span>
// //             </button>
// //           </div>

// //           <div className="bg-[#00334d] rounded-lg shadow">
// //             {/* Tabs */}
// //             <div className="flex border-b border-gray-700">
// //               <button
// //                 className={`px-6 py-3 font-medium ${activeTab === 'Scans' ? 'text-[#00cccc] border-b-2 border-[#00cccc]' : 'text-gray-300'}`}
// //                 onClick={() => setActiveTab('Scans')}
// //               >
// //                 Scans
// //               </button>
// //               <button
// //                 className={`px-6 py-3 font-medium ${activeTab === 'Scheduled' ? 'text-[#00cccc] border-b-2 border-[#00cccc]' : 'text-gray-300'}`}
// //                 onClick={() => setActiveTab('Scheduled')}
// //               >
// //                 Scheduled
// //               </button>
// //             </div>

// //             {/* Table header */}
// //             <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
// //               <div></div>
// //               <div className="flex items-center gap-3">
// //                 <span className="text-sm text-gray-300">Filters off</span>
// //                 <button className="p-1 hover:bg-gray-700 rounded">
// //                   <Filter size={18} className="text-gray-300" />
// //                 </button>
// //                 <button className="p-1 hover:bg-gray-700 rounded">
// //                   <MoreVertical size={18} className="text-gray-300" />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Table */}
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead>
// //                   <tr className="text-left text-gray-300 border-b border-gray-700">
// //                     <th className="px-4 py-3 w-10">
// //                       <input
// //                         type="checkbox"
// //                         className="rounded bg-gray-700"
// //                         onChange={handleSelectAll}
// //                         checked={selectedScans.length === scans.length && scans.length > 0}
// //                       />
// //                     </th>
// //                     <th
// //                       className="px-4 py-3 font-medium cursor-pointer"
// //                       onClick={() => handleSort('name')}
// //                     >
// //                       Scans ({scans.length})
// //                       {sortColumn === 'name' && (
// //                         <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
// //                       )}
// //                     </th>
// //                     <th
// //                       className="px-4 py-3 font-medium cursor-pointer"
// //                       onClick={() => handleSort('status')}
// //                     >
// //                       Status
// //                       {sortColumn === 'status' && (
// //                         <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
// //                       )}
// //                     </th>
// //                     <th
// //                       className="px-4 py-3 font-medium cursor-pointer"
// //                       onClick={() => handleSort('target')}
// //                     >
// //                       Target
// //                       {sortColumn === 'target' && (
// //                         <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
// //                       )}
// //                     </th>
// //                     <th
// //                       className="px-4 py-3 font-medium cursor-pointer"
// //                       onClick={() => handleSort('summary')}
// //                     >
// //                       Summary
// //                       {sortColumn === 'summary' && (
// //                         <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
// //                       )}
// //                     </th>
// //                     <th
// //                       className="px-4 py-3 font-medium cursor-pointer"
// //                       onClick={() => handleSort('date')}
// //                     >
// //                       Date
// //                       {sortColumn === 'date' && (
// //                         <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
// //                       )}
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {scans.length > 0 ? (
// //                     scans.map(scan => (
// //                       <tr key={scan.id} className="border-b border-gray-700 hover:bg-gray-800">
// //                         <td className="px-4 py-3">
// //                           <input
// //                             type="checkbox"
// //                             className="rounded bg-gray-700"
// //                             checked={selectedScans.includes(scan.id)}
// //                             onChange={(e) => handleSelectScan(e, scan.id)}
// //                           />
// //                         </td>
// //                         <td className="px-4 py-3 font-medium text-white">{scan.name}</td>
// //                         <td className="px-4 py-3">
// //                           <span className={`px-2 py-1 rounded-full text-xs
// //                             ${scan.status === 'Complete' ? 'bg-green-900 text-green-300' :
// //                               scan.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' :
// //                                 'bg-blue-900 text-blue-300'}`}>
// //                             {scan.status}
// //                           </span>
// //                         </td>
// //                         <td className="px-4 py-3 text-gray-300">{scan.target}</td>
// //                         <td className="px-4 py-3 text-gray-300">{scan.summary}</td>
// //                         <td className="px-4 py-3 text-gray-300">{scan.date}</td>
// //                       </tr>
// //                     ))
// //                   ) : (
// //                     <tr>
// //                       <td colSpan="6" className="text-center py-16 text-gray-300">
// //                         You don't have any scans yet.
// //                         <div className="mt-4 flex justify-center">
// //                           <button
// //                             onClick={addNewScan}
// //                             className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md mx-auto"
// //                           >
// //                             <Plus size={18} className="text-white" />
// //                             <span className="text-white font-medium">New scan</span>
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>

// //             {/* Pagination */}
// //             <div className="flex items-center justify-between px-4 py-3 border-t border-gray-700">
// //               <div className="flex items-center gap-2 text-sm text-gray-300">
// //                 <span>Displaying</span>
// //                 <div className="relative">
// //                   <select
// //                     value={itemsPerPage}
// //                     onChange={(e) => setItemsPerPage(Number(e.target.value))}
// //                     className="appearance-none bg-gray-700 border border-gray-600 rounded px-3 py-1 pr-8 text-white"
// //                   >
// //                     <option value="10">10</option>
// //                     <option value="25">25</option>
// //                     <option value="50">50</option>
// //                     <option value="100">100</option>
// //                   </select>
// //                   <ChevronDown size={14} className="absolute right-2 top-2 text-gray-400" />
// //                 </div>
// //                 <span>in page</span>
// //               </div>

// //               <div className="flex items-center gap-2">
// //                 <button className="px-3 py-1 border border-gray-600 rounded text-gray-300 hover:bg-gray-700">
// //                   <ChevronLeft size={16} />
// //                 </button>
// //                 <button className="px-3 py-1 bg-[#00cccc] text-white rounded">1</button>
// //                 <button className="px-3 py-1 border border-gray-600 rounded text-gray-300 hover:bg-gray-700">
// //                   <ChevronRight size={16} />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Scan;

// // import React, { useState, useEffect } from "react";
// // import {
// //   Plus,
// //   PlayCircle,
// //   Filter,
// //   MoreVertical,
// //   ChevronDown,
// //   X,
// // } from "lucide-react";
// // import DataTable from "react-data-table-component";
// // import {Link} from "react-router-dom"

// // const Scan = () => {
// //   const [activeTab, setActiveTab] = useState("Scans");
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [totalRows, setTotalRows] = useState(0);
// //   const [perPage, setPerPage] = useState(25);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [filters, setFilters] = useState({
// //     status: "",
// //     target: "",
// //     date: "",
// //   });

// //   useEffect(() => {
// //     fetchData();
// //   }, [currentPage, perPage]);

// //   const fetchData = () => {
// //     setLoading(true);

// //     // Mock API call
// //     const mockData = Array.from({ length: perPage }, (_, i) => ({
// //       id: (currentPage - 1) * perPage + i + 1,
// //       name: `Scan ${(currentPage - 1) * perPage + i + 1}`,
// //       status: ["Complete", "Pending", "In Progress"][
// //         Math.floor(Math.random() * 3)
// //       ],
// //       target: `target-${(currentPage - 1) * perPage + i + 1}.com`,
// //       summary: `Summary for scan ${(currentPage - 1) * perPage + i + 1}`,
// //       date: new Date(
// //         Date.now() - Math.floor(Math.random() * 10000000000)
// //       ).toLocaleDateString(),
// //     }));

// //     setData(mockData);
// //     setTotalRows(100); // Mock total count
// //     setLoading(false);
// //   };

// //   const handlePageChange = (page) => {
// //     setCurrentPage(page);
// //   };

// //   const handlePerRowsChange = (newPerPage, page) => {
// //     setPerPage(newPerPage);
// //   };

// //   const addNewScan = () => {
// //     const newScan = {
// //       id: data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1,
// //       name: `Scan ${data.length + 1}`,
// //       status: "Pending",
// //       target: "example.com",
// //       summary: "Initial scan",
// //       date: new Date().toLocaleDateString(),
// //     };
// //     setData([newScan, ...data]);
// //     setTotalRows(totalRows + 1);
// //   };

// //   const applyFilters = () => {
// //     setCurrentPage(1);
// //     fetchData();
// //     setShowFilters(false);
// //   };

// //   const resetFilters = () => {
// //     setFilters({
// //       status: "",
// //       target: "",
// //       date: "",
// //     });
// //   };

// //   const columns = [
// //     {
// //       name: "Scans",
// //       selector: (row) => row.name,
// //       sortable: true,
// //     },
// //     {
// //       name: "Status",
// //       selector: (row) => row.status,
// //       sortable: true,
// //       cell: (row) => (
// //         <span
// //           className={`px-2 py-1 rounded-full text-xs
// //           ${
// //             row.status === "Complete"
// //               ? "bg-green-900 text-green-300"
// //               : row.status === "Pending"
// //               ? "bg-yellow-900 text-yellow-300"
// //               : "bg-blue-900 text-blue-300"
// //           }`}
// //         >
// //           {row.status}
// //         </span>
// //       ),
// //     },
// //     {
// //       name: "Target",
// //       selector: (row) => row.target,
// //       sortable: true,
// //     },
// //     {
// //       name: "Summary",
// //       selector: (row) => row.summary,
// //       sortable: true,
// //     },
// //     {
// //       name: "Date",
// //       selector: (row) => row.date,
// //       sortable: true,
// //     },
// //   ];

// //   const customStyles = {
// //     table: {
// //       style: {
// //         backgroundColor: "#00334d",
// //       },
// //     },
// //     header: {
// //       style: {
// //         backgroundColor: "#00334d",
// //         color: "white",
// //       },
// //     },
// //     subHeader: {
// //       style: {
// //         backgroundColor: "#00334d",
// //         color: "white",
// //         borderBottomColor: "#1e2a3a",
// //       },
// //     },
// //     headRow: {
// //       style: {
// //         backgroundColor: "#00334d",
// //         borderBottomColor: "#1e2a3a",
// //         color: "white",
// //       },
// //     },
// //     headCells: {
// //       style: {
// //         color: "#e0e0e0",
// //         fontSize: "14px",
// //         fontWeight: 500,
// //         paddingLeft: "16px",
// //         paddingRight: "16px",
// //       },
// //     },
// //     cells: {
// //       style: {
// //         color: "#e0e0e0",
// //         paddingLeft: "16px",
// //         paddingRight: "16px",
// //         backgroundColor: "#00334d",
// //       },
// //     },
// //     rows: {
// //       style: {
// //         backgroundColor: "#00334d",
// //         color: "white",
// //         borderBottomColor: "#1e2a3a",
// //         "&:hover": {
// //           backgroundColor: "#004466",
// //           cursor: "pointer",
// //         },
// //       },
// //     },
// //     pagination: {
// //       style: {
// //         backgroundColor: "#00334d",
// //         color: "white",
// //         borderTopColor: "#1e2a3a",
// //       },
// //       pageButtonsStyle: {
// //         color: "white",
// //         fill: "white",
// //       },
// //     },
// //     noData: {
// //       style: {
// //         backgroundColor: "#00334d",
// //         color: "white",
// //       },
// //     },
// //   };

// //   return (
// //     <div className="min-h-screen main-container bg-[#002233] text-white p-6">
// //       <div className="">
// //         <div className="mb-2">
// //           <h1 className="text-2xl font-semibold">Scans</h1>
// //           <p className="text-sm text-gray-300">
// //             Showing all scans from the current workspace.
// //           </p>
// //         </div>

// //         <div className="flex justify-between items-center mb-6">
// //           <Link to={`/new-scan`}>
// //             <button
// //               // onClick={addNewScan}
// //               className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
// //             >
// //               <Plus size={18} className="text-white" />
// //               <span className="text-white font-medium">New scan</span>
// //             </button>
// //           </Link>
// //           <button className="flex items-center gap-2 text-gray-300 hover:text-white">
// //             <PlayCircle size={18} />
// //             <span>How to generate a scan report</span>
// //           </button>
// //         </div>

// //         <div className="bg-[#00334d] rounded-lg shadow">
// //           {/* Tabs */}
// //           <div className="flex border-b border-gray-700">
// //             <button
// //               className={`px-6 py-3 font-medium ${
// //                 activeTab === "Scans"
// //                   ? "text-[#00cccc] border-b-2 border-[#00cccc]"
// //                   : "text-gray-300"
// //               }`}
// //               onClick={() => setActiveTab("Scans")}
// //             >
// //               Scans
// //             </button>
// //             <button
// //               className={`px-6 py-3 font-medium ${
// //                 activeTab === "Scheduled"
// //                   ? "text-[#00cccc] border-b-2 border-[#00cccc]"
// //                   : "text-gray-300"
// //               }`}
// //               onClick={() => setActiveTab("Scheduled")}
// //             >
// //               Scheduled
// //             </button>
// //           </div>

// //           {/* Filter/Action Bar */}
// //           <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
// //             <div></div>
// //             <div className="flex items-center gap-3">
// //               <span className="text-sm text-gray-300">
// //                 Filters{" "}
// //                 {Object.values(filters).some((f) => f !== "") ? "on" : "off"}
// //               </span>
// //               <button
// //                 className="p-1 hover:bg-gray-700 rounded"
// //                 onClick={() => setShowFilters(true)}
// //               >
// //                 <Filter size={18} className="text-gray-300" />
// //               </button>
// //               <button className="p-1 hover:bg-gray-700 rounded">
// //                 <MoreVertical size={18} className="text-gray-300" />
// //               </button>
// //             </div>
// //           </div>

// //           {/* DataTable */}
// //           <div>
// //             <DataTable
// //               columns={columns}
// //               data={data}
// //               progressPending={loading}
// //               pagination
// //               paginationServer
// //               paginationTotalRows={totalRows}
// //               onChangePage={handlePageChange}
// //               onChangeRowsPerPage={handlePerRowsChange}
// //               customStyles={customStyles}
// //               noDataComponent={
// //                 <div className="py-16 text-center">
// //                   <p className="text-gray-300 mb-4">
// //                     You don't have any scans yet.
// //                   </p>
// //                   <button
// //                     onClick={addNewScan}
// //                     className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md mx-auto"
// //                   >
// //                     <Plus size={18} className="text-white" />
// //                     <span className="text-white font-medium">New scan</span>
// //                   </button>
// //                 </div>
// //               }
// //               selectableRows
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Filter Offcanvas */}
// //       <div
// //         className={`fixed inset-y-0 right-0 w-80 bg-[#00334d] shadow-lg transform ${
// //           showFilters ? "translate-x-0" : "translate-x-full"
// //         } transition-transform duration-300 ease-in-out z-20`}
// //       >
// //         <div className="p-4">
// //           <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
// //             <h3 className="text-lg font-medium">Filters</h3>
// //             <button
// //               onClick={() => setShowFilters(false)}
// //               className="p-1 hover:bg-gray-700 rounded"
// //             >
// //               <X size={18} />
// //             </button>
// //           </div>

// //           <div className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-300 mb-1">
// //                 Status
// //               </label>
// //               <select
// //                 className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
// //                 value={filters.status}
// //                 onChange={(e) =>
// //                   setFilters({ ...filters, status: e.target.value })
// //                 }
// //               >
// //                 <option value="">All Statuses</option>
// //                 <option value="Pending">Pending</option>
// //                 <option value="In Progress">In Progress</option>
// //                 <option value="Complete">Complete</option>
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-300 mb-1">
// //                 Target
// //               </label>
// //               <input
// //                 type="text"
// //                 className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
// //                 placeholder="Filter by target"
// //                 value={filters.target}
// //                 onChange={(e) =>
// //                   setFilters({ ...filters, target: e.target.value })
// //                 }
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-300 mb-1">
// //                 Date
// //               </label>
// //               <input
// //                 type="date"
// //                 className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
// //                 value={filters.date}
// //                 onChange={(e) =>
// //                   setFilters({ ...filters, date: e.target.value })
// //                 }
// //               />
// //             </div>

// //             <div className="pt-4 flex space-x-3">
// //               <button
// //                 onClick={resetFilters}
// //                 className="px-4 py-2 border border-gray-600 rounded text-white hover:bg-gray-700"
// //               >
// //                 Reset
// //               </button>
// //               <button
// //                 onClick={applyFilters}
// //                 className="px-4 py-2 bg-[#00cccc] text-white rounded hover:bg-[#00aaaa]"
// //               >
// //                 Apply Filters
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Overlay when filter is open */}
// //       {showFilters && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-10"
// //           onClick={() => setShowFilters(false)}
// //         ></div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Scan;

// import React, { useState, useEffect } from "react";
// import {
//   Plus,
//   PlayCircle,
//   Filter,
//   MoreVertical,
//   ChevronDown,
//   X,
//   Clock,
//   Calendar,
//   Target,
//   AlertTriangle,
//   Info,
//   Shield,
//   RefreshCw,
//   Download,
//   Copy,
//   Trash2,
//   CheckCircle,
//   Circle,
//   Search,
//   Globe,
// } from "lucide-react";
// import DataTable from "react-data-table-component";
// import { Link } from "react-router-dom";

// const Scan = () => {
//   const [activeTab, setActiveTab] = useState("Scans");
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [totalRows, setTotalRows] = useState(0);
//   const [perPage, setPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [toggleCleared, setToggleCleared] = useState(false);
//   const [filters, setFilters] = useState({
//     status: "",
//     target: "",
//     date: "",
//     type: "",
//   });

//   useEffect(() => {
//     fetchData();
//   }, [currentPage, perPage, filters]);

//   const fetchData = () => {
//     setLoading(true);

//     // Simulated delay for API call
//     setTimeout(() => {
//       // Generate mock data with more realistic scan information
//       const scanTypes = [
//         "Network",
//         "Vulnerability",
//         "Asset Discovery",
//         "Web Application",
//         "Compliance",
//       ];
//       const statusOptions = ["Complete", "In Progress", "Pending", "Failed"];
//       const statusWeights = [0.4, 0.3, 0.2, 0.1]; // Probability distribution

//       const mockData = Array.from({ length: perPage }, (_, i) => {
//         // Generate weighted random status
//         const randValue = Math.random();
//         let statusIndex = 0;
//         let cumulativeWeight = 0;

//         for (let j = 0; j < statusWeights.length; j++) {
//           cumulativeWeight += statusWeights[j];
//           if (randValue <= cumulativeWeight) {
//             statusIndex = j;
//             break;
//           }
//         }

//         const status = statusOptions[statusIndex];
//         const type = scanTypes[Math.floor(Math.random() * scanTypes.length)];
//         const id = (currentPage - 1) * perPage + i + 1;

//         // Realistic mock targets
//         const domains = [
//           "api.example.com",
//           "admin.company.org",
//           "192.168.1.0/24",
//           "dev.internal-app.net",
//           "10.0.0.0/16",
//           "payment.service.io",
//           "auth.secure-portal.com",
//         ];

//         const target = domains[Math.floor(Math.random() * domains.length)];

//         // Create varying dates within the last 30 days
//         const date = new Date(
//           Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
//         );

//         // Generate realistic findings
//         const vulnCount =
//           status === "Complete" ? Math.floor(Math.random() * 20) : 0;
//         const criticalCount = Math.floor(vulnCount * 0.2);
//         const highCount = Math.floor(vulnCount * 0.3);
//         const mediumCount = Math.floor(vulnCount * 0.3);
//         const lowCount = vulnCount - criticalCount - highCount - mediumCount;

//         return {
//           id,
//           name: `${type} Scan #${id}`,
//           status,
//           type,
//           target,
//           summary:
//             status === "Complete"
//               ? `${vulnCount} findings (${criticalCount} critical, ${highCount} high)`
//               : status === "Failed"
//               ? "Error during scan execution"
//               : status === "In Progress"
//               ? `${Math.floor(Math.random() * 100)}% complete`
//               : "Awaiting execution",
//           date: date.toLocaleDateString(),
//           timestamp: date.getTime(),
//           duration:
//             status === "Complete"
//               ? `${Math.floor(Math.random() * 120) + 10} min`
//               : "-",
//           findings: {
//             critical: criticalCount,
//             high: highCount,
//             medium: mediumCount,
//             low: lowCount,
//             total: vulnCount,
//           },
//         };
//       });

//       // Apply filters if needed
//       let filteredData = [...mockData];

//       if (filters.status) {
//         filteredData = filteredData.filter(
//           (item) => item.status.toLowerCase() === filters.status.toLowerCase()
//         );
//       }

//       if (filters.target) {
//         filteredData = filteredData.filter((item) =>
//           item.target.toLowerCase().includes(filters.target.toLowerCase())
//         );
//       }

//       if (filters.date) {
//         const filterDate = new Date(filters.date).toLocaleDateString();
//         filteredData = filteredData.filter((item) => item.date === filterDate);
//       }

//       if (filters.type) {
//         filteredData = filteredData.filter(
//           (item) => item.type.toLowerCase() === filters.type.toLowerCase()
//         );
//       }

//       setData(filteredData);
//       setTotalRows(100); // Mock total count
//       setLoading(false);
//     }, 600);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handlePerRowsChange = (newPerPage, page) => {
//     setPerPage(newPerPage);
//   };

//   const handleRowSelected = (state) => {
//     setSelectedRows(state.selectedRows);
//   };

//   const addNewScan = () => {
//     const newScan = {
//       id: data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1,
//       name: `Network Scan #${data.length + 1}`,
//       status: "Pending",
//       type: "Network",
//       target: "192.168.1.0/24",
//       summary: "Awaiting execution",
//       date: new Date().toLocaleDateString(),
//       findings: {
//         critical: 0,
//         high: 0,
//         medium: 0,
//         low: 0,
//         total: 0,
//       },
//     };
//     setData([newScan, ...data]);
//     setTotalRows(totalRows + 1);
//   };

//   const applyFilters = () => {
//     setCurrentPage(1);
//     fetchData();
//     setShowFilters(false);
//   };

//   const resetFilters = () => {
//     setFilters({
//       status: "",
//       target: "",
//       date: "",
//       type: "",
//     });
//   };

//   const handleRowClicked = (row) => {
//     console.log("Selected:", row);
//     // Here you would typically navigate to a detail view
//     // history.push(`/scans/${row.id}`);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Complete":
//         return "bg-green-900 text-green-300";
//       case "Pending":
//         return "bg-yellow-900 text-yellow-300";
//       case "In Progress":
//         return "bg-blue-900 text-blue-300";
//       case "Failed":
//         return "bg-red-900 text-red-300";
//       default:
//         return "bg-gray-700 text-gray-300";
//     }
//   };

//   const getTypeIcon = (type) => {
//     switch (type) {
//       case "Network":
//         return <Globe className="h-4 w-4" />;
//       case "Vulnerability":
//         return <AlertTriangle className="h-4 w-4" />;
//       case "Asset Discovery":
//         return <Search className="h-4 w-4" />;
//       case "Web Application":
//         return <Globe className="h-4 w-4" />;
//       case "Compliance":
//         return <CheckCircle className="h-4 w-4" />;
//       default:
//         return <Info className="h-4 w-4" />;
//     }
//   };

//   const columns = [
//     {
//       name: "Scan Name",
//       selector: (row) => row.name,
//       sortable: true,
//       cell: (row) => (
//         <div className="py-2">
//           <div className="font-medium text-[#04D2D2]">{row.name}</div>
//           <div className="text-xs text-gray-400">
//             ID: {row.id.toString().padStart(6, "0")}
//           </div>
//         </div>
//       ),
//       grow: 2,
//     },
//     {
//       name: "Type",
//       selector: (row) => row.type,
//       sortable: true,
//       cell: (row) => (
//         <div className="flex items-center">
//           <span className="h-6 w-6 rounded-full bg-[#1A2335] flex items-center justify-center mr-2 text-[#04D2D2]">
//             {getTypeIcon(row.type)}
//           </span>
//           <span>{row.type}</span>
//         </div>
//       ),
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status,
//       sortable: true,
//       cell: (row) => (
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
//             row.status
//           )}`}
//         >
//           {row.status}
//         </span>
//       ),
//     },
//     {
//       name: "Target",
//       selector: (row) => row.target,
//       sortable: true,
//       cell: (row) => (
//         <div className="flex items-center">
//           <Target className="h-3 w-3 mr-2 text-gray-400" />
//           <span className="text-gray-300">{row.target}</span>
//         </div>
//       ),
//     },
//     {
//       name: "Findings",
//       selector: (row) => row.findings?.total || 0,
//       sortable: true,
//       cell: (row) => {
//         if (row.status !== "Complete") {
//           return <span className="text-gray-400">-</span>;
//         }

//         return (
//           <div className="flex items-center space-x-1">
//             {row.findings.critical > 0 && (
//               <span className="px-1.5 py-0.5 bg-red-900 text-red-300 text-xs rounded">
//                 {row.findings.critical}
//               </span>
//             )}
//             {row.findings.high > 0 && (
//               <span className="px-1.5 py-0.5 bg-orange-900 text-orange-300 text-xs rounded">
//                 {row.findings.high}
//               </span>
//             )}
//             {row.findings.medium > 0 && (
//               <span className="px-1.5 py-0.5 bg-yellow-900 text-yellow-300 text-xs rounded">
//                 {row.findings.medium}
//               </span>
//             )}
//             {row.findings.low > 0 && (
//               <span className="px-1.5 py-0.5 bg-green-900 text-green-300 text-xs rounded">
//                 {row.findings.low}
//               </span>
//             )}
//             {row.findings.total === 0 && (
//               <span className="px-1.5 py-0.5 bg-gray-700 text-gray-300 text-xs rounded">
//                 0
//               </span>
//             )}
//           </div>
//         );
//       },
//     },
//     {
//       name: "Date",
//       selector: (row) => row.timestamp,
//       sortable: true,
//       cell: (row) => (
//         <div className="flex flex-col">
//           <div className="flex items-center">
//             <Calendar className="h-3 w-3 mr-2 text-gray-400" />
//             <span>{row.date}</span>
//           </div>
//           {row.duration !== "-" && (
//             <div className="flex items-center text-xs text-gray-400 mt-1">
//               <Clock className="h-3 w-3 mr-2" />
//               {row.duration}
//             </div>
//           )}
//         </div>
//       ),
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex space-x-1">
//           <button className="p-1 hover:bg-[#1A2335] rounded text-gray-400 hover:text-[#04D2D2]">
//             <Info size={16} />
//           </button>
//           <button className="p-1 hover:bg-[#1A2335] rounded text-gray-400 hover:text-[#04D2D2]">
//             <Download size={16} />
//           </button>
//           <button className="p-1 hover:bg-[#1A2335] rounded text-gray-400 hover:text-[#04D2D2]">
//             <MoreVertical size={16} />
//           </button>
//         </div>
//       ),
//       button: true,
//     },
//   ];

//   const customStyles = {
//     table: {
//       style: {
//         backgroundColor: "#040C1F",
//       },
//     },
//     header: {
//       style: {
//         backgroundColor: "#040C1F",
//         color: "white",
//       },
//     },
//     subHeader: {
//       style: {
//         backgroundColor: "#040C1F",
//         color: "white",
//         borderBottomColor: "#1E293B",
//       },
//     },
//     headRow: {
//       style: {
//         backgroundColor: "#040C1F",
//         borderBottomColor: "#1E293B",
//         color: "white",
//       },
//     },
//     headCells: {
//       style: {
//         color: "#04D2D2",
//         fontSize: "14px",
//         fontWeight: 500,
//         paddingLeft: "16px",
//         paddingRight: "16px",
//       },
//     },
//     cells: {
//       style: {
//         color: "#e0e0e0",
//         paddingLeft: "16px",
//         paddingRight: "16px",
//         backgroundColor: "#040C1F",
//       },
//     },
//     rows: {
//       style: {
//         backgroundColor: "#040C1F",
//         color: "white",
//         borderBottomColor: "#1E293B",
//         "&:hover": {
//           backgroundColor: "#0a1935",
//           cursor: "pointer",
//         },
//       },
//       highlightOnHoverStyle: {
//         backgroundColor: "#0a1935",
//         borderBottomColor: "#1E293B",
//         outline: "1px solid #04D2D2",
//         color: "white",
//       },
//     },
//     pagination: {
//       style: {
//         backgroundColor: "#040C1F",
//         color: "white",
//         borderTopColor: "#1E293B",
//       },
//       pageButtonsStyle: {
//         color: "#04D2D2",
//         fill: "#04D2D2",
//         backgroundColor: "#040C1F",
//         "&:disabled": {
//           color: "#4C566A",
//           fill: "#4C566A",
//         },
//         "&:hover:not(:disabled)": {
//           backgroundColor: "#1A2335",
//         },
//         "&:focus": {
//           outline: "none",
//           backgroundColor: "#1A2335",
//         },
//       },
//     },
//     noData: {
//       style: {
//         backgroundColor: "#040C1F",
//         color: "white",
//       },
//     },
//     selectedHighlight: {
//       default: "#1A2335",
//       text: "white",
//     },
//   };

//   // Function components for better organization
//   const ScanActions = () => {
//     if (selectedRows.length === 0) {
//       return null;
//     }

//     return (
//       <div className="bg-[#1A2335] p-2 rounded-md flex items-center space-x-2 ml-4">
//         <span className="text-sm text-gray-300 mr-2">
//           {selectedRows.length} selected
//         </span>
//         <button className="p-1 hover:bg-[#04D2D2] hover:text-[#040C1F] rounded text-gray-300">
//           <RefreshCw size={16} />
//         </button>
//         <button className="p-1 hover:bg-[#04D2D2] hover:text-[#040C1F] rounded text-gray-300">
//           <Download size={16} />
//         </button>
//         <button className="p-1 hover:bg-[#04D2D2] hover:text-[#040C1F] rounded text-gray-300">
//           <Copy size={16} />
//         </button>
//         <button className="p-1 hover:bg-red-500 rounded text-gray-300">
//           <Trash2 size={16} />
//         </button>
//       </div>
//     );
//   };

//   const FilterIndicators = () => {
//     const activeFilters = Object.entries(filters).filter(
//       ([_, value]) => value !== ""
//     );

//     if (activeFilters.length === 0) {
//       return null;
//     }

//     return (
//       <div className="flex flex-wrap gap-2 mt-4 mb-2">
//         {activeFilters.map(([key, value]) => (
//           <div
//             key={key}
//             className="bg-[#1A2335] px-3 py-1 rounded-full flex items-center text-sm"
//           >
//             <span className="text-[#04D2D2] mr-1 font-medium capitalize">
//               {key}:
//             </span>
//             <span className="text-gray-300">{value}</span>
//             <button
//               className="ml-2 text-gray-400 hover:text-gray-200"
//               onClick={() => setFilters({ ...filters, [key]: "" })}
//             >
//               <X size={14} />
//             </button>
//           </div>
//         ))}
//         <button
//           className="text-[#04D2D2] text-sm hover:underline ml-2"
//           onClick={resetFilters}
//         >
//           Clear all
//         </button>
//       </div>
//     );
//   };

//   const GlobalSearch = () => {
//     return (
//       <div className="relative max-w-xs">
//         <input
//           type="text"
//           placeholder="Search scans..."
//           className="pl-10 pr-4 py-2 bg-[#1A2335] border border-[#1E293B] text-white rounded-md w-full focus:outline-none focus:border-[#04D2D2] focus:ring-1 focus:ring-[#04D2D2]"
//         />
//         <div className="absolute left-3 top-2.5 text-gray-400">
//           <Search size={16} />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen main-container bg-[#0E1427] text-white p-6">
//       <div className="">
//         <div className="mb-6">
//           <h1 className="text-2xl font-semibold text-[#04D2D2]">
//             Security Scans
//           </h1>
//           <p className="text-sm text-gray-300 mt-1">
//             Manage and monitor all security scans across your environment
//           </p>
//         </div>

//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center space-x-4">
//             <Link to={`/new-scan`}>
//               <button className="flex items-center gap-2 bg-[#04D2D2] text-[#040C1F] px-4 py-2 rounded-md hover:bg-[#03aeae] transition-colors duration-200 font-medium">
//                 <Plus size={18} />
//                 <span>New scan</span>
//               </button>
//             </Link>
//             <ScanActions />
//           </div>
//           <GlobalSearch />
//         </div>

//         <div className="bg-[#040C1F] rounded-lg shadow-md border border-[#1E293B] overflow-hidden">
//           {/* Tabs */}
//           <div className="flex border-b border-[#1E293B]">
//             <button
//               className={`px-6 py-3 font-medium ${
//                 activeTab === "Scans"
//                   ? "text-[#04D2D2] border-b-2 border-[#04D2D2]"
//                   : "text-gray-300 hover:text-gray-100"
//               }`}
//               onClick={() => setActiveTab("Scans")}
//             >
//               All Scans
//             </button>
//             <button
//               className={`px-6 py-3 font-medium ${
//                 activeTab === "Scheduled"
//                   ? "text-[#04D2D2] border-b-2 border-[#04D2D2]"
//                   : "text-gray-300 hover:text-gray-100"
//               }`}
//               onClick={() => setActiveTab("Scheduled")}
//             >
//               Scheduled
//             </button>
//             <button
//               className={`px-6 py-3 font-medium ${
//                 activeTab === "Recent"
//                   ? "text-[#04D2D2] border-b-2 border-[#04D2D2]"
//                   : "text-gray-300 hover:text-gray-100"
//               }`}
//               onClick={() => setActiveTab("Recent")}
//             >
//               Recent
//             </button>
//           </div>

//           {/* Filter/Action Bar */}
//           <div className="flex justify-between items-center px-4 py-3 border-b border-[#1E293B]">
//             <div className="flex items-center">
//               <span className="text-sm text-gray-400 mr-3">
//                 {totalRows} total scans
//               </span>

//               <div className="flex items-center space-x-2">
//                 <button className="px-3 py-1 text-xs bg-[#1A2335] text-gray-300 rounded-full hover:bg-[#253247]">
//                   All
//                 </button>
//                 <button className="px-3 py-1 text-xs bg-[#1A2335] text-gray-300 rounded-full hover:bg-[#253247]">
//                   Completed
//                 </button>
//                 <button className="px-3 py-1 text-xs bg-[#1A2335] text-gray-300 rounded-full hover:bg-[#253247]">
//                   In Progress
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-300">
//                 {Object.values(filters).some((f) => f !== "")
//                   ? `${
//                       Object.values(filters).filter((f) => f !== "").length
//                     } filters active`
//                   : "No filters"}
//               </span>
//               <button
//                 className="p-2 hover:bg-[#1A2335] rounded text-gray-300 hover:text-[#04D2D2]"
//                 onClick={() => setShowFilters(true)}
//               >
//                 <Filter size={18} />
//               </button>
//               <button className="p-2 hover:bg-[#1A2335] rounded text-gray-300 hover:text-[#04D2D2]">
//                 <RefreshCw size={18} onClick={fetchData} />
//               </button>
//             </div>
//           </div>

//           <FilterIndicators />

//           {/* DataTable */}
//           <div>
//             <DataTable
//               columns={columns}
//               data={data}
//               progressPending={loading}
//               progressComponent={
//                 <div className="py-8 flex justify-center items-center">
//                   <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#04D2D2]"></div>
//                 </div>
//               }
//               pagination
//               paginationServer
//               paginationTotalRows={totalRows}
//               onChangePage={handlePageChange}
//               onChangeRowsPerPage={handlePerRowsChange}
//               customStyles={customStyles}
//               noDataComponent={
//                 <div className="py-16 text-center">
//                   <Shield className="h-12 w-12 text-gray-500 mx-auto mb-4" />
//                   <p className="text-gray-300 mb-4">
//                     No scans found matching your criteria
//                   </p>
//                   <button
//                     onClick={addNewScan}
//                     className="flex items-center gap-2 bg-[#04D2D2] text-[#040C1F] px-4 py-2 rounded-md mx-auto hover:bg-[#03aeae] transition-colors duration-200"
//                   >
//                     <Plus size={18} />
//                     <span className="font-medium">Create New Scan</span>
//                   </button>
//                 </div>
//               }
//               selectableRows
//               onSelectedRowsChange={handleRowSelected}
//               clearSelectedRows={toggleCleared}
//               onRowClicked={handleRowClicked}
//               highlightOnHover
//               pointerOnHover
//             />
//           </div>
//         </div>

//         {/* Scan Activity Summary Cards */}
//         <div className="grid grid-cols-4 gap-4 mt-6">
//           <div className="bg-[#040C1F] p-4 rounded-lg border border-[#1E293B] flex items-center shadow-md transform transition-all duration-300 hover:shadow-[0px_0px_8px_#04D2D2] hover:border-[#04D2D2]">
//             <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
//               <CheckCircle size={20} />
//             </div>
//             <div>
//               <p className="text-xs text-gray-400 uppercase">Completed</p>
//               <p className="text-2xl font-semibold text-white">24</p>
//             </div>
//           </div>

//           <div className="bg-[#040C1F] p-4 rounded-lg border border-[#1E293B] flex items-center shadow-md transform transition-all duration-300 hover:shadow-[0px_0px_8px_#04D2D2] hover:border-[#04D2D2]">
//             <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
//               <RefreshCw size={20} />
//             </div>
//             <div>
//               <p className="text-xs text-gray-400 uppercase">In Progress</p>
//               <p className="text-2xl font-semibold text-white">3</p>
//             </div>
//           </div>

//           <div className="bg-[#040C1F] p-4 rounded-lg border border-[#1E293B] flex items-center shadow-md transform transition-all duration-300 hover:shadow-[0px_0px_8px_#04D2D2] hover:border-[#04D2D2]">
//             <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-4">
//               <Clock size={20} />
//             </div>
//             <div>
//               <p className="text-xs text-gray-400 uppercase">Scheduled</p>
//               <p className="text-2xl font-semibold text-white">12</p>
//             </div>
//           </div>

//           <div className="bg-[#040C1F] p-4 rounded-lg border border-[#1E293B] flex items-center shadow-md transform transition-all duration-300 hover:shadow-[0px_0px_8px_#04D2D2] hover:border-[#04D2D2]">
//             <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
//               <AlertTriangle size={20} />
//             </div>
//             <div>
//               <p className="text-xs text-gray-400 uppercase">
//                 Critical Findings
//               </p>
//               <p className="text-2xl font-semibold text-white">7</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filter Sidebar */}
//       <div
//         className={`fixed inset-y-0 right-0 w-80 bg-[#040C1F] shadow-lg transform ${
//           showFilters ? "translate-x-0" : "translate-x-full"
//         } transition-transform duration-300 ease-in-out z-20 border-l border-[#1E293B]`}
//       >
//         <div className="p-5">
//           <div className="flex justify-between items-center border-b border-[#1E293B] pb-4 mb-5">
//             <h3 className="text-lg font-medium text-[#04D2D2]">Filter Scans</h3>
//             <button
//               onClick={() => setShowFilters(false)}
//               className="p-1 hover:bg-[#1A2335] rounded text-gray-300 hover:text-white"
//             >
//               <X size={18} />
//             </button>
//           </div>

//           <div className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Status
//               </label>
//               <select
//                 className="w-full bg-[#1A2335] border border-[#1E293B] rounded px-3 py-2 text-white focus:outline-none focus:border-[#04D2D2]"
//                 value={filters.status}
//                 onChange={(e) =>
//                   setFilters({ ...filters, status: e.target.value })
//                 }
//               >
//                 <option value="">All Statuses</option>
//                 <option value="Pending">Pending</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Complete">Complete</option>
//                 <option value="Failed">Failed</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Scan Type
//               </label>
//               <select
//                 className="w-full bg-[#1A2335] border border-[#1E293B] rounded px-3 py-2 text-white focus:outline-none focus:border-[#04D2D2]"
//                 value={filters.type}
//                 onChange={(e) =>
//                   setFilters({ ...filters, type: e.target.value })
//                 }
//               >
//                 <option value="">All Types</option>
//                 <option value="Network">Network</option>
//                 <option value="Vulnerability">Vulnerability</option>
//                 <option value="Asset Discovery">Asset Discovery</option>
//                 <option value="Web Application">Web Application</option>
//                 <option value="Compliance">Compliance</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Target
//               </label>
//               <input
//                 type="text"
//                 className="w-full bg-[#1A2335] border border-[#1E293B] rounded px-3 py-2 text-white focus:outline-none focus:border-[#04D2D2]"
//                 placeholder="Enter target domain or IP"
//                 value={filters.target}
//                 onChange={(e) =>
//                   setFilters({ ...filters, target: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 className="w-full bg-[#1A2335] border border-[#1E293B] rounded px-3 py-2 text-white focus:outline-none focus:border-[#04D2D2]"
//                 value={filters.date}
//                 onChange={(e) =>
//                   setFilters({ ...filters, date: e.target.value })
//                 }
//               />
//             </div>

//             <div className="flex items-center pt-4 space-x-3">
//               <button
//                 onClick={applyFilters}
//                 className="flex-1 bg-[#04D2D2] hover:bg-[#03aeae] text-[#040C1F] font-medium py-2 px-4 rounded-md transition-colors duration-200"
//               >
//                 Apply Filters
//               </button>
//               <button
//                 onClick={resetFilters}
//                 className="flex-1 bg-[#1A2335] hover:bg-[#253247] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
//               >
//                 Reset
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Scan;

import React, { useState, useEffect } from "react";
import PageTitle from "../../components/PageTitle"
import {
  Plus,
  PlayCircle,
  Filter,
  MoreVertical,
  ChevronDown,
  X,
  Clock,
  Calendar,
  Target,
  AlertTriangle,
  Info,
  Shield,
  RefreshCw,
  Download,
  Copy,
  Trash2,
  CheckCircle,
  Circle,
  Search,
  Globe,
} from "lucide-react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const Scan = () => {
  const [activeTab, setActiveTab] = useState("Scans");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    target: "",
    date: "",
    type: "",
  });

  useEffect(() => {
    fetchData();
  }, [currentPage, perPage, filters, activeTab]);

  const fetchData = () => {
    setLoading(true);

    // Simulated delay for API call
    setTimeout(() => {
      // Generate mock data with more realistic scan information
      const scanTypes = [
        "Network",
        "Vulnerability",
        "Asset Discovery",
        "Web Application",
        "Compliance",
      ];
      const statusOptions = ["Complete", "In Progress", "Pending", "Failed"];
      const statusWeights = [0.4, 0.3, 0.2, 0.1]; // Probability distribution

      const mockData = Array.from({ length: perPage }, (_, i) => {
        // Generate weighted random status
        const randValue = Math.random();
        let statusIndex = 0;
        let cumulativeWeight = 0;

        for (let j = 0; j < statusWeights.length; j++) {
          cumulativeWeight += statusWeights[j];
          if (randValue <= cumulativeWeight) {
            statusIndex = j;
            break;
          }
        }

        const status = statusOptions[statusIndex];
        const type = scanTypes[Math.floor(Math.random() * scanTypes.length)];
        const id = (currentPage - 1) * perPage + i + 1;

        // Realistic mock targets
        const domains = [
          "api.example.com",
          "admin.company.org",
          "192.168.1.0/24",
          "dev.internal-app.net",
          "10.0.0.0/16",
          "payment.service.io",
          "auth.secure-portal.com",
        ];

        const target = domains[Math.floor(Math.random() * domains.length)];

        // Create varying dates within the last 30 days
        const date = new Date(
          Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
        );

        // Generate realistic findings
        const vulnCount =
          status === "Complete" ? Math.floor(Math.random() * 20) : 0;
        const criticalCount = Math.floor(vulnCount * 0.2);
        const highCount = Math.floor(vulnCount * 0.3);
        const mediumCount = Math.floor(vulnCount * 0.3);
        const lowCount = vulnCount - criticalCount - highCount - mediumCount;

        return {
          id,
          name: `${type} Scan #${id}`,
          status,
          type,
          target,
          summary:
            status === "Complete"
              ? `${vulnCount} findings (${criticalCount} critical, ${highCount} high)`
              : status === "Failed"
              ? "Error during scan execution"
              : status === "In Progress"
              ? `${Math.floor(Math.random() * 100)}% complete`
              : "Awaiting execution",
          date: date.toLocaleDateString(),
          timestamp: date.getTime(),
          duration:
            status === "Complete"
              ? `${Math.floor(Math.random() * 120) + 10} min`
              : "-",
          findings: {
            critical: criticalCount,
            high: highCount,
            medium: mediumCount,
            low: lowCount,
            total: vulnCount,
          },
        };
      });

      // Apply filters if needed
      let filteredData = [...mockData];

      if (filters.status) {
        filteredData = filteredData.filter(
          (item) => item.status.toLowerCase() === filters.status.toLowerCase()
        );
      }

      if (filters.target) {
        filteredData = filteredData.filter((item) =>
          item.target.toLowerCase().includes(filters.target.toLowerCase())
        );
      }

      if (filters.date) {
        const filterDate = new Date(filters.date).toLocaleDateString();
        filteredData = filteredData.filter((item) => item.date === filterDate);
      }

      if (filters.type) {
        filteredData = filteredData.filter(
          (item) => item.type.toLowerCase() === filters.type.toLowerCase()
        );
      }

      // Filter by tab
      if (activeTab === "Recent") {
        // Show only last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        filteredData = filteredData.filter(
          (item) => new Date(item.timestamp) >= sevenDaysAgo
        );
      } else if (activeTab === "Scheduled") {
        // Show only pending scans
        filteredData = filteredData.filter((item) => item.status === "Pending");
      }

      setData(filteredData);
      setTotalRows(100); // Mock total count
      setLoading(false);
    }, 600);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const clearSelectedRows = () => {
    setToggleCleared(!toggleCleared);
    setSelectedRows([]);
  };

  const addNewScan = () => {
    const newScan = {
      id: data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1,
      name: `Network Scan #${data.length + 1}`,
      status: "Pending",
      type: "Network",
      target: "192.168.1.0/24",
      summary: "Awaiting execution",
      date: new Date().toLocaleDateString(),
      timestamp: Date.now(),
      findings: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        total: 0,
      },
    };
    setData([newScan, ...data]);
    setTotalRows(totalRows + 1);
  };

  const applyFilters = () => {
    setCurrentPage(1);
    fetchData();
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      target: "",
      date: "",
      type: "",
    });
  };

  const handleRowClicked = (row) => {
    console.log("Selected:", row);
    // Here you would typically navigate to a detail view
    // history.push(`/scans/${row.id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "bg-green-900 text-green-300";
      case "Pending":
        return "bg-yellow-900 text-yellow-300";
      case "In Progress":
        return "bg-blue-900 text-blue-300";
      case "Failed":
        return "bg-red-900 text-red-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Network":
        return <Globe className="h-4 w-4" />;
      case "Vulnerability":
        return <AlertTriangle className="h-4 w-4" />;
      case "Asset Discovery":
        return <Search className="h-4 w-4" />;
      case "Web Application":
        return <Globe className="h-4 w-4" />;
      case "Compliance":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const columns = [
    {
      name: "Scan Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="py-2">
          <div className="font-medium text-[#04D2D2]">{row.name}</div>
          <div className="text-xs text-gray-400">
            ID: {row.id.toString().padStart(6, "0")}
          </div>
        </div>
      ),
      grow: 2,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center">
          <span className="h-6 w-6 rounded-full bg-[#1A2335] flex items-center justify-center mr-2 text-[#04D2D2]">
            {getTypeIcon(row.type)}
          </span>
          <span>{row.type}</span>
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            row.status
          )}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Target",
      selector: (row) => row.target,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center">
          <Target className="h-3 w-3 mr-2 text-gray-400" />
          <span className="text-gray-300">{row.target}</span>
        </div>
      ),
    },
    {
      name: "Findings",
      selector: (row) => row.findings?.total || 0,
      sortable: true,
      cell: (row) => {
        if (row.status !== "Complete") {
          return <span className="text-gray-400">-</span>;
        }

        return (
          <div className="flex items-center space-x-1">
            {row.findings.critical > 0 && (
              <span className="px-1.5 py-0.5 bg-red-900 text-red-300 text-xs rounded">
                {row.findings.critical}
              </span>
            )}
            {row.findings.high > 0 && (
              <span className="px-1.5 py-0.5 bg-orange-900 text-orange-300 text-xs rounded">
                {row.findings.high}
              </span>
            )}
            {row.findings.medium > 0 && (
              <span className="px-1.5 py-0.5 bg-yellow-900 text-yellow-300 text-xs rounded">
                {row.findings.medium}
              </span>
            )}
            {row.findings.low > 0 && (
              <span className="px-1.5 py-0.5 bg-green-900 text-green-300 text-xs rounded">
                {row.findings.low}
              </span>
            )}
            {row.findings.total === 0 && (
              <span className="px-1.5 py-0.5 bg-gray-700 text-gray-300 text-xs rounded">
                0
              </span>
            )}
          </div>
        );
      },
    },
    {
      name: "Date",
      selector: (row) => row.timestamp,
      sortable: true,
      cell: (row) => (
        <div className="flex flex-col">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-2 text-gray-400" />
            <span>{row.date}</span>
          </div>
          {row.duration !== "-" && (
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <Clock className="h-3 w-3 mr-2" />
              {row.duration}
            </div>
          )}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-1">
          <button
            className="p-1 hover:bg-[#1A2335] rounded text-gray-400 hover:text-[#04D2D2]"
            onClick={(e) => {
              e.stopPropagation();
              console.log("View details:", row.id);
            }}
          >
            <Info size={16} />
          </button>
          <button
            className="p-1 hover:bg-[#1A2335] rounded text-gray-400 hover:text-[#04D2D2]"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Download report:", row.id);
            }}
          >
            <Download size={16} />
          </button>
          <button
            className="p-1 hover:bg-[#1A2335] rounded text-gray-400 hover:text-[#04D2D2]"
            onClick={(e) => {
              e.stopPropagation();
              console.log("More options:", row.id);
            }}
          >
            <MoreVertical size={16} />
          </button>
        </div>
      ),
      button: true,
      ignoreRowClick: true,
    },
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: "#040C1F",
      },
    },
    header: {
      style: {
        backgroundColor: "#040C1F",
        color: "white",
      },
    },
    subHeader: {
      style: {
        backgroundColor: "#040C1F",
        color: "white",
        borderBottomColor: "#1E293B",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#040C1F",
        borderBottomColor: "#1E293B",
        color: "white",
      },
    },
    headCells: {
      style: {
        color: "#04D2D2",
        fontSize: "14px",
        fontWeight: 500,
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        color: "#e0e0e0",
        paddingLeft: "16px",
        paddingRight: "16px",
        backgroundColor: "#040C1F",
      },
    },
    rows: {
      style: {
        backgroundColor: "#040C1F",
        color: "white",
        borderBottomColor: "#1E293B",
        "&:hover": {
          backgroundColor: "#0a1935",
          cursor: "pointer",
        },
      },
      highlightOnHoverStyle: {
        backgroundColor: "#0a1935",
        borderBottomColor: "#1E293B",
        outline: "1px solid #04D2D2",
        color: "white",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#040C1F",
        color: "white",
        borderTopColor: "#1E293B",
      },
      pageButtonsStyle: {
        color: "#04D2D2",
        fill: "#04D2D2",
        backgroundColor: "#040C1F",
        "&:disabled": {
          color: "#4C566A",
          fill: "#4C566A",
        },
        "&:hover:not(:disabled)": {
          backgroundColor: "#1A2335",
        },
        "&:focus": {
          outline: "none",
          backgroundColor: "#1A2335",
        },
      },
    },
    noData: {
      style: {
        backgroundColor: "#040C1F",
        color: "white",
      },
    },
    selectedHighlight: {
      default: "#1A2335",
      text: "white",
    },
  };

  // Function components for better organization
  const ScanActions = () => {
    if (selectedRows.length === 0) {
      return null;
    }

    return (
      <div className="bg-[#1A2335] p-2 rounded-md flex items-center space-x-2 ml-4">
        <span className="text-sm text-gray-300 mr-2">
          {selectedRows.length} selected
        </span>
        <button
          className="p-1 hover:bg-[#04D2D2] hover:text-[#040C1F] rounded text-gray-300"
          onClick={() => {
            console.log("Refresh selected scans:", selectedRows);
          }}
        >
          <RefreshCw size={16} />
        </button>
        <button
          className="p-1 hover:bg-[#04D2D2] hover:text-[#040C1F] rounded text-gray-300"
          onClick={() => {
            console.log("Download selected scans:", selectedRows);
          }}
        >
          <Download size={16} />
        </button>
        <button
          className="p-1 hover:bg-[#04D2D2] hover:text-[#040C1F] rounded text-gray-300"
          onClick={() => {
            console.log("Copy selected scans:", selectedRows);
          }}
        >
          <Copy size={16} />
        </button>
        <button
          className="p-1 hover:bg-red-500 rounded text-gray-300"
          onClick={() => {
            console.log("Delete selected scans:", selectedRows);
            clearSelectedRows();
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
    );
  };

  const FilterIndicators = () => {
    const activeFilters = Object.entries(filters).filter(
      ([_, value]) => value !== ""
    );

    if (activeFilters.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-wrap gap-2 mt-4 mb-2 px-4">
        {activeFilters.map(([key, value]) => (
          <div
            key={key}
            className="bg-[#1A2335] px-3 py-1 rounded-full flex items-center text-sm"
          >
            <span className="text-[#04D2D2] mr-1 font-medium capitalize">
              {key}:
            </span>
            <span className="text-gray-300">{value}</span>
            <button
              className="ml-2 text-gray-400 hover:text-gray-200"
              onClick={() => setFilters({ ...filters, [key]: "" })}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button
          className="text-[#04D2D2] text-sm hover:underline ml-2"
          onClick={resetFilters}
        >
          Clear all
        </button>
      </div>
    );
  };

  const GlobalSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
      if (e.key === "Enter") {
        console.log("Searching for:", searchTerm);
        // In a real app, you'd apply the search filter here
      }
    };

    return (
      <div className="relative max-w-xs">
        <input
          type="text"
          placeholder="Search scans..."
          className="pl-10 pr-4 py-2 bg-[#1A2335] border border-[#1E293B] text-white rounded-md w-full focus:outline-none focus:border-[#04D2D2] focus:ring-1 focus:ring-[#04D2D2]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <Search size={16} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen main-container bg-[#0E1427] text-white p-6">
      <div className="">
        <PageTitle title="Scans" desc="Manage and monitor all security scans across your environment" />
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Link to={`/new-scan`}>
              <button className="flex items-center gap-2 bg-[#04D2D2] text-[#040C1F] px-4 py-2 rounded-md hover:bg-[#03aeae] transition-colors duration-200 font-medium">
                <Plus size={18} />
                <span>New scan</span>
              </button>
            </Link>
            <ScanActions />
          </div>
          <GlobalSearch />
        </div>

        <div className="bg-[#040C1F] rounded-lg shadow-md border border-[#1E293B] overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#1E293B]">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "Scans"
                  ? "text-[#04D2D2] border-b-2 border-[#04D2D2]"
                  : "text-gray-300 hover:text-gray-100"
              }`}
              onClick={() => setActiveTab("Scans")}
            >
              All Scans
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "Scheduled"
                  ? "text-[#04D2D2] border-b-2 border-[#04D2D2]"
                  : "text-gray-300 hover:text-gray-100"
              }`}
              onClick={() => setActiveTab("Scheduled")}
            >
              Scheduled
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "Recent"
                  ? "text-[#04D2D2] border-b-2 border-[#04D2D2]"
                  : "text-gray-300 hover:text-gray-100"
              }`}
              onClick={() => setActiveTab("Recent")}
            >
              Recent
            </button>
          </div>

          {/* Filter/Action Bar */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-[#1E293B]">
            <div className="flex items-center">
              <span className="text-sm text-gray-400 mr-3">
                {totalRows} total scans
              </span>

              <div className="flex items-center space-x-2">
                <button
                  className={`px-3 py-1 text-xs ${
                    filters.status === ""
                      ? "bg-[#04D2D2] text-[#040C1F]"
                      : "bg-[#1A2335] text-gray-300 hover:bg-[#253247]"
                  } rounded-full`}
                  onClick={() => setFilters({ ...filters, status: "" })}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 text-xs ${
                    filters.status === "Complete"
                      ? "bg-[#04D2D2] text-[#040C1F]"
                      : "bg-[#1A2335] text-gray-300 hover:bg-[#253247]"
                  } rounded-full`}
                  onClick={() => setFilters({ ...filters, status: "Complete" })}
                >
                  Completed
                </button>
                <button
                  className={`px-3 py-1 text-xs ${
                    filters.status === "In Progress"
                      ? "bg-[#04D2D2] text-[#040C1F]"
                      : "bg-[#1A2335] text-gray-300 hover:bg-[#253247]"
                  } rounded-full`}
                  onClick={() =>
                    setFilters({ ...filters, status: "In Progress" })
                  }
                >
                  In Progress
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300">
                {Object.values(filters).some((f) => f !== "")
                  ? `${
                      Object.values(filters).filter((f) => f !== "").length
                    } filters active`
                  : "No filters"}
              </span>
              <button
                className="p-2 hover:bg-[#1A2335] rounded text-gray-300 hover:text-[#04D2D2]"
                onClick={() => setShowFilters(true)}
              >
                <Filter size={18} />
              </button>
              <button
                className="p-2 hover:bg-[#1A2335] rounded text-gray-300 hover:text-[#04D2D2]"
                onClick={fetchData}
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          <FilterIndicators />

          {/* DataTable */}
          <div>
            <DataTable
              columns={columns}
              data={data}
              progressPending={loading}
              progressComponent={
                <div className="py-8 flex justify-center w-full bg-[#040C1F] items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#04D2D2]"></div>
                </div>
              }
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              customStyles={customStyles}
              noDataComponent={
                <div className="py-16 text-center">
                  <Shield className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-300 mb-4">
                    No scans found matching your criteria
                  </p>
                  <button
                    onClick={addNewScan}
                    className="flex items-center gap-2 bg-[#04D2D2] text-[#040C1F] px-4 py-2 rounded-md mx-auto hover:bg-[#03aeae] transition-colors duration-200"
                  >
                    <Plus size={18} />
                    <span className="font-medium">Create New Scan</span>
                  </button>
                </div>
              }
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
              onRowClicked={handleRowClicked}
              highlightOnHover
              pointerOnHover
            />
          </div>
        </div>

        {/* Scan Activity Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#040C1F] p-4 rounded-lg border border-[#1E293B] flex items-center shadow-md transform transition-all duration-300 hover:shadow-lg hover:border-[#04D2D2]">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Completed</p>
              <p className="text-2xl font-semibold text-white">24</p>
            </div>
          </div>

          <div className="bg-[#040C1F] p-4 rounded-lg border border-[#1E293B] flex items-center shadow-md transform transition-all duration-300 hover:shadow-lg hover:border-[#04D2D2]">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
              <RefreshCw size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">In Progress</p>
              <p className="text-2xl font-semibold text-white">3</p>
            </div>
          </div>

          <div className="bg-[#040C1F] p-4 rounded-lg border border-[#1E293B] flex items-center shadow-md transform transition-all duration-300 hover:shadow-lg hover:border-[#04D2D2]">
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-4">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Scheduled</p>
              <p className="text-2xl font-semibold text-white">12</p>
            </div>
          </div>

          <div className="bg-[#040C1F] p-4 rounded-lg border border-[#1E293B] flex items-center shadow-md transform transition-all duration-300 hover:shadow-[0px_0px_8px_#04D2D2] hover:border-[#04D2D2]">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">
                Critical Findings
              </p>
              <p className="text-2xl font-semibold text-white">7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      <div
        className={`fixed z-1000 inset-y-0 right-0 w-80 bg-[#040C1F] shadow-lg transform ${
          showFilters ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-20 border-l border-[#1E293B]`}
      >
        <div className="p-5">
          <div className="flex justify-between items-center border-b border-[#1E293B] pb-4 mb-5">
            <h3 className="text-lg font-medium text-[#04D2D2]">Filter Scans</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-1 hover:bg-[#1A2335] rounded text-gray-300 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                className="w-full bg-[#1A2335] border border-[#1E293B] rounded px-3 py-2 text-white focus:outline-none focus:border-[#04D2D2]"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Scan Type
              </label>
              <select
                className="w-full bg-[#1A2335] border border-[#1E293B] rounded px-3 py-2 text-white focus:outline-none focus:border-[#04D2D2]"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="">All Types</option>
                <option value="Network">Network</option>
                <option value="Vulnerability">Vulnerability</option>
                <option value="Asset Discovery">Asset Discovery</option>
                <option value="Web Application">Web Application</option>
                <option value="Compliance">Compliance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target
              </label>
              <input
                type="text"
                className="w-full bg-[#1A2335] border border-[#1E293B] rounded px-3 py-2 text-white focus:outline-none focus:border-[#04D2D2]"
                placeholder="Enter target domain or IP"
                value={filters.target}
                onChange={(e) =>
                  setFilters({ ...filters, target: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full bg-[#1A2335] border border-[#1E293B] rounded px-3 py-2 text-white focus:outline-none focus:border-[#04D2D2]"
                value={filters.date}
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />
            </div>

            <div className="flex items-center pt-4 space-x-3">
              <button
                onClick={applyFilters}
                className="flex-1 bg-[#04D2D2] hover:bg-[#03aeae] text-[#040C1F] font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="flex-1 bg-[#1A2335] hover:bg-[#253247] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
