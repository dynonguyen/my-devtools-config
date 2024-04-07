import { getAssets } from '@dcp/shared';
import { Flex } from '@fpt-cads/ui-core';
import { Box, Typography } from '@mui/material';

export const AppLogo = () => {
  return (
    <Flex spacing={2}>
      <Box component="img" src={getAssets('logo.svg')} width={48} />
      <Typography variant="textXlSemiBold">Dyno Command Palette Settings</Typography>
    </Flex>
  );
};

export default AppLogo;
