import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const fetchWarmDelegations = async (address) => {
  try {
    const response = await axios.get(`https://api.warm.xyz/v2/delegations`, {
      params: {
        delegate: address,
        chainId: 1,
      },
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_WARM_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Warm API error:', error.response?.data || error.message);
    return [];
  }
};

export const fetchDelegateAssets = async (address) => {
  try {
    const response = await axios.get(`https://api.delegate.xyz/registry/v2/${address}`, {
      headers: {
        'x-api-key': import.meta.env.VITE_DELEGATE_API_KEY,
        'Accept': 'application/json',
      },
    });

    const result = Array.isArray(response.data) ? response.data : null;

    if (!result) return [];

    const parentAdress = result[0]?.from;

    if (!parentAdress) return [];

    const BASE_URL = `https://eth-mainnet.alchemyapi.io/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`;

    const nftAssets = await axios.get(`${BASE_URL}/getNFTs`, {
      params: {
        owner: parentAdress,
      },
    });
    if (!Array.isArray(nftAssets.data.ownedNfts) || nftAssets.data.ownedNfts.length === 0)
      return [];

    return nftAssets.data.ownedNfts.map((it) => ({
      tokenAddress: it?.contract?.address ?? '-',
      name: it?.contractMetadata?.name ?? '-',
      symbol: it?.contractMetadata?.symbol ?? '-',
      floorPrice: it?.contractMetadata?.openSea?.floorPrice ?? '-',
    }));
  } catch (error) {
    console.error('Delegate API error:', error.response?.data || error.message);
    return [];
  }
};

export const useDelegatedAssets = (address) => {
  return useQuery({
    queryKey: ['delegated-assets', address],
    queryFn: async () => {
      const [warm, delegate] = await Promise.allSettled([
        fetchWarmDelegations(address),
        fetchDelegateAssets(address),
      ]);

      return {
        warm: warm.status === 'fulfilled' ? warm.value : [],
        delegate: delegate.status === 'fulfilled' ? delegate.value : [],
      };
    },
    enabled: !!address,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
