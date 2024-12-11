import { SortOptions } from '../accounts/types';

export interface FilterState {
  search: string;
  sort: SortOptions.Latest;
  sortOptions: SortOptions[];
  status: statusOptions.All;
  statusOptions?: statusOptions[];
  applicationStatus: applicationStatusOptions.All;
  applicationStatusOptions?: applicationStatusOptions[];
  loanType: loanTypeOptions.All;
  loanTypeOptions?: loanTypeOptions[];
  employmentStatus: employmentStatusOptions.All;
  employmentStatusOptions?: employmentStatusOptions[];
}

export interface loansState extends FilterState {
  isLoading: boolean;
  loans: loanType[];
  userLoans: loanType[];
  userLoansTotal: number;
  singleLoan: loanType | null;
  modalVisible: boolean;
  totalLoans: number;
  page: number;
  numbOfPages?: number;
  loanBalance?: number;
}

export interface loanType {
  _id: string;
  physicalAddress?: string;
  email?: string;
  name?: string;
  dob?: Date | string;
  phoneNumber?: number | string;
  loanAmount?: number;
  interestRate?: number;
  loanTerm?: number;
  totalAmount?: number;
  remainingBalance?: number;
  payments: loanDurationPayment[];
  createdAt?: Date;
  loanType?: loanTypeOptions;
  status?: statusOptions;
  applicationStatus?: applicationStatusOptions;
  totalAmountPaid?: number;
  income?: number;
  creditScore?: number;
  employmentStatus?: employmentStatusOptions;
  userId?: any;
  accountNumber?: number;
  debtToIncomeRatio?: number;
  disbursementDate?: number | Date;
  collateralType?: string;
  collateralValue?: number;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}

export interface loanDurationPayment {
  month?: number | Date;
  paymentAmount?: number;
  datePaid?: number;
}

export enum loanTypeOptions {
  All = 'all',
  ShortTerm = 'short-term',
  MediumTerm = 'medium-term',
  LongTerm = 'long-term',
}

export enum applicationStatusOptions {
  All = 'all',
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

export enum statusOptions {
  All = 'all',
  Active = 'active',
  Paid = 'paid',
  Defaulted = 'defaulted',
  Review = 'review',
}

export enum employmentStatusOptions {
  All = 'all',
  Employed = 'employed',
  SelfEmployed = 'self-employed',
  Unemployed = 'unemployed',
  Retired = 'retired',
}

export interface RootLoansState {
  Loans: loansState | any;
}
