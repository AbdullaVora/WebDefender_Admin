// import React, { useState } from 'react';
// import axios from 'axios';
// import 'devicon/devicon.min.css';
// import apiInstance from '../../../api/instance';
// import SmartLoader from '../../../components/Loader/SmartLoader';

// const TechnologyScanner = () => {
//     const [url, setUrl] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [scanResult, setScanResult] = useState(null);
//     const [error, setError] = useState(null);
//     const [scanStartTime, setScanStartTime] = useState(null);
//     const [scanEndTime, setScanEndTime] = useState(null);
//     const [scanDuration, setScanDuration] = useState(null);
//     const [scanStatus, setScanStatus] = useState('Ready to start scan');

//     const handleScan = async () => {
//         if (!url) {
//             setError('Please enter a URL');
//             return;
//         }

//         // Validate URL format
//         try {
//             new URL(url);
//         } catch (e) {
//             setError('Please enter a valid URL (e.g., https://example.com)');
//             return;
//         }

//         setIsLoading(true);
//         setError(null);
//         setScanResult(null);
//         setScanStartTime(new Date());
//         setScanEndTime(null);
//         setScanDuration(null);
//         setScanStatus(`Scanning domain: ${url}...`);


//         try {
//             const response = await apiInstance.post('/api/newScans/technologiesScan', { url });
//             setScanResult(response.data);
//             setScanStatus('Scan completed successfully');
//         } catch (err) {
//             console.error('Scan error:', err);
//             setError(err.response?.data?.message || 'Failed to scan website. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//         const endTime = new Date();
//         setScanEndTime(endTime);
//         setScanDuration((endTime - scanStartTime) / 1000);
//     };

//     const getTechnologyIcon = (technology) => {
//         const tech = technology.toLowerCase();

//         if (tech.includes('google') || tech.includes('ga4') || tech.includes('recaptcha')) {
//             return 'google';
//         } else if (tech.includes('font awesome')) {
//             return 'font-awesome';
//         } else if (tech.includes('jquery')) {
//             return 'jquery';
//         } else if (tech.includes('php')) {
//             return 'php';
//         } else if (tech.includes('cloudflare')) {
//             return 'cloudflare';
//         } else if (tech.includes('mysql')) {
//             return 'mysql';
//         } else if (tech.includes('bootstrap')) {
//             return 'bootstrap';
//         } else if (tech.includes('wordpress')) {
//             return 'wordpress';
//         } else if (tech.includes('woocommerce')) {
//             return 'woocommerce';
//         } else if (tech.includes('youtube')) {
//             return 'youtube';
//         } else if (tech.includes('polymer')) {
//             return 'polymer';
//         } else if (tech.includes('hsts')) {
//             return 'shield';
//         } else if (tech.includes('pwa')) {
//             return 'pwa';
//         } else if (tech.includes('http/3')) {
//             return 'http';
//         } else if (tech.includes('hammer')) {
//             return 'hammer';
//         } else if (tech.includes('xregexp')) {
//             return 'regex';
//         }

//         return 'code'; // default icon
//     };

//     return (
//         <div className="min-h-screen bg-[#0E1427] px-3">
//             {/* Header */}
//             <h2 className="text-[#04D2D2] border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
//                 Technologies Scan
//                 <p className="text-gray-500 text-[14px]">Scanning website and find using technologies</p>
//             </h2>
//             <div className="flex gap-3 mb-3">
//                 <input
//                     type="text"
//                     value={url}
//                     onChange={(e) => setUrl(e.target.value)}
//                     placeholder="Enter domain..."
//                     className="flex-1 text-gray-400 px-4 py-2 rounded border"
//                     style={{
//                         backgroundColor: '#040C1F',
//                         borderColor: '#4C566A',
//                         fontWeight: 'bold'
//                     }}
//                 />
//                 <button
//                     onClick={handleScan}
//                     className="px-6 py-2 rounded font-medium focus:outline-none focus:ring-2 hover:opacity-90 transition-opacity"
//                     style={{ backgroundColor: '#04D2D2', color: '#0E1427' }}
//                     disabled={isLoading}
//                 >
//                     {isLoading ? 'Scanning...' : 'Start Scan'}
//                 </button>
//             </div>

