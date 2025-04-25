// import React, { useState, useEffect } from 'react';
// import apiInstance from '../../api/instance';

// const GoogleHacking = () => {
//     const [targetUrl, setTargetUrl] = useState('');
//     const [activeTab, setActiveTab] = useState('vulnerabilities');
//     const [isScanning, setIsScanning] = useState(false);
//     const [selectedCheck, setSelectedCheck] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const [error, setError] = useState(null);

//     // Define how categories should be grouped
//     const CATEGORY_GROUPS = {
//         vulnerabilities: [
//             "Directory Listening Vulnerabilities",
//             "Exposed Configuration Files",
//             "Exposed Database Files",
//             "Exposed Login Pages",
//             "Exposed Log Files",
//             "SQL errors",
//             "Exposed Security Certificates & SSH Keys",
//             "Backup and old files",
//             "Publicly Exposed Documents",
//             "Find PasteBin Entries",
//             "Find Employees on LinkedIn",
//             "Find Subdomains",
//             "Find Sub-Subdomains"
//         ],
//         wordpress: [
//             "Find Wordpress",
//             "Find Crt.sh",
//             "Find Entries in Wayback Machine",
//             "Search in Github",
//             "Search in Reddit",
//             "Find Phpinfo and .htaccess"
//         ]
//     };

//     // Fetch categories from backend on component mount
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await apiInstance.get('/api/newScans/google-dorks');
//                 setCategories(response.data.categories || []);
//             } catch (err) {
//                 setError('Failed to load dork categories');
//             }
//         };
//         fetchCategories();
//     }, []);

//     // Filter categories based on groups
//     const vulnerabilityCategories = categories.filter(cat =>
//         CATEGORY_GROUPS.vulnerabilities.includes(cat)
//     );

//     const wordpressChecks = categories.filter(cat =>
//         CATEGORY_GROUPS.wordpress.includes(cat)
//     );

//     const handleRadioChange = (item) => {
//         setSelectedCheck(item);
//         setError(null);
//     };

//     const handleScan = async () => {
//         if (!targetUrl || !selectedCheck) {
//             setError('Please select a target URL and dork type');
//             return;
//         }

//         setIsScanning(true);
//         setError(null);

//         try {
//             const response = await apiInstance.post('/api/newScans/google-search', {
//                 domain: targetUrl,
//                 dork: selectedCheck
//             });

//             // Open each URL in new tab (handled by backend)
//             if (response.data.urls) {
//                 response.data.urls.forEach(url => {
//                     window.open(url, '_blank');
//                 });
//             }
//         } catch (err) {
//             setError(err.response?.data?.detail || 'Search failed');
//         } finally {
//             setIsScanning(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#0E1427]">
//             {/* Header */}
//             <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
//                 Google Hacking
//                 <p className="text-gray-500 text-[14px]">Automated Google Dork scanning tool</p>
//             </h2>

//             {/* Error message */}
//             {error && (
//                 <div className="mx-2 my-2 p-2 bg-red-900 text-red-200 rounded-md">
//                     {error}
//                 </div>
//             )}
//             <div className="mx-2 bg-[#040C1F] rounded-lg shadow-lg overflow-hidden border border-[#2D364A]">

//                 {/* Main Content */}
//                 <div className="p-6">
//                     {/* Target URL Section */}
//                     <div className="mb-8">
//                         <h2 className="text-xl font-semibold mb-4 text-[#04D2D2]">Target Domain:</h2>
//                         <div className="flex gap-4">
//                             <input
//                                 type="text"
//                                 value={targetUrl}
//                                 onChange={(e) => setTargetUrl(e.target.value)}
//                                 placeholder="Enter target URL (e.g., example.com)"
//                                 disabled={isScanning}
//                                 className="flex-1 px-4 py-2 border border-[#2D364A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#04D2D2] bg-[#0E1427] text-gray-400 disabled:bg-[#0E1427]"
//                             />
//                             <button
//                                 onClick={handleScan}
//                                 disabled={isScanning || !targetUrl || !selectedCheck}
//                                 className={`px-6 py-2 rounded-md font-medium ${isScanning || !targetUrl || !selectedCheck ? 'bg-gray-700 cursor-not-allowed text-gray-500' : 'bg-[#04D2D2] hover:bg-[#03B8B8] text-[#040C1F]'}`}
//                             >
//                                 {isScanning ? (
//                                     <span className="flex items-center">
//                                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Searching...
//                                     </span>
//                                 ) : 'Search'}
//                             </button>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                         {/* Left Column - Categories */}
//                         <div className="lg:col-span-1 bg-[#0E1427] rounded-lg p-4 border border-[#2D364A]">
//                             <div className="flex border-b border-[#2D364A] mb-4">
//                                 <button
//                                     className={`py-2 px-4 font-medium ${activeTab === 'vulnerabilities' ? 'text-[#04D2D2] border-b-2 border-[#04D2D2]' : 'text-gray-500 hover:text-[#04D2D2]'}`}
//                                     onClick={() => setActiveTab('vulnerabilities')}
//                                 >
//                                     Directory listing
//                                 </button>
//                                 <button
//                                     className={`py-2 px-4 font-medium ${activeTab === 'wordpress' ? 'text-[#04D2D2] border-b-2 border-[#04D2D2]' : 'text-gray-500 hover:text-[#04D2D2]'}`}
//                                     onClick={() => setActiveTab('wordpress')}
//                                 >
//                                     Find WordPress
//                                 </button>
//                             </div>

