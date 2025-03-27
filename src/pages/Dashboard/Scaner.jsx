


import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchResult, scanStart } from "../../store/slices/toolsSlice";
import Result_Table from "../../components/Result_Table";
import Custom_Selection from "../../components/Custom_Selection";

const Scaner = () => {
    const dispatch = useDispatch();
    const { scanResults, status } = useSelector((state) => state.tools);

    console.log("scanResults: ", scanResults)

    const location = useLocation();
    const cleanedPath = location.pathname.replace(/^\/tools\//, "").split("/scan")[0];

    const [data, setData] = useState([]);
    const [targetUrl, setTargetUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toggleBtn, setToggleBtn] = useState(false);
    const [progress, setProgress] = useState(0);
    const [filterText, setFilterText] = useState("");
    const [sortCriteria, setSortCriteria] = useState("domain"); // Default sorting criteria
    const [enabled, setEnabled] = useState(false);
    const [customValues, setCustomValues] = useState({
        proxy: "No",
        proxyValue: "",
        database: "No",
        techniques: [],
        urlFileContent: null,
        payloadsFileContent: null
    });

    // Handle custom values change from the Custom_Selection component
    const handleCustomValuesChange = (values) => {
        setCustomValues(values);
    };

    useEffect(() => {
        let interval;
        if (isLoading) {
            setProgress(0);
            interval = setInterval(() => {
                setProgress((prev) => (prev < 100 ? prev + 10 : 100));
            }, 1000);
        } else {
            clearInterval(interval);
            setProgress(100);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        if (Array.isArray(scanResults)) {
            const normalizedData = scanResults.flat(); // Flatten to remove extra nesting
            console.log("normalized data: ", normalizedData)
            setData(normalizedData);
        } else {
            setData([]); // Handle invalid data
        }
    }, [scanResults]);

    useEffect(() => {
        setData([]);
        setTargetUrl("");
        setProgress(0);
        setToggleBtn(false);
        setIsLoading(false);
        setEnabled(false);
        setCustomValues({
            proxy: "No",
            proxyValue: "",
            database: "No",
            techniques: [],
            urlFileContent: null,
            payloadsFileContent: null
        });
    }, [location.pathname]);

    // const handleStartScan = () => {
    //     // Check if targetUrl is empty and no URL file content
    //     if (!targetUrl.trim() && !customValues.urlFileContent) {
    //         alert("Please enter a target URL or upload a URL file");
    //         return;
    //     }

    //     setIsLoading(true);
    //     setToggleBtn(true);
    //     setProgress(0);

    //     // Prepare the scan payload
    //     const scanPayload = {
    //         domain: targetUrl,
    //         path: cleanedPath,
    //         custom: enabled ? {
    //             proxy: customValues.proxy === "Yes" ? customValues.proxyValue : null,
    //             database: customValues.database === "Yes",
    //             techniques: customValues.techniques && customValues.techniques.length > 0 ? customValues.techniques : null,
    //             urls: customValues.urlFileContent || null,
    //             payloads: customValues.payloadsFileContent || null
    //         } : null
    //     };

    //     console.log(scanPayload)

    //     dispatch(scanStart(scanPayload)).then((response) => {
    //         if (response.payload?.status === 200) {
    //             setIsLoading(false);
    //             setToggleBtn(false);
    //             console.log("Scan completed successfully.");
    //         } else {
    //             setIsLoading(false);
    //             setToggleBtn(false);
    //             console.error("Error: Invalid response status", response.payload?.status);
    //         }
    //     }).catch((error) => {
    //         setIsLoading(false);
    //         setToggleBtn(false);
    //         console.error("Error in scan request:", error);
    //     });
    // };

    const handleStartScan = () => {
        // Check if targetUrl is empty and no URL file content
        if (!targetUrl.trim() && !customValues.urlFileContent) {
            alert("Please enter a target URL or upload a URL file");
            return;
        }
    
        setIsLoading(true);
        setToggleBtn(true);
        setProgress(0);
    
        // Prepare the base scan payload
        const basePayload = {
            domain: targetUrl,
            path: cleanedPath,
        };
    
        // Add custom values if enabled
        if (enabled) {
            const customPayload = {};
    
            // Common custom values for all scan types
            if (customValues.proxy === "Yes") {
                customPayload.proxy = customValues.proxyValue;
            }
            if (customValues.urlFileContent) {
                customPayload.urls = customValues.urlFileContent;
            }
            if (customValues.payloadsFileContent) {
                customPayload.payloads = customValues.payloadsFileContent;
            }
    
            // Scan-specific custom values
            switch (cleanedPath) {
                case "SQLInjectionScanner":
                    if (customValues.database === "Yes") {
                        customPayload.database = true;
                    }
                    if (customValues.techniques && customValues.techniques.length > 0) {
                        customPayload.techniques = customValues.techniques;
                    }
                    break;
    
                case "Hidden-Files-Reconnaissance":
                    if (customValues.threads) {
                        customPayload.threads = customValues.threads;
                    }
                    if (customValues.delays) {
                        customPayload.delays = customValues.delays;
                    }
                    if (customValues.retries) {
                        customPayload.retries = customValues.retries;
                    }
                    if (customValues.timeout) {
                        customPayload.timeout = customValues.timeout;
                    }
                    if (customValues.extensions) {
                        customPayload.extensions = customValues.extensions;
                    }
                    break;
    
                // Add more cases for other scan types if needed
                default:
                    break;
            }
    
            basePayload.custom = customPayload;
        }
    
        console.log("Scan Payload:", basePayload);
    
        // Dispatch the scanStart action with the payload
        dispatch(scanStart(basePayload))
            .then((response) => {
                if (response.payload?.status === 200) {
                    setIsLoading(false);
                    setToggleBtn(false);
                    console.log("Scan completed successfully.");
                } else {
                    setIsLoading(false);
                    setToggleBtn(false);
                    console.error("Error: Invalid response status", response.payload?.status);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setToggleBtn(false);
                console.error("Error in scan request:", error);
            });
    };

    const handleStopScan = () => {
        setIsLoading(false);
        setToggleBtn(false);
        setProgress(0);
        dispatch({ type: "tools/addLog", payload: "Scan stopped by user." });
    };

    const handleClearAll = () => {
        setTargetUrl("");
        setProgress(0);
        setToggleBtn(false);
        setIsLoading(false);
        setData([]);
        setCustomValues({
            proxy: "No",
            proxyValue: "",
            database: "No",
            techniques: [],
            urlFileContent: null,
            payloadsFileContent: null
        });
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const filteredResults = (() => {
        // Check if data exists and is an array
        if (!data || !Array.isArray(data) || data.length === 0) {
            console.log("DATA IS EMPTY OR NOT AN ARRAY");
            return [];
        }

        // Create a flattened result array
        const results = [];

        // Process each item in data
        data.forEach((item, index) => {
            console.log(`PROCESSING ITEM ${index}:`, item);

            // Skip null or undefined items
            if (!item) return;

            // Handle SQL Injection Scanner results
            if (item.url) {
                // If there's a URL but vulnerable_parameters is null or empty, add a "secure" result
                if (!item.vulnerable_parameters ||
                    (Array.isArray(item.vulnerable_parameters) && item.vulnerable_parameters.length === 0)) {

                    const resultItem = {
                        type: "sql_injection_secure",
                        url: item.url,
                        status: "Secure",
                        details: "No SQL injection vulnerabilities detected"
                    };

                    // Only add if it matches the filter
                    if (!filterText ||
                        Object.values(resultItem).some(
                            value => typeof value === "string" && value.includes(filterText)
                        )) {
                        results.push(resultItem);
                    }
                }
            }

            // Find any subdomain data
            if (typeof item === 'object') {
                // Extract subdomains (try different possible paths)
                const subdomains = item.subdomains ||
                    (item.data && item.data.subdomains) ||
                    [];

                const liveSubdomains = item.live_subdomains ||
                    (item.data && item.data.live_subdomains) ||
                    [];

                // If we found subdomains, process them
                if (Array.isArray(subdomains) && subdomains.length > 0) {
                    console.log(`FOUND ${subdomains.length} SUBDOMAINS`);

                    subdomains.forEach(subdomain => {
                        // Skip null or undefined subdomains
                        if (!subdomain) return;

                        const liveSub = Array.isArray(liveSubdomains) ? liveSubdomains.find(
                            live => live && live.subdomain === subdomain
                        ) : null;

                        const resultItem = {
                            type: "subdomain",
                            domain: item.domain || "unknown",
                            subdomain,
                            ip: liveSub ? liveSub.ip : "--",
                            status: liveSub ? "200" : "404",
                        };

                        // Only add if it matches the filter
                        if (!filterText ||
                            Object.values(resultItem).some(
                                value => typeof value === "string" && value.includes(filterText)
                            )) {
                            results.push(resultItem);
                        }
                    });
                }

                // Extract vulnerable parameters (try different possible paths)
                const vulnerableParams = item.vulnerable_parameters ||
                    (item.data && item.data.vulnerable_parameters) ||
                    [];

                const payloads = item.payloads ||
                    (item.data && item.data.payloads) ||
                    [];

                // If we found vulnerable parameters, process them
                if (Array.isArray(vulnerableParams) && vulnerableParams.length > 0) {
                    console.log(`FOUND ${vulnerableParams.length} VULNERABLE PARAMETERS`);

                    vulnerableParams.forEach((param, idx) => {
                        // Skip null or undefined parameters
                        if (!param) return;

                        const resultItem = {
                            type: "sql_injection",
                            url: item.url || "unknown",
                            parameter: param,
                            payload: payloads[idx] || "N/A",
                            databases: item.databases || [],
                        };

                        // Only add if it matches the filter
                        if (!filterText ||
                            Object.values(resultItem).some(
                                value => (typeof value === "string" || Array.isArray(value)) &&
                                    JSON.stringify(value).includes(filterText)
                            )) {
                            results.push(resultItem);
                        }
                    });
                }

                // If we couldn't find expected properties, log all available properties
                if (!subdomains.length && (vulnerableParams === null || vulnerableParams.length === 0)) {
                    console.log(`NO RECOGNIZED DATA IN ITEM ${index}. AVAILABLE KEYS:`, Object.keys(item));
                }
            }
        });

        console.log(`EXTRACTED ${results.length} RESULTS:`, results);
        return results;
    })();
    console.log("Filtered Results:", filteredResults);


    const sortedResults = filteredResults.sort((a, b) => {
        if (!sortCriteria || !a[sortCriteria] || !b[sortCriteria]) return 0;

        const valueA = a[sortCriteria];
        const valueB = b[sortCriteria];

        // If values are strings, use localeCompare
        if (typeof valueA === "string" && typeof valueB === "string") {
            return valueA.localeCompare(valueB);
        }

        // If values are numbers, compare numerically
        if (typeof valueA === "number" && typeof valueB === "number") {
            return valueA - valueB;
        }

        return 0; // Default case, return no sorting
    });


    const processLogs = (rawLogs) => {
        if (!Array.isArray(rawLogs)) return [];

        return rawLogs.map((log) => {
            if (typeof log === "string") {
                // Handle string-based logs (if SQL scan logs are in string format)
                const timestampMatch = log.match(/\[(\d{2}:\d{2}:\d{2})\]/);
                const dateMatch = log.match(/\/(\d{4}-\d{2}-\d{2})\//);

                const timestamp = timestampMatch ? timestampMatch[1] : "00:00:00";
                const date = dateMatch ? dateMatch[1] : new Date().toISOString().split("T")[0];

                const event = log.includes("[INFO]") ? "INFO" : log.includes("[WARNING]") ? "WARNING" : "LOG";
                const details = log.replace(/\[.*?\]/g, "").trim();

                return { timestamp: `${date} ${timestamp}`, event, details };
            }

            if (typeof log === "object" && log.timestamp && log.event) {
                // Handle object-based logs (like in subdomain scan)
                const timestamp = new Date(log.timestamp).toISOString().replace("T", " ").split(".")[0];
                return {
                    timestamp,
                    event: log.event.toUpperCase(),
                    details: log.details || "No details provided"
                };
            }

            return { timestamp: "Unknown", event: "LOG", details: JSON.stringify(log) };
        });
    };

    // Extract logs from scanResults
    const scanLogs = data[0]?.logs ?? [];
    const logs = processLogs(scanLogs);

    return (
        <div className="main-container">
            <h2 className="text-[#04D2D2] mx-2 border-b-2 border-[#4C566A] my-3 p-3 text-xl font-bold bg-[#040C1F]">
                {cleanedPath} Scanning
            </h2>

            <div className="bg-[#040C1F] p-4 mx-2 mb-4 rounded-md border border-[#4C566A]">
                <label className="block mb-2 text-[#04D2D2] font-semibold">Target URL</label>
                <div className="flex flex-col sm:flex-row justify-between">
                    <input
                        type="text"
                        placeholder="Enter target URL (e.g., https://example.com)"
                        className="w-full sm:w-8/9 p-2 rounded-md text-white bg-[#0F172A] border border-[#4C566A]"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="flex gap-2 mt-2 sm:mt-0">
                        {!toggleBtn && (
                            <button onClick={handleStartScan} className="bg-[#04D2D2] px-4 py-2 rounded-md">
                                {isLoading ? `Scanning... ${progress}%` : "Start Scan"}
                            </button>
                        )}
                        {toggleBtn && (
                            <button onClick={handleStopScan} className="bg-red-500 px-4 py-2 rounded-md">
                                Stop Scan
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2 mt-3">
                    <span className="text-[#04D2D2] font-medium">Custom Selection</span>
                    <button
                        onClick={() => setEnabled(!enabled)}
                        className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${enabled ? "bg-[#04D2D2]" : "bg-gray-700"}`}
                    >
                        <div
                            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${enabled ? "translate-x-6" : "translate-x-0"}`}
                        />
                    </button>
                </div>

                {/* Conditionally show these inputs if enabled */}
                {enabled && (
                    <Custom_Selection
                        cleanedPath={cleanedPath}
                        onCustomValuesChange={handleCustomValuesChange}
                    />
                )}

                {/* Progress Bar */}
                {isLoading && (
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
                        <div
                            className="bg-[#04D2D2] h-2 rounded-full"
                            style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}
                        ></div>
                    </div>
                )}

                {/* Custom Values Summary (for debugging) */}
                {/* {enabled && (
                    <div className="mt-4 p-3 bg-[#0F172A] rounded-md border border-[#4C566A]">
                        <h4 className="text-[#04D2D2] font-semibold mb-2">Custom Configuration Summary:</h4>
                        <div className="text-gray-400 text-sm">
                            <p>Proxy: {customValues.proxy} {customValues.proxy === "Yes" ? `(${customValues.proxyValue})` : ""}</p>
                            <p>Extract Database: {customValues.database}</p>
                            <p>Selected Techniques: {customValues.techniques.join(", ") || "None"}</p>
                            <p>URLs File: {customValues.urlFileContent ? `${customValues.urlFileContent.length} URLs loaded` : "Not uploaded"}</p>
                            <p>Payloads File: {customValues.payloadsFileContent ? `${customValues.payloadsFileContent.length} payloads loaded` : "Not uploaded"}</p>
                        </div>
                    </div>
                )} */}
            </div>

            {/* Logs Section */}
            <div className="mx-2 mt-4 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
                <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Logs</h3>
                <div className="h-40 overflow-y-auto text-sm bg-[#0F172A] p-3 rounded-md border border-[#4C566A]">
                    {logs.length === 0 ? (
                        <p className="text-gray-500">No logs yet. Start a scan to see logs.</p>
                    ) : (
                        logs.map((log, index) => (
                            <p key={index} className={`${log.event === "WARNING" ? "text-yellow-400" : "text-gray-400"}`}>
                                [{log.timestamp}] {log.event} - {log.details}
                            </p>
                        ))
                    )}
                </div>
            </div>

            {/* Table Section */}

            <div className="mx-2 mt-4 bg-[#040C1F] rounded-md border border-[#4C566A] p-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h3 className="text-[#04D2D2] font-bold mb-3 text-lg">Scan Results</h3>
                    <div className="flex gap-2 mb-3 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search results..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="bg-[#0F172A] text-white p-2 rounded-md border border-[#4C566A]"
                        />

                        {/* Hide dropdown if no results */}
                        {sortedResults.length > 0 && (
                            <select
                                className="bg-[#0F172A] text-white p-2 rounded-md border border-[#4C566A]"
                                value={sortCriteria}
                                onChange={handleSortChange}
                            >
                                {Object.keys(sortedResults[0])
                                    .filter((key) => key !== "type") // Remove 'type' from dropdown
                                    .map((key) => (
                                        <option key={key} value={key}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </option>
                                    ))}
                            </select>
                        )}

                        <button onClick={handleClearAll} className="bg-red-500 px-4 py-2 rounded-md flex items-center">
                            <RiDeleteBin5Line className="mr-1" /> Clear All
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Result_Table sortedResults={sortedResults} scanType={cleanedPath} />
                </div>
            </div>


        </div>
    );
};

export default Scaner;