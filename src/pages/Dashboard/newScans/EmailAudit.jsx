import React, { useState, useEffect } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiClock, FiSearch } from 'react-icons/fi';
import apiInstance from '../../../api/instance';
import SmartLoader from '../../../components/Loader/SmartLoader';

const EmailAudit = () => {
    const [domain, setDomain] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [scanData, setScanData] = useState(null);
    const [error, setError] = useState(null);
    const [scanStatus, setScanStatus] = useState('Ready to start scan');
    const [scanStartTime, setScanStartTime] = useState(null);
    const [scanEndTime, setScanEndTime] = useState(null);
    const [scanDuration, setScanDuration] = useState(null);
    const [userId, setUserId] = useState();

    useEffect(() => {
        const id = localStorage.getItem("userId");
        setUserId(id)
    }, [])

    // console.log(userId)


    const handleScan = async () => {
        if (!domain) {
            setError('Please enter a domain');
            return;
        }

        setIsLoading(true);
        setError(null);
        setScanStartTime(new Date());
        setScanEndTime(null);
        setScanDuration(null);
        setScanStatus(`Scanning domain: ${domain}...`);

        try {
            const response = await apiInstance.post('/api/newScans/emailAudit', { domain, userId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }

            const data = response.data;
            const endTime = new Date();

            setScanEndTime(endTime);
            setScanDuration((endTime - scanStartTime) / 1000);
            setScanStatus('Scan completed successfully');
            setScanData(data);

        } catch (error) {
            console.error('Error during scan:', error);
            setError(error.message || 'Failed to scan domain');
            setScanStatus('Scan failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Dummy message states
    const [showDummyMessage, setShowDummyMessage] = useState(true);
    const [dummyMessage, setDummyMessage] = useState({
        title: "Welcome to Email Audit Scanner",
        content: "Enter a domain name above to begin scanning for email security records.",
        icon: <FiSearch className="w-12 h-12 mb-4" style={{ color: '#04D2D2' }} />,
        color: 'text-gray-300'
    });

    useEffect(() => {
        if (isLoading) {
            setDummyMessage({
                title: "Scanning in Progress",
                content: "Please wait while we scan the domain records...",
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
        } else if (scanData) {
            setShowDummyMessage(false);
        } else {
            setDummyMessage({
                title: "Welcome to Email Audit Scanner",
                content: "Enter a domain name above to begin scanning for email security records.",
                icon: <FiSearch className="w-12 h-12 mb-4" style={{ color: '#04D2D2' }} />,
                color: 'text-gray-300'
            });
        }
    }, [isLoading, error, scanData]);

    return (
        <div className="min-h-screen bg-[#0E1427] px-3">
            {/* Header */}
            <h2 className="text-[#04D2D2] border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
                Secure Email Audit
                <p className="text-gray-500 text-[14px]">Secure Email Audit scanning tool</p>
            </h2>
            <div className="flex gap-3 mb-3">
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter domain..."
                    className="flex-1 text-gray-400 px-4 py-2 rounded border"
                    style={{
                        backgroundColor: '#040C1F',
                        borderColor: '#4C566A',
                        fontWeight: 'bold'
                    }}
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
                <div className="mb-6 p-3 rounded text-red-400 bg-red-900 bg-opacity-30">
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

            {scanData && !isLoading && (
                <div className="space-y-8">
                    <h2 className="text-2xl font-semibold" style={{ color: '#04D2D2' }}>
                        Security Report for <span className="text-gray-300">{scanData.domain}</span>
                    </h2>

                    {/* Raw Records Table */}
                    <div className="rounded-lg overflow-hidden border" style={{ borderColor: '#4C566A' }}>
                        <div className="p-4" style={{ backgroundColor: '#040C1F' }}>
                            <h3 className="text-lg font-medium mb-3" style={{ color: '#04D2D2' }}>Raw Records</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ backgroundColor: '#0E1427' }}>
                                            <th className="px-4 py-2 text-left" style={{ color: '#04D2D2', borderColor: '#4C566A' }}>Record</th>
                                            <th className="px-4 py-2 text-left" style={{ color: '#04D2D2', borderColor: '#4C566A' }}>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ borderColor: '#4C566A' }}>
                                            <td className="px-4 py-2 font-medium text-gray-300 border" style={{ borderColor: '#4C566A' }}>SPF (Raw)</td>
                                            <td className="px-4 py-2 text-gray-400 border" style={{ borderColor: '#4C566A' }}>{scanData.SPF?.raw}</td>
                                        </tr>
                                        <tr style={{ borderColor: '#4C566A' }}>
                                            <td className="px-4 py-2 font-medium text-gray-300 border" style={{ borderColor: '#4C566A' }}>DKIM (Raw)</td>
                                            <td className="px-4 py-2 text-gray-400 border" style={{ borderColor: '#4C566A' }}>{scanData.DKIM?.raw}</td>
                                        </tr>
                                        <tr style={{ borderColor: '#4C566A' }}>
                                            <td className="px-4 py-2 font-medium text-gray-300 border" style={{ borderColor: '#4C566A' }}>DMARC (Raw)</td>
                                            <td className="px-4 py-2 text-gray-400 border" style={{ borderColor: '#4C566A' }}>{scanData.DMARC?.raw}</td>
                                        </tr>
                                        <tr style={{ borderColor: '#4C566A' }}>
                                            <td className="px-4 py-2 font-medium text-gray-300 border" style={{ borderColor: '#4C566A' }}>MX</td>
                                            <td className="px-4 py-2 text-gray-400 border" style={{ borderColor: '#4C566A' }}>
                                                {scanData.MX?.map((mx, index) => (
                                                    <div key={index}>{mx}</div>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr style={{ borderColor: '#4C566A' }}>
                                            <td className="px-4 py-2 font-medium text-gray-300 border" style={{ borderColor: '#4C566A' }}>DNSSEC</td>
                                            <td className="px-4 py-2 text-gray-400 border" style={{ borderColor: '#4C566A' }}>{scanData.DNSSEC}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* SPF Breakdown */}
                    {scanData.SPF?.parsed && (
                        <div className="rounded-lg overflow-hidden border" style={{ borderColor: '#4C566A' }}>
                            <div className="p-4" style={{ backgroundColor: '#040C1F' }}>
                                <h3 className="text-lg font-medium mb-3" style={{ color: '#04D2D2' }}>SPF Record Breakdown</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr style={{ backgroundColor: '#0E1427' }}>
                                                <th className="px-4 py-2 text-left" style={{ color: '#04D2D2', borderColor: '#4C566A' }}>Tag</th>
                                                <th className="px-4 py-2 text-left" style={{ color: '#04D2D2', borderColor: '#4C566A' }}>TagValue</th>
                                                <th className="px-4 py-2 text-left" style={{ color: '#04D2D2', borderColor: '#4C566A' }}>Name</th>
                                                <th className="px-4 py-2 text-left" style={{ color: '#04D2D2', borderColor: '#4C566A' }}>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(scanData.SPF.parsed).map(([tag, data]) => (
                                                <tr key={tag} style={{ borderColor: '#4C566A' }}>
                                                    <td className="px-4 py-2 text-gray-300 border" style={{ borderColor: '#4C566A' }}>{tag}</td>
                                                    <td className="px-4 py-2 text-gray-400 border" style={{ borderColor: '#4C566A' }}>{data.value}</td>
                                                    <td className="px-4 py-2 text-gray-400 border" style={{ borderColor: '#4C566A' }}>{data.name}</td>
                                                    <td className="px-4 py-2 text-gray-400 border" style={{ borderColor: '#4C566A' }}>{data.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DMARC Breakdown */}
                    {scanData.DMARC?.parsed && (
                        <div className="rounded-lg overflow-hidden border" style={{ borderColor: '#4C566A' }}>
                            <div className="p-4" style={{ backgroundColor: '#040C1F' }}>
                                <h3 className="text-lg font-medium mb-3" style={{ color: '#04D2D2' }}>DMARC Record Breakdown</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr style={{ backgroundColor: '#0E1427' }}>
                                                <th className="px-4 py-2 text-left" style={{ color: '#04D2D2', borderColor: '#4C566A' }}>Tag</th>
                                                <th className="px-4 py-2 text-left" style={{ color: '#04D2D2', borderColor: '#4C566A' }}>TagValue</th>
                                                <th className="px-4 py-2 text-left" style={{ color: '#04D2D2', borderColor: '#4C566A' }}>Name</th>
                                                <th className="px-4 py-2 text-left" style={{ color: '#04D2D2', borderColor: '#4C566A' }}>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(scanData.DMARC.parsed).map(([tag, data]) => (
                                                <tr key={tag} style={{ borderColor: '#4C566A' }}>
                                                    <td className="px-4 py-2 text-gray-300 border" style={{ borderColor: '#4C566A' }}>{tag}</td>
                                                    <td className="px-4 py-2 text-gray-400 border" style={{ borderColor: '#4C566A' }}>{data.value}</td>
                                                    <td className="px-4 py-2 text-gray-400 border" style={{ borderColor: '#4C566A' }}>{data.name}</td>
                                                    <td className="px-4 py-2 text-gray-400 border" style={{ borderColor: '#4C566A' }}>{data.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Audit Summary */}
                    {scanData.AuditSummary && (
                        <div className="rounded-lg overflow-hidden border" style={{ borderColor: '#4C566A' }}>
                            <div className="p-4" style={{ backgroundColor: '#040C1F' }}>
                                <h3 className="text-lg font-medium mb-3" style={{ color: '#04D2D2' }}>Security Audit Summary</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr style={{ backgroundColor: '#0E1427' }}>
                                                <th className="px-4 py-2 text-left" style={{ color: '#04D2D2', borderColor: '#4C566A' }}>Check</th>
                                                <th className="px-4 py-2 text-left" style={{ color: '#04D2D2', borderColor: '#4C566A' }}>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(scanData.AuditSummary).map(([check, status]) => (
                                                <tr key={check} style={{ borderColor: '#4C566A' }}>
                                                    <td className="px-4 py-2 text-gray-300 border" style={{ borderColor: '#4C566A' }}>{check}</td>
                                                    <td className={`px-4 py-2 border ${status === 'Pass' ? 'text-green-400' : 'text-red-400'}`} style={{ borderColor: '#4C566A' }}>
                                                        {status === 'Pass' ? '✓' : '✗'} {status}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* JSON Output */}
                    <div className="rounded-lg overflow-hidden border" style={{ borderColor: '#4C566A' }}>
                        <div className="p-4" style={{ backgroundColor: '#040C1F' }}>
                            <h3 className="text-lg font-medium mb-3" style={{ color: '#04D2D2' }}>JSON Output</h3>
                            <pre className="p-4 rounded overflow-x-auto text-gray-400" style={{ backgroundColor: '#0E1427' }}>
                                {JSON.stringify(scanData, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailAudit;