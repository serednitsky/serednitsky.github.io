// @ts-check

const product = (label, id, child) => ({
  type: 'category',
  label,
  key: id.replaceAll('/', '-'),
  link: {type: 'doc', id},
  items: [child],
});

const knowledgeSidebar = [
  {
    type: 'category',
    label: 'База знаний',
    link: {type: 'doc', id: 'knowledge/index'},
    items: [
      product('CloudPayments', 'knowledge/cloudpayments/index', 'knowledge/cloudpayments/overview'),
      product('CloudKassir', 'knowledge/cloudkassir/index', 'knowledge/cloudkassir/overview'),
      product('CloudTips', 'knowledge/cloudtips/index', 'knowledge/cloudtips/overview'),
    ],
  },
];

const apiItems = [
  'developers/cloudpayments/api/testovyj-metod',
  'developers/cloudpayments/api/oplata-po-kriptogramme',
  'developers/cloudpayments/api/obrabotka-3-d-secure',
  'developers/cloudpayments/api/oplata-po-tokenu-rekarring',
  'developers/cloudpayments/api/podtverzhdenie-oplaty',
  'developers/cloudpayments/api/otmena-oplaty',
  'developers/cloudpayments/api/vozvrat-deneg',
  'developers/cloudpayments/api/vyplata-po-kriptogramme',
  'developers/cloudpayments/api/vyplata-po-tokenu',
  'developers/cloudpayments/api/vyplata-po-sbp',
  'developers/cloudpayments/api/prosmotr-tranzaktsii',
  'developers/cloudpayments/api/proverka-statusa-platezha',
  'developers/cloudpayments/api/vygruzka-spiska-tranzaktsij',
  'developers/cloudpayments/api/vygruzka-spiska-tranzaktsij-za-proizvolnyj-period',
  'developers/cloudpayments/api/vygruzka-spiska-pretenzij-za-proizvolnyj-period',
  'developers/cloudpayments/api/vygruzka-tokenov',
  'developers/cloudpayments/api/sozdanie-podpiski-na-rekurrentnye-platezhi',
  'developers/cloudpayments/api/zapros-informatsii-o-podpiske',
  'developers/cloudpayments/api/poisk-podpisok',
  'developers/cloudpayments/api/izmenenie-podpiski-na-rekurrentnye-platezhi',
  'developers/cloudpayments/api/otmena-podpiski-na-rekurrentnye-platezhi',
  'developers/cloudpayments/api/sozdanie-scheta-dlya-otpravki-po-pochte',
  'developers/cloudpayments/api/otmena-sozdannogo-scheta',
  'developers/cloudpayments/api/prosmotr-nastroek-uvedomlenij',
  'developers/cloudpayments/api/izmenenie-nastroek-uvedomlenij',
  'developers/cloudpayments/api/lokalizatsiya',
  'developers/cloudpayments/api/dlinnaya-zapis',
];

const cloudPaymentsDocs = [
  'developers/cloudpayments/general-information',
  'developers/cloudpayments/mpf',
  'developers/cloudpayments/payment-blocks',
  'developers/cloudpayments/checkout',
  'developers/cloudpayments/recurrent',
  'developers/cloudpayments/escrow',
  'developers/cloudpayments/sdk-ios',
  'developers/cloudpayments/sdk-android',
  {
    type: 'category',
    label: 'API',
    link: {type: 'doc', id: 'developers/cloudpayments/api/index'},
    items: apiItems,
  },
  'developers/cloudpayments/notifications',
  'developers/cloudpayments/tinkoff-pay',
  'developers/cloudpayments/sbp',
  'developers/cloudpayments/digital-ruble',
  'developers/cloudpayments/sber-pay',
  'developers/cloudpayments/mir-pay',
  'developers/cloudpayments/dolyame',
  'developers/cloudpayments/integration-scenarios',
  'developers/cloudpayments/pcidss',
  'developers/cloudpayments/online-kassa',
  'developers/cloudpayments/testing',
  'developers/cloudpayments/handbook',
];

const developersSidebar = [
  {
    type: 'category',
    label: 'Разработчикам',
    link: {type: 'doc', id: 'developers/index'},
    items: [
      {
        type: 'category',
        label: 'CloudPayments',
        key: 'developers-cloudpayments',
        link: {type: 'doc', id: 'developers/cloudpayments/index'},
        items: cloudPaymentsDocs,
      },
      {
        type: 'category',
        label: 'CloudKassir',
        key: 'developers-cloudkassir',
        link: {type: 'doc', id: 'developers/cloudkassir/index'},
        items: [],
      },
      {
        type: 'category',
        label: 'CloudTips',
        key: 'developers-cloudtips',
        link: {type: 'doc', id: 'developers/cloudtips/index'},
        items: [],
      },
    ],
  },
];

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  defaultSidebar: [...knowledgeSidebar, ...developersSidebar],
};

export default sidebars;
