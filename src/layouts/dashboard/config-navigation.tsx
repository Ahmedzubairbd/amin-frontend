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
          { title: t('analytics'), path: paths.dashboard.analytics, icon: ICONS.analytics },
          { title: t('patients'), path: paths.dashboard.patients, icon: ICONS.banking },
          { title: t('doctors'), path: paths.dashboard.doctors, icon: ICONS.ecommerce },
          { title: t('appointments'), path: paths.dashboard.appointments, icon: ICONS.booking },
          { title: t('test reports'), path: paths.dashboard.testReports, icon: ICONS.file },
          { title: t('medical tests'), path: paths.dashboard.medicalTests, icon: ICONS.file },
          { title: t('departments'), path: paths.dashboard.departments, icon: ICONS.folder },
          { title: t('payments'), path: paths.dashboard.payments, icon: ICONS.banking },
          { title: t('notifications'), path: paths.dashboard.notifications, icon: ICONS.label },
          { title: t('settings'), path: paths.dashboard.settings, icon: ICONS.lock },
        ],
      },
    ],
    [t]
  );

  return data;
}
