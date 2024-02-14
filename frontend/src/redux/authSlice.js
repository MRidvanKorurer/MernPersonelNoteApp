import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  rejected: null,
  user: {},
  isAuth: false,
};

export const register = createAsyncThunk(
  "register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        return rejectWithValue({
          message: errorResponse.message,
        });
      }

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue({
        message: "Bir hata oluştu",
      });
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        return rejectWithValue({
          message: errorResponse.message,
        });
      }

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue({
        message: "Bir hata oluştu",
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, actions) => {
      state.user = {};
      localStorage.removeItem("user");
      state.isAuth = false;
    },
    getUser: (state, actions) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        state.user = user.user;
        state.isAuth = true;
      } else {
        state.user = {};
        state.isAuth = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, actions) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, actions) => {
      state.loading = false;
      state.rejected = null;
      state.user = actions.payload.newUser;
      state.isAuth = true;
    });
    builder.addCase(register.rejected, (state, actions) => {
      state.loading = false;
      state.rejected = actions.payload.message;
    });
    builder.addCase(login.pending, (state, actions) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, actions) => {
      state.loading = false;
      state.rejected = null;
      state.user = actions.payload.user;
      state.isAuth = true;
    });
    builder.addCase(login.rejected, (state, actions) => {
      state.loading = false;
      state.rejected = actions.payload.message;
    });
  },
});

export const { logout, getUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
