import { AccountType, SortOptions } from '../accounts/types';

export interface FilterState {
  search: string;
  sort: SortOptions;
  sortOptions: SortOptions[];
  accountType?: AccountType;
  accountTypeOptions?: AccountType[];
  type: CardType;
  typeOptions?: CardType[];
  transactionType: transactionOptions;
  transactionOption?: transactionOptions[];
  status: statusOptions;
  statusOptions?: statusOptions[];
}

export interface transactionState extends FilterState {
  isLoading: boolean;
  transactions: transactionType[];
  userTransactions: transactionType[];
  userTransactionsTotal: number;
  modalVisible: boolean;
  totalTransactions: number;
  page: number;
  numbOfPages?: number;
}

export interface transactionType {
  _id: string;
  amount?: number;
  accountType?: AccountType;
  reference?: string;
  type?: CardType;
  description?: string;
  accountNumber?: number;
  accountId?: any;
  userId?: any;
  status?: statusOptions;
  transactionType?: transactionOptions;
  transactionCharges?: number;
  createdAt?: Date;
}

export enum transactionOptions {
  All = 'all',
  Deposit = 'deposit',
  Withdrawal = 'withdrawal',
  Transfer = 'transfer',
  Loan = 'loan',
  Payment = 'payment',
}

export enum statusOptions {
  All = 'all',
  Completed = 'completed',
  Pending = 'pending',
  Failed = 'failed',
  Canceled = 'canceled',
}

export enum CardType {
  All = 'all',
  Debit = 'Debit',
  Credit = 'Credit',
}

export interface RootTransactionState {
  AllTransactions: transactionState | any;
}