//                             <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
//                                 {activeTab === 'vulnerabilities' && (
//                                     <ul className="space-y-2">
//                                         {vulnerabilityCategories.map((item, index) => (
//                                             <li key={index} className="flex items-center">
//                                                 <input
//                                                     type="radio"
//                                                     id={`vuln-${index}`}
//                                                     name="dork-selection"
//                                                     checked={selectedCheck === item}
//                                                     onChange={() => handleRadioChange(item)}
//                                                     className="h-4 w-4 text-[#04D2D2] focus:ring-[#04D2D2] border-[#2D364A]"
//                                                 />
//                                                 <label htmlFor={`vuln-${index}`} className="ml-2 text-gray-400">
//                                                     {item}
//                                                 </label>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}

//                                 {activeTab === 'wordpress' && (
//                                     <ul className="space-y-2">
//                                         {wordpressChecks.map((item, index) => (
//                                             <li key={index} className="flex items-center">
//                                                 <input
//                                                     type="radio"
//                                                     id={`wp-${index}`}
//                                                     name="dork-selection"
//                                                     checked={selectedCheck === item}
//                                                     onChange={() => handleRadioChange(item)}
//                                                     className="h-4 w-4 text-[#04D2D2] focus:ring-[#04D2D2] border-[#2D364A]"
//                                                 />
//                                                 <label htmlFor={`wp-${index}`} className="ml-2 text-gray-400">
//                                                     {item}
//                                                 </label>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Right Column - Empty space where table/logs used to be */}
//                         <div className="lg:col-span-2 bg-[#0E1427] rounded-lg p-4 border border-[#2D364A] flex items-center justify-center">
//                             <div className="text-center">
//                                 <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                                 </svg>
//                                 <h3 className="mt-2 text-lg font-medium text-gray-400">Google Hacking Tool</h3>
//                                 <p className="mt-1 text-gray-500">Select a dork and click Search to open Google results</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GoogleHacking;

import React, { useState, useEffect } from 'react';
import apiInstance from '../../../api/instance';


