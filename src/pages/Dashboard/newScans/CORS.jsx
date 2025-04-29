// import React, { useEffect, useState } from 'react';
// import Result_Table from '../../../components/Result_Table';
// import apiInstance from '../../../api/instance';

// const CORS = () => {
//     const [targetUrl, setTargetUrl] = useState('');
//     const [useCustom, setUseCustom] = useState(false);
//     const [threads, setThreads] = useState(15);
//     const [retries, setRetries] = useState(3);
//     const [delay, setDelay] = useState(0.3);
//     const [timeout, setTimeout] = useState(30);
//     const [cookies, setCookies] = useState('');
//     const [urlFile, setUrlFile] = useState(null);
//     const [payloadFile, setPayloadFile] = useState(null);
//     const [scanResults, setScanResults] = useState([]);
//     const [isScanning, setIsScanning] = useState(false);
//     const [userId, setUserId] = useState();

//     useEffect(() => {
//         const id = localStorage.getItem("userId");
//         setUserId(id)
//     },[])

//     const handleUrlFileChange = (e) => {
//         setUrlFile(e.target.files[0] || null);
//     };

//     const handlePayloadFileChange = (e) => {
//         setPayloadFile(e.target.files[0] || null);
//     };

//     const readFileAsArray = async (file) => {
//         return new Promise((resolve) => {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const content = e.target.result;
//                 resolve(content.split('\n').filter(url => url.trim() !== ''));
//             };
//             reader.readAsText(file);
//         });
//     };

//     const startScan = async () => {
//         if (!targetUrl && !urlFile) {
//             alert('Please enter a target URL or upload a file with URLs');
//             return;
//         }

//         setIsScanning(true);
//         try {
//             const urlsToScan = urlFile ? await readFileAsArray(urlFile) : [targetUrl];
//             const payloads = payloadFile ? await readFileAsArray(payloadFile) : null;

//             const response = await apiInstance.post('/api/newScans/CORS', {
//                 urls: urlsToScan,
//                 threads,
//                 retries,
//                 delay,
//                 timeout,
//                 cookies: cookies || null,  // Better to send null than undefined
//                 payloads: payloads || null,
//                 userId  // Or get from your auth state
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });

//             const results = await response.json();
//             setScanResults(results);
//         } catch (error) {
//             console.error('Scan failed:', error);
//             alert('Scan failed. See console for details.');
//         } finally {
//             setIsScanning(false);
//         }
//     };

//     return (
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Hidden-Files-Reconnaissance Scanning</h2>

//             {/* Target URL Section */}
//             <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Target URL</label>
//                 <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
//                     placeholder="Enter target URL (e.g., https://example.com)"
//                     value={targetUrl}
//                     onChange={(e) => setTargetUrl(e.target.value)}
//                     disabled={!!urlFile}
//                 />
//             </div>

//             {/* Custom Selection Toggle */}
//             <div className="flex items-center mb-4">
//                 <input
//                     type="checkbox"
//                     id="custom-toggle"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     checked={useCustom}
//                     onChange={() => setUseCustom(!useCustom)}
//                 />
//                 <label htmlFor="custom-toggle" className="ml-2 block text-sm text-gray-700 font-medium">
//                     Custom Selection
//                 </label>
//             </div>

//             {/* Custom Options */}
//             {useCustom && (
//                 <div className="border border-gray-200 rounded-lg p-4 mb-6">
//                     {/* File Uploads */}
//                     <div className="space-y-4 mb-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Upload URL file</label>
//                             <div className="flex items-center">
//                                 <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-500 rounded-lg border border-blue-500 cursor-pointer hover:bg-blue-50">
//                                     <span className="text-sm">{urlFile?.name || 'Choose File'}</span>
//                                     <input type="file" className="hidden" onChange={handleUrlFileChange} accept=".txt,.csv" />
//                                 </label>
//                                 <span className="ml-2 text-sm text-gray-500">{urlFile ? '' : 'No file chosen'}</span>
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Upload payloads file</label>
//                             <div className="flex items-center">
//                                 <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-500 rounded-lg border border-blue-500 cursor-pointer hover:bg-blue-50">
//                                     <span className="text-sm">{payloadFile?.name || 'Choose File'}</span>
//                                     <input type="file" className="hidden" onChange={handlePayloadFileChange} accept=".txt,.csv" />
//                                 </label>
//                                 <span className="ml-2 text-sm text-gray-500">{payloadFile ? '' : 'No file chosen'}</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Scan Settings */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Threads (1-100)</label>
//                             <input
//                                 type="number"
//                                 min="1"
//                                 max="100"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 value={threads}
//                                 onChange={(e) => setThreads(parseInt(e.target.value))}
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Retries (1-10)</label>
//                             <input
//                                 type="number"
//                                 min="1"
//                                 max="10"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 value={retries}
//                                 onChange={(e) => setRetries(parseInt(e.target.value))}
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Delay (0.3-10 seconds)</label>
//                             <input
//                                 type="number"
//                                 min="0.3"
//                                 max="10"
//                                 step="0.1"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 value={delay}
//                                 onChange={(e) => setDelay(parseFloat(e.target.value))}
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Timeout (1-300 seconds)</label>
//                             <input
//                                 type="number"
//                                 min="1"
//                                 max="300"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 value={timeout}
//                                 onChange={(e) => setTimeout(parseInt(e.target.value))}
//                             />
//                         </div>

