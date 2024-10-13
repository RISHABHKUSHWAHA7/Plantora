import { AptosClient, AptosAccount, CoinClient } from 'aptos';

const NODE_URL = "https://testnet.aptoslabs.com/v1"; // Use the appropriate Aptos node URL
const aptosClient = new AptosClient(NODE_URL);

export const executeTransaction = async (transaction: any) => {
  const response = await aptosClient.submitTransaction(transaction);
  return response;
};

export default aptosClient;