const GoogleHacking = () => {
    const [targetUrl, setTargetUrl] = useState('');
    const [activeTab, setActiveTab] = useState('vulnerabilities');
    const [isScanning, setIsScanning] = useState(false);
    const [selectedCheck, setSelectedCheck] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [searchHistory, setSearchHistory] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id)
    })


    // Define how categories should be grouped
    const CATEGORY_GROUPS = {
        vulnerabilities: [
            "Directory Listening Vulnerabilities",
            "Exposed Configuration Files",
            "Exposed Database Files",
            "Exposed Login Pages",
            "Exposed Log Files",
            "SQL errors",
            "Exposed Security Certificates & SSH Keys",
            "Backup and old files",
            "Publicly Exposed Documents",
            "Find PasteBin Entries",
            "Find Employees on LinkedIn",
            "Find Subdomains",
            "Find Sub-Subdomains"
        ],
        wordpress: [
            "Find Wordpress",
            "Find Crt.sh",
            "Find Entries in Wayback Machine",
            "Search in Github",
            "Search in Reddit",
            "Find Phpinfo and .htaccess"
        ]
    };

    // Fetch categories from backend on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiInstance.get('/api/newScans/google-dorks');
                setCategories(response.data.categories || []);
            } catch (err) {
                setError('Failed to load dork categories');
            }
        };
        fetchCategories();
    }, []);

    // Filter categories based on groups
    const vulnerabilityCategories = categories.filter(cat =>
        CATEGORY_GROUPS.vulnerabilities.includes(cat)
    );

    const wordpressChecks = categories.filter(cat =>
        CATEGORY_GROUPS.wordpress.includes(cat)
    );

    const handleRadioChange = (item) => {
        setSelectedCheck(item);
        setError(null);
    };

    const handleScan = async () => {
        if (!targetUrl || !selectedCheck) {
            setError('Please select a target URL and dork type');
            return;
        }

        setIsScanning(true);
        setError(null);

        try {
            const response = await apiInstance.post('/api/newScans/google-search', {
                domain: targetUrl,
                dork: selectedCheck
            });

            // Add to search history
            const newSearch = {
                timestamp: new Date().toLocaleString(),
                domain: targetUrl,
                dork: selectedCheck,
                urls: response.data.urls || []
            };
            setSearchHistory(prev => [newSearch, ...prev].slice(0, 10)); // Keep last 10 searches

            // Open each URL in new tab (handled by backend)
            if (response.data.urls) {
                response.data.urls.forEach(url => {
                    window.open(url, '_blank');
                });
            }
        } catch (err) {
            setError(err.response?.data?.detail || 'Search failed');
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0E1427]">
            {/* Header */}
            <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
                Google Hacking
                <p className="text-gray-500 text-[14px]">Automated Google Dork scanning tool</p>
            </h2>

            {/* Error message */}
            {error && (
                <div className="mx-2 my-2 p-2 bg-red-900 text-red-200 rounded-md">
                    {error}
                </div>
            )}
            <div className="mx-2 bg-[#040C1F] rounded-lg shadow-lg overflow-hidden border border-[#2D364A]">

                {/* Main Content */}
                <div className="p-6">
                    {/* Target URL Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-[#04D2D2]">Target Domain:</h2>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={targetUrl}
                                onChange={(e) => setTargetUrl(e.target.value)}
                                placeholder="Enter target URL (e.g., example.com)"
                                disabled={isScanning}
                                className="flex-1 px-4 py-2 border border-[#2D364A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#04D2D2] bg-[#0E1427] text-gray-400 disabled:bg-[#0E1427]"
                            />
                            <button
                                onClick={handleScan}
                                disabled={isScanning || !targetUrl || !selectedCheck}
                                className={`px-6 py-2 rounded-md font-medium ${isScanning || !targetUrl || !selectedCheck ? 'bg-gray-700 cursor-not-allowed text-gray-500' : 'bg-[#04D2D2] hover:bg-[#03B8B8] text-[#040C1F]'}`}
                            >
                                {isScanning ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Searching...
                                    </span>
                                ) : 'Search'}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Categories */}
                        <div className="lg:col-span-1 bg-[#0E1427] rounded-lg p-4 border border-[#2D364A]">
                            <div className="flex border-b border-[#2D364A] mb-4">
                                <button
                                    className={`py-2 px-4 font-medium ${activeTab === 'vulnerabilities' ? 'text-[#04D2D2] border-b-2 border-[#04D2D2]' : 'text-gray-500 hover:text-[#04D2D2]'}`}
                                    onClick={() => setActiveTab('vulnerabilities')}
                                >
                                    Directory listing
                                </button>
                                <button
                                    className={`py-2 px-4 font-medium ${activeTab === 'wordpress' ? 'text-[#04D2D2] border-b-2 border-[#04D2D2]' : 'text-gray-500 hover:text-[#04D2D2]'}`}
                                    onClick={() => setActiveTab('wordpress')}
                                >
                                    Find WordPress
                                </button>
                            </div>

                            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                {activeTab === 'vulnerabilities' && (
                                    <ul className="space-y-2">
                                        {vulnerabilityCategories.map((item, index) => (
                                            <li key={index} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`vuln-${index}`}
                                                    name="dork-selection"
                                                    checked={selectedCheck === item}
                                                    onChange={() => handleRadioChange(item)}
                                                    className="h-4 w-4 text-[#04D2D2] focus:ring-[#04D2D2] border-[#2D364A]"
                                                />
                                                <label htmlFor={`vuln-${index}`} className="ml-2 text-gray-400">
                                                    {item}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {activeTab === 'wordpress' && (
                                    <ul className="space-y-2">
                                        {wordpressChecks.map((item, index) => (
                                            <li key={index} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`wp-${index}`}
                                                    name="dork-selection"
                                                    checked={selectedCheck === item}
                                                    onChange={() => handleRadioChange(item)}
                                                    className="h-4 w-4 text-[#04D2D2] focus:ring-[#04D2D2] border-[#2D364A]"
                                                />
                                                <label htmlFor={`wp-${index}`} className="ml-2 text-gray-400">
                                                    {item}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Search History */}
                        <div className="lg:col-span-2 bg-[#0E1427] rounded-lg p-4 border border-[#2D364A]">
                            {/* <h3 className="text-lg font-medium text-[#04D2D2] mb-4x">Search History</h3> */}

                            {searchHistory.length === 0 ? (
                                <div className="text-center py-8">
                                    <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <p className="mt-2 text-gray-400">No search history yet</p>
                                    <p className="text-gray-500">Perform a search to see results here</p>
                                </div>
                            ) : (
                                <div className="overflow-y-auto max-h-[500px]">
                                    <table className="min-w-full divide-y divide-[#2D364A]">
                                        <thead className="bg-[#040C1F]">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-[#04D2D2] uppercase tracking-wider">Time</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-[#04D2D2] uppercase tracking-wider">Domain</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-[#04D2D2] uppercase tracking-wider">Dork</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-[#04D2D2] uppercase tracking-wider">Results</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-[#0E1427] divide-y divide-[#2D364A]">
                                            {searchHistory.map((search, index) => (
                                                <tr key={index} className="hover:bg-[#040C1F]">
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{search.timestamp}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{search.domain}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{search.dork}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                                                        {search.urls.length} links
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoogleHacking;