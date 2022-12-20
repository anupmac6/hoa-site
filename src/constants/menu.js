import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'gogo',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.gogo',
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
    icon: 'iconsminds-three-arrow-fork',
    label: 'Admin',
    to: `${adminRoot}/admin`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'Registration Queue',
        to: `${adminRoot}/admin/registrations`,
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
