export interface OSOResponse {
  onchain_metrics_by_project: OnchainMetricsByProject[];
  code_metrics_by_project: CodeMetricsByProject[];
}

export interface OnchainMetricsByProject {
  active_users: number;
  first_txn_date: string;
  high_frequency_users: number;
  l2_gas_6_months: number;
  less_active_users: number;
  more_active_users: number;
  multi_project_users: number;
  network: string;
  new_user_count: number;
  num_contracts: number;
  project_id: string;
  project_name: string;
  total_l2_gas: number;
  total_txns: number;
  total_users: number;
  txns_6_months: number;
  users_6_months: number;
}

export interface CodeMetricsByProject {
  avg_active_devs_6_months: number;
  avg_fulltime_devs_6_months: number;
  commits_6_months: number;
  contributors: number;
  contributors_6_months: number;
  first_commit_date: string;
  forks: number;
  issues_closed_6_months: number;
  issues_opened_6_months: any;
  last_commit_date: string;
  new_contributors_6_months: number;
  project_id: string;
  project_name: string;
  pull_requests_merged_6_months: number;
  pull_requests_opened_6_months: number;
  repositories: number;
  source: string;
  stars: number;
}

export type OSOResponseProps = OnchainMetricsByProject | CodeMetricsByProject;
