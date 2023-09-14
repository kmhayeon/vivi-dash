// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from '../NavGroup/NavGroup';
// import menuItem from 'menu-items';
import menuItems from '@/app/menu-items/menuItems';


const MenuList = () => {
  const navItems = menuItems.items.map((item:any) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error 1
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
