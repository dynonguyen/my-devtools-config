import { LocalStorageItem } from '@dcp/shared';
import { useRef } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import AutoFocus from '../AutoFocus';
import Flex from '../Flex';

type FormKey = keyof LocalStorageItem;
type RefElement = HTMLInputElement | HTMLTextAreaElement | null;
type LSFormValue = Partial<Record<FormKey, RefElement>>;
export type LSFormProps = {
  initValues?: LocalStorageItem;
  onSubmit?(value: LocalStorageItem, ev: JSXInternal.TargetedSubmitEvent<HTMLElement>): void;
};

export const LS_FORM_ID = 'dcp-localstorage-form';

export const LocalStorageForm = (props: LSFormProps) => {
  const { initValues, onSubmit } = props;
  const formRefs = useRef<LSFormValue>({});

  const handleInputRef = (field: FormKey) => (ref: RefElement) => {
    if (ref) {
      formRefs.current[field] = ref;

      ref.value = (initValues?.[field] as string) ?? '';
    }
  };

  const handleSubmit = (ev: JSXInternal.TargetedSubmitEvent<HTMLElement>) => {
    ev.preventDefault();

    const formData = Object.fromEntries(Object.entries(formRefs.current).map(([key, ref]) => [key, ref?.value ?? '']));

    onSubmit?.(formData as LocalStorageItem, ev as JSXInternal.TargetedSubmitEvent<HTMLElement>);
  };

  return (
    <Flex component="form" id={LS_FORM_ID} stack class="gap-3" onSubmit={handleSubmit}>
      <AutoFocus>
        <input
          id="dcp-cookie-name-input"
          type="text"
          class="input"
          autoComplete="off"
          placeholder="Name"
          required
          ref={handleInputRef('key')}
        />
      </AutoFocus>

      <textarea
        type="text"
        class="input min-h-40 max-h-60"
        placeholder="Value"
        rows={3}
        ref={handleInputRef('value')}
        autocomplete="off"
      />
    </Flex>
  );
};

export default LocalStorageForm;
