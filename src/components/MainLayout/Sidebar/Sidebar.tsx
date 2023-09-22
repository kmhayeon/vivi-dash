// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Chip, Drawer, Stack, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from './MenuList/MenuList';
import LogoSection from '../../LogoSection/LogoSection';

import Image from 'next/image';
import LogoIMG from '@/asset/images/vivityai.png';

interface IHederProps {
  handleLeftDrawerToggle: () => void;
  drawerOpen: any;
  window?: any;
}

const Sidebar: React.FC<IHederProps> = ({ drawerOpen, handleLeftDrawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <Image src={LogoIMG} width={110} height={23} alt="logo" style={{ marginTop: '10px' }} />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <MenuList />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={'v1.0.0'} disabled size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </PerfectScrollbar>
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip label={'v2.0.0'} disabled size="small" sx={{ cursor: 'pointer' }} />
          </Stack>
        </Box>
      </MobileView>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <>
      <Box
        component="nav"
        sx={{
          flexShrink: { md: 0 },
          width: matchUpMd ? 260 : 'auto',
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant={matchUpMd ? 'persistent' : 'temporary'}
          anchor="right"
          open={drawerOpen}
          onClose={handleLeftDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': {
              width: 260,
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              borderRight: 'none',
              // bgcolor:'skyblue',
              [theme.breakpoints.up('md')]: {
                top: '88px',
              },
            },
          }}
          ModalProps={{ keepMounted: true }}
          color="inherit"
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
