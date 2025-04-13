import { Grid, Typography, Chip, Skeleton } from '@mui/material';
import { useDelegatedAssets } from '@/hooks/useDelegatedAssets';

const AssetCard = ({ asset, platform }) => (
  <Grid item xs={12} sm={6} md={4}>
    <div className='asset-card'>
      <Typography variant='h6'>{asset.name}</Typography>
      <Chip label={platform} color='secondary' size='small' />
      <Typography>Token Address: {asset.tokenAddress}</Typography>
      <Typography>Token Symbol: {asset.symbol}</Typography>
      <Typography>Token Floor Price: {asset.floorPrice}</Typography>
    </div>
  </Grid>
);

export const AssetsGrid = ({ address }) => {
  const { data, isLoading, error } = useDelegatedAssets(address);

  if (isLoading) return <Skeleton variant='rectangular' height={200} />;
  if (error) return <Typography color='error'>Error loading assets</Typography>;

  const combinedAssets = [
    ...(data.warm?.map((a) => ({ ...a, platform: 'Warm' })) || []),
    ...(data.delegate?.map((a) => ({ ...a, platform: 'Delegate' })) || []),
  ];

  return (
    <Grid container spacing={3}>
      {combinedAssets.length === 0 ? (
        <Typography>No delegated assets found</Typography>
      ) : (
        combinedAssets.map((asset, i) => (
          <AssetCard key={i} asset={asset} platform={asset.platform} />
        ))
      )}
    </Grid>
  );
};
