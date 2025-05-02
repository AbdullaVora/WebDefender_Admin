import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../api/instance";

const initialState = {
    loading: false,
    error: null,
    users: [],
    isAuthenticated: false,
};

export const register = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            console.log("Attempting registration with data:", data);

            const response = await apiInstance.post("/api/auth/register", data);
            console.log("Registration response:", response);

            if (response.data?.token) {
                localStorage.setItem("auth_token", response.data.token);
                localStorage.setItem("userId", response.data.user_id);
                localStorage.setItem("username", response.data.data.name);
                localStorage.setItem("useremail", response.data.data.email);
                return response.data;
            }

            return rejectWithValue("No token received from server");
        } catch (error) {
            console.error("Registration error:", error);
            return rejectWithValue(
                error.response?.data?.message || error.message || "Registration failed"
            );
        }
    }
);

export const login = createAsyncThunk(
    "/auth/login",
    async (data, { rejectWithValue }) => {
        try {
            console.log("Sending registration request with data:", data); // Log the request data
            const response = await apiInstance.post("/api/auth/login", data);
            console.log("data:", response);

            if (response.status === 200) {
                const token = response.data?.token;
                localStorage.setItem("auth_token", token);
                localStorage.setItem("userId", response.data.user_id);
                localStorage.setItem("username", response.data.data.name);
                localStorage.setItem("useremail", response.data.data.email);
            } else {
                return rejectWithValue("Inavalid email/password");
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || "Error login");
        }
    }
);

export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (data, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("auth_token");
            const userId = localStorage.getItem("userId");
            const response = await apiInstance.put(`/api/auth/update/${userId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                localStorage.setItem("username", response.data.data.name);
                localStorage.setItem("useremail", response.data.data.email);
                return response.data;
            } else {
                return rejectWithValue("Failed to update user data");
            }
        } catch (error) {
            return rejectWithValue(error.message || "Error updating user data");
        }
    }
);

const userSlices = createSlice({
    name: "users",
    initialState,
    reducers: {
        logOut: (state) => {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("userId");
            localStorage.removeItem("welcome_shown");
            state.isAuthenticated = false;
            state.users = [];
            state.error = null;
            window.location.reload();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                (state.isAuthenticated = true), state.users.push(action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                (state.isAuthenticated = false), (state.error = action.payload);
            })
            .addCase(updateUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(user => user.id === action.payload.data._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logOut } = userSlices.actions;
export default userSlices.reducer;
