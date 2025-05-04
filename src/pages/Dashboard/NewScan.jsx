// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const NewScan = () => {
//   const [activeTab, setActiveTab] = useState('quick-start');
//   const [selectedTools, setSelectedTools] = useState([]);

//   // Exact colors from the reference image
//   const colors = {
//     teal: '#04D2D2', // The bright teal/cyan color from image 3
//     darkNavy: '#001A2C', // The dark background from image 3
//     lightGray: '#0E1427', // For backgrounds
//     white: '#FFFFFF',
//     borderGray: '#4C566A'
//   };

//   const tabs = [
//     { id: 'quick-start', label: 'Quick start' },
//     { id: 'reuse-tools', label: 'Reuse tools' },
//     { id: 'favorites', label: 'Favorites' },
//     { id: 'urls', label: 'URLs' }
//   ];

//   const scanningTools = [
//     {
//       category: 'Web scans',
//       tools: [
//         { id: 'website-scanner', link: "#", name: 'Website Scanner', description: 'Analyze website risks, find all its web applications/domains', icon: '🌐' },
//         { id: 'google-hacking', link: "#", name: 'Google Hacking', description: 'Find online footprints of a target through search engines', icon: '🔍' }
//       ]
//     },
//     {
//       category: 'Network & Cloud scans',
//       tools: [
//         { id: 'network-scanner', link: "#", name: 'Network Scanner', description: 'Identify live hosts on target network/ranges/domains', icon: '📶' },
//         { id: 'domain-finder', link: "#", name: 'Domain Finder', description: 'Find online footprints of target\'s domain names', icon: '🌐' },
//         { id: 'virtual-hosts-finder', link: "#", name: 'Virtual Hosts Finder', description: 'Find multiple web hosts on the same server', icon: '💻' },
//         { id: 'port-scanner', link: "#", name: 'Port Scanner', description: 'Detect open ports and fingerprint services', icon: '🔌' }
//       ]
//     },
//     {
//       category: 'Discovery tools',
//       tools: [
//         { id: 'website-recon', link: "#", name: 'Website Recon', description: 'Fingerprint web technologies of target websites', icon: '🔎' },
//         { id: 'url-fuzzer', link: "#", name: 'URL Fuzzer', description: 'Discover hidden files and directories', icon: '📁' },
//         { id: 'waf-detector', link: "#", name: 'WAF Detector', description: 'Detect protection mechanisms on target websites', icon: '🛡️' },
//         { id: 'subdomain-finder', link: "#", name: 'Subdomain Finder', description: 'Discover subdomains of a domain', icon: '📊' },
//         { id: 'people-hunter', link: "#", name: 'People Hunter', description: 'Research email addresses and social media profiles', icon: '👤' }
//       ]
//     }
//   ];

//   const recentScans = [
//     { id: 1, name: 'example.com full scan', date: 'March 14, 2025', tools: ['Website Scanner', 'Port Scanner'] },
//     { id: 2, name: 'Internal network audit', date: 'March 10, 2025', tools: ['Network Scanner', 'Virtual Hosts Finder'] },
//     { id: 3, name: 'Competitor analysis', date: 'March 5, 2025', tools: ['Domain Finder', 'Website Recon'] }
//   ];

//   const favorites = [
//     { id: 'website-scanner', name: 'Website Scanner', description: 'Analyze website risks, find all its web applications/domains', icon: '🌐' },
//     { id: 'port-scanner', name: 'Port Scanner', description: 'Detect open ports and fingerprint services', icon: '🔌' },
//     { id: 'subdomain-finder', name: 'Subdomain Finder', description: 'Discover subdomains of a domain', icon: '📊' }
//   ];

//   const savedUrls = [
//     { id: 1, url: 'https://example.com', description: 'Main company website' },
//     { id: 2, url: 'https://blog.example.com', description: 'Company blog' },
//     { id: 3, url: 'https://api.example.com', description: 'API endpoint' }
//   ];

//   const toggleToolSelection = (toolId) => {
//     if (selectedTools.includes(toolId)) {
//       setSelectedTools(selectedTools.filter(id => id !== toolId));
//     } else {
//       setSelectedTools([...selectedTools, toolId]);
//     }
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'quick-start':
//         return (
//           <div>
//             <div className="mb-6">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full px-4 py-2 border border-[#04D2D2] rounded-md placeholder:text-gray-400"
//                 />

//               </div>
//             </div>

