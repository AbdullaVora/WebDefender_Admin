import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  ChevronDown,
  Search,
  Shield,
  Eye,
  Trash2,
  Plus,
  FileText,
} from "lucide-react";
import PageTitle from "../../components/PageTitle";
import apiInstance from "../../api/instance";

const Reports = () => {
  // Sample data structure that matches your API response
  const [apiData, setApiData] = useState({
    subdomain_reports: [],
    sql_reports: [],
    hidden_files: [],
    Xss_Report: [],
    Waf_Report: [],
    JsParser_Report: [],
    EmailAudit_Report: [],
    Whois_Report: [],  // Add this line
  });

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [severityData, setSeverityData] = useState([]);
  const [toolData, setToolData] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id)
  }, [])


  // Fetch data from API
  useEffect(() => {
    if (!userId) return; // 🚫 Skip if userId isn't ready

    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await apiInstance.get('/api/reports', {
          params: {
            userId
          }
        });
        const data = response.data;
        setApiData(data);

        const allReports = transformApiData(data);
        setReports(allReports);

        calculateChartData(allReports);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, [userId]); // ✅ Trigger this effect only after userId is set


  const transformApiData = (data) => {
    console.log("Transforming API data:", data); // Debugging line
    const allReports = [];

    // Process each report type and map to common format
    Object.keys(data).forEach(reportType => {
      data[reportType].forEach(report => {
        // Extract target from different possible locations in the report
        const target = report.results?.[0]?.target ||
          report.results?.[0]?.url ||
          report.results?.[0]?.domain ||
          report.url ||
          report.domain ||
          report.target ||
          (report.targets && report.targets[0]) ||  // Fixed: Add null check
          report.Target_URL ||
          report["Target URL"] ||
          report.data?.domain_name ||
          report[0]?.data ||
          "Unknown target";

        console.log("Extracted target:", target);


        const commonReport = {
          id: report._id || report.id || `RPT-${Math.random().toString(36).substr(2, 8)}`,
          tool: getToolName(reportType),
          status: getStatus(report, reportType),
          timestamp: report.created_time,
          duration: report.duration || `${Math.floor(Math.random() * 20) + 1}m ${Math.floor(Math.random() * 60)}s`,
          target: target,  // Use the extracted target
          findings: report.vulnerabilities ? report.vulnerabilities.length :
            (report.issues ? report.issues.length :
              (report.files ? report.files.length :
                (report.results?.[0]?.subdomains ? report.results?.[0]?.subdomains.length : 0))),
          severity: determineSeverity(report),
          details: generateDetails(report, reportType),
          rawData: report
        };

        allReports.push(commonReport);
      });
    });

    return allReports;
  };

  // Helper function to get tool name based on report type
  const getToolName = (reportType) => {
    const toolNames = {
      subdomain_reports: "Subdomain Scanner",
      sql_reports: "SQL Injection Scanner",
      hidden_files: "Hidden Files Finder",
      Xss_Report: "XSS Scanner",
      Waf_Report: "WAF Detector",
      JsParser_Report: "JavaScript Analyzer",
      EmailAudit_Report: "Email Security Auditor",
      Whois_Report: "Whois Lookup",  // Add this line
    };
    return toolNames[reportType] || reportType;
  };

  const getStatus = (report, reportType) => {
    const statusMap = {
      sql_reports: "success",
      hidden_files: "success",
      JsParser_Report: "success",
      EmailAudit_Report: "success",
      Whois_Report: "success",  // Whois reports are always successful
    };

    if (reportType === "subdomain_reports") {
      const subdomainLength = report?.results?.[0]?.subdomains?.length || 0;
      return subdomainLength > 0 ? "Passed" : "Failed";
    } else if (reportType === "Xss_Report") {
      const xssLength = report?.vulnerabilities?.length || 0;
      return xssLength > 0 ? "Passed" : "Failed";
    } else if (reportType === "Waf_Report") {
      const allFieldsPresent =
        (report?.IP_Information ?? false) &&
        (report?.WAF_Detection_Result ?? false) &&
        (report?.Server ?? false) &&
        (report?.Protection_Methods ?? false) &&
        (report?.Status_Code ?? false);

      console.log("waf", allFieldsPresent);

      return allFieldsPresent ? "Passed" : "Failed";
    }



    return statusMap[reportType] || "unknown";
  };

  // Determine severity based on report content
  const determineSeverity = (report) => {
    if (report.severity) return report.severity;

    if (report.vulnerabilities && report.vulnerabilities.length > 0) {
      const hasCritical = report.vulnerabilities.some(v => v.severity === 'critical') || report.vulnerabilities.length > 70;
      if (hasCritical) return "Critical";

      const hasHigh = report.vulnerabilities.some(v => v.severity === 'high') || report.vulnerabilities.length > 40;
      if (hasHigh) return "High";

      const hasMedium = report.vulnerabilities.some(v => v.severity === 'medium') || report.vulnerabilities.length > 20;
      if (hasMedium) return "Medium";

      return "Low";
    }

    return "None";
  };

  // Generate details text based on report type
  const generateDetails = (report, reportType) => {
    switch (reportType) {
      case 'subdomain_reports':
        return `Found ${report.results?.[0]?.subdomains ? report.results?.[0]?.subdomains.length : 0} subdomains`;
      case 'sql_reports':
        return `Found ${report.vulnerabilities ? report.vulnerabilities.length : 0} SQL injection vulnerabilities`;
      case 'hidden_files':
        return `Found ${report.files ? report.files.length : 0} hidden files/directories`;
      case 'Xss_Report':
        return `Found ${report.vulnerabilities ? report.vulnerabilities.length : 0} XSS vulnerabilities`;
      case 'Waf_Report':
        return `WAF detection results for ${report.target || 'unknown target'}`;
      case 'JsParser_Report':
        return `Found ${report.issues ? report.issues.length : 0} JavaScript security issues`;
      case 'EmailAudit_Report':
        return `Email security audit results with ${report.issues ? report.issues.length : 0} findings`;
      case 'Whois_Report':
        return `Whois lookup results for ${report.data?.domain_name || 'unknown target'}`;
      default:
        return "Security scan completed";
    }
  };

  // Calculate chart data based on reports
  const calculateChartData = (reports) => {
    const sevData = [
      { name: "Critical", value: 0, color: "#ef4444" },
      { name: "High", value: 0, color: "#f97316" },
      { name: "Medium", value: 0, color: "#eab308" },
      { name: "Low", value: 0, color: "#06b6d4" },
      { name: "None", value: 0, color: "#22c55e" },
    ];

    reports.forEach(report => {
      const severity = report.severity || "None";
      const sevIndex = sevData.findIndex(item => item.name === severity);
      if (sevIndex !== -1) {
        sevData[sevIndex].value++;
      }
    });

    setSeverityData(sevData);

    // Calculate tool usage data
    const tools = {};
    reports.forEach(report => {
      if (tools[report.tool]) {
        tools[report.tool]++;
      } else {
        tools[report.tool] = 1;
      }
    });

    const toolDataArray = Object.keys(tools).map(tool => {
      return { name: tool, value: tools[tool] };
    });

    setToolData(toolDataArray);
  };

  const [reports, setReports] = useState([]);

  // Filter reports
  const filteredReports = reports.filter((report) => {
    let match = true;

    // Filter by search term
    if (searchTerm) {
      match =
        match &&
        (report.tool.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.target.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filter by status
    if (selectedStatus !== "all") {
      match =
        match && report.status.toLowerCase() === selectedStatus.toLowerCase();
    }

    // Filter by severity
    if (selectedSeverity !== "all") {
      match =
        match &&
        report.severity.toLowerCase() === selectedSeverity.toLowerCase();
    }

    // Filter by timeframe
    if (selectedTimeframe !== "all") {
      const reportDate = new Date(report.timestamp);
      const now = new Date();
      let cutoff = new Date();

      if (selectedTimeframe === "day") {
        cutoff.setDate(now.getDate() - 1);
      } else if (selectedTimeframe === "week") {
        cutoff.setDate(now.getDate() - 7);
      } else if (selectedTimeframe === "month") {
        cutoff.setMonth(now.getMonth() - 1);
      }

      match = match && reportDate >= cutoff;
    }

    return match;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalScans = filteredReports.length;
  const passed = filteredReports.filter((r) => r.status === "Passed").length;
  const failed = filteredReports.filter((r) => r.status === "Failed").length;
  const totalFindings = filteredReports.reduce((sum, r) => sum + r.findings, 0);

  const pieData = [
    { name: "Passed", value: passed, color: "#22c55e" },
    { name: "Failed", value: failed, color: "#ef4444" },
  ];

  const lineData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    const dateString = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const scansForDay = reports.filter((r) => {
      const reportDate = new Date(r.timestamp);
      return (
        reportDate.getDate() === date.getDate() &&
        reportDate.getMonth() === date.getMonth() &&
        reportDate.getFullYear() === date.getFullYear()
      );
    });

    return {
      name: dateString,
      Passed: scansForDay.filter((r) => r.status === "Passed").length,
      Failed: scansForDay.filter((r) => r.status === "Failed").length,
    };
  });

  const toggleReportSelection = (reportId) => {
    setSelectedReports(prev =>
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedReports([]);
    } else {
      setSelectedReports(paginatedReports.map(report => report.id));
    }
    setSelectAll(!selectAll);
  };


  const deleteSelectedReports = async () => {
    if (selectedReports.length === 0) {
      ("Please select at least one report to delete");
      return;
    }

    try {
      setDeleteLoading(true);

      // Group reports by type with enhanced validation
      const reportsByType = filteredReports
        .filter(report => selectedReports.includes(report.id))
        .reduce((acc, report) => {
          // Determine report type with multiple fallbacks
          const type = report.reportType ||
            report.type ||
            (report.tool === "XSS Scanner" ? "Xss_Report" : null) ||
            report.collectionName;

          if (!type) {
            console.error("Undetermined report type:", report);
            return acc;
          }

          const collectionName = getCollectionNameFromReportType(type);
          acc[collectionName] = [...(acc[collectionName] || []), report.id];
          return acc;
        }, {});

      // Validate we have reports to delete
      if (Object.keys(reportsByType).length === 0) {
        console.log("No reports with identifiable type information");
        return;
      }

      // Execute all delete operations
      const deleteResults = await Promise.allSettled(Object.entries(reportsByType).map(([reportType, reportIds]) =>
        apiInstance.delete('/api/reports', {
          data: {
            reportType,
            reportIds,
            user_id: userId
          }
        })
      ));

      // Check for failures
      const failedDeletes = deleteResults.filter(r => r.status === 'rejected');
      if (failedDeletes.length > 0) {
        throw new Error(`${failedDeletes.length} deletions failed`);
      }

      // Refresh data
      const { data } = await apiInstance.get('/api/reports', { params: { userId } });
      setApiData(data);
      const allReports = transformApiData(data);
      setReports(allReports);
      calculateChartData(allReports);

      // Reset UI
      setSelectedReports([]);
      setSelectAll(false);

    } catch (error) {
      console.error("Delete operation failed:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Enhanced type mapper
  function getCollectionNameFromReportType(type) {
    const typeMap = {
      // Standard mappings
      'xss': 'Xss_Report',
      'xss_scanner': 'Xss_Report',
      'domxss': 'Xss_Report',
      'sql': 'sql_reports',
      'sqli': 'sql_reports',
      'hidden': 'hidden_files',
      'waf': 'Waf_Report',
      'js': 'JsParser_Report',
      'email': 'EmailAudit_Report',
      'whois': 'Whois_Report',

      // Add any custom mappings needed
      [type.toLowerCase()]: type // Fallback to original if not mapped
    };

    return typeMap[String(type).toLowerCase().trim()] || type;
  }
  // Download report as JSON
  const downloadReport = (report) => {
    const dataStr = JSON.stringify(report.rawData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${report.tool}_${report.id}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const renderStatusBadge = (status) => {
    if (status === "Passed") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
          <CheckCircle className="w-3 h-3 mr-1" />
          Passed
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Failed
        </span>
      );
    }
  };

  const getSeverityBadge = (severity) => {
    let classes = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

    switch (severity) {
      case "Critical":
        return <span className={`${classes} bg-red-900 text-red-300`}>{severity}</span>;
      case "High":
        return <span className={`${classes} bg-orange-900 text-orange-300`}>{severity}</span>;
      case "Medium":
        return <span className={`${classes} bg-yellow-900 text-yellow-300`}>{severity}</span>;
      case "Low":
        return <span className={`${classes} bg-blue-900 text-blue-300`}>{severity}</span>;
      default:
        return <span className={`${classes} bg-green-900 text-green-300`}>{severity}</span>;
    }
  };

  // Report Details Modal
  const ReportDetailsModal = () => {
    if (!selectedReport) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-[#040C1F] border border-[#1A2335] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-[#1A2335] flex justify-between items-center">
            <h3 className="text-xl font-bold text-[#04D2D2]">
              {selectedReport.id}: {selectedReport.tool} Scan Report
            </h3>
            <button
              onClick={() => setModalOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-400">Target</p>
                <p className="text-lg text-[#04D2D2] font-medium">{selectedReport.target}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <div className="mt-1">
                  {renderStatusBadge(selectedReport.status)}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Date & Time</p>
                <p className="font-medium text-[#04D2D2]">
                  {new Date(selectedReport.timestamp).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Duration</p>
                <p className="font-medium text-[#04D2D2]">{selectedReport.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Findings</p>
                <p className="font-medium text-[#04D2D2]">{selectedReport.findings}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Severity</p>
                <div className="mt-1">
                  {getSeverityBadge(selectedReport.severity)}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-md font-medium text-[#04D2D2] mb-2">
                Details
              </h4>
              <p className="text-gray-300 bg-[#1A2335] p-4 rounded-md">
                {selectedReport.details}
              </p>
            </div>

            {selectedReport.findings > 0 && (
              <div>
                <h4 className="text-md font-medium text-[#04D2D2] mb-2">
                  Findings Preview
                </h4>
                <pre className="text-gray-300 bg-[#1A2335] p-4 rounded-md overflow-x-auto text-xs">
                  {JSON.stringify(selectedReport.rawData, null, 2).slice(0, 1000)}...
                </pre>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-[#1A2335] flex justify-end space-x-3">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-[#1A2335] hover:bg-[#253247] rounded-md text-sm transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => downloadReport(selectedReport)}
              className="flex items-center px-4 py-2 bg-[#04D2D2] hover:bg-[#03BEBE] text-black rounded-md text-sm transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Full Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main table component
  const ReportsTable = () => {
    return (
      <div className="bg-[#040C1F] rounded-xl shadow-md border border-[#1A2335]">
        <div className="p-4 md:p-6 border-b border-[#1A2335] flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-[#04D2D2]">
              Scan Reports
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Detailed list of security scan results
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {selectedReports.length > 0 && (
              <button
                onClick={deleteSelectedReports}
                disabled={deleteLoading}
                className="flex items-center px-3 py-2 bg-red-900 hover:bg-red-800 rounded-md text-sm transition-colors"
              >
                {deleteLoading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                Delete ({selectedReports.length})
              </button>
            )}
            <button
              onClick={() => window.location.reload()}
              className="flex items-center px-3 py-2 bg-[#1A2335] hover:bg-[#253247] rounded-md text-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#04D2D2]"></div>
          </div>
        ) : (
          <div className="overflow-x-auto p-4">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1A2335] text-[#04D2D2]">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 text-[#04D2D2] focus:ring-[#04D2D2] border-gray-600 rounded bg-[#1A2335]"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Tool
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Target
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Findings
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2335]">
                {paginatedReports.length > 0 ? (
                  paginatedReports.map((report) => (
                    <tr key={report.id} className="hover:bg-[#1A2335]">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedReports.includes(report.id)}
                          onChange={() => toggleReportSelection(report.id)}
                          className="h-4 w-4 text-[#04D2D2] focus:ring-[#04D2D2] border-gray-600 rounded bg-[#1A2335]"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {report.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {report.tool}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {report.target || report.results?.domain || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {renderStatusBadge(report.status)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {report.findings}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {getSeverityBadge(report.severity)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {new Date(report.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setModalOpen(true);
                          }}
                          className="text-[#04D2D2] hover:text-[#03BEBE]"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => downloadReport(report)}
                          className="text-green-400 hover:text-green-500"
                          title="Download Report"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      {filteredReports.length === 0 && reports.length > 0
                        ? "No reports match your filter criteria"
                        : "No scan reports available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-[#1A2335] bg-[#040C1F] px-4 py-3 sm:px-6 mt-4">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${page === 1
                    ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
                    : "bg-[#1A2335] text-white hover:bg-[#253247]"
                    }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className={`relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${page === totalPages
                    ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
                    : "bg-[#1A2335] text-white hover:bg-[#253247]"
                    }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-400">
                    Showing{" "}
                    <span className="font-medium">
                      {(page - 1) * itemsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        page * itemsPerPage,
                        filteredReports.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredReports.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md ${page === 1
                        ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
                        : "bg-[#1A2335] text-white hover:bg-[#253247]"
                        }`}
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {Array.from(
                      { length: totalPages },
                      (_, i) => i + 1
                    ).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${page === pageNum
                          ? "bg-[#04D2D2] text-black"
                          : "bg-[#1A2335] text-white hover:bg-[#253247]"
                          }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setPage(Math.min(totalPages, page + 1))
                      }
                      disabled={page === totalPages || totalPages === 0}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md ${page === totalPages || totalPages === 0
                        ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
                        : "bg-[#1A2335] text-white hover:bg-[#253247]"
                        }`}
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Main content */}
      <div className="flex flex-col min-h-screen text-white bg-[#0E1427]">
        <PageTitle title="Security Scan Reports" desc="View and analyze your security scanning results" />

        {/* Dashboard stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Scans</p>
                <h3 className="text-2xl font-bold mt-2">{totalScans}</h3>
              </div>
              <div className="bg-[#1A2335] p-3 rounded-lg">
                <Shield className="h-6 w-6 text-[#04D2D2]" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              <span className="inline-flex items-center text-green-400">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  ></path>
                </svg>
                {reports.length > 0 ? "Data loaded" : "Loading data"}
              </span>
            </div>
          </div>

          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Pass Rate</p>
                <h3 className="text-2xl font-bold mt-2">
                  {totalScans ? Math.round((passed / totalScans) * 100) : 0}%
                </h3>
              </div>
              <div className="bg-[#1A2335] p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-[#04D2D2]" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              <span className="inline-flex items-center">
                {passed} passed scans
              </span>
            </div>
          </div>

          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Findings</p>
                <h3 className="text-2xl font-bold mt-2">{totalFindings}</h3>
              </div>
              <div className="bg-[#1A2335] p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-[#04D2D2]" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              <span className="inline-flex items-center">
                Across all scans
              </span>
            </div>
          </div>

          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Critical Issues</p>
                <h3 className="text-2xl font-bold mt-2">
                  {reports.filter((r) => r.severity === "Critical").length}
                </h3>
              </div>
              <div className="bg-[#1A2335] p-3 rounded-lg">
                <FileText className="h-6 w-6 text-[#04D2D2]" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              <span className="inline-flex items-center">
                Requires immediate attention
              </span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Pie Chart */}
          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <h3 className="text-lg font-medium mb-4">Scan Results</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} scans`, name]}
                  contentStyle={{
                    backgroundColor: "#1A2335",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <h3 className="text-lg font-medium mb-4">Scan Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2335" />
                <XAxis dataKey="name" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A2335",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Passed"
                  stroke="#22c55e"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="Failed"
                  stroke="#ef4444"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
            <h3 className="text-lg font-medium mb-4">Issue Severity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2335" />
                <XAxis dataKey="name" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip
                  formatter={(value) => [`${value} issues`]}
                  contentStyle={{
                    backgroundColor: "#1A2335",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value">
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#040C1F] p-4 rounded-xl border border-[#1A2335] flex flex-col md:flex-row md:items-center mb-6 space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-[#1A2335] rounded-md bg-[#1A2335] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04D2D2] focus:border-transparent"
                placeholder="Search scans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div>
              <select
                className="bg-[#1A2335] border border-[#253247] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#04D2D2]"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="day">Last 24 Hours</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            <div>
              <select
                className="bg-[#1A2335] border border-[#253247] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#04D2D2]"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div>
              <select
                className="bg-[#1A2335] border border-[#253247] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#04D2D2]"
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="none">None</option>
              </select>
            </div>

            <button
              className="flex items-center bg-[#1A2335] text-gray-400 px-3 py-2 rounded-md hover:bg-[#253247]"
              onClick={() => {
                setSearchTerm("");
                setSelectedTimeframe("week");
                setSelectedStatus("all");
                setSelectedSeverity("all");
                setPage(1);
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <ReportsTable />
      </div>

      {/* Show modal if open */}
      {modalOpen && <ReportDetailsModal />}
    </div>
  );
};

export default Reports;


// import React, { useState, useEffect } from "react";
// import {
//   PieChart,
//   Pie,
//   Tooltip,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   BarChart,
//   Bar,
// } from "recharts";
// import {
//   Calendar,
//   Clock,
//   AlertTriangle,
//   CheckCircle,
//   Download,
//   RefreshCw,
//   ChevronDown,
//   Search,
//   Shield,
//   Eye,
//   Trash2,
//   Plus,
//   FileText,
//   Check,
//   Minus,
// } from "lucide-react";
// import PageTitle from "../../components/PageTitle";
// import apiInstance from "../../api/instance";

// const Reports = () => {
//   const [apiData, setApiData] = useState({
//     subdomain_reports: [],
//     sql_reports: [],
//     hidden_files: [],
//     Xss_Report: [],
//     Waf_Report: [],
//     JsParser_Report: [],
//     EmailAudit_Report: [],
//     Whois_Report: [],
//   });

//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTimeframe, setSelectedTimeframe] = useState("week");
//   const [selectedStatus, setSelectedStatus] = useState("all");
//   const [selectedSeverity, setSelectedSeverity] = useState("all");
//   const [severityData, setSeverityData] = useState([]);
//   const [toolData, setToolData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [selectedReports, setSelectedReports] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     const id = localStorage.getItem("userId");
//     setUserId(id);
//   }, []);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchReports = async () => {
//       try {
//         setLoading(true);
//         const response = await apiInstance.get('/api/reports', {
//           params: { userId }
//         });
//         const data = response.data;
//         setApiData(data);
//         const allReports = transformApiData(data);
//         setReports(allReports);
//         calculateChartData(allReports);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching reports:", error);
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, [userId]);

//   const getToolName = (reportType) => {
//     const toolNames = {
//       subdomain_reports: "Subdomain Scanner",
//       sql_reports: "SQL Injection Scanner",
//       hidden_files: "Hidden Files Finder",
//       Xss_Report: "XSS Scanner",
//       Waf_Report: "WAF Detector",
//       JsParser_Report: "JavaScript Analyzer",
//       EmailAudit_Report: "Email Security Auditor",
//       Whois_Report: "Whois Lookup",
//     };
//     return toolNames[reportType] || reportType;
//   };

//   const getStatus = (report, reportType) => {
//     const statusMap = {
//       sql_reports: "success",
//       hidden_files: "success",
//       Xss_Report: "success",
//       Waf_Report: "success",
//       JsParser_Report: "success",
//       EmailAudit_Report: "success",
//       Whois_Report: "success",
//     };

//     if (reportType === "subdomain_reports") {
//       const subdomainLength = report?.results?.[0]?.subdomains?.length || 0;
//       return subdomainLength > 0 ? "Passed" : "Failed";
//     } else if (reportType === "Xss_Report") {
//       const xssLength = report?.vulnerabilities?.length || 0;
//       return xssLength > 0 ? "Passed" : "Failed";
//     }

//     return statusMap[reportType] || "unknown";
//   };

//   const determineSeverity = (report) => {
//     if (report.severity) return report.severity;

//     if (report.vulnerabilities && report.vulnerabilities.length > 0) {
//       const hasCritical = report.vulnerabilities.some(v => v.severity === 'critical') || report.vulnerabilities.length > 70;
//       if (hasCritical) return "Critical";

//       const hasHigh = report.vulnerabilities.some(v => v.severity === 'high') || report.vulnerabilities.length > 40;
//       if (hasHigh) return "High";

//       const hasMedium = report.vulnerabilities.some(v => v.severity === 'medium') || report.vulnerabilities.length > 20;
//       if (hasMedium) return "Medium";

//       return "Low";
//     }

//     return "None";
//   };

//   const generateDetails = (report, reportType) => {
//     switch (reportType) {
//       case 'subdomain_reports':
//         return `Found ${report.results?.[0]?.subdomains ? report.results?.[0]?.subdomains.length : 0} subdomains`;
//       case 'sql_reports':
//         return `Found ${report.vulnerabilities ? report.vulnerabilities.length : 0} SQL injection vulnerabilities`;
//       case 'hidden_files':
//         return `Found ${report.files ? report.files.length : 0} hidden files/directories`;
//       case 'Xss_Report':
//         return `Found ${report.vulnerabilities ? report.vulnerabilities.length : 0} XSS vulnerabilities`;
//       case 'Waf_Report':
//         return `WAF detection results for ${report.target || 'unknown target'}`;
//       case 'JsParser_Report':
//         return `Found ${report.issues ? report.issues.length : 0} JavaScript security issues`;
//       case 'EmailAudit_Report':
//         return `Email security audit results with ${report.issues ? report.issues.length : 0} findings`;
//       case 'Whois_Report':
//         return `Whois lookup results for ${report.data?.domain_name || 'unknown target'}`;
//       default:
//         return "Security scan completed";
//     }
//   };

//   const transformApiData = (data) => {
//     const allReports = [];

//     Object.keys(data).forEach(reportType => {
//       data[reportType].forEach(report => {
//         const target = report.results?.[0]?.target ||
//           report.results?.[0]?.url ||
//           report.results?.[0]?.domain ||
//           report.url ||
//           report.domain ||
//           report.target ||
//           report.targets[0] ||
//           report.Target_URL ||
//           report.data?.domain_name ||
//           report[0]?.data ||
//           "Unknown target";

//         const commonReport = {
//           id: report._id || report.id || `RPT-${Math.random().toString(36).substr(2, 8)}`,
//           tool: getToolName(reportType),
//           status: getStatus(report, reportType),
//           timestamp: report.created_time,
//           duration: report.duration || `${Math.floor(Math.random() * 20) + 1}m ${Math.floor(Math.random() * 60)}s`,
//           target: target,
//           findings: report.vulnerabilities ? report.vulnerabilities.length :
//             (report.issues ? report.issues.length :
//               (report.files ? report.files.length :
//                 (report.results?.[0]?.subdomains ? report.results?.[0]?.subdomains.length : 0))),
//           severity: determineSeverity(report),
//           details: generateDetails(report, reportType),
//           rawData: report,
//           reportType: reportType
//         };

//         allReports.push(commonReport);
//       });
//     });

//     return allReports;
//   };

//   const calculateChartData = (reports) => {
//     const sevData = [
//       { name: "Critical", value: 0, color: "#ef4444" },
//       { name: "High", value: 0, color: "#f97316" },
//       { name: "Medium", value: 0, color: "#eab308" },
//       { name: "Low", value: 0, color: "#06b6d4" },
//       { name: "None", value: 0, color: "#22c55e" },
//     ];

//     reports.forEach(report => {
//       const severity = report.severity || "None";
//       const sevIndex = sevData.findIndex(item => item.name === severity);
//       if (sevIndex !== -1) {
//         sevData[sevIndex].value++;
//       }
//     });

//     setSeverityData(sevData);

//     const tools = {};
//     reports.forEach(report => {
//       if (tools[report.tool]) {
//         tools[report.tool]++;
//       } else {
//         tools[report.tool] = 1;
//       }
//     });

//     const toolDataArray = Object.keys(tools).map(tool => {
//       return { name: tool, value: tools[tool] };
//     });

//     setToolData(toolDataArray);
//   };

//   const filteredReports = reports.filter((report) => {
//     let match = true;

//     if (searchTerm) {
//       match =
//         match &&
//         (report.tool.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           report.target.toLowerCase().includes(searchTerm.toLowerCase()));
//     }

//     if (selectedStatus !== "all") {
//       match =
//         match && report.status.toLowerCase() === selectedStatus.toLowerCase();
//     }

//     if (selectedSeverity !== "all") {
//       match =
//         match &&
//         report.severity.toLowerCase() === selectedSeverity.toLowerCase();
//     }

//     if (selectedTimeframe !== "all") {
//       const reportDate = new Date(report.timestamp);
//       const now = new Date();
//       let cutoff = new Date();

//       if (selectedTimeframe === "day") {
//         cutoff.setDate(now.getDate() - 1);
//       } else if (selectedTimeframe === "week") {
//         cutoff.setDate(now.getDate() - 7);
//       } else if (selectedTimeframe === "month") {
//         cutoff.setMonth(now.getMonth() - 1);
//       }

//       match = match && reportDate >= cutoff;
//     }

//     return match;
//   });

//   const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
//   const paginatedReports = filteredReports.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const toggleReportSelection = (reportId) => {
//     setSelectedReports(prev =>
//       prev.includes(reportId)
//         ? prev.filter(id => id !== reportId)
//         : [...prev, reportId]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (selectAll) {
//       setSelectedReports([]);
//     } else {
//       setSelectedReports(paginatedReports.map(report => report.id));
//     }
//     setSelectAll(!selectAll);
//   };

//   const deleteSelectedReports = async () => {
//     if (selectedReports.length === 0) return;

//     try {
//       setDeleteLoading(true);

//       const reportsToDelete = filteredReports.filter(report =>
//         selectedReports.includes(report.id)
//       );

//       const reportsByType = {};
//       reportsToDelete.forEach(report => {
//         if (!reportsByType[report.reportType]) {
//           reportsByType[report.reportType] = [];
//         }
//         reportsByType[report.reportType].push(report.id);
//       });

//       const deletePromises = Object.keys(reportsByType).map(async (reportType) => {
//         await apiInstance.delete('/api/reports', {
//           data: {
//             userId,
//             reportType,
//             reportIds: reportsByType[reportType]
//           }
//         });
//       });

//       await Promise.all(deletePromises);

//       const response = await apiInstance.get('/api/reports', {
//         params: { userId }
//       });
//       const data = response.data;
//       setApiData(data);
//       const allReports = transformApiData(data);
//       setReports(allReports);
//       calculateChartData(allReports);

//       setSelectedReports([]);
//       setSelectAll(false);
//     } catch (error) {
//       console.error("Error deleting reports:", error);
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const downloadReport = (report) => {
//     const dataStr = JSON.stringify(report.rawData, null, 2);
//     const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
//     const exportFileDefaultName = `${report.tool}_${report.id}.json`;
//     const linkElement = document.createElement('a');
//     linkElement.setAttribute('href', dataUri);
//     linkElement.setAttribute('download', exportFileDefaultName);
//     linkElement.click();
//   };

//   const renderStatusBadge = (status) => {
//     if (status === "Passed") {
//       return (
//         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
//           <CheckCircle className="w-3 h-3 mr-1" />
//           Passed
//         </span>
//       );
//     } else {
//       return (
//         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-300">
//           <AlertTriangle className="w-3 h-3 mr-1" />
//           Failed
//         </span>
//       );
//     }
//   };

//   const getSeverityBadge = (severity) => {
//     let classes = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

//     switch (severity) {
//       case "Critical":
//         return <span className={`${classes} bg-red-900 text-red-300`}>{severity}</span>;
//       case "High":
//         return <span className={`${classes} bg-orange-900 text-orange-300`}>{severity}</span>;
//       case "Medium":
//         return <span className={`${classes} bg-yellow-900 text-yellow-300`}>{severity}</span>;
//       case "Low":
//         return <span className={`${classes} bg-blue-900 text-blue-300`}>{severity}</span>;
//       default:
//         return <span className={`${classes} bg-green-900 text-green-300`}>{severity}</span>;
//     }
//   };

//   const ReportDetailsModal = () => {
//     if (!selectedReport) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//         <div className="bg-[#040C1F] border border-[#1A2335] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//           <div className="p-6 border-b border-[#1A2335] flex justify-between items-center">
//             <h3 className="text-xl font-bold text-[#04D2D2]">
//               {selectedReport.id}: {selectedReport.tool} Scan Report
//             </h3>
//             <button
//               onClick={() => setModalOpen(false)}
//               className="text-gray-400 hover:text-white"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className="p-6">
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div>
//                 <p className="text-sm text-gray-400">Target</p>
//                 <p className="text-lg text-[#04D2D2] font-medium">{selectedReport.target}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Status</p>
//                 <div className="mt-1">
//                   {renderStatusBadge(selectedReport.status)}
//                 </div>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Date & Time</p>
//                 <p className="font-medium text-[#04D2D2]">
//                   {new Date(selectedReport.timestamp).toLocaleString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Duration</p>
//                 <p className="font-medium text-[#04D2D2]">{selectedReport.duration}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Findings</p>
//                 <p className="font-medium text-[#04D2D2]">{selectedReport.findings}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-400">Severity</p>
//                 <div className="mt-1">
//                   {getSeverityBadge(selectedReport.severity)}
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h4 className="text-md font-medium text-[#04D2D2] mb-2">
//                 Details
//               </h4>
//               <p className="text-gray-300 bg-[#1A2335] p-4 rounded-md">
//                 {selectedReport.details}
//               </p>
//             </div>

//             {selectedReport.findings > 0 && (
//               <div>
//                 <h4 className="text-md font-medium text-[#04D2D2] mb-2">
//                   Findings Preview
//                 </h4>
//                 <pre className="text-gray-300 bg-[#1A2335] p-4 rounded-md overflow-x-auto text-xs">
//                   {JSON.stringify(selectedReport.rawData, null, 2).slice(0, 1000)}...
//                 </pre>
//               </div>
//             )}
//           </div>

//           <div className="p-6 border-t border-[#1A2335] flex justify-end space-x-3">
//             <button
//               onClick={() => setModalOpen(false)}
//               className="px-4 py-2 bg-[#1A2335] hover:bg-[#253247] rounded-md text-sm transition-colors"
//             >
//               Close
//             </button>
//             <button
//               onClick={() => downloadReport(selectedReport)}
//               className="flex items-center px-4 py-2 bg-[#04D2D2] hover:bg-[#03BEBE] text-black rounded-md text-sm transition-colors"
//             >
//               <Download className="w-4 h-4 mr-2" />
//               Download Full Report
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const ReportsTable = () => {
//     const totalScans = filteredReports.length;
//     const passed = filteredReports.filter((r) => r.status === "Passed").length;
//     const failed = filteredReports.filter((r) => r.status === "Failed").length;
//     const totalFindings = filteredReports.reduce((sum, r) => sum + r.findings, 0);

//     const pieData = [
//       { name: "Passed", value: passed, color: "#22c55e" },
//       { name: "Failed", value: failed, color: "#ef4444" },
//     ];

//     const lineData = Array.from({ length: 7 }, (_, i) => {
//       const date = new Date();
//       date.setDate(date.getDate() - 6 + i);
//       const dateString = date.toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       });

//       const scansForDay = reports.filter((r) => {
//         const reportDate = new Date(r.timestamp);
//         return (
//           reportDate.getDate() === date.getDate() &&
//           reportDate.getMonth() === date.getMonth() &&
//           reportDate.getFullYear() === date.getFullYear()
//         );
//       });

//       return {
//         name: dateString,
//         Passed: scansForDay.filter((r) => r.status === "Passed").length,
//         Failed: scansForDay.filter((r) => r.status === "Failed").length,
//       };
//     });

//     return (
//       <div className="bg-[#040C1F] rounded-xl shadow-md border border-[#1A2335]">
//         <div className="p-4 md:p-6 border-b border-[#1A2335] flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-semibold text-[#04D2D2]">
//               Scan Reports
//             </h2>
//             <p className="text-sm text-gray-400 mt-1">
//               Detailed list of security scan results
//             </p>
//           </div>
//           <div className="flex space-x-2">
//             {selectedReports.length > 0 && (
//               <button
//                 onClick={deleteSelectedReports}
//                 disabled={deleteLoading}
//                 className="flex items-center px-3 py-2 bg-red-900 hover:bg-red-800 rounded-md text-sm transition-colors"
//               >
//                 {deleteLoading ? (
//                   <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
//                 ) : (
//                   <Trash2 className="w-4 h-4 mr-2" />
//                 )}
//                 Delete ({selectedReports.length})
//               </button>
//             )}
//             <button
//               onClick={() => window.location.reload()}
//               className="flex items-center px-3 py-2 bg-[#1A2335] hover:bg-[#253247] rounded-md text-sm transition-colors"
//             >
//               <RefreshCw className="w-4 h-4 mr-2" />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {loading ? (
//           <div className="p-8 flex justify-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#04D2D2]"></div>
//           </div>
//         ) : (
//           <div className="overflow-x-auto p-4">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-[#1A2335] text-[#04D2D2]">
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     <input
//                       type="checkbox"
//                       checked={selectAll}
//                       onChange={toggleSelectAll}
//                       className="h-4 w-4 text-[#04D2D2] focus:ring-[#04D2D2] border-gray-600 rounded bg-[#1A2335]"
//                     />
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     ID
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Tool
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Target
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Findings
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Severity
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-[#1A2335]">
//                 {paginatedReports.length > 0 ? (
//                   paginatedReports.map((report) => (
//                     <tr key={report.id} className="hover:bg-[#1A2335]">
//                       <td className="px-4 py-3 whitespace-nowrap">
//                         <input
//                           type="checkbox"
//                           checked={selectedReports.includes(report.id)}
//                           onChange={() => toggleReportSelection(report.id)}
//                           className="h-4 w-4 text-[#04D2D2] focus:ring-[#04D2D2] border-gray-600 rounded bg-[#1A2335]"
//                         />
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm">
//                         {report.id}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm">
//                         {report.tool}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm">
//                         {report.target || report.results?.domain || "N/A"}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm">
//                         {renderStatusBadge(report.status)}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm">
//                         {report.findings}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm">
//                         {getSeverityBadge(report.severity)}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm">
//                         {new Date(report.timestamp).toLocaleDateString()}
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm flex space-x-2">
//                         <button
//                           onClick={() => {
//                             setSelectedReport(report);
//                             setModalOpen(true);
//                           }}
//                           className="text-[#04D2D2] hover:text-[#03BEBE]"
//                           title="View Details"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => downloadReport(report)}
//                           className="text-green-400 hover:text-green-500"
//                           title="Download Report"
//                         >
//                           <Download className="w-4 h-4" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="9"
//                       className="px-4 py-8 text-center text-gray-400"
//                     >
//                       {filteredReports.length === 0 && reports.length > 0
//                         ? "No reports match your filter criteria"
//                         : "No scan reports available"}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>

//             <div className="flex items-center justify-between border-t border-[#1A2335] bg-[#040C1F] px-4 py-3 sm:px-6 mt-4">
//               <div className="flex flex-1 justify-between sm:hidden">
//                 <button
//                   onClick={() => setPage(Math.max(1, page - 1))}
//                   disabled={page === 1}
//                   className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${page === 1
//                     ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
//                     : "bg-[#1A2335] text-white hover:bg-[#253247]"
//                     }`}
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => setPage(Math.min(totalPages, page + 1))}
//                   disabled={page === totalPages}
//                   className={`relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${page === totalPages
//                     ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
//                     : "bg-[#1A2335] text-white hover:bg-[#253247]"
//                     }`}
//                 >
//                   Next
//                 </button>
//               </div>
//               <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//                 <div>
//                   <p className="text-sm text-gray-400">
//                     Showing{" "}
//                     <span className="font-medium">
//                       {(page - 1) * itemsPerPage + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium">
//                       {Math.min(
//                         page * itemsPerPage,
//                         filteredReports.length
//                       )}
//                     </span>{" "}
//                     of{" "}
//                     <span className="font-medium">
//                       {filteredReports.length}
//                     </span>{" "}
//                     results
//                   </p>
//                 </div>
//                 <div>
//                   <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
//                     <button
//                       onClick={() => setPage(Math.max(1, page - 1))}
//                       disabled={page === 1}
//                       className={`relative inline-flex items-center px-2 py-2 rounded-l-md ${page === 1
//                         ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
//                         : "bg-[#1A2335] text-white hover:bg-[#253247]"
//                         }`}
//                     >
//                       <span className="sr-only">Previous</span>
//                       <svg
//                         className="h-5 w-5"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                         aria-hidden="true"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </button>
//                     {Array.from(
//                       { length: totalPages },
//                       (_, i) => i + 1
//                     ).map((pageNum) => (
//                       <button
//                         key={pageNum}
//                         onClick={() => setPage(pageNum)}
//                         className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${page === pageNum
//                           ? "bg-[#04D2D2] text-black"
//                           : "bg-[#1A2335] text-white hover:bg-[#253247]"
//                           }`}
//                       >
//                         {pageNum}
//                       </button>
//                     ))}
//                     <button
//                       onClick={() =>
//                         setPage(Math.min(totalPages, page + 1))
//                       }
//                       disabled={page === totalPages || totalPages === 0}
//                       className={`relative inline-flex items-center px-2 py-2 rounded-r-md ${page === totalPages || totalPages === 0
//                         ? "bg-[#1A2335] text-gray-500 cursor-not-allowed"
//                         : "bg-[#1A2335] text-white hover:bg-[#253247]"
//                         }`}
//                     >
//                       <span className="sr-only">Next</span>
//                       <svg
//                         className="h-5 w-5"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                         aria-hidden="true"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </button>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="p-6">
//       <div className="flex flex-col min-h-screen text-white bg-[#0E1427]">
//         <PageTitle title="Security Scan Reports" desc="View and analyze your security scanning results" />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-400 text-sm">Total Scans</p>
//                 <h3 className="text-2xl font-bold mt-2">{filteredReports.length}</h3>
//               </div>
//               <div className="bg-[#1A2335] p-3 rounded-lg">
//                 <Shield className="h-6 w-6 text-[#04D2D2]" />
//               </div>
//             </div>
//             <div className="mt-4 text-xs text-gray-400">
//               <span className="inline-flex items-center text-green-400">
//                 <svg
//                   className="w-3 h-3 mr-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 10l7-7m0 0l7 7m-7-7v18"
//                   ></path>
//                 </svg>
//                 {reports.length > 0 ? "Data loaded" : "Loading data"}
//               </span>
//             </div>
//           </div>

//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-400 text-sm">Pass Rate</p>
//                 <h3 className="text-2xl font-bold mt-2">
//                   {filteredReports.length ? Math.round((filteredReports.filter(r => r.status === "Passed").length / filteredReports.length) * 100) : 0}%
//                 </h3>
//               </div>
//               <div className="bg-[#1A2335] p-3 rounded-lg">
//                 <CheckCircle className="h-6 w-6 text-[#04D2D2]" />
//               </div>
//             </div>
//             <div className="mt-4 text-xs text-gray-400">
//               <span className="inline-flex items-center">
//                 {filteredReports.filter(r => r.status === "Passed").length} passed scans
//               </span>
//             </div>
//           </div>

//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-400 text-sm">Total Findings</p>
//                 <h3 className="text-2xl font-bold mt-2">
//                   {filteredReports.reduce((sum, r) => sum + r.findings, 0)}
//                 </h3>
//               </div>
//               <div className="bg-[#1A2335] p-3 rounded-lg">
//                 <AlertTriangle className="h-6 w-6 text-[#04D2D2]" />
//               </div>
//             </div>
//             <div className="mt-4 text-xs text-gray-400">
//               <span className="inline-flex items-center">
//                 Across all scans
//               </span>
//             </div>
//           </div>

//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className="text-gray-400 text-sm">Critical Issues</p>
//                 <h3 className="text-2xl font-bold mt-2">
//                   {filteredReports.filter((r) => r.severity === "Critical").length}
//                 </h3>
//               </div>
//               <div className="bg-[#1A2335] p-3 rounded-lg">
//                 <FileText className="h-6 w-6 text-[#04D2D2]" />
//               </div>
//             </div>
//             <div className="mt-4 text-xs text-gray-400">
//               <span className="inline-flex items-center">
//                 Requires immediate attention
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <h3 className="text-lg font-medium mb-4">Scan Results</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={90}
//                   paddingAngle={5}
//                   dataKey="value"
//                   label={({ name, percent }) =>
//                     `${name}: ${(percent * 100).toFixed(0)}%`
//                   }
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(value, name) => [`${value} scans`, name]}
//                   contentStyle={{
//                     backgroundColor: "#1A2335",
//                     border: "none",
//                     borderRadius: "8px",
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <h3 className="text-lg font-medium mb-4">Scan Trends</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={lineData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#1A2335" />
//                 <XAxis dataKey="name" stroke="#4B5563" />
//                 <YAxis stroke="#4B5563" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1A2335",
//                     border: "none",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="Passed"
//                   stroke="#22c55e"
//                   strokeWidth={2}
//                   activeDot={{ r: 8 }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="Failed"
//                   stroke="#ef4444"
//                   strokeWidth={2}
//                   activeDot={{ r: 8 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-[#040C1F] p-4 md:p-6 rounded-xl border border-[#1A2335]">
//             <h3 className="text-lg font-medium mb-4">Issue Severity</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={severityData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#1A2335" />
//                 <XAxis dataKey="name" stroke="#4B5563" />
//                 <YAxis stroke="#4B5563" />
//                 <Tooltip
//                   formatter={(value) => [`${value} issues`]}
//                   contentStyle={{
//                     backgroundColor: "#1A2335",
//                     border: "none",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Bar dataKey="value">
//                   {severityData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="bg-[#040C1F] p-4 rounded-xl border border-[#1A2335] flex flex-col md:flex-row md:items-center mb-6 space-y-3 md:space-y-0 md:space-x-4">
//           <div className="flex-grow">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full pl-10 pr-3 py-2 border border-[#1A2335] rounded-md bg-[#1A2335] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#04D2D2] focus:border-transparent"
//                 placeholder="Search scans..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <div>
//               <select
//                 className="bg-[#1A2335] border border-[#253247] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#04D2D2]"
//                 value={selectedTimeframe}
//                 onChange={(e) => setSelectedTimeframe(e.target.value)}
//               >
//                 <option value="all">All Time</option>
//                 <option value="day">Last 24 Hours</option>
//                 <option value="week">Last 7 Days</option>
//                 <option value="month">Last 30 Days</option>
//               </select>
//             </div>

//             <div>
//               <select
//                 className="bg-[#1A2335] border border-[#253247] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#04D2D2]"
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//               >
//                 <option value="all">All Status</option>
//                 <option value="passed">Passed</option>
//                 <option value="failed">Failed</option>
//               </select>
//             </div>

//             <div>
//               <select
//                 className="bg-[#1A2335] border border-[#253247] text-white rounded-md pl-3 pr-8 py-2 appearance-none focus:outline-none focus:border-[#04D2D2]"
//                 value={selectedSeverity}
//                 onChange={(e) => setSelectedSeverity(e.target.value)}
//               >
//                 <option value="all">All Severity</option>
//                 <option value="critical">Critical</option>
//                 <option value="high">High</option>
//                 <option value="medium">Medium</option>
//                 <option value="low">Low</option>
//                 <option value="none">None</option>
//               </select>
//             </div>

//             <button
//               className="flex items-center bg-[#1A2335] text-gray-400 px-3 py-2 rounded-md hover:bg-[#253247]"
//               onClick={() => {
//                 setSearchTerm("");
//                 setSelectedTimeframe("week");
//                 setSelectedStatus("all");
//                 setSelectedSeverity("all");
//                 setPage(1);
//                 setSelectedReports([]);
//                 setSelectAll(false);
//               }}
//             >
//               <RefreshCw className="w-4 h-4 mr-2" />
//               Reset
//             </button>
//           </div>
//         </div>

//         <ReportsTable />
//       </div>

//       {modalOpen && <ReportDetailsModal />}
//     </div>
//   );
// };

// export default Reports;