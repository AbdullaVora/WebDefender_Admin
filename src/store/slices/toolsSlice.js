import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../api/instance";

// const initialState = {
//     loading: false,
//     error: null,
//     tools: [],
//     response: [],
//     scanResults: [],
//     status: false,
//     logs: [],
// };

const initialState = {
    loading: false,
    counts: 0,
    error: null,
    tools: [],
    response: [],
    scanResults: [],
    status: false,
    logs: [],
    currentScanType: null,
    // estimatedDuration: 300000, // Default 5 minutes
};


const fetchCounts = createAsyncThunk("/fetchCounts", async ({ userId }, { rejectWithValue }) => {
    try {
        const response = await apiInstance.get(`/api/scanCount/${userId}`);
        return response.data.scan_count;
    } catch (error) {
        console.error("Error fetching scan count: ", error);
    }
})

// POST request to start the subdomain scan
export const scanStart = createAsyncThunk(
    "/tools/subDomain",
    async ({ domain, path, custom }, { dispatch, rejectWithValue }) => {
        try {
            console.log("Starting scan for URL: ", domain, path, custom);
            const userId = localStorage.getItem('userId');
            const countResponse = await apiInstance.get(`/api/getscanCounts/${userId}`);

            if (countResponse.data.scan_count <= 2) {
            const responseCount = await apiInstance.post('/api/scanCount', { userId, scan_count: 1 });
                // alert("Scan started. Please wait for the scan to complete.");
                const countResponse = await apiInstance.get(`/api/getscanCounts/${userId}`);
                dispatch(setScanCount(countResponse.data.scan_count));

                console.log("Scan started");
                const response = await apiInstance.post(`/api/tools/${path}`, { domain: domain, custom: custom, userId }, { headers: { 'Content-Type': 'application/json' } });
                if (response.status === 200) {
                    const responseCount = await apiInstance.post('/api/scanCount', { userId, scan_count: -1 });
                    const countResponse = await apiInstance.get(`/api/getscanCounts/${userId}`);
                    dispatch(setScanCount(countResponse.data.scan_count));
                }
                console.log("Scan started: ", response.data);
                return response.data;
            } else {
                console.log("Scan count exceeded: ", responseCount.data.scan_count);
                return rejectWithValue("Scan count exceeded. Please wait for complete running scans.");
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error in subDomainUrl");
        }
    }
);





// GET request to fetch scan results
export const fetchResult = createAsyncThunk(
    "/tools/fetchSubDomainData",
    async ({ domain, path }, { rejectWithValue }) => {
        try {
            console.log("Fetching scan results for domain: ", domain);
            const response = await apiInstance.get(`/api/tools/${path}-status/${domain}`, { headers: { 'Content-Type': 'application/json' } });
            console.log("Scan results: ", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching scan data");
        }
    }
);

const toolsSlice = createSlice({
    name: "tools",
    initialState,
    reducers: {
        updateScanResults: (state, action) => {
            const { domain, scan } = action.payload;
            const existingDomain = state.scanResults.find(result => result.domain === domain);
            if (existingDomain) {
                existingDomain.scans.push(scan);
            } else {
                state.scanResults.push({ domain, scans: [scan] });
            }
        },
        setScanType: (state, action) => {
            state.currentScanType = action.payload.type;
            // Set different estimates based on scan type
            // state.estimatedDuration =
            //     action.payload.type === 'DOM-BasedXss' ? 300000 : // 5 mins
            //         action.payload.type === 'Subdomain-Reconnaissance' ? 420000 : // 7 mins
            //             180000; // 3 mins default

        },
        setScanCount: (state, action) => {
            state.counts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle POST request (subDomainUrl)
            .addCase(scanStart.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.scanResults = [];
            })
            .addCase(scanStart.fulfilled, (state, action) => {
                state.loading = false;
                state.response.push(action.payload);
                state.status = true;
                state.scanResults.push(action.payload)
            })
            .addCase(scanStart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = false;
            })

            // Handle GET request (fetchSubDomainData)
            .addCase(fetchResult.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchResult.fulfilled, (state, action) => {
                state.loading = false;
                const { domain, subdomains, live_subdomains, logs } = action.payload;
                const scan = {
                    timestamp: new Date().toISOString(),
                    status: "completed",
                    subdomains,
                    live_subdomains,
                    logs
                };
                state.scanResults.push({ domain, scans: [scan] });
            })
            .addCase(fetchResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCounts.fulfilled, (state, action) => {
                state.loading = false;
                state.counts = action.payload;
            })
            .addCase(fetchCounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });;
    },
});

export const { updateScanResults, setScanType, setScanCount } = toolsSlice.actions;
export default toolsSlice.reducer;