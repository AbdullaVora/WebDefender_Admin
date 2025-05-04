import React, { useEffect, useState } from 'react';
import apiInstance from '../../../api/instance';
import { FiSearch, FiClock, FiAlertTriangle } from 'react-icons/fi';
import SmartLoader from '../../../components/Loader/SmartLoader';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const WebReconScanner = () => {
    const [domain, setDomain] = useState('');
    const [status, setStatus] = useState('Ready to start scan');
    const [isScanning, setIsScanning] = useState(false);
    const [results, setResults] = useState({});
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const [scanStartTime, setScanStartTime] = useState(null);
    const [scanEndTime, setScanEndTime] = useState(null);
    const [scanDuration, setScanDuration] = useState(null);
    const [scanStatus, setScanStatus] = useState('Ready to start scan');
    const [isLoading, setIsLoading] = useState(false);
    const [showDummyMessage, setShowDummyMessage] = useState(true);
    const [dummyMessage, setDummyMessage] = useState({
        title: "Welcome to Website Recon Scanner",
        content: "Enter a target URL above to begin scanning.",
        icon: <FiSearch className="w-12 h-12 mb-4" style={{ color: '#04D2D2' }} />,
        color: 'text-gray-300'
    });

    useEffect(() => {
        const id = localStorage.getItem("userId");
        setUserId(id);
    }, []);

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
        } else if (Object.keys(results).length > 0) {
            setShowDummyMessage(false);
        } else {
            setDummyMessage({
                title: "Welcome to Website Recon Scanner",
                content: "Enter a target URL above to begin scanning",
                icon: <FiSearch className="w-12 h-12 mb-4" style={{ color: '#04D2D2' }} />,
                color: 'text-gray-300'
            });
        }
    }, [isScanning, error, results]);

    // const handleScan = async () => {
    //     if (!domain) return;

    //     setIsScanning(true);
    //     setError(null);
    //     setIsLoading(true);
    //     setScanStartTime(new Date());
    //     setScanEndTime(null);
    //     setScanDuration(null);
    //     setScanStatus(`Scanning domain: ${domain}...`);

    //     try {
    //         const response = await apiInstance.post('/api/newScans/webReconScan', { target: domain, userId }, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (response.data && response.data.status === "success") {
    //             setResults(response.data.merged_data);
    //             setScanStatus('Scan completed successfully');
    //         } else {
    //             throw new Error(response.data?.message || 'Invalid response from server');
    //         }

    //         const endTime = new Date();
    //         setScanEndTime(endTime);
    //         setScanDuration((endTime - scanStartTime) / 1000);

    //     } catch (error) {
    //         setError(error.message);
    //         setStatus('Scan failed');
    //         console.error('Error:', error);
    //     } finally {
    //         setIsLoading(false);
    //         setIsScanning(false);
    //     }
    // };

    const handleScan = async () => {
        if (!domain) return;

        setIsScanning(true);
        setError(null);
        setIsLoading(true);
        setScanStartTime(new Date());
        setScanEndTime(null);
        setScanDuration(null);
        setScanStatus(`Scanning domain: ${domain}...`);

        try {
            const response = await apiInstance.post('/api/newScans/webReconScan', { target: domain, userId }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Simplify the data handling
            const resultData = response.data.merged_data || response.data;
            if (resultData && Object.keys(resultData).length > 0) {
                setResults(resultData);
                setScanStatus('Scan completed successfully');
            } else {
                throw new Error('Received empty response data');
            }

            const endTime = new Date();
            setScanEndTime(endTime);
            setScanDuration((endTime - scanStartTime) / 1000);

        } catch (error) {
            setError(error.message || 'Failed to scan domain');
            setStatus('Scan failed');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
            setIsScanning(false);
        }
    };

    console.log(results)

    return (
        <div className="min-h-screen bg-[#0E1427] px-4">
            <h2 className="text-[#04D2D2] border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
                Website Recon Scanner
                <p className="text-gray-500 text-[14px]">Scanning Website Fingerprints</p>
            </h2>

            <div className="flex gap-3 ">
                <input
                    type="text"
                    id="domain"
                    placeholder="Enter domain..."
                    className="flex-1 text-gray-400 px-4 py-2 rounded border"
                    style={{
                        backgroundColor: '#040C1F',
                        borderColor: '#4C566A',
                        fontWeight: 'bold'
                    }}
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                />
                <button
                    onClick={handleScan}
                    disabled={isLoading}
                    className="px-6 py-2 rounded font-medium focus:outline-none focus:ring-2 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#04D2D2', color: '#0E1427' }}
                >
                    {isScanning ? 'Scanning...' : 'Start Scan'}
                </button>
            </div>

            {/* Status Box */}
            <div className="mb-6 p-4 mt-3 rounded border" style={{
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
                    <SmartLoader scanType="WebsiteRecon" isLoading={true} />
                )}
            </div>
            {error && (
                <div className="mb-6 p-4 rounded bg-red-900 text-red-100">
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

            {Object.keys(results).length > 0 && <WebReconResults data={results} />}
        </div>
    );
};

const WebReconResults = ({ data }) => {

    // In your component
    const mapContainerStyle = {
        width: '100%',
        height: '300px'
    };
    const resultData = data || {};

    console.log(resultData)

    if (!resultData || Object.keys(resultData).length === 0) {
        return (
            <div className="flex items-center justify-center my-12">
                <div className="max-w-md p-8 rounded-lg border text-center" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                    <div className="flex justify-center">
                        <FiSearch className="w-12 h-12 mb-4" style={{ color: '#04D2D2' }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#04D2D2' }}>
                        No Results Available
                    </h3>
                    <p className="text-gray-300">
                        The scan completed but no data was returned.
                    </p>
                </div>
            </div>
        );
    }

    const {
        WHOIS,
        Email_Security,
        ssl_tls,
        WAF,
        HSTS,
        Sitemap,
        Cookies,
        Tech,
        headers,
        SecFile
    } = resultData;

    return (
        <div className="mt-6 space-y-6">
            {/* Server Location Section */}
            {/* <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>Server Location</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-gray-400">city</span>
                        <p className="text-gray-300">97818, Boardman, Oregon</p>
                    </div>
                    <div>
                        <span className="text-gray-400">Country</span>
                        <p className="text-gray-300">United States</p>
                    </div>
                    <div>
                        <span className="text-gray-400">Timezone</span>
                        <p className="text-gray-300">America/Los_Angeles</p>
                    </div>
                    <div>
                        <span className="text-gray-400">Languages</span>
                        <p className="text-gray-300">en-US, es-US, haw.fr</p>
                    </div>
                    <div>
                        <span className="text-gray-400">Currency</span>
                        <p className="text-gray-300">Dollar (USD)</p>
                    </div>
                </div>
            </div> */}

            {/* WAF Section */}
            {/* Server Location & WAF Section */}
            {WAF?.results?.[0] && (
                <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                    <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>Server Location & WAF</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* WAF Details Column - Unchanged */}
                        <div>
                            <h4 className="text-md font-semibold mb-2" style={{ color: '#04D2D2' }}>WAF Information</h4>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <span className="text-gray-400">Target URL</span>
                                    <p className="text-gray-300">{WAF.results[0]['Target URL'] || 'N/A'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">WAF Detection</span>
                                    <p className="text-gray-300">
                                        {WAF.results[0]['WAF Detection Result']?.join(', ') || 'No WAF detected'}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Server</span>
                                    <p className="text-gray-300">{WAF.results[0]['Server'] || 'N/A'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Protection Methods</span>
                                    <p className="text-gray-300">{WAF.results[0]['Protection Methods'] || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Location & Map Column - Updated with iframe */}
                        <div>
                            <h4 className="text-md font-semibold mb-2" style={{ color: '#04D2D2' }}>Geographical Location</h4>

                            {/* Location Details - Unchanged */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <span className="text-gray-400">IP Address</span>
                                    <p className="text-gray-300">{WAF.results[0]['IP Information']?.['IP Address'] || 'N/A'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Location</span>
                                    <p className="text-gray-300">{WAF.results[0]['IP Information']?.['Location'] || 'N/A'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">ISP</span>
                                    <p className="text-gray-300">{WAF.results[0]['IP Information']?.['ISP'] || 'N/A'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-400">Coordinates</span>
                                    <p className="text-gray-300">
                                        {WAF.results[0]['IP Information']?.Latitude && WAF.results[0]['IP Information']?.Longitude
                                            ? `${WAF.results[0]['IP Information'].Latitude}, ${WAF.results[0]['IP Information'].Longitude}`
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Google Map iframe - Replaces the LoadScript/GoogleMap components */}
                            {WAF.results[0]['IP Information']?.Latitude && (
                                <div className="mt-2 rounded-lg overflow-hidden border" style={{ borderColor: '#4C566A' }}>
                                    <iframe
                                        title="Server Location Map"
                                        width="100%"
                                        height="250"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        src={`https://maps.google.com/maps?q=${WAF.results[0]['IP Information'].Latitude},${WAF.results[0]['IP Information'].Longitude}&z=15&output=embed`}
                                        allowFullScreen
                                    >
                                    </iframe>
                                    <div className="p-2 bg-gray-800 text-gray-300 text-sm text-center">
                                        Interactive map showing server location
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Sitemap Section */}
            {Sitemap && (
                <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                    <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>Sitemap</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-gray-400">Status</span>
                            <p className="text-gray-300">{Sitemap.sitemap_status || 'N/A'}</p>
                        </div>
                        <div>
                            <span className="text-gray-400">URLs Found</span>
                            <p className="text-gray-300">{Sitemap.sitemap_urls?.length || 0}</p>
                        </div>
                        {Sitemap.sitemap_urls && Sitemap.sitemap_urls.length > 0 && (
                            <div className="col-span-2">
                                <span className="text-gray-400">URLs</span>
                                <div className="max-h-40 overflow-y-auto">
                                    {Sitemap.sitemap_urls.map((url, index) => (
                                        <p key={index} className="text-gray-300">{url}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Cookies Section */}
            {Cookies && (
                <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                    <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>Cookies</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(Cookies).map(([key, value]) => (
                            <div key={key}>
                                <span className="text-gray-400">{key}</span>
                                <p className="text-gray-300 break-all">{value || 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Technology Stack Section */}
            {Tech && (
                <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                    <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>Technology Stack</h3>
                    {Tech.Detected_Technologies && Object.entries(Tech.Detected_Technologies).map(([category, technologies]) => (
                        <div key={category} className="mb-4">
                            <h4 className="text-md font-semibold mb-2" style={{ color: '#04D2D2' }}>{category}</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {technologies.map((tech, index) => (
                                    <div key={index}>
                                        <span className="text-gray-400">{tech.Technology}</span>
                                        <p className="text-gray-300">{tech.Version || 'N/A'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Security Files Section */}
            {SecFile && (
                <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                    <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>Security Files</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <span className="text-gray-400">robots.txt</span>
                            <pre className="text-gray-300 bg-gray-900 p-2 rounded overflow-x-auto">
                                {SecFile.robots_txt || 'N/A'}
                            </pre>
                        </div>
                        <div>
                            <span className="text-gray-400">security.txt</span>
                            <pre className="text-gray-300 bg-gray-900 p-2 rounded overflow-x-auto">
                                {SecFile.security_txt || 'N/A'}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            {/* Domain WHOIS Section */}
            {WHOIS && (
                <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                    <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>Domain Whois</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(WHOIS).map(([key, value]) => (
                            <div key={key}>
                                <span className="text-gray-400">{key}</span>
                                <p className="text-gray-300">{value || 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Email Security Section */}
            {Email_Security && (
                <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                    <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>Email Security</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(Email_Security).map(([key, value]) => (
                            <div key={key}>
                                <span className="text-gray-400">{key}</span>
                                <p className="text-gray-300">{JSON.stringify(value) || 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SSL/TLS Section */}
            {ssl_tls && (
                <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                    <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>SSL/TLS</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(ssl_tls).map(([key, value]) => (
                            <div key={key}>
                                <span className="text-gray-400">{key}</span>
                                <p className="text-gray-300">{JSON.stringify(value) || 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* HTTP Security Section */}
            <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>HTTP Security</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-gray-400">Content Security Policy</span>
                        <p className="text-gray-300">N/A</p>
                    </div>
                    <div>
                        <span className="text-gray-400">Strict Transport Policy</span>
                        <p className="text-gray-300">{HSTS?.hsts_enabled ? 'Enabled' : 'Disabled'}</p>
                    </div>
                    <div>
                        <span className="text-gray-400">X-Content-Type-Options</span>
                        <p className="text-gray-300">N/A</p>
                    </div>
                    <div>
                        <span className="text-gray-400">X-Frame-Options</span>
                        <p className="text-gray-300">{headers?.headers?.['x-frame-options'] || 'N/A'}</p>
                    </div>
                    <div>
                        <span className="text-gray-400">X-XSS-Protection</span>
                        <p className="text-gray-300">{headers?.headers?.['x-xss-protection'] || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* DNSSEC Section */}
            <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>DNSSEC</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <span className="text-gray-400">DNSKEY - Present?</span>
                        <p className="text-gray-300">No</p>
                    </div>
                    <div>
                        <span className="text-gray-400">DS - Present?</span>
                        <p className="text-gray-300">No</p>
                    </div>
                    <div>
                        <span className="text-gray-400">RRSIG - Present?</span>
                        <p className="text-gray-300">No</p>
                    </div>
                </div>
            </div>

            {/* Headers Section */}
            <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>Headers</h3>
                <div className="grid grid-cols-2 gap-4">
                    {headers?.headers && Object.entries(headers.headers).map(([key, value]) => (
                        <div key={key} className="break-words overflow-hidden">
                            <span className="text-gray-400 block mb-1">{key}</span>
                            <p className="text-gray-300 break-all whitespace-pre-wrap overflow-auto max-h-40 bg-gray-900 p-2 rounded">
                                {typeof value === 'string' ? value : JSON.stringify(value)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Tags Section */}
            <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>Social Tags</h3>
                <div>
                    <span className="text-gray-400">Title</span>
                    <p className="text-gray-300">Home of Acumetix Ars</p>
                </div>
            </div>

            {/* Threats Section */}
            <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>Threats</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-gray-400">Phishing Status</span>
                        <p className="text-green-400">No Phishing Found</p>
                    </div>
                    <div>
                        <span className="text-gray-400">Malware Status</span>
                        <p className="text-green-400">No Malwares Found</p>
                    </div>
                </div>
            </div>

            {/* TLS Security Issues Section */}
            <div className="rounded border p-4" style={{ backgroundColor: '#040C1F', borderColor: '#4C566A' }}>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#04D2D2' }}>TLS Security Issues</h3>
                <div className="flex items-center">
                    <span className="mr-2">►</span>
                    <span className="text-gray-400">Full Analysis Results</span>
                </div>
                <p className="text-gray-300 mt-2">
                    No entries available to analyze.
                    This sometimes happens when the report didn't finish generating in-time, you can try re-requesting it.
                </p>
            </div>
        </div>
    );
};

export default WebReconScanner;