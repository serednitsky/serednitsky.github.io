import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const content = {
  ru: {
    pageTitle: 'Документация Cloud',
    pageDescription: 'Документация CloudPayments, CloudKassir и CloudTips',
    heroTitle: 'Документация',
    heroDescription: 'Всё для работы с CloudPayments, CloudKassir и CloudTips: инструкции, справочные материалы, API и SDK.',
    knowledgeTitle: 'База знаний',
    knowledgeDescription: 'Практические материалы для повседневной работы с продуктами Cloud.',
    developersTitle: 'Разработчикам',
    developersDescription: 'Технические руководства и справочники для интеграции.',
    open: 'Перейти',
    knowledgeProducts: [
      {name: 'CloudPayments', category: 'Платежи', description: 'Базовые материалы о платежах, возвратах и работе с продуктами CloudPayments.', to: '/docs/knowledge/cloudpayments'},
      {name: 'CloudKassir', category: 'Фискализация', description: 'Справочная информация для интернет-расчетов, чеков и подключения кассы.', to: '/docs/knowledge/cloudkassir'},
      {name: 'CloudTips', category: 'Чаевые', description: 'Материалы о подключении чаевых и сценариях поддержки авторов.', to: '/docs/knowledge/cloudtips'},
    ],
    developerProducts: [
      {name: 'CloudPayments', category: 'API и SDK', description: 'Виджеты, API, уведомления, SDK и готовые сценарии интеграции.', to: '/docs/developers/cloudpayments'},
      {name: 'CloudKassir', category: 'Интеграции', description: 'Стартовая страница технической документации CloudKassir.', to: '/docs/developers/cloudkassir'},
      {name: 'CloudTips', category: 'Интеграции', description: 'Стартовая страница технической документации CloudTips.', to: '/docs/developers/cloudtips'},
    ],
  },
  en: {
    pageTitle: 'Cloud documentation',
    pageDescription: 'Documentation for CloudPayments, CloudKassir, and CloudTips',
    heroTitle: 'Documentation',
    heroDescription: 'Guides, reference materials, APIs, and SDKs for CloudPayments, CloudKassir, and CloudTips.',
    knowledgeTitle: 'Knowledge base',
    knowledgeDescription: 'Practical guides for working with Cloud products.',
    developersTitle: 'For developers',
    developersDescription: 'Technical guides and integration references.',
    open: 'Explore',
    knowledgeProducts: [
      {name: 'CloudPayments', category: 'Payments', description: 'Guides to payments, refunds, and CloudPayments products.', to: '/docs/knowledge/cloudpayments'},
      {name: 'CloudKassir', category: 'Fiscalization', description: 'Online receipts, cash registers, and CloudKassir setup.', to: '/docs/knowledge/cloudkassir'},
      {name: 'CloudTips', category: 'Tips', description: 'Guides to accepting tips and supporting creators.', to: '/docs/knowledge/cloudtips'},
    ],
    developerProducts: [
      {name: 'CloudPayments', category: 'API and SDK', description: 'Payment forms, APIs, notifications, SDKs, and integration scenarios.', to: '/docs/developers/cloudpayments'},
      {name: 'CloudKassir', category: 'Integrations', description: 'Technical documentation for CloudKassir.', to: '/docs/developers/cloudkassir'},
      {name: 'CloudTips', category: 'Integrations', description: 'Technical documentation for CloudTips.', to: '/docs/developers/cloudtips'},
    ],
  },
};

function ProductCard({product, actionLabel}) {
  return (
    <Link className={styles.productCard} to={product.to}>
      <span className={styles.productCategory}>{product.category}</span>
      <span className={styles.productName}>{product.name}</span>
      <span className={styles.productDescription}>{product.description}</span>
      <span className={styles.productAction} aria-hidden="true">{actionLabel} <span>→</span></span>
    </Link>
  );
}

function ProductSection({id, title, description, products, actionLabel}) {
  return (
    <section className={styles.productSection} aria-labelledby={id}>
      <div className={styles.sectionIntro}>
        <Heading as="h2" id={id}>{title}</Heading>
        <p>{description}</p>
      </div>
      <div className={styles.productGrid}>
        {products.map((product) => <ProductCard key={product.name} product={product} actionLabel={actionLabel} />)}
      </div>
    </section>
  );
}

export default function Home() {
  const {i18n} = useDocusaurusContext();
  const copy = content[i18n.currentLocale] || content.ru;

  return (
    <Layout title={copy.pageTitle} description={copy.pageDescription}>
      <main className={styles.homepage}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <Heading as="h1">{copy.heroTitle}<br /><span>Cloud</span></Heading>
            <p>{copy.heroDescription}</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} to="/docs/developers/cloudpayments">{copy.developersTitle} <span aria-hidden="true">→</span></Link>
              <Link className={styles.secondaryAction} to="/docs/knowledge">{copy.knowledgeTitle} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className={styles.heroArtwork} aria-hidden="true">
            <span className={styles.artworkOrbit} />
            <span className={styles.artworkCore} />
            <span className={styles.artworkDot} />
          </div>
        </section>

        <div className={styles.sections}>
          <ProductSection id="knowledge" title={copy.knowledgeTitle} description={copy.knowledgeDescription} products={copy.knowledgeProducts} actionLabel={copy.open} />
          <ProductSection id="developers" title={copy.developersTitle} description={copy.developersDescription} products={copy.developerProducts} actionLabel={copy.open} />
        </div>
      </main>
    </Layout>
  );
}
