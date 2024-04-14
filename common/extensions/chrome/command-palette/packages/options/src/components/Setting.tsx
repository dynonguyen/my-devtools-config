import { Flex, Icon, sxMaxLines } from '@fpt-cads/ui-core';
import { Box, Typography } from '@mui/material';
import React from 'react';

export type SettingProps = {
  label: string;
  logo?: { icon?: string; img?: string };
  value: React.ReactNode;
};

export const Setting = (props: SettingProps) => {
  const { label, logo, value } = props;

  return (
    <Flex spacing={4} minHeight={32}>
      {/* Label */}
      <Flex spacing={2} flexShrink={0} width={240}>
        <Flex
          center
          width={24}
          height={24}
          flexShrink={0}
          sx={(theme) => ({
            '& *': {
              color: `${theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700'} !important`
            }
          })}
        >
          {logo ? (
            logo.icon ? (
              <Icon icon={logo.icon} />
            ) : (
              <Box width={1} height={1} component="img" src={logo.img} />
            )
          ) : (
            <Icon icon="ph:gear-fill" />
          )}
        </Flex>
        <Typography title={label} variant="textMdSemiBold" sx={sxMaxLines(1)}>
          {label}
        </Typography>
      </Flex>
      {value}
    </Flex>
  );
};

export default Setting;
