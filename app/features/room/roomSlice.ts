import { createAsyncThunk, createSlice, ThunkAPI } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import customFetch from '../../utils/axios';
import { messageState } from './types';

const initialState = {
  conversations: [],
  filteredConversations: [],
  conversationsWithNewMessages: [],
  messages: [],
  adminRoom: [],
  adminMessages: [],
  contact: [],
  isLoading: true,
  page: 1,
  totalConversation: 0,
  unreadCount: 0,
  totalMessage: 0,
  numbOfPages: 0,
  search: '',
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
      const user = thunkApi.getState().auth.user;
      const { id, lastMessage } = data;
      const { data: resp } = await customFetch.put(`room/${id}`, {
        lastMessage,
      });
      return { user, resp };
    } catch (error: any) {
      return console.log(error || 'Error occurred!');
    }
  }
);
// =====msg=====
export const sendMessage = createAsyncThunk(
  'message/create',
  async ({ msg, id }: { msg: any; id: string }, thunkApi: ThunkAPI) => {
    try {
      const user = thunkApi.getState().auth.user;
      const info = { ...msg, roomId: id };
      const { data } = await customFetch.post('message', info);
      return { user, data };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const retrieveMessages = createAsyncThunk(
  'message/retrieve',
  async (id: string, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.get(`message/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
// update msg
export const updateMessage = createAsyncThunk(
  'message/update',
  async (id: any, thunkApi: ThunkAPI) => {
    try {
      const response = await customFetch.put(`message/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
// all room (admin)
export const adminRetrieveRoom = createAsyncThunk(
  'rooms/retrieve/admin',
  async (_, thunkApi: ThunkAPI) => {
    try {
      const { page, search } = thunkApi.getState().Room;
      const params = new URLSearchParams({
        page: String(page),
        ...(search && { search }),
      });
      let url = `room/admin?${params.toString()}`;
      const response = await customFetch.get(url);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
// all msg (admin)
export const adminRetrieveMessages = createAsyncThunk(
  'message/admin',
  async (user: any, thunkApi: ThunkAPI) => {
    try {
      const { userId } = user;
      const response = await customFetch.get(`message/admin/${userId}`);
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
    handleRoomChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearRoomFilters: (state) => {
      return {
        ...state,
      };
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
          const {
            resp: { rooms },
            user,
          } = action.payload;
          state.conversations = state.conversations.map((conv: any) =>
            conv._id === rooms._id
              ? { ...conv, ...rooms, lastMessage: rooms.lastMessage }
              : conv
          );
          state.filteredConversations = state.filteredConversations.map(
            (conv: any) =>
              conv._id === rooms._id
                ? { ...conv, ...rooms, lastMessage: rooms.lastMessage }
                : conv
          );
          const { email, userId } = user;
          const newUnreadMessages = state.conversations.filter(
            (conversation: any) =>
              conversation.lastMessage &&
              !conversation.lastMessage.isRead &&
              conversation.lastMessage.user._id !== userId
          );
          const isConversationExists = (
            conversation: any,
            existingConversations: any
          ) => {
            return existingConversations.some(
              (existing: any) =>
                existing.lastMessage._id === conversation.lastMessage_id
            );
          };
          if (state.conversationsWithNewMessages) {
            const uniqueUnreadMessages = newUnreadMessages.filter(
              (conversation: any) =>
                !isConversationExists(
                  conversation,
                  state.conversationsWithNewMessages
                ) &&
                !state.conversationsWithNewMessages.some(
                  (existing: any) => existing.lastMessage.isRead
                )
            );
            state.conversationsWithNewMessages = [
              ...state.conversationsWithNewMessages,
              ...uniqueUnreadMessages,
            ];
          } else {
            state.conversationsWithNewMessages = newUnreadMessages;
          }
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
    // all room (admin)
    builder
      .addCase(adminRetrieveRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminRetrieveRoom.fulfilled, (state: any, action) => {
        state.isLoading = false;
        const { rooms, totalConversation, numbOfPages } = action.payload;
        state.totalConversation = totalConversation;
        state.numbOfPages = numbOfPages;
        state.adminRoom = rooms;
      })
      .addCase(adminRetrieveRoom.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload?.msg || 'error occurred!',
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
      })
      .addCase(sendMessage.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload?.msg || 'error occurred!',
          15000,
          0
        );
      });
    //  retrieve msg
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
              (existingMsg: any) => existingMsg.id === incomingMsg.id
            )
        );
        const updatedMessages = incomingMessages.filter(
          (incomingMsg: messageState) => {
            const existingMsg: messageState | any = state.messages.find(
              (msg: messageState) => msg.id === incomingMsg.id
            );
            return existingMsg && existingMsg.isRead !== incomingMsg.isRead;
          }
        );
        updatedMessages.forEach((updatedMsg: any) => {
          const index = state.messages.findIndex(
            (msg: any) => msg.id === updatedMsg.id
          );
          if (index !== -1) {
            state.messages[index] = { ...state.messages[index], ...updatedMsg };
          }
        });
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
    // update msg
    builder
      .addCase(updateMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMessage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateMessage.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload?.msg || 'error occurred!',
          15000,
          0
        );
      });
    // all msg (admin)
    builder
      .addCase(adminRetrieveMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminRetrieveMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminMessages = action.payload.messages;
        state.totalMessage = action.payload.totalMessages;
      })
      .addCase(adminRetrieveMessages.rejected, (state, action: any) => {
        state.isLoading = false;
        ToastAndroid.showWithGravity(
          action.payload?.msg || 'error occurred!',
          15000,
          0
        );
      });
  },
});

export const {
  showLoading,
  hideLoading,
  setRoomPage,
  handleRoomChange,
  clearRoomFilters,
} = roomSlice.actions;
export default roomSlice.reducer;
