import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import customFetch from '../../utils/axios';

const initialState = {
  conversations: [],
  filteredConversations: [],
  messages: [],
  contact: [],
  isLoading: true,
  page: 1,
  numbOfPages: 0,
};
// all users
export const retrieveAllAssistant = createAsyncThunk(
  'user/assistant',
  async (_, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.get('user/assistant');
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithMessage(
        error.payload?.msg || 'Error occurred!'
      );
    }
  }
);
// create conversation
export const createConversation = createAsyncThunk(
  'rooms/create',
  async (data: any, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.post('room', data);
      console.log(`-=====response=====`);
      console.log(response);
      console.log(`-=====response=====`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectedWithValue(
        error.payload?.msg || 'Error occurred creating room '
      );
    }
  }
);
export const retreveAllConversation = createAsyncThunk(
  'rooms/all rooms',
  async (thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.get('room', {
        params: { page: thunkApi.getState().Room.page },
      });
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithMessage(
        error.payload?.msg || 'Error occurred!'
      );
    }
  }
);
export const retrieveUserConversation = createAsyncThunk(
  'rooms/user',
  async (thunkApi: ThunkAPI) => {}
);
export const retrieveSingleConversation = createAsyncThunk(
  'rooms/single',
  async (id: any, thunkApi: ThunkAPI) => {}
);

const roomSlice = createSlice({
  name: 'Room',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    setRoomPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(retrieveAllAssistant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveAllAssistant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contact = action.payload.user;
        state.numbOfPages = action.payload.numbOfPages;
      })
      .addCase(retrieveAllAssistant.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload?.msg || 'error occurred!',
          15000,
          0
        );
      });
    builder
      .addCase(createConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createConversation.fulfilled, (state: any, action) => {
        state.isLoading = false;
        const roomId = action.payload.room._id;
        const roomExists = state.filteredConversations.some(
          (conv: any) => conv._id === roomId
        );
        if (!roomExists) {
          state.filteredConversations = [
            ...state.filteredConversations,
            action.payload.room,
          ];
          state.conversations = [...state.conversations, action.payload.room];
        } else {
          state.conversations = state.conversations.map((conv: any) =>
            conv._id === roomId ? { ...conv, ...action.payload.room } : conv
          );
          state.filteredConversations = state.filteredConversations.map(
            (conv: any) =>
              conv._id === roomId ? { ...conv, ...action.payload.room } : conv
          );
        }
        state.conversations = state.conversations.map((conv: any) =>
          conv._id === action.payload.room._id
            ? { ...conv, ...action.payload.room }
            : conv
        );
      });
  },
});

export const { showLoading, hideLoading, setRoomPage } = roomSlice.actions;
export default roomSlice.reducer;