//                         <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Enter cookies (optional)</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 placeholder="key=value; key2=value2"
//                                 value={cookies}
//                                 onChange={(e) => setCookies(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Scan Button */}
//             <button
//                 onClick={startScan}
//                 disabled={isScanning}
//                 className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isScanning ? 'opacity-70 cursor-not-allowed' : ''}`}
//             >
//                 {isScanning ? (
//                     <span className="flex items-center justify-center">
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Scanning...
//                     </span>
//                 ) : 'Start Scan'}
//             </button>

//             {/* Results Section */}
//             {scanResults.length > 0 && (
//                 <div className="mt-8">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">Scan Results</h3>
//                     <Result_Table data={scanResults} className="w-full" />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CORS;
import React, { useEffect, useState } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiClock, FiSearch } from 'react-icons/fi';
import SmartLoader from '../../../components/Loader/SmartLoader';
import { Switch } from '@headlessui/react';
import apiInstance from '../../../api/instance';

const CORS = () => {
    const [targetUrl, setTargetUrl] = useState('');
    const [useCustom, setUseCustom] = useState(false);
    const [threads, setThreads] = useState(15);
    const [retries, setRetries] = useState(3);
    const [delay, setDelay] = useState(0.3);
    const [timeout, setTimeout] = useState(30);
    const [cookies, setCookies] = useState('');
    const [urlFile, setUrlFile] = useState(null);
    const [payloadFile, setPayloadFile] = useState(null);
    const [scanResults, setScanResults] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [userId, setUserId] = useState();
    const [scanStatus, setScanStatus] = useState('Ready to start scan');
    const [scanStartTime, setScanStartTime] = useState(null);
    const [scanEndTime, setScanEndTime] = useState(null);
    const [scanDuration, setScanDuration] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem("userId");
        setUserId(id);
    }, []);

    const handleUrlFileChange = (e) => {
        setUrlFile(e.target.files[0] || null);
    };

    const handlePayloadFileChange = (e) => {
        setPayloadFile(e.target.files[0] || null);
    };

    const readFileAsArray = async (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                resolve(content.split('\n').filter(url => url.trim() !== ''));
            };
            reader.readAsText(file);
        });
    };

    // Dummy message states
    const [showDummyMessage, setShowDummyMessage] = useState(true);
    const [dummyMessage, setDummyMessage] = useState({
        title: "Welcome to CORS Scanner",
        content: "Enter a target URL above to begin scanning for CORS vulnerabilities.",
        icon: <FiSearch className="w-12 h-12 mb-4" style={{ color: '#04D2D2' }} />,
        color: 'text-gray-300'
    });

    useEffect(() => {
        if (isScanning) {
            setDummyMessage({
                title: "Scanning in Progress",
                content: "Please wait while we scan the target URLs...",
                icon: <FiClock className="w-12 h-12 mb-4 animate-pulse" style={{ color: '#04D2D2' }} />,
                color: 'text-gray-300'
            });
        } else if (error) {
            setDummyMessage({
                title: "Error Occurred",
                content: error,
                icon: <FiAlertTriangle className="w-12 h-12 mb-4" style={{ color: '#ef4444' }} />,
                color: 'text-red-400'
            });
        } else if (scanResults.length > 0) {
            setShowDummyMessage(false);
        } else {
            setDummyMessage({
                title: "Welcome to CORS Scanner",
                content: "Enter a target URL above to begin scanning for CORS vulnerabilities.",
                icon: <FiSearch className="w-12 h-12 mb-4" style={{ color: '#04D2D2' }} />,
                color: 'text-gray-300'
            });
        }
    }, [isScanning, error, scanResults]);

    const startScan = async () => {
        if (!targetUrl && !urlFile) {
            setError('Please enter a target URL or upload a file with URLs');
            return;
        }

        setIsScanning(true);
        setError(null);
        setScanStartTime(new Date());
        setScanEndTime(null);
        setScanDuration(null);
        setScanStatus(`Scanning URL: ${targetUrl || 'uploaded file'}...`);

        try {
            let urlsToScan = [];
            if (urlFile) {
                urlsToScan = await readFileAsArray(urlFile);
            } else {
                urlsToScan = [targetUrl];
            }

            const formData = new FormData();
            formData.append('domains', JSON.stringify(urlsToScan));
            formData.append('threads', threads);
            formData.append('retries', retries);
            formData.append('delay', delay);
            formData.append('timeout', timeout);
            formData.append('userId', userId);
            if (cookies) formData.append('cookies', cookies);
            if (payloadFile) formData.append('payloads', payloadFile);

            const response = await apiInstance.post('/api/newScans/CORS', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            const endTime = new Date();
            setScanEndTime(endTime);
            setScanDuration((endTime - scanStartTime) / 1000);
            setScanStatus('Scan completed successfully');

            // Handle the response based on your API structure
            if (response.data && response.data.results) {
                setScanResults(response.data.results);
            } else {
                setError('Unexpected response format from server');
            }
        } catch (error) {
            console.error('Scan failed:', error);
            const errorMsg = error.response?.data?.detail ||
                error.response?.data?.message ||
                error.message ||
                'Failed to scan target';
            setError(errorMsg);
            setScanStatus('Scan failed');
        } finally {
            setIsScanning(false);
        }
    };

    // Function to get severity color
    const getSeverityColor = (severity) => {
        switch (severity.toLowerCase()) {
            case 'high':
                return 'bg-red-900/30 text-red-400';
            case 'medium':
                return 'bg-yellow-900/30 text-yellow-400';
            case 'low':
                return 'bg-blue-900/30 text-blue-400';
            default:
                return 'bg-gray-900/30 text-gray-400';
        }
    };

    return (
        <div className="min-h-screen bg-[#0E1427] px-4">
            {/* Header */}
            <h2 className="text-[#04D2D2] border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
                CORS Scanner
                <p className="text-gray-500 text-[14px]">Cross-Origin Resource Sharing vulnerability scanning tool</p>
            </h2>

            {/* Target URL Section */}
            <div className="flex gap-3 mb-3">
                <input
                    type="text"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="Enter target URL..."
                    className="flex-1 text-gray-400 px-4 py-2 rounded border"
                    style={{
                        backgroundColor: '#040C1F',
                        borderColor: '#4C566A',
                        fontWeight: 'bold'
                    }}
                    disabled={!!urlFile}
                />
                <button
                    onClick={startScan}
                    className="px-6 py-2 rounded font-medium focus:outline-none focus:ring-2 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#04D2D2', color: '#0E1427' }}
                    disabled={isScanning}
                >
                    {isScanning ? 'Scanning...' : 'Start Scan'}
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
                {isScanning && (
                    <SmartLoader scanType="CORS" isLoading={true} />
                )}
            </div>

            {/* Custom Selection Toggle */}
            <div className="mb-3 p-3 rounded border flex items-center justify-between" style={{
                backgroundColor: '#040C1F',
                borderColor: '#4C566A'
            }}>
                <label htmlFor="custom-toggle" className="block text-gray-300 font-medium">
                    Custom Selection
                </label>
                <Switch
                    checked={useCustom}
                    onChange={setUseCustom}
                    className={`${useCustom ? 'bg-[#04D2D2]' : 'bg-gray-600'}
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#04D2D2]`}
                >
                    <span
                        className={`${useCustom ? 'translate-x-6' : 'translate-x-1'}
                          inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                </Switch>
            </div>

            {/* Custom Options */}
            {useCustom && (
                <div className="mb-6 p-4 rounded border" style={{
                    backgroundColor: '#040C1F',
                    borderColor: '#4C566A'
                }}>
                    {/* File Uploads */}
                    <div className="space-y-4 flex gap-10 mb-6">
                        <div>
                            <label className="block text-gray-300 font-medium mb-1">Upload URL file</label>
                            <div className="flex items-center">
                                <label className="flex flex-col items-center px-4 py-2 rounded border cursor-pointer hover:bg-[#0E1427]"
                                    style={{ borderColor: '#4C566A', color: '#04D2D2' }}>
                                    <span className="text-sm">{urlFile?.name || 'Choose File'}</span>
                                    <input type="file" className="hidden" onChange={handleUrlFileChange} accept=".txt,.csv" />
                                </label>
                                <span className="ml-2 text-sm text-gray-500">{urlFile ? '' : 'No file chosen'}</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-300 font-medium mb-1">Upload payloads file</label>
                            <div className="flex items-center">
                                <label className="flex flex-col items-center px-4 py-2 rounded border cursor-pointer hover:bg-[#0E1427]"
                                    style={{ borderColor: '#4C566A', color: '#04D2D2' }}>
                                    <span className="text-sm">{payloadFile?.name || 'Choose File'}</span>
                                    <input type="file" className="hidden" onChange={handlePayloadFileChange} accept=".txt,.csv" />
                                </label>
                                <span className="ml-2 text-sm text-gray-500">{payloadFile ? '' : 'No file chosen'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Scan Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-300 font-medium mb-1">Threads (1-100)</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                className="w-full px-3 py-2 rounded border text-gray-400"
                                style={{
                                    backgroundColor: '#0E1427',
                                    borderColor: '#4C566A'
                                }}
                                value={threads}
                                onChange={(e) => setThreads(parseInt(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 font-medium mb-1">Retries (1-10)</label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                className="w-full px-3 py-2 rounded border text-gray-400"
                                style={{
                                    backgroundColor: '#0E1427',
                                    borderColor: '#4C566A'
                                }}
                                value={retries}
                                onChange={(e) => setRetries(parseInt(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 font-medium mb-1">Delay (0.3-10 seconds)</label>
                            <input
                                type="number"
                                min="0.3"
                                max="10"
                                step="0.1"
                                className="w-full px-3 py-2 rounded border text-gray-400"
                                style={{
                                    backgroundColor: '#0E1427',
                                    borderColor: '#4C566A'
                                }}
                                value={delay}
                                onChange={(e) => setDelay(parseFloat(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 font-medium mb-1">Timeout (1-300 seconds)</label>
                            <input
                                type="number"
                                min="1"
                                max="300"
                                className="w-full px-3 py-2 rounded border text-gray-400"
                                style={{
                                    backgroundColor: '#0E1427',
                                    borderColor: '#4C566A'
                                }}
                                value={timeout}
                                onChange={(e) => setTimeout(parseInt(e.target.value))}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-300 font-medium mb-1">Enter cookies (optional)</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 rounded border text-gray-400"
                                style={{
                                    backgroundColor: '#0E1427',
                                    borderColor: '#4C566A'
                                }}
                                placeholder="key=value; key2=value2"
                                value={cookies}
                                onChange={(e) => setCookies(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="mb-6 p-3 rounded text-red-400" style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)'
                }}>
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

            {/* Results Section */}
            {scanResults.length > 0 && !isScanning && (
                <div className="space-y-4 mb-5">
                    <h2 className="text-xl font-semibold" style={{ color: '#04D2D2' }}>
                        CORS Scan Results for <span className="text-gray-300">{targetUrl || 'uploaded file'}</span>
                    </h2>

                    <div className="rounded-lg overflow-hidden border" style={{ borderColor: '#4C566A' }}>
                        <div className="p-4" style={{ backgroundColor: '#040C1F' }}>
                            <h3 className="text-lg font-medium mb-3" style={{ color: '#04D2D2' }}>Scan Results</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead className="bg-[#0E1427]">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Host
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Origin
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Classification
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Severity
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Description
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Exploitation
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                allow_credentials
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                HTTP Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {scanResults.map((result, index) => (
                                            <tr key={index} className="hover:bg-[#0E1427]">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                                                    {result.host}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                                                    {result.origin}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                    {result.classification}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(result.severity)}`}>
                                                        {result.severity}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-400">
                                                    {result.description}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-400">
                                                    {result.exploitation}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-400">
                                                    {result.allow_credentials}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-400">
                                                    {result.http_status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CORS;