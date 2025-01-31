'use client';
import { useState } from 'react';
import { getTopHolders } from './actions/getTopHolders';

export default function TopHolders() {
  const [contractAddress, setContractAddress] = useState('0xE3086852A4B125803C815a158249ae468A3254Ca'); // Replace with your contract address
  const [holders, setHolders] = useState<{ address: string; balance: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchHolders = async () => {
    if (!contractAddress) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getTopHolders(contractAddress);
      setHolders(data);
    } catch (err) {
      setError('Failed to fetch top holders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top Holders</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter ERC20 Contract Address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleFetchHolders}
          disabled={loading}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {loading ? 'Loading...' : 'Fetch Holders'}
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Rank</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Balance</th>
            </tr>
          </thead>
          <tbody>
            {holders.map((holder, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{holder.address}</td>
                <td className="py-2 px-4 border-b">{holder.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
