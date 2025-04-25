import React from "react";

const Result_Table = ({ sortedResults, scanType }) => {
    console.log("sorted", sortedResults)
    console.log("scan type", scanType)
    return (
        <table className="min-w-full text-sm mt-4 text-left text-gray-400">
            <thead className="text-xs uppercase bg-[#0F172A] text-gray-200">
                <tr>
                    <th className="px-4 py-3">No.</th>
                    {scanType === "Subdomain-Reconnaissance" && (
                        <>
                            <th className="px-4 py-3">Target URL</th>
                            <th className="px-4 py-3">Subdomain</th>
                            <th className="px-4 py-3">Domain IP</th>
                            <th className="px-4 py-3">Status Code</th>
                        </>
                    )}
                    {scanType === "SQLInjectionScanner" && (
                        <>
                            <th className="px-4 py-3">URL</th>
                            <th className="px-4 py-3">Parameter</th>
                            <th className="px-4 py-3">Payload</th>
                            <th className="px-4 py-3">Databases</th>
                        </>
                    )}
                    {scanType === "Hidden-Files-Reconnaissance" && (
                        <>
                            <th className="px-4 py-3">URL</th>
                            <th className="px-4 py-3">Redirect</th>
                            <th className="px-4 py-3">Content Type</th>
                            <th className="px-4 py-3">Content Length</th>
                            <th className="px-4 py-3">Status Code </th>
                        </>
                    )}
                    {scanType === "WAFDetector" && (
                        <>
                            <th className="px-5 py-3">URL</th>
                            <th className="px-5 py-3">IP Address</th>
                            <th className="px-5 py-3">WAF</th>
                            <th className="px-5 py-3">ISP</th>
                            <th className="px-5 py-3">Protection</th>
                            <th className="px-5 py-3">Server</th>
                            <th className="px-5 py-3">Location</th>
                            <th className="px-5 py-3">Latitude</th>
                            <th className="px-5 py-3">Longitude</th>
                            {/* <th className="px-4 py-3">Status</th> */}
                            <th className="px-18 py-3">Map</th>
                        </>
                    )}
                    {scanType === "DOM-BasedXss" && (
                        <>
                            <th className="px-4 py-3">URL</th>
                            <th className="px-4 py-3">Parameter</th>
                            <th className="px-4 py-3">Payload</th>
                            <th className="px-4 py-3">Status</th>
                        </>
                    )}
                </tr>
            </thead>
            <tbody>
                {sortedResults.length === 0 ? (
                    <tr>
                        <td colSpan={12} className="px-4 py-5 text-lg text-center text-gray-500">
                            No results.
                        </td>
                    </tr>
                ) : (
                    <>
                        {scanType === "Subdomain-Reconnaissance" &&
                            sortedResults.map((item, index) => (
                                <tr key={index} className="border-b border-[#4C566A] hover:bg-[#1E293B]">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{item.domain}</td>
                                    <td className="px-4 py-3">{item.subdomain}</td>
                                    <td className="px-4 py-3">{item.ip}</td>
                                    <td className="px-4 py-3">{item.status}</td>
                                </tr>
                            ))}

                        {scanType === "SQLInjectionScanner" &&
                            sortedResults.map((item, index) => (
                                <tr key={index} className="border-b border-[#4C566A] hover:bg-[#1E293B]">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{item.url}</td>
                                    <td className="px-4 py-3">{item.parameter}</td>
                                    <td className="px-4 py-3">{item.payload}</td>
                                    <td className="px-4 py-3">
                                        {item.databases && item.databases.length > 0 ? item.databases.join(", ") : "N/A"}
                                    </td>
                                </tr>
                            )
                            )}
                        {scanType === "Hidden-Files-Reconnaissance" &&
                            sortedResults.map((item, index) => (
                                <tr key={index} className="border-b border-[#4C566A] hover:bg-[#1E293B]">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{item.url}</td>
                                    <td className="px-4 py-3">{item.redirect}</td>
                                    <td className="px-4 py-3">{item.content_type}</td>
                                    <td className="px-4 py-3">{item.content_length}</td>
                                    <td className="px-4 py-3">{item.status}</td>
                                </tr>
                            )
                            )}
                        {scanType === "WAFDetector" && (
                            sortedResults.map((item, index) => (
                                <tr key={index} className="border-b border-[#4C566A] hover:bg-[#1E293B]">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{item.url}</td>
                                    <td className="px-4 py-3">{item.ipAddress}</td>
                                    <td className="px-4 py-3">{item.WAF}</td>
                                    <td className="px-4 py-3">{item.ISP}</td>
                                    <td className="px-4 py-3">{item.protection}</td>
                                    <td className="px-4 py-3">{item.server}</td>
                                    <td className="px-4 py-3">{item.Location}</td>
                                    <td className="px-4 py-3">{item.Latitude}</td>
                                    <td className="px-4 py-3">{item.Longitude}</td>
                                    {/* <td className="px-4 py-3">{item.status}</td> */}
                                    <td className="px-4 py-3">
                                        {item.Latitude !== "unknown" && item.Longitude !== "unknown" ? (
                                            <a
                                                href={`https://www.google.com/maps?q=${item.Latitude},${item.Longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <iframe
                                                    title="map"
                                                    width="150"
                                                    height="80"
                                                    style={{ border: 0, borderRadius: "10px" }}   
                                                    loading="lazy"
                                                    allowFullScreen
                                                    src={`https://www.google.com/maps?q=${item.Latitude},${item.Longitude}&z=14&output=embed`}
                                                ></iframe>
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>

                                </tr>
                            ))
                        )}
                        {scanType === "DOM-BasedXss" && (
                            sortedResults.map((item, index) => (
                                <tr key={index} className="border-b border-[#4C566A] hover:bg-[#1E293B]">
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{item.url}</td>
                                    <td className="px-4 py-3">{item.parameter}</td>
                                    <td className="px-4 py-3">{item.payload}</td>
                                    <td className="px-4 py-3">{item.status}</td>
                                </tr>
                            ))
                        )}
                    </>
                )}
            </tbody>
        </table>
    );
};

export default Result_Table;
