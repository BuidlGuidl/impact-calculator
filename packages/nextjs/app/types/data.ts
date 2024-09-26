import { Address } from "viem";

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
  "# GitHub Repos"?: number;
  "Date First Commit": string;
  "Total Stars"?: number;
  "Total Forks"?: number;
  "Total Contributors"?: number;
  "Contributors Last 6 Months"?: number;
  "Avg Monthly Active Devs Last 6 Months": number;
  "# OP Contracts"?: number;
  "Date First Txn": string;
  "Total Onchain Users"?: number;
  "Onchain Users Last 6 Months"?: number;
  "Total Txns"?: number;
  "Total Txn Fees (ETH)": number;
  "Txn Fees Last 6 Months (ETH)": number;
  "# NPM Packages"?: number;
  "Date First Download": string;
  "Total Downloads"?: number;
  "Downloads Last 6 Months"?: number;
}

export interface Metadata {
  project_name: string;
  project_image: string;
}

export interface DataSet {
  score: number;
  opAllocation: number;
  data: { [key in keyof ImpactVectors]: { normalized: number; actual: string | number | undefined } };
  metadata: Metadata;
}

type VectorSourceName = "OSO";

export type VectorDataType = "number" | "date" | "string";
export interface Vector {
  name: keyof ImpactVectors;
  description: string;
  sourceName: VectorSourceName;
  parent: string;
  fieldName: string;
  dataType?: VectorDataType;
}

export interface IFilter {
  action: "include" | "exclude" | "multiply";
  condition: string;
  value: number | string;
}

export interface SelectedVector {
  name: keyof ImpactVectors;
  weight: number;
  filters: IFilter[];
  dataType: VectorDataType;
}

export interface VectorList {
  creator: Address;
  title: string;
  description: string;
  vectors: SelectedVector[];
}
