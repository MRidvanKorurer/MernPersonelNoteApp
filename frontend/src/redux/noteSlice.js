import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  loading: false,
  rejected: null,
  notes: [],
  formData: {
    id: "",
    title: "",
    description: "",
  },
  updated: false,
};
export const getAllNotes = createAsyncThunk("getAllNotes", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user, "userTOKEN");
  const res = await fetch(`http://localhost:3000/api/notes/`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });

  return await res.json();
});

export const createNotes = createAsyncThunk(
  "createNotes",
  async (formData, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(`http://localhost:3000/api/notes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        return rejectWithValue({
          message: errorResponse.message,
        });
      }

      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue({
        message: "Bir hata oluştu",
      });
    }
  }
);

export const deleteNote = createAsyncThunk(
  "deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        return rejectWithValue({
          message: errorResponse.message,
        });
      }

      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue({
        message: "Bir hata oluştu",
      });
    }
  }
);

export const updateNote = createAsyncThunk(
  "updateNote",
  async (updateFormData, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(
        `http://localhost:3000/api/notes/${updateFormData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${user.token}` },
          body: JSON.stringify(updateFormData),
        }
      );

      if (!res.ok) {
        const errorResponse = await res.json();
        return rejectWithValue({
          message: errorResponse.message,
        });
      }

      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue({
        message: "Bir hata oluştu",
      });
    }
  }
);
const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    clearFormData: (state, actions) => {
      actions.payload.title = "";
      actions.payload.description = "";
    },
    formDataTransfer: (state, actions) => {
      state.formData.id = actions.payload._id;
      state.formData.title = actions.payload.title;
      state.formData.description = actions.payload.description;
    },
    changeUpdated: (state, action) => {
      state.updated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotes.pending, (state, actions) => {
      state.loading = true;
    });
    builder.addCase(getAllNotes.fulfilled, (state, actions) => {
      state.loading = false;
      state.error = null;
      state.notes = actions.payload;
    });
    builder.addCase(getAllNotes.rejected, (state, actions) => {
      state.loading = false;
      state.rejected = actions.payload;
    });
    builder.addCase(createNotes.pending, (state, actions) => {
      state.loading = true;
    });
    builder.addCase(createNotes.fulfilled, (state, actions) => {
      state.loading = false;
      state.error = null;
      state.notes = actions.payload;
      message.success("Ekleme işlemi başarılı");
    });
    builder.addCase(createNotes.rejected, (state, actions) => {
      state.loading = false;
      state.rejected = actions.payload.message;
      message.error(actions.payload.message);
    });
    builder.addCase(deleteNote.pending, (state, actions) => {
      state.loading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state, actions) => {
      state.loading = false;
      state.error = null;
      message.success("Silme işlemi başarılı");
    });
    builder.addCase(deleteNote.rejected, (state, actions) => {
      state.loading = false;
      state.rejected = actions.payload;
      message.error(actions.payload.message);
    });
    builder.addCase(updateNote.pending, (state, actions) => {
      state.loading = true;
    });
    builder.addCase(updateNote.fulfilled, (state, actions) => {
      state.loading = false;
      state.error = null;
      state.notes = actions.payload;
      message.success("Güncelleme işlemi başarılı");
      state.updated = true;
    });
    builder.addCase(updateNote.rejected, (state, actions) => {
      state.loading = false;
      state.rejected = actions.payload;
      message.error(actions.payload.message);
      state.updated = false;
    });
  },
});

export const { clearFormData, formDataTransfer, changeUpdated } =
  noteSlice.actions;

export const noteReducer = noteSlice.reducer;
