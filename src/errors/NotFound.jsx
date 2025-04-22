// import React from "react";
// import { Link } from "react-router-dom";

// const NotFound = () => {
//   return (
//     <div className="flex justify-center items-center h-screen" style={{flexDirection: 'column'}}>
//       <h1 className="text-[#00E6E6] text-[42px] font-bold">404 - Page Not Found</h1>
//       <p className="text-[#00E6E6] text-[42px] font-bold">The page you are looking for does not exist.</p>
//       <Link to="/dashboard" className="text-[#00E6E6] text-[42px] font-bold">Go to Dashboard</Link>
//     </div>
//   );
// };

// export default NotFound;


import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-center px-4">
      <h1 className="text-[#00E6E6] text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-white text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-400 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        className="bg-[#00E6E6] hover:bg-[#00cccc] text-gray-900 font-semibold py-2 px-6 rounded-lg transition duration-300"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
