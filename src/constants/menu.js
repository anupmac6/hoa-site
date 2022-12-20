import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'gogo',
    icon: 'iconsminds-home-1',
    label: 'Home',
    to: `${adminRoot}/home`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.start',
        to: `${adminRoot}/home/start`,
      },
    ],
  },
  {
    id: 'admin',
    icon: 'simple-icon-lock',
    label: 'Admin',
    to: `${adminRoot}/admin`,
    subs: [
      {
        icon: 'simple-icon-people',
        label: 'Registration Queue',
        to: `${adminRoot}/admin/registration-queue`,
      },
      {
        icon: 'iconsminds-mens',
        label: 'All Users',
        to: `${adminRoot}/admin/all-users`,
      },
    ],
  },
  {
    id: 'secondmenu',
    icon: 'iconsminds-three-arrow-fork',
    label: 'Admin',
    to: `${adminRoot}/second-menu`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.second',
        to: `${adminRoot}/second-menu/second`,
      },
    ],
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`,
  },
  {
    id: 'docs',
    icon: 'iconsminds-library',
    label: 'menu.docs',
    to: 'https://gogo-react-docs.coloredstrategies.com/',
    newWindow: true,
  },
];
export default data;