//             {scanningTools.map((category, index) => (
//               <div key={index} className="mb-8">
//                 <h2 className="text-sm font-medium text-gray-400 mb-3">{category.category}</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {category.tools.map(tool => (
//                     <Link to={tool.link}>
//                       <div
//                         key={tool.id}
//                         className="p-4 border-2 bg-[#040C1F] rounded-lg hover:shadow-[0px_0px_10px_#04D2D2] flex cursor-pointer text-[#04D2D2] hover:scale-102 transition-all delay-100"
//                         style={{
//                           borderColor: colors.borderGray,
//                           position: 'relative' // For positioning the X
//                         }}
//                         onClick={() => toggleToolSelection(tool.id)}
//                       >
//                         <div className="flex items-center justify-center w-10 h-10 rounded-md mr-4 text-white"
//                           style={{ backgroundColor: colors.teal }}>
//                           <span className="text-xl">{tool.icon}</span>
//                         </div>
//                         <div>
//                           <h3 className="font-medium">{tool.name}</h3>
//                           <p className="text-sm text-gray-500">{tool.description}</p>
//                         </div>
//                         {selectedTools.includes(tool.id) && (
//                           <div
//                             style={{
//                               position: 'absolute',
//                               top: '-10px',
//                               right: '-10px',
//                               width: '25px',
//                               height: '25px',
//                               backgroundColor: colors.teal,
//                               borderRadius: '50%',
//                               display: 'flex',
//                               justifyContent: 'center',
//                               alignItems: 'center',
//                               color: colors.white
//                             }}
//                           >
//                             ✕
//                           </div>
//                         )}
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         );

