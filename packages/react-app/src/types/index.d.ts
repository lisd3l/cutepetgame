interface AnimalParty {
  id: import("ethers").BigNumber;
  name: string;
  owner: string;
  uri: string;
  image: string;
  description: string;
}
// Sample Data:
//   {
//     id: {
//       type: "BigNumber",
//       hex: "0x0c",
//     },
//     uri: " ipfs://bafybeiazrppsk57zwr4ib6pujzru725durkjohri5rebufylxgdzd4m5ze/12.json",
//     owner: "0x9B4a617a6516da30eeaEe88142dabb727C5A4E43",
//     name: "MetaCaptain #12",
//     description: "Captain and Crew of the MetaPioneer",
//     image: "https://ipfs.io/ipfs/bafybeiajtayhglvhgpm2elztvyopnyztffp4jb3vzsjshau432lpjow6yu/12.png",
//     dna: "ba1856f1a0d39abb7c3327a2bce48546c50f1998",
//     edition: 12,
//     date: 1679143654163,
//     attributes: [
//       {
//         trait_type: "backcolour",
//         value: "pinorg",
//       },
//       {
//         trait_type: "clothes",
//         value: "pink",
//       },
//       {
//         trait_type: "head",
//         value: "greenmix",
//       },
//       {
//         trait_type: "eye",
//         value: "half",
//       },
//       {
//         trait_type: "accessories",
//         value: "hat",
//       },
//       {
//         trait_type: "mouth",
//         value: "smalltooth",
//       },
//     ],
//   },
