export type OSOResponseProps = OnchainMetricsByProject | CodeMetricsByProject;

export interface OSOResponse {
  oso_onchainMetricsByProjectV1: OnchainMetricsByProject[];
  oso_codeMetricsByProjectV1: CodeMetricsByProject[];
}

export interface OnchainMetricsByProject {
  activeContractCount90Days: number;
  addressCount: number;
  addressCount90Days: number;
  daysSinceFirstTransaction: number;
  displayName: string;
  eventSource: string;
  gasFeesSum: number;
  gasFeesSum6Months: number;
  highActivityAddressCount90Days: number;
  lowActivityAddressCount90Days: number;
  mediumActivityAddressCount90Days: number;
  multiProjectAddressCount90Days: number;
  newAddressCount90Days: number;
  projectId: string;
  projectName: string;
  projectNamespace: string;
  projectSource: string;
  returningAddressCount90Days: number;
  transactionCount: number;
  transactionCount6Months: number;
}

export interface CodeMetricsByProject {
  activeDeveloperCount6Months: number;
  closedIssueCount6Months: number;
  commitCount6Months: number;
  contributorCount: number;
  contributorCount6Months: number;
  displayName: string;
  eventSource: string;
  firstCommitDate: string;
  forkCount: string;
  fulltimeDeveloperAverage6Months: number;
  lastCommitDate: string;
  mergedPullRequestCount6Months: number;
  newContributorCount6Months: number;
  openedIssueCount6Months: number;
  openedPullRequestCount6Months: number;
  projectId: string;
  projectName: string;
  projectNamespace: string;
  projectSource: string;
  repositoryCount: string;
  starCount: string;
}
