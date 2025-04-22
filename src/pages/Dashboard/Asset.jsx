import React, { useState, useEffect } from "react";
import {
  Download,
  Cloud,
  Plus,
  Zap,
  Filter,
  MoreVertical,
  ExternalLink,
  Check,
  AlertCircle,
  Search,
  X,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import PageTitle from "../../components/PageTitle";

export default function Asset() {
  // State management
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: "http://testphp.vulnweb.com/",
      description:
        "Target added due to a redirect from http://testphp.vulnweb.com",
      subdomain: "testphp.vulnweb.com",
      type: "URL",
      riskLevel: "High",
      scans: 1,
    },
    {
      id: 2,
      name: "pixiv.net",
      description: "",
      subdomain: "pixiv.net",
      type: "HOSTNAME",
      riskLevel: "Info",
      scans: 1,
    },
    {
      id: 3,
      name: "testphph.vulnweb.com",
      description: "",
      subdomain: "testphph.vulnweb.com",
      type: "HOSTNAME",
      riskLevel: "Info",
      scans: 1,
    },
  ]);
  const [groupByAsset, setGroupByAsset] = useState(true);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    types: [],
    riskLevels: [],
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [paginationConfig, setPaginationConfig] = useState({
    currentPage: 1,
    itemsPerPage: 25,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: "",
    description: "",
    type: "URL",
  });
  const [fileContent, setFileContent] = useState(null);

  // Options for filters
  const typeOptions = ["URL", "HOSTNAME", "IP"];
  const riskLevelOptions = ["High", "Medium", "Low", "Info"];

  // Handle main checkbox selection
  useEffect(() => {
    if (
      selectedAssets.length === filteredAssets.length &&
      filteredAssets.length > 0
    ) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selectedAssets]);

  // Toggle select all assets
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(filteredAssets.map((asset) => asset.id));
    }
    setAllSelected(!allSelected);
  };

  // Toggle individual asset selection
  const toggleAssetSelection = (id) => {
    if (selectedAssets.includes(id)) {
      setSelectedAssets(selectedAssets.filter((assetId) => assetId !== id));
    } else {
      setSelectedAssets([...selectedAssets, id]);
    }
  };

  // Toggle group by asset
  const toggleGroupByAsset = () => {
    setGroupByAsset(!groupByAsset);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: e.target.value,
    });
    setPaginationConfig({
      ...paginationConfig,
      currentPage: 1,
    });
  };

  // Toggle type filter
  const toggleTypeFilter = (type) => {
    if (filters.types.includes(type)) {
      setFilters({
        ...filters,
        types: filters.types.filter((t) => t !== type),
      });
    } else {
      setFilters({
        ...filters,
        types: [...filters.types, type],
      });
    }
    setPaginationConfig({
      ...paginationConfig,
      currentPage: 1,
    });
  };

  // Toggle risk level filter
  const toggleRiskLevelFilter = (level) => {
    if (filters.riskLevels.includes(level)) {
      setFilters({
        ...filters,
        riskLevels: filters.riskLevels.filter((l) => l !== level),
      });
    } else {
      setFilters({
        ...filters,
        riskLevels: [...filters.riskLevels, level],
      });
    }
    setPaginationConfig({
      ...paginationConfig,
      currentPage: 1,
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      search: "",
      types: [],
      riskLevels: [],
    });
    setPaginationConfig({
      ...paginationConfig,
      currentPage: 1,
    });
  };

  // Handle sort
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter assets based on search and filters
  const filteredAssets = assets.filter((asset) => {
    // Search filter
    const searchMatch =
      filters.search === "" ||
      asset.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      asset.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      asset.subdomain.toLowerCase().includes(filters.search.toLowerCase());

    // Type filter
    const typeMatch =
      filters.types.length === 0 || filters.types.includes(asset.type);

    // Risk level filter
    const riskMatch =
      filters.riskLevels.length === 0 ||
      filters.riskLevels.includes(asset.riskLevel);

    return searchMatch && typeMatch && riskMatch;
  });

  // Sort assets
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (sortConfig.key === null) {
      return 0;
    }

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Paginate assets
  const indexOfLastAsset =
    paginationConfig.currentPage * paginationConfig.itemsPerPage;
  const indexOfFirstAsset = indexOfLastAsset - paginationConfig.itemsPerPage;
  const currentAssets = sortedAssets.slice(indexOfFirstAsset, indexOfLastAsset);
  const totalPages = Math.ceil(
    sortedAssets.length / paginationConfig.itemsPerPage
  );

  // Page navigation
  const paginate = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      currentPage: pageNumber,
    });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setPaginationConfig({
      currentPage: 1,
      itemsPerPage: parseInt(e.target.value),
    });
  };

  // Handle add new asset
  const handleAddAsset = () => {
    const newId =
      assets.length > 0 ? Math.max(...assets.map((asset) => asset.id)) + 1 : 1;
    const assetToAdd = {
      id: newId,
      name: newAsset.name,
      description: newAsset.description,
      subdomain: extractSubdomain(newAsset.name),
      type: newAsset.type,
      riskLevel: "Info", // Default risk level
      scans: 0,
    };
    setAssets([...assets, assetToAdd]);
    setNewAsset({
      name: "",
      description: "",
      type: "URL",
    });
    setShowAddModal(false);
  };

  // Extract subdomain from URL or hostname
  const extractSubdomain = (str) => {
    try {
      if (str.startsWith("http")) {
        return new URL(str).hostname;
      }
      return str;
    } catch {
      return str;
    }
  };

  // Handle file import
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setFileContent(content);
        processImportedFile(content);
      };
      reader.readAsText(file);
    }
  };

  // Process imported file
  const processImportedFile = (content) => {
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    const newAssets = lines.map((line, index) => {
      const newId = assets.length + index + 1;
      return {
        id: newId,
        name: line,
        description: `Imported from file`,
        subdomain: extractSubdomain(line),
        type: line.includes("://")
          ? "URL"
          : /^(\d{1,3}\.){3}\d{1,3}$/.test(line)
          ? "IP"
          : "HOSTNAME",
        riskLevel: "Info",
        scans: 0,
      };
    });
    setAssets([...assets, ...newAssets]);
  };

  // Handle AWS import (mock functionality)
  const handleAwsImport = () => {
    // Mock AWS import with example data
    const awsAssets = [
      {
        id: assets.length + 1,
        name: "ec2-instance-1.amazonaws.com",
        description: "AWS EC2 Instance",
        subdomain: "ec2-instance-1.amazonaws.com",
        type: "HOSTNAME",
        riskLevel: "Low",
        scans: 0,
      },
      {
        id: assets.length + 2,
        name: "s3-bucket.amazonaws.com",
        description: "AWS S3 Bucket",
        subdomain: "s3-bucket.amazonaws.com",
        type: "HOSTNAME",
        riskLevel: "Info",
        scans: 0,
      },
    ];
    setAssets([...assets, ...awsAssets]);
  };

  // Delete selected assets
  const deleteSelectedAssets = () => {
    setAssets(assets.filter((asset) => !selectedAssets.includes(asset.id)));
    setSelectedAssets([]);
  };

  // Run scan on selected assets (mock functionality)
  const runScanOnSelected = () => {
    const updatedAssets = assets.map((asset) => {
      if (selectedAssets.includes(asset.id)) {
        return {
          ...asset,
          scans: asset.scans + 1,
          // Randomly assign a risk level for demonstration purposes
          riskLevel:
            Math.random() > 0.7
              ? "High"
              : Math.random() > 0.4
              ? "Medium"
              : "Info",
        };
      }
      return asset;
    });
    setAssets(updatedAssets);
    setSelectedAssets([]);
  };

  return (
    <div className="bg-[#0E1427] text-white p-6">
      <div className="">
        <PageTitle
          title="Assets"
          desc="An Asset is a hostname or an IP address of the system you want to
            scan."
        />

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#263244] text-white px-4 py-2 rounded"
          >
            <Plus size={16} />
            Add
          </button>
          <label className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#263244] text-white px-4 py-2 rounded cursor-pointer">
            <Download size={16} />
            <span>Import from .txt</span>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>
          <button
            onClick={handleAwsImport}
            className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#263244] text-white px-4 py-2 rounded"
          >
            <Cloud size={16} />
            Import from AWS
          </button>
          <div className="ml-auto">
            <a
              href="#"
              className="flex items-center gap-2 text-[#04D2D2] hover:text-[#04E0E0]"
            >
              <span>Get started with Assets</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Group by asset</span>
            <button
              onClick={toggleGroupByAsset}
              className={`w-10 h-5 ${
                groupByAsset ? "bg-[#1E293B]" : "bg-gray-700"
              } rounded-full p-0.5 flex items-center ${
                groupByAsset ? "" : "justify-end"
              } transition-all`}
            >
              <div className="w-4 h-4 bg-[#04D2D2] rounded-full"></div>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search assets..."
                value={filters.search}
                onChange={handleSearchChange}
                className="px-8 py-1 bg-[#1E293B] border border-[#2D3748] rounded text-sm text-white"
              />
              <Search
                size={16}
                className="absolute left-2 top-2 text-gray-400"
              />
              {filters.search && (
                <button
                  onClick={() => setFilters({ ...filters, search: "" })}
                  className="absolute right-2 top-2 text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1 px-3 py-1 ${
                  showFilters ||
                  filters.types.length > 0 ||
                  filters.riskLevels.length > 0
                    ? "bg-[#04D2D2] text-[#0E1427]"
                    : "text-gray-400 hover:text-[#04D2D2]"
                } rounded`}
              >
                <Filter size={16} />
                <span>
                  {filters.types.length > 0 || filters.riskLevels.length > 0
                    ? `Filters (${
                        filters.types.length + filters.riskLevels.length
                      })`
                    : "Filters off"}
                </span>
              </button>

              {showFilters && (
                <div className="absolute right-0 mt-2 w-64 bg-[#1E293B] border border-[#2D3748] rounded-md shadow-lg z-10 p-4">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Type</h3>
                      {filters.types.length > 0 && (
                        <button
                          onClick={() => setFilters({ ...filters, types: [] })}
                          className="text-xs text-[#04D2D2] hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {typeOptions.map((type) => (
                        <div key={type} className="flex items-center gap-2">
                          <button
                            onClick={() => toggleTypeFilter(type)}
                            className={`w-4 h-4 rounded flex items-center justify-center ${
                              filters.types.includes(type)
                                ? "bg-[#04D2D2] text-[#0E1427]"
                                : "border border-gray-500"
                            }`}
                          >
                            {filters.types.includes(type) && (
                              <Check size={12} />
                            )}
                          </button>
                          <span>{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Risk Level</h3>
                      {filters.riskLevels.length > 0 && (
                        <button
                          onClick={() =>
                            setFilters({ ...filters, riskLevels: [] })
                          }
                          className="text-xs text-[#04D2D2] hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {riskLevelOptions.map((level) => (
                        <div key={level} className="flex items-center gap-2">
                          <button
                            onClick={() => toggleRiskLevelFilter(level)}
                            className={`w-4 h-4 rounded flex items-center justify-center ${
                              filters.riskLevels.includes(level)
                                ? "bg-[#04D2D2] text-[#0E1427]"
                                : "border border-gray-500"
                            }`}
                          >
                            {filters.riskLevels.includes(level) && (
                              <Check size={12} />
                            )}
                          </button>
                          <span>{level}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={resetFilters}
                      className="text-sm text-[#04D2D2] hover:underline"
                    >
                      Reset all
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="bg-[#04D2D2] text-[#0E1427] px-3 py-1 rounded text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="text-gray-400 hover:text-[#04D2D2]"
              >
                <MoreVertical size={18} />
              </button>

              {showMoreMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1E293B] border border-[#2D3748] rounded-md shadow-lg z-10">
                  <div className="py-1">
                    {selectedAssets.length > 0 && (
                      <>
                        <button
                          onClick={runScanOnSelected}
                          className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#263244]"
                        >
                          Scan selected
                        </button>
                        <button
                          onClick={deleteSelectedAssets}
                          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#263244]"
                        >
                          Delete selected
                        </button>
                        <hr className="border-[#2D3748] my-1" />
                      </>
                    )}
                    <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#263244]">
                      Export assets
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#263244]">
                      Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#040C1F] border border-[#1E293B] rounded-lg overflow-hidden mb-4">
          <table className="w-full">
            <thead className="border-b border-[#1E293B]">
              <tr className="text-left text-gray-400">
                <th className="p-4 font-normal w-8">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="rounded bg-[#1E293B] border-[#1E293B]"
                  />
                </th>
                <th className="p-4 font-normal">
                  <button
                    onClick={() => requestSort("name")}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Targets ({filteredAssets.length})
                    {sortConfig.key === "name" &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      ))}
                  </button>
                </th>
                <th className="p-4 font-normal">
                  <button
                    onClick={() => requestSort("description")}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Description
                    {sortConfig.key === "description" &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      ))}
                  </button>
                </th>
                <th className="p-4 font-normal">
                  <button
                    onClick={() => requestSort("type")}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Type
                    {sortConfig.key === "type" &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      ))}
                  </button>
                </th>
                <th className="p-4 font-normal">
                  <button
                    onClick={() => requestSort("riskLevel")}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Risk level
                    {sortConfig.key === "riskLevel" &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      ))}
                  </button>
                </th>
                <th className="p-4 font-normal">
                  <button
                    onClick={() => requestSort("scans")}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    Scans
                    {sortConfig.key === "scans" &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      ))}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentAssets.length > 0 ? (
                currentAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="border-b border-[#1E293B] hover:bg-[#0A1222]"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedAssets.includes(asset.id)}
                        onChange={() => toggleAssetSelection(asset.id)}
                        className="rounded bg-[#1E293B] border-[#1E293B]"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Zap size={16} className="text-[#04D2D2]" />
                        <div>
                          <div className="text-white">{asset.name}</div>
                          <div className="text-gray-500 text-xs">
                            {asset.subdomain}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{asset.description}</td>
                    <td className="p-4">
                      <span className="bg-[#1E293B] text-[#04D2D2] px-2 py-1 rounded text-xs">
                        {asset.type}
                      </span>
                    </td>
                    <td className="p-4">
                      {asset.riskLevel === "High" ? (
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 flex items-center justify-center bg-red-500 rounded-full text-white text-xs">
                            H
                          </span>
                          <span>High</span>
                        </div>
                      ) : asset.riskLevel === "Medium" ? (
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 flex items-center justify-center bg-yellow-500 rounded-full text-white text-xs">
                            M
                          </span>
                          <span>Medium</span>
                        </div>
                      ) : asset.riskLevel === "Low" ? (
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full text-white text-xs">
                            L
                          </span>
                          <span>Low</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 flex items-center justify-center bg-teal-500 rounded-full text-white text-xs">
                            I
                          </span>
                          <span>Info</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="text-center">{asset.scans}</div>
                        <button className="text-xs text-[#04D2D2] text-center hover:underline">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle size={24} />
                      <p>No assets match your search criteria</p>
                      {(filters.search !== "" ||
                        filters.types.length > 0 ||
                        filters.riskLevels.length > 0) && (
                        <button
                          onClick={resetFilters}
                          className="text-[#04D2D2] hover:underline"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span>Displaying</span>
            <select
              value={paginationConfig.itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-[#1E293B] border border-[#1E293B] rounded p-1"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>in page</span>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`w-8 h-8 flex items-center justify-center rounded ${
                  paginationConfig.currentPage === page
                    ? "bg-[#2563EB] text-white"
                    : "text-gray-400 hover:bg-[#1E293B]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0E1427] border border-[#1E293B] rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Asset</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Asset Name (URL, Hostname, or IP)
                </label>
                <input
                  type="text"
                  value={newAsset.name}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, name: e.target.value })
                  }
                  placeholder="e.g. example.com or 192.168.1.1"
                  className="w-full p-2 bg-[#1E293B] border border-[#2D3748] rounded text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={newAsset.description}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, description: e.target.value })
                  }
                  placeholder="Add a description for this asset"
                  className="w-full p-2 bg-[#1E293B] border border-[#2D3748] rounded text-white h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Type
                </label>
                <select
                  value={newAsset.type}
                  onChange={(e) =>
                    setNewAsset({ ...newAsset, type: e.target.value })
                  }
                  className="w-full p-2 bg-[#1E293B] border border-[#2D3748] rounded text-white"
                >
                  <option value="URL">URL</option>
                  <option value="HOSTNAME">Hostname</option>
                  <option value="IP">IP Address</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-white bg-[#1E293B] hover:bg-[#263244] rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAsset}
                disabled={!newAsset.name}
                className={`px-4 py-2 rounded ${
                  !newAsset.name
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#04D2D2] text-[#0E1427] hover:bg-[#03BFBF]"
                }`}
              >
                Add Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
