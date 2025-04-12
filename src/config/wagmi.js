import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { walletConnect, injected } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [
    injected({
      target: 'metaMask',
    }),
    injected({
      target() {
        return {
          id: 'rabby',
          name: 'Rabby Wallet',
          provider: window.ethereum,
        };
      },
    }),
    walletConnect({
      projectId: import.meta.env.VITE_WC_PROJECT_ID,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
  },
});
