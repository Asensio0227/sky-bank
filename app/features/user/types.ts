import { SerializedError } from '@reduxjs/toolkit';
import { userType } from '../../components/form/Form';

export enum Roles {
  All = 'all',
  User = 'user',
  Admin = 'admin',
  Member = 'member',
  Assistant = 'assistant',
}

export enum SortOptions {
  Latest = 'latest',
  Oldest = 'oldest',
  AtoZ = 'a-z',
  ZtoA = 'z-a',
}

export interface FilterState {
  search: string;
  roles: Roles;
  rolesOptions: Roles[];
  sort: SortOptions;
  sortOptions: SortOptions[];
  searchType?: string;
  searchStatus?: string;
}

export interface UserState extends FilterState {
  isLoading: boolean;
  userLoading: boolean;
  banned: boolean;
  users: userType[];
  singleUser: userType;
  totalUsers: number;
  numOfPages: number | any;
  page: number;
  numbOfPages?: number;
}

export interface payProp {
  msg?: string | any;
  user?: userType[] | null | any;
  error?: payload | string | any;
}

interface payload {
  payload: {
    msg?: string | any;
  };
}
export interface UserApiResponse {
  msg?: string;
  users?: userType[];
}
export interface Payload {
  payload: payProp;
  error: payload;
}

export interface RejectedActionPayload {
  requestId: string;
  requestStatus: 'rejected';
  aborted: boolean;
  condition: boolean;
  error: SerializedError;
  payload: payload;
}

export interface RootUserState {
  allUser: UserState | null | any;
}
