// import React, { useState } from "react";
// import PlanDetails from "../../components/Account/PlanDetails";

// const Account = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "Kaif Shah",
//     email: "kaifsh011@gmail.com",
//     company: "",
//     size: "",
//     jobRole: "",
//     country: "India",
//     timeZone: "UTC+0530",
//     scanDeletion: "Never delete",
//   });

//   const [avatar, setAvatar] = useState("KS");
//   const [avatarColor, setAvatarColor] = useState("bg-red-200 text-red-500");
//   const [showAvatarModal, setShowAvatarModal] = useState(false);

//   const avatarColors = [
//     "bg-red-200 text-red-500",
//     "bg-blue-200 text-blue-500",
//     "bg-green-200 text-green-500",
//     "bg-purple-200 text-purple-500",
//     "bg-yellow-200 text-yellow-500",
//     "bg-pink-200 text-pink-500",
//   ];

//   const tabs = [
//     {
//       id: "user-settings",
//       label: "User settings",
//       icon: "⚙️",
//       subtabs: [{ id: "overview", label: "Overview" }],
//     },
//     {
//       id: "plan-details",
//       label: "Plan details & billing",
//       icon: "📄",
//       subtabs: [
//         { id: "active-plan", label: "Active plan" },
//         { id: "invoices", label: "Invoices & billing" },
//         { id: "scanned-assets", label: "Scanned assets" },
//         { id: "scan-history", label: "Scan history" },
//       ],
//     },
//     {
//       id: "security",
//       label: "Security",
//       icon: "🔒",
//       subtabs: [
//         { id: "general", label: "General" },
//         { id: "login-history", label: "Login history" },
//       ],
//     },
//     {
//       id: "api",
//       label: "API",
//       icon: "📱",
//       subtabs: [{ id: "rest-api", label: "REST API" }],
//     },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({
//       ...userData,
//       [name]: value,
//     });
//   };

//   const handleSaveProfile = () => {
//     setIsEditing(false);
//   };

//   const changeAvatar = (color) => {
//     setAvatarColor(color);
//     setShowAvatarModal(false);
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "overview":
//         return (
//           <div>
//             {/* Profile section */}
//             <div className="flex justify-between items-start mb-8">
//               <div>
//                 {isEditing ? (
//                   <div className="space-y-3">
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">
//                         Name
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={userData.name}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm text-gray-600 mb-1">
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={userData.email}
//                         onChange={handleInputChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <h2 className="text-lg font-medium text-gray-800">
//                       {userData.name}
//                     </h2>
//                     <p className="text-gray-500 text-sm">{userData.email}</p>
//                   </>
//                 )}
//               </div>
//               <div className="flex items-center">
//                 {/* Profile avatar */}
//                 <div
//                   className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center font-medium cursor-pointer`}
//                   onClick={() => !isEditing && setShowAvatarModal(true)}
//                 >
//                   {avatar}
//                 </div>
//               </div>
//             </div>

//             <div className="mb-3">
//               {isEditing ? (
//                 <div className="flex space-x-2">
//                   <button
//                     className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
//                     onClick={handleSaveProfile}
//                   >
//                     Save changes
//                   </button>
//                   <button
//                     className="px-3 py-1.5 border border-gray-300 text-gray-600 text-sm font-medium rounded hover:bg-gray-100 transition"
//                     onClick={() => setIsEditing(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <button
//                     className="px-3 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-medium rounded hover:bg-yellow-200 transition"
//                     onClick={() => setIsEditing(true)}
//                   >
//                     Edit profile
//                   </button>
//                   <button
//                     className="px-3 py-1.5 text-gray-500 text-sm font-medium rounded hover:bg-gray-100 transition ml-2"
//                     onClick={() => setShowAvatarModal(true)}
//                   >
//                     Change avatar
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Company details section */}
//             <div className="mt-8 border-t border-gray-200 pt-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-md font-medium text-gray-800">
//                   Company details
//                 </h3>
//                 <button className="text-sm text-gray-600 hover:text-gray-900">
//                   Edit
//                 </button>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Company</p>
//                   <p className="text-sm text-gray-800">
//                     {userData.company || "-"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Size</p>
//                   <p className="text-sm text-gray-800">
//                     {userData.size || "-"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Job role</p>
//                   <p className="text-sm text-gray-800">
//                     {userData.jobRole || "-"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Location section */}
//             <div className="mt-8 border-t border-gray-200 pt-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-md font-medium text-gray-800">Location</h3>
//                 <button className="text-sm text-gray-600 hover:text-gray-900">
//                   Edit
//                 </button>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Country</p>
//                   <p className="text-sm text-gray-800">{userData.country}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Time zone</p>
//                   <p className="text-sm text-gray-800">{userData.timeZone}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Scans deletion section */}
//             <div className="mt-8 border-t border-gray-200 pt-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-md font-medium text-gray-800">
//                   Scans deletion
//                 </h3>
//                 <button className="text-sm text-gray-600 hover:text-gray-900">
//                   Edit
//                 </button>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Scans deletion</p>
//                 <p className="text-sm text-gray-800">{userData.scanDeletion}</p>
//               </div>
//             </div>
//           </div>
//         );

