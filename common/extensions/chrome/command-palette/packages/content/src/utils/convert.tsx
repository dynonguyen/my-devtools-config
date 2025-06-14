import { Cookie, dateFormatter, SearchCategory } from '@dcp/shared';
import clsx from 'clsx';
import { descriptionClass } from '~/components/search-result/SearchResultItem';
import { SearchItem } from '~/stores/search';

export const getCookieSearchItem = (item: Cookie): SearchItem<Cookie> => {
  const { name, domain, path, storeId, value, httpOnly, secure, expirationDate, sameSite } = item;
  const isCurrentDomain = location.hostname.includes(domain);

  const descList: string[] = [
    `Domain: ${domain}`,
    `Path: ${path}`,
    `Expires: ${expirationDate ? dateFormatter(expirationDate * 1000) : 'Session'}`
  ];

  if (httpOnly) descList.push('HttpOnly');
  if (secure) descList.push('Secure');
  if (sameSite) descList.push(`SameSite: ${sameSite}`);

  const desc = descList.join(', ');

  return {
    id: `cookie-${name}-${domain}-${path}-${storeId}`,
    category: SearchCategory.Cookie,
    label: name,
    description: (
      <div className="flex flex-col gap-0.5">
        <span class={clsx(descriptionClass, 'break-all')} title={value}>
          Value: {value}
        </span>
        <span class={descriptionClass} title={desc}>
          {isCurrentDomain ? '🟢' : ''} {desc}
        </span>
      </div>
    ),
    logo: <span class="i-ph:cookie size-full" />,
    _raw: {
      category: SearchCategory.Cookie,
      ...item
    }
  };
};
