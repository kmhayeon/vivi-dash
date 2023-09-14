// assets
import { TbDashboard } from "react-icons/tb";


// constant
const icons = { TbDashboard };


const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/setting',
      icon: icons.TbDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
