import { userType } from '../../components/form/Form';

export interface RootRoomState {
  Room: roomState | any;
}

export interface messageState {
  _id: string;
  text: string;
  avatar: string;
  createdAt: Date;
  user: string | any;
}

export interface roomState {
  isLoading: boolean;
  conversation: roomType[];
  filteredConversation: roomType[];
  contact: userType[];
  page: number;
  numbOfPages: number;
  messages: messageState[];
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
