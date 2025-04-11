// api/delegate.js
export const getDelegateAssets = async (address) => {
  const res = await fetch(`https://api.delegate.xyz/v1/assets/${address}`, {
    headers: { 'x-api-key': import.meta.env.VITE_DELEGATE_API_KEY },
  });
  return res.json();
};