//             {/* Status Box */}
//             <div className="mb-6 p-4 rounded border" style={{
//                 backgroundColor: '#040C1F',
//                 borderColor: '#4C566A'
//             }}>
//                 <div className="flex justify-between items-center">
//                     <div>
//                         <span className="font-medium" style={{ color: '#04D2D2' }}>Status: </span>
//                         <span className="text-gray-300">{scanStatus}</span>
//                     </div>
//                     <div className="text-gray-400 text-sm">
//                         {scanStartTime && (
//                             <span style={{ fontWeight: 'bold' }}>Started: {scanStartTime.toLocaleTimeString()}</span>
//                         )}
//                         {scanEndTime && (
//                             <span className="ml-6" style={{ fontWeight: 'bold' }}>Ended: {scanEndTime.toLocaleTimeString()}</span>
//                         )}
//                         {scanDuration && (
//                             <span className="ml-6" style={{ fontWeight: 'bold' }}>Duration: {scanDuration.toFixed(2)} seconds</span>
//                         )}
//                     </div>
//                 </div>
//                 {isLoading && (
//                     <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
//                         <SmartLoader isLoading="technologies" />
//                     </div>
//                 )}
//             </div>

//             {error && (
//                 <div className="mb-6 p-4 bg-red-900 text-red-100 rounded-md">
//                     {error}
//                 </div>
//             )}

//             {scanResult && !isLoading && (
//                 <div className="bg-[#040C1F] rounded-lg p-6 shadow-lg">
//                     <h2 className="text-xl font-semibold mb-4 text-[#04D2D2]">Scan Results for: {scanResult.website}</h2>

//                     <div className="space-y-6">
//                         {Object.entries(scanResult.detected_technologies).map(([category, technologies]) => (
//                             <div key={category} className="mb-6">
//                                 <h3 className="text-lg font-medium mb-3 text-[#04D2D2]">{category}</h3>
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//                                     {technologies.map((tech, index) => (
//                                         <div key={index} className="flex items-center p-3 bg-[#0E1427] rounded-md">
//                                             <div className="mr-3 text-2xl">
//                                                 <i className={`devicon-${getTechnologyIcon(tech.technology)}-plain colored`}></i>
//                                             </div>
//                                             <div>
//                                                 <p className="font-medium text-gray-200">{tech.technology}</p>
//                                                 <p className="text-sm text-gray-400">Version: {tech.version}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TechnologyScanner;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiInstance from '../../../api/instance';
import SmartLoader from '../../../components/Loader/SmartLoader';
import { FiAlertTriangle, FiClock, FiSearch } from 'react-icons/fi';

