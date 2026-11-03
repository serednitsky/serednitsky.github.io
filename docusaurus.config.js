// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cloud documentation',
  tagline: 'Документация CloudPayments, CloudKassir и CloudTips',
  favicon: 'img/favicon.ico',
  url: 'https://developers.cloudpayments.ru',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenAnchors: 'ignore',
  future: {v4: true},
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    localeConfigs: {
      ru: {label: 'Русский'},
      en: {label: 'English'},
    },
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
          breadcrumbs: true,
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/brands/Cloud_Vert.svg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Cloud',
          src: 'img/brands/Cloud_Vert.svg',
        },
        items: [
          {to: '/docs/knowledge', label: 'База знаний', position: 'left'},
          {to: '/docs/developers', label: 'Разработчикам', position: 'left'},
          {type: 'localeDropdown', position: 'right'},
          {type: 'search', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Продукты',
            items: [
              {label: 'CloudPayments', to: '/docs/developers/cloudpayments'},
              {label: 'CloudKassir', to: '/docs/knowledge/cloudkassir'},
              {label: 'CloudTips', to: '/docs/knowledge/cloudtips'},
            ],
          },
          {
            title: 'Полезные ссылки',
            items: [
              {label: 'Личный кабинет', href: 'https://merchant.cloudpayments.ru/'},
              {label: 'Демо платежного конструктора', href: 'https://widget.cloudpayments.ru/app/demo'},
              {label: 'Модули для CMS и CRM', href: 'https://cloudpayments.ru/payments/cms-crm/'},
            ],
          },
          {
            title: 'Для разработчиков',
            items: [
              {label: 'Библиотеки и SDK', href: 'https://cloudpayments.ru/payments/mobile-payments/'},
              {label: 'GitHub', href: 'https://gitpub.cloudpayments.ru/integrations/'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} CloudPayments`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
