import { Chip } from '@mui/material'
import { useDelegatedAssets } from '@/hooks/useDelegatedAssets'

export const DelegationBadge = ({ address }) => {
  const { data } = useDelegatedAssets(address)
  
  const delegationCount = 
    (data?.warm?.length || 0) + 
    (data?.delegate?.length || 0)

  return (
    <Chip
      label={`Delegations: ${delegationCount}`}
      color={delegationCount > 0 ? 'success' : 'default'}
      variant="outlined"
      sx={{ ml: 2 }}
    />
  )
}