import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  // test: icon('ic_product'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          { title: t('dashboard'), path: paths.dashboard.root, icon: ICONS.dashboard },
          { title: t('doctors'), path: paths.dashboard.general.ecommerce, icon: ICONS.ecommerce },
          { title: t('analytics'), path: paths.dashboard.general.analytics, icon: ICONS.analytics },
          { title: t('patients'), path: paths.dashboard.general.banking, icon: ICONS.banking },
          { title: t('medical tests'), path: paths.dashboard.general.booking, icon: ICONS.booking },
          { title: t('file'), path: paths.dashboard.general.file, icon: ICONS.file },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [
          // USER
          {
            title: t('user'),
            path: paths.dashboard.user.root,
            icon: ICONS.user,
            children: [
              { title: t('profile'), path: paths.dashboard.user.root },
              { title: t('cards'), path: paths.dashboard.user.cards },
              { title: t('list'), path: paths.dashboard.user.list },
              { title: t('create'), path: paths.dashboard.user.new },
              { title: t('edit'), path: paths.dashboard.user.demo.edit },
              { title: t('account'), path: paths.dashboard.user.account },
            ],
          },

          // MEDICALTEST
          // {
          //   title: t('test'),
          //   path: paths.dashboard.test.root,
          //   icon: ICONS.test,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.test.root },
          //     { title: t('details'), path: paths.dashboard.test.demo.details },
          //     { title: t('create'), path: paths.dashboard.test.new },
          //     { title: t('edit'), path: paths.dashboard.test.demo.edit },
          //   ],
          // },

          // // ORDER
          // {
          //   title: t('order'),
          //   path: paths.dashboard.order.root,
          //   icon: ICONS.order,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.order.root },
          //     { title: t('details'), path: paths.dashboard.order.demo.details },
          //   ],
          // },

          // INVOICE
          {
            title: t('invoice'),
            path: paths.dashboard.invoice.root,
            icon: ICONS.invoice,
            children: [
              { title: t('list'), path: paths.dashboard.invoice.root },
              { title: t('details'), path: paths.dashboard.invoice.demo.details },
              { title: t('create'), path: paths.dashboard.invoice.new },
              { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
            ],
          },

          // JOB
          {
            title: t('job'),
            path: paths.dashboard.job.root,
            icon: ICONS.job,
            children: [
              { title: t('list'), path: paths.dashboard.job.root },
              { title: t('details'), path: paths.dashboard.job.demo.details },
              { title: t('create'), path: paths.dashboard.job.new },
              { title: t('edit'), path: paths.dashboard.job.demo.edit },
            ],
          },

          // TOUR
          {
            title: t('tour'),
            path: paths.dashboard.tour.root,
            icon: ICONS.tour,
            children: [
              { title: t('list'), path: paths.dashboard.tour.root },
              { title: t('details'), path: paths.dashboard.tour.demo.details },
              { title: t('create'), path: paths.dashboard.tour.new },
              { title: t('edit'), path: paths.dashboard.tour.demo.edit },
            ],
          },

          // FILE MANAGER
          {
            title: t('file_manager'),
            path: paths.dashboard.fileManager,
            icon: ICONS.folder,
          },
        ],
      },

      // DEMO MENU STATES
      {
        subheader: t(t('other_cases')),
        items: [
          {
            // default roles : All roles can see this entry.
            // roles: ['user'] Only users can see this item.
            // roles: ['admin'] Only admin can see this item.
            // roles: ['admin', 'manager'] Only admin/manager can see this item.
            // Reference from 'src/guards/RoleBasedGuard'.
            title: t('item_by_roles'),
            path: paths.dashboard.permission,
            icon: ICONS.lock,
            roles: ['admin', 'manager'],
            caption: t('only_admin_can_see_this_item'),
          },
          {
            title: t('item_label'),
            path: '#label',
            icon: ICONS.label,
            info: (
              <Label color="info" startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}>
                NEW
              </Label>
            ),
          },
          {
            title: t('item_caption'),
            path: '#caption',
            icon: ICONS.menuItem,
            caption:
              'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
          },
          {
            title: t('blank'),
            path: paths.dashboard.blank,
            icon: ICONS.blank,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
