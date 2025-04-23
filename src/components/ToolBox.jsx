// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ToolBox = ({ title, description, subtool }) => {
//   const navigate = useNavigate();

//   const onNavigate = () => {
//     if (subtool === 'true') {
//       // Navigate to the dynamic subtools route with the tool title as a parameter
//       navigate(`/tools/${decodeURI(title).replace(/\s+/g, '')}`);
//     } else {
//       navigate(`/tools/${decodeURI(title).replace(/\s+/g, '')}/scan`);
//     }
//   }

//   return (
//     <div className='box w-[32%] mx-2 mb-4 rounded-xl border-[#4C566A] h-[260px] border-2 hover:shadow-[0px_0px_8px_#04D2D2] transition-all delay-100 bg-[#040C1F] text-white'>
//       <div className="flex flex-col h-full p-4">
//         <div className="logo mb-4">
//           <img width="78" height="78" src="https://img.icons8.com/external-others-papa-vector/78/external-XSS-hacker-attack-others-papa-vector.png" alt="Tool icon" />
//         </div>
//         <div className="flex-grow">
//           <h3 className="text-lg font-semibold text-[#04D2D2]">{title}</h3>
//           <p className='block text-[12px] text-[#04D2D2] font-normal opacity-65 mt-1'>{description}</p>
//         </div>
//         <div className="flex justify-end">
//           <button onClick={onNavigate} className="bg-[#04D2D2] text-[#2E3440] px-5 font-bold cursor-pointer py-2 rounded-md hover:bg-[#03B9B9] transition-all">
//             Explore
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ToolBox;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, ExternalLink } from 'lucide-react';

const ToolBox = ({ title, description, subtool, icon }) => {
  const navigate = useNavigate();

  const onNavigate = () => {
    if (subtool === 'true') {
      navigate(`/tools/${encodeURIComponent(title.replace(/\s+/g, ''))}`);
    } else {
      navigate(`/tools/${encodeURIComponent(title.replace(/\s+/g, ''))}/scan`);
    }
  };

  // Default icon if none provided
  const defaultIcon = "https://img.icons8.com/external-others-papa-vector/78/external-XSS-hacker-attack-others-papa-vector.png";
  
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-3">
      <div className="relative h-full rounded-xl border border-[#1E293B] hover:border-[#04D2D2] bg-[#040C1F] text-white transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-[#04D2D280] group">
        {/* Glowing top border effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#04D2D2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="flex flex-col h-full p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="w-16 h-16 rounded-lg bg-[#1A2335] p-3 flex items-center justify-center">
              <img width="48" height="48" src={icon || defaultIcon} alt={title} className="group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            {/* Tool type indicator */}
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${subtool === 'true' ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'}`}>
              {subtool === 'true' ? 'Collection' : 'Tool'}
            </span>
          </div>
          
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-[#04D2D2] mb-2 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
            <p className="text-sm text-gray-300 mb-4 line-clamp-3">{description}</p>
          </div>
          
          <div className="mt-auto">
            <button 
              onClick={onNavigate} 
              className="w-full bg-[#1A2335] hover:bg-[#04D2D2] text-[#04D2D2] hover:text-[#040C1F] font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center group-hover:shadow-md"
            >
              <span>{subtool === 'true' ? 'Browse Tools' : 'Launch Tool'}</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolBox;