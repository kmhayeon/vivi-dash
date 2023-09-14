// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import { TbMenu2 } from "react-icons/tb";

// project imports
import LogoSection from '../../LogoSection/LogoSection';
import SearchSection from './SearchSection/SearchSection';
import ProfileSection from './ProfileSection/ProfileSection';
import NotificationSection from './NotificationSection/NotificationSection';

// assets
import themeTypography from '@/app/themes/typography';


interface IHederProps  {
  handleLeftDrawerToggle: () => void;
}


const Header:React.FC<IHederProps> = props => {
  const { handleLeftDrawerToggle } = props
  const theme = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection /> 
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...themeTypography?.commonAvatar,
              ...themeTypography?.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          > 
            <TbMenu2 size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <NotificationSection />
      {/* <ProfileSection />  */}
    </>
  );
};


export default Header;
