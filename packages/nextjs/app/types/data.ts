export interface RetroPGF3Results extends ImpactVectors, Metadata {
  Project_ID: string;
  "Result: # Ballots": number;
  "Result: Median OP": number;
  "Result: Quorum Reached": boolean;
  "Result: Received OP": string;
  "Funding: Governance Fund": number;
  "Funding: Other": number;
  "Funding: Partner Fund": number;
  "Funding: RPGF1": number;
  "Funding: RPGF2": number;
  "Funding: Revenue": number;
  "Keywords: Base": number;
  "Keywords: Farcaster": number;
  "Keywords: Zora": number;
  "Link: Contract on Base": number;
  "Link: Contract on OP Mainnet": number;
  "Link: Dune": number;
  "Link: Flipside": number;
  "Link: GitHub": number;
  "Link: GitHub (duneanalytics)": number;
  "Link: GitHub (ethereum)": number;
  "Link: GitHub (ethereum-optimism)": number;
  "Link: NPM Package": number;
  "Link: Optimism Gov": number;
  "Link: Substack": number;
  "Link: Twitter": number;
  "GTP: VC Funding Amount"?: number;
  "GTP: Has Token"?: boolean;
  "GTP: Has VC Funding": number;
  "OSO: Has Profile": boolean;
}

export interface ImpactVectors {
  "OSO: # GitHub Repos"?: number;
  "OSO: Date First Commit": string;
  "OSO: Total Stars"?: number;
  "OSO: Total Forks"?: number;
  "OSO: Total Contributors"?: number;
  "OSO: Contributors Last 6 Months"?: number;
  "OSO: Avg Monthly Active Devs Last 6 Months": number;
  "OSO: # OP Contracts"?: number;
  "OSO: Date First Txn": string;
  "OSO: Total Onchain Users"?: number;
  "OSO: Onchain Users Last 6 Months"?: number;
  "OSO: Total Txns"?: number;
  "OSO: Total Txn Fees (ETH)": number;
  "OSO: Txn Fees Last 6 Months (ETH)": number;
  "OSO: # NPM Packages"?: number;
  "OSO: Date First Download": string;
  "OSO: Total Downloads"?: number;
  "OSO: Downloads Last 6 Months"?: number;
}

export interface Metadata {
  "Meta: Project Name": string;
  "Meta: Project Image": string;
  "Meta: Applicant Type": string;
  "Meta: Website": string;
  "Meta: Bio": string;
  "Meta: Payout Address": string;
  "Category: Collective Governance": number;
  "Category: Developer Ecosystem": number;
  "Category: End User Experience and Adoption": number;
  "Category: OP Stack": number;
}

export interface DataSet {
  rank: number;
  receivedOP: number;
  data: { [key in keyof ImpactVectors]: { normalized: number; actual: string | number | undefined } };
  metadata: Metadata;
}
