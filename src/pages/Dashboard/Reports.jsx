import React, { useState, useEffect, useRef } from "react";
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
import { jsPDF } from "jspdf";

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

  const dropdownRef = useRef(null);
  const [openDownloadMenu, setOpenDownloadMenu] = useState(null);
  const [reports, setReports] = useState([]);


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
        console.log("Transformed reports:", allReports); // Debugging line
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


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDownloadMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


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
      Technologies_Report: "Technologies Report",
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
      return allFieldsPresent ? "Passed" : "Failed";
    } else if (reportType === "Technologies_Report") {
        const reportPresent = report?.detected_technologies ?? false;
        return reportPresent ? "Passed" : "Failed";
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


  // const downloadReport = (report, format = 'json') => {
  //   console.log("Download button clicked", report.id, format); // Debug log

  //   if (format === 'pdf') {
  //     try {
  //       const doc = new jsPDF('p', 'mm', 'a4');

  //       // Set styles
  //       doc.setFont('helvetica');
  //       doc.setFontSize(16);
  //       doc.setTextColor(0, 0, 0);

  //       // Title
  //       doc.text(`${report.tool} Report`, 105, 20, { align: 'center' });

  //       // Report metadata
  //       doc.setFontSize(12);
  //       let y = 40;

  //       const addMetadataLine = (label, value) => {
  //         doc.text(`${label}: ${value}`, 20, y);
  //         y += 8;
  //       };

  //       addMetadataLine('Report ID', report.id);
  //       addMetadataLine('Target', report.target);
  //       addMetadataLine('Date', new Date(report.timestamp).toLocaleString());
  //       addMetadataLine('Status', report.status);
  //       addMetadataLine('Severity', report.severity);
  //       addMetadataLine('Findings', report.findings);

  //       // Divider
  //       y += 5;
  //       doc.setDrawColor(200);
  //       doc.line(20, y, 190, y);
  //       y += 10;

  //       // Findings header
  //       doc.setFontSize(14);
  //       doc.text('Findings Details:', 20, y);
  //       y += 10;

  //       // Handle large findings data
  //       if (report.tool === 'Subdomain Scanner' && report.rawData?.results?.[0]?.subdomains) {
  //         doc.setFontSize(10);

  //         // Add subdomains in columns
  //         const subdomains = report.rawData.results[0].subdomains;
  //         const pageHeight = 280; // A4 height in mm
  //         const col1X = 20;
  //         const col2X = 105;
  //         let col = col1X;

  //         doc.text('Discovered Subdomains:', col, y);
  //         y += 5;

  //         for (const subdomain of subdomains) {
  //           if (y > pageHeight) {
  //             doc.addPage();
  //             y = 20;
  //             col = col === col1X ? col2X : col1X;
  //           }

  //           doc.text(`• ${subdomain}`, col, y);
  //           y += 5;
  //         }
  //       } else {
  //         // Generic findings display
  //         doc.setFontSize(10);
  //         const findingsText = report.details || 'No detailed findings available';
  //         const splitText = doc.splitTextToSize(findingsText, 170);
  //         doc.text(splitText, 20, y);
  //       }

  //       // Save PDF
  //       doc.save(`${report.tool.replace(/\s+/g, '_')}_${report.id}.pdf`);

  //     } catch (error) {
  //       console.error('PDF generation error:', error);
  //       alert('Failed to generate PDF: ' + error.message);
  //     }
  //   } if (format === 'json') {
  //     console.log("Preparing JSON download...");
  //     const cleanData = JSON.parse(JSON.stringify(report.rawData));
  //     const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(cleanData, null, 2))}`;

  //     const downloadAnchor = document.createElement('a');
  //     downloadAnchor.setAttribute('href', dataStr);
  //     downloadAnchor.setAttribute('download', `${report.tool.replace(/\s+/g, '_')}_${report.id}.json`);
  //     document.body.appendChild(downloadAnchor);
  //     downloadAnchor.click();
  //     document.body.removeChild(downloadAnchor);
  //   }
  // };

  const downloadReport = (report, format = 'json') => {
    // console.log("Download button clicked", report.id, format);

    if (format === 'pdf') {
      try {
        const doc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        let y = 30;

        // Set styles
        doc.setFont('helvetica');
        doc.setFontSize(16);
        doc.setTextColor(40, 53, 147); // Dark blue color
        doc.setDrawColor(40, 53, 147);

        // Title with border
        doc.text(`${report.tool} Report`, pageWidth / 2, y, { align: 'center' });
        y += 10;
        doc.line(margin, y, pageWidth - margin, y);
        y += 15;

        // Metadata section
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        const addMetadataLine = (label, value) => {
          doc.setFont('helvetica', 'bold');
          doc.text(`${label}:`, margin, y);
          doc.setFont('helvetica', 'normal');
          const textWidth = doc.getTextWidth(`${label}: `);
          doc.text(value.toString(), margin + textWidth, y);
          y += 8;
        };

        addMetadataLine('Report ID', report.id);
        addMetadataLine('Tool', report.tool);
        addMetadataLine('Target', report.target);
        addMetadataLine('Date', new Date(report.timestamp).toLocaleString());
        addMetadataLine('Status', report.status);
        if (report.severity) addMetadataLine('Severity', report.severity);
        if (report.findings) addMetadataLine('Findings', report.findings);

        // Divider
        y += 10;
        doc.setDrawColor(200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 15;

        // Full raw data section (auto-format like JSON)
        doc.setFontSize(14);
        doc.setTextColor(40, 53, 147);
        doc.text('Full Report Data:', margin, y);
        y += 10;

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);

        const dataToDisplay = report.rawData || report;
        const jsonStr = JSON.stringify(dataToDisplay, null, 2);
        const splitText = doc.splitTextToSize(jsonStr, pageWidth - 2 * margin);

        for (let i = 0; i < splitText.length; i++) {
          if (y > 270) {
            doc.addPage();
            y = 30;
          }
          doc.text(splitText[i], margin, y);
          y += 6;
        }

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text(
          `Generated by Security Scanner - ${new Date().toLocaleString()}`,
          pageWidth / 2,
          287,
          { align: 'center' }
        );

        doc.save(`${report.tool.replace(/\s+/g, '_')}_${report.id}.pdf`);
      } catch (error) {
        console.error('PDF generation error:', error);
        alert('Failed to generate PDF: ' + error.message);
      }
    } else if (format === 'json') {
      console.log("Preparing JSON download...");
      const cleanData = JSON.parse(JSON.stringify(report.rawData || report));
      const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(cleanData, null, 2))}`;

      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `${report.tool.replace(/\s+/g, '_')}_${report.id}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
    }
  };

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
      alert("Please select at least one report to delete");
      return;
    }

    try {
      setDeleteLoading(true);

      // Create a reverse mapping from tool name to report type
      const toolToType = {
        "Subdomain Scanner": "subdomain_reports",
        "SQL Injection Scanner": "sql_reports",
        "Hidden Files Finder": "hidden_files",
        "XSS Scanner": "Xss_Report",
        "WAF Detector": "Waf_Report",
        "JavaScript Analyzer": "JsParser_Report",
        "Email Security Auditor": "EmailAudit_Report",
        "Whois Lookup": "Whois_Report"
      };

      // Group reports by type
      const reportsByType = filteredReports
        .filter(report => selectedReports.includes(report.id))
        .reduce((acc, report) => {
          const reportType = toolToType[report.tool];
          if (!reportType) {
            console.error("Could not determine report type for:", report);
            return acc;
          }
          acc[reportType] = [...(acc[reportType] || []), report.id];
          return acc;
        }, {});

      // Execute all delete operations
      const deleteResults = await Promise.allSettled(
        Object.entries(reportsByType).map(([reportType, reportIds]) =>
          apiInstance.delete('/api/reports', {
            data: { reportType, reportIds, user_id: userId }
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
      alert("Failed to delete some reports. Please try again.");
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
  // const downloadReport = (report) => {
  //   const dataStr = JSON.stringify(report.rawData, null, 2);
  //   const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  //   const exportFileDefaultName = `${report.tool}_${report.id}.json`;

  //   const linkElement = document.createElement('a');
  //   linkElement.setAttribute('href', dataUri);
  //   linkElement.setAttribute('download', exportFileDefaultName);
  //   linkElement.click();
  // };

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
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDownloadMenu(openDownloadMenu === report.id ? null : report.id);
                          }}
                          className="text-green-400 hover:text-green-500"
                          title="Download Options"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        {openDownloadMenu === report.id && (
                          <div className="absolute right-0 mt-1 w-48 bg-[#1A2335] border border-[#253247] rounded-md shadow-lg z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent event bubbling
                                downloadReport(report, 'json');
                                setOpenDownloadMenu(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#253247]"
                            >
                              Download as JSON
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent event bubbling
                                downloadReport(report, 'pdf');
                                setOpenDownloadMenu(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#253247]"
                            >
                              Download as PDF
                            </button>
                          </div>
                        )}

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
        )
        }
      </div >
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
