// assets
// import { IconDashboard } from '@tabler/icons';
import { TbDashboard } from "react-icons/tb";


// constant
const icons = { TbDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.TbDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
