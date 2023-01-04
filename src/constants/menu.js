import { UserRole, adminRoot } from './defaultValues';

const data = [
  {
    id: 'gogo',
    icon: 'iconsminds-home-1',
    label: 'Home',
    to: `${adminRoot}/home`,
    roles: [UserRole.Admin, UserRole.User],
    subs: [
      // {
      //   id: 'home-tasks',
      //   label: 'Maintenance',
      //   icon: 'simple-icon-lock',
      //   to: `${adminRoot}/home`,
      //   subs: [
      //     {
      //       icon: 'simple-icon-paper-plane',
      //       label: 'menu.start',
      //       to: `${adminRoot}/home/start`,
      //     },
      //   ],
      // },
      {
        id: 'home-tasks',
        label: 'Dues',
        icon: 'simple-icon-lock',
        to: `${adminRoot}/home`,
        subs: [
          {
            icon: 'iconsminds-dollar',
            label: 'Pay Dues',
            to: `${adminRoot}/home/start`,
          },
          {
            icon: 'iconsminds-box-with-folders',
            label: 'Payments',
            to: `${adminRoot}/home/payments`,
          },
        ],
      },
    ],
  },
  {
    id: 'admin',
    icon: 'simple-icon-lock',
    label: 'Admin',
    to: `${adminRoot}/admin`,
    roles: [UserRole.Admin],
    subs: [
      {
        id: 'admin-users',
        label: 'Users',
        to: `${adminRoot}/admin/users`,
        subs: [
          {
            icon: 'simple-icon-people',
            label: 'Registration Queue',
            to: `${adminRoot}/admin/users/registration-queue`,
          },
          {
            icon: 'iconsminds-mens',
            label: 'All Users',
            to: `${adminRoot}/admin/users/all-users`,
          },
        ],
      },
      // {
      //   id: 'admin-tasks',
      //   label: 'Maintenance',
      //   to: `${adminRoot}/admin/maintenance`,
      //   subs: [
      //     {
      //       icon: 'simple-icon-people',
      //       label: 'Requests',
      //       to: `${adminRoot}/admin/users/registration-queue`,
      //     },
      //     {
      //       icon: 'iconsminds-mens',
      //       label: 'Approved',
      //       to: `${adminRoot}/admin/users/all-users`,
      //     },
      //     {
      //       icon: 'iconsminds-mens',
      //       label: 'Rejected',
      //       to: `${adminRoot}/admin/users/all-users`,
      //     },
      //   ],
      // },
      {
        id: 'admin-dues',
        label: 'Dues',
        to: `${adminRoot}/admin/dues`,
        subs: [
          {
            icon: 'simple-icon-people',
            label: 'Addresses',
            to: `${adminRoot}/admin/dues/addresses`,
          },
        ],
      },
    ],
  },
  // {
  //   id: 'secondmenu',
  //   icon: 'iconsminds-three-arrow-fork',
  //   label: 'Admin',
  //   to: `${adminRoot}/second-menu`,
  //   roles: [UserRole.Admin],
  //   subs: [
  //     {
  //       icon: 'simple-icon-paper-plane',
  //       label: 'menu.second',
  //       to: `${adminRoot}/second-menu/second`,
  //     },
  //   ],
  // },
  // {
  //   id: 'blankpage',
  //   icon: 'iconsminds-bucket',
  //   label: 'menu.blank-page',
  //   to: `${adminRoot}/blank-page`,
  // },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
];
export default data;
