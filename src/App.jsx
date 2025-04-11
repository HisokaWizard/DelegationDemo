import { useAccount } from 'wagmi'
import { WalletConnector } from '@/components/WalletConnector'
import { DelegationBadge } from '@/components/DelegationBadge'
import { AssetsGrid } from '@/components/AssetsGrid'

export default function App() {
  const { address, isConnected } = useAccount()

  return (
    <div className="container">
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1>Delegation Dashboard</h1>
        <WalletConnector />
        {isConnected && <DelegationBadge address={address} />}
      </header>

      {isConnected && (
        <section style={{ marginTop: '2rem' }}>
          <AssetsGrid address={address} />
        </section>
      )}
    </div>
  )
}