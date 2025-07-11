// routes
import { paths } from 'src/routes/paths';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
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
    title: 'FAQs',
    icon: <Iconify icon="solar:file-bold-duotone" />,
    path: paths.faqs,
  },
];
      // {
      //   subheader: 'Dashboard',
      //   items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
      // },

