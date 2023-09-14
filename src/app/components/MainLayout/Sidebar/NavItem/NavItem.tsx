
import React,{useState, useEffect, forwardRef} from 'react';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation'

import Link from 'next/link';

// import { Link, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
// import { MENU_OPEN, SET_MENU } from 'store/actions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { imageOptimizer } from 'next/dist/server/image-optimizer';

interface IHederProps  {
  item: any;
  level?: any;
}

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem:React.FC<IHederProps> = ({ item, level }) => {
  const theme = useTheme();
  const pathname = usePathname();
  // const dispatch = useDispatch();
  // const { pathname } = useLocation();
  // const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [isOpen, setIsOpen] = useState([])

  const Icon = item.icon;

  const itemIcon = item?.icon ? (
    <Icon size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );


  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props:any) => <Link {...props} href={item.url} target={itemTarget} />)
  };
  // if (item?.external) {
  //   listItemProps = { component: 'a', href: item.url, target: itemTarget };
  // }

  const itemHandler = (id: any) => {
    console.log(id)
    // dispatch({ type: MENU_OPEN, id });
    // if (matchesSM) dispatch({ type: SET_MENU, opened: false });
    if(matchesSM) {

    }
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      // dispatch({ type: MENU_OPEN, id: item.id });
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `12px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`
      }}
      selected={isOpen.findIndex((id:any) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography 
          variant={isOpen.findIndex((id:any) => id === item.id) > -1 ? 'h5' : 'body1'} 
          color="inherit">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" 
            sx={{ ...theme.typography.subMenuCaption }} 
            display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};


export default NavItem;
