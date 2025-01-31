'use server';
import { client } from '@/config/apoloClient';
import { gql } from '@apollo/client';

interface Holder {
  address: string;
  balance: string;
}

export async function getTopHolders(contractAddress: string): Promise<Holder[]> {
  try {
    // GraphQL query to fetch top holders
    const query = gql`
      query GetTopHolders($contractAddress: String!) {
        EVM(network: base, dataset: combined) {
          BalanceUpdates(
            limit: { count: 20 }
            orderBy: { descendingByField: "Balance" }
            where: { Currency: { SmartContract: { is: $contractAddress } } }
          ) {
            Balance: sum(of: BalanceUpdate_Amount)
            Currency {
              SmartContract
              Name
              Symbol
            }
            BalanceUpdate {
              Address
            }
          }
        }
      }
    `;

    // Fetch data using Apollo Client
    const { data } = await client.query({
      query,
      variables: { contractAddress },
    });

    // Extract and format the data
    const holders: Holder[] = data.EVM.BalanceUpdates.map((update: { BalanceUpdate: { Address: string }, Balance: string }) => ({
      address: update.BalanceUpdate.Address,
      balance: update.Balance,
    }));

    return holders;
  } catch (error) {
    console.error('Error fetching top holders:', error);
    throw new Error('Failed to fetch top holders');
  }
}