import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from '@/paths';
import { DynamicLogo } from '@/components/core/logo';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1.3fr',
        minHeight: '100%',
      }}
    >
      
      
      <Box
        sx={{
          alignItems: 'center',
          background: '#f9fafb',
          color: 'var(--mui-palette-common-white)',
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'center',
          p: 3,
        }}
      >
           <Box sx={{ p: 3, position:"absolute", top:"0", left:0 }} >
          <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
            <DynamicLogo colorDark="light" colorLight="dark" height={42} width={122} />
          </Box>
        </Box>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography color="black" sx={{ fontSize: '32px', lineHeight: '32px', textAlign: 'left' }} variant="h1">
              Welcome to{' '}
              <Box component="span" sx={{ color: '#36766e' }}>
                Diigiihost
              </Box>
            </Typography>
           
            <p className='text-gray-600 mt-3'>
             A professional template that comes with ready-to-use MUI components developed with one common goal in mind, help you build faster & beautiful applications.
            </p>
          </Stack>
          {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              alt="Widgets"
              src="/assets/auth-widgets.png"
              sx={{ height: 'auto', width: '100%', maxWidth: '600px' }}
            />
          </Box> */}
        </Stack>
      </Box>
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
     
        <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center', p: 3 }}>
          <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
