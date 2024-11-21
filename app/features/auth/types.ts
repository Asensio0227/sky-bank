import { userType } from '../../components/form/Form';

export interface UserState {
  isLoading: boolean;
  user: userType | null | any;
  error?: string | any; // Optional error property
}

export interface payloadAction {
  payload: {
    msg?: string | any;
    user?: userType | null | any;
    userWithoutPassword?: userType | null;
  };
}

export interface RootState {
  auth: userType | null | any;
}