//       case 'reuse-tools':
//         return (
//           <div>
//             <h2 className="text-lg text-[#04D2D2] font-medium mb-4">Recent Scans</h2>
//             <div className="space-y-4">
//               {recentScans.map(scan => (
//                 <div key={scan.id} style={{ borderColor: colors.borderGray }} className="p-4 border-2 hover:scale-101 transition-all delay-100 rounded-md hover:shadow-[0px_0px_10px_#04D2D2]">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-medium text-gray-400">{scan.name}</h3>
//                       <p className="text-sm text-gray-400">{scan.date}</p>
//                       <div className="mt-2 flex flex-wrap gap-2">
//                         {scan.tools.map((tool, idx) => (
//                           <span key={idx} className="px-2 bg-[#04D2D2] py-1 text-xs rounded-md"
//                             style={{ color: colors.darkNavy }}>
//                             {tool}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <button style={{ color: colors.teal }} className="hover:opacity-80">
//                       Reuse
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 'favorites':
//         return (
//           <div>
//             <h2 className="text-lg font-medium text-[#04D2D2] mb-4">Favorite Tools</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {favorites.map(tool => (
//                 <div
//                   key={tool.id}
//                   className="p-4 border-2 bg-[#040C1F] rounded-lg hover:shadow-[0px_0px_10px_#04D2D2] flex cursor-pointer text-[#04D2D2] hover:scale-102 transition-all delay-100"
//                   style={{ position: 'relative', borderColor: colors.borderGray }}
//                   onClick={() => toggleToolSelection(tool.id)}
//                 >
//                   <div className="flex items-center justify-center w-10 h-10 rounded-md mr-4 text-white"
//                     style={{ backgroundColor: colors.teal }}>
//                     <span className="text-xl">{tool.icon}</span>
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-[#04D2D2]">{tool.name}</h3>
//                     <p className="text-sm text-gray-500">{tool.description}</p>
//                   </div>
//                   {selectedTools.includes(tool.id) && (
//                     <div
//                       style={{
//                         position: 'absolute',
//                         top: '-10px',
//                         right: '-10px',
//                         width: '25px',
//                         height: '25px',
//                         backgroundColor: colors.teal,
//                         borderRadius: '50%',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         color: colors.white
//                       }}
//                     >
//                       ✕
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 'urls':
//         return (
//           <div>
//             <div className="mb-6">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search.."
//                   className="w-full px-4 py-2 border border-[#04D2D2] rounded-md placeholder:text-gray-400"
//                 />

//               </div>
//             </div>

//             <h2 className="text-lg font-medium mb-4 text-[#04D2D2]">Saved URLs</h2>
//             <div className="space-y-4">
//               {savedUrls.map(item => (
//                 <div key={item.id} style={{ borderColor: colors.borderGray }} className="p-4 border-2 bg-[#040C1F] rounded-lg hover:shadow-[0px_0px_10px_#04D2D2] cursor-pointer text-[#04D2D2] hover:scale-101 transition-all delay-100">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-medium" style={{ color: colors.teal }}>{item.url}</h3>
//                       <p className="text-sm text-gray-400">{item.description}</p>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button className="text-gray-400 hover:text-gray-700">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                         </svg>
//                       </button>
//                       <button className="text-gray-400 hover:text-gray-500">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       default:
//         return <div>Tab content not found</div>;
//     }
//   };

//   return (
//     <div style={{ backgroundColor: colors.lightGray }} className="min-h-screen main-container">
//       <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
//         New Scans
//       </h2>
//       <div className="mx-2 bg-[#040C1F] rounded-lg shadow-md">
//         <div className="p-4 border-b-2 border-[#4C566A]">

//           <div className="flex mt-4 border-[#4C566A] border-b-2">
//             {tabs.map(tab => (
//               <button
//                 key={tab.id}
//                 className="px-4 py-2 mr-2"
//                 style={{
//                   fontWeight: 'semibold',
//                   borderBottom: activeTab === tab.id ? `2px solid ${colors.teal}` : 'none',
//                   color: activeTab === tab.id ? colors.teal : '#6B7280'
//                 }}
//                 onClick={() => setActiveTab(tab.id)}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="p-4">
//           {renderTabContent()}
//         </div>

//         {selectedTools.length > 0 && (
//           <div className="p-4 border-t" style={{ backgroundColor: colors.lightGray }}>
//             <div className="flex justify-between items-center">
//               <div>
//                 <span className="font-medium">{selectedTools.length} tool{selectedTools.length !== 1 ? 's' : ''} selected</span>
//               </div>
//               <div>
//                 <button
//                   className="px-4 py-2 rounded-md text-white hover:opacity-90"
//                   style={{ backgroundColor: colors.teal }}>
//                   Start Scan
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NewScan;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from "../../components/PageTitle"

const NewScan = () => {
  const [activeTab, setActiveTab] = useState('quick-start');

  // Exact colors from the reference image
  const colors = {
    teal: '#04D2D2', // The bright teal/cyan color from image 3
    darkNavy: '#001A2C', // The dark background from image 3
    lightGray: '#0E1427', // For backgrounds
    white: '#FFFFFF',
    borderGray: '#4C566A'
  };

  const tabs = [
    { id: 'quick-start', label: 'Quick start' },
    { id: 'recon-tools', label: 'Recon tools' },
    { id: 'favorites', label: 'Favorites' },
    // { id: 'urls', label: 'URLs' }
  ];

  const scanningTools = [
    {
      category: 'Web scans',
      tools: [
        { id: 'website-technologies-scanner', link: "/new-scan/technologiesScan", name: 'Website Technologies Scanner', description: 'Scanning Website and find using technologies', icon: '🌐' },
        { id: 'google-hacking', link: "/new-scan/google-hacking", name: 'Google Hacking', description: 'Find online footprints of a target through search engines', icon: '🔍' }
      ]
    },
    {
      category: 'Network & Cloud scans',
      tools: [
        { id: 'CORS Scanner', link: "/new-scan/CORS", name: 'CORS Scanner', description: 'Scan CORS in website and find security level', icon: '📶' },
        { id: 'domain-finder', link: "/domain-finder", name: 'Domain Finder', description: 'Find online footprints of target\'s domain names', icon: '🌐' },
        { id: 'emailAudit', link: "/new-scan/emailAudit", name: 'Secure Email Audit', description: 'Scan the secure email audit', icon: '💻' },
        { id: 'port-scanner', link: "/port-scanner", name: 'Port Scanner', description: 'Detect open ports and fingerprint services', icon: '🔌' }
      ]
    },
    {
      category: 'Discovery tools',
      tools: [
        { id: 'website-recon', link: "/new-scan/website-Recon", name: 'Website Recon', description: 'Fingerprint web technologies of target websites', icon: '🔎' },
        { id: 'url-fuzzer', link: "/url-fuzzer", name: 'URL Fuzzer', description: 'Discover hidden files and directories', icon: '📁' },
        { id: 'JSParser', link: "/new-scan/JSParser", name: 'JS Parser', description: 'Scanning and find the js files from website', icon: '🛡️' },
        { id: 'WHOIS-Scanner', link: "/new-scan/whois", name: 'WHOIS SCANNER', description: 'Discover WHOIS Scan Website', icon: '📊' },
        { id: 'people-hunter', link: "/people-hunter", name: 'People Hunter', description: 'Research email addresses and social media profiles', icon: '👤' }
      ]
    }
  ];

  const recentScans = [
    { id: 1, name: 'example.com full scan', date: 'March 14, 2025', tools: ['Website Scanner', 'Port Scanner'] },
    { id: 2, name: 'Internal network audit', date: 'March 10, 2025', tools: ['Network Scanner', 'Virtual Hosts Finder'] },
    { id: 3, name: 'Competitor analysis', date: 'March 5, 2025', tools: ['Domain Finder', 'Website Recon'] }
  ];

  const favorites = [
    { id: 'website-scanner', link: "/website-scanner", name: 'Website Scanner', description: 'Analyze website risks, find all its web applications/domains', icon: '🌐' },
    { id: 'port-scanner', link: "/port-scanner", name: 'Port Scanner', description: 'Detect open ports and fingerprint services', icon: '🔌' },
    { id: 'subdomain-finder', link: "/subdomain-finder", name: 'Subdomain Finder', description: 'Discover subdomains of a domain', icon: '📊' }
  ];

  const savedUrls = [
    { id: 1, url: 'https://example.com', description: 'Main company website' },
    { id: 2, url: 'https://blog.example.com', description: 'Company blog' },
    { id: 3, url: 'https://api.example.com', description: 'API endpoint' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'quick-start':
        return (
          <div>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 border-2 border-[#2D364A] rounded-md placeholder:text-gray-400"
                />
              </div>
            </div>

            {scanningTools.map((category, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-sm font-medium text-gray-400 mb-3">{category.category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.tools.map(tool => (
                    <Link to={tool.link} key={tool.id}>
                      <div
                        className="p-4 border-2 bg-[#040C1F] rounded-lg hover:shadow-[0px_0px_10px_#04D2D2] flex cursor-pointer text-[#04D2D2] hover:scale-102 transition-all delay-100"
                        style={{
                          borderColor: colors.borderGray
                        }}
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-md mr-4 text-white"
                          style={{ backgroundColor: colors.teal }}>
                          <span className="text-xl">{tool.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{tool.name}</h3>
                          <p className="text-sm text-gray-500">{tool.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'reuse-tools':
        return (
          <div>
            <h2 className="text-lg text-[#04D2D2] font-medium mb-4">Recent Scans</h2>
            <div className="space-y-4">
              {recentScans.map(scan => (
                <div key={scan.id} style={{ borderColor: colors.borderGray }} className="p-4 border-2 hover:scale-101 transition-all delay-100 rounded-md hover:shadow-[0px_0px_10px_#04D2D2]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-400">{scan.name}</h3>
                      <p className="text-sm text-gray-400">{scan.date}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {scan.tools.map((tool, idx) => (
                          <span key={idx} className="px-2 bg-[#04D2D2] py-1 text-xs rounded-md"
                            style={{ color: colors.darkNavy }}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button style={{ color: colors.teal }} className="hover:opacity-80">
                      Reuse
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div>
            <h2 className="text-lg font-medium text-[#04D2D2] mb-4">Favorite Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map(tool => (
                <Link to={tool.link} key={tool.id}>
                  <div
                    className="p-4 border-2 bg-[#040C1F] rounded-lg hover:shadow-[0px_0px_10px_#04D2D2] flex cursor-pointer text-[#04D2D2] hover:scale-102 transition-all delay-100"
                    style={{ borderColor: colors.borderGray }}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-md mr-4 text-white"
                      style={{ backgroundColor: colors.teal }}>
                      <span className="text-xl">{tool.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#04D2D2]">{tool.name}</h3>
                      <p className="text-sm text-gray-500">{tool.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );

      case 'urls':
        return (
          <div>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search.."
                  className="w-full px-4 py-2 border-2 border-[#2D364A] rounded-md placeholder:text-gray-400"
                />
              </div>
            </div>

            <h2 className="text-lg font-medium mb-4 text-[#04D2D2]">Saved URLs</h2>
            <div className="space-y-4">
              {savedUrls.map(item => (
                <div key={item.id} style={{ borderColor: colors.borderGray }} className="p-4 border-2 bg-[#040C1F] rounded-lg hover:shadow-[0px_0px_10px_#04D2D2] cursor-pointer text-[#04D2D2] hover:scale-101 transition-all delay-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium" style={{ color: colors.teal }}>{item.url}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Tab content not found</div>;
    }
  };

  return (
    <div className="min-h-screen main-container bg-[#0E1427] text-white p-6">
      <PageTitle title="New Scan" />
      <div className=" bg-[#040C1F] rounded-lg shadow-md">
        <div className="p-4 border-b-2 border-[#4C566A]">
          <div className="flex mt-4 border-[#4C566A] border-b-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className="px-4 py-2 mr-2"
                style={{
                  fontWeight: 'semibold',
                  borderBottom: activeTab === tab.id ? `2px solid ${colors.teal}` : 'none',
                  color: activeTab === tab.id ? colors.teal : '#6B7280'
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default NewScan;