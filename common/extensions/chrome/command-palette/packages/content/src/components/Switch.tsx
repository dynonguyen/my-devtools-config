import { ForwardedRef, forwardRef, HTMLAttributes } from 'preact/compat';

export type SwitchProps = HTMLAttributes<HTMLInputElement> & {
  label?: string;
  defaultChecked?: boolean;
};

export const Switch = forwardRef((props: SwitchProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { label, defaultChecked, ...others } = props;

  return (
    <label class="inline-flex items-center cursor-pointer gap-2">
      <input type="checkbox" class="sr-only peer" checked={defaultChecked} ref={ref} {...others} />
      <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary dark:peer-checked:bg-primary"></div>
      {label && <span class="text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>}
    </label>
  );
});

export default Switch;
