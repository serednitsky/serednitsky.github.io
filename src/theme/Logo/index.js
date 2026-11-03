import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';

const brands = {
  cloud: {src: 'img/brands/Cloud_Vert.svg', darkSrc: 'img/brands/Cloud_Vert_Dark.svg', alt: 'Cloud'},
  cloudpayments: {src: 'img/brands/CP_Vert.svg', darkSrc: 'img/brands/CP_Vert_Dark.svg', alt: 'CloudPayments'},
  cloudkassir: {src: 'img/brands/CK_Horiz.svg', darkSrc: 'img/brands/CK_Horiz_Dark.svg', alt: 'CloudKassir'},
  cloudtips: {src: 'img/brands/CT_Horiz.svg', darkSrc: 'img/brands/CT_Horiz_Dark.svg', alt: 'CloudTips'},
};

function brandForPath(pathname) {
  const path = pathname.replace(/^\/(?:ru|en)(?=\/)/, '');
  if (path.includes('/cloudkassir')) return brands.cloudkassir;
  if (path.includes('/cloudtips')) return brands.cloudtips;
  if (path.includes('/cloudpayments')) return brands.cloudpayments;
  return brands.cloud;
}

export default function Logo({imageClassName, titleClassName, ...props}) {
  const {pathname} = useLocation();
  const {i18n} = useDocusaurusContext();
  const brand = brandForPath(pathname);
  const src = useBaseUrl(brand.src);
  const darkSrc = useBaseUrl(brand.darkSrc);

  return (
    <Link to="/" {...props} aria-label={i18n.currentLocale === 'en' ? 'Home' : 'На главную'}>
      <img
        className={`${imageClassName || ''} brand-logo brand-logo--light`}
        src={src}
        alt={brand.alt}
      />
      <img
        className={`${imageClassName || ''} brand-logo brand-logo--dark`}
        src={darkSrc}
        alt=""
        aria-hidden="true"
      />
    </Link>
  );
}
