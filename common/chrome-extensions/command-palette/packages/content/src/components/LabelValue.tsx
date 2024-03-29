import { ComponentChild } from 'preact';

export type LabelValueProps = {
  label: ComponentChild;
  value?: ComponentChild;
  labelWidth?: number;
};

export const LabelValue = (props: LabelValueProps) => {
  const { label, value, labelWidth = 80 } = props;

  if (!value) return null;

  return (
    <div class="flex items-start gap-1">
      <div class="font-500 text-secondary shrink-0" style={{ width: labelWidth }}>
        {label}:
      </div>
      <div class="text-base-content/65">{value}</div>
    </div>
  );
};

export default LabelValue;
