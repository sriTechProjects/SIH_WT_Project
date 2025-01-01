const { ethers } = require("ethers");
const axios = require("axios");
require("dotenv").config();

// Contract ABI
const contractABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "panelId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "expertIds",
        type: "string[]",
      },
    ],
    name: "PanelAdded",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string", name: "_panelId", type: "string" },
      { internalType: "string[]", name: "_expertIds", type: "string[]" },
    ],
    name: "addPanelExperts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_panelId", type: "string" }],
    name: "getPanelExperts",
    outputs: [{ internalType: "string[]", name: "", type: "string[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// const contractAddress = process.env.CONTRACT_ADDRESS;
const contractAddress = "0x26a86F3ec5343C3aF8Bc343A758F13b38719E18F"; // Replace with your actual contract address

// const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);
const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/cffb67b8b2b940f0887d381c0b55eaf5"
);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

/**
 * Writes data to the contract
 * @param {string} panelId - ID of the panel
 * @param {string[]} expertIds - Array of expert IDs
 */
const writeFunctionality = async (panelId, expertIds) => {
  try {
    console.log(`Adding experts to panel ${panelId}`);
    const tx = await contract.addPanelExperts(panelId, expertIds);
    // await tx.wait();
    console.log("Panel experts added successfully.");
  } catch (error) {
    console.error("Error in writeFunctionality:", error);
  }
};

/**
 * Reads data from the contract and API
 * @param {string} panelId - ID of the panel to retrieve experts for
 */
const readFunctionality = async () => {
  try {
    const panelId = "6759f1c6d17ac8b059ccb781";
    const retrievedExperts = await contract.getPanelExperts(panelId);
    console.log("Retrieved Experts:", retrievedExperts);
  } catch (error) {
    console.error("Error in readFunctionality:", error);
  }
};

module.exports = {
  writeFunctionality,
  readFunctionality,
};