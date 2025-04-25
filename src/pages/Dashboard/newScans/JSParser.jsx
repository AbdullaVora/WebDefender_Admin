import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiInstance from '../../../api/instance';
import SmartLoader from '../../../components/Loader/SmartLoader';

const JSParser = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [scanStartTime, setScanStartTime] = useState(null);
    const [scanEndTime, setScanEndTime] = useState(null);
    const [scanDuration, setScanDuration] = useState(null);
    const [scanStatus, setScanStatus] = useState('Ready to start scan');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id)
    })


    const scanUrl = async () => {
        if (!url) {
            setError('Please enter a URL');
            return;
        }

        setError(null);
        setIsLoading(true);
        setScanStartTime(new Date());
        setScanEndTime(null);
        setScanDuration(null);
        setScanStatus(`Scanning domain: ${url}...`);

        try {
            // Extract domain from URL
            let domain = url;
            try {
                domain = new URL(url).hostname;
            } catch (e) {
                // If URL parsing fails, use the input as is
                console.warn('Could not parse URL, using raw input:', url);
            }

            const response = await apiInstance.post('/api/newScans/JSParser', {
                userId,
                domain
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.status === "success") {
                console.log(response.data)
                setResults(response.data);
                setScanStatus('Scan completed successfully');
            } else {
                throw new Error(response.data?.message || 'Invalid response from server');
            }

            const endTime = new Date();
            setScanEndTime(endTime);
            setScanDuration((endTime - scanStartTime) / 1000);

        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Failed to scan URL. Please try again.';
            setError(errorMessage);
            setResults(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0E1427] px-3">
            {/* Header */}
            <h2 className="text-[#04D2D2] border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
                JS Parser Scanner
                <p className="text-gray-500 text-[14px]">Scanning All Javascrpit From Website</p>
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
                />
                <button
                    onClick={scanUrl}
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
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                        <SmartLoader isLoading="JSParser" />
                    </div>
                )}
            </div>
            {error && (
                <div className="mb-6 p-4 rounded bg-red-900 text-red-100">
                    {error}
                </div>
            )}

            {/* Results Section */}
            <div className="space-y-4">
                {results?.results?.length > 0 && results.results.map((result, index) => (
                    <div
                        key={index}
                        className="p-4 rounded border text-gray-400"
                        style={{
                            backgroundColor: '#040C1F',
                            borderColor: '#4C566A',
                        }}
                    >
                        <div className="font-bold mb-2 break-all text-[#04D2D2]">{result.url}</div>
                        <div
                            className="whitespace-pre-wrap bg-gray-900 p-3 rounded text-gray-300 font-mono text-sm overflow-auto"
                            style={{
                                maxHeight: '300px',
                                wordBreak: 'break-word'
                            }}
                        >
                            {result.secrets || "No secrets found"}
                        </div>
                    </div>
                ))}

            </div>
            {/* Scan Status */}
            {isLoading && !results && (
                <div className="text-gray-400 text-sm mt-6">
                    Scanning started at {scanStartTime.start?.toLocaleTimeString()}...
                </div>
            )}
        </div>
    );
};

export default JSParser;