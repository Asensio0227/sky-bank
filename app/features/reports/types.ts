import { SortOptions } from '../accounts/types';

export interface RootReportState {
  Reports: reportState | any;
}

export interface FilterStateProp {
  reportStatus?: reportStatusOptions.All;
  reportOptions?: reportStatusOptions[];
  search: string;
  sort: SortOptions.Latest;
  sortOptions: SortOptions[];
}

export interface reportState extends FilterStateProp {
  isLoading: boolean;
  reports?: reportType[];
  report?: reportType | null;
  totalReports?: number;
  page?: number;
}

export interface reportType {
  _id?: string;
  reportName?: string;
  reportType?: string;
  reportDate?: Date | string;
  userId?: string | any;
  accountId?: string | any;
  transactionId?: string | any;
  generatedByUserId?: string | any;
  startDate?: Date;
  endDate?: Date;
  totalTransactions?: number;
  totalCredits?: number;
  totalDebit?: number;
  netBalance?: number;
  isAudited?: boolean;
  auditComments?: string;
  reportStatus?: reportStatusOptions;
}

export enum reportStatusOptions {
  All = 'all',
  DRAFT = 'draft',
  FINALIZED = 'finalized',
  ARCHIVED = 'archived',
}