const TechnologyScanner = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [scanStartTime, setScanStartTime] = useState(null);
    const [scanEndTime, setScanEndTime] = useState(null);
    const [scanDuration, setScanDuration] = useState(null);
    const [scanStatus, setScanStatus] = useState('Ready to start scan');
    const [userId, setUserId] = useState(null);
    const [isScanning, setIsScanning] = useState(false);


    // Dummy message states
    const [showDummyMessage, setShowDummyMessage] = useState(true);
    const [dummyMessage, setDummyMessage] = useState({
        title: "Welcome to Technologies Scanner",
        content: "Enter a target URL above to begin scanning for Technologies vulnerabilities.",
        icon: <FiSearch className="w-12 h-12 mb-4" style={{ color: '#04D2D2' }} />,
        color: 'text-gray-300'
    });

    useEffect(() => {
        if (isScanning) {
            setShowDummyMessage(true);
            setDummyMessage({
                title: "Scanning in Progress",
                content: "Please wait while we scan the target URLs...",
                icon: <FiClock className="w-12 h-12 mb-4 animate-pulse" style={{ color: '#04D2D2' }} />,
                color: 'text-gray-300'
            });
        } else if (error) {
            setShowDummyMessage(true);
            setDummyMessage({
                title: "Error Occurred",
                content: error,
                icon: <FiAlertTriangle className="w-12 h-12 mb-4" style={{ color: '#ef4444' }} />,
                color: 'text-red-400'
            });
        } else if (!scanResult) {
            setShowDummyMessage(true);
            setDummyMessage({
                title: "Welcome to Technologies Scanner",
                content: "Enter a target URL above to begin scanning for Technologies vulnerabilities.",
                icon: <FiSearch className="w-12 h-12 mb-4" style={{ color: '#04D2D2' }} />,
                color: 'text-gray-300'
            });
        } else {
            setShowDummyMessage(false); // finally hide dummy when there is real scan result
        }
    }, [isScanning, error, scanResult]);

    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id)
    })

    const handleScan = async () => {
        if (!url) {
            setError('Please enter a URL');
            return;
        }

        try {
            new URL(url);
        } catch (e) {
            setError('Please enter a valid URL (e.g., https://example.com)');
            return;
        }

        setIsScanning(true);
        setIsLoading(true);
        setError(null);
        setScanResult(null);
        setScanStartTime(new Date());
        setScanEndTime(null);
        setScanDuration(null);
        setScanStatus(`Scanning domain: ${url}...`);

        try {
            const response = await apiInstance.post('/api/newScans/technologiesScan', { userId, url });
            setScanResult(response.data);
            setScanStatus('Scan completed successfully');
        } catch (err) {
            console.error('Scan error:', err);
            setError(err.response?.data?.message || 'Failed to scan website. Please try again.');
        } finally {
            setIsLoading(false);
            const endTime = new Date();
            setScanEndTime(endTime);
            setScanDuration((endTime - scanStartTime) / 1000);
            setIsScanning(false);
        }
    };

    const TechIcon = ({ technology }) => {
        // Format technology name for Wappalyzer CDN
        const formattedName = technology
            .replace(/\s+/g, '')
            .replace('.js', '')
            .replace(/\W+/g, '')
            .toLowerCase();

        return (
            <img
                // src={`https://cdn.wappalyzer.com/images/icons/${formattedName}.svg`}
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${formattedName.toLowerCase()}/${formattedName.toLowerCase()}-original.svg`}
                alt={technology}
                className="w-6 h-6 mr-3"
                onError={(e) => {
                    // Fallback for unsupported icons
                    e.target.src = 'https://cdn.wappalyzer.com/images/icons/default.svg';
                    e.target.className = 'w-5 h-5 mr-3 opacity-70';
                }}
            />
        );
    };

    return (
        <div className="min-h-screen bg-[#0E1427] px-3">
            {/* Header */}
            <h2 className="text-[#04D2D2] border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
                Technologies Scan
                <p className="text-gray-500 text-[14px]">Scanning website and find using technologies</p>
            </h2>
            <div className="flex gap-3 mb-3">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter domain..."
                    className="flex-1 text-gray-400 px-4 py-2 rounded border"
                    style={{
                        backgroundColor: '#040C1F',
                        borderColor: '#4C566A',
                        fontWeight: 'bold'
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                />
                <button
                    onClick={handleScan}
                    className="px-6 py-2 rounded font-medium focus:outline-none focus:ring-2 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#04D2D2', color: '#0E1427' }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Scanning...' : 'Start Scan'}
                </button>
            </div>

            {/* Status Box */}
            <div className="mb-6 p-4 rounded border" style={{
                backgroundColor: '#040C1F',
                borderColor: '#4C566A'
            }}>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-medium" style={{ color: '#04D2D2' }}>Status: </span>
                        <span className="text-gray-300">{scanStatus}</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                        {scanStartTime && (
                            <span style={{ fontWeight: 'bold' }}>Started: {scanStartTime.toLocaleTimeString()}</span>
                        )}
                        {scanEndTime && (
                            <span className="ml-6" style={{ fontWeight: 'bold' }}>Ended: {scanEndTime.toLocaleTimeString()}</span>
                        )}
                        {scanDuration && (
                            <span className="ml-6" style={{ fontWeight: 'bold' }}>Duration: {scanDuration.toFixed(2)} seconds</span>
                        )}
                    </div>
                </div>
                {isLoading && (
                    <SmartLoader scanType="technologies" isLoading={true} />
                )}
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-900 text-red-100 rounded-md">
                    {error}
                </div>
            )}

            {/* Dummy Message Box (centered) */}
            {showDummyMessage && (
                <div className="flex items-center justify-center my-12">
                    <div
                        className="max-w-md p-8 rounded-lg border text-center"
                        style={{
                            backgroundColor: '#040C1F',
                            borderColor: '#4C566A'
                        }}
                    >
                        <div className="flex justify-center">
                            {dummyMessage.icon}
                        </div>
                        <h3
                            className="text-xl font-bold mb-2"
                            style={{ color: '#04D2D2' }}
                        >
                            {dummyMessage.title}
                        </h3>
                        <p className={dummyMessage.color}>
                            {dummyMessage.content}
                        </p>
                    </div>
                </div>
            )}


            {scanResult && !isLoading && (
                <div className="bg-[#040C1F] rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-[#04D2D2]">Scan Results for: {scanResult.website}</h2>

                    <div className="space-y-6">
                        {Object.entries(scanResult.detected_technologies).map(([category, technologies]) => (
                            <div key={category} className="mb-6">
                                <h3 className="text-lg font-medium mb-3 text-[#04D2D2]">{category}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {technologies.map((tech, index) => (
                                        <div key={index} className="flex items-center p-3 bg-[#0E1427] rounded-md">
                                            <TechIcon technology={tech.technology} />
                                            <div>
                                                <p className="font-medium text-gray-200">{tech.technology}</p>
                                                <p className="text-sm text-gray-400">Version: {tech.version}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TechnologyScanner;