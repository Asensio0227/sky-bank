import { userType } from '../../components/form/Form';

export interface RootRoomState {
  Room: roomState | any;
}

export interface messageState {
  _id: string;
  id?: string;
  text: string;
  avatar: string;
  createdAt: Date;
  user: string | any;
  isRead: boolean;
}

export interface roomState {
  isLoading: boolean;
  conversation: roomType[];
  filteredConversation: roomType[];
  contact: userType[];
  page: number;
  numbOfPages: number;
  messages: messageState[];
  adminRoom: roomType[];
  adminMessages: messageState[];
  search: string;
  totalMessage: number;
  totalConversation: number;
  unreadCount: number;
}

export interface roomType {
  _id: string;
  status: statusEnum[];
  participantsArray: string[];
  participants: [];
  lastMessage: {};
  userId: string;
}

export enum statusEnum {
  ALL = 'all',
  OffLine = 'offline',
  OnLine = 'online',
}