//       case "active-plan":
//         return <PlanDetails />;

//       case "invoices":
//         return (
//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-4">Invoices & Billing</h2>
//             <div className="border border-gray-200 rounded-lg overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Invoice
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Amount
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   <tr>
//                     <td
//                       colSpan="4"
//                       className="px-6 py-4 text-center text-sm text-gray-500"
//                     >
//                       No invoices available
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );

//       case "scanned-assets":
//         return (
//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-4">Scanned Assets</h2>
//             <div className="text-sm text-gray-500">No scanned assets found</div>
//           </div>
//         );

//       case "scan-history":
//         return (
//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-4">Scan History</h2>
//             <div className="text-sm text-gray-500">
//               No scan history available
//             </div>
//           </div>
//         );

//       case "general":
//         return (
//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
//             <div className="space-y-6">
//               <div>
//                 <h3 className="font-medium mb-2">Password</h3>
//                 <button className="px-3 py-1.5 border border-gray-300 text-gray-600 text-sm font-medium rounded hover:bg-gray-100 transition">
//                   Change password
//                 </button>
//               </div>

//               <div>
//                 <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
//                 <p className="text-sm text-gray-600 mb-2">
//                   Add an extra layer of security to your account
//                 </p>
//                 <button className="px-3 py-1.5 border border-gray-300 text-gray-600 text-sm font-medium rounded hover:bg-gray-100 transition">
//                   Enable 2FA
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       case "login-history":
//         return (
//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-4">Login History</h2>
//             <div className="border border-gray-200 rounded-lg overflow-hidden">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date & Time
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       IP Address
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Device
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Location
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   <tr>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       Mar 16, 2025 10:30 AM
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       192.168.1.1
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       Chrome / Windows
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       Mumbai, India
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );

//       case "rest-api":
//         return (
//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-4">API Keys</h2>
//             <p className="text-sm text-gray-600 mb-4">
//               Manage your API keys to integrate with our services
//             </p>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
//               Generate API Key
//             </button>
//             <div className="mt-6">
//               <div className="text-sm text-gray-500">No API keys found</div>
//             </div>
//           </div>
//         );

//       default:
//         return (
//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-4">
//               Select a tab from the sidebar
//             </h2>
//             <p className="text-sm text-gray-600">
//               Choose an option from the left sidebar to view its contents.
//             </p>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <div className="bg-white shadow-sm border-b border-gray-200">
//         <div className="container mx-auto px-4 py-3">
//           <h1 className="text-xl font-semibold text-gray-800">My account</h1>
//         </div>
//       </div>

//       <div className="flex flex-1 container mx-auto mt-6 px-4">
//         {/* Left sidebar with tabs */}
//         <div className="w-64 border-r border-gray-200 pr-4">
//           {tabs.map((tab) => (
//             <div key={tab.id} className="mb-4">
//               <div className="flex items-center text-gray-600 font-medium mb-2">
//                 <span className="mr-2">{tab.icon}</span>
//                 <span>{tab.label}</span>
//               </div>
//               <div className="ml-7">
//                 {tab.subtabs.map((subtab) => (
//                   <div
//                     key={subtab.id}
//                     className={`py-2 px-3 rounded-md cursor-pointer mb-1 text-sm ${
//                       activeTab === subtab.id
//                         ? "bg-blue-50 text-blue-600 font-medium"
//                         : "text-gray-600 hover:bg-gray-100"
//                     }`}
//                     onClick={() => setActiveTab(subtab.id)}
//                   >
//                     {subtab.label}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Main content area */}
//         <div className="flex-1 pl-6">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             {renderTabContent()}
//           </div>
//         </div>
//       </div>

