import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button, Box, Typography } from '@mui/material'
import { Web3Modal } from '@web3modal/react'

export const WalletConnector = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <Box sx={{ mb: 4 }}>
      {!isConnected ? (
        <Button 
          variant="contained" 
          onClick={() => connect()}
          sx={{ textTransform: 'none' }}
        >
          Connect Wallet
        </Button>
      ) : (
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Connected: {address.slice(0, 6)}...{address.slice(-6)}
          </Typography>
          <Button 
            variant="outlined" 
            onClick={disconnect}
            sx={{ textTransform: 'none' }}
          >
            Disconnect
          </Button>
        </Box>
      )}
      <Web3Modal projectId={import.meta.env.VITE_WC_PROJECT_ID} />
    </Box>
  )
}