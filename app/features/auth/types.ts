import { userType } from '../../components/form/Form';

interface errValue {
  message?: string;
}

export interface UserState {
  isLoading: boolean;
  user: userType | null | any;
  error?: errValue | string | any;
  isError: boolean;
  modalVisible?: boolean;
  isPassword: boolean;
  userWithoutPassword?: userType | any | unknown;
}

interface payProp {
  msg?: string | any;
  user?: userType | null | any;
  userWithoutPassword?: userType | any;
  error?: payload | string | any;
}

interface payload {
  payload: {
    msg?: string | any;
    userWithoutPassword: userType | any;
  };
}

export interface payloadAction {
  payload: payProp;
  error: payload;
}

export interface RootState {
  auth: userType | null | any;
}
