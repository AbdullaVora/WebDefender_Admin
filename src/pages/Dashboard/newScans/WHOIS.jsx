import React, { useState, useEffect } from 'react';
import apiInstance from '../../../api/instance';
import SmartLoader from '../../../components/Loader/SmartLoader';

const WHOIS = () => {
    const [domain, setDomain] = useState('');
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [scanDuration, setScanDuration] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id)
    })

    const handleScan = async () => {
        if (!domain) {
            setError('Please enter a domain name');
            return;
        }

        setScanning(true);
        setError(null);
        setStartTime(new Date());
        setEndTime(null);
        setScanDuration(null);

        try {
            const cleanDomain = domain.replace(/^https?:\/\//i, '').trim();
            const response = await apiInstance.post('/api/newScans/whois', {
                domain: cleanDomain,
                userId: userId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const end = new Date();
            setEndTime(end);
            setScanDuration((end - startTime) / 1000); // in seconds

            if (response.data.status === 'success') {
                setResult(response.data.data);
            } else {
                setError(response.data.message || 'Failed to scan domain');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.detail?.[0]?.msg
                || err.message
                || 'An error occurred while scanning the domain';
            setError(errorMessage);
        } finally {
            setScanning(false);
        }
    };

    // Format time display
    const formatTime = (time) => {
        return time ? time.toLocaleTimeString() : '--:--:--';
    };

    return (
        <div className="bg-[#0E1427]">
            <h2 className="text-[#04D2D2] mx-3 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
                WHOIS Lookup
                <p className="text-gray-500 text-[14px]">Domain registration information lookup tool</p>
            </h2>

            <div className="flex mx-3 gap-3 mb-3">
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter domain name (e.g., example.com)"
                    className="bg-[#0F172A] w-[1158px] text-gray-400 fw-semibold p-2 rounded-md border border-[#4C566A]"
                />
                <button
                    onClick={handleScan}
                    disabled={scanning}
                    className={`px-6 py-2 rounded-md font-medium ${scanning ? 'bg-gray-400' : 'bg-[#04D2D2] hover:bg-[#04d2d2cc]'} transition-colors`}
                >
                    {scanning ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Scanning...
                        </span>
                    ) : 'Start Scan'}
                </button>
            </div>

            {/* Time Tracking Boxes */}
            <div className="grid grid-cols-3 mx-3 gap-3 mb-6">
                <div className="rounded-xl border-[#4C566A] border-2 hover:shadow-[0px_0px_8px_#04D2D2] transition-all delay-100 bg-[#040C1F] text-white p-3">
                    <h3 className="text-sm font-semibold text-[#04D2D2] mb-1">Start Time</h3>
                    <p className="text-gray-400 text-sm">
                        {startTime ? startTime.toLocaleTimeString() : 'Not started'}
                    </p>
                </div>
                <div className="rounded-xl border-[#4C566A] border-2 hover:shadow-[0px_0px_8px_#04D2D2] transition-all delay-100 bg-[#040C1F] text-white p-3">
                    <h3 className="text-sm font-semibold text-[#04D2D2] mb-1">End Time</h3>
                    <p className="text-gray-400 text-sm">
                        {endTime ? endTime.toLocaleTimeString() : 'Not completed'}
                    </p>
                </div>
                <div className="rounded-xl border-[#4C566A] border-2 hover:shadow-[0px_0px_8px_#04D2D2] transition-all delay-100 bg-[#040C1F] text-white p-3">
                    <h3 className="text-sm font-semibold text-[#04D2D2] mb-1">Scan Duration</h3>
                    <p className="text-gray-400 text-sm">
                        {scanDuration ? `${scanDuration.toFixed(2)} seconds` : '--'}
                    </p>
                </div>
            </div>

            {error && (
                <div className="mx-3 mb-6 p-4 bg-red-900/20 text-red-400 rounded-md border border-red-800">
                    {error}
                </div>
            )}

            {!result && !scanning && (
                <div className="mx-3 mb-6 p-10 rounded-xl border-[#4C566A] border-2 bg-[#040C1F] text-center">
                    <p className="text-gray-400">Start a WHOIS scan to view domain information</p>
                </div>
            )}

            {scanning && (
                <div className="mx-3 mb-6 p-10 rounded-xl border-[#4C566A] border-2 bg-[#040C1F] text-center">
                    <SmartLoader scanType="GoogleHacking" isLoading={true} />
                    <p className="text-gray-400 mt-3">Scanning domain information...</p>
                </div>
            )}

            {result && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-3 gap-4">
                    {/* Domain Information Box */}
                    <div className="rounded-xl border-[#4C566A] border-2 hover:shadow-[0px_0px_8px_#04D2D2] transition-all delay-100 bg-[#040C1F] text-white p-5">
                        <h2 className="text-lg font-semibold text-[#04D2D2] mb-3 pb-2 border-b border-gray-400">DOMAIN INFORMATION</h2>
                        <div className="space-y-2">
                            <InfoRow label="Domain Name" value={result.domain_name} />
                            <InfoRow label="Registrar" value={result.registrar} />
                            <InfoRow label="Registrar URL" value={result.registrar_url} />
                            <InfoRow label="Whois Server" value={result.whois_server || 'N/A'} />
                        </div>
                    </div>

                    {/* Dates Box */}
                    <div className="rounded-xl border-[#4C566A] border-2 hover:shadow-[0px_0px_8px_#04D2D2] transition-all delay-100 bg-[#040C1F] text-white p-5">
                        <h2 className="text-lg font-semibold text-[#04D2D2] mb-3 pb-2 border-b border-gray-400">DATES</h2>
                        <div className="space-y-2">
                            <InfoRow label="Created" value={result.creation_date} />
                            <InfoRow label="Updated" value={result.updated_date} />
                            <InfoRow label="Expires" value={result.expiration_date} />
                        </div>
                    </div>

                    {/* Status & Security Box */}
                    <div className="rounded-xl border-[#4C566A] border-2 hover:shadow-[0px_0px_8px_#04D2D2] transition-all delay-100 bg-[#040C1F] text-white p-5">
                        <h2 className="text-lg font-semibold text-[#04D2D2] mb-3 pb-2 border-b border-gray-400">STATUS & SECURITY</h2>
                        <div className="space-y-2">
                            <InfoRow label="Status" value={result.status} />
                            <InfoRow label="DNSSEC" value={result.dnssec} />
                        </div>
                    </div>

                    {/* Contact Emails Box */}
                    <div className="rounded-xl border-[#4C566A] border-2 hover:shadow-[0px_0px_8px_#04D2D2] transition-all delay-100 bg-[#040C1F] text-white p-5">
                        <h2 className="text-lg font-semibold text-[#04D2D2] mb-3 pb-2 border-b border-gray-400">CONTACT EMAILS</h2>
                        <div className="space-y-2">
                            <InfoRow label="Emails" value={result.emails} />
                        </div>
                    </div>

                    {/* Registrant Information Box */}
                    <div className="rounded-xl border-[#4C566A] border-2 hover:shadow-[0px_0px_8px_#04D2D2] transition-all delay-100 bg-[#040C1F] text-white p-5">
                        <h2 className="text-lg font-semibold text-[#04D2D2] mb-3 pb-2 border-b border-gray-400">REGISTRANT INFORMATION</h2>
                        <div className="space-y-2">
                            <InfoRow label="Name" value={result.name || 'REDACTED FOR PRIVACY'} />
                            <InfoRow label="Organization" value={result.org || 'REDACTED FOR PRIVACY'} />
                            <InfoRow label="Address" value={result.address || 'REDACTED FOR PRIVACY'} />
                            <InfoRow label="City" value={result.city || 'REDACTED FOR PRIVACY'} />
                            <InfoRow label="State" value={result.state || 'REDACTED FOR PRIVACY'} />
                            <InfoRow label="Postal Code" value={result.registrant_postal_code || 'REDACTED FOR PRIVACY'} />
                            <InfoRow label="Country" value={result.country} />
                        </div>
                    </div>

                    {/* Name Servers Box */}
                    <div className="rounded-xl border-[#4C566A] border-2 hover:shadow-[0px_0px_8px_#04D2D2] transition-all delay-100 bg-[#040C1F] text-white p-5">
                        <h2 className="text-lg font-semibold text-[#04D2D2] mb-3 pb-2 border-b border-gray-400">NAME SERVERS</h2>
                        <div className="space-y-2">
                            <InfoRow label="Name Servers" value={result.name_servers} />
                        </div>
                    </div>

                    {/* Hosting Provider Box */}
                    <div className="rounded-xl border-[#4C566A] border-2 hover:shadow-[0px_0px_8px_#04D2D2] transition-all delay-100 bg-[#040C1F] text-white p-5">
                        <h2 className="text-lg font-semibold text-[#04D2D2] mb-3 pb-2 border-b border-gray-400">HOSTING PROVIDER</h2>
                        <div className="space-y-2">
                            <InfoRow label="Hosting Provider" value={result.hosting_provider || 'N/A'} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// InfoRow component remains the same
const InfoRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1">
        <span className="text-sm font-medium text-gray-400 sm:w-32 flex-shrink-0">{label}:</span>
        <span className="text-sm text-gray-400 break-all">{value}</span>
    </div>
);

export default WHOIS;