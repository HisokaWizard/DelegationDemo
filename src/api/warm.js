// api/warm.js
export const getDelegations = async (address) => {
  const res = await fetch(`https://api.warm.xyz/v1/delegations?address=${address}`, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_WARM_API_KEY}` },
  });
  return res.json();
};
