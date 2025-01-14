import { userType } from '../../components/form/Form';
import { transactionType } from '../transaction/types';

export interface RootStatementState {
  Statement: statementState | any;
}

export interface statementState {
  isLoading: boolean;
  statement: statementType[];
  userStatement: statementType[];
  page: number;
  numbOfPages: number;
  totalStatement: number;
  singleStatement: statementType | any;
}

export interface statementType {
  _id: string;
  transaction: transactionType[];
  location: string;
  startDate: string | Date | any;
  endDate: string | Date | any;
  accountNumber: number;
  userId: userType;
  balance: number;
  createdAt: string | Date | any;
  updatedAt: string | Date | any;
}

export interface FilterState {
  sortOptions?: SortOptions[];
  sort?: SortOptions;
  search?: String;
}

export enum SortOptions {
  Latest = 'newest',
  Oldest = 'oldest',
  AtoZ = 'a-z',
  ZtoA = 'z-a',
}
