import { userType } from '../../components/form/Form';

export interface FilterState {
  search: string;
  sort: SortOptions;
  sortOptions: SortOptions[];
  accountType?: AccountType;
  accountTypeOptions?: AccountType[];
}

export enum SortOptions {
  Latest = 'newest',
  Oldest = 'oldest',
  AtoZ = 'a-z',
  ZtoA = 'z-a',
}

export interface accState extends FilterState {
  isLoading: boolean;
  Loader: boolean;
  accounts: accType[];
  userAccounts: accType[];
  userAccountsTotal: number;
  singleAccount: accType | any | null;
  modalVisible: boolean;
  totalAccount: number;
  page: number;
  numbOfPages?: number;
}

export interface accType {
  _id?: string;
  BankName?: string;
  branchCode?: number;
  accountNumber?: number;
  accountType?: string;
  ideaNumber?: string;
  accountHolderName?: string;
  balance?: number;
  overdraftLimit?: number;
  userId?: userType;
  createdBy?: userType;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}

export interface RootAccountState {
  allAccounts?: accState | any | unknown | null;
}

export enum AccountType {
  All = 'all',
  Savings = 'savings',
  Checking = 'checking',
  Loan = 'loan',
  Business = 'business',
}
