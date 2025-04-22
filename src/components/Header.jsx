// // import React, { useState, useRef, useEffect } from "react";
// // import logo from "../assets/logo.png";
// // import logosmall from "../assets/logosmall.png";
// // import { FaStar, FaUserAlt } from "react-icons/fa";
// // import { GrUserSettings } from "react-icons/gr";
// // import { IoLogOut } from "react-icons/io5";
// // import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
// // import { useDispatch } from "react-redux";
// // import { logOut } from "../store/slices/userSlice";

// // const Header = ({ isAsideCollapsed, setIsAsideCollapsed }) => {
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const dropdownRef = useRef(null);
// //   const dispatch = useDispatch()

// //   const toggleDropdown = () => {
// //     setShowDropdown(!showDropdown);
// //   };

// //   const toggleAside = () => {
// //     setIsAsideCollapsed(!isAsideCollapsed);
// //   };

// //   const handleLogout = () => {
// //     setShowDropdown(false);
// //     dispatch(logOut())
// //   }

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setShowDropdown(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, []);

// //   return (
// //     <div className="header border-b-1 pb-0 border-[#4C566A] py-[3px] px-[8px] fixed top-0 w-full bg-[#040C1F] z-50 shadow-md">
// //       <div className="flex justify-between items-center">
// //         <div className="flex items-center">
// //           {!isAsideCollapsed ? (
// //             <div className="logo ps-10 pb-1 pe-[71px] border-e border-[#4C566A]">
// //               <img src={logo} alt="Logo" className="w-[100px]" />
// //             </div>
// //           ) : (
// //             <div className="w-[60px] py-3 border-e border-[#4C566A]">
// //               <img src={logosmall} alt="Logo" className="w-[50px]" />
// //             </div>
// //           )}

// //           <button
// //             onClick={toggleAside}
// //             className="p-2 hover:bg-[#1A2C4E] rounded-lg transition-colors duration-200  mx-2"
// //           >
// //             {isAsideCollapsed ? (
// //               <RiMenuUnfoldLine size={24} className="text-[#00E6E6]" />
// //             ) : (
// //               <RiMenuFoldLine size={24} className="text-[#00E6E6]" />
// //             )}
// //           </button>
// //         </div>
// //         <div className="right flex items-center">
// //           <button
// //             type="button"
// //             className="flex me-5 font-bold cursor-pointer justify-center gap-2 items-center bg-[#05F2F2] text-black px-4 py-2 rounded-md shadow-md hover:bg-[#04D2D2] transition"
// //           >
// //             <FaStar /> Unlock Full Features
// //           </button>

// //           <div className="relative" ref={dropdownRef}>
// //             <button
// //               className="p-2 bg-[#05F2F2] rounded-full cursor-pointer hover:bg-[#04D2D2] transition"
// //               onClick={toggleDropdown}
// //             >
// //               <FaUserAlt size={19} />
// //             </button>

// //             {showDropdown && (
// //               <div className="absolute right-0 mt-5 w-48 bg-[#040C1F] text-white shadow-lg rounded-md overflow-hidden">
// //                 <button
// //                   className="flex items-center text-[#00E6E6] font-medium justify-start gap-2 w-full text-left px-4 py-2 hover:bg-[#05F2F2] hover:text-black transition"
// //                   onClick={() => setShowDropdown(false)}
// //                 >
// //                   <GrUserSettings />
// //                   My Profile
// //                 </button>
// //                 <button
// //                   className="flex justify-start items-center gap-2 w-full text-left font-medium px-4 py-2 text-[#00E6E6] hover:bg-red-500 hover:text-white transition"
// //                   onClick={() => handleLogout()}
// //                 >
// //                   <IoLogOut size={22} className="ms-[-2px]" />
// //                   Sign Out
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Header;

// import React, { useState, useRef, useEffect } from "react";
// import logo from "../assets/logo.png";
// import logosmall from "../assets/logosmall.png";
// import { FaStar, FaUserAlt } from "react-icons/fa";
// import { GrUserSettings } from "react-icons/gr";
// import { IoLogOut } from "react-icons/io5";
// import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
// import { useDispatch } from "react-redux";
// import { logOut } from "../store/slices/userSlice";
// import { Link } from "react-router-dom";

