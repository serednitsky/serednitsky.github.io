import React, {useEffect, useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function SearchBar() {
  const {i18n} = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === 'en';
  const indexUrl = useBaseUrl(isEnglish ? 'search-index.en.json' : 'search-index.json');
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    let active = true;
    fetch(indexUrl)
      .then((response) => response.json())
      .then((items) => {
        if (active) setIndex(items);
      })
      .catch(() => {
        if (active) setIndex([]);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [indexUrl]);

  const normalized = query.trim().toLocaleLowerCase();
  const results = normalized
    ? index
        .map((item) => ({
          ...item,
          score: [item.title, ...(item.keywords || [])]
            .join(' ')
            .toLocaleLowerCase()
            .indexOf(normalized),
        }))
        .filter((item) => item.score >= 0)
        .sort((a, b) => a.score - b.score)
        .slice(0, 7)
    : [];

  const hrefFor = (url) => (isEnglish ? `/en${url}` : url);

  return (
    <div className="cloud-search">
      <label className="cloud-search__label" htmlFor="cloud-search-input">{isEnglish ? 'Search documentation' : 'Поиск по документации'}</label>
      <input
        ref={inputRef}
        id="cloud-search-input"
        className="cloud-search__input"
        type="search"
        placeholder={isEnglish ? 'Search' : 'Поиск'}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setQuery('');
            inputRef.current?.blur();
          }
        }}
      />
      {normalized && isLoading && (
        <div className="cloud-search__empty">{isEnglish ? 'Loading search…' : 'Загрузка поиска…'}</div>
      )}
      {results.length > 0 && !isLoading && (
        <div className="cloud-search__results" role="listbox">
          {results.map((result) => (
            <a className="cloud-search__result" href={hrefFor(result.url)} key={result.url}>
              <span>{result.title}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      )}
      {normalized && !isLoading && results.length === 0 && index.length > 0 && (
        <div className="cloud-search__empty">{isEnglish ? 'No results found' : 'Ничего не найдено'}</div>
      )}
    </div>
  );
}