//       {/* Avatar change modal */}
//       {showAvatarModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-80">
//             <h3 className="text-lg font-medium mb-4">Change Avatar</h3>
//             <div className="grid grid-cols-3 gap-4 mb-6">
//               {avatarColors.map((color, index) => (
//                 <div
//                   key={index}
//                   className={`w-16 h-16 rounded-full ${color} flex items-center justify-center font-medium cursor-pointer`}
//                   onClick={() => changeAvatar(color)}
//                 >
//                   {avatar}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end">
//               <button
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
//                 onClick={() => setShowAvatarModal(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Account;

import React, { useEffect, useState } from "react";
import {
  Github,
  Settings,
  FileText,
  Lock,
  Smartphone,
  ChevronRight,
  Edit2,
  LogOut,
} from "lucide-react";
import PlanDetails from "../../components/Account/PlanDetails";
import PageTitle from "../../components/PageTitle";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/slices/userSlice";

const Account = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const dispatch = useDispatch()
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    company: "",
    size: "",
    jobRole: "",
    country: "India",
    timeZone: "UTC+0530",
  });


  const [avatar, setAvatar] = useState();
  const [avatarColor, setAvatarColor] = useState(
    "bg-[#04D2D280] text-[#04D2D2]"
  );
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const avatarColors = [
    "bg-[#04D2D280] text-[#04D2D2]",
    "bg-blue-500/20 text-blue-400",
    "bg-purple-500/20 text-purple-400",
    "bg-red-500/20 text-red-400",
    "bg-green-500/20 text-green-400",
    "bg-yellow-500/20 text-yellow-400",
  ];

  const tabs = [
    {
      id: "user-settings",
      label: "User settings",
      icon: <Settings size={18} />,
      subtabs: [{ id: "overview", label: "Overview" }],
    },
    {
      id: "plan-details",
      label: "Plan details & billing",
      icon: <FileText size={18} />,
      subtabs: [
        { id: "active-plan", label: "Active plan" },
        { id: "invoices", label: "Invoices & billing" },
        { id: "scanned-assets", label: "Scanned assets" },
        { id: "scan-history", label: "Scan history" },
      ],
    },
    {
      id: "security",
      label: "Security",
      icon: <Lock size={18} />,
      subtabs: [
        { id: "general", label: "General" },
        { id: "login-history", label: "Login history" },
      ],
    },
    {
      id: "api",
      label: "API",
      icon: <Smartphone size={18} />,
      subtabs: [{ id: "rest-api", label: "REST API" }],
    },
  ];

  // Load initial data
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("useremail");

    setUserData(prev => ({
      ...prev,
      name: storedUser || "",
      email: storedEmail || ""
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      await dispatch(updateUser({
        name: userData.name,
        email: userData.email
      })).unwrap();

      localStorage.setItem("username", userData.name);
      localStorage.setItem("useremail", userData.email);
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleSaveCompany = () => {
    // Here you would typically make an API call
    console.log("Company data to save:", {
      company: userData.company,
      size: userData.size,
      jobRole: userData.jobRole
    });
    setIsEditingCompany(false);
  };

  const handleSaveLocation = () => {
    // Here you would typically make an API call
    console.log("Location data to save:", {
      country: userData.country,
      timeZone: userData.timeZone
    });
    setIsEditingLocation(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            {/* Profile Section (unchanged) */}
            <div className="flex justify-between items-start mb-8">
              <div>
                {isEditingProfile ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0A1128] border border-[#1E293B] rounded-md text-white focus:border-[#04D2D2] focus:ring-1 focus:ring-[#04D2D2] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-[#0A1128] border border-[#1E293B] rounded-md text-white focus:border-[#04D2D2] focus:ring-1 focus:ring-[#04D2D2] focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-medium text-white">{userData.name}</h2>
                    <p className="text-gray-400 text-sm">{userData.email}</p>
                  </>
                )}
              </div>
            </div>

            <div className="mb-6">
              {isEditingProfile ? (
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 bg-[#04D2D2] text-[#0E1427] text-sm font-medium rounded hover:bg-[#04D2D2]/80 transition-all duration-300"
                    onClick={handleSaveProfile}
                  >
                    Save changes
                  </button>
                  <button
                    className="px-4 py-2 border border-[#1E293B] text-gray-300 text-sm font-medium rounded hover:border-[#04D2D2] hover:text-[#04D2D2] transition-all duration-300"
                    onClick={() => setIsEditingProfile(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="px-4 py-2 bg-[#040C1F] border border-[#1E293B] text-[#04D2D2] text-sm font-medium rounded flex items-center hover:bg-[#04D2D2]/10 transition-all duration-300"
                  onClick={() => setIsEditingProfile(true)}
                >
                  <Edit2 size={16} className="mr-2" /> Edit profile
                </button>
              )}
            </div>

            {/* Company Details Section */}
            <div className="mt-8 border-t border-[#1E293B] pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-[#04D2D2]">Company details</h3>
                {isEditingCompany ? (
                  <div className="flex space-x-2">
                    <button
                      className="text-sm text-[#04D2D2]"
                      onClick={handleSaveCompany}
                    >
                      Save
                    </button>
                    <button
                      className="text-sm text-gray-400"
                      onClick={() => setIsEditingCompany(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-sm text-gray-400 hover:text-[#04D2D2] flex items-center"
                    onClick={() => setIsEditingCompany(true)}
                  >
                    Edit <ChevronRight size={16} className="ml-1" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Company</p>
                  {isEditingCompany ? (
                    <input
                      type="text"
                      name="company"
                      value={userData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0A1128] border border-[#1E293B] rounded-md text-white focus:border-[#04D2D2] focus:ring-1 focus:ring-[#04D2D2] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-300">{userData.company || "-"}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Size</p>
                  {isEditingCompany ? (
                    <input
                      type="text"
                      name="size"
                      value={userData.size}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0A1128] border border-[#1E293B] rounded-md text-white focus:border-[#04D2D2] focus:ring-1 focus:ring-[#04D2D2] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-300">{userData.size || "-"}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Job role</p>
                  {isEditingCompany ? (
                    <input
                      type="text"
                      name="jobRole"
                      value={userData.jobRole}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0A1128] border border-[#1E293B] rounded-md text-white focus:border-[#04D2D2] focus:ring-1 focus:ring-[#04D2D2] focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-300">{userData.jobRole || "-"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="mt-8 border-t border-[#1E293B] pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-[#04D2D2]">Location</h3>
                {isEditingLocation ? (
                  <div className="flex space-x-2">
                    <button
                      className="text-sm text-[#04D2D2]"
                      onClick={handleSaveLocation}
                    >
                      Save
                    </button>
                    <button
                      className="text-sm text-gray-400"
                      onClick={() => setIsEditingLocation(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="text-sm text-gray-400 hover:text-[#04D2D2] flex items-center"
                    onClick={() => setIsEditingLocation(true)}
                  >
                    Edit <ChevronRight size={16} className="ml-1" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Country</p>
                  {isEditingLocation ? (
                    <select
                      name="country"
                      value={userData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0A1128] border border-[#1E293B] rounded-md text-white focus:border-[#04D2D2] focus:ring-1 focus:ring-[#04D2D2] focus:outline-none"
                    >
                      <option value="India">India</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  ) : (
                    <p className="text-sm text-gray-300">{userData.country}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Time zone</p>
                  {isEditingLocation ? (
                    <select
                      name="timeZone"
                      value={userData.timeZone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#0A1128] border border-[#1E293B] rounded-md text-white focus:border-[#04D2D2] focus:ring-1 focus:ring-[#04D2D2] focus:outline-none"
                    >
                      <option value="UTC+0530">UTC+05:30 (IST)</option>
                      <option value="UTC+0000">UTC±00:00 (GMT)</option>
                      <option value="UTC-0500">UTC-05:00 (EST)</option>
                    </select>
                  ) : (
                    <p className="text-sm text-gray-300">{userData.timeZone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "active-plan":
        return <PlanDetails />;

      case "invoices":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Invoices & Billing
            </h2>
            <div className="border border-[#1E293B] rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-[#1E293B]">
                <thead className="bg-[#040C1F]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#0A1128] divide-y divide-[#1E293B]">
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-sm text-gray-400"
                    >
                      No invoices available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case "scanned-assets":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Scanned Assets
            </h2>
            <div className="text-sm text-gray-400 bg-[#040C1F] border border-[#1E293B] rounded-lg p-6">
              No scanned assets found
            </div>
          </div>
        );

      case "scan-history":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Scan History
            </h2>
            <div className="text-sm text-gray-400 bg-[#040C1F] border border-[#1E293B] rounded-lg p-6">
              No scan history available
            </div>
          </div>
        );

      case "general":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Security Settings
            </h2>
            <div className="space-y-6">
              <div className="bg-[#040C1F] border border-[#1E293B] rounded-lg p-6">
                <h3 className="font-medium mb-2 text-[#04D2D2]">Password</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Ensure your account is secure with a strong password
                </p>
                <button className="px-4 py-2 border border-[#1E293B] text-gray-300 text-sm font-medium rounded hover:border-[#04D2D2] hover:text-[#04D2D2] transition-all duration-300">
                  Change password
                </button>
              </div>

              <div className="bg-[#040C1F] border border-[#1E293B] rounded-lg p-6">
                <h3 className="font-medium mb-2 text-[#04D2D2]">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Add an extra layer of security to your account
                </p>
                <button className="px-4 py-2 bg-[#04D2D2] text-[#0E1427] text-sm font-medium rounded hover:bg-[#04D2D2]/80 transition-all duration-300">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        );

      case "login-history":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Login History
            </h2>
            <div className="border border-[#1E293B] rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-[#1E293B]">
                <thead className="bg-[#040C1F]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Device
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#0A1128] divide-y divide-[#1E293B]">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Mar 16, 2025 10:30 AM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      192.168.1.1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Chrome / Windows
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      Mumbai, India
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case "rest-api":
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">API Keys</h2>
            <p className="text-sm text-gray-400 mb-4">
              Manage your API keys to integrate with our services
            </p>
            <button className="px-4 py-2 bg-[#04D2D2] text-[#0E1427] text-sm font-medium rounded hover:bg-[#04D2D2]/80 transition-all duration-300">
              Generate API Key
            </button>
            <div className="mt-6 bg-[#040C1F] border border-[#1E293B] rounded-lg p-6">
              <div className="text-sm text-gray-400">No API keys found</div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Select a tab from the sidebar
            </h2>
            <p className="text-sm text-gray-400">
              Choose an option from the left sidebar to view its contents.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0E1427] p-6">
      <PageTitle title="My Account" />

      <div className="flex flex-1 container mx-auto">
        {/* Left sidebar with tabs */}
        <div className="w-64 border-r border-[#1E293B] pr-4">
          {tabs.map((tab) => (
            <div key={tab.id} className="mb-6">
              <div className="flex items-center text-gray-300 font-medium mb-3">
                <span className="mr-2 text-[#04D2D2]">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              <div className="ml-7">
                {tab.subtabs.map((subtab) => (
                  <div
                    key={subtab.id}
                    className={`py-2 px-3 rounded-md cursor-pointer mb-2 text-sm transition-all duration-300 ${activeTab === subtab.id
                      ? "bg-[#04D2D2]/10 text-[#04D2D2] font-medium border-l-2 border-[#04D2D2]"
                      : "text-gray-400 hover:bg-[#040C1F] hover:text-gray-200"
                      }`}
                    onClick={() => setActiveTab(subtab.id)}
                  >
                    {subtab.label}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-auto pt-6 border-t border-[#1E293B]">
            <button className="flex items-center text-gray-400 hover:text-[#04D2D2] transition-colors duration-300 text-sm py-2">
              <LogOut size={16} className="mr-2" /> Sign out
            </button>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 pl-6">
          <div className="bg-[#0A1128] rounded-lg shadow-lg border border-[#1E293B] p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Avatar change modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#040C1F] rounded-lg p-6 w-80 border border-[#1E293B]">
            <h3 className="text-lg font-medium mb-4 text-white">
              Change Avatar
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {avatarColors.map((color, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-full ${color} flex items-center justify-center font-medium cursor-pointer border border-[#1E293B] hover:border-[#04D2D2] transition-all duration-300`}
                  onClick={() => changeAvatar(color)}
                >
                  {avatar}
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 border border-[#1E293B] text-gray-300 text-sm font-medium rounded hover:border-[#04D2D2] hover:text-[#04D2D2] transition-all duration-300"
                onClick={() => setShowAvatarModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
