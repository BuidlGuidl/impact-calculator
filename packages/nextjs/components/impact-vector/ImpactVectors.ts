import { Vector } from "~~/app/types/data";

export const impactVectors: Vector[] = [
  {
    name: "Total Stars",
    description:
      "Reflects the overall popularity and community interest in the project based on the total number of stars it has received.",
    sourceName: "OSO",
    parent: "code_metrics_by_project",
    fieldName: "stars",
    dataType: "number",
  },
  {
    name: "Total Forks",
    description:
      "Indicates the number of times the project has been forked, highlighting its adaptability and potential for community-driven development.",
    sourceName: "OSO",
    parent: "code_metrics_by_project",
    fieldName: "forks",
    dataType: "number",
  },
  {
    name: "Contributors Last 6 Months",
    description:
      "Measures the project's recent contributor activity, providing insights into the current engagement and collaborative nature of the development team.",
    sourceName: "OSO",
    parent: "code_metrics_by_project",
    fieldName: "contributors_6_months",
    dataType: "number",
  },
  {
    name: "Avg Monthly Active Devs Last 6 Months",
    description:
      "Represents the average number of developers actively contributing to the project on a monthly basis over the past six months. This metric indicates sustained developer interest and contributions, offering insights into the project's ongoing development dynamics.",
    sourceName: "OSO",
    parent: "code_metrics_by_project",
    fieldName: "avg_active_devs_6_months",
    dataType: "number",
  },
  {
    name: "Total Onchain Users",
    description:
      "Quantifies the total number of unique addresses that have transacted with the project's smart contract or group of contracts, reflecting the overall user base and adoption on the blockchain.",
    sourceName: "OSO",
    parent: "onchain_metrics_by_project",
    fieldName: "total_users",
    dataType: "number",
  },
  {
    name: "Onchain Users Last 6 Months",
    description:
      "Tracks the onchain user growth over the last six months, offering a dynamic perspective on the project's increasing user base.",
    sourceName: "OSO",
    parent: "onchain_metrics_by_project",
    fieldName: "users_6_months",
    dataType: "number",
  },
  {
    name: "Total Txns",
    description:
      "Illustrates how frequently a project's smart contract or a collection of contracts has been utilized over a specific timeframe. This impact vector provides a quantitative measure of user engagement and the project's overall activity on the blockchain.",
    sourceName: "OSO",
    parent: "onchain_metrics_by_project",
    fieldName: "total_txns",
    dataType: "number",
  },
  {
    name: "Total Txn Fees (ETH)",
    description:
      "Represents the cumulative sum of gas fees contributed to the network by a project's contract or group of contracts within a defined time period. This impact vector not only reflects the economic aspect of the project but also indicates the resources consumed during transactions. Higher total fees suggest increased network participation and resource usage, contributing to the project's impact within the blockchain ecosystem.",
    sourceName: "OSO",
    parent: "onchain_metrics_by_project",
    fieldName: "total_l2_gas",
    dataType: "number",
  },
  {
    name: "Txn Fees Last 6 Months (ETH)",
    description:
      "Captures the total transaction fees paid in Ether (ETH) associated with the project's contracts within the last six months. This impact vector highlights recent economic activity and transactional trends, providing valuable insights into the project's financial dynamics.",
    sourceName: "OSO",
    parent: "onchain_metrics_by_project",
    fieldName: "l2_gas_6_months",
    dataType: "number",
  },
  // Adding these are in the OSO teams current sprint, hopefully can add them back soon.
  // {
  //   name: "Date First Download",
  //   description:
  //     "Marks the date when the project was first downloaded, offering a historical context on its initial adoption.",
  //   sourceName: "OSO",
  //   parent: "code_metrics_by_project",
  //   fieldName: "",
  // },
  // {
  //   name: "Total Downloads",
  //   description:
  //     "Quantifies the overall number of downloads, showcasing the project's reach and popularity among users.",
  //   sourceName: "OSO",
  //   parent: "code_metrics_by_project",
  //   fieldName: "",
  // },
  // {
  //   name: "Downloads Last 6 Months",
  //   description:
  //     "Shows the number of downloads the project has received within the last six months, providing insight into recent trends in user interest and adoption.",
  //   sourceName: "OSO",
  //   parent: "code_metrics_by_project",
  //   fieldName: "",
  // },
];
