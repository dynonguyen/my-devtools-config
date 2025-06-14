import { Cookie, dateFormatter } from '@dcp/shared';
import { useRef, useState } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import AutoFocus from '../AutoFocus';
import Flex from '../Flex';
import Switch from '../Switch';

type FormKey = keyof Cookie;
type RefElement = HTMLInputElement | HTMLTextAreaElement | null;
type CookieFormValue = Partial<Record<FormKey, RefElement>>;
export type CookieFormProps = {
  initValues?: Cookie;
  onSubmit?(value: Partial<Cookie>, ev: JSXInternal.TargetedSubmitEvent<HTMLElement>): void;
};

export const COOKIE_FORM_ID = 'dcp-cookie-form';

const formatLocalDate = (date: Date) => {
  const formatted = dateFormatter(date);
  return formatted.slice(0, formatted.length - 3);
};

const samesiteOptions: chrome.cookies.SameSiteStatus[] = ['lax', 'strict', 'no_restriction', 'unspecified'];

export const CookieForm = (props: CookieFormProps) => {
  const { initValues, onSubmit } = props;
  const formRefs = useRef<CookieFormValue>({});
  const [isSession, setIsSession] = useState(!initValues?.expirationDate);
  const [sameSite, setSameSite] = useState<chrome.cookies.SameSiteStatus>(initValues?.sameSite ?? 'unspecified');

  const defaultCookie: Partial<Cookie> = {
    domain: location.hostname,
    path: '/',
    secure: false,
    httpOnly: false
  };

  const handleInputRef = (field: FormKey) => (ref: RefElement) => {
    if (ref) {
      formRefs.current[field] = ref;

      const initValue = initValues?.[field];

      if (ref.type === 'checkbox') {
        (ref as HTMLInputElement).checked = (initValue as boolean) ?? defaultCookie[field];
        return;
      }

      ref.value = (initValue as string) ?? defaultCookie[field] ?? '';
    }
  };

  const setExpirationDate = (expirationDate?: number) => {
    formRefs.current['expirationDate'] = { value: expirationDate ? expirationDate : undefined } as any;
    const session = expirationDate ? false : true;
    formRefs.current['session'] = { value: session } as any;
    setIsSession(session);
  };

  const handleExpirationChange = (ev: JSXInternal.TargetedEvent<HTMLInputElement>) => {
    const value = ev.currentTarget.value;

    if (!value) setExpirationDate(undefined);

    const expirationDate = new Date(value).getTime() / 1000;

    return setExpirationDate(expirationDate);
  };

  const handleSubmit = (ev: JSXInternal.TargetedSubmitEvent<HTMLElement>) => {
    ev.preventDefault();

    const formData = Object.fromEntries(
      Object.entries(formRefs.current).map(([key, ref]) => {
        const isCheckbox = ref?.type === 'checkbox';

        if (isCheckbox) {
          return [key, (ref as HTMLInputElement).checked];
        }

        return [key, ref?.value ?? (defaultCookie[key as keyof Cookie] || '')];
      })
    );

    onSubmit?.(formData, ev as JSXInternal.TargetedSubmitEvent<HTMLElement>);
  };

  return (
    <Flex component="form" id={COOKIE_FORM_ID} stack class="gap-3" onSubmit={handleSubmit}>
      <AutoFocus>
        <input
          id="dcp-cookie-name-input"
          type="text"
          class="input"
          autoComplete="off"
          placeholder="Name"
          required
          ref={handleInputRef('name')}
        />
      </AutoFocus>

      <input type="text" class="input" placeholder="Value" ref={handleInputRef('value')} autocomplete="off" />

      <Flex itemsFluid class="gap-2">
        <input
          type="text"
          class="input"
          placeholder={`Domain; default: ${defaultCookie.domain}`}
          ref={handleInputRef('domain')}
        />
        <input
          type="text"
          class="input"
          placeholder={`Path; default: ${defaultCookie.path}`}
          ref={handleInputRef('path')}
        />
      </Flex>

      <Flex stack className="gap-1">
        <div>Expiration Date {isSession ? '(Session)' : ''}</div>
        <input
          type="datetime-local"
          class="input scheme-dark"
          placeholder="Expiration Date"
          min={formatLocalDate(new Date())}
          defaultValue={initValues?.expirationDate ? formatLocalDate(new Date(initValues.expirationDate * 1000)) : ''}
          onChange={handleExpirationChange}
        />
      </Flex>

      <Flex stack className="gap-1">
        <span>Same site</span>
        <Flex className="gap-3">
          {samesiteOptions.map((opt) => (
            <Flex key={opt} center className="gap-1">
              <input
                type="radio"
                id={`samesite-${opt}`}
                name="samesite"
                checked={sameSite === opt}
                onChange={(ev) => {
                  if (ev.currentTarget.checked) {
                    setSameSite(opt);
                    formRefs.current['sameSite'] = { value: opt } as any;
                  }
                }}
              />
              <label className="capitalize" htmlFor={`samesite-${opt}`}>
                {opt}
              </label>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex className="gap-3" wrap>
        <Switch ref={handleInputRef('httpOnly')} label="HttpOnly" />
        <Switch ref={handleInputRef('secure')} label="Secure" />
      </Flex>
    </Flex>
  );
};

export default CookieForm;
