// routes
import { paths } from 'src/routes/paths';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Components',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.components,
  },
  {
    title: 'Services',
    icon: <Iconify icon="solar:users-group-rounded-bold-duotone" />,
    path: paths.services,
  },
  {
    title: 'Contact us',
    icon: <Iconify icon="solar:chat-round-dots-bold-duotone" />,
    path: paths.contact,
  },
  {
    title: 'About us',
    icon: <Iconify icon="solar:user-id-bold-duotone" />,
    path: paths.about,
  },
  {
    title: 'Find A Doctor',
    icon: <Iconify icon="solar:user-id-bold-duotone" />,
    path: paths.finddoctor,
  },
  {
    title: 'Others',
    path: '/pages',
    icon: <Iconify icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'FAQs', path: paths.faqs },
          { title: 'Pricing', path: paths.pricing },
          { title: 'Maintenance', path: paths.maintenance },
          { title: 'Coming Soon', path: paths.comingSoon },
        ],
      },
    ],
  },
];
      // {
      //   subheader: 'Dashboard',
      //   items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
      // },

