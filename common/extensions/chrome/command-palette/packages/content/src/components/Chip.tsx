import { ComponentChild } from 'preact';
import { Color } from '~/types/common.type';

export type ChipProps = {
  color?: Color;
  label?: ComponentChild;
  icon?: ComponentChild;
};

export const Chip = (props: ChipProps) => {
  const { label, color, icon } = props;

  return (
    <div
      class="inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium [&>span]:(size-4)"
      style={{
        color: `rgb(var(--${color}))`,
        backgroundColor: `rgba(var(--${color}), 0.2)`
      }}
    >
      {label}
      {icon}
    </div>
  );
};

export default Chip;
