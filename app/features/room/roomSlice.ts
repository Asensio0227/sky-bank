import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import customFetch from '../../utils/axios';
import { messageState } from './types';

const initialState = {
  conversations: [],
  filteredConversations: [],
  messages: [],
  adminRoom: [],
  adminMessages: [],
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
      return thunkApi.rejectedWithMessage(
        error.payload?.data || 'Error occurred!'
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
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectedWithValue(
        error.payload.data || 'Error occurred creating room '
      );
    }
  }
);
// retrieve all room (user)
export const retrieveUserConversation = createAsyncThunk(
  'rooms/user',
  async (_, thunkApi: ThunkAPI) => {
    try {
      const state = thunkApi.getState();
      const user = state.auth.user;
      const response = await customFetch.get(`room`);
      return { user, rooms: response.data };
    } catch (error: any) {
      return thunkApi.rejectedWithMessage(
        error.payload.data || 'Error occurred!'
      );
    }
  }
);
export const retrieveUpdateConversation = createAsyncThunk(
  'rooms/update',
  async (data: any, thunkApi: ThunkAPI) => {
    try {
      const { id, lastMessage } = data;
      const response = await customFetch.put(`room/${id}`, {
        lastMessage: lastMessage,
      });
      return response.data;
    } catch (error: any) {
      return console.log(error || 'Error occurred!');
    }
  }
);
// =====msg=====
export const sendMessage = createAsyncThunk(
  'message/create',
  async ({ msg, Id }: { msg: any; Id: string | any }, thunkApi: ThunkAPI) => {
    try {
      const user = thunkApi.getState().auth.user;
      const info = { ...msg, roomId: Id };
      const { data } = await customFetch.post('message', info);
      return { user, data };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const retrieveMessages = createAsyncThunk(
  'message/retrieve',
  async (_, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.get('message');
      console.log(`====get msg response===`);
      console.log(response);
      console.log(`====get msg response===`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const adminRetrieveMessages = createAsyncThunk(
  'message/admin',
  async (_, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.get('message/admin');
      console.log(`===admin msg response=====`);
      console.log(response);
      console.log(`===admin msg response=====`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
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
        const conExist = state.conversations.some(
          (conv: any) => conv._id === roomId
        );
        if (!roomExists && !conExist) {
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
    // retrieve user room
    builder
      .addCase(retrieveUserConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveUserConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          user,
          rooms: { rooms },
        } = action.payload;
        const email = user.email;
        const parsedChat =
          email &&
          rooms.map((doc: any) => ({
            ...doc,
            userB: doc.participants.find((p: any) => p.email !== email),
          }));
        state.filteredConversations = parsedChat;
        state.conversations = parsedChat.filter((doc: any) => doc.lastMessage);
      })
      .addCase(retrieveUserConversation.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload?.msg || 'error occurred!',
          15000,
          0
        );
      });
    // update room
    builder
      .addCase(retrieveUpdateConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        retrieveUpdateConversation.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.conversations = state.conversations.map((conv: any) =>
            conv._id === action.payload.room._id
              ? { ...conv, ...action.payload.room }
              : conv
          );
          state.filteredConversations = state.filteredConversations.map(
            (conv: any) =>
              conv._id === action.payload.room._id
                ? { ...conv, ...action.payload.room }
                : conv
          );
        }
      )
      .addCase(retrieveUpdateConversation.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload || 'error occurred!',
          15000,
          0
        );
      });
    // ===== Messages ====
    // send message
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state: any, action) => {
        state.isLoading = false;
        const {
          data: { message },
        } = action.payload;
        const msg: any = { ...message, id: message._id };
        state.messages = state.messages.map((message: messageState | any) =>
          message.id === msg.id ? { ...message, ...msg } : message
        );
        console.log(`===fulfilled=====`);
        console.log(action);
        console.log(`===fulfilled=====`);
      })
      .addCase(sendMessage.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload?.msg || 'error occurred!',
          15000,
          0
        );
        console.log(`====rejected=====`);
        console.log(action);
        console.log(`====rejected=====`);
      });
    builder
      .addCase(retrieveMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(retrieveMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        const incomingMessages = action.payload.messages.map(
          (message: messageState) => ({
            ...message,
            id: message._id,
          })
        );
        const uniqueMessages = incomingMessages.filter(
          (incomingMsg: messageState | any) =>
            !state.messages.some(
              (existingMsg) => existingMsg.id === incomingMsg.id
            )
        );

        // Append only unique messages
        state.messages = GiftedChat.append(state.messages, uniqueMessages);
      })
      .addCase(retrieveMessages.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload?.msg || 'error occurred!',
          15000,
          0
        );
      });
    builder
      .addCase(adminRetrieveMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminRetrieveMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminMessages = action.payload.message;
        console.log(`=====fulfilled admin retrieve==== `);
        console.log(action);
        console.log(`=====fulfilled admin retrieve==== `);
      })
      .addCase(adminRetrieveMessages.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload?.msg || 'error occurred!',
          15000,
          0
        );
        console.log(`====admin message rejected======`);
        console.log(action);
        console.log(`====admin message rejected======`);
      });
  },
});

export const { showLoading, hideLoading, setRoomPage } = roomSlice.actions;
export default roomSlice.reducer;