// const Header = ({ isAsideCollapsed, setIsAsideCollapsed }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);
//   const dispatch = useDispatch();

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const toggleAside = () => {
//     setIsAsideCollapsed(!isAsideCollapsed);
//   };

//   const handleLogout = () => {
//     setShowDropdown(false);
//     dispatch(logOut());
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="header border-b-1 pb-0 border-[#4C566A] py-[3px] px-[8px] fixed top-0 w-full bg-[#040C1F] z-50 shadow-md">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center">
//           {!isAsideCollapsed ? (
//             <div className="logo ps-10 pb-1 pe-[71px] border-e border-[#4C566A]">
//               <img src={logo} alt="Logo" className="w-[100px]" />
//             </div>
//           ) : (
//             <div className="w-[60px] py-3 border-e border-[#4C566A]">
//               <img src={logosmall} alt="Logo" className="w-[50px]" />
//             </div>
//           )}

//           <button
//             onClick={toggleAside}
//             className="p-2 hover:bg-[#1A2C4E] rounded-lg transition-colors duration-200  mx-2"
//           >
//             {isAsideCollapsed ? (
//               <RiMenuUnfoldLine size={24} className="text-[#00E6E6]" />
//             ) : (
//               <RiMenuFoldLine size={24} className="text-[#00E6E6]" />
//             )}
//           </button>
//         </div>
//         <div className="right flex items-center">
//           <Link to="/plans&pricing">
//           <button
//             type="button"
//             className="flex me-5 font-bold cursor-pointer justify-center gap-2 items-center bg-[#05F2F2] text-black px-4 py-2 rounded-md shadow-md hover:bg-[#04D2D2] transition"
//           >
//             <FaStar /> Unlock Full Features
//           </button>
//         </Link>

//         <div className="relative" ref={dropdownRef}>
//           <button
//             className="p-2 bg-[#05F2F2] rounded-full cursor-pointer hover:bg-[#04D2D2] transition"
//             onClick={toggleDropdown}
//           >
//             <FaUserAlt size={19} />
//           </button>

//           {showDropdown && (
//             <div className="absolute right-0 mt-5 w-48 bg-[#040C1F] text-white shadow-lg rounded-md overflow-hidden">
//               <Link to={`/account`}>
//                 <button
//                   className="flex items-center text-[#00E6E6] font-medium justify-start gap-2 w-full text-left px-4 py-2 hover:bg-[#05F2F2] hover:text-black transition"
//                   onClick={() => setShowDropdown(false)}
//                 >
//                   <GrUserSettings />
//                   My Account
//                 </button>
//               </Link>
//               <button
//                 className="flex justify-start items-center gap-2 w-full text-left font-medium px-4 py-2 text-[#00E6E6] hover:bg-red-500 hover:text-white transition"
//                 onClick={() => handleLogout()}
//               >
//                 <IoLogOut size={22} className="ms-[-2px]" />
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//     </div >
//   );
// };

// export default Header;

import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import logosmall from "../assets/logosmall.png";
import {
  FaStar,
  FaUserAlt,
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/slices/userSlice";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ isAsideCollapsed, setIsAsideCollapsed }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  // Example notifications - in a real app, these would come from the Redux store
  const notifications = [
    {
      id: 1,
      text: "New security alert detected",
      time: "2 min ago",
      read: false,
    },
    { id: 2, text: "System scan completed", time: "1 hour ago", read: false },
    { id: 3, text: "Weekly report is ready", time: "Yesterday", read: true },
  ];

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowDropdown(false);
  };

  const toggleAside = () => {
    setIsAsideCollapsed(!isAsideCollapsed);
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // In a real app, you might dispatch an action to change the theme in Redux
    // or use localStorage to persist the theme preference
    document.documentElement.classList.toggle("dark-theme");
  };

  const handleLogout = () => {
    setShowDropdown(false);
    dispatch(logOut());
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Searching for:", searchQuery);
      // Implement search functionality here
      setSearchActive(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        searchActive
      ) {
        // Don't close search on outside click if we're not showing it
        setSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchActive]);

  return (
    <div className="header pe-5 border-b border-[#1E293B] fixed top-0 w-full bg-[#040C1F] z-50 shadow-md transition-all duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`logo transition-all duration-300 ease-in-out ${
              isAsideCollapsed ? "py-3 px-3" : "py-1 px-16"
            } border-e border-[#1E293B]`}
          >
            <img
              src={isAsideCollapsed ? logosmall : logo}
              alt="Logo"
              className={`transition-all duration-300 ${
                isAsideCollapsed ? "w-12" : "w-24"
              }`}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleAside}
            className="p-2 hover:bg-[#0E1427] rounded-lg transition-colors duration-300 mx-2 group"
          >
            {isAsideCollapsed ? (
              <RiMenuUnfoldLine
                size={24}
                className="text-[#04D2D2] group-hover:text-[#05F2F2]"
              />
            ) : (
              <RiMenuFoldLine
                size={24}
                className="text-[#04D2D2] group-hover:text-[#05F2F2]"
              />
            )}
          </motion.button>
        </div>

        <div className="center-options hidden md:flex items-center space-x-2">
          <AnimatePresence>
            {searchActive && (
              <motion.div
                ref={searchRef}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "300px", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  className="w-full px-4 py-2 bg-[#0E1427] border border-[#1E293B] text-white rounded-lg focus:outline-none focus:border-[#04D2D2] transition-all duration-300"
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="right flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSearch}
            className="p-2 text-[#04D2D2] hover:bg-[#0E1427] rounded-full transition-all duration-300"
          >
            <FaSearch size={18} />
          </motion.button>

          {/* <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 text-[#04D2D2] hover:bg-[#0E1427] rounded-full transition-all duration-300"
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </motion.button> */}

          <div className="relative" ref={notificationRef}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleNotifications}
              className="p-2 text-[#04D2D2] hover:bg-[#0E1427] rounded-full transition-all duration-300 relative"
            >
              <FaBell size={18} />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-72 bg-[#040C1F] border border-[#1E293B] shadow-lg rounded-md overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-[#1E293B] flex justify-between items-center">
                    <h3 className="font-medium text-[#04D2D2]">
                      Notifications
                    </h3>
                    <button className="text-xs text-gray-400 hover:text-[#04D2D2]">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          whileHover={{ backgroundColor: "#0E1427" }}
                          className={`px-4 py-3 border-b border-[#1E293B] cursor-pointer ${
                            notification.read ? "" : "bg-[#0E1427]"
                          }`}
                        >
                          <div className="flex justify-between">
                            <p
                              className={`text-sm ${
                                notification.read
                                  ? "text-gray-400"
                                  : "text-white"
                              }`}
                            >
                              {notification.text}
                            </p>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-[#04D2D2] rounded-full mt-1"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </motion.div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-500">
                        No notifications yet
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-[#1E293B] text-center">
                    <Link
                      to="/notifications"
                      className="text-sm text-[#04D2D2] hover:text-[#05F2F2]"
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/plans&pricing">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="flex font-bold cursor-pointer justify-center gap-2 items-center bg-gradient-to-r from-[#04D2D2] to-[#05F2F2] text-[#040C1F] px-4 py-2 rounded-md shadow-md hover:shadow-lg hover:shadow-[#04D2D280] transition-all duration-300"
            >
              <FaStar /> Unlock Features
            </motion.button>
          </Link>

          <div className="relative" ref={dropdownRef}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-gradient-to-r from-[#04D2D2] to-[#05F2F2] rounded-full cursor-pointer shadow-md hover:shadow-lg hover:shadow-[#04D2D280] transition-all duration-300"
              onClick={toggleDropdown}
            >
              <FaUserAlt size={19} className="text-[#040C1F]" />
            </motion.button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-48 bg-[#040C1F] text-white border border-[#1E293B] shadow-lg rounded-md overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-[#1E293B]">
                    <p className="font-medium">User Name</p>
                    <p className="text-xs text-gray-400">user@example.com</p>
                  </div>
                  <Link to={`/account`}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center text-[#04D2D2] font-medium justify-start gap-2 w-full text-left px-4 py-2 hover:bg-[#0E1427] hover:text-[#05F2F2] transition-all duration-300"
                      onClick={() => setShowDropdown(false)}
                    >
                      <GrUserSettings />
                      My Account
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex justify-start items-center gap-2 w-full text-left font-medium px-4 py-2 text-[#04D2D2] hover:bg-red-500 hover:text-white transition-all duration-300"
                    onClick={() => handleLogout()}
                  >
                    <IoLogOut size={22} className="ms-[-2px]" />
                    Sign Out
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
