import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDelegations = async (address) => {
  const [warmRes, delegateRes] = await Promise.all([
    axios.get(`https://api.warm.xyz/v1/delegations?address=${address}`),
    axios.get(`https://api.delegate.xyz/delegations/${address}`),
  ]);

  return {
    warm: warmRes.data.delegations,
    delegate: delegateRes.data.assets,
  };
};

export const useDelegatedAssets = (address) => {
  return useQuery({
    queryKey: ['delegated-assets', address],
    queryFn: () => fetchDelegations(address),
    enabled: !!address,
  });
};
