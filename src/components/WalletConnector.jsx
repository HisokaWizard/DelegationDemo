import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button, Box, Typography } from '@mui/material';
import { Web3Modal } from '@web3modal/react';
import { injected } from 'wagmi/connectors';

export const WalletConnector = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading } = useConnect({
    onSuccess(data) {
      console.log('Connected:', data.account);
    },
    onError(error) {
      console.error('Connection error:', error);
    },
  });
  const { disconnect } = useDisconnect();
  const [walletType, setWalletType] = useState(null);

  const isMetaMaskInstalled = typeof window !== 'undefined' && !!window.ethereum?.isMetaMask;
  const metaMaskConnector = connectors.find((c) => c.id === 'metaMask');
  const rabbyConnector = connectors.find((c) => c.id === 'rabby');
  const walletConnectConnector = connectors.find((c) => c.id === 'walletConnect');

  useEffect(() => {
    // Проверяем наличие Rabby/MetaMask
    const ethereum = window.ethereum;
    if (!ethereum) return;

    if (ethereum.isRabby) {
      setWalletType('rabby');
    } else if (ethereum.isMetaMask) {
      setWalletType('metamask');
    }
    ``;
  }, []);

  const handleConnectEvm = () => {
    connect({
      connector: injected({
        target: {
          id: walletType || 'metaMask',
          name: walletType === 'rabby' ? 'Rabby' : 'MetaMask',
          provider: window.ethereum,
        },
      }),
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      {!isConnected ? (
        <>
          <Button
            variant='contained'
            onClick={handleConnectEvm}
            disabled={isLoading}
            sx={{ textTransform: 'none' }}
          >
            {isMetaMaskInstalled ? 'Connect MetaMask' : 'Install MetaMask'}
          </Button>
          <Button
            variant='contained'
            onClick={() => connect({ connector: walletConnectConnector })}
            disabled={isLoading}
            sx={{ textTransform: 'none' }}
          >
            WalletConnect
          </Button>
        </>
      ) : (
        <Box>
          <Typography variant='body1' sx={{ mb: 1 }}>
            Connected: {address.slice(0, 6)}...{address.slice(-6)}
          </Typography>
          <Button variant='outlined' onClick={disconnect} sx={{ textTransform: 'none' }}>
            Disconnect
          </Button>
        </Box>
      )}
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
      <Web3Modal projectId={import.meta.env.VITE_WC_PROJECT_ID} />
    </Box>
  );
};
